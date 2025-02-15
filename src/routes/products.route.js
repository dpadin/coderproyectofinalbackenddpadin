import { newAsyncProduct, listAllAsyncProducts, listOneAsyncProduct, updateAsyncProduct, deleteAsyncProduct } from "../fileHandle.js"   //no se puede importar todo el archivo?
import { Router } from "express"
import { upload } from "../utils.js"
import { v4 as uuidv4 } from 'uuid';

const route = Router()

route.use((req, res, next) => {
    // console.log ("Middleware agregado a nivel  de la ruta")
    // console.log (req.method + "   " + req.url)
    next()
})


// endpoints
//endpoint products

const sefFecha = (req, res, next) => {     // middleware
    req.fecha = new Date()
    next()
}


route.get("/", sefFecha, (req, res) => {        //se cargan los productos con y sin limit
    const query = req.query          //usando query
    const limit = query.limit
    const arrProductos = listAllAsyncProducts(limit)  //pide los registros 
        .then(arrProductos => {
            res.json(arrProductos)    //  llama la funcion que carga el objeto con totos los productos
        })
        .catch(error => {
            res.json(error); // error al tomar los productos
        });

})
route.get("/:pid", (req, res) => {       //usando params trae solo el product con el id en la ruta
    const { pid } = req.params
    const product = listOneAsyncProduct(pid)
        .then(product => {
            // console.log ("regreso el producto: " + product.title)
            res.json(product)    //  llama la funcion que carga el objeto con totos los productos
        })
        .catch(error => {
            console.error(error); // error al tomar los productos
        });

})

route.get("/:id/:description", (req, res) => {       //usando params

    const { id, description } = req.params
    res.json("endpoint products " + id + "   " + description)

})

// endpoint POST de productos
route.post("/", upload.single("thumbnails"), (req, res) => {

    const product = req.body
    const id = uuidv4()                //genero un product id

    const objProduct =                // creo un objeto producto
    {
        id: id,
        title: product.title,
        description: product.description,
        code: product.code,
        price: product.price,
        status: product.status = true, //por defecto es seteado atru
        stock: product.stock,
        category: product.category,
        //  thumbnails: req.file.filename
    }

    const p = newAsyncProduct(objProduct)
        .then(p => {
            // console.log(p)
            res.json(p)

        })
        .catch(error => {
            res.json("Ha ocurrido un error " + p)
        });


})

// endpoint PUT de productos
route.put("/:pid", (req, res) => {
    const { pid } = req.params
    const newData = req.body

    const product = updateAsyncProduct(pid, newData)
        .then(product => {
            res.json(product)
        })
        .catch(error => {
            res.json("Se ha producoido un error actualizando " + error)
        });


})
// endpoint DELETE de productos
route.delete("/:pid", (req, res) => {
    const { pid } = req.params

    const response = deleteAsyncProduct(pid)
        .then(response => {
            // console.log(response)
            res.send(response)
        })
        .catch(error => {
            req.send("Error: " + response)
        });
})

export default route