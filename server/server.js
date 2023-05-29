const express = require('express');
const app = express();

const mysql = require('mysql2');
const routes = require('../routes');
require('dotenv').config(); // Instalar modulo dotenv con npm install



const port = process.env.PORT || 3000;

// Middlewares ------------------------------------------------
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Rutas ------------------------------------------------------
//
// Escuchar metodo GET
app.get('/', (req, res) => {
    res.send("Hola desde el Servidor!")
})
// Ruta por defecto para llamar nuestro archivo de rutas
// Es recomendable escribir algo despues de / para no 
// confundir con la ruta por defecto
app.use('/api', routes)

// Servidor corriendo ------------------------------------------
//
// Escuchar en puerto
app.listen(port, () => {
    //console.log(`Servidor escuchando en puerto: ${port}`);
});

