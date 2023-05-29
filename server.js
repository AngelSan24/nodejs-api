const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config(); // Luego instalar modulo dotenv con npm install

const mysql = require('mysql2');
const routes = require('.');

const port = process.env.PORT || 3000;

// Middlewares ------------------------------------------------
app.use(express.json())
app.use(cors());

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
app.listen(port, (req, res) => {
    console.log(`Servidor escuchando en puerto: ${port}`);
});