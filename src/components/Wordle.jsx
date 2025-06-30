import React, { useState, useEffect } from 'react';
import { obtenerPalabraDelDia, compararPalabra } from './utils';

const INTENTOS_MAX = 6;

function Wordle() {
  const [palabra, setPalabra] = useState('');
  const [entrada, setEntrada] = useState('');
  const [intentos, setIntentos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [victoria, setVictoria] = useState(false);

  useEffect(() => {
    setPalabra(obtenerPalabraDelDia());
  }, []);

  const manejarEnter = () => {
    if (entrada.length !== palabra.length) return;
    if (victoria) return;

    const nuevoIntento = entrada;
    const feedback = compararPalabra(nuevoIntento, palabra);

    const nuevosIntentos = [...intentos, nuevoIntento];
    const nuevosResultados = [...resultados, feedback];

    setIntentos(nuevosIntentos);
    setResultados(nuevosResultados);
    setEntrada('');

    if (nuevoIntento === palabra) {
      setVictoria(true);

      guardarResultado(fechaDeHoy(), {
        palabra,
        gano: true,
        intentos: nuevosIntentos.length,
      });
    } else if (nuevosIntentos.length === INTENTOS_MAX) {

      guardarResultado(fechaDeHoy(), {
        palabra,
        gano: false,
        intentos: nuevosIntentos.length,
      });
    }
  };

  return (
    <div className="wordle">

      {victoria && (
        <div className="mensaje-victoria">
          <strong>¡Felicidades! Adivinaste la palabra</strong>
        </div>
      )}

      <div className="info">
        <p>Palabra de {palabra.length} letras</p>
        <p>Intentos usados: {intentos.length} / {INTENTOS_MAX}</p>
        <p>Te quedan {INTENTOS_MAX - intentos.length} intento(s)</p>
      </div>

      {intentos.map((pal, idx) => (
        <div key={idx} className="fila">
          {pal.split('').map((letra, i) => (
            <span key={i} className={resultados[idx][i]}>{letra}</span>
          ))}
        </div>
      ))}

      {!victoria && intentos.length < INTENTOS_MAX && (
        <input
          type="text"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === 'Enter' && manejarEnter()}
          maxLength={palabra.length}
          placeholder="Escribí una palabra"
        />
      )}
    </div>
  );
}

function guardarResultado(fecha, resultado) {
  const historial = JSON.parse(localStorage.getItem("historialWordle")) || {};
  historial[fecha] = resultado;
  localStorage.setItem("historialWordle", JSON.stringify(historial));
}

function fechaDeHoy() {
  return new Date().toISOString().split("T")[0];
}


export default Wordle;
