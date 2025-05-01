document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const products = [
        { id: "0001", name: "Fahrenheit", gender: "male", type: "eau-de-parfum", price: 1500, description: "A warm and spicy fragrance with notes of leather, mandarin, and nutmeg.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M01", stock: 10 },
        { id: "0002", name: "Noir", gender: "male", type: "eau-de-parfum", price: 1300, description: "A dark and mysterious scent with hints of bergamot, vanilla, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M02", stock: 10 },
        { id: "0003", name: "Red", gender: "male", type: "body-mist", price: 290, description: "A fresh and invigorating fragrance with a zesty citrus opening.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M03", stock: 10 },
        { id: "0004", name: "Legend", gender: "male", type: "eau-de-parfum", price: 1400, description: "A woody fragrance with notes of lavender, oak, and apple.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M04", stock: 10 },
        { id: "0005", name: "Bvlgari Extreme", gender: "male", type: "eau-de-parfum", price: 1600, description: "A sophisticated scent with a mix of citrus, spices, and wood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M05", stock: 10 },
        { id: "0006", name: "CK One", gender: "male", type: "body-mist", price: 280, description: "A refreshing, unisex fragrance with notes of green tea, papaya, and bergamot.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M06", stock: 10 },
        { id: "0007", name: "Coolwater", gender: "male", type: "eau-de-parfum", price: 1300, description: "A clean and aquatic scent with refreshing notes of mint, lavender, and sandalwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M07", stock: 10 },
        { id: "0008", name: "Eternity Aqua", gender: "male", type: "eau-de-parfum", price: 1500, description: "A fresh and aquatic fragrance with notes of cucumber, citrus, and sandalwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M08", stock: 10 },
        { id: "0009", name: "Acqua di Gio", gender: "male", type: "eau-de-parfum", price: 1700, description: "A classic aquatic fragrance with notes of jasmine, rosemary, and citrus.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M09", stock: 10 },
        { id: "0010", name: "Aventus", gender: "male", type: "eau-de-parfum", price: 1850, description: "A bold fragrance with a blend of pineapple, birch, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M10", stock: 10 },
        { id: "0011", name: "Benetton", gender: "male", type: "body-mist", price: 300, description: "A simple and fresh scent with citrus notes and light florals.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M11", stock: 10 },
        { id: "0012", name: "Bvlgari Aqua Amara", gender: "male", type: "eau-de-parfum", price: 1550, description: "A fresh and citrusy fragrance with hints of mandarin, neroli, and patchouli.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M12", stock: 10 },
        { id: "0013", name: "Vanilla Lace", gender: "female", type: "body-mist", price: 250, description: "A sweet, floral fragrance with rich vanilla notes.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F01", stock: 10 },
        { id: "0014", name: "Weekend", gender: "female", type: "eau-de-parfum", price: 1200, description: "A fresh and light fragrance with a blend of citrus, florals, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F02", stock: 10 },
        { id: "0015", name: "Eclat d'Arpege", gender: "female", type: "eau-de-parfum", price: 1450, description: "A floral fragrance with notes of peach, lilac, and green tea.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F03", stock: 10 },
        { id: "0016", name: "Incanto Shine", gender: "female", type: "body-mist", price: 300, description: "A fruity and floral fragrance with notes of passionfruit, jasmine, and orange.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F04", stock: 10 },
        { id: "0017", name: "Fantasy", gender: "female", type: "body-mist", price: 275, description: "A sweet and fruity fragrance with notes of kiwi, cupcake, and jasmine.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F05", stock: 10 },
        { id: "0018", name: "Green Tea", gender: "female", type: "body-mist", price: 290, description: "A refreshing and clean fragrance with green tea, lemon, and mint.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F06", stock: 10 },
        { id: "0019", name: "Omnia Amethyste", gender: "female", type: "eau-de-parfum", price: 1600, description: "A delicate floral fragrance with notes of iris, rose, and pomegranate.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F07", stock: 10 },
        { id: "0020", name: "Light Blue", gender: "female", type: "eau-de-parfum", price: 1400, description: "A vibrant and refreshing fragrance with notes of Sicilian lemon, apple, and cedarwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F08", stock: 10 },
        { id: "0021", name: "Bombshell", gender: "female", type: "body-mist", price: 350, description: "A floral and fruity fragrance with notes of purple passionfruit, peony, and vanilla orchid.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F09", stock: 10 },
        { id: "0022", name: "Bright Crystal", gender: "female", type: "eau-de-parfum", price: 1550, description: "A fresh, floral fragrance with peony, pomegranate, and lotus.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F10", stock: 10 },
        { id: "0023", name: "Chance", gender: "female", type: "eau-de-parfum", price: 1650, description: "A sophisticated fragrance with notes of jasmine, rose, and patchouli.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F11", stock: 10 },
        { id: "0024", name: "Cucumber Melon", gender: "female", type: "body-mist", price: 270, description: "A refreshing and light fragrance with cucumber and melon notes.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F12", stock: 10 }
    ];
    const product = products.find(p => p.id === productId);
    if (product) {
        updateProductDetails(product);
        document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
    } else {
        showProductNotFound();
    }
    const cartBtn = document.getElementById('view-cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCartDropdown);
    }
    document.querySelectorAll('.cart-view-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            showCartModal();
        });
    });
    updateCartCount();
});
function toggleCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown');
    dropdown.classList.toggle('hidden');
    renderCartContents();
}
function showCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('cart-items-modal');
    const totalEl = document.getElementById('cart-total-modal');
    tbody.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.imageUrl}" width="50" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>₱${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>₱${subtotal.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
    totalEl.textContent = `Total: ₱${total.toFixed(2)}`;
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    document.getElementById('close-modal-btn').onclick = () => {
        modal.style.display = 'none';
    };
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}
function renderCartContents() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const listEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    listEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-name">${item.name}</span>
            <button class="qty-decrease" data-id="${item.id}">−</button>
            <span class="item-qty">${item.quantity}</span>
            <button class="qty-increase" data-id="${item.id}">+</button>
            <span class="item-subtotal">₱${(item.price * item.quantity).toFixed(2)}</span>
        `;
        listEl.appendChild(li);
    });
    totalEl.textContent = `₱${total.toFixed(2)}`;
    document.querySelectorAll('.qty-increase').forEach(btn => {
        btn.addEventListener('click', e => {
            changeItemQuantity(e.target.dataset.id, +1);
        });
    });
    document.querySelectorAll('.qty-decrease').forEach(btn => {
        btn.addEventListener('click', e => {
            changeItemQuantity(e.target.dataset.id, -1);
        });
    });
}
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const idx = cart.findIndex(i => i.id === product.id);
    if (idx === -1) {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, imageUrl: product.imageUrl });
        showToast(`${product.name} added to cart.`);
    } else {
        cart[idx].quantity++;
        showToast(`Increased quantity of ${product.name}.`);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartContents();
}
function changeItemQuantity(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    cart[idx].quantity += delta;
    if (cart[idx].quantity < 1) cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartContents();
}
function updateProductDetails(product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `₱${product.price.toLocaleString()}`;
    document.getElementById("product-description").textContent = product.description;
    const img = document.getElementById("product-image");
    img.src = product.imageUrl;
    img.onerror = () => img.src = 'fallback-image.jpg';
}
function showProductNotFound() {
    document.getElementById("product-name").textContent = "Product not found.";
    document.getElementById("product-image").style.display = 'none';
    document.getElementById("product-description").textContent = "Sorry, this product doesn't exist.";
}
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
