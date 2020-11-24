const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=18eba9a134b4f062c4d7a47e917d7911&query=' + latitude + ',' + longitude + '#&units=f'
    request.get({url, json: true}, 
                (error, { body }) => {
                    if (error){
                        callback("Unable to connect location services")
                    }
                    else if(body.error) {
                        callback("Search criteria is not correct")
                    }
                    else{
                        callback(undefined, 'It is currently ' + 
                        body.current.temperature + 
                        ' degrees out. It feels like ' +
                        body.current.feelslike + ' degrees out.')
                    }
                    
    })
}

module.exports = forecast