import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
const browserHistory = createBrowserHistory();
root.render(
    <BrowserRouter
    history={browserHistory}
    >
      <App />
    </BrowserRouter>
);