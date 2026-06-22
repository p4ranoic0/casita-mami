const csrf = document.body.dataset.csrf
const J = (url, body) => fetch(url, {method:'POST', headers:{'Content-Type':'application/json','X-CSRF':csrf}, body:JSON.stringify(body)}).then(r=>r.json())

// Dashboard: toggles de visibilidad
document.querySelectorAll('#albums .toggle').forEach(t => t.addEventListener('change', e => {
  const id = e.target.closest('li').dataset.id
  J('/api/albums.php', {action:'toggle', id, enabled: e.target.checked ? 1 : 0})
}))

// Editor de álbum
const album = document.body.dataset.album
if (album) {
  const slug = document.body.dataset.slug
  document.getElementById('save').onclick = () =>
    J('/api/albums.php', {action:'update', id:album, title:title.value, description:desc.value}).then(()=>save.textContent='Guardado ✓')
  document.getElementById('enabled').onchange = e =>
    J('/api/albums.php', {action:'toggle', id:album, enabled:e.target.checked?1:0})

  // Subida secuencial con barra
  const files = document.getElementById('files'), bar = document.getElementById('bar'), upinfo = document.getElementById('upinfo'), grid = document.getElementById('grid')
  files.onchange = async () => {
    const list = [...files.files]; let done = 0
    for (const f of list) {
      const fd = new FormData(); fd.append('file', f); fd.append('album_id', album)
      const r = await fetch('/api/upload.php', {method:'POST', headers:{'X-CSRF':csrf}, body:fd}).then(r=>r.json()).catch(()=>({}))
      done++; bar.style.width = (done/list.length*100)+'%'; upinfo.textContent = `${done}/${list.length}`
      if (r && r.id) {
        const fig = document.createElement('figure'); fig.dataset.id = r.id
        fig.innerHTML = `<img src="/galeria/media/${slug}/thumb/?reload"><button class="del">✕</button>`
        grid.appendChild(fig)
      }
    }
    upinfo.textContent = '✓ subido'; setTimeout(()=>{ bar.style.width='0'; location.reload() }, 800)
  }

  // Reordenar
  new Sortable(grid, {animation:150, onEnd: () => {
    const order = [...grid.children].map(f => f.dataset.id)
    J('/api/reorder.php', {order})
  }})

  // Borrar (delegado)
  grid.addEventListener('click', e => {
    if (!e.target.classList.contains('del')) return
    const fig = e.target.closest('figure')
    if (!confirm('¿Borrar esta foto?')) return
    J('/api/delete-photo.php', {id: fig.dataset.id}).then(()=> fig.remove())
  })
}
