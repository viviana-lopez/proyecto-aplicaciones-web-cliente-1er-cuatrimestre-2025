// === Airtable ===
const API_TOKEN = 'patsG1CAdiE2R9SAc.6d793054e0768422d0c9489bba8a79bd57d8718ac5fb22ed65186903460c20fd';
const API_URL = 'https://api.airtable.com/v0/appRff7Oy9Kxub7TA/producto';

// Obtener ID desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Cargar productos desde localStorage (si ya fueron cargados antes)
let allProducts = JSON.parse(localStorage.getItem('products') || '[]');


// Buscar el producto
const product = allProducts.find(p => p.id === productId);

if (product) {
    document.getElementById('prod-img').src = product.image;
    document.getElementById('prod-title').textContent = product.name;
    document.getElementById('prod-short-desc').textContent = product.shortDescription;
    document.getElementById('prod-long-desc').textContent = product.longDescription;
    document.getElementById('prod-price').textContent = `$${product.price}`;
} else {
    alert("Producto no encontrado");
}


