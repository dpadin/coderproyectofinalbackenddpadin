
requestedUrl =  "http://localhost:8080/api" + window.location.pathname
const data = loadUrl (requestedUrl)
 

    function loadUrl  (url) {
        fetch (url)        
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                console.log(data)
                renderCart (data)         
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            })};
        

function renderCart (data){            //escucha al server y rebibuja
    let cart  = data.payload
    const contenedor = document.querySelector('#carts-container')
    contenedor.innerHTML = "" //borra el ocntenedor, para evitar duplicados
      
        const div = document.createElement('div')
        div.innerHTML = `
            
                <div class="card p-2 bd-highlight" style="width: 18rem;">
                    
                    <div class="card-body">
                        <h5 class="card-title" > ID: ${cart._id}</h5>
                    </div>
                </div>
 
       `
        contenedor.appendChild(div)
      
        
        const productos = data.payload.products
        const contenedorProductos = document.querySelector('#products-container')
        contenedorProductos.innerHTML = "" //borra el ocntenedor, para evitar duplicados
    
       
        productos.forEach(producto => {
            const divProducts = document.createElement('div')
    
            contenedorProductos.innerHTML += `
             
                  <div class="card p-2 bd-highlight" style="width: 18rem;">
                    <div class="card-body d-flex flex-column">
                     
                        <div class="card-body">
                            <h6 class="card-title" > ID: ${producto.product._id}</h6>
                            <h4 class="card-title"> Nombre: ${producto.product.title}</h4>
   
                                <h4 class="card-title"> Cantidad: ${producto.quantity}</h4>

                                <p class="card-text">Description:  ${producto.product.description}</p>
                            <p class="card-text"> Precio:  ${producto.product.price}</p>
                            
                           <div class="mt-auto">
                            <button class="btn btn-danger " id="btnIngresar" value= ${producto._id}  >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
             
         `
         contenedorProductos.appendChild(divProducts)
    
        })    


} 