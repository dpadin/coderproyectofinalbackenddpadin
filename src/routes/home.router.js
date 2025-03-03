import { Router } from "express";

const route = Router()

route.get('/',  (req,res)=>{
    res.render('home')
})

route.get('/carts',  (req,res)=>{
    res.render('carts')
})

route.get('/carts/:cid',  (req,res)=>{
    res.render('cartsById')
})


export default route