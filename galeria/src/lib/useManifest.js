import { useEffect, useState } from 'react'

// Carga /manifest.json una sola vez. Devuelve { manifest, loading, error }.
export function useManifest() {
  const [state, setState] = useState({ manifest: null, loading: true, error: null })

  useEffect(() => {
    let alive = true
    fetch(import.meta.env.BASE_URL + 'manifest.json', { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((manifest) => alive && setState({ manifest, loading: false, error: null }))
      .catch((error) => alive && setState({ manifest: null, loading: false, error }))
    return () => { alive = false }
  }, [])

  return state
}
