#!/usr/bin/env node
const { mdLinks } = require('./mdlinks');
const option = require('./options');

const [, , ...args] = process.argv;

if(args.length === 0) {
    console.error('Ingrese la ruta de un archivo');
  }

// Si el usuario pone un argumento
if (args.length === 1){
    mdLinks(args[0], { validate:false })
    .then(resul=>resul.forEach(e=> console.log(`\nhref: ${e.href}\ntext: ${e.text}\nfile: ${e.file}\n`)))
    .catch(err => console.log(err));
}

// Si el usuario pone 2 argumentos
if(args.length === 2){
    switch (args[1]) {
        case '--validate':
            mdLinks(args[0], { validate: true })
            .then(res => res.forEach(e =>
                console.log(`\nhref: ${e.href} \ntext: ${e.text} \nfile: ${e.file} \nstatus: ${e.status} \nmessage: ${e.message}`)))
            .catch(err => console.log(err));
        break;
  
        case '--stats':
            mdLinks(args[0], { validate: true })
            .then(res=> console.log(
  `Total: ${option.totalLinks(res)} 
Unique: ${option.uniqueLinks(res)}`
             ))
            .catch(err => console.log(err));
        break;
  
        case '--help':
            console.log(`${option.help}`);
        break;
  
        default: console.log('Sorry, the command does not exist. Try with command "--help"');
        break;
    }
  
  }

  // Si el usuario pone 3 argumentos
  if(args.length === 3){
    if ((args[1] === "--stats" && args[2] === "--validate") ||
    (args[1] === "--validate" && args[2] === "--stats")) {
        mdLinks(args[0], { validate: true })
            .then(res=> console.log(
  `Total: ${option.totalLinks(res)}
Unique: ${option.uniqueLinks(res)}
Broken: ${option.brokenLinks(res)}`
            ))
            .catch(err => console.log(err));
    } else{
        console.log('Sorry, the command does not exist. Try with command "--help"')
    }
  }