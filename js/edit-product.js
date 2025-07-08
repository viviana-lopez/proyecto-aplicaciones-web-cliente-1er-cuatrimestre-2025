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

const addToAirtable = async (product) => {
    const itemAirtable = {
        fields: product
    };
    fetch(API_URL {
       method:'POST', 
       headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'aplication/json'
       },
       body: JSON.stringify(itemAirtable)
    }).then(data => console.log(data));
}

function addProduct(){
    const newProduct = {
        category: document.getElementById,
        subCategory: ,
        name: item.fields.name,
        shortDescription: ,
        longDescription: ,
        image: ,
        price: ,
    }
    addToAirtable(newProduct);
}
