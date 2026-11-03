
# PROMPT.md

## A. Declaración
Usé IA: sí.

## B. Herramienta
ChatGPT, modelo GPT-6.

## C. Prompt inicial

Fue el texto plantilla que dio:

``` 
Actúa como un instructor de Node.js para principiantes del SENA.
Quiero construir un programa de consola llamado "mundos-ia".

CONTEXTO: solo conozco estos temas: process.argv, módulos con require,
el módulo nativo fs (writeFileSync, readFileSync, existsSync, mkdirSync),
path, npm (init, install, scripts), el paquete object-hash, variables de
entorno con .env y process.loadEnvFile, async/await con try/catch y el fetch
nativo de Node.

OBJETIVO:
1. Recibir por parámetros una situación, un mundo y 5 colores, y guardarlos
   en un objeto JSON en data/mundo_<id>.json.
2. Leer ese JSON y enviarlo con fetch a la API de un modelo de lenguaje para
   que genere la descripción de una imagen. Guardarla en
   descripciones/mundo_<id>.txt.
3. Enviar esa descripción con fetch a la API de un modelo de imágenes y
   guardar la imagen en imagenes/mundo_<id>.jpg.

RESTRICCIONES:
- No uses dotenv, axios, SDK de proveedores, readline, commander ni frameworks.
- Código simple, con comentarios en español numerados ("paso 1", "paso 2"...).
- Las API keys se leen del archivo .env y nunca se escriben en el código.
- Si el .txt o la imagen ya existen, no vuelvas a llamar a las APIs.
- Divide el código en src/index.js, src/mundo.js, src/texto.js y src/imagen.js.

SERVICIOS: texto con <Groq o NVIDIA>, imagen con <NVIDIA FLUX.1-schnell o
Cloudflare>. (Pega aquí la ficha del servicio de la guía del taller.)

FORMA DE RESPONDER: dame un archivo a la vez, explica cada bloque en 2 líneas
y no uses nada que no esté en el CONTEXTO.
```

y agregue esta pequeña parte:

```
dado ese promp para evitar errores o malas ejecuciones entiende el taller y haremos paso a paso cada parte explicandome como indique para entender el codigo y yo modificarlo a lo que entendi si llegas a cometer un eror. la parte uno ya la realize yo
```


## D. Prompts siguientes

1. Crear el proyecto: pedí explicar el taller y desarrollarlo por partes. La IA explicó la estructura y creé los archivos.
2. Generar descripciones: pedí ayuda con la API de Groq. La IA proporcionó el código y lo implementé.
3. Generar imágenes: pedí solucionar los errores de NVIDIA. La IA propuso Cloudflare y adapté el código.
4. Reutilizar archivos: pedí implementar la reutilización y el manejo de errores. Probé el código y comprobé que funcionara.

## E. Cambios que hice

- Elegí Groq y Cloudflare como servicios.
- Cambié NVIDIA por Cloudflare debido a los tiempos de espera ya que se demoraba mucho en responder incluso en la pagina de prueba.
- Configuré mis propias credenciales en `.env`.

## F. Código aprendido

`AbortSignal.timeout(60000)`: establece un límite de 60 segundos para esperar la respuesta de una API.

## G. Error y solución

NVIDIA presentó un error `TimeoutError`. Cambié a Cloudflare, pero inicialmente obtuve un error 404 por dejar `TU_ACCOUNT_ID` en la URL por que me olvide. Lo solucioné colocando mi Account ID real.
