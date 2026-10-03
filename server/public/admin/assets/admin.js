/* =========================================================
   La Casita de Mami · Admin Galería
   - Subida por arrastre, 3 a la vez, con reducción en el navegador
   - Pausar / cancelar / reintentar, aviso al cerrar la pestaña
   - Fallos visibles (HEIC de iPhone con explicación)
   - Selección múltiple, borrar con deshacer, elegir portada
   - Título y descripción se guardan solos
   ========================================================= */

const csrf = document.body.dataset.csrf
const $ = (id) => document.getElementById(id)

const J = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF': csrf },
    body: JSON.stringify(body),
  }).then((r) => r.json())

/* ─── Nuevo álbum (lateral, en todas las páginas) ─────────── */
$('ad-new')?.addEventListener('click', async (e) => {
  const b = e.currentTarget
  b.disabled = true
  b.textContent = 'Creando…'
  try {
    const d = await J('/api/albums.php', { action: 'create', title: 'Nuevo álbum' })
    if (d && d.id) { location.href = '/admin/album.php?id=' + d.id; return }
  } catch { /* abajo */ }
  b.disabled = false
  b.textContent = '+ Nuevo álbum'
  alert('No se pudo crear el álbum. Inténtalo de nuevo.')
})

const albumId = document.body.dataset.album
if (albumId) albumEditor()

function albumEditor() {
  const CONC = 3              // subidas en paralelo
  const MAX_SIDE = 3200       // px: se reduce antes de subir (el servidor genera web/thumb)
  const JPEG_Q = 0.9

  const grid = $('grid')
  const side = document.querySelector(`.ad-al[data-id="${albumId}"]`)
  const sel = new Set()
  let cover = +document.body.dataset.cover || null

  /* ─── Título / descripción: guardar al salir del campo ─── */
  const title = $('title')
  const desc = $('desc')
  let saved = { t: title.value, d: desc.value }
  const save = async () => {
    const t = title.value.trim()
    if (!t) { title.value = saved.t; return }
    if (t === saved.t && desc.value === saved.d) return
    await J('/api/albums.php', { action: 'update', id: albumId, title: t, description: desc.value })
    saved = { t, d: desc.value }
    if (side) side.querySelector('strong').textContent = t
    document.title = t + ' · Admin Galería'
    $('saved').textContent = 'Guardado ✓'
    setTimeout(() => { $('saved').textContent = '' }, 1800)
  }
  title.addEventListener('blur', save)
  desc.addEventListener('blur', save)
  title.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); title.blur() } })

  /* ─── Visible / oculto ─── */
  $('vis').addEventListener('click', async (e) => {
    const b = e.currentTarget
    const on = b.getAttribute('aria-pressed') !== 'true'
    b.setAttribute('aria-pressed', on)
    b.querySelector('.ad-sw').classList.toggle('on', on)
    b.querySelector('.t').textContent = on ? 'Visible en la web' : 'Oculto'
    if (side) {
      side.querySelector('.v').textContent = on ? 'visible' : 'oculto'
      side.querySelector('small').classList.toggle('off', !on)
    }
    await J('/api/albums.php', { action: 'toggle', id: albumId, enabled: on ? 1 : 0 })
  })

  /* ─── Miniaturas ─── */
  const tiles = () => [...grid.children]
  const doneTiles = () => tiles().filter((t) => t.dataset.id && !t.classList.contains('up') && !t.hidden)

  function decorate(t) {
    t.insertAdjacentHTML('beforeend',
      '<button class="ad-ck" type="button" aria-label="Seleccionar"></button>' +
      '<button class="ad-x" type="button" title="Borrar">×</button>' +
      '<span class="ad-cov">Portada</span>' +
      '<button class="ad-mkcov" type="button">Usar de portada</button>')
  }
  tiles().forEach(decorate)

  // Si no hay portada elegida, la galería usa la primera foto.
  function paintCover() {
    const first = doneTiles()[0]
    const id = cover || (first && +first.dataset.id)
    tiles().forEach((t) => t.classList.toggle('cover', !!id && +t.dataset.id === id))
    const c = grid.querySelector('.ad-t.cover:not([hidden]) img')
    if (side && c) {
      let img = side.querySelector('img')
      if (!img) { img = document.createElement('img'); img.alt = ''; side.querySelector('.ph0')?.replaceWith(img) }
      img.src = c.src
    }
  }
  async function setCover(id) {
    cover = +id
    paintCover()
    await J('/api/albums.php', { action: 'cover', id: albumId, photo_id: cover })
  }

  function refreshCount() {
    const n = doneTiles().length
    $('count').textContent = `${n} ${n === 1 ? 'foto' : 'fotos'} · arrastra para cambiar el orden`
    if (side) side.querySelector('.n').textContent = `${n} ${n === 1 ? 'foto' : 'fotos'}`
    const empty = tiles().filter((t) => !t.hidden).length === 0
    $('drop').classList.toggle('big', empty)
    $('drop-h').textContent = empty ? 'Arrastra aquí las fotos del evento' : 'Agregar más fotos'
    $('tools').hidden = empty || sel.size > 0
  }

  /* ─── Selección ─── */
  function paintSel() {
    tiles().forEach((t) => t.classList.toggle('sel', sel.has(t.dataset.id)))
    grid.classList.toggle('selmode', sel.size > 0)
    $('selbar').hidden = sel.size === 0
    $('sel-n').textContent = `${sel.size} seleccionada${sel.size > 1 ? 's' : ''}`
    $('sel-cover').hidden = sel.size !== 1
    refreshCount()
  }
  const toggleSel = (id) => { sel.has(id) ? sel.delete(id) : sel.add(id); paintSel() }
  $('select').onclick = () => { const f = doneTiles()[0]; if (f) toggleSel(f.dataset.id) }
  $('sel-all').onclick = () => { doneTiles().forEach((t) => sel.add(t.dataset.id)); paintSel() }
  $('sel-cancel').onclick = () => { sel.clear(); paintSel() }
  $('sel-cover').onclick = () => { setCover([...sel][0]); sel.clear(); paintSel() }
  $('sel-del').onclick = () => del([...sel])

  grid.addEventListener('click', (e) => {
    const t = e.target.closest('.ad-t')
    if (!t) return
    if (t.classList.contains('up')) {
      if (e.target.matches('.retry')) retry(t)
      return
    }
    const id = t.dataset.id
    if (e.target.matches('.ad-ck')) return toggleSel(id)
    if (e.target.matches('.ad-x')) return del([id])
    if (e.target.matches('.ad-mkcov')) return setCover(id)
    if (sel.size) toggleSel(id)
  })

  /* ─── Borrar con deshacer ─── */
  // Las fotos se ocultan al momento y se borran en el servidor a los 5 s,
  // salvo que se toque "Deshacer". Si se cierra la página antes, se envía igual.
  let pending = null
  const toast = $('toast')
  function flushDelete(beacon) {
    if (!pending) return
    const { ids, els, timer } = pending
    clearTimeout(timer)
    pending = null
    toast.hidden = true
    els.forEach((el) => el.remove())
    if (beacon) {
      const fd = new FormData()
      fd.append('csrf', csrf)
      ids.forEach((id) => fd.append('ids[]', id))
      navigator.sendBeacon('/api/delete-photo.php', fd)
    } else {
      J('/api/delete-photo.php', { ids })
    }
  }
  function del(ids) {
    flushDelete(false)
    const els = ids.map((id) => grid.querySelector(`.ad-t[data-id="${id}"]`)).filter(Boolean)
    els.forEach((el) => { el.hidden = true })
    const prevCover = cover
    if (ids.some((id) => +id === cover)) cover = null // el servidor también la suelta
    sel.clear()
    paintSel()
    paintCover()
    toast.querySelector('span').textContent = ids.length === 1 ? 'Foto borrada' : `${ids.length} fotos borradas`
    toast.hidden = false
    pending = { ids, els, prevCover, timer: setTimeout(() => flushDelete(false), 5000) }
  }
  toast.querySelector('button').onclick = () => {
    if (!pending) return
    clearTimeout(pending.timer)
    pending.els.forEach((el) => { el.hidden = false })
    cover = pending.prevCover
    pending = null
    toast.hidden = true
    paintCover()
    refreshCount()
  }

  /* ─── Orden ─── */
  const saveOrder = () => { J('/api/reorder.php', { order: doneTiles().map((t) => t.dataset.id) }); paintCover() }
  new Sortable(grid, { animation: 150, ghostClass: 'drag', filter: '.up', preventOnFilter: false, onEnd: saveOrder })
  $('reverse').onclick = () => {
    tiles().reverse().forEach((t) => grid.appendChild(t))
    saveOrder()
  }

  /* ─── Subida ─── */
  const queue = []           // { file, el, status, pct, err, heic, xhr }
  let batch = null           // { total, started }
  let paused = false

  const isHeic = (f) => /\.(heic|heif)$/i.test(f.name) || /image\/hei[cf]/.test(f.type)
  const isOk = (f) => /^image\/(jpeg|png)$/.test(f.type) || /\.(jpe?g|png)$/i.test(f.name)
  const inFlight = () => queue.filter((q) => ['queued', 'opt', 'up'].includes(q.status)).length
  const active = () => queue.filter((q) => q.status === 'opt' || q.status === 'up').length

  function addFiles(list) {
    flushDelete(false)
    const files = [...list].filter((f) => isOk(f) || isHeic(f))
    if (!files.length) return
    if (!batch) batch = { total: 0, started: Date.now() }
    for (const file of files) {
      const el = document.createElement('div')
      el.className = 'ad-t up'
      const img = document.createElement('img')
      img.alt = ''
      if (!isHeic(file)) img.src = URL.createObjectURL(file)
      el.append(img, Object.assign(document.createElement('span'), { className: 'ad-st' }))
      grid.appendChild(el)
      const item = { file, el, status: 'queued', pct: 0, heic: isHeic(file) }
      if (item.heic) { item.status = 'error'; item.err = 'Formato HEIC' }
      queue.push(item)
      paintItem(item)
      batch.total++
    }
    refreshCount()
    pump()
    paintQueue()
  }

  function pump() {
    if (paused) return
    while (active() < CONC) {
      const next = queue.find((q) => q.status === 'queued')
      if (!next) break
      run(next)
    }
  }

  async function run(item) {
    item.status = 'opt'
    paintItem(item)
    let blob
    try { blob = await shrink(item.file) } catch { blob = item.file }
    if (item.status !== 'opt') return // cancelada mientras se optimizaba
    item.status = 'up'
    item.pct = 0
    paintItem(item)
    try {
      const r = await send(item, blob)
      done(item, r)
    } catch (err) {
      if (item.status === 'cancel') return
      item.status = 'error'
      item.err = err.message || 'No se pudo subir'
      paintItem(item)
    }
    paintQueue()
    pump()
  }

  // Reduce a MAX_SIDE px (JPEG). Si ya es chica y liviana, la manda tal cual.
  async function shrink(file) {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height))
    if (k === 1 && file.size < 4e6) { bmp.close(); return file }
    const c = document.createElement('canvas')
    c.width = Math.round(bmp.width * k)
    c.height = Math.round(bmp.height * k)
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.drawImage(bmp, 0, 0, c.width, c.height)
    bmp.close()
    const out = await new Promise((res) => c.toBlob(res, 'image/jpeg', JPEG_Q))
    return out && out.size < file.size ? new File([out], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file
  }

  function send(item, blob) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('file', blob, blob.name || item.file.name)
      fd.append('album_id', albumId)
      const x = new XMLHttpRequest()
      item.xhr = x
      x.open('POST', '/api/upload.php')
      x.setRequestHeader('X-CSRF', csrf)
      x.upload.onprogress = (e) => { if (e.lengthComputable) { item.pct = (e.loaded / e.total) * 100; paintItem(item) } }
      x.onload = () => {
        let d = {}
        try { d = JSON.parse(x.responseText) } catch { /* abajo */ }
        if (x.status === 200 && d.id) resolve(d)
        else reject(new Error(d.error || (x.status === 413 ? 'Archivo muy pesado' : x.status === 401 ? 'Sesión vencida' : 'No se pudo subir')))
      }
      x.onerror = () => reject(new Error('Se cortó la conexión'))
      x.onabort = () => reject(new Error('Cancelada'))
      x.send(fd)
    })
  }

  function done(item, r) {
    const el = item.el
    const img = el.querySelector('img')
    const preview = img.src
    el.className = 'ad-t just'
    el.dataset.id = r.id
    el.querySelector('.ad-st').remove()
    const real = new Image()
    real.onload = () => { img.src = r.thumb; URL.revokeObjectURL(preview) }
    real.src = r.thumb
    decorate(el)
    setTimeout(() => el.classList.remove('just'), 2000)
    queue.splice(queue.indexOf(item), 1)
    if (!cover) cover = r.id // el servidor la deja de portada si el álbum no tenía
    paintCover()
    refreshCount()
  }

  function paintItem(item) {
    const st = item.el.querySelector('.ad-st')
    item.el.classList.toggle('err', item.status === 'error')
    if (item.status === 'queued') st.innerHTML = 'En cola'
    else if (item.status === 'opt') st.innerHTML = 'Optimizando…<b><i style="width:8%"></i></b>'
    else if (item.status === 'up') st.innerHTML = `Subiendo ${Math.round(item.pct)}%<b><i style="width:${item.pct}%"></i></b>`
    else if (item.status === 'error') {
      st.textContent = item.err
      st.insertAdjacentHTML('beforeend', item.heic ? '<small>ver nota abajo</small>' : '<button class="retry" type="button">Reintentar</button>')
    }
    $('heic-note').hidden = !queue.some((q) => q.heic)
  }

  function retry(el) {
    const item = queue.find((q) => q.el === el)
    if (!item || item.heic || item.status !== 'error') return
    item.status = 'queued'
    item.err = null
    paintItem(item)
    pump()
    paintQueue()
  }

  const fmt = (s) => (s < 60 ? `${Math.max(5, Math.round(s / 5) * 5)} s` : `${Math.round(s / 60)} min`)
  function paintQueue() {
    const fl = inFlight()
    const errs = queue.filter((q) => q.status === 'error')
    const q = $('queue')
    if (!batch || (!fl && !errs.length)) { q.hidden = true; batch = null; return }
    q.hidden = false
    q.classList.toggle('done', !fl)
    const ok = Math.max(0, batch.total - fl - errs.length)
    const eta = ok > 0 ? ((Date.now() - batch.started) / 1000 / ok) * fl : null
    $('q-h').textContent = (fl ? `Subiendo ${ok} de ${batch.total}` : `${ok} de ${batch.total} subidas`) + (paused && fl ? ' · en pausa' : '')
    $('q-s').textContent = (fl ? `${eta ? 'Faltan ~' + fmt(eta) : 'Calculando tiempo…'} · no cierres esta pestaña` : '') +
      (errs.length ? `${fl ? ' · ' : ''}${errs.length} con problema${errs.length > 1 ? 's' : ''}` : '')
    $('q-ok').style.width = (ok / batch.total) * 100 + '%'
    $('q-err').style.width = (errs.length / batch.total) * 100 + '%'
    $('q-retry').hidden = !errs.some((x) => !x.heic)
    $('q-pause').hidden = !fl
    $('q-pause').textContent = paused ? 'Continuar' : 'Pausar'
    $('q-cancel').hidden = !fl
    $('q-discard').hidden = !!fl
  }
  setInterval(() => { if (inFlight()) paintQueue() }, 1000)

  const removeItem = (q) => { q.el.remove(); queue.splice(queue.indexOf(q), 1); if (batch) batch.total-- }
  $('q-pause').onclick = () => { paused = !paused; if (!paused) pump(); paintQueue() }
  $('q-cancel').onclick = () => {
    queue.filter((q) => ['queued', 'opt', 'up'].includes(q.status)).forEach((q) => {
      const was = q.status
      q.status = 'cancel'
      if (was === 'up') q.xhr?.abort()
      removeItem(q)
    })
    paused = false
    paintQueue()
    refreshCount()
  }
  $('q-retry').onclick = () => {
    queue.filter((q) => q.status === 'error' && !q.heic).forEach((q) => { q.status = 'queued'; q.err = null; paintItem(q) })
    pump()
    paintQueue()
  }
  $('q-discard').onclick = () => {
    queue.filter((q) => q.status === 'error').forEach(removeItem)
    $('heic-note').hidden = true
    paintQueue()
    refreshCount()
  }

  window.addEventListener('beforeunload', (e) => {
    flushDelete(true)
    if (inFlight()) { e.preventDefault(); e.returnValue = '' }
  })

  /* ─── Elegir / arrastrar archivos ─── */
  const files = $('files')
  $('pick').onclick = () => files.click()
  files.onchange = () => { addFiles(files.files); files.value = '' }

  const main = $('ad-main')
  const drop = $('drop')
  const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files')
  main.addEventListener('dragover', (e) => {
    if (!hasFiles(e)) return
    e.preventDefault()
    drop.classList.add('over')
    $('drop-h').textContent = 'Suelta las fotos aquí'
  })
  main.addEventListener('dragleave', (e) => {
    if (main.contains(e.relatedTarget)) return
    drop.classList.remove('over')
    refreshCount()
  })
  main.addEventListener('drop', (e) => {
    if (!hasFiles(e)) return
    e.preventDefault()
    drop.classList.remove('over')
    addFiles(e.dataTransfer.files)
  })

  paintCover()
  refreshCount()
}
