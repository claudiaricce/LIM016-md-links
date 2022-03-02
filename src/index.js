const fs= require('fs');
const path= require('path');
const marked= require('marked');
const fetch= require('node-fetch');


//validar si la ruta existe
const routeExist= (route) => fs.existsSync(route);
//console.log(`The route ${routeExist ? '' : 'not' } exist`)

//validar si la ruta es absoluta o no
//const routeValidate= (route) => path.isAbsolute(route);
//console.log(`The route ${routeValidate ? 'is' : 'is not' } an absolute route`)

/*convertir la ruta a absoluta 
const convertedRoute = path.resolve(route);
console.log (`The absolute route 'is:' ${convertedRoute}`) */

//validar y convertir si la ruta no es absoluta
const routeState = (route) => !path.isAbsolute(route) ? path.resolve(route) : route

//verificar si se encuentra en una carpeta
const routeIsDirec = (route) => fs.statSync(route).isDirectory();

//verificar si la ruta es un archivo
const routeIsFile = (route) => fs.statSync(route).isFile();

//verifica que archivos tienen la extensión .md
const readExt = (route) => path.extname(route);

//encuentra los archivos 
const readDirectory= (route) => fs.readdirSync(route);

//leer el archivo
const readArchive = (route) => fs.readFileSync(route, 'utf8');

//lee el archivo
/*const readFile= fs.readFile('./README.md','utf8',(err,contenido) =>{
if(err)throw err
console.log(contenido)
})*/

//promesa para leer el archivo
/*const readArchive= (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (err, content) =>{
      if (err) reject (err)
      resolve (content)
    })
  })
};
readFile('./prueba.md').then((response)=> {
  console.log(response)
});*/

//unir dos rutas 
const joinPaths= (route) => {
  return readDirectory(route).map((elemento)=> path.join(route, elemento));
}
//función para obtener los files .md
const mdFilesRoute= (route) => {
  let arrayFiles= [];
  const pathAbsolute= routeState(route);
  if(routeIsFile(pathAbsolute) && readExt(pathAbsolute)=== '.md'){
    arrayFiles.push(pathAbsolute);
  } else if(routeIsDirec(pathAbsolute)){
    joinPaths(pathAbsolute).forEach(element=> {
      const mdFiles= mdFilesRoute(element); //irà rellenando en un array los archivos .md encontrados
      arrayFiles= arrayFiles.concat(mdFiles);//al terminar de buscar en el dir, concatenaran todos los archivosen un solo array
    });
  };
  return arrayFiles
}

//console.log(mdFilesRoute('C:/laboratoria/MD links/LIM016-md-links/prueba'))

const getLinks = (path) => {
  const renderer = new marked.Renderer();
  let allLinks= [];
  mdFilesRoute(path).forEach((file)=> {
   const md= readArchive(file);
   renderer.link = (href, title, text) => {
     let linksResult= {
        href: href, // url encontradas
        text: text, //Texto que aparecía dentro del link (<a>)
        file: file, //Ruta del archivo donde se encontró el link.
      }
      allLinks.push(linksResult)
    }
    marked.use({ renderer });
    marked.parse(md);
  });
  return allLinks
}
//console.log(getLinks('C:/laboratoria/MD links/LIM016-md-links/prueba'))

//obtener los status de los links
const getLinksStatus = (arrLinks) => {
  const statusOfLinks = arrLinks.map((element) => 
   fetch(element)
   .then((res)=>{
        element.status = res.status,
        element.message= (res.status >= 200) && (res.status <= 399) ? 'ok' :'fail';
        return element;
      })
   .catch((error) => {
          return {
          href: element.href,
          text: element.text,
          file: element.file,
          status: 'Not found'+ error,
          message: 'fail'
     }      
    })
  )
 return Promise.all(statusOfLinks);
}

/*const statusLink = getLinksStatus(getLinks('C:/laboratoria/MD links/LIM016-md-links/prueba'));
statusLink.then( res => console.log(res)).catch( error => console.log(error)); */

module.exports = {
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
  getLinksStatus
};