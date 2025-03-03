
requestedUrl =  "http://localhost:8080/api" + window.location.pathname
const data = loadUrl (requestedUrl)
 
    function loadUrl  (url) {
        fetch (url)        
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                console.log(data)
                renderCarts (data)         
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            })};
        

            function renderCarts (data){            //escucha al server y rebibuja

                let carts  = data.payload
                
                const contenedor = document.querySelector('#carts-container')
                contenedor.innerHTML = "" //borra el ocntenedor, para evitar duplicados
                
                if (!Array.isArray(carts)) {
                    carts = [carts];  // Convert single object into an array
                    document.querySelector ("#cart-section-title").innerHTML ="Ver Carrito"

                }

                carts.forEach(cart => {
                    const div = document.createElement('div')
            
                    div.innerHTML = `
                     
                            <div class="card p-2 bd-highlight" style="width: 18rem;">
                             
                                <div class="card-body">
                                    <h5 class="card-title" > ID: ${cart._id}</h5>
                                </div>
                            </div>

                     
                 `
                    contenedor.appendChild(div)
            
                })
            }
           