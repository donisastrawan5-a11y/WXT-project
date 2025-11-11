import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import CredentialFrom from './components/credentialForm';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <Toaster />
      <CredentialFrom />
    </>
  </React.StrictMode>
);
