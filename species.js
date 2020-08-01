
const request = require('request')

const get = async (endpoint) => {
    return new Promise((resolve, reject) => {
        request.get(`${endpoint}`, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(JSON.stringify(normalize(JSON.parse(body))));
        });

    })
}

const normalize = (specie) => {
    let _specie = {
        "Nombre": specie.name,
        "Idioma": specie.language,
        "Estatura promedio": specie.average_height
    }
    return _specie;
}

exports.get = get;
