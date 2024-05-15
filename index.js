const express = require('express')
const app = express()
const cors=require("cors")
const port = 3000
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})