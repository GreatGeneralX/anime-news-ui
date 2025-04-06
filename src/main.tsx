// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'; 
// ← ここがちゃんと `App.tsx` 指してる？

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


