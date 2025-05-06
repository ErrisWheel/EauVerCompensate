// Get products from external file's localStorage
const getProductsFromStorage = () => {
    const STORAGE_KEY = 'perfumeProducts';
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      const products = getProductsFromStorage();
      const product = products.find(p => p.id === productId);
      if (product) {
          updateProductDetails(product);
          document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
      } else {
          showProductNotFound();
      }
      document.getElementById('view-cart-btn')
          .addEventListener('click', () => {
              const dropdown = document.getElementById('cart-dropdown');
              dropdown.classList.toggle('hidden');
              renderCartContents();
          });
 
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

      document.getElementById('checkout-btn').onclick = () => {
        
          alert('Proceeding to checkout...');
          modal.style.display = 'none';
    };
          document.getElementById('checkout-btn').onclick = showCheckoutModal;

       document.getElementById('back-to-shop-btn').onclick = () => {
          window.location.href = 'https://erriswheel.github.io/EauVerCompensate/index.html';
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
      totalEl.textContent = total.toFixed(2);
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

function showCheckoutModal() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';

  // checkout
  document.getElementById('checkout-btn').addEventListener('click', () => {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('show');
  });
      
  document.getElementById('close-checkout-btn').addEventListener('click', () => {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.remove('show');
  });

  // calculate totals
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const orderTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingCost = 200; // flat PH rate
  const grandTotal = orderTotal + shippingCost;

  document.getElementById('checkout-order-total').textContent = orderTotal.toFixed(2);
  document.getElementById('checkout-shipping').textContent = shippingCost.toFixed(2);
  document.getElementById('checkout-grand-total').textContent = grandTotal.toFixed(2);

  // tracking number
  const trackingNo = 'EV' +
    Date.now().toString().slice(-6) +
    Math.floor(Math.random() * 1000).toString().padStart(3,'0');
  document.getElementById('checkout-tracking-no').textContent = trackingNo;

  document.getElementById('close-checkout-btn').onclick = () => {
    checkoutModal.style.display = 'none';
  };
 
  // form submit
  const form = document.getElementById('checkout-form');
  form.onsubmit = e => {
    e.preventDefault();
    alert(
      `Thank you, ${form['cust-name'].value}!\n` +
      `Your order (₱${grandTotal.toFixed(2)}) has been placed.\n` +
      `Tracking No: ${trackingNo}`
    );
    checkoutModal.style.display = 'none';
  };
}



