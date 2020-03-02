const {Router} = require('express')
const router = Router();

const getSwapi = require('../lib/getSwapi')     //imports the getSwapi.js

router.get('/swapi',(req,res)=>{
    res.render('index')
})

// ... all other routes (app.get from index.js)

router.post('/swapi', async(req,res) => {
    let name = req.body.name;
    let gender = req.body.gender;

    let data1 = await getSwapi(name, gender);

    let swapiData = {
        name: data1.name,
        gender: data1.gender,
        
    }
    

    console.log(data1);

    res.render('index', {swapiData});
    
});

module.exports = router;