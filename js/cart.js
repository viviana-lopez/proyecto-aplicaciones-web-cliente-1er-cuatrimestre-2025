const cartProducts =JSON.parse(localStorage.getItem('cart')) || [];

function createProductCartCard(product){
    const card = document.createElement('article');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.classList.add('product-img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.classList.add('card-price');
    price.textContent = `$${product.price}`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.id = product.id;
    deleteButton.textContent = 'Eliminar producto';
    deleteButton.addEventListener('click', ()=>{
        const exists = cartProducts.findIndex(p => p.name ===product.name);
        if(exists !== -1){
            cartProducts.splice(exists , 1);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            renderCartProducts(cartProducts);
            alert('Producto eliminado del carrito');
        }
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(deleteButton);

    return card;
}

function renderCartProducts(list){
    const cartGrid = document.querySelector('.cart-grid');
    cartGrid.innerHTML = '';
    list.forEach(product => {
        const card =  createProductCartCard(product);
        cartGrid.appendChild(card);
    });
}

renderCartProducts(cartProducts);
