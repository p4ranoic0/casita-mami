import { useEffect, useState } from 'react'

// Carga /manifest.json una sola vez. Devuelve { manifest, loading, error }.
export function useManifest({ overview = false } = {}) {
  const [state, setState] = useState(() => {
    if (overview) {
      const embedded = document.getElementById('gallery-overview')?.textContent
      if (embedded) {
        try { return { manifest: JSON.parse(embedded), loading: false, error: null } } catch { /* usa el manifest externo */ }
      }
    }
    return { manifest: null, loading: true, error: null }
  })

  useEffect(() => {
    if (!state.loading) return
    let alive = true
    fetch(import.meta.env.BASE_URL + 'manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((manifest) => alive && setState({ manifest, loading: false, error: null }))
      .catch((error) => alive && setState({ manifest: null, loading: false, error }))
    return () => { alive = false }
  }, [state.loading])

  return state
}
