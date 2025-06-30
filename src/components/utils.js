import palabras from '../palabras.json';

export function obtenerPalabraDelDia() {
  const hoy = new Date();
  const fechaBase = new Date('2025-01-01');

  const diffDias = Math.floor((hoy - fechaBase) / (1000 * 60 * 60 * 24));

  const indice = diffDias % palabras.length;

  return palabras[indice];
}

export function compararPalabra(intentada, correcta) {
  const resultado = Array(intentada.length).fill("incorrecta");

  for (let i = 0; i < intentada.length; i++) {
    if (intentada[i] === correcta[i]) {
      resultado[i] = "correcta";
    } else if (correcta.includes(intentada[i])) {
      resultado[i] = "mal-posicionada";
    }
  }

  return resultado;
}