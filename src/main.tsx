import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AccountOverlayProvider } from './pages/AccountOverlayContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountOverlayProvider>
        <App />
      </AccountOverlayProvider>
    </BrowserRouter>
  </React.StrictMode>
);
