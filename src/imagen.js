
export async function generarImagen(descripcion) {

    const apiKey = process.env.IMAGEN_API_KEY;
    const apiUrl = process.env.IMAGEN_URL;

    if (!apiKey || !apiUrl) {
        throw new Error('Faltan variables de configuración para Cloudflare.');
    }

    const respuesta = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: descripcion,
            steps: 4
        }),
        signal: AbortSignal.timeout(60000)
    });

    // Verificar si Cloudflare respondió correctamente
    if (!respuesta.ok) {

        const detalle = await respuesta.text();

        console.log('Estado:', respuesta.status);
        console.log('Respuesta de Cloudflare:', detalle);

        throw new Error('Error al solicitar la imagen a Cloudflare.');
    }

    // Obtener la respuesta JSON
    const datos = await respuesta.json();

    if (!datos.result || !datos.result.image) {
        throw new Error('Cloudflare no devolvió la imagen esperada.');
    }

    // Convertir la imagen de base64 a bytes
    const imagenBase64 = datos.result.image;
    const imagenBytes = Buffer.from(imagenBase64, 'base64');

    if (imagenBytes.length === 0) {
        throw new Error('La imagen recibida está vacía.');
    }

    return imagenBytes;
}
