const express = require('express')
const app = express()
const cors=require("cors")
const port = 3000
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/productos', (req, res) => {
  const productos=[
   {nombre:"producto1",precio:110},
   {nombre:"producto2",precio:95},
   {nombre:"producto3",precio:95},
   {nombre:"producto4",precio:95},
   {nombre:"producto5",precio:95}
  ]
  res.json(productos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})