import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './containers/Home/App'
import './styles/globalStyles.css'
import { NewsProvider } from './context/newsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewsProvider>
      <App/>
    </NewsProvider>
  </StrictMode>,
)
