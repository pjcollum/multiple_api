const fetch = require('node-fetch');        //npm i node-fetch

const request = require('request');         //npm i request
const {
    promisify
} = require('util');
const promisifiedRequest = promisify(request)

/**
 * Description of the parameters
 * @param {String} city 
 * @param {String} countryCode 
 */

const getWeather = async (city, countryCode) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${process.env.APPID}`    //backticks
    let data = await fetch(url);
    return await data.json()        //returns data in json format
}

const getSwapi = async(name) => {
    let data = await promisifiedRequest({
        url: `https://swapi.co/api/people/`,    //backticks
        json:true
    })
    return data.body        //returns data in json format
}

const getHarryPotter = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/sortinghat`,
        json: true
    })
    return data.body
}

const chuckNorris = async () => {
    let data = await promisifiedRequest({
        url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
            'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            'x-rapidapi-key': 'bbb024e8b0mshe1a851c6591d987p189dbdjsna36c56f70159',
            accept: 'application/json'
        }
    })
  return data.body
}


module.exports = {
    getWeather,
    getHarryPotter,
    chuckNorris,
    getSwapi
}