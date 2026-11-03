
# Mundos IA

Programa desarrollado con Node.js que permite crear mundos personalizados y generar descripciones e imágenes utilizando inteligencia artificial.

## Instalación

```bash
npm install
```

Copia `.env.example` como `.env` y configura tus claves de Groq y Cloudflare.

## Uso

```bash
npm start -- "Un bosque lleno de demonios" "Kimetsu no Yaiba" Verde Rojo Negro Dorado Rosa
```

El programa guarda los mundos en JSON, sus descripciones en TXT y las imágenes en JPG.

## Estructura

- `src/`: código del programa.
- `data/`: mundos creados.
- `descripciones/`: descripciones generadas.
- `imagenes/`: imágenes generadas.
- `.env.example`: ejemplo de configuración.

## Servicios utilizados

- [Groq](https://groq.com/): generación de descripciones.
- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/): generación de imágenes con FLUX.1-schnell.

## Experimento de publicación

Con `.gitignore` activo, npm excluye los archivos ignorados. Al renombrarlo a `.gitignore.off`, esas reglas dejan de aplicarse y pueden incluirse archivos privados como `.env` y las carpetas de resultados.

Esto demuestra la importancia de proteger los archivos antes de publicar un paquete.

## Licencia

ISC



## Experimento de publicación

Se ejecutó npm publish --dry-run con .gitignore activo. npm excluyó correctamente .env, data/, descripciones/ e imagenes/, incluyendo solamente 7 archivos.

Después se renombró temporalmente .gitignore a .gitignore.off y se repitió el comando. Esta vez npm incluyó 12 archivos, entre ellos .env, los mundos JSON, las descripciones y las imágenes.

Esto demuestra que .gitignore permite excluir archivos durante la preparación del paquete cuando no existe .npmignore. Si se elimina o renombra, pueden incluirse credenciales privadas y archivos personales, exponiendo información que no debería publicarse.

Ambas pruebas se realizaron con npm publish --dry-run, sin publicar realmente el paquete.


### Preguntas de reflexión

**1. ¿Por qué el `id` se calcula sin la fecha? ¿Qué pasaría si la incluyeras?**

Porque así, cuando usamos los mismos datos, obtenemos el mismo ID. Si incluyéramos la fecha, cada vez saldría uno diferente y el programa no podría reconocer los archivos que ya existen.

**2. ¿Por qué se le pide al modelo de texto la descripción en inglés? Si puedes, prueba con una en español y compara las imágenes.**

Porque las IA que generan imágenes suelen entender mejor las instrucciones en inglés. En español también pueden funcionar, pero algunos detalles de la imagen podrían cambiar.

**3. ¿Qué diferencia hay entre una respuesta JSON de texto y una respuesta con los bytes de una imagen? ¿Qué es base64?**

El JSON contiene información en forma de texto, mientras que una imagen está formada por datos binarios. Base64 permite convertir esos datos en texto para poder transportarlos más fácilmente.

**4. ¿Qué pasaría si guardas la imagen con `'utf-8'`? ¿Por qué?**

La imagen podría dañarse porque UTF-8 sirve para guardar texto, no imágenes. Por eso debemos guardar la imagen directamente como datos binarios.

**5. ¿Qué pasos consumen cuota gratuita y cómo evitaste repetirlos?**

Las llamadas a Groq y Cloudflare consumen recursos de sus servicios. Para no gastar de nuevo, hice que el programa revisara si los archivos ya existían y los reutilizara.

**6. Si usaste IA: ¿qué fue lo más difícil de pedirle y qué parte tuviste que corregir tú?**

Lo más difícil fue lograr que la IA siguiera todos los requisitos del taller. También tuve que corregir algunos errores de configuración, como el Account ID de Cloudflare, para que funcionara la generación de imágenes.