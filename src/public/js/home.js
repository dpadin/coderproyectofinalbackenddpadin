
const targetUrl = "http://localhost:8080/api/products"

loadUrl (targetUrl)
 
    document.body.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            const newUrl = event.target.href 
            loadUrl (newUrl)
            event.preventDefault();
        }
    });

    document.body.addEventListener("click", function(event) {
         
        if (event.target.tagName === "BUTTON") {
            console.log ("Id a cargar al carrito : " + event.target.value)
            
            console.log (event.target)

            event.preventDefault();
        }
    });


    function loadUrl  (url) {
        fetch (url)
        
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
        
                renderProductos (data)
         
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            })};
        

function renderProductos (data){            //escucha al server y rebibuja

    const productos  = data.payload
    const options = {
        hasNextPage:data.hasNextPage,
        hasPrevPage:data.hasPrevPage,
        nextPage:data.nextPage,
        prevPage:data.prevPage,
        totalPages:data.totalPages,
        prevPage:data.prevPage,
        page:data.page,
         
    }
    
    const contenedor = document.querySelector('#products-container')
    contenedor.innerHTML = "" //borra el ocntenedor, para evitar duplicados

    productos.forEach(producto => {
        const div = document.createElement('div')

        div.innerHTML = `
         
                <div class="card p-2 bd-highlight" style="width: 18rem;">
                 
                    <div class="card-body">
                        <h5 class="card-title" > ID: ${producto._id}</h5>
                        <h5 class="card-title"> Title: ${producto.title}</h5>
                        <p class="card-text">Description:  ${producto.description}</p>
                        <p class="card-text"> Precio:  ${producto.price}</p>
                        <p class="card-text"> Stock:  ${producto.stock}</p>
                     
                        <button class="btn btn-success " id="btnIngresar" value= ${producto._id}  >Agregar</button>
    
                    </div>
                </div>
         
     `
        contenedor.appendChild(div)

    })
    const currentPage = document.querySelector ('#pageNumber')
    currentPage.innerHTML = `${options.page}`; 
    
    const totalPages = document.querySelector ('#maxPageNumber')
    totalPages.innerHTML = `${data.totalPages}`; 


    const nextPage = document.querySelector ('#nextPageLink')
    if (options.hasNextPage) {
        nextPage.setAttribute('href', `${data.nextLink}`);
        }else{
            nextPage.removeAttribute('href')
            }

const prevPage = document.querySelector ('#prevPageLink')
if (options.hasPrevPage) {
    console.log ("Hay pagina anterior  " + data.prevLink )
    prevPage.setAttribute('href', `${data.prevLink}`);
    }else{
        prevPage.removeAttribute('href')
        }
        
return
}
