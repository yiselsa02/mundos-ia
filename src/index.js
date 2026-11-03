
import fs from 'node:fs';
import path from 'node:path';

import { crearMundo, guardarMundo, leerMundo } from './mundo.js';
import { describirMundo } from './texto.js';
import { generarImagen } from './imagen.js';

process.loadEnvFile();

const args = process.argv.slice(2);

const mundo = crearMundo(args);

const ruta = guardarMundo(mundo);

console.log(`Mundo creado y guardado en: ${ruta}`);

const mundoLeido = leerMundo(ruta);

const descripcion = await describirMundo(mundoLeido);

console.log('Descripción generada correctamente:');
console.log(descripcion);

const rutaDescripcion = path.join(
    import.meta.dirname,
    '..',
    'descripciones',
    `mundo_${mundoLeido.id}.txt`
);

const descripcionGuardada = fs.readFileSync(rutaDescripcion, 'utf-8');

const imagenBytes = await generarImagen(descripcionGuardada);

const rutaImagenes = path.join(import.meta.dirname, '..', 'imagenes');

if (!fs.existsSync(rutaImagenes)) {
    fs.mkdirSync(rutaImagenes, { recursive: true });
}

const rutaImagen = path.join(
    rutaImagenes,
    `mundo_${mundoLeido.id}.jpg`
);

fs.writeFileSync(rutaImagen, imagenBytes);

console.log('Imagen generada y guardada en:');
console.log(rutaImagen);
