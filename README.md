
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
