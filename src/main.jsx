import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
  disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
