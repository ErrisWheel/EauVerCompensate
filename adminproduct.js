// Products array - initialized from localStorage or defaults
let products = [];

// Default products to use if localStorage is empty
const defaultProducts = [
    // male perfumes
    { id: "0001", name: "Apex", gender: "male", type: "eau-de-parfum", price: 4499.99, description: "Apex energizes with sharp citrus and bold aromatic woods.", imageUrl: "Images/Men/Apex.png", sku: "M01", stock: 100, amountSold: 0 },
    { id: "0002", name: "Ascent", gender: "male", type: "eau-de-parfum", price: 3999.99, description: "Ascent uplifts with crisp bergamot and refined oakmoss.", imageUrl: "Images/Men/Ascent.png", sku: "M02", stock: 100, amountSold: 0 },
    { id: "0003", name: "Dominion", gender: "male", type: "eau-de-parfum", price: 6499.99, description: "Dominion commands attention with smoky vetiver and amber.", imageUrl: "Images/Men/Dominion.png", sku: "M03", stock: 100, amountSold: 0 },
    { id: "0004", name: "Emberline", gender: "male", type: "eau-de-parfum", price: 5499.99, description: "Emberline glows with warm spices and toasted cedarwood.", imageUrl: "Images/Men/Emberline.png", sku: "M04", stock: 100, amountSold: 0 },
    { id: "0005", name: "Forge", gender: "male", type: "eau-de-parfum", price: 3499.99, description: "Forge blends metallic accords with deep resins and musk.", imageUrl: "Images/Men/Forge.png", sku: "M05", stock: 100, amountSold: 0 },
    { id: "0006", name: "Halo Steel", gender: "male", type: "eau-de-parfum", price: 5999.99, description: "Halo Steel shines with icy mint and cool lavender tones.", imageUrl: "Images/Men/Halo Steel.png", sku: "M06", stock: 100, amountSold: 0 },
    { id: "0007", name: "Iron Drift", gender: "male", type: "eau-de-parfum", price: 2999.99, description: "Iron Drift flows with smoky incense and rugged patchouli.", imageUrl: "Images/Men/Iron Drift.png", sku: "M07", stock: 100, amountSold: 0 },
    { id: "0008", name: "Lucent Ash", gender: "male", type: "eau-de-parfum", price: 4749.99, description: "Lucent Ash smolders with charred woods and vetiver spice.", imageUrl: "Images/Men/Lucent Ash.png", sku: "M08", stock: 100, amountSold: 0 },
    { id: "0009", name: "Monsoon", gender: "male", type: "eau-de-parfum", price: 2499.99, description: "Monsoon refreshes with aquatic notes and herbal zest.", imageUrl: "Images/Men/Monsoon.png", sku: "M09", stock: 100, amountSold: 0 },
    { id: "0010", name: "Noir Brave", gender: "male", type: "eau-de-parfum", price: 7499.99, description: "Noir Brave captivates with dark leather and smoky amber.", imageUrl: "Images/Men/Noir Brave.png", sku: "M10", stock: 100, amountSold: 0 },
    { id: "0011", name: "Pulse", gender: "male", type: "eau-de-parfum", price: 5499.99, description: "Pulse races with zesty ginger and dynamic black pepper notes.", imageUrl: "Images/Men/Pulse.png", sku: "M11", stock: 100, amountSold: 0 },
    { id: "0012", name: "Quarry", gender: "male", type: "eau-de-parfum", price: 2999.99, description: "Quarry grounds with mineral accords and smooth suede.", imageUrl: "Images/Men/Quarry.png", sku: "M12", stock: 100, amountSold: 0 },
    { id: "0013", name: "Shade", gender: "male", type: "eau-de-parfum", price: 4249.99, description: "Shade veils with dark plum, patchouli, and smoky vanilla.", imageUrl: "Images/Men/Shade.png", sku: "M13", stock: 100, amountSold: 0 },
    { id: "0014", name: "Vantage", gender: "male", type: "eau-de-parfum", price: 3699.99, description: "Vantage ascends with crisp apple and refined ambergris.", imageUrl: "Images/Men/Vantage.png", sku: "M14", stock: 100, amountSold: 0 },
    { id: "0015", name: "Volt", gender: "male", type: "eau-de-parfum", price: 4999.99, description: "Volt sparks with electrifying citrus and spicy cardamom.", imageUrl: "Images/Men/Volt.png", sku: "M15", stock: 100, amountSold: 0 },
    // female perfumes
    { id: "0016", name: "Aube de Lune", gender: "female", type: "eau-de-parfum", price: 3999.99, description: "Aube de Lune glows with soft iris and warm vanilla musk.", imageUrl: "Images/Women/Aube de Lune.png", sku: "F16", stock: 100, amountSold: 0 },
    { id: "0017", name: "Bloom Drift", gender: "female", type: "eau-de-parfum", price: 2999.99, description: "Bloom Drift dances with peony petals and bright citrus zest.", imageUrl: "Images/Women/Bloom Drift.png", sku: "F17", stock: 100, amountSold: 0 },
    { id: "0018", name: "Coral Muse", gender: "female", type: "eau-de-parfum", price: 4249.99, description: "Coral Muse inspires with juicy nectarine and amber rose.", imageUrl: "Images/Women/Coral Muse.png", sku: "F18", stock: 100, amountSold: 0 },
    { id: "0019", name: "Crimson Veil", gender: "female", type: "eau-de-parfum", price: 7499.99, description: "Crimson Veil envelops with red berries, oud, and dark florals.", imageUrl: "Images/Women/Crimson Veil.png", sku: "F19", stock: 100, amountSold: 0 },
    { id: "0020", name: "Dahlia Smoke", gender: "female", type: "eau-de-parfum", price: 4999.99, description: "Dahlia Smoke blends smoky florals and creamy sandalwood.", imageUrl: "Images/Women/Dahlia Smoke.png", sku: "F20", stock: 100, amountSold: 0 },
    { id: "0021", name: "Elan Frost", gender: "female", type: "eau-de-parfum", price: 3499.99, description: "Elan Frost shimmers with cool violet and icy white tea.", imageUrl: "Images/Women/Elan Frost.png", sku: "F21", stock: 100, amountSold: 0 },
    { id: "0022", name: "Fleur Mirage", gender: "female", type: "eau-de-parfum", price: 5499.99, description: "Fleur Mirage intrigues with jasmine, saffron, and amber woods.", imageUrl: "Images/Women/Fleur Mirage.png", sku: "F22", stock: 100, amountSold: 0 },
    { id: "0023", name: "Haze de Thé", gender: "female", type: "eau-de-parfum", price: 4749.99, description: "Haze de Thé softens with green tea, bergamot, and white musk.", imageUrl: "Images/Women/Haze de Thé.png", sku: "F23", stock: 100, amountSold: 0 },
    { id: "0024", name: "Ivory Dust", gender: "female", type: "eau-de-parfum", price: 5999.99, description: "Ivory Dust glistens with white florals and powdered vanilla.", imageUrl: "Images/Women/Ivory Dust.png", sku: "F24", stock: 100, amountSold: 0 },
    { id: "0025", name: "Lueur Saffron", gender: "female", type: "eau-de-parfum", price: 6499.99, description: "Lueur Saffron radiates with saffron threads and honeyed rose.", imageUrl: "Images/Women/Lueur Saffron.png", sku: "F25", stock: 100, amountSold: 0 },
    { id: "0026", name: "Rose Noiré", gender: "female", type: "eau-de-parfum", price: 4499.99, description: "Rose Noiré enchants with black rose and smoky incense woods.", imageUrl: "Images/Women/Rose Noiré.png", sku: "F26", stock: 100, amountSold: 0 },
    { id: "0027", name: "Silver Lark", gender: "female", type: "eau-de-parfum", price: 3999.99, description: "Silver Lark sparkles with crisp pear and white jasmine bloom.", imageUrl: "Images/Women/Silver Lark.png", sku: "F27", stock: 100, amountSold: 0 },
    { id: "0028", name: "Soleil Vellum", gender: "female", type: "eau-de-parfum", price: 3499.99, description: "Soleil Vellum warms with creamy coconut and golden amber.", imageUrl: "Images/Women/Soleil Vellum.png", sku: "F28", stock: 100, amountSold: 0 },
    { id: "0029", name: "Tendre Flame", gender: "female", type: "eau-de-parfum", price: 3249.99, description: "Tendre Flame caresses with soft woods and delicate iris.", imageUrl: "Images/Women/Tendre Flame.png", sku: "F29", stock: 100, amountSold: 0 },
    { id: "0030", name: "Velvet Echo", gender: "female", type: "eau-de-parfum", price: 4999.99, description: "Velvet Echo lingers with velvety musk and warm plum accord.", imageUrl: "Images/Women/Velvet Echo.png", sku: "F30", stock: 100, amountSold: 0 },
];

// Display
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let filteredProducts = [];

// Declaration of Element variables
let productsTableBody;
let PageControl;
let productEdit;
let stockEdit;
let productForm;
let stockUpdate;
let boxTitle;
let searchInput;
let searchButton;
let genderFilter;
let sortBySelect;
let addProductBtn;
let adjustmentReason;
let otherReasonGroup;
let salesEdit;
let salesForm;
let salesReason;
let salesOtherReasonGroup;

// LocalStorage key
const STORAGE_KEY = 'perfumeProducts';

// Load products from localStorage or use defaults
const loadProductsFromStorage = () => {
    try {
        const storedProducts = localStorage.getItem(STORAGE_KEY);
        if (storedProducts) {
            products = JSON.parse(storedProducts);
            console.log('Products loaded from localStorage');
        } else {
            // If no products in localStorage, use defaults
            products = [...defaultProducts];
            // Save default products to localStorage
            saveProductsToStorage();
            console.log('Default products loaded and saved to localStorage');
        }
    } catch (error) {
        console.error('Error loading products from localStorage:', error);
        // Fall back to default products
        products = [...defaultProducts];
    }
};

// Save products array data to localStorage, stringify is used since localStorage can only store strings
const saveProductsToStorage = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        console.log('Products saved to localStorage');
    } catch (error) {
        console.error('Error saving products to localStorage:', error);
        showNotification('Error saving data. Please try again.', 'error');
    }
};

// Initialize the contents of the page
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve element IDs from HTML
    productsTableBody = document.getElementById('products-table-body');
    PageControl = document.getElementById('page-control');
    productEdit = document.getElementById('product-edit');
    stockEdit = document.getElementById('stock-Edit');
    productForm = document.getElementById('product-form');
    stockUpdate = document.getElementById('stock-form');
    boxTitle = document.getElementById('box-title');
    searchInput = document.getElementById('product-search');
    searchButton = document.getElementById('search-button');
    genderFilter = document.getElementById('gender-filter');
    sortBySelect = document.getElementById('sort-by');
    addProductBtn = document.getElementById('add-product-btn');
    adjustmentReason = document.getElementById('adjustment-reason');
    otherReasonGroup = document.getElementById('other-reason-group');
    salesEdit = document.getElementById('sales-Edit');
    salesForm = document.getElementById('sales-form');
    salesReason = document.getElementById('sales-reason');
    salesOtherReasonGroup = document.getElementById('sales-other-reason-group');
    
    // Load products from localStorage
    loadProductsFromStorage();
    
    // Initialize the filtered products with all products
    filteredProducts = [...products];
    
    // Set up all event listeners
    setupEventListeners();
    
    // Load products when page loads
    loadProducts();
});

// Setting up all event listeners
const setupEventListeners = () => {
    // Search and filter events
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
    genderFilter.addEventListener('change', filterProducts);
    sortBySelect.addEventListener('change', filterProducts);

    // Add product button
    addProductBtn.addEventListener('click', () => {
        openAddproductEdit();
    });

    // Product form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });

    // Stock update
    stockUpdate.addEventListener('submit', (e) => {
        e.preventDefault();
        updateStock();
    });

    // Sales form submission
    salesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateSales();
    });

    // Close the box when clicking on 'x' or 'Cancel' buttons
    const closeButtons = document.querySelectorAll('.close-box, #cancel-btn, #cancel-stock-btn, #cancel-sales-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            productEdit.style.display = 'none';
            stockEdit.style.display = 'none';
            salesEdit.style.display = 'none';
        });
    });

    // Stock adjustment controls
    document.getElementById('increase-stock').addEventListener('click', () => {
        const input = document.getElementById('stock-adjustment');
        input.value = parseInt(input.value || 0) + 1;
    });

    document.getElementById('decrease-stock').addEventListener('click', () => {
        const input = document.getElementById('stock-adjustment');
        const currentValue = parseInt(input.value || 0);
        input.value = currentValue - 1;
    });

    // Sales adjustment controls
    document.getElementById('increase-sales').addEventListener('click', () => {
        const input = document.getElementById('sales-adjustment');
        input.value = parseInt(input.value || 0) + 1;
    });

    document.getElementById('decrease-sales').addEventListener('click', () => {
        const input = document.getElementById('sales-adjustment');
        const currentValue = parseInt(input.value || 0);
        input.value = currentValue - 1;
    });

    // Show/hide "Other reason" field for stock
    adjustmentReason.addEventListener('change', () => {
        otherReasonGroup.style.display = adjustmentReason.value === 'other' ? 'block' : 'none';
    });

    // Show/hide "Other reason" field for sales
    salesReason.addEventListener('change', () => {
        salesOtherReasonGroup.style.display = salesReason.value === 'other' ? 'block' : 'none';
    });

    // Close the box when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === productEdit) {
            productEdit.style.display = 'none';
        }
        if (e.target === stockEdit) {
            stockEdit.style.display = 'none';
        }
        if (e.target === salesEdit) {
            salesEdit.style.display = 'none';
        }
    });
};

// Load products with a limit of 10 per page, taking account filters and index
const loadProducts = () => {
    // Clear the table body
    productsTableBody.innerHTML = '';
    
    // Calculate start and end indices for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Generate table rows for each product
    displayProducts.forEach(product => {
        const row = document.createElement('tr');
        
        // Add stock class based on stock amount
        let stockClass = '';
        if (product.stock <= 10) {
            stockClass = 'low-stock';
        } else if (product.stock <= 30) {
            stockClass = 'medium-stock';
        }
        
        row.innerHTML = `
            <td><img src="${product.imageUrl}" alt="${product.name}" class="product-thumbnail"></td>
            <td>${product.sku}</td>
            <td>${product.name}</td>
            <td>${product.gender === 'male' ? 'Male' : 'Female'}</td>
            <td>Php${product.price.toFixed(2)}</td>
            <td class="${stockClass}">${product.stock}</td>
            <td>${product.amountSold || 0}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${product.id}">Edit</button>
                <button class="stock-btn" data-id="${product.id}">Stock</button>
                <button class="sales-btn" data-id="${product.id}">Sales</button>
                <button class="delete-btn" data-id="${product.id}">Delete</button>
            </td>
        `;
        
        productsTableBody.appendChild(row);
    });
    
    // Set up action button event listeners
    setupActionButtons();
    
    // Execute function that updates page content and page button appearance
    updatePageControl();
};

// Set up event listeners for product action buttons
const setupActionButtons = () => {
    // Edit product buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            openEditproductEdit(productId);
        });
    });
    
    // Stock adjustment buttons
    const stockButtons = document.querySelectorAll('.stock-btn');
    stockButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            openstockEdit(productId);
        });
    });

    // Sales adjustment buttons
    const salesButtons = document.querySelectorAll('.sales-btn');
    salesButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            openSalesEdit(productId);
        });
    });
    
    // Delete product buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            deleteProduct(productId);
        });
    });
};

// Update page contents and button appearance
const updatePageControl = () => {
    PageControl.innerHTML = '';
    
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    
    // Previous page button
    if (totalPages > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('page-button');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadProducts();
            }
        });
        PageControl.appendChild(prevBtn);
    }
    
    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('page-button');
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        
        // Use arrow function to maintain context
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            loadProducts();
        });
        
        PageControl.appendChild(pageBtn);
    }
    
    // Next page button
    if (totalPages > 1) {
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('page-button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                loadProducts();
            }
        });
        PageControl.appendChild(nextBtn);
    }
};

// Filter products based on search and filter criteria
const filterProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const genderValue = genderFilter.value;
    const sortValue = sortBySelect.value;
    
    // Apply filters
    filteredProducts = products.filter(product => {
        // Search term filter
        const matchesSearch = 
            product.name.toLowerCase().includes(searchTerm) ||
            product.sku.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        
        // Gender filter
        const matchesGender = genderValue === 'all' || product.gender === genderValue;
        
        return matchesSearch && matchesGender;
    });
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'stock-asc':
                return a.stock - b.stock;
            case 'stock-desc':
                return b.stock - a.stock;
            default:
                return 0;
        }
    });
    
    // Reset to first page and reload products
    currentPage = 1;
    loadProducts();
};

// Open the interface for adding a new product
const openAddproductEdit = () => {
    // Clear form fields
    productForm.reset();
    
    // Generate a new ID based on the highest existing ID
    const highestId = products.reduce((max, product) => {
        const productId = parseInt(product.id);
        return productId > max ? productId : max;
    }, 0);
    
    // Set the new product ID (next ID in sequence padded to 4 digits)
    const newId = (highestId + 1).toString().padStart(4, '0');
    document.getElementById('product-id').value = newId;
    
    // Change title for corresponding action of adding a product
    boxTitle.textContent = 'Add New Product';
    
    // Show the box form for adding
    productEdit.style.display = 'block';
};

// Open the interace for editing an existing product
const openEditproductEdit = (productId) => {
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Fill the form with product data
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-sku').value = product.sku;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-gender').value = product.gender;
        document.getElementById('product-type').value = product.type;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-image').value = product.imageUrl;
        
        // Change title for the corresponding action of editing an existing product
        boxTitle.textContent = 'Edit Product';
        
        // Show the box form for editing
        productEdit.style.display = 'block';
    }
};

// Open the interface for adjusting stock
const openstockEdit = (productId) => {
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Fill the form with product data
        document.getElementById('stock-product-id').value = product.id;
        document.getElementById('stock-product-name').textContent = product.name;
        document.getElementById('stock-product-sku').textContent = product.sku;
        document.getElementById('stock-current-amount').textContent = product.stock;
        document.getElementById('stock-adjustment').value = 0;
        document.getElementById('adjustment-reason').value = 'restock';
        otherReasonGroup.style.display = 'none';
        
        // Show the box form for ajusting stock
        stockEdit.style.display = 'block';
    }
};

// Open the interface for adjusting sales
const openSalesEdit = (productId) => {
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Initialize amountSold if it doesn't exist
        if (product.amountSold === undefined) {
            product.amountSold = 0;
        }
        
        // Fill the form with product data
        document.getElementById('sales-product-id').value = product.id;
        document.getElementById('sales-product-name').textContent = product.name;
        document.getElementById('sales-product-sku').textContent = product.sku;
        document.getElementById('sales-current-amount').textContent = product.amountSold;
        document.getElementById('sales-adjustment').value = 0;
        document.getElementById('sales-reason').value = 'new-sale';
        salesOtherReasonGroup.style.display = 'none';
        
        // Show the box form for adjusting sales
        salesEdit.style.display = 'block';
    }
};

// Save product (add new or update existing)
const saveProduct = () => {
    // Get form data
    const formData = {
        id: document.getElementById('product-id').value,
        sku: document.getElementById('product-sku').value,
        name: document.getElementById('product-name').value,
        gender: document.getElementById('product-gender').value,
        type: document.getElementById('product-type').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        description: document.getElementById('product-description').value,
        imageUrl: document.getElementById('product-image').value,
        amountSold: 0
    };
    
    // Find if product already exists
    const existingProductIndex = products.findIndex(p => p.id === formData.id);
    
    if (existingProductIndex !== -1) {
        // Preserve existing amountSold for existing products
        formData.amountSold = products[existingProductIndex].amountSold || 0;
        // Update existing product
        products[existingProductIndex] = formData;
        showNotification('Product updated successfully');
    } else {
        // Add new product
        products.push(formData);
        showNotification('Product added successfully');
    }
    
    // Save changes to localStorage
    saveProductsToStorage();
    
    // Close the box form/interface
    productEdit.style.display = 'none';
    
    // Refresh the product list
    filterProducts();
};

// Update product stock
const updateStock = () => {
    const productId = document.getElementById('stock-product-id').value;
    const adjustment = parseInt(document.getElementById('stock-adjustment').value);
    const reason = document.getElementById('adjustment-reason').value;
    
    // Find the product
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        // Update stock
        products[productIndex].stock += adjustment;
        
        // Ensure stock doesn't go negative
        if (products[productIndex].stock < 0) {
            products[productIndex].stock = 0;
        }
        
        // Save changes to localStorage
        saveProductsToStorage();
        
        showNotification(`Stock updated: ${adjustment > 0 ? '+' : ''}${adjustment} items`);
        
        // Close the box form/interface
        stockEdit.style.display = 'none';
        
        // Refresh the product list
        loadProducts();
    }
};

// Update product sales
const updateSales = () => {
    const productId = document.getElementById('sales-product-id').value;
    const adjustment = parseInt(document.getElementById('sales-adjustment').value);
    const reason = document.getElementById('sales-reason').value;
    
    // Find the product
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        // Initialize amountSold if it doesn't exist
        if (products[productIndex].amountSold === undefined) {
            products[productIndex].amountSold = 0;
        }
        
        // Update sales amount
        products[productIndex].amountSold += adjustment;
        
        // Ensure sales doesn't go negative
        if (products[productIndex].amountSold < 0) {
            products[productIndex].amountSold = 0;
        }
        
        // Save changes to localStorage
        saveProductsToStorage();
        
        showNotification(`Sales updated: ${adjustment > 0 ? '+' : ''}${adjustment} units`);
        
        // Close the box form/interface
        salesEdit.style.display = 'none';
        
        // Refresh the product list
        loadProducts();
    }
};

// Delete a product
const deleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
        // Find product index
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex !== -1) {
            // Remove product from array
            products.splice(productIndex, 1);
            
            // Save changes to localStorage
            saveProductsToStorage();
            
            showNotification('Product deleted successfully');
            
            // Refresh the product list
            filterProducts();
        }
    }
};

// Show notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (type === 'error') {
        notification.classList.add('notification-error');
    }
    notification.textContent = message;
    
    const container = document.getElementById('notification-container');
    container.appendChild(notification);
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 500);
    }, 3000);
};
