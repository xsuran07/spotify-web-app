/**
 * @brief Entry file for react application.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file index.js
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
