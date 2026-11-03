
import fs from 'node:fs';
import path from 'node:path';

import { crearMundo, guardarMundo, leerMundo } from './mundo.js';
import { describirMundo } from './texto.js';
import { generarImagen } from './imagen.js';

process.loadEnvFile();

const rutaDescripciones = path.join(
    import.meta.dirname,
    '..',
    'descripciones'
);

const rutaImagenes = path.join(
    import.meta.dirname,
    '..',
    'imagenes'
);

try {

    // Crear y guardar el mundo
    const args = process.argv.slice(2);
    const mundo = crearMundo(args);
    const rutaMundo = guardarMundo(mundo);

    console.log(`Mundo creado y guardado en: ${rutaMundo}`);

    // Leer el mundo guardado
    const mundoLeido = leerMundo(rutaMundo);

    // Definir las rutas de los archivos
    const rutaDescripcion = path.join(
        rutaDescripciones,
        `mundo_${mundoLeido.id}.txt`
    );

    const rutaImagen = path.join(
        rutaImagenes,
        `mundo_${mundoLeido.id}.jpg`
    );

    // Comprobar si ya existe la descripción
    let descripcion;

    if (fs.existsSync(rutaDescripcion)) {

        console.log('La descripción ya existe. Se reutilizará.');

        descripcion = fs.readFileSync(rutaDescripcion, 'utf-8');

    } else {

        console.log('Generando descripción con Groq...');

        descripcion = await describirMundo(mundoLeido);

    }

    // Comprobar si ya existe la imagen
    if (fs.existsSync(rutaImagen)) {

        console.log('La imagen ya existe. Se reutilizará.');

    } else {

        console.log('Generando imagen con Cloudflare...');

        const imagenBytes = await generarImagen(descripcion);

        if (!fs.existsSync(rutaImagenes)) {
            fs.mkdirSync(rutaImagenes, { recursive: true });
        }

        fs.writeFileSync(rutaImagen, imagenBytes);

        console.log('Imagen generada y guardada correctamente:');
        console.log(rutaImagen);
    }

} catch (error) {

    console.log('\nOcurrió un error:');

    if (error.status === 401 || error.status === 403) {

        console.log('La API Key es incorrecta o no tiene permisos.');

    } else if (error.status === 402 || error.status === 429) {

        console.log('Se agotó la cuota disponible o se alcanzó el límite de solicitudes.');

    } else if (error.status === 404 || error.status === 410) {

        console.log('La URL o el modelo de la API no existe o no está disponible.');

    } else if (error.name === 'TimeoutError') {

        console.log('La solicitud superó el tiempo de espera permitido.');

    } else if (error instanceof TypeError) {

        console.log('Error de conexión. Comprueba tu conexión a Internet y la URL.');

    } else {

        console.log(error.message);
    }
}
