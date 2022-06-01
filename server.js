//Instalamos los paquetes que necesitamos, axios, express, cors y dotenv y los requerimos aqui
const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

//Hemos quitado todo el metodo de la api solver-sudoku y lo vamos a meter aqui. Se accede por la ruta /solve
app.post('/solve', (req, res) => {
    // console.log(req.body.numbers);
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        },
        data: {
            puzzle: req.body.numbers
        }
    };

    axios.request(options).then((response) => {
        console.log(response.data)
        // populateValues(response.data.solvable, response.data.solution)
        res.json(response.data)
    }).catch((error) => {
        console.log(error);
    })
})

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))