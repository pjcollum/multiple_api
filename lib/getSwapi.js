const fetch = require('node-fetch');        //npm i node-fetch

/**
 * Description of the parameters
 * @param {String} name 
 * @param {String} gender 
 */

const getSwapi = async(name, gender) => {
    let url= `https://swapi.co/api/people1`    //backticks
    let data1 = await fetch(url);
    return await data1.json()        //returns data in json format

}

module.exports = getSwapi;