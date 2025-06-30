import React, { useEffect, useState } from 'react';

function Historial() {
  const [historial, setHistorial] = useState({});

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("historialWordle")) || {};
    setHistorial(datos);
  }, []);

  const fechasOrdenadas = Object.keys(historial).sort((a, b) => b.localeCompare(a)); // más recientes primero

  return (
    <div className="historial">
      <h3>Historial de partidas</h3>
      <ul>
        {fechasOrdenadas.map((fecha) => {
          const resultado = historial[fecha];
          return (
            <li key={fecha}>
              <strong>{fecha}</strong>: {resultado.gano ? '✅ Ganó' : '❌ Perdió'} en {resultado.intentos} intento(s) — palabra: <code>{resultado.palabra}</code>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Historial;
