import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export { SEO, socialImage, localBusinessData } from './data/seo'

export function render(pathname) {
  return renderToString(<StaticRouter location={pathname}><App /></StaticRouter>)
}
