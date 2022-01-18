/*module.exports = () => {
}; */

const fs= require('fs');
const path= require('path');
const marked= require('marked');

/*validar si la ruta existe
const routeExist= fs.existsSync(route);
console.log(`The route ${routeExist ? '' : 'not' } exist`)

validar si la ruta es absoluta o no
const routeValidate= path.isAbsolute(route);
console.log(`The route ${routeValidate ? 'is' : 'is not' } an absolute route`)

convertir la ruta a absoluta 
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

//lee el archivo
/*const readFile= fs.readFile('./README.md','utf8',(err,contenido) =>{
if(err)throw err
console.log(contenido)
})*/

//promesa para leer el archivo
const readArchive= (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (err, content) =>{
      if (err) reject (err)
      resolve (content)
    })
  })
};
/*readFile('./prueba.md').then((response)=> {
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
      const mdFiles= mdFilesRoute(element);
      arrayFiles= arrayFiles.concat(mdFiles);
    });
  };
  return arrayFiles;
}
//console.log(mdFilesRoute('C:/laboratoria/MD links/LIM016-md-links/prueba'))

const getLinks = (path) => {
const renderer = new marked.Renderer();
//console.log(renderer) = options{}
  mdFilesRoute(path).map((file)=> {
   console.log('This is the file .md',file)
   const md= readArchive(file).then((response)=>{
   console.log(response)
   });
    renderer.link = (href, title, text) => {
    console.log(href,text)
      return{
        href: href,
        title: text,
        text: path,
      }
    }
    marked.use({renderer})
    marked.Parser(md)
  });
}
console.log(getLinks('prueba'))