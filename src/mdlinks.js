const functions = require ('../src/index.js');

const mdLinks = (path, option = {}) => {
    return new Promise ((resolve, reject) => {
        if(!functions.routeExist(path)){
            reject('Path does not exist');
        } else {
                const validateMdFile= functions.mdFilesRoute(path);
                if (validateMdFile.length === 0 ){
                    reject('There is no md files')
                }
                else{
                    const linksResult = functions.getLinks(path);
                    if(linksResult.length===0){
                        reject('there is no links')
                    }
                    else{
                            if(!(option.validate)){
                                resolve(linksResult);
                            } else {
                                const statusLink = functions.getLinksStatus(linksResult);
                                resolve(statusLink);
                            }
                        }
                }
        }
    });
}

/*const result = mdLinks('C:/laboratoria/MD links/LIM016-md-links/prueba', { validate: true })
result
.then((res)=> console.log(res))
.catch((err) => console.log(err));*/

module.exports= { mdLinks};