import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// react-toastify 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { AppContextProvider } from './context/AppContext';

ReactDOM.render(
  <AppContextProvider>
    <App />
    {/* each popup closes after 4 segundos */}
    <ToastContainer autoClose={4000} />
  </AppContextProvider>,
  document.getElementById('root')
);
