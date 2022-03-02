# Mdlinks - Claudia

## Índice

* [1. Resumen](#1-resumen)
* [2. Flujogramas](#2-flujogramas)
* [3. Guía de uso](#3-guia-de-uso)
* [4. Librerías usadas](#4-librerías-usadas)
* [5. Autor](#5-autor)

***

## 1. Resumen

Mdlinks-Claudia es una librería creada a través de [Node.js](https://nodejs.org/), que lee y analiza archivos
en formato `Markdown`, para verificar los links que contiene y reportar algunas estadísticas, como el total y los links rotos.

## 2. Flujogramas

### 2.1 API

![api](https://github.com/claudiaricce/LIM016-md-links/blob/main/diagramas/diagrama%20api.png?raw=true)

### 2.2 CLI

![cli](https://github.com/claudiaricce/LIM016-md-links/blob/main/diagramas/diagrama%20cli.png?raw=true)

## 3. Guía de uso

### 3.1 Instalación 
```sh
npm i mdlinks-claudia
```

### 3.2 Como usar la librería
```sh
const md-links = require('mdlinks-claudia');
```
### 3.3  Uso en el terminal 

Para ejecutarlo en el terminal 
```sh
$ md-links <path> [options]
```
Por ejemplo:

```sh
$ md-Links ./prueba
href: https://www.google.com.pe/
text: https://www.google.com.pe/
file: C:\laboratoria\MD links\LIM016-md-links\prueba\prueba2.md
```
El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### 3.3.1 Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-Links ./prueba --validate
href: https://es.stackoverflow.com/
text: https://es.stackoverflow.com/
file: C:\laboratoria\MD links\LIM016-md-links\prueba\prueba2.md
status: 200
message: ok
```
```sh
$ md-Links ./prueba --validate
href: https://bitly.com/404-error-page
text: https://bitly.com/404-error-page
file: C:\laboratoria\MD links\LIM016-md-links\prueba\prueba3.md
status: 404
message: fail
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-Links ./prueba --stats
Total: 4
Unique: 4
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./prueba --stats --validate
Total: 4
Unique: 4
Broken: 1
```
##### `--help`

Si ingresamos el comando global md-link seguido de la dirección de la ubicación del archivo y seguido del comando --help obtendremos un texto de ayuda como el siguiente:

```sh
$ md-links ./prueba --help
********************************************************************************************
                                         HELP
--validate / Show the link, its text, its route, its status number and its status message
--stats    /  Show the total links and the unique links
--stats --validate  / Show the total, unique and broken links
*********************************************************************************************
Use this structure : mdLinks <route> <command> to run the cli
But you can also write only mdLinks <route> and you will get the link, its text and its file
```
Para mayor información: [mdlinks-claudia](https://www.npmjs.com/package/mdlinks-claudia)

## 4. Herramientas usadas
* [File System](https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#file-system)
* [Path module](https://nodejs.org/dist/latest-v17.x/docs/api/path.html)
* [Node-fetch](https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#file-system)
* [Marked](https://www.npmjs.com/package/marked)

## 5. Autor
* [Claudia Ricce- Laboratoria LIM 016](https://github.com/claudiaricce)
