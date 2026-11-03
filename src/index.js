import { crearMundo, guardarMundo } from './mundo.js';

const args = process.argv.slice(2);
const mundo = crearMundo(args);
const ruta = guardarMundo(mundo);

console.log(`Mundo creado y guardado en: ${ruta}`);

