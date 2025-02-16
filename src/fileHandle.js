import fs from "node:fs"
//Listar TODOS los productos (GET al endpoint raiz)

export const listAllAsyncProducts = async (limit) => {
    // carga los objetos de productos.json y agrega el nuevo producto (objeto)
    let products = []

    try {
        const prodArchName = "./src/data/productos.json"
        if (!fs.existsSync(prodArchName))               // no encontre un async para saber si el archivo existe
        {
            //archivo aun no existe, no hay productos para mostrar
            return []     // devuelve objewto vacio              
        } else {
            //archivo ya existe.
            const result = await fs.promises.readFile(prodArchName, "utf8")  //objeto con los productos
            const arrProductos = await JSON.parse(result)                        //carga los registros del archivo en el array
            if (!limit) {   // no hay limite especificado, devulve todos los productos
                return (arrProductos)       //se retorna el array de objetos producto
            } else {
                // hay limite, se filtra
                return (arrProductos.slice(0, limit))       //se retorna el array limitado
            }
        }

    } catch (error) {
        return "Se ha producido un error cargando los productos : " + error
    }
}
//retorna solo el producto solicitado (products(pid))

export const listOneAsyncProduct = async (pid) => {
    // carga los objetos de productos.json y agrega el nuevo producto (objeto)
    let products = []    // array para cargar todos los productos

    try {
        const prodArchName = "./src/data/productos.json"
 
        
        if (!fs.existsSync(prodArchName))               // no encontre un async para saber si el archivo existe
        {
            //archivo aun no existe, no hay productos para mostrar
            console.log(" Paso x aqui  " + prodArchName)
               return []     // devuelve objewto vacio              
        } else {
            //archivo ya existe.
            const result = await fs.promises.readFile(prodArchName, "utf8")  //objeto con los productos
            const arrProductos = await JSON.parse(result)                        //carga los registros del archivo en el array

            const product = arrProductos.find(element => element.id === pid);

            if (product) {
                //producto encontrado
                return product  //retorna el objeto con el producto seleccionado
            } else {
                // el elemento no ha sido encontrado
                return []       //retorna un objeto vaxio  
            }
        }
    } catch (error) {
        return "Se ha producido un error cargando los productos : " + error
    }
}
//modificar productos

export const updateAsyncProduct = async (pid, newData) => {
    // carga los objetos de productos.json y agrega el nuevo producto (objeto)

    try {
        const prodArchName = "./src/data/productos.json"
        let products = []
 
        if (!fs.existsSync(prodArchName))              // no encontre un async para saber si el archivo existe
        {
            //archivo aun no existe, no hay productos que devolver
            return []
        } else {
            //archivo ya existe, entonces se agrega    
            // primero carga el contenido en un objeto
            const result = await fs.promises.readFile(prodArchName, "utf8")  //objeto con los productos

            products = JSON.parse(result)        //se convierte el JSON a objeto    

            let product = products.find(element => element.id === pid);

            if (product) {
                //producto encontrado, hay que actualizar los valores

                newData.title && (product.title = newData.title)
                newData.description && (product.description = newData.description)
                newData.code && (product.code = newData.code)
                newData.price && (product.price = newData.price)
                newData.status && (product.status = newData.status)
                newData.stock && (product.stock = newData.stock)
                newData.category && (product.category = newData.category)
                newData.thumbnails && (product.thumbnails = newData.thumbnails)

                fs.promises.writeFile(prodArchName, JSON.stringify(products))  // se grava el array completo
                return product
            }

        }


    } catch (error) {
        return "Se ha producido un error: " + error
    }
}

// Borrar producto
export const deleteAsyncProduct = async (pid) => {
    // borra el producto con el pid provisto

    try {
        const prodArchName = "./src/data/productos.json"
        let products = []
        if (!fs.existsSync(prodArchName))              // no encontre un async para saber si el archivo existe
        {
            //archivo aun no existe, no hay productos que devolver
            return []
        } else {

            const result = await fs.promises.readFile(prodArchName, "utf8")  //objeto con los productos
            products = JSON.parse(result)        //se convierte el JSON a objeto    
  
            const index = products.findIndex(element => element.id === pid);
            if (index !== -1) {  // producto encontrado!
                products.splice(index, 1);  //removemos el objeto del array
                fs.promises.writeFile(prodArchName, JSON.stringify(products))  // se grava el array completo
                return pid

            } else {
                return []
            }

        }


    } catch (error) {
         
        return "Producto no ha podido ser Eliminado"
    }
}

//guardar productos

export const newAsyncProduct = async (product) => {
    // carga los objetos de productos.json y agrega el nuevo producto (objeto)

    try {
        const prodArchName = "./src/data/productos.json"
        let products = []
        if (!fs.existsSync(prodArchName))              // no encontre un async para saber si el archivo existe
        {
            //archivo aun no existe, es el primer producto
            products.push(product)                     //se agrega el primer prodducto all array de produvtos
            fs.promises.writeFile(prodArchName, JSON.stringify(products))
            return product
        } else {
            //archivo ya existe, entonces se agrega    
            // primero carga el contenido en un objeto
            const result = await fs.promises.readFile(prodArchName, "utf8")  //objeto con los productos

            products = JSON.parse(result)        //se convierte el JSON a objeto    

            products.push(product)     //  agrega el nuevo producto

            fs.promises.writeFile(prodArchName, JSON.stringify(products))  // se grava el array completo
            
            return product

        }


    } catch (error) {
        return error
    }
}


//carritos
// agregar carrito 
export const newAsyncCart = async (cid) => {
    // agrega un nuevo carrito al array de carritos, los guarda en el archivo 
    let carts  = [] //array vacio de carritos
    try {
        const cartArchName = "./src/data/carrito.json"
        
        if (fs.existsSync(cartArchName))              // no encontre un async para saber si el archivo existe
        {
            //archivo  existe, lo abre y carga los carritos al array carts
            const result = await fs.promises.readFile(cartArchName, "utf8")  //objeto con los productos
            carts = JSON.parse(result)        //se convierte el JSON a objeto    
      
        }
        //sea que carts ya haya sido cargado en el if de arriba o este vcio, se agrega un carrito nuevo
            const cart = {
                    id:cid,
                    products:[]
                        }
           carts.push(cart)                             
           fs.promises.writeFile(cartArchName, JSON.stringify(carts))
       return cart
           

    } catch (error) {
        //console.log("Se ha producido un error: " + error)
        return "Carrito cid: " + cid + " Fallado al ser agregado"
    }
}

// agregar productos al carrito

export const addProductssyncCart = async (cid, pid) => {

    // agrega los products en el cart cid
    let carts = [] //array vacio de carritos

    try {
        const cartArchName = "./src/data/carrito.json"

        if (!fs.existsSync(cartArchName))              // no encontre un async para saber si el archivo existe
        {
            //archivo aun no existe, no hay ningun carrito 
            return []       //  devuelve un array vacio
        } else {
            //archivo ya existe, entonces se busca el cid, a ver si existe

            const result = await fs.promises.readFile(cartArchName, "utf8")  //objeto con los productos

            carts = JSON.parse(result)        //se convierte el JSON a objeto    

            let cart = carts.find(element => element.id == cid);

            if (cart) {
                // el carrito ha sido hallado, ahora hay que actualizarlo

                // se agrega el product al array del carrito

                let item = cart.products.find(e => e.id == pid);    //busca si el item ya existe
                if (item) {
                    //item ya existe, se actualiza la cantidad
                    let previousQuantity = item.quantity
                    let newQuantity = previousQuantity + 1
                    item.quantity = newQuantity
                } else {
                    const product = {
                        id: pid,
                        quantity: 1
                    }
                    cart.products.push(product);//item no existe aun, se agrega nuevo
                }

                fs.promises.writeFile(cartArchName, JSON.stringify(carts))  // se grava el array completo
                return cart


            } else {

                return [];
            }


        }


    } catch (error) {
        console.log("Se ha producido un error: " + error)
        return "Carrito cid: " + cid + " Fallado al ser agregado"
    }
}

// agregar productos al carrito

export const getProductssyncCart = async (cid) => {

    let carts = [] //array vacio de carritos

    try {
        const cartArchName = "./src/data/carrito.json"
        if (!fs.existsSync(cartArchName))              // no encontre un async para saber si el archivo existe
        {
            return []        //archivo aun no existe, no hay ningun carrito   devuelve un array vacio
        } else {
            //archivo ya existe, entonces se busca el cid, a ver si existe
            const result = await fs.promises.readFile(cartArchName, "utf8")  //objeto con los productos
            carts = JSON.parse(result)        //se cargan TODOS los carritos
            let cart = carts.find(element => element.id == cid);
            if (cart) {
                // el carrito ha sido hallado, ahora hay que actualizarlo
                // se agrega el product al array del carrito
                    return cart
                } else {
                    
                    return []   // no se encontro el carrito
                }
 
            } 

    } catch (error) {
        console.log("Se ha producido un error: " + error)
        return "Carrito cid: " + cid + " Fallado al ser agregado"
    }
}
 