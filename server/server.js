// server/index.js

const express = require('express');
const mysql = require('mysql2');

const routes = require('../routes');
const app = express();
require('dotenv').config(); // Instalar modulo dotenv con npm install

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, // agregar || 'root'
  password: process.env.DB_PASSWORD, // agregar || '1234'
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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

pool.getConnection((err, conn) => {
  if(err) console.log(err)
  console.log("Conectado exitosamente")
})