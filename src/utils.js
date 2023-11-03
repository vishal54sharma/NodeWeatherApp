
const request = require('request')
const geocode=(address,callback)=>{

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoidmlzaGFsNTQ0NXNoYXJtYSIsImEiOiJjbG56dGZqN2UwdjExMmpxaHp1Nzk0YXZ1In0.72jFYe9ZFgwn0k-gUMN08A"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        } else if(response.body.features.length==0){
            callback('Unable to find location. Try another search!',undefined)
        } else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }

    })


}

const weatherforecast=(lat,long,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=1d1b401bc0ba1f68d87418c473dc821a&query="+lat+","+long+"&units=f"
    request({url:url,json:true},(error , response)=>{
        if(error){
            callback('Unable to get the service',undefined)
            
        }else if(response.body.error){
            callback('Unable to get the location',undefined)
                   
        }else{
            const data = (response.body)
            callback(undefined,{
                description: data.current.weather_descriptions,
                temperature: data.current.temperature,
                feelslike: data.current.feelslike
            })
            
            
        }

    })
}



module.exports = {
    geocode:geocode,
    weatherforecast:weatherforecast
}