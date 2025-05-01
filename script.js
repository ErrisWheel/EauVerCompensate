let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Eau Ver Compensate is ready!");

    const heading = document.querySelector("h1");
    heading.addEventListener("mouseover", () => heading.style.color = "gold");
    heading.addEventListener("mouseout", () => heading.style.color = "white");

    // Side nav
    const navToggle = document.getElementById("navToggle");
    const sideNav = document.getElementById("sideNav");

    navToggle.addEventListener("click", (event) => {
        sideNav.classList.toggle("active");
        document.body.classList.toggle("nav-open");
        event.stopPropagation();

        adjustChatbotPosition();
    });

    document.addEventListener("click", (event) => {
        if (document.body.classList.contains("nav-open") && !sideNav.contains(event.target) && !navToggle.contains(event.target)) {
            sideNav.classList.remove("active");
            document.body.classList.remove("nav-open");
        }
    });

    // For phone
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    document.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            sideNav.classList.remove("active");
            document.body.classList.remove("nav-open");

            adjustChatbotPosition();
        }
    });
});

// Product slider
document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.querySelector(".product-container");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const productWidth = document.querySelector(".product").offsetWidth + 20;

    let scrollInterval;

    function startScrolling(direction) {
        scrollInterval = setInterval(() => {
            productContainer.scrollLeft += direction * 5;
        }, 10);
    }

    function stopScrolling() {
        clearInterval(scrollInterval);
    }

    prevBtn.addEventListener("mousedown", () => startScrolling(-1));
    nextBtn.addEventListener("mousedown", () => startScrolling(1));

    prevBtn.addEventListener("mouseup", stopScrolling);
    nextBtn.addEventListener("mouseup", stopScrolling);

    prevBtn.addEventListener("mouseleave", stopScrolling);
    nextBtn.addEventListener("mouseleave", stopScrolling);

    prevBtn.addEventListener("click", () => {
        productContainer.scrollLeft -= productWidth;
    });

    nextBtn.addEventListener("click", () => {
        productContainer.scrollLeft += productWidth;
    });
});

// Prof buttons
document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.querySelector(".profile-btn");
    const loginPrompt = document.getElementById("login-prompt");
    const closeBtn = document.querySelector(".close-btn");
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const forgotBtn = document.getElementById("forgot-btn");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.rememberMe) {
        document.getElementById("username").value = storedUser.username;
        document.getElementById("email").value = storedUser.email;
        document.getElementById("rememberMe").checked = true;
    }

    profileBtn.addEventListener("click", function () {
        loginPrompt.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        loginPrompt.style.display = "none";
    });

    loginBtn.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const rememberMe = document.getElementById("rememberMe").checked;

        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }

        console.log(`Login Attempt: Username: ${username}, Email: ${email}, Password: ${password}, Remember Me: ${rememberMe}`);
        alert("Login successful! (Simulated)");
        loginPrompt.style.display = "none";

        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify({ username, email, rememberMe }));
        } else {
            localStorage.removeItem("user");
        }
    });

    signupBtn.addEventListener("click", function () {
        window.location.href = "signup.html";
    });

    forgotBtn.addEventListener("click", function () {
        alert("Redirecting to Forgot Password...");
        window.location.href = "forgot-password.html";
    });

    window.addEventListener("click", function (event) {
        if (event.target === loginPrompt) {
            loginPrompt.style.display = "none";
        }
    });
});

// Chatbot
document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbotBox = document.getElementById("chatbot-box");
    const closeChatbot = document.getElementById("close-chatbot");
    const sendBtn = document.getElementById("send-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    chatbotBtn.addEventListener("click", () => {
        chatbotBox.style.display = "block";
    });

    closeChatbot.addEventListener("click", () => {
        chatbotBox.style.display = "none";
    });

    sendBtn.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let userText = chatbotInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        chatbotInput.value = "";

        setTimeout(() => {
            let botResponse = getBotResponse(userText);
            addMessage(botResponse, "bot");
        }, 500);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(input) {
        input = input.toLowerCase();
        if (input.includes("hello")) {
            return "Hi there! How can I help you?";
        } else if (input.includes("help")) {
            return "Sure! What do you need help with?";
        } else if (input.includes("price")) {
            return "Our prices vary. Can you specify which product/service?";
        } else {
            return "I'm not sure how to respond to that. Can you rephrase?";
        }
    }

    function adjustChatbotPosition() {
        const chatbotBtn = document.getElementById("chatbot-btn");
        const chatbotBox = document.getElementById("chatbot-box");
        const sideNav = document.getElementById("sideNav");
    
        if (!chatbotBtn || !chatbotBox || !sideNav) return;
    
        if (sideNav.classList.contains("active")) {
            chatbotBtn.style.left = "260px";
            chatbotBox.style.left = "260px";
        } else {
            chatbotBtn.style.left = "20px";
            chatbotBox.style.left = "20px";
        }
    }
});

// Perfume producs
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const viewCartBtn = document.getElementById("view-cart-btn");
    const cartDropdown = document.getElementById("cart-dropdown");

    // Product renderer
    const products = [
        // male perfumes
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
        // female perfumes
        { id: "0013", name: "Vanilla Lace", gender: "female", type: "body-mist", price: 250, description: "A sweet, floral fragrance with rich vanilla notes.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F01", stock: 10 },
        { id: "0014", name: "Weekend", gender: "female", type: "eau-de-parfum", price: 1200, description: "A fresh and light fragrance with a blend of citrus, florals, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F02", stock: 10 },
        { id: "0015", name: "Eclat d'Arpege", gender: "female", type: "eau-de-parfum", price: 1450, description: "A floral fragrance with notes of peach, lilac, and green tea.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F03", stock: 10 },
        { id: "0016", name: "Incanto Shine", gender: "female", type: "body-mist", price: 300, description: "A fruity and floral fragrance with notes of passionfruit, jasmine, and orange.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F04", stock: 10 },
        { id: "0017", name: "Fantasy", gender: "female", type: "body-mist", price: 275, description: "A sweet and fruity fragrance with notes of kiwi, cupcake, and jasmine.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F05", stock: 10 },
        { id: "0018", name: "Green Tea", gender: "female", type: "body-mist", price: 290, description: "A refreshing and clean fragrance with green tea, lemon, and mint.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F06", stock: 10 },
        { id: "0019", name: "Omnia Amethyste", gender: "female", type: "eau-de-parfum", price: 1600, description: "A delicate floral fragrance with notes of iris, rose, and pomegranate.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F07", stock: 10 },
        { id: "0020", name: "Light Blue", gender: "female", type: "eau-de-parfum", price: 1400, description: "A vibrant and refreshing fragrance with notes of Sicilian lemon, apple, and cedarwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F08", stock: 10 },
        { id: "0021", name: "Bombshell", gender: "female", type: "body-mist", price: 350, description: "A floral and fruity fragrance with notes of purple passionfruit, Shangri-la peony, and vanilla orchid.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F09", stock: 10 },
        { id: "0022", name: "Bright Crystal", gender: "female", type: "eau-de-parfum", price: 1550, description: "A fresh, floral fragrance with peony, pomegranate, and lotus.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F10", stock: 10 },
        { id: "0023", name: "Chance", gender: "female", type: "eau-de-parfum", price: 1650, description: "A sophisticated fragrance with notes of jasmine, rose, and patchouli.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F11", stock: 10 },
        { id: "0024", name: "Cucumber Melon", gender: "female", type: "body-mist", price: 270, description: "A refreshing and light fragrance with cucumber and melon notes.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F12", stock: 10 }
    ];

    const container = document.getElementById("all-products");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const dropdown = document.getElementById("filter-dropdown");

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Cart renderer
    function renderProducts(productList) {
        container.innerHTML = "";
        productList.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.setAttribute("data-gender", product.gender);
            card.setAttribute("data-type", product.type);
            card.setAttribute("data-price", product.price);

            card.innerHTML = `
                <a href="product.html?id=${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <p>${product.name}</p>
                    <span>₱${product.price}</span>
                </a>
                <button class="quick-add" data-id="${product.id}" title="Add to Cart">🛒</button>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll('.quick-add').forEach(button => {
            button.addEventListener('click', () => {
                addToCart(button.dataset.id);
            });
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            alert("Product not found!");
            return;
        }

        const existing = cart.find(item => item.id === productId);
        if (existing) {
            if (existing.quantity < product.stock) {
                existing.quantity++;
            } else {
                alert("Out of stock!");
                return;
            }
        } else {
            cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }

    // Cart UI and dropdown
    function updateCartCount() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalCount;

        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="item-name">${item.name}</span>
                <button class="qty-decrease" data-id="${item.id}">−</button>
                <span class="item-qty">${item.quantity}</span>
                <button class="qty-increase" data-id="${item.id}">+</button>
                <span class="item-subtotal">₱${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function toggleCartDropdown() {
        cartDropdown.classList.toggle("hidden");
        updateCartCount();
    }
    
    if (viewCartBtn) {
        viewCartBtn.addEventListener("click", toggleCartDropdown);
    }

    function applyFilters() {
        const q = searchInput.value.toLowerCase();
        const v = dropdown.value;
        let filtered = [...products];

        if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
        if (v === "gender-male") filtered = filtered.filter(p => p.gender === "male");
        else if (v === "gender-female") filtered = filtered.filter(p => p.gender === "female");
        else if (v === "type-body-mist") filtered = filtered.filter(p => p.type === "body-mist");
        else if (v === "type-eau-de-parfum") filtered = filtered.filter(p => p.type === "eau-de-parfum");
        else if (v === "sort-price-low") filtered.sort((a, b) => a.price - b.price);
        else if (v === "sort-price-high") filtered.sort((a, b) => b.price - a.price);

        renderProducts(filtered);
    }

    renderProducts(shuffle(products));
    updateCartCount();

    searchInput.addEventListener('input', applyFilters);
    searchButton.addEventListener('click', applyFilters);
    dropdown.addEventListener('change', applyFilters);

    cartItemsList.addEventListener('click', e => {
        const id = e.target.dataset.id;
        if (!id) return;
    
        const item = cart.find(i => i.id === id);
        const prod = products.find(p => p.id === id);
    
        if (e.target.classList.contains('qty-decrease')) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(i => i.id !== id);
            }
        }
        else if (e.target.classList.contains('qty-increase')) {
            if (item.quantity < prod.stock) {
                item.quantity++;
            } else {
                alert("Out of stock!");
            }
        } else {
            return;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });

    function showCartPage() {

        document.getElementById("cart-dropdown").classList.add("hidden");
        document.querySelector(".product-section").classList.add("hidden");

        const container = document.getElementById("cart-page");
        container.innerHTML = "";
        container.style.display = 'block';
        container.classList.remove("hidden");
    
        let html = `
          <h2>Your Cart</h2>
          <table class="cart-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Stock</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
        `;
    
        let totalCost = 0;
        cart.forEach(item => {
          const prod = products.find(p => p.id === item.id);
          const subtotal = prod.price * item.quantity;
          totalCost += subtotal;
          html += `
            <tr>
              <td><img src="${prod.imageUrl}" alt="${prod.name}" width="50"></td>
              <td>${prod.name}</td>
              <td>₱${prod.price.toFixed(2)}</td>
              <td>${item.quantity}</td>
              <td>${prod.stock}</td>
              <td>₱${subtotal.toFixed(2)}</td>
            </tr>
          `;
        });
    
        html += `
            </tbody>
          </table>
          <p class="cart-total-amount">Total: ₱${totalCost.toFixed(2)}</p>
          <button id="checkout-btn">Checkout</button>
          <button id="close-cart-btn">Back to Shop</button> <!-- ADD THIS BUTTON -->
        `;
        container.innerHTML = html;
    
        document.getElementById('close-cart-btn')
            .addEventListener('click', () => {
            document.getElementById('cart-page').style.display = 'none';
            document.querySelector('.product-section').classList.remove('hidden');
        });
    
        document.getElementById('checkout-btn')
            .addEventListener('click', () => {
            document.getElementById('cart-page').style.display = 'none';
            document.querySelector('.product-section').classList.remove('hidden');
        });
    }
    
    // listener for view cart link
    document.querySelector(".cart-view-link")
        .addEventListener("click", e => {
            e.preventDefault();
            showCartPage();
    });
});
