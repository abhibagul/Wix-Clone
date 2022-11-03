import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Component/App';
import WrapContexts from './Context/wrapContexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WrapContexts>
      <App />
    </WrapContexts>
  </React.StrictMode>
);

