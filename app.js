const express = require('express')
const app = express()
const cors=require("cors")
const port = 3000
const bodyParser = require('body-parser')
const session = require('express-session')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const sess = {
  secret: 'keyboard cat',
  cookie: {},
  sameSite: 'none'
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
// parse application/json
app.use(bodyParser.json())
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }

))

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

//ruta para crear productos// 
app.post('/productos', async(req, res) => {
  try {
    //validar si el rol del usuario es ADMINISTRADOR//
    if(!req.session.usuario){
      res.status(401).json({error:"Inicia sesion primero"})
      return
    }
    if(req.session.usuario.rol!="ADMINISTRADOR"){
      res.status(401).json({error:"No tienes permisos para realizar esta accion"})
      return
    }
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
    //validar si el rol del usuario es ADMINISTRADOR//
    if(!req.session.usuario){
      res.status(401).json({error:"Inicia sesion primero"})
      return
    }
    if(req.session.usuario.rol!="ADMINISTRADOR"){
      res.status(401).json({error:"No tienes permisos para realizar esta accion"})
      return
    }
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

//ruta para iniciar sesion con usuario y contraseña 
app.post('/login', async(req, res) => {
  try {
    console.log(req.body)
    const [results, fields] = await connection.query(
       "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `contraseña` = ?;",
       [req.body.usuario,req.body.contraseña]
    );
    if(results.length>0){
      req.session.usuario=results[0]
      res.json({mensaje:"Bienvenido",rol:results[0].rol})  
    }else{
      res.status(401).json({error:"Usuario o contraseña incorrectos"})
    }
    // res.json(results)
    // res.redirect('http://
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"algo salio mal"})
  }

})

//crear ruta para añadir producto y cantidad al carrito de la base de datos
// usuario_id producto_id cantidad
app.post('/carrito', async(req, res) => {
  // validar sesion 
  if(!req.session.usuario){
    res.status(401).json({error:"Inicia sesion primero"})
    return
  }
  try {
    console.log(req.body)
    const [results, fields] = await connection.query(
       "INSERT INTO `carrito` (`id`, `usuario_id`, `producto_id`, `cantidad`) VALUES (NULL, ?, ?, ?);",
       [req.session.usuario.id
        ,req.body.producto_id,req.body.cantidad]
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

// crear ruta para listar los elementos del carrito de un usuario
// con el nombre del producto la cantidiad y el precio
app.get('/carrito', async(req, res) => {
  // validar sesion 
  if(!req.session.usuario){
    res.status(401).json({error:"Inicia sesion primero"})
    return
  }
  try {
    const [results, fields] = await connection.query(
      'SELECT carrito.id, productos.nombre, productos.precio, carrito.cantidad FROM productos INNER JOIN carrito ON productos.id = carrito.producto_id WHERE carrito.usuario_id = ?',
      [req.session.usuario.id]
    );
    res.json(results)
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
  
})

//crear ruta para eliminar un producto del carrito//
app.delete('/carrito/:id', async(req, res) => {
  try {
    console.log(req.params.id)
    const [results, fields] = await connection.query(
       "DELETE FROM `carrito` WHERE `carrito`.`id` = ?;",[req.params.id]
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

//crear usuario con rol cliente
app.post('/usuarios', async(req, res) => {
  try {
    console.log(req.body)
    const [results, fields] = await connection.query(
       "INSERT INTO `usuarios` (`id`, `usuario`, `contraseña`, `rol`) VALUES (NULL, ?, ?, 'CLIENTE');",
       [req.body.usuario,req.body.contraseña]
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