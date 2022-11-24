import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "./main.css";
window.React = React


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <App />
  </>
);

