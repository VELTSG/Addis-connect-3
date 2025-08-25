import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Ensure theme attribute is set before React mounts
const existing = document.documentElement.getAttribute('data-theme')
const saved = localStorage.getItem('ac_theme')
const initialTheme = existing || saved || 'valentine'
if (document.documentElement.getAttribute('data-theme') !== initialTheme) {
	document.documentElement.setAttribute('data-theme', initialTheme)
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
