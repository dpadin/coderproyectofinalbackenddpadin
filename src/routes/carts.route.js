import { Router }from "express"
import { cartModel } from "../models/carts.model.js"
import {CartsDao}  from "../models/dao/carts.dao.js"

import { ProductModel } from "../models/products.model.js";
import {ProductsDao} from "../models/dao/products.dao.js"

const route = Router ()

const CartsService = new CartsDao(cartModel)
const ProductService = new ProductsDao (ProductModel)

route.post('/', async (req, res) => {
    
        const result = await CartsService.create({
            
        })
         res.status(201).json({mensaje: 'Se ha creado el Carrito', payload: result})
     })

route.put("/:cid/product/:pid", async (req, res) => {
        //    /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado,
        //  agregándose como un objeto bajo el siguiente formato:

        const { cid, pid } = req.params
        const {quantity} = req.query
        if (quantity>0) {
            const updatedProduct = await CartsService.addToCart(cid, pid,quantity)
             res.status(200).json({ mensaje: 'Se agrego product al carrito', payload: updatedProduct })
        }else
        {
            res.status(400).json({ mensaje: 'La cantidad no puede estar vacia ', payload: {}})
        }
        })

route.get('/', async (req, res) => {
const result = await CartsService.getAll()
res.status(200).json({mensaje: 'get Carritos all', payload: result})
})

route.get("/:cid", async (req, res) => {       //usando params trae solo el product con el id en la ruta
    const { cid } = req.params
    const result = await CartsService.getByCart(cid)
    res.status(200).json({mensaje: 'carritos x ID', payload: result})
    })

route.delete('/:cid/product/:pid', async (req, res) => {
    const { cid,pid } = req.params
 
    const result = await CartsService.delFromCart({ _id: cid },pid)
    res.status(200).json({mensaje: 'se elimino producto del un carrito', payload: result})
    })    

route.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const result = await CartsService.deleteProducts({ _id: cid })

    //if (result.deletedCount == 0) res.status(400).json({mensaje: 'No se encontro carrito ', payload: result})
 
    res.status(200).json({mensaje: 'se eliminaron TODOS los productos del carrito', payload: result})
})
 

export default route