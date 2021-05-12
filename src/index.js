import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import Navigation from './navigation'
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth>
        <Navigation />
      </Auth>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)