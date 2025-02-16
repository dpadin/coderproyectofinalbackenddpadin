import express from "express"
import handlebars from "express-handlebars"
import { getProductssyncCart, addProductssyncCart, newAsyncCart, newAsyncProduct, listAllAsyncProducts, listOneAsyncProduct, updateAsyncProduct, deleteAsyncProduct } from "./fileHandle.js"   //no se puede importar todo el archivo?
import Cartsroute from "./routes/carts.route.js"
import Productsroute from "./routes/products.route.js"
import homeRoute from "./routes/home.router.js"
import realTimeProducts from './routes/realtimeproducts.router.js'
 
import { __dirname } from "./utils.js"
 import { Server } from 'socket.io';

const app = express()

const serverHttp = app.listen(8080, () => console.log("server ok puerto 8080"));
const webSocketServer = new Server(serverHttp);

app.engine("handlebars", handlebars.engine())

app.set('view engine', 'handlebars')

//app.use(express.static(__dirname + '/public'))join(process.cwd(), "src", "public")));
app.use(express.json())             //agrego para poder usar el metodo post con JSON
app.use(express.urlencoded({ extended: true }))
 

app.use("/api/products/", Productsroute)
app.use("/api/carts/", Cartsroute)
app.use('/', homeRoute)
app.use ('/realtimeProducts', realTimeProducts)
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + '/public'))


webSocketServer.on('connection', (socket) => {
    console.log('Nuevo dispositivo conectado!, se conecto ->', socket.id)
    socket.broadcast
    dibujaAllproducts(socket)

    socket.on('deleteProduct#', (data) => {
        //se ha borrado un registro
        dibujaAllproducts(socket)

    
    })

    socket.on('addNew#', (data) => {
        // se ha agregado un producto desde el cliente
        try {
            socket.emit('mensaje', { mensaje: "addNew#" })
            dibujaAllproducts(socket)
        }
        catch { console.log("Ha ocurrido un error al agregar el producto") }
    })

    function dibujaAllproducts(socket) {
        const arrProductos = listAllAsyncProducts()
            .then(arrProductos => {
                //socket.broadcast
                webSocketServer.emit('realtime', arrProductos)   //  actualiza todos los cleintes
            })
            .catch(error => {
                console.log(error)
            });
    }
})

