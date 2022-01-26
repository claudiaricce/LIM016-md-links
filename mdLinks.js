const api = require ('./index.js');

const mdLinks = (path, option = {}) => {
    return new Promise ((resolve, reject) => {
        if(!api.routeExist(path)){
            reject('Path does not exist');
        } else {
            const linksResult = api.getLinks(path);
            if(!(option.validate)){
                resolve(linksResult);
            } else {
                const statusLink = api.getLinksStatus(linksResult);
                resolve(statusLink);
            }
        }
    });
}

const result = mdLinks('C:/laboratoria/MD links/LIM016-md-links/prueba', { validate: true })
result
    .then((res)=> console.log(res))
    .catch((err) => console.log(err));



module.exports= { mdLinks};