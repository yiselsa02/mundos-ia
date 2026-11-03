import fs from 'node:fs';
import path from 'node:path';
import objectHash from 'object-hash';

const rutaData = path.join(import.meta.dirname, '..', 'data');

export function crearMundo(args) {
  
    if (args.length !== 7) {
        throw new Error('Debes ingresar una situación, un mundo y 5 colores.');
    }


    for (const argumento of args) {
        if (argumento.trim() === '') {
            throw new Error('Ningún argumento puede estar vacío.');
        }
    }

    const colores = args.slice(2);


    const coloresUnicos = colores.map(color => color.toLowerCase());

    if (new Set(coloresUnicos).size !== 5) {
        throw new Error('Los cinco colores deben ser diferentes.');
    }

    const situacion = args[0];
    const mundo = args[1]; 

    const datos = { situacion, mundo, colores };

    const id = objectHash(datos).slice(0, 8);


    // paso 8: crear el objeto del mundo
    const nuevoMundo = {
        id: id,
        situacion: situacion,
        mundo: mundo,
        colores: colores,
        creadoEn: new Date().toISOString()
    };

    return nuevoMundo;

}

export function guardarMundo(mundo) {

    if (!fs.existsSync(rutaData)) {
        fs.mkdirSync(rutaData, { recursive: true });
    }

    const rutaArchivo = path.join(rutaData, `mundo_${mundo.id}.json`);

      fs.writeFileSync(rutaArchivo, JSON.stringify(mundo, null, 2));

    return rutaArchivo;

}


export function leerMundo(ruta) {

    const contenido = fs.readFileSync(ruta, 'utf-8');

    const mundo = JSON.parse(contenido);

    return mundo;
}
