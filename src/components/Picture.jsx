import { pictureData, pictureSrcSet } from '../data/picture'

export default function Picture({ src, alt = '', sizes = '(max-width: 700px) 100vw, 800px', width, height, priority = false, loading = 'lazy', ...props }) {
  const data = pictureData(src)
  return (
    <picture>
      {data && <source type="image/avif" srcSet={pictureSrcSet(src, 'avif')} sizes={sizes} />}
      {data && <source type="image/webp" srcSet={pictureSrcSet(src, 'webp')} sizes={sizes} />}
      <img src={src} alt={alt} width={width ?? data?.width} height={height ?? data?.height}
        loading={priority ? 'eager' : loading} decoding="async" fetchpriority={priority ? 'high' : undefined} {...props} />
    </picture>
  )
}
