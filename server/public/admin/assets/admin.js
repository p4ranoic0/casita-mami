/* =========================================================
   La Casita de Mami · Admin JS
   ========================================================= */

const csrf = document.body.dataset.csrf

const J = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF': csrf },
    body: JSON.stringify(body)
  }).then(r => r.json())

/* ─── Dashboard: visibility toggles ──────────────────────── */
document.querySelectorAll('#albums .toggle').forEach(t => t.addEventListener('change', e => {
  const id = e.target.closest('li').dataset.id
  J('/api/albums.php', { action: 'toggle', id, enabled: e.target.checked ? 1 : 0 })
  // Update the meta label dynamically
  const meta = e.target.closest('li').querySelector('.album-meta')
  if (meta) {
    const n = meta.dataset.n
    meta.textContent = n + (parseInt(n) === 1 ? ' foto' : ' fotos') + ' · ' + (e.target.checked ? 'visible' : 'oculto')
  }
}))

/* ─── Dashboard: "Nuevo álbum" inline form ────────────────── */
const btnNuevo = document.getElementById('btn-nuevo-album')
const nuevoWrap = document.getElementById('nuevo-album-wrap')
const nuevoInput = document.getElementById('nuevo-album-title')
const nuevoConfirm = document.getElementById('nuevo-album-confirm')
const nuevoCancel = document.getElementById('nuevo-album-cancel')

if (btnNuevo && nuevoWrap) {
  btnNuevo.addEventListener('click', () => {
    nuevoWrap.classList.add('open')
    nuevoInput.focus()
  })

  nuevoCancel.addEventListener('click', () => {
    nuevoWrap.classList.remove('open')
    nuevoInput.value = ''
  })

  async function submitNuevo() {
    const title = nuevoInput.value.trim()
    if (!title) { nuevoInput.focus(); nuevoInput.style.borderColor = 'var(--danger)'; return }
    nuevoInput.style.borderColor = ''
    nuevoConfirm.disabled = true
    nuevoConfirm.textContent = 'Creando...'
    try {
      const data = await J('/api/albums.php', { action: 'create', title })
      if (data && data.ok && data.id) {
        window.location.href = '/admin/album.php?id=' + data.id
      } else {
        nuevoConfirm.disabled = false
        nuevoConfirm.textContent = 'Crear'
        alert('Error al crear el álbum. Inténtalo de nuevo.')
      }
    } catch {
      nuevoConfirm.disabled = false
      nuevoConfirm.textContent = 'Crear'
      alert('Error de conexión.')
    }
  }

  nuevoConfirm.addEventListener('click', submitNuevo)
  nuevoInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitNuevo()
    if (e.key === 'Escape') {
      nuevoWrap.classList.remove('open')
      nuevoInput.value = ''
    }
  })
}

/* ─── Album editor ────────────────────────────────────────── */
const album = document.body.dataset.album
if (album) {
  const slug = document.body.dataset.slug

  // Save title + description
  const saveBtn = document.getElementById('save')
  const feedback = document.getElementById('save-feedback')
  saveBtn.onclick = () => {
    J('/api/albums.php', {
      action: 'update',
      id: album,
      title: document.getElementById('title').value,
      description: document.getElementById('desc').value
    }).then(() => {
      feedback.classList.add('visible')
      setTimeout(() => feedback.classList.remove('visible'), 2200)
    })
  }

  // Toggle visibility
  document.getElementById('enabled').onchange = e =>
    J('/api/albums.php', { action: 'toggle', id: album, enabled: e.target.checked ? 1 : 0 })

  // Sequential upload with progress bar
  const files   = document.getElementById('files')
  const bar     = document.getElementById('bar')
  const upinfo  = document.getElementById('upinfo')
  const grid    = document.getElementById('grid')

  files.onchange = async () => {
    const list = [...files.files]
    let done = 0
    upinfo.textContent = '0/' + list.length

    // Hide empty state if present
    const empty = document.getElementById('empty-state')
    if (empty) empty.style.display = 'none'

    for (const f of list) {
      const fd = new FormData()
      fd.append('file', f)
      fd.append('album_id', album)
      const r = await fetch('/api/upload.php', {
        method: 'POST',
        headers: { 'X-CSRF': csrf },
        body: fd
      }).then(r => r.json()).catch(() => ({}))

      done++
      bar.style.width = (done / list.length * 100) + '%'
      upinfo.textContent = done + '/' + list.length

      if (r && r.id) {
        const fig = document.createElement('figure')
        fig.dataset.id = r.id
        fig.innerHTML = `<img src="/galeria/media/${slug}/thumb/${r.filename || ''}?reload" loading="lazy"><button class="del" title="Borrar">✕</button>`
        grid.appendChild(fig)
      }
    }

    upinfo.textContent = 'Subido'
    setTimeout(() => {
      bar.style.width = '0'
      upinfo.textContent = ''
      location.reload()
    }, 900)
  }

  // Drag-to-reorder
  new Sortable(grid, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: () => {
      const order = [...grid.children].map(f => f.dataset.id)
      J('/api/reorder.php', { order })
    }
  })

  // Delete photo (delegated)
  grid.addEventListener('click', e => {
    if (!e.target.classList.contains('del')) return
    const fig = e.target.closest('figure')
    if (!confirm('¿Borrar esta foto?')) return
    J('/api/delete-photo.php', { id: fig.dataset.id }).then(() => fig.remove())
  })
}
