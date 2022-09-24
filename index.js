const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require('request');
const app = express();
const apiKey = "1e5d333676d8b7daafbf6b5c7ef584e1";

// middleware
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

// main part

app.get('/',(req,res)=>{
    res.render('form');
})

app.post('/api/weather',(req,res)=>{
    const name = req.body.name;
    console.log(name);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
    const obj = {};
    request(url, function (err, response, body) {
        if (err) 
        {
            console.log('error:', err);
        }
        else 
        {
            const d = JSON.parse(body);
            if(d.cod!='404')
            {
                console.log(d);
                obj.max_temp = d.main.temp_max;
                obj.min_temp = d.main.temp_min;
                obj.desc = d.weather[0].description;
                obj.url = `http://openweathermap.org/img/w/${d.weather[0].icon}.png`
                res.render('home',{obj:obj});
            }
            else
            {
                res.render('404');
            }
        }
    });
})


app.listen(3000,()=>{
    console.log('server started at port 3000');
})