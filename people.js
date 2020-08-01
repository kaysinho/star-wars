
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

const normalize = (actor) => {
    let _actor = {
        "Nombre": actor.name,
        "Género": actor.gender,
        "Color de cabello": actor.hair_color,
        "Color de piel": actor.skin_color,
        "Color de ojos": actor.eye_color,
        "Estatura": actor.height,
        "Nombre del planeta proveniente": actor.homeworld
    }
    return _actor;
}

exports.get = get;
