document.addEventListener("DOMContentLoaded", () => {
    console.log("Eau Ver Compensate is ready!");

    // HEADER HOVER EFFECT
    const heading = document.querySelector("h1");
    heading.addEventListener("mouseover", () => heading.style.color = "gold");
    heading.addEventListener("mouseout", () => heading.style.color = "white");

    // SIDE NAVIGATION
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

    // SWIPE DETECTION FOR MOBILE NAV
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

/** PRODUCT SLIDER **/
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

// PROFILE BUTTONS
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

/** CHATBOT LOGICS **/
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

// perfume producs
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // male perfumes
        { id: "0001", name: "Fahrenheit", gender: "male", type: "eau-de-parfum", price: 1500, description: "A warm and spicy fragrance with notes of leather, mandarin, and nutmeg.", imageUrl: "https://i.imgur.com/8XXOVbI.png" },
        { id: "0002", name: "Noir", gender: "male", type: "eau-de-parfum", price: 1300, description: "A dark and mysterious scent with hints of bergamot, vanilla, and musk.", imageUrl: "https://i.imgur.com/i8KsgD8.png" },
        { id: "0003", name: "Red", gender: "male", type: "body-mist", price: 290, description: "A fresh and invigorating fragrance with a zesty citrus opening.", imageUrl: "https://i.imgur.com/RlmSA4q.png" },
        { id: "0004", name: "Legend", gender: "male", type: "eau-de-parfum", price: 1400, description: "A woody fragrance with notes of lavender, oak, and apple.", imageUrl: "https://i.imgur.com/klTCBtE.png" },
        { id: "0005", name: "Bvlgari Extreme", gender: "male", type: "eau-de-parfum", price: 1600, description: "A sophisticated scent with a mix of citrus, spices, and wood.", imageUrl: "https://i.imgur.com/FAWxnn2.png" },
        { id: "0006", name: "CK One", gender: "male", type: "body-mist", price: 280, description: "A refreshing, unisex fragrance with notes of green tea, papaya, and bergamot.", imageUrl: "https://i.imgur.com/dprLibM.png" },
        { id: "0007", name: "Coolwater", gender: "male", type: "eau-de-parfum", price: 1300, description: "A clean and aquatic scent with refreshing notes of mint, lavender, and sandalwood.", imageUrl: "https://i.imgur.com/nGE9kX6.png" },
        { id: "0008", name: "Eternity Aqua", gender: "male", type: "eau-de-parfum", price: 1500, description: "A fresh and aquatic fragrance with notes of cucumber, citrus, and sandalwood.", imageUrl: "https://i.imgur.com/hzGskMV.png" },
        { id: "0009", name: "Acqua di Gio", gender: "male", type: "eau-de-parfum", price: 1700, description: "A classic aquatic fragrance with notes of jasmine, rosemary, and citrus.", imageUrl: "https://i.imgur.com/3GoOKik.png" },
        { id: "0010", name: "Aventus", gender: "male", type: "eau-de-parfum", price: 1850, description: "A bold fragrance with a blend of pineapple, birch, and musk.", imageUrl: "https://i.imgur.com/xxhvedv.png" },
        { id: "0011", name: "Benetton", gender: "male", type: "body-mist", price: 300, description: "A simple and fresh scent with citrus notes and light florals.", imageUrl: "https://i.imgur.com/lJWyvGd.png" },
        { id: "0012", name: "Bvlgari Aqua Amara", gender: "male", type: "eau-de-parfum", price: 1550, description: "A fresh and citrusy fragrance with hints of mandarin, neroli, and patchouli.", imageUrl: "https://i.imgur.com/QF3fi0m.png" },

        // female perfumes
        { id: "0013", name: "Vanilla Lace", gender: "female", type: "body-mist", price: 250, description: "A sweet, floral fragrance with rich vanilla notes.", imageUrl: "https://i.imgur.com/1Xi6uYC.png" },
        { id: "0014", name: "Weekend", gender: "female", type: "eau-de-parfum", price: 1200, description: "A fresh and light fragrance with a blend of citrus, florals, and musk.", imageUrl: "https://i.imgur.com/nLtDzaJ.png" },
        { id: "0015", name: "Eclat d'Arpege", gender: "female", type: "eau-de-parfum", price: 1450, description: "A floral fragrance with notes of peach, lilac, and green tea.", imageUrl: "https://i.imgur.com/UGqNkcW.png" },
        { id: "0016", name: "Incanto Shine", gender: "female", type: "body-mist", price: 300, description: "A fruity and floral fragrance with notes of passionfruit, jasmine, and orange.", imageUrl: "https://i.imgur.com/J3UWAfD.png" },
        { id: "0017", name: "Fantasy", gender: "female", type: "body-mist", price: 275, description: "A sweet and fruity fragrance with notes of kiwi, cupcake, and jasmine.", imageUrl: "https://i.imgur.com/yO8378U.png" },
        { id: "0018", name: "Green Tea", gender: "female", type: "body-mist", price: 290, description: "A refreshing and clean fragrance with green tea, lemon, and mint.", imageUrl: "https://i.imgur.com/NMWgPfF.png" },
        { id: "0019", name: "Omnia Amethyste", gender: "female", type: "eau-de-parfum", price: 1600, description: "A delicate floral fragrance with notes of iris, rose, and pomegranate.", imageUrl: "https://i.imgur.com/vNyEnpU.png" },
        { id: "0020", name: "Light Blue", gender: "female", type: "eau-de-parfum", price: 1400, description: "A vibrant and refreshing fragrance with notes of Sicilian lemon, apple, and cedarwood.", imageUrl: "https://i.imgur.com/nC1jYpn.png" },
        { id: "0021", name: "Bombshell", gender: "female", type: "body-mist", price: 350, description: "A floral and fruity fragrance with notes of purple passionfruit, Shangri-la peony, and vanilla orchid.", imageUrl: "https://i.imgur.com/Ps0Mme1.png" },
        { id: "0022", name: "Bright Crystal", gender: "female", type: "eau-de-parfum", price: 1550, description: "A fresh, floral fragrance with peony, pomegranate, and lotus.", imageUrl: "https://i.imgur.com/I5ZArRs.png" },
        { id: "0023", name: "Chance", gender: "female", type: "eau-de-parfum", price: 1650, description: "A sophisticated fragrance with notes of jasmine, rose, and patchouli.", imageUrl: "https://i.imgur.com/UjUVyEm.png" },
        { id: "0024", name: "Cucumber Melon", gender: "female", type: "body-mist", price: 270, description: "A refreshing and light fragrance with cucumber and melon notes.", imageUrl: "https://i.imgur.com/QlChxuU.png" }
    ];

    const container = document.getElementById("all-products");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const dropdown = document.getElementById("filter-dropdown");

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
                <a href="https://erriswheel.github.io/Product-Page/?id=${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <p>${product.name}</p>
                    <span>₱${product.price}</span>
                </a>
                <button class="quick-add" data-id="${product.id}" title="Add to Cart">🛒</button>
            `;
            container.appendChild(card);
        });
    }

    function applyFilters() {
        const searchQuery = searchInput.value.toLowerCase();
        const filterValue = dropdown.value;

        let filtered = [...products];

        // search by name
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery)
            );
        }

        // filter by gender
        if (filterValue === "gender-male") {
            filtered = filtered.filter(product => product.gender === "male");
        } else if (filterValue === "gender-female") {
            filtered = filtered.filter(product => product.gender === "female");
        }

        // filter by type
        if (filterValue === "type-body-mist") {
            filtered = filtered.filter(product => product.type === "body-mist");
        } else if (filterValue === "type-eau-de-parfum") {
            filtered = filtered.filter(product => product.type === "eau-de-parfum");
        }

        // sort by price
        if (filterValue === "sort-price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (filterValue === "sort-price-high") {
            filtered.sort((a, b) => b.price - a.price);
        }

        renderProducts(filtered);
    }

    renderProducts(shuffle(products));

    searchInput.addEventListener('input', applyFilters);
    searchButton.addEventListener('click', applyFilters);
    dropdown.addEventListener('change', applyFilters);

});



// LOG IN SIGN UP PLACEHOLDER SIM
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = true;

    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartDropdown = document.getElementById("cart-dropdown");
    const viewCartBtn = document.getElementById("view-cart-btn");

    viewCartBtn.addEventListener("click", () => {
        cartDropdown.classList.toggle("hidden");
    });

    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!isLoggedIn) {
                alert("Please log in to add items to your cart.");
                return;
            }

            const card = btn.closest(".perfume-card");
            const name = card.querySelector("h3").textContent;
            const price = parseFloat(card.querySelector("p").textContent.replace("$", ""));

            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCartUI();
        });
    });

    function updateCartUI() {
        let totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalCount;

        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("quick-add")) {
        e.preventDefault();
        const productId = e.target.dataset.id;
        const product = products.find(p => p.id === productId);
        if (product) {
            addToCart(product);
        }
    }
});
