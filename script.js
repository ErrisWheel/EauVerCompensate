let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Eau Ver Compensate is ready!");

    const heading = document.querySelector("h1");
    if (heading) {
        heading.addEventListener("mouseover", () => heading.style.color = "gold");
        heading.addEventListener("mouseout",  () => heading.style.color = "white");
    }

    const navToggle = document.getElementById("navToggle");
    const sideNav   = document.getElementById("sideNav");
    if (navToggle && sideNav) {
        navToggle.addEventListener("click", event => {
            sideNav.classList.toggle("active");
            document.body.classList.toggle("nav-open");
            event.stopPropagation();
            adjustChatbotPosition();
        });
    }

    document.addEventListener("click", event => {
        if (
            document.body.classList.contains("nav-open") &&
            sideNav &&
            navToggle &&
            !sideNav.contains(event.target) &&
            !navToggle.contains(event.target)
        ) {
            sideNav.classList.remove("active");
            document.body.classList.remove("nav-open");
            adjustChatbotPosition();
        }
    });

    let touchStartX = 0;
    let touchEndX   = 0;
    document.addEventListener("touchstart", event => {
        touchStartX = event.touches[0].clientX;
    });
    document.addEventListener("touchend", event => {
        touchEndX = event.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50 && sideNav) {
            sideNav.classList.remove("active");
            document.body.classList.remove("nav-open");
            adjustChatbotPosition();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".product-container");
    const prevBtn          = document.querySelector(".prev-btn");
    const nextBtn          = document.querySelector(".next-btn");
    const productCard      = document.querySelector(".product");

    if (productContainer && prevBtn && nextBtn && productCard) {
        const productWidth = productCard.offsetWidth + 20;
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
        prevBtn.addEventListener("mouseup",   stopScrolling);
        nextBtn.addEventListener("mouseup",   stopScrolling);
        prevBtn.addEventListener("mouseleave", stopScrolling);
        nextBtn.addEventListener("mouseleave", stopScrolling);

        prevBtn.addEventListener("click", () => {
            productContainer.scrollLeft -= productWidth;
        });
        nextBtn.addEventListener("click", () => {
            productContainer.scrollLeft += productWidth;
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.querySelector(".profile-btn");
    const loginPrompt = document.getElementById("login-prompt");
    const closeBtn    = document.querySelector(".close-btn");
    const loginBtn    = document.getElementById("login-btn");
    const signupBtn   = document.getElementById("signup-btn");
    const forgotBtn   = document.getElementById("forgot-btn");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.rememberMe) {
        document.getElementById("username").value   = storedUser.username;
        document.getElementById("email").value      = storedUser.email;
        document.getElementById("rememberMe").checked = true;
    }

    if (profileBtn && loginPrompt) {
        profileBtn.addEventListener("click", () => {
            loginPrompt.style.display = "block";
        });
    }
    if (closeBtn && loginPrompt) {
        closeBtn.addEventListener("click", () => {
            loginPrompt.style.display = "none";
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username   = document.getElementById("username").value;
            const email      = document.getElementById("email").value;
            const password   = document.getElementById("password").value;
            const rememberMe = document.getElementById("rememberMe").checked;

            if (!email || !password) {
                alert("Email and password are required!");
                return;
            }

            console.log(
                `Login Attempt: Username: ${username}, Email: ${email}, Password: ${password}, Remember Me: ${rememberMe}`
            );
            alert("Login successful! (Simulated)");
            loginPrompt.style.display = "none";

            if (rememberMe) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({ username, email, rememberMe })
                );
            } else {
                localStorage.removeItem("user");
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            window.location.href = "signup.html";
        });
    }
    if (forgotBtn) {
        forgotBtn.addEventListener("click", () => {
            alert("Redirecting to Forgot Password...");
            window.location.href = "forgot-password.html";
        });
    }

    window.addEventListener("click", event => {
        if (event.target === loginPrompt) {
            loginPrompt.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const chatbotBtn    = document.getElementById("chatbot-btn");
    const chatbotBox    = document.getElementById("chatbot-box");
    const closeChatbot  = document.getElementById("close-chatbot");
    const sendBtn       = document.getElementById("send-btn");
    const chatbotInput  = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (chatbotBtn && chatbotBox) {
        chatbotBtn.addEventListener("click", () => {
            chatbotBox.style.display = "block";
        });
    }
    if (closeChatbot && chatbotBox) {
        closeChatbot.addEventListener("click", () => {
            chatbotBox.style.display = "none";
        });
    }
    if (sendBtn && chatbotInput) {
        sendBtn.addEventListener("click", sendMessage);
        chatbotInput.addEventListener("keypress", event => {
            if (event.key === "Enter") sendMessage();
        });
    }

    function sendMessage() {
        const userText = chatbotInput.value.trim();
        if (!userText) return;
        addMessage(userText, "user");
        chatbotInput.value = "";
        setTimeout(() => {
            addMessage(getBotResponse(userText), "bot");
        }, 500);
    }
    function addMessage(text, sender) {
        const div = document.createElement("div");
        div.classList.add(sender === "user" ? "user-message" : "bot-message");
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    function getBotResponse(input) {
        const msg = input.toLowerCase();
        if (msg.includes("hello")) return "Hi there! How can I help you?";
        if (msg.includes("help"))  return "Sure! What do you need help with?";
        if (msg.includes("price")) return "Our prices vary. Can you specify which product/service?";
        return "I'm not sure how to respond to that. Can you rephrase?";
    }
    function adjustChatbotPosition() {
        const btn = document.getElementById("chatbot-btn");
        const box = document.getElementById("chatbot-box");
        const nav = document.getElementById("sideNav");
        if (!btn || !box || !nav) return;
        if (nav.classList.contains("active")) {
            btn.style.left = "260px";
            box.style.left = "260px";
        } else {
            btn.style.left = "20px";
            box.style.left = "20px";
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    const viewCartBtn  = document.getElementById("view-cart-btn");
    const cartDropdown = document.getElementById("cart-dropdown");
    const container    = document.getElementById("all-products");
    const searchInput  = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const dropdown     = document.getElementById("filter-dropdown");

    // Products array
    const products = [
        // male perfumes
        { id: "0001", name: "Fahrenheit", gender: "male", type: "eau-de-parfum", price: 1500, description: "A warm and spicy fragrance with notes of leather, mandarin, and nutmeg.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M01", stock: 10 },
        { id: "0002", name: "Noir", gender: "male", type: "eau-de-parfum", price: 1300, description: "A dark and mysterious scent with hints of bergamot, vanilla, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M02", stock: 10 },
        { id: "0003", name: "Red", gender: "male", type: "body-mist", price: 290,  description: "A fresh and invigorating fragrance with a zesty citrus opening.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M03", stock: 10 },
        { id: "0004", name: "Legend", gender: "male", type: "eau-de-parfum", price: 1400, description: "A woody fragrance with notes of lavender, oak, and apple.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M04", stock: 10 },
        { id: "0005", name: "Bvlgari Extreme", gender: "male", type: "eau-de-parfum", price: 1600, description: "A sophisticated scent with a mix of citrus, spices, and wood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M05", stock: 10 },
        { id: "0006", name: "CK One", gender: "male", type: "body-mist",  price: 280,  description: "A refreshing, unisex fragrance with notes of green tea, papaya, and bergamot.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M06", stock: 10 },
        { id: "0007", name: "Coolwater", gender: "male", type: "eau-de-parfum", price: 1300, description: "A clean and aquatic scent with refreshing notes of mint, lavender, and sandalwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M07", stock: 10 },
        { id: "0008", name: "Eternity Aqua", gender: "male", type: "eau-de-parfum", price: 1500, description: "A fresh and aquatic fragrance with notes of cucumber, citrus, and sandalwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M08", stock: 10 },
        { id: "0009", name: "Acqua di Gio", gender: "male", type: "eau-de-parfum", price: 1700, description: "A classic aquatic fragrance with notes of jasmine, rosemary, and citrus.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M09", stock: 10 },
        { id: "0010", name: "Aventus", gender: "male", type: "eau-de-parfum", price: 1850, description: "A bold fragrance with a blend of pineapple, birch, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M10", stock: 10 },
        { id: "0011", name: "Benetton", gender: "male", type: "body-mist", price: 300,  description: "A simple and fresh scent with citrus notes and light florals.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M11", stock: 10 },
        { id: "0012", name: "Bvlgari Aqua Amara", gender: "male", type: "eau-de-parfum", price: 1550, description: "A fresh and citrusy fragrance with hints of mandarin, neroli, and patchouli.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "M12", stock: 10 },
        // female perfumes
        { id: "0013", name: "Vanilla Lace", gender: "female", type: "body-mist", price: 250,  description: "A sweet, floral fragrance with rich vanilla notes.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F01", stock: 10 },
        { id: "0014", name: "Weekend", gender: "female", type: "eau-de-parfum", price: 1200, description: "A fresh and light fragrance with a blend of citrus, florals, and musk.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F02", stock: 10 },
        { id: "0015", name: "Eclat d'Arpege", gender: "female", type: "eau-de-parfum", price: 1450, description: "A floral fragrance with notes of peach, lilac, and green tea.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F03", stock: 10 },
        { id: "0016", name: "Incanto Shine", gender: "female", type: "body-mist", price: 300,  description: "A fruity and floral fragrance with notes of passionfruit, jasmine, and orange.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F04", stock: 10 },
        { id: "0017", name: "Fantasy", gender: "female", type: "body-mist", price: 275,  description: "A sweet and fruity fragrance with notes of kiwi, cupcake, and jasmine.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F05", stock: 10 },
        { id: "0018", name: "Green Tea", gender: "female", type: "body-mist", price: 290,  description: "A refreshing and clean fragrance with green tea, lemon, and mint.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F06", stock: 10 },
        { id: "0019", name: "Omnia Amethyste", gender: "female", type: "eau-de-parfum", price: 1600, description: "A delicate floral fragrance with notes of iris, rose, and pomegranate.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F07", stock: 10 },
        { id: "0020", name: "Light Blue", gender: "female", type: "eau-de-parfum", price: 1400, description: "A vibrant and refreshing fragrance with notes of Sicilian lemon, apple, and cedarwood.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F08", stock: 10 },
        { id: "0021", name: "Bombshell", gender: "female", type: "body-mist", price: 350,  description: "A floral and fruity fragrance with notes of purple passionfruit, Shangri-la peony, and vanilla orchid.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F09", stock: 10 },
        { id: "0022", name: "Bright Crystal", gender: "female", type: "eau-de-parfum", price: 1550, description: "A fresh, floral fragrance with peony, pomegranate, and lotus.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F10", stock: 10 },
        { id: "0023", name: "Chance", gender: "female", type: "eau-de-parfum", price: 1650, description: "A sophisticated fragrance with notes of jasmine, rose, and patchouli.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F11", stock: 10 },
        { id: "0024", name: "Cucumber Melon", gender: "female", type: "body-mist", price: 270,  description: "A refreshing and light fragrance with cucumber and melon notes.", imageUrl: "https://i.imgur.com/FTRWYTr.png", sku: "F12", stock: 10 }
    ];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

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

        container.querySelectorAll(".quick-add").forEach(button => {
            button.addEventListener("click", () => {
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

    function updateCartCount() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalCount;

        if (cartItemsList && cartTotal) {
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
    }

    function applyFilters() {
        let filtered = [...products];
        const q = searchInput.value.toLowerCase();
        const v = dropdown.value;

        if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
        if (v === "gender-male")      filtered = filtered.filter(p => p.gender === "male");
        else if (v === "gender-female") filtered = filtered.filter(p => p.gender === "female");
        else if (v === "type-body-mist") filtered = filtered.filter(p => p.type === "body-mist");
        else if (v === "type-eau-de-parfum") filtered = filtered.filter(p => p.type === "eau-de-parfum");
        else if (v === "sort-price-low")  filtered.sort((a,b) => a.price - b.price);
        else if (v === "sort-price-high") filtered.sort((a,b) => b.price - a.price);

        renderProducts(filtered);
    }

    renderProducts(shuffle(products));
    updateCartCount();

    if (searchInput)  searchInput.addEventListener("input", applyFilters);
    if (searchButton) searchButton.addEventListener("click", applyFilters);
    if (dropdown)     dropdown.addEventListener("change", applyFilters);

    if (cartItemsList) {
        cartItemsList.addEventListener("click", e => {
            const id = e.target.dataset.id;
            if (!id) return;
            const item = cart.find(i => i.id === id);
            const prod = products.find(p => p.id === id);

            if (e.target.classList.contains("qty-decrease")) {
                if (item.quantity > 1) item.quantity--;
                else cart = cart.filter(i => i.id !== id);
            } else if (e.target.classList.contains("qty-increase")) {
                if (item.quantity < prod.stock) item.quantity++;
                else alert("Out of stock!");
            } else return;

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    }

    const viewLink = document.querySelector(".cart-view-link");
    if (viewLink) {
        viewLink.addEventListener("click", e => {
            e.preventDefault();
            showCartPage();
        });
    }

function showCartPage() {
    const cartPageSection = document.getElementById("cart-page");
    const productSection  = document.querySelector(".product-section");
    if (cartDropdown) cartDropdown.classList.add("hidden");
    if (productSection) productSection.classList.add("hidden");

    if (!cartPageSection) return;
    cartPageSection.innerHTML = "";
    cartPageSection.style.display = "block";
    cartPageSection.classList.remove("hidden");

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
      <button id="close-cart-btn">Back to Shop</button>
    `;
    cartPageSection.innerHTML = html;

    const closeBtn = document.getElementById("close-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            cartPageSection.style.display = "none";
            if (productSection) productSection.classList.remove("hidden");
        });
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            cartPageSection.style.display = "none";
            if (productSection) productSection.classList.remove("hidden");
        });
    }
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let shipping = 200;
    let grandTotal = total + shipping;
    let trackingNo = 'TRK-' + Math.floor(100000 + Math.random() * 900000);

    document.getElementById('checkout-order-total').textContent = total.toFixed(2);
    document.getElementById('checkout-shipping').textContent = shipping.toFixed(2);
    document.getElementById('checkout-grand-total').textContent = grandTotal.toFixed(2);
    document.getElementById('checkout-tracking-no').textContent = trackingNo;

    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('hidden');
});

document.getElementById('close-checkout-btn').addEventListener('click', () => {
    document.getElementById('checkout-modal').classList.add('hidden');
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    document.getElementById('checkout-modal').classList.add('hidden');
    updateCartCount();
});

});
