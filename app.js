const express = require('express')
const app = express()
const cors=require("cors")
const port = 3000
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const mysql      = require('mysql2/promise');
const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyectotienda'
});
 

app.get('/productos', async(req, res) => {
  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM `productos`'
    );
    res.json(results)
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
  
})


app.post('/productos', async(req, res) => {
  try {
    console.log(req.body)
    const [results, fields] = await connection.query(
       "INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `imagen`) VALUES (NULL, ?, ?, ?, ?);",[req.body.nombre,req.body.descripcion,req.body.precio,req.body.imagen ]
    );
    // res.json(results)
    res.redirect('http://127.0.0.1:3000/index.html')
    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
  
})
//ruta para eliminar productos 
app.delete('/productos/:id', async(req, res) => {
  try {
    console.log(req.params.id)
    const [results, fields] = await connection.query(
       "DELETE FROM `productos` WHERE `productos`.`id` = ?;",[req.params.id]
    );
    res.json(results)
    // res.redirect('http://
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"algo salio mal"})
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})