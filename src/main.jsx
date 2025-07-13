import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { applyTheme, initThemeWatcher } from './utils/theme'

applyTheme(localStorage.getItem("theme-preference") || "system");
initThemeWatcher();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)