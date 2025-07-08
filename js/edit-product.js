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

// Función que envía los datos a Airtable
const addToAirtable = async (product) => {
    const itemAirtable = {
        fields: product
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'  // <- corregido (estaba mal escrito)
            },
            body: JSON.stringify(itemAirtable)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Producto agregado exitosamente.");
            document.querySelector('form').reset();
            console.log("Registro creado:", data);
        } else {
            console.error("Error desde Airtable:", data);
            alert("Error al guardar en Airtable. Ver consola.");
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error al conectar con Airtable.");
    }
};

// Función que recoge los datos del formulario y los prepara
function addProduct() {
    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value;
    const subCategory = document.getElementById('subcategory').value;
    const shortDescription = document.getElementById('shortdescription').value.trim();
    const longDescription = document.getElementById('longdescription').value.trim();
    const image = document.getElementById('image').value.trim();
    const price = parseFloat(document.getElementById('price').value);

    if (!name || isNaN(price)) {
        alert("El nombre del producto y el precio son obligatorios.");
        return;
    }

    const newProduct = {
        "name": name,
        "category": category,
        "subCategory": subCategory,
        "shortDescription": shortDescription,
        "longDescription": longDescription,
        "image": image,
        "price": price
    };

    addToAirtable(newProduct);
}

