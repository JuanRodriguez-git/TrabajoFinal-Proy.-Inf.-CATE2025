import React from 'react';
import Wordle from './components/Wordle';
import Historial from './components/Historial';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Copia del Wordle</h1>
      <Wordle />
      <Historial />
    </div>
  );
}

export default App;

