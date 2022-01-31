const path= require('path');
const {
    routeExist,
    routeState,
    routeIsDirec,
    routeIsFile,
    readExt,
    readDirectory,
    readArchive,
    joinPaths,
    mdFilesRoute,
    getLinks,
    getLinksStatus} = require('../src/index.js');

    const route = path.resolve('./README.md');
    const routeDirectory = path.resolve('./prueba');
    const filesPrueba = [ 'prueba1','prueba2.md', 'prueba3.md', 'style.css', 'texto.js'];
    const routesfilesPrueba = [
      path.resolve('./prueba/prueba1'),
      path.resolve('./prueba/prueba2.md'),
      path.resolve('./prueba/prueba3.md'),
      path.resolve('./prueba/style.css'),
      path.resolve('./prueba/texto.js'),
    ];
    const routesfilesMD = [
      path.resolve('./prueba/prueba1/nolinks.md'),
      path.resolve('./prueba/prueba2.md'),
      path.resolve('./prueba/prueba3.md'),
    ];
    
    const mdLinks = [
      {
        href: 'https://www.google.com.pe/',
        text: 'https://www.google.com.pe/',
        file: path.resolve('./prueba/prueba2.md')
      },
      {
        href: 'https://www.it-swarm-es.com/',
        text: 'https://www.it-swarm-es.com/',
        file: path.resolve('./prueba/prueba2.md')
      },
      {
        href: 'https://es.stackoverflow.com/',
        text: 'https://es.stackoverflow.com/',
        file: path.resolve('./prueba/prueba2.md')
      },
      {
        href: 'https://bitly.com/404-error-page',
        text: 'https://bitly.com/404-error-page',
        file: path.resolve('./prueba/prueba3.md')
      },
    ]
    
    const mdLinksWithStatus = [
      {
        href: 'https://www.google.com.pe/',
        text: 'https://www.google.com.pe/',
        file: path.resolve('./prueba/prueba2.md'),
        status: 200,
        message: 'ok'
      },
      {
        href: 'https://www.it-swarm-es.com/',
        text: 'https://www.it-swarm-es.com/',
        file: path.resolve('./prueba/prueba2.md'),
        status: 200,
        message: 'ok'
      },
      {
        href: 'https://es.stackoverflow.com/',
        text: 'https://es.stackoverflow.com/',
        file: path.resolve('./prueba/prueba2.md'),
        status: 200,
        message: 'ok'
      },
      {
        href: 'https://bitly.com/404-error-page',
        text: 'https://bitly.com/404-error-page',
        file: path.resolve('./prueba/prueba3.md'),
        status: 404,
        message: 'fail'
      }
    ]
    
    describe('routeExist', () => {
      it('retorna una extensión, ejemplo .txt , .md', () => {
        expect(routeExist(route)).toBe(true);
      });    
    });
    
    describe('routeState', () => {
      it('debe retornar una ruta absoluta', () => {
        expect(routeState('./README.md')).toBe(route);
      });
    });
    
    describe('routeIsDirec', () => {
      it('retorna true si la ruta es un directorio', () => {
        expect(routeIsDirec(routeDirectory)).toBe(true);
      });
      it('retorna false si la ruta no es un directorio', () => {
        expect(routeIsDirec(route)).toBe(false);
      });
    });
    
    describe('routeIsFile', () => {
      it('retorna true si la ruta es un file', () => {
        expect(routeIsFile('README.md')).toBe(true);
      });
      it('retorna false si la ruta no es un file', () => {
        expect(routeIsFile(routeDirectory)).toBe(false);
      });
    });
    
    describe('readExt', () => {
      it('debe retornar true si la extensión es .md', () => {
        expect(readExt(route)).toBe('.md');
      });
    });
    
    describe('readDirectory', () => {
      it('debe retornar las carpetas y files que hay dentro del directorio', () => {
        expect(readDirectory(routeDirectory)).toEqual(filesPrueba);
      });
    });
    
    describe('joinPaths', () => {
      it('debe retornar en un array los archivos de un directorio con sus rutas absolutas', () => {
        expect(joinPaths(routeDirectory)).toEqual(routesfilesPrueba);
      });
    });
    
    describe('readArchive', () => {
      it('debe retornar en un string todo el contenido del file', () => {
        const result = readArchive(path.resolve('./prueba/prueba3.md'));
        expect(result.trim()).toEqual('https://bitly.com/404-error-page');
      });
    });
    
    describe('mdFilesRoute', () => {
      it ('retorna un array de rutas absolutas de archivos md', () => {
        expect(mdFilesRoute(routeDirectory)).toEqual(routesfilesMD);
      });
    });
    
    
    describe('getLinks', () => {
      it('retorna un array de solo archivos .md que contengan links con las propiedades de los mismos', () => {
        expect(getLinks(routeDirectory)).toEqual(mdLinks)
      });
    });
    
    describe ('getLinksStatus', () => {
      it('retorna el mismo arrary de getLinks, pero con el status del link', () =>{
          return expect(getLinksStatus(mdLinks)).resolves.toStrictEqual(mdLinksWithStatus)
      });
    });