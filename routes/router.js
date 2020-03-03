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
        title: `Star Wars Character: ${data.name}`,
        hair: `Hair Colour: ${data.hair_color}`,
        gender: `Gender: ${data.gender}`
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
    
    data = JSON.parse(data);
    console.log(data);

    console.log(data.value);
   
    //////////////////////////////
    let joke = data.value
    // console.log(joke)
    // push data into the array - how can you pull the [6] out of that array?

    res.render('chuckNorris', {
        data,
        joke: joke
        // title: data.value
    })
})
router.get('/nasa', async (req, res) => {
    let data = await getWeather.getNasa()
    console.log(data)
    res.render('nasa', {
        data,
        date: `NASA info: ${data.date}`,
        explain: data.explanation,
        title: data.title,
        url: data.url
    })
})


// ... all other routes (app.get from index.js)

router.get('/weather', async (req, res) => {
    let data = await getWeather.getWeather()
    res.render('weather');
})

router.post('/weather', async(req,res) => {
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

    res.render('weather', {weatherData, icon});
    
});

module.exports = router;