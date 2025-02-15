import { getProductssyncCart,addProductssyncCart,newAsyncCart } from "../fileHandle.js"   //no se puede importar todo el archivo?
import { Router }from "express"
import {v4 as uuidv4} from 'uuid';

const route = Router ()

//endpoint carts
route.get ("/:cid", (req,res) => {
    //recibe cid por params
    const cid = req.params.cid

    const response = getProductssyncCart (cid)          // guarda los datos en el archivo fisico
    .then(response => {
          res.json (  response) 
         })
         .catch(error => {
            res.josn (  "ha ocurrido un error " + response) 
         });

  
    
})
 
// endpoint POST de carts
// recibe idNumber (string)y products (objeto)

route.post ("/",(req,res)=>{
     //genera un nuevo carrito sin productos
    const cid = uuidv4()      
    const response = newAsyncCart (cid)          // guarda los datos en el archivo fisico
    .then(response => {
        // console.log(response)
         res.json (  response) 
         })
         .catch(error => {
            res.josn (  response) 
         });
   
})

route.post("/:cid/product/:pid", (req, res) => {
    //    /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado,
    //  agregándose como un objeto bajo el siguiente formato:

    //product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
    //quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

    const cid = req.params.cid           // cid es el cart a actualizar
    const pid = req.params.pid           // pid es el id de producto a agregar

    const response = addProductssyncCart(cid, pid)
        .then(response => {
            // console.log(response)
            res.send(response)
        })
        .catch(error => {
            res.send(response)
        });



    //  res.send ( "Nuevo carrito recibido")
})
export default route