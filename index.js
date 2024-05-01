const express = require('express')
const app = express()
const cors=require("cors")
const port = 3000
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyectotienda'
});
 
connection.connect();

app.get('/productos', (req, res) => {
  const productos=[
   {nombre:"producto1",precio:110,url:"https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202012/04/00120610001263____6__600x600.jpg"},
   {nombre:"producto2",precio:95,url:"https://123cuidatuhogar.com/wp-content/uploads/2019/07/Lavaloza-500-ml.png"},
   {nombre:"producto13",precio:95},
   {nombre:"producto4",precio:95},
   {nombre:"producto5",precio:95}
  ]
  res.json(productos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})