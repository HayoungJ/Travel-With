import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';

const root = ReactDOM.createRoot(document.getElementById('root'));

const authService = new AuthService();

root.render(
  <React.StrictMode>
    <App authService={authService} />
  </React.StrictMode>
);
