const path = require('path')
const express = require('express')
const hbs = require("hbs")
const app = express()
const port = process.env.PORT || 3000
const weather = require('./utils.js')

const publicPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
//using the express static path
app.use(express.static(publicPath))


//setting view engine
app.set("view engine","hbs")

//setting views path
app.set("views",viewsPath)

//register the partials
hbs.registerPartials(partialsPath)

app.get("",(req,res)=>{
    res.render("index",{
        title:"WeatherApp",
        name:"Vishal"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Vishal"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        helpmessage:"This is some help text",
        name:"Vishal"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        res.send({
            error:"You must provide a search term!!!"
        }) 
    }
    else{

        weather.geocode(req.query.address,(error,data)=>{
            if(error){
                res.send({
                    error
                }) 
            }
            else{
                weather.weatherforecast(data.latitude,data.longitude,(error,forecastdata)=>{
                    if(error){
                        res.send({
                            error
                        }) 
        
                    }
                    else{
                        res.send({
                            location:data.location,
                            temperature:forecastdata.temperature,
                            description:forecastdata.description,
                            feelslike:forecastdata.feelslike
                        })                       
                    }
                })
            }
        })
    
       
    }
    

})

app.get("/products",(req,res)=>{
    
    if(!req.query.search){
        res.send({
            error:"You must provide a search term!!!"
        })
    }
    else{
        res.send({
            products:[]
        })

    }
    
})


app.get("*",(req,res)=>{
    res.render("my404",{
        title:"404",
        name:"Vishal"

    })

})

app.listen(port,()=>{
    console.log("Server running on port "+port)
})