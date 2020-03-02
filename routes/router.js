const {Router} = require('express')
const router = Router();

const getWeather = require('../lib/getWeather')     //imports the getWeather.js

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/starWars', async (req, res) => {
    let data = await getWeather.getSwapi()
    console.log(data)
    res.render('starWars', {
        data,
        title: `You have been randomly sorted into: ${data.name}`
    })
})

router.get('/harryPotter', async (req, res) => {
    let data = await getWeather.getHarryPotter()
    console.log(data)
    res.render('harryPotter', {
        data,
        title: `You have been randomly sorted into: ${data}`
    })
})

router.get('/chuckNorris', async (req, res) => {
    let data = await getWeather.chuckNorris()
    console.log(data)
    res.render('chuckNorris', {
        data,
        title: `You have been given a random joke: ${data}`
    })
})


// ... all other routes (app.get from index.js)

router.post('/', async(req,res) => {
    let city = req.body.city;
    let countryCode = req.body.countryCode;

    let data = await getWeather(city, countryCode);

    let weatherData = {
        name: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        temp: data.main.temp,
        sunrise: new Date(data.sys.sunrise),
        sunset: new Date(data.sys.sunset)
        
    }
    let icon = data.weather[0].icon;

    console.log(data);

    res.render('index', {weatherData, icon});
    
});

module.exports = router;