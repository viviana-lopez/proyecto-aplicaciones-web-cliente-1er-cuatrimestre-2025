// // 
// //patsG1CAdiE2R9SAc.6d793054e0768422d0c9489bba8a79bd57d8718ac5fb22ed65186903460c20fd
// const API_TOKEN = 'patsG1CAdiE2R9SAc.6d793054e0768422d0c9489bba8a79bd57d8718ac5fb22ed65186903460c20fd';
// const BASE_ID = 'appRff7Oy9Kxub7TA';
// const TABLE_NAME = 'producto';
// //const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
// const API_URL = `https://api.airtable.com/v0/appRff7Oy9Kxub7TA/producto`;


// === Airtable ===
const API_TOKEN = 'patsG1CAdiE2R9SAc.6d793054e0768422d0c9489bba8a79bd57d8718ac5fb22ed65186903460c20fd';
const API_URL = 'https://api.airtable.com/v0/appRff7Oy9Kxub7TA/producto';

// === Variables globales ===
let allProducts = [];
let currentFilter = '';
let currentSearch = '';
let currentOrder = '';

// === Variables para guardar los items del carrito en el local storage
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

// === Selectores del DOM ===
const productContainer = document.querySelector('.product-grid');
const searchInput = document.getElementById('input-search-products');
const orderBySelect = document.getElementById('order-by');

// === Funciones ===

// Crear la tarjeta del producto
function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.classList.add('product-img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.classList.add('card-description');
    description.textContent = product.shortDescription;

    const price = document.createElement('p');
    price.classList.add('card-price');
    price.textContent = `$${product.price}`;

    const viewButton = document.createElement('button');
    viewButton.classList.add('view-button');
    viewButton.id = product.id;
    viewButton.textContent = 'Ver producto';
    viewButton.addEventListener('click', ()=>{
        window.location.href=`../product-detail.html?id=${product.id}`;
    });

    const buyButton = document.createElement('button');
    buyButton.classList.add('card-button');
    buyButton.textContent = 'Agregar al carrito';
    buyButton.addEventListener('click', ()=> {
        const exist = cartProducts.find (p =>p.title === product.name);
        if(!exist){
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            alert('Produto agregado al carrito');
        }
    })

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(viewButton);
    card.appendChild(buyButton);

    return card;
}

// Renderizar productos filtrados
function renderProducts(list) {
    productContainer.innerHTML = '';
    list.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

// Aplicar filtros combinados y renderizar
function applyFiltersAndRender() {
    let filtered = [...allProducts];

    if (currentFilter) {
        filtered = filtered.filter(p =>
            p.category === currentFilter || p.subCategory === currentFilter
        );
    }

    if (currentSearch) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(currentSearch)
        );
    }

    if (currentOrder === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentOrder === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}

// Cargar productos desde Airtable
async function getProducts() {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    allProducts = data.records.map(item => ({
        category: item.fields.category,
        subCategory: item.fields.subCategory,
        name: item.fields.name,
        shortDescription: item.fields.shortDescription,
        longDescription: item.fields.longDescription,
        image: item.fields.image,
        price: item.fields.price,
        id: item.id
    }));

    applyFiltersAndRender();
}

// === Event Listeners ===

searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.toLowerCase();
    applyFiltersAndRender();
});

orderBySelect.addEventListener('change', () => {
    currentOrder = orderBySelect.value;
    applyFiltersAndRender();
});

document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        currentFilter = el.getAttribute('data-filter');
        applyFiltersAndRender();
    });
});

// === Mostrar mensaje de contacto (si viene del localStorage) ===
const msg = localStorage.getItem('contactMessage');
if (msg) {
    alert(msg);
    localStorage.removeItem('contactMessage');
}

// === Ejecutar la toma de datos de AIRTABLE para luego filtrarlas y crear las crd de forma dinamica===
getProducts();

