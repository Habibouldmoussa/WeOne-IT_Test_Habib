//Importation des dépendances react
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing'; //routage
//Création du root dom
const root = ReactDOM.createRoot(document.getElementById('root'));
//Integration du rendu et le routage 
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);