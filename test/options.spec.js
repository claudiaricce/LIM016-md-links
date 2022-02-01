const { 
    totalLinks,
    uniqueLinks,
    brokenLinks,
     } = require('../src/options.js');

const entry= [
    {
      href: 'https://www.google.com.pe/',
      text: 'https://www.google.com.pe/',
      file: 'C:\laboratoria\MD links\LIM016-md-links\prueba\prueba2.md',
      status: 200,
      message: 'ok'
    },
    {
      href: 'https://www.it-swarm-es.com/',
      text: 'https://www.it-swarm-es.com/',
      file: 'C:\laboratoria\MD links\LIM016-md-links\prueba\prueba2.md',
      status: 200,
      message: 'ok'
    },
    {   
      href: 'https://es.stackoverflow.com/',
      text: 'https://es.stackoverflow.com/',
      file: 'C:\laboratoria\MD links\LIM016-md-links\prueba\prueba2.md',
      status: 200,
      message: 'ok'
    },
    {
      href: 'https://bitly.com/404-error-page',
      text: 'https://bitly.com/404-error-page',
      file: 'C:\laboratoria\MD links\LIM016-md-links\prueba\prueba3.md',
      status: 404,
      message: 'fail'
    }
]

describe('totalLinks', ()=>{
    it('should return the total links', () => {
        expect(totalLinks(entry)).toBe(4);
    });
});

describe('uniqueLinks', ()=>{
    it('shoul return the total of unique links', ()=>{
        expect(uniqueLinks(entry)).toBe(4);
    })
});

describe('brokenLinks', ()=>{
    it('should return the total broken links', ()=>{
        expect(brokenLinks(entry)).toBe(1);
    });
});