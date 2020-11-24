const path = require('path')
const express = require('express')
const hbs = require('hbs')
//import the weather backend code
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { response } = require('express')

const app = express()
const port = 3000

//define paths for views configuration 
//something else
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


//setup handlbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set static directory
app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({error: "address is mandatory"})
  }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error){
        return res.send({error: error})  
      }
      
      forecast(latitude, longitude, (error, forecastData) => {
          if (error){
            return res.send({error: error})
              
          }
          res.send({
            address: req.query.address,
            location: location,
            forecast: forecastData
          })
      })
  })
})

app.get('', (req, res) => {
  res.render('index', {title: 'Weather App',
  name: 'aks kat'
})
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'Weather App',
  name: 'aks kat'})
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Welcome to the help section',
    title: 'Weather App',
    name: 'aks kat'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({message: "search field is mandatory"})
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404',
    name: 'aks kat'
  }) 
}) 

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'File not found',
    title: '404',
    name: 'aks kat'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})