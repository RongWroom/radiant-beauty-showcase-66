
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import CriticalCSS from './components/performance/CriticalCSS.tsx';
import CoreWebVitals from './components/performance/CoreWebVitals.tsx';
import './index.css';

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CriticalCSS />
    <CoreWebVitals />
    <App />
  </React.StrictMode>
);
