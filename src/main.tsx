import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // MUST import CSS for Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);