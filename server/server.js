// server/index.js

const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors');

const routes = require('../routes');

const app = express();
const port = process.env.PORT || 3000;
const dbOptions = {
  host: 'byoqitgxwidg9ulnoywg-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'usm9oaspwebg88ty',
  password: 'usm9oaspwebg88ty',
  database:'byoqitgxwidg9ulnoywg'
}

// Middlewares ------------------------------------------------
app.use(myconn(mysql, dbOptions, 'single'));
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
    console.log(`Servidor escuchando en puerto: ${port}`);
});