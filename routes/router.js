const {Router} = require('express')
const router = Router();

const getWeather = require('../lib/getWeather')     //imports the getWeather.js

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/starWars', async (req, res) => {
    
    let random =  Math.ceil(Math.random() * 87) // quick fix
    // better is a for loop to loop through - take a look back at the for loop section to mess around and play
    let data = await getWeather.getSwapi(random)
//     for (let i = 1; i < 88; i++){
//         console.log([i])
//    }

//    let data = await getWeather.getSwapi(i)
   console.log(data)
    
    res.render('starWars', {
        data,
        title: `Star Wars Character: ${data.name}`,
        hair: `Hair Colour: ${data.hair_color}`,
        gender: `Gender: ${data.gender}`
    })
})

router.get('/nasa', async (req, res) => {
    let data = await getWeather.getNasa()
    console.log(data)
    res.render('nasa', {
        data,
        date: data.date,
        explain: data.explanation,
        title: data.title,
        url: data.url
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
    
   
    let joke = data.value
    // console.log(joke)
    // push data into the array - how can you pull the [6] out of that array?

    res.render('chuckNorris', {
        data,
        joke: joke     
    })
})



// ... all other routes (app.get from index.js)

router.get('/weather', async (req, res) => {
    let data = await getWeather.getWeather()
    res.render('weather');
})

router.post('/weather', async (req,res) => {
    let city = req.body.city;
    let countryCode = req.body.countryCode;

    let data = await getWeather.getWeather(city, countryCode);

    let weatherData = {
        Name: data.name,
        Country: data.sys.country,
        Description: data.weather[0].description,
        Temperature: `${data.main.temp} Celsius`,
        Sunrise: new Date(data.sys.sunrise),
        Sunset: new Date(data.sys.sunset)
        
    }
    let icon = data.weather[0].icon;

    console.log(data);

    res.render('weather', {weatherData, icon});
    
});

module.exports = router;