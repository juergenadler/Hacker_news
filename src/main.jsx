import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

/* import { createBrowserRoute, RouterProvider, Route } from "react-router-dom"
import './index.css';

const router = createBrowserRoute([
  {
    element: <App />
    children: []
  }
]) */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);