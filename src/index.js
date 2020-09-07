import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import Navigation from './navigation'

ReactDOM.render(
  <React.StrictMode>
    <Auth>
      <Navigation />
    </Auth>
  </React.StrictMode>,
  document.getElementById('root')
)