const request = require('request')
const starWarsAPI = 'https://swapi.dev/api/films';
const cliProgress = require('cli-progress');

const Planets = require("./planets");
const People = require("./people");
const Species = require("./species");
const Starships = require("./starships");

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

let interval = setInterval(() => {
    bar1.increment();
}, 300);

const getAll = async () => {
    bar1.start(200, 0);

    return new Promise((resolve, reject) => {
        request.get(starWarsAPI, (error, response, body) => {
            if (error) {
                reject(error);
            }
            let filmsData = JSON.parse(body)

            //Organizamos la respuesta
            normalize(filmsData.results)
                .then(films => {
                    clearInterval(interval);
                    resolve(films);
                })

        });

    });
}

const normalize = async (films) => {
    return new Promise(async (resolve, reject) => {
        let resp = [];

        for (let film of films) {
            let newFilm = {
                "Nombre de la película": film.title,
                "Planetas": await getPromises(film.planets, 'plannets'),
                "Actores": await getPromises(film.characters, 'people'),
                "Especies": await getPromises(film.species, 'species'),
                "Nave mas grande": Starships.bigger(await getPromises(film.starships, 'starships')) 
            }
            resp.push(newFilm);
        }

        resolve(resp);

    })

}


const getPromises = async (endpoints, type) => {
    return new Promise((resolve, reject) => {
        let promises = [];
        endpoints.forEach(async (endpoint) => {
            switch (type) {
                case 'plannets': promises.push(Planets.get(endpoint));
                case 'people': promises.push(People.get(endpoint));
                case 'species': promises.push(Species.get(endpoint));
                case 'starships': promises.push(Starships.get(endpoint));
            }

        });

        let objects = Promise.all(promises)
            .then(data => (data));

        resolve(objects);

    })
}


exports.getAll = getAll;