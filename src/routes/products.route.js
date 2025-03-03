import { Router } from "express"
import { ProductModel } from "../models/products.model.js";
import {ProductsDao} from "../models/dao/products.dao.js"

const route = Router()
const ProductsService = new ProductsDao(ProductModel)

route.post('/', async (req, res) => {
        const {title,description,code,price,status,stock,category,thumbnails } = req.body
        const result = await ProductsService.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })
        console.log(result)
        if (result==null) {
        res.status(400).json({mensaje: 'Error al agregar producto', payload: result})
        }else{
        res.status(201).json({mensaje: 'Se ha creado el producto', payload: result})
        }

         
     })

route.get('/', async (req, res) => {
 
const result = await ProductsService.getProdsQuery(req.query)
result.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

const newResult  =formatResult(result)

if (newResult.status== ("success")){ res.status(200).json(formatResult(result))}
     else{
    res.status(500).json(
    {status:"success", payload: {}})
        }
 
})

 

route.get("/:pid", async (req, res) => {       //usando params trae solo el product con el id en la ruta
    const { pid } = req.params
    const result = await ProductsService.getById(pid)
    res.status(200).json({mensaje: 'get productos by ID', payload: result})
    })
  
route.put('/:pid', async (req, res) => {
    const newProduct = req.body
    const { pid } = req.params
    const result = await ProductsService.update(pid, newProduct)
    res.status(200).json({mensaje: 'se actualizo un producto', payload: result})

})


route.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await ProductsService.delete({ _id: pid })
    res.status(200).json({mensaje: 'se elimino un producto', payload: result})
})

export default route

function formatResult(result){

   let pLink = null
   let nLink = null

    if(result.hasPrevPage){
   
      const fullUrl = result.fullUrl
      const newPage = Number(result.page) - 1
      const urlObj = new URL(fullUrl);
      urlObj.searchParams.set('page', newPage);
      const updatedUrl = urlObj.toString();
      pLink = updatedUrl

   }
   if(result.hasNextPage){
   
    const fullUrl = result.fullUrl
    const newPage = Number(result.page) + 1
    const urlObj = new URL(fullUrl);
    urlObj.searchParams.set('page', newPage);
    const updatedUrl = urlObj.toString();
    nLink = updatedUrl

 }

return     {
         status:"success",
         payload: result.docs,
         totalPages: result.totalPages,
         prevPage: result.prevPage,
         nextPage: result.nextPage,
         page:result.page,
         hasPrevPage: result.hasPrevPage,
         hasNextPage:result.hasNextPage,
         prevLink: pLink,
         nextLink:nLink

        }

}