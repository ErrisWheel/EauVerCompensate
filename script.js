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
            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const rememberMe = document.getElementById("rememberMe").checked;

            if (!email || !password || !username) {
                alert("All fields are required!");
                return;
            }

            // Admin check n redirect
            if (
                username.toLowerCase() === "admin" &&
                email === "Admin" &&
                password === "Admin"
            ) {
                alert("Welcome, Admin!");
                window.location.href = "https://erriswheel.github.io/EauVerCompensate/admin";
                return;
            }

            // Simulated user login
            alert("Login successful! (User Mode)");
            loginPrompt.style.display = "none";

            // Save login to localStorage
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

    window.addEventListener("click", (event) => {
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
        { id: "0001", name: "Apex", gender: "male", type: "eau-de-parfum", price: 4499.99, description: "Apex energizes with sharp citrus and bold aromatic woods.", imageUrl: "Images/Men/Apex.png", sku: "M01", stock: 100 },
        { id: "0002", name: "Ascent", gender: "male", type: "eau-de-parfum", price: 3999.99, description: "Ascent uplifts with crisp bergamot and refined oakmoss.", imageUrl: "Images/Men/Ascent.png", sku: "M02", stock: 100 },
        { id: "0003", name: "Dominion", gender: "male", type: "eau-de-parfum", price: 6499.99, description: "Dominion commands attention with smoky vetiver and amber.", imageUrl: "Images/Men/Dominion.png", sku: "M03", stock: 100 },
        { id: "0004", name: "Emberline", gender: "male", type: "eau-de-parfum", price: 5499.99, description: "Emberline glows with warm spices and toasted cedarwood.", imageUrl: "Images/Men/Emberline.png", sku: "M04", stock: 100 },
        { id: "0005", name: "Forge", gender: "male", type: "eau-de-parfum", price: 3499.99, description: "Forge blends metallic accords with deep resins and musk.", imageUrl: "Images/Men/Forge.png", sku: "M05", stock: 100 },
        { id: "0006", name: "Halo Steel", gender: "male", type: "eau-de-parfum", price: 5999.99, description: "Halo Steel shines with icy mint and cool lavender tones.", imageUrl: "Images/Men/Halo Steel.png", sku: "M06", stock: 100 },
        { id: "0007", name: "Iron Drift", gender: "male", type: "eau-de-parfum", price: 2999.99, description: "Iron Drift flows with smoky incense and rugged patchouli.", imageUrl: "Images/Men/Iron Drift.png", sku: "M07", stock: 100 },
        { id: "0008", name: "Lucent Ash", gender: "male", type: "eau-de-parfum", price: 4749.99, description: "Lucent Ash smolders with charred woods and vetiver spice.", imageUrl: "Images/Men/Lucent Ash.png", sku: "M08", stock: 100 },
        { id: "0009", name: "Monsoon", gender: "male", type: "eau-de-parfum", price: 2499.99, description: "Monsoon refreshes with aquatic notes and herbal zest.", imageUrl: "Images/Men/Monsoon.png", sku: "M09", stock: 100 },
        { id: "0010", name: "Noir Brave", gender: "male", type: "eau-de-parfum", price: 7499.99, description: "Noir Brave captivates with dark leather and smoky amber.", imageUrl: "Images/Men/Noir Brave.png", sku: "M10", stock: 100 },
        { id: "0011", name: "Pulse", gender: "male", type: "eau-de-parfum", price: 5499.99, description: "Pulse races with zesty ginger and dynamic black pepper notes.", imageUrl: "Images/Men/Pulse.png", sku: "M11", stock: 100 },
        { id: "0012", name: "Quarry", gender: "male", type: "eau-de-parfum", price: 2999.99, description: "Quarry grounds with mineral accords and smooth suede.", imageUrl: "Images/Men/Quarry.png", sku: "M12", stock: 100 },
        { id: "0013", name: "Shade", gender: "male", type: "eau-de-parfum", price: 4249.99, description: "Shade veils with dark plum, patchouli, and smoky vanilla.", imageUrl: "Images/Men/Shade.png", sku: "M13", stock: 100 },
        { id: "0014", name: "Vantage", gender: "male", type: "eau-de-parfum", price: 3699.99, description: "Vantage ascends with crisp apple and refined ambergris.", imageUrl: "Images/Men/Vantage.png", sku: "M14", stock: 100 },
        { id: "0015", name: "Volt", gender: "male", type: "eau-de-parfum", price: 4999.99, description: "Volt sparks with electrifying citrus and spicy cardamom.", imageUrl: "Images/Men/Volt.png", sku: "M15", stock: 100 },
        // female perfumes
        { id: "0016", name: "Aube de Lune", gender: "female", type: "eau-de-parfum", price: 3999.99, description: "Aube de Lune glows with soft iris and warm vanilla musk.", imageUrl: "Images/Women/Aube de Lune.png", sku: "F16", stock: 100 },
        { id: "0017", name: "Bloom Drift", gender: "female", type: "eau-de-parfum", price: 2999.99, description: "Bloom Drift dances with peony petals and bright citrus zest.", imageUrl: "Images/Women/Bloom Drift.png", sku: "F17", stock: 100 },
        { id: "0018", name: "Coral Muse", gender: "female", type: "eau-de-parfum", price: 4249.99, description: "Coral Muse inspires with juicy nectarine and amber rose.", imageUrl: "Images/Women/Coral Muse.png", sku: "F18", stock: 100 },
        { id: "0019", name: "Crimson Veil", gender: "female", type: "eau-de-parfum", price: 7499.99, description: "Crimson Veil envelops with red berries, oud, and dark florals.", imageUrl: "Images/Women/Crimson Veil.png", sku: "F19", stock: 100 },
        { id: "0020", name: "Dahlia Smoke", gender: "female", type: "eau-de-parfum", price: 4999.99, description: "Dahlia Smoke blends smoky florals and creamy sandalwood.", imageUrl: "Images/Women/Dahlia Smoke.png", sku: "F20", stock: 100 },
        { id: "0021", name: "Elan Frost", gender: "female", type: "eau-de-parfum", price: 3499.99, description: "Elan Frost shimmers with cool violet and icy white tea.", imageUrl: "Images/Women/Elan Frost.png", sku: "F21", stock: 100 },
        { id: "0022", name: "Fleur Mirage", gender: "female", type: "eau-de-parfum", price: 5499.99, description: "Fleur Mirage intrigues with jasmine, saffron, and amber woods.", imageUrl: "Images/Women/Fleur Mirage.png", sku: "F22", stock: 100 },
        { id: "0023", name: "Haze de Thé", gender: "female", type: "eau-de-parfum", price: 4749.99, description: "Haze de Thé softens with green tea, bergamot, and white musk.", imageUrl: "Images/Women/Haze de Thé.png", sku: "F23", stock: 100 },
        { id: "0024", name: "Ivory Dust", gender: "female", type: "eau-de-parfum", price: 5999.99, description: "Ivory Dust glistens with white florals and powdered vanilla.", imageUrl: "Images/Women/Ivory Dust.png", sku: "F24", stock: 100 },
        { id: "0025", name: "Lueur Saffron", gender: "female", type: "eau-de-parfum", price: 6499.99, description: "Lueur Saffron radiates with saffron threads and honeyed rose.", imageUrl: "Images/Women/Lueur Saffron.png", sku: "F25", stock: 100 },
        { id: "0026", name: "Rose Noiré", gender: "female", type: "eau-de-parfum", price: 4499.99, description: "Rose Noiré enchants with black rose and smoky incense woods.", imageUrl: "Images/Women/Rose Noiré.png", sku: "F26", stock: 100 },
        { id: "0027", name: "Silver Lark", gender: "female", type: "eau-de-parfum", price: 3999.99, description: "Silver Lark sparkles with crisp pear and white jasmine bloom.", imageUrl: "Images/Women/Silver Lark.png", sku: "F27", stock: 100 },
        { id: "0028", name: "Soleil Vellum", gender: "female", type: "eau-de-parfum", price: 3499.99, description: "Soleil Vellum warms with creamy coconut and golden amber.", imageUrl: "Images/Women/Soleil Vellum.png", sku: "F28", stock: 100 },
        { id: "0029", name: "Tendre Flame", gender: "female", type: "eau-de-parfum", price: 3249.99, description: "Tendre Flame caresses with soft woods and delicate iris.", imageUrl: "Images/Women/Tendre Flame.png", sku: "F29", stock: 100 },
        { id: "0030", name: "Velvet Echo", gender: "female", type: "eau-de-parfum", price: 4999.99, description: "Velvet Echo lingers with velvety musk and warm plum accord.", imageUrl: "Images/Women/Velvet Echo.png", sku: "F30", stock: 100 },
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
    
        const closeBtn    = document.getElementById("close-cart-btn");
        const checkoutBtn = document.getElementById("checkout-btn");
    
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                cartPageSection.style.display = "none";
                if (productSection) productSection.classList.remove("hidden");
            });
        }
    
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => {
                const data      = JSON.parse(localStorage.getItem('cart')) || [];
                const total     = data.reduce((sum,i) => sum + i.price*i.quantity, 0);
                const shipping  = 200;
                const grand     = total + shipping;
                const trackNo   = 'TRK-' + Math.floor(100000 + Math.random()*900000);
    
                document.getElementById('checkout-order-total').textContent   = total.toFixed(2);
                document.getElementById('checkout-shipping').textContent     = shipping.toFixed(2);
                document.getElementById('checkout-grand-total').textContent  = grand.toFixed(2);
                document.getElementById('checkout-tracking-no').textContent  = trackNo;
    
                document.getElementById('checkout-modal').classList.add('show');
            });
        }
    
        const closeModalBtn = document.getElementById("close-checkout-btn");
        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", () => {
                document.getElementById('checkout-modal').classList.remove('show');
            });
        }
    
        const checkoutForm = document.getElementById("checkout-form");
        if (checkoutForm) {
            checkoutForm.addEventListener("submit", e => {
                e.preventDefault();
                alert("Order placed successfully!");
                localStorage.removeItem("cart");
                updateCartCount();
                document.getElementById('checkout-modal').classList.remove('show');
            });
        }
    }
});
