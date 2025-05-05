//*****************definicion de la variable producto*******************
const products =[
    {
        tipo: "indumentaria",
        subTipo: "prendas",
        name: "Campera Ansilta Primaloft",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        image: "./carpetaImagenes/imagenes-productos/campera.webp",
        price:"352000",
    },
    {   
        tipo: "escalada",
        subTipo: "zapatillas",
        name: "La Sportiva Solution",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        image: "./carpetaImagenes/imagenes-productos/pedula-amarilla.jpg",
        price:"311000",
    },
    {
        tipo: "montañismo",
        subTipo: "mochilas",
        name: "Lowe Alpine Yacuri 65lt",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        image: "./carpetaImagenes/imagenes-productos/mochila-azul.webp",
        price:"619000",
    },
    {
        tipo: "campamento",
        subTipo: "carpas",
        name: "Naturhike Cloud 2 personas",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        image: "./carpetaImagenes/imagenes-productos/carpa-blanca.jpg",
        price:"469000",
    },
    {
        tipo: "indumentaria",
        subTipo: "prendas",
        name: "Campera Aconcagua 4",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        image: "./carpetaImagenes/Picture5.jpg",
        price:"100",
    },
//agregado recien
{   
    tipo: "escalada",
    subTipo: "zapatillas",
    name: "La Sportiva Solution",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "./carpetaImagenes/imagenes-productos/pedula-amarilla.jpg",
    price:"311000",
},
{
    tipo: "montañismo",
    subTipo: "mochilas",
    name: "Lowe Alpine Yacuri 65lt",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "./carpetaImagenes/imagenes-productos/mochila-azul.webp",
    price:"619000",
},
{
    tipo: "campamento",
    subTipo: "carpas",
    name: "Naturhike Cloud 2 personas",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "./carpetaImagenes/imagenes-productos/carpa-blanca.jpg",
    price:"469000",
},
{
    tipo: "indumentaria",
    subTipo: "prendas",
    name: "Campera Aconcagua 4",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "./carpetaImagenes/Picture5.jpg",
    price:"100",
}
];

//creacion de las tarjetas por codigo para luego insertarlos en el DOM
const grid = document.querySelector('.product-grid');//elemento PADRE donde estan todos los productos


//****************insertar los datos de las tarjetas en el DOM**********

//creacion de la funcion en formato lambda. este formato sirve para hacer funciones anonimas
//(product)=>{}

//funcion declarada de la manera clásica para crear una tarjeta
function createProductCard(product){
    const card = document.createElement('article');//crea <article>>/article>
    card.classList.add('product-card');//agrega el class="" a ese <article>

    const img = document.createElement('img');//crea <img>
    img.src = product.image;//agrega el src="" a <img>
    img.alt = product.name;//agrega el alt="" descriptor de la imagen utilizando su nombre
    img.classList.add('product-img');//agrega el class=""

    const title = document.createElement('h3');//crea el <h3>
    title.textContent = product.name;//inserta en el <h3> el texto del atributo name del objeto product
    title.classList.add('card-title');//agrega el class=""

    const description = document.createElement('p');//crea el <p>
    description.textContent = product.description;//inserta el texto description del objeto product en la const title
    description.classList.add('card-description');//agrega el class=""

    const price = document.createElement('p');//crea el <p>
    price.textContent = `$${product.price}`;//agrega el precio anteponiendole el simbolo $ (lo crea como un literal usando los backtics: `$ ...{.......}). Antiguamente se hacia concatenando: "$"+product.price
    price.classList.add('card-price');//agrega el class=""

    const button = document.createElement('button');//crea el <button>
    button.textContent = 'Comprar';//le asigna el texto 'comprar'
    button.classList.add('card-button');//agrega el class=""

    //en JS permite utilizar indistintamente comillas simples '' o comillas dobles "" para escribir los strings

    //le agrego a la variable "const card" todos sus elementos hijos (todos los elementos que se van a crear dentro del <article>) en el orden que quiero que se creen
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    //genero el return para que la funcion retorne la tarjeta
    return card;

    //las funciones en JS pueden tener return o no tenerlo y devolver cualquier tipo de dato (bool, string, char, int, etcetera)
}


//ponemos la funcion para que se repita en un FOR EACH para que genere una tarjeta por cada objeto dentro de "productos"
//hago uso de la funcion createProductCard y le paso comoparametro el producto que esty recorriendo de mi arreglo de productos
products.forEach(product => {
    const card = createProductCard(product);//por cada vuelta genera una card del objeto product
    grid.appendChild(card);//por cada card generada carga este hijo a su elemento padre grid en donde se generarán todos sus hijos productos
}); 


//si quisiese recorrerlo todo como un array en vez de con un FOR EACH
//for( x = 0 ; x < products.length ; x++){
//    const product = createProductCard(products[x]);
//    grid.appendChild(product);
//}

//si quisiese recorrerlo hasta el producto nro 5 como un array en vez de con un FOR EACH
//for( x = 0 ; x < 5 ; x++){
//    const product = createProductCard(products[x]);
//    grid.appendChild(product);
//}


// ****  MANEJO DE EVENTOS  ****

