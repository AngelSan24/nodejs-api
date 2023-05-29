const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config(); // Luego instalar modulo dotenv con npm install

const mysql = require('mysql2');
const routes = require('./routes');

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, // agregar || 'root'
  password: process.env.DB_PASSWORD, // agregar || '1234'
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

const port = process.env.PORT || 3000;

// Middlewares ------------------------------------------------
app.use(express.urlencoded({extended: false}));
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
app.listen(port, () => {
    //console.log(`Servidor escuchando en puerto: ${port}`);
});

pool.getConnection((err, conn) => {
  if(err) console.log(err)
  console.log("Conectado exitosamente")
})