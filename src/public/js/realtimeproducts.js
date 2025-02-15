
const socketClient = io()

document.querySelector('#btnDelete').addEventListener('click', () => {

    const idProduct = document.querySelector("#pId").value
    console.log (idProduct)
    borrarProducto (idProduct)

})


document.querySelector('#btnIngresar').addEventListener('click', () => {

    const formData = new FormData();
    formData.append('title', document.querySelector("#prodTitle").value);
    formData.append('description', document.querySelector("#prodDescription").value);
    formData.append('code', document.querySelector("#prodCode").value);
    formData.append('price', document.querySelector("#prodPrice").value);
    formData.append('stock', document.querySelector("#prodStock").value);
    formData.append('category', document.querySelector("#prodCategory").value);
    // formData.append('image', fileInput.files[0]); // Assuming you get the file from an <input type="file">

    fetch('http://localhost:8080/api/products', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => socketClient.emit('addNew#', { action: 'addNew#' }))   // el producto se agregao por api. solo notiica
        //  al server para que refresque
        .then(clearForm())
        .catch(error => console.error('Error:', error));
})
//este codigo se agrega porque los botones feron agregados dinamicamente
//

document.addEventListener("click", (event) => {
    if (event.target.textContent == "Borrar")      //el boton borrar se ha presionado
    {
        const idProduct = event.target.value
        borrarProducto (idProduct)
    }})



socketClient.on('realtime', (productos) => {            //escucha al server y rebibuja


    const contenedor = document.querySelector('#products-container')
    contenedor.innerHTML = "" //borra el ocntenedor, para evitar duplicados

    productos.forEach(producto => {
        const div = document.createElement('div')

        div.innerHTML = `
         
                <div class="card p-2 bd-highlight" style="width: 18rem;">
             
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>   
                        <h6 class="card-text" > ID: ${producto.id}</h6>
                        <p class="card-text">${producto.description}</p>
                        <p class="card-text"> Precio:  ${producto.price}</p>
                        <p class="card-text"> Stock:  ${producto.stock}</p>
                                             
                        <button value= ${producto.id} class="btn btn-danger text-center" >Borrar</button>
    
                    </div>
                </div>
         
     `
        contenedor.appendChild(div)

        console.log("hecho")
    })

})
function clearForm() {
    document.querySelector("#prodTitle").value = ""
    document.querySelector("#prodDescription").value = ""
    document.querySelector("#prodCode").value = ""
    document.querySelector("#prodPrice").value = ""
    document.querySelector("#prodStock").value = ""
    document.querySelector("#prodCategory").value = ""

}

function borrarProducto (pId)
{
    
    socketClient.emit('deleteProduct#', { action: 'deleteProduct#', id: pId }) //envia pedido al server

    Toastify({
        text: "Producto Borrado",
        duration: 3000,
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}