import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    // once: true,
    offset: 70,
    disable: false
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


