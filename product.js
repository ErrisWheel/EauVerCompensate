document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
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
