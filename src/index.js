import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';
import TravelRepository from './service/travel_repository';

const root = ReactDOM.createRoot(document.getElementById('root'));

const authService = new AuthService();
const travelRepository = new TravelRepository();

root.render(
  <React.StrictMode>
    <App authService={authService} travelRepository={travelRepository} />
  </React.StrictMode>
);
