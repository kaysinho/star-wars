
const request = require('request')

const get = async(endpoint) => {
    return new Promise((resolve, reject)=>{
        request.get(`${endpoint}`, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(JSON.stringify(normalize(JSON.parse(body))));
        });

    })
}

const normalize = (_planet) => {
    let planet = {
        "Nombre": _planet.name,
        "Terreno": _planet.terrain,
        "Gravedad": _planet.gravity,
        "Diametro": _planet.diameter,
        "Población": _planet.population
    }
    return planet;
}

exports.get = get;
