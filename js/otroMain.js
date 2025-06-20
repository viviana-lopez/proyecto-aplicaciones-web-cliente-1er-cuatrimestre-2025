
// token de airtable:   patsG1CAdiE2R9SAc.6d793054e0768422d0c9489bba8a79bd57d8718ac5fb22ed65186903460c20fd
const API_TOKEN = 'patsG1CAdiE2R9SAc.6d793054e0768422d0c9489bba8a79bd57d8718ac5fb22ed65186903460c20fd';
//const BASE_ID = 'appRff7Oy9Kxub7TA';
//const TABLE_NAME = 'Products';
//const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const API_URL = `https://api.airtable.com/v0/appRff7Oy9Kxub7TA/producto`;

//==================================================================================================
//===================== CONSTANTES Y valores inciales de FILTROS ===============================================================

let allProducts = [];//=constante para guardar el array de productos

const productContainer = document.querySelector('.product-grid');//para ubicar las tarjetas de productos que se van a crear dinamicamente

let currentFilter = '';//=constante inicial vacía para el valor de la busqueda por clase y subclase de productos
const searchInput = document.getElementById('input-search-products');//constante para tomar el valor que se va a ingresar en el filtro de busqueda por nombre
//const deliveryFreeCheckBox = document.querySelector('#delivery-free');




//==========================================================================================================
//=====================================  FUNCIONES======================================================


// ====FUNCION PARA CREAR EL CARD DE CADA PRODUCTO
function createProductCard(product){
    /*                      <div class="products-grid" id="productGrid">
    <article class="product-card">
        <img class="product-img" src="" alt="">
        <h3 class="card-title">Nombre del producto</h3>
        <p class="card-descripcion">Descripcion</p>
        <p class="card-price">$ 00000</p>
        <button class="card-button">Comprar</button>
    </article>
    */

    //creo el <article class="product-card">
    const card = document.createElement('article');
    card.classList.add('product-card')

    //creo el <img="product-img">
    const img = document.createElement('img');
    img.classList.add('product-img');
    img.src = product.image;
    img.alt = product.name;

    //creo el <h3 class="card-title">
    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = product.name;

    //creo el <p class="card-description">
    const description = document.createElement('p');
    description.classList.add('card-description');
    description.textContent = product.shortDescription;

    //creo el <p class="card-price">
    const price = document.createElement('p');
    price.classList.add('card-price');
    price.textContent = `$${product.price}`;

    //creo el <button class="card-button"
    const button = document.createElement('button');
    button.classList.add('card-button');
    button.textContent = 'Comprar';

    //pongo a las clases hijas dentro de la clase padre card (<article>) para que sean creadas dentro de el
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    //retorno la tarjeta para que se cree en el HTML
    return card;    
}


// =========== renderProducts funcion para poder representar los objetos(productos)/informacion traida desde AIRTABLE en las tarjetas de productos
function renderProducts(productsToRender) {
    productContainer.innerHTML = '';
    productsToRender.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

// ============ EVENTO Y FUNCION PARA IMPLEMENTAR EL ORDENAR LOS PRODUCTOS POR PRECIO
const orderBySelect = document.querySelector('select[name="order-by"]');

orderBySelect.addEventListener('change', () => {
    const value = orderBySelect.value;
    let productsToRender = [...allProducts];

    if (value === 'price-asc') {
        productsToRender.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
        productsToRender.sort((a, b) => b.price - a.price);
    }

    renderProducts(productsToRender);
});

// == FUNCION PARA PODER APLICAR LOS FILTROS POR NOMBRE Y CATEGORIAS
function filterProducts(){
    const searchQuery = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => {
        const matchesFilter = !currentFilter || product.category === currentFilter || product.subCategory === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        return matchesFilter && matchesSearch;
    });

    renderProducts(filteredProducts);   
}

// EVENTO PARA CAPTURAR CLIC EN LAS CATEGORÍAS Y APLICAR FILTRO
document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault(); // prevenir el salto #
        currentFilter = el.getAttribute('data-filter');
        filterProducts();
    });
});

document.getElementById('order-by').addEventListener('change', function () {
   const selectedCategory = this.value;

    // Obtener todos los productos
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const category = product.getAttribute('data-category');

        // Mostrar todos si es "todos", si no, solo los que coinciden
        if (selectedCategory === 'todos' || category === selectedCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});


searchInput.addEventListener('input', filterProducts); // también




// =====funcion asincrona PARA CARGAR LOS PRODUCTOS DESDE LA TABLA DE AIRTABLE  fetchProducts=obtenerProductos=getProducts para obtener/acceder a los datos de los productos de nuestra tabla de AIRTABLE
async function getProducts() {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization' : `Bearer ${API_TOKEN}` ,
            'Content-type' : 'application/json'
        }
    });

    const data = await response.json();

    //Mapea uno por uno los productos para llenar el array con los productos de airtable
    allProducts = data.records.map(item =>{
        return{
            category: item.fields.category,
            subCategory: item.fields.subCategory,
            name: item.fields.name,
            shortDescription: item.fields.shortDescription,
            longDescription: item.fields.longDescription,
            image: item.fields.image,
            price: item.fields.price
        };
        
    });
    filterProducts();
}

getProducts();




/* creacion de la descripcion del producto*/

//function createProductDescription(product){

    /*              <section class="selected-product">
        <div class="product-description">
            <div class="product-description-container">
                <div class="description-image">
                    <img src="" alt="">
                </div>
                <div class="description-information">
                    <div class="description-tittle"><h3>titulo</h3></div>
                    <div class="description-short-description"><p>descripcion corta</p></div>
                    <div class="description-price"><p>precio</p></div>
                    <div class="description-button"><button>agregar al carrito</button></div>
                </div>
            </div>
            <div class="product-description-long-description">
                <p>descripcion larga</p>
            </div>
        </div>
    */


//}