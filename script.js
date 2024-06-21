const products = [
    { id: 1, name: "Miel 1kg", buyPrice: 10, sellPrice: 15, image: "images/miel1kg.jpg" }, // Reemplaza "url_aquí_1" con la URL de la imagen del Producto A
    { id: 2, name: "Miel 20kg", buyPrice: 20, sellPrice: 25, image: "images/miel20kg.jpg" }, // Reemplaza "url_aquí_2" con la URL de la imagen del Producto B
    { id: 3, name: "Miel 200kg", buyPrice: 30, sellPrice: 35, image: "images/miel200kg.jpg" }, // Reemplaza "url_aquí_3" con la URL de la imagen del Producto C
    // Agregar más productos según sea necesario
];

const buyCart = [];
const sellCart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <p>${product.name} - Compra: $${product.buyPrice} / Venta: $${product.sellPrice}</p>
                <button class="buy" onclick="addToCart('buy', ${product.id})">Comprar</button>
                <button class="sell" onclick="addToCart('sell', ${product.id})">Vender</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
});

function addToCart(cartType, productId) {
    const product = products.find(p => p.id === productId);
    const cart = cartType === 'buy' ? buyCart : sellCart;
    const existingProduct = cart.find(p => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const price = cartType === 'buy' ? product.buyPrice : product.sellPrice;
        cart.push({ ...product, price, quantity: 1 });
    }

    updateCart(cartType);
}

function removeFromCart(cartType, productId) {
    const cart = cartType === 'buy' ? buyCart : sellCart;
    const productIndex = cart.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
        } else {
            cart.splice(productIndex, 1);
        }
    }

    updateCart(cartType);
}

function updateCart(cartType) {
    const cart = cartType === 'buy' ? buyCart : sellCart;
    const cartElement = cartType === 'buy' ? document.getElementById('buyCart') : document.getElementById('sellCart');
    const totalElement = cartType === 'buy' ? document.getElementById('buyTotal') : document.getElementById('sellTotal');

    cartElement.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">${product.name} - $${product.price} x ${product.quantity}</div>
            <div class="cart-item-controls">
                <button class="remove" onclick="removeFromCart('${cartType}', ${product.id})">Restar</button>
            </div>
        `;
        cartElement.appendChild(li);
        total += product.price * product.quantity;
    });

    totalElement.textContent = total;
}

function sendMessage(cartType) {
    const cart = cartType === 'buy' ? buyCart : sellCart;
    const cartDescription = cart.map(product => `${product.name} - $${product.price} x ${product.quantity}`).join('\n');
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const message = `Detalles de la ${cartType === 'buy' ? 'compra' : 'venta'}:\n${cartDescription}\nTotal: $${total}`;

    const phoneNumber = '+542914325826'; // Reemplaza '521234567890' con tu número de WhatsApp en formato internacional
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}