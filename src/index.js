import { crearMundo, guardarMundo, leerMundo } from './mundo.js';
import { describirMundo } from './texto.js';

process.loadEnvFile();

const args = process.argv.slice(2);
const mundo = crearMundo(args);
const ruta = guardarMundo(mundo);

console.log(`Mundo creado y guardado en: ${ruta}`);

const mundoLeido = leerMundo(ruta);

const descripcion = await describirMundo(mundoLeido);

console.log('Descripción generada correctamente:');
console.log(descripcion);
