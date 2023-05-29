const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.send("Probando API.")
})
// Dentro de localhost:3000/api/pag01
routes.get('/pag01', (req, res) => {
    res.send("Interior de pagina 01.")
})

routes.get('/datos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM miembro', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/datos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
            
        conn.query('INSERT INTO miembro SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Miembro agregado!')
        })
    })
})

routes.delete('/datos/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.params.id)
        
        conn.query('DELETE FROM miembro WHERE idMiembro = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('Miembro eliminado!')
        })
    })
})

routes.put('/datos/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.params.id)
        
        conn.query('UPDATE miembro SET ? WHERE idMiembro = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('Miembro actualizado!')
        })
    })
})

module.exports = routes