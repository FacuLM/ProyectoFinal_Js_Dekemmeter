const dolares= document.getElementById("tiposDeDolar")
let lista=[]
function obtenerApi(){
    const urlApi= "https://dolarapi.com/v1/dolares"
    fetch (urlApi)
        .then(respuestaurl=>respuestaurl.json())
        .then(posteo=>{
            lista=posteo;
            console.log(lista)
            publicarDatos()
        })
}
function publicarDatos(){
lista.forEach(post=>{
    dolares.innerHTML+=`
    <div class="post">
    <p>
        ${post.moneda} ${post.nombre} :
    </p>
    <p>
    Compra: $${post.compra}
    <br>
    Venta: $${post.venta}
    </p>
    </div>
    `
})
}

obtenerApi()