
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

const normalize = (starship) => {
    let _starship = {
        "Nombre": starship.name,
        "Modelo": starship.model,
        "Lenght": starship.length,
        "Fabricante": starship.manufacturer,
        "Número de pasajeros": starship.passengers
    }
    return _starship;
}

const bigger = (starships) => {
    //Encontrar la nave mas grande
    let _bigger = starships.reduce((prev, current)=> (prev.Length > current.Length) ? prev : current); 
    delete _bigger.Length;
    return (_bigger);
}

exports.get = get;
exports.bigger = bigger;
