//SIMULADOR DE COMPRAS

//ELEMENTOS DOM
let total = document.querySelector(".total");
let botones = document.getElementsByClassName("comprar");
let temp = document.querySelector("template");
let caja = temp.content.querySelector("div");
let claseCajas = document.querySelector("section#caja");
const sesion = document.querySelector('#sesion');
let vaciarCarrito = document.querySelector(".vaciar")

//VARIABLES DECLARADAS
let carrito;
let envio = 1000;
let valorIVA = 0.21;
let totalCarrito;
let carritoSS;


//Añado los productos
const libros = [];
libros.push(new Libro("Vermeer:La Obra Completa", "Karl Shutz", 5000, 01, 3));
libros.push(new Libro("Eso no estaba en mi libros de matemáticas","Vicente Meavilla",1500,02,25));
libros.push(new Libro("Bajo La misma Estrella", "John Green", 2500, 03, 10));

//Clono elementos del template para crear los contenedores de los productos
for (let libro of libros) {
  let clonado = caja.cloneNode(caja, true);

  clonado.children[0].innerText = libro.nombre;
  clonado.children[1].innerText = libro.autor;
  clonado.children[2].innerText = "$" + libro.precio;


  claseCajas.appendChild(clonado);
}

//INICIO DEL CODIGO
sessionStorage.carrito == undefined ? 
    (carrito = new Carrito())
  : ((carritoSS = JSON.parse(sessionStorage.carrito)),
    (carrito = new Carrito(
      carritoSS.nombre,
      carritoSS.total,
      carritoSS.productos
    )),
    actualizar());

  //Agregar item al carrito
for (let i = 0; i < libros.length; i++) {
  botones[i].onclick =  () => {
    carrito.agregarItem(libros[i]);
  };
}

  //Sweet alert para suscribirse 
const emails = [];
sesion.addEventListener('click', async() => {
  const { value: email } = await Swal.fire({
    title: 'Suscribite a nuestra lista de correos',
    input: 'email',
    inputLabel: 'Vas a recibir grandes beneficios!',
    inputPlaceholder: 'Acá podés ingresar tu email'
  })
  
  if (email) {
    Swal.fire(`Email ingresado: ${email}`)
    emails.push(new Email(email));
  }})

  //Vaciar carrito
for (let i = 0; i < libros.length; i++) {
  vaciarCarrito.addEventListener('click', () => {
    carrito.vaciarCarrito(libros[i]);
    actualizar()
  })
}



//FUNCIONES
function precioFinal(precioProducto) {
  return (totalCarrito = precioProducto + precioProducto * valorIVA + envio);
}

function actualizar() {
  total.textContent = `Total con envio: $${precioFinal(carrito.precioProducto())}`;
  sessionStorage.carrito = JSON.stringify(carrito);
}
