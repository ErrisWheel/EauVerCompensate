document.addEventListener("DOMContentLoaded", () => {
    console.log("Eau Ver Compensate is ready!");

    /** HEADER HOVER EFFECT **/
    const heading = document.querySelector("h1");
    heading.addEventListener("mouseover", () => heading.style.color = "gold");
    heading.addEventListener("mouseout", () => heading.style.color = "white");

    /** SIDE NAVIGATION **/
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

    /** SWIPE DETECTION FOR MOBILE NAV **/
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
        // female perfumes
        { name: "Vanilla Lace", gender: "female", type: "body-mist", price: 250 },
        { name: "Weekend", gender: "female", type: "eau-de-parfum", price: 1200 },
        { name: "Eclat d'Arpege", gender: "female", type: "eau-de-parfum", price: 1450 },
        { name: "Incanto Shine", gender: "female", type: "body-mist", price: 300 },
        { name: "Fantasy", gender: "female", type: "body-mist", price: 275 },
        { name: "Green Tea", gender: "female", type: "body-mist", price: 290 },
        { name: "Omnia Amethyste", gender: "female", type: "eau-de-parfum", price: 1600 },
        { name: "Light Blue", gender: "female", type: "eau-de-parfum", price: 1400 },
        { name: "Bombshell", gender: "female", type: "body-mist", price: 350 },
        { name: "Bright Crystal", gender: "female", type: "eau-de-parfum", price: 1550 },
        { name: "Chance", gender: "female", type: "eau-de-parfum", price: 1650 },
        { name: "Cucumber Melon", gender: "female", type: "body-mist", price: 270 },

        // male perfumes
        { name: "Fahrenheit", gender: "male", type: "eau-de-parfum", price: 1500 },
        { name: "Noir", gender: "male", type: "eau-de-parfum", price: 1300 },
        { name: "Red", gender: "male", type: "body-mist", price: 290 },
        { name: "Legend", gender: "male", type: "eau-de-parfum", price: 1400 },
        { name: "Bvlgari Extreme", gender: "male", type: "eau-de-parfum", price: 1600 },
        { name: "CK One", gender: "male", type: "body-mist", price: 280 },
        { name: "Coolwater", gender: "male", type: "eau-de-parfum", price: 1300 },
        { name: "Eternity Aqua", gender: "male", type: "eau-de-parfum", price: 1500 },
        { name: "Acqua di Gio", gender: "male", type: "eau-de-parfum", price: 1700 },
        { name: "Aventus", gender: "male", type: "eau-de-parfum", price: 1850 },
        { name: "Benetton", gender: "male", type: "body-mist", price: 300 },
        { name: "Bvlgari Aqua Amara", gender: "male", type: "eau-de-parfum", price: 1550 }
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
                <img src="https://i.imgur.com/FTRWYTr.png" alt="${product.name}">
                <p>${product.name}</p>
                <span>₱${product.price}</span>
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
