// Placeholder con shimmer (clase .skeleton definida en styles/index.css).
export default function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />
}
