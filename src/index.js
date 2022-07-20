import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';
import TravelRepository from './service/travel_repository';
import KakaoMap from './service/kakao_map';

const root = ReactDOM.createRoot(document.getElementById('root'));

const authService = new AuthService();
const travelRepository = new TravelRepository();
const kakaoMap = new KakaoMap();

root.render(
  <App
    authService={authService}
    travelRepository={travelRepository}
    kakaoMap={kakaoMap}
  />
);
