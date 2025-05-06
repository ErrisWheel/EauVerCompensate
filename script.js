const getProductsFromStorage = () => {
    const STORAGE_KEY = 'perfumeProducts';
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

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
                window.location.href = "https://erriswheel.github.io/EauVerCompensate/adminproduct";
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
    const products = getProductsFromStorage();

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
