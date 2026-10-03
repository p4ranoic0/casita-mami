// Foto tipo sticker: marco blanco, esquinas de cartulina y etiqueta manuscrita.
export default function Sticker({ src, cap, alt, rot = 0, className = '', style, ratio, corners = true, loading = 'lazy' }) {
  return (
    <figure className={'stk ' + className} style={{ transform: rot ? `rotate(${rot}deg)` : undefined, ...style }}>
      {corners && (
        <>
          <span className="corner c1" />
          <span className="corner c2" />
        </>
      )}
      <div className="ph" style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt ?? cap ?? ''} loading={loading} decoding="async" />
      </div>
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  )
}
