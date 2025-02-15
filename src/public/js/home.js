
const socketClient = io()

 
socketClient.on('realtime', (productos) => {            //escucha al server y rebibuja


    const contenedor = document.querySelector('#products-container')
    contenedor.innerHTML = "" //borra el ocntenedor, para evitar duplicados

    productos.forEach(producto => {
        const div = document.createElement('div')

        div.innerHTML = `
         
                <div class="card p-2 bd-highlight" style="width: 18rem;">
                 
                    <div class="card-body">
                        <h5 class="card-title" > ID: ${producto.id}</h5>
                        <h5 class="card-title"> Title: ${producto.title}</h5>
                        <p class="card-text">Description:  ${producto.description}</p>
                        <p class="card-text"> Precio:  ${producto.price}</p>
                        <p class="card-text"> Stock:  ${producto.stock}</p>
                     
    
                    </div>
                </div>
         
     `
        contenedor.appendChild(div)

    })

})
