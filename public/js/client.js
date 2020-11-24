//const { response } = require("express")

console.log('client side java script file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading message...'
    messageTwo.textContent = ''
    
    //invoke the weather api
    fetch('/weather?address='+ location).then((response) => {
        response.json().then(
            (data) =>{
                if (data.error){
                    console.log("An error occured")
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                }else{
                    console.log(data.location)
                    console.log(data.forecast)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
    })
})