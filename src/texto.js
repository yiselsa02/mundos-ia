
import fs from 'node:fs';
import path from 'node:path';

const rutaDescripciones = path.join(import.meta.dirname, '..', 'descripciones');

export async function describirMundo(mundo) {

    const apiKey = process.env.TEXTO_API_KEY;
    const apiUrl = process.env.TEXTO_URL;
    const modelo = process.env.TEXTO_MODELO;

    if (!apiKey || !apiUrl || !modelo) {
        throw new Error('Faltan variables de configuración para la API de texto.');
    }

    const instrucciones = `Create an image description in English using the following world information: ${JSON.stringify(mundo)}. Describe the scene, elements, lighting, composition, and artistic style. Include all five colors provided. Write between 80 and 120 words. Do not include a title, markdown, or text inside the image.`;

    const mensajeSistema = `You are an expert visual scene designer. Your task is to transform the provided world information into a detailed image description in English. Describe the environment, important visual elements, lighting, composition, and artistic style. Include all five colors provided, using their English translations when necessary. The description must contain between 80 and 120 words, written as one paragraph. Do not include a title, markdown formatting, letters, words, or any visible text inside the image. Focus on creating a coherent, visually rich scene that faithfully represents the requested world and situation.`;

    const respuesta = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: modelo,
            messages: [
                {
                    role: 'system',
                    content: mensajeSistema
                },
                {
                    role: 'user',
                    content: instrucciones
                }
            ]
        }),
        signal: AbortSignal.timeout(30000)
    });

    if (!respuesta.ok) {
        const error = new Error('Error al solicitar la descripción a Groq.');
        error.status = respuesta.status;
        throw error;
    }

    const datos = await respuesta.json();

    let descripcion = datos.choices[0].message.content.trim();

    if (!descripcion) {
        throw new Error('Groq devolvió una descripción vacía.');
    }

    if (descripcion.length > 1500) {
        descripcion = descripcion.slice(0, 1500);
        console.log('La descripción superaba los 1500 caracteres y fue recortada.');
    }

    if (!fs.existsSync(rutaDescripciones)) {
        fs.mkdirSync(rutaDescripciones, { recursive: true });
    }

    const rutaArchivo = path.join(rutaDescripciones, `mundo_${mundo.id}.txt`);

    fs.writeFileSync(rutaArchivo, descripcion, 'utf-8');

    return descripcion;

}
