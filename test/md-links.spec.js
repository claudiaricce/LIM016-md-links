const { mdLinks } = require('../src/mdlinks.js');
const path = require('path');

const mdLinksReject = [
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

describe('mdLinks', () => {

  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('debe retornar un mensaje, advirtiendo que la ruta no existe', ()=>{
      const resultado = mdLinks('prueba/prueba4.md')
      resultado.then((res)=> expect(res).toStrictEqual('Path does not exist')).catch((rej)=>rej);
  });
  it('debe retornar un mensaje, advirtiendo que no hay archivos .md', ()=>{
    const resultado = mdLinks('./src')
    resultado.then((res)=> expect(res).toStrictEqual('There is no md files')).catch((rej)=>rej);
  });
  it('debe retornar un mensaje, advirtiendo que no hay links', ()=>{
    const resultado = mdLinks('./prueba/prueba1')
    resultado.then((res)=> expect(res).toStrictEqual('There is no links')).catch((rej)=>rej);
  });
  it('debe retornar en un array de objetos con las propiedades de los links, pertenecientes solo a archivos .md de la ruta que se ingresa, cuando no ha sido validado (options)', () => {
      const resultado = mdLinks(('./prueba'),{ validate: false });
      resultado.then((res) => expect(res).toStrictEqual(mdLinksReject));
  });
  it('debe retornar en un array de objetos con las propiedades de los links más sus status pertenecientes solo a archivos .md de la ruta que se ingresa si ha sido validado (options)', () => {
      const resultado = mdLinks(('./prueba'),{ validate: true });
      resultado.then((res) => expect(res).toStrictEqual(mdLinksWithStatus));
  });

});
