;(function(){
    const cartCountEl      = document.getElementById("cart-count")
    const viewCartBtn      = document.getElementById("view-cart-btn")
    const cartDropdown     = document.getElementById("cart-dropdown")
    const cartItemsEl      = document.getElementById("cart-items")
    const cartTotalEl      = document.getElementById("cart-total")

    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || []
    }
    function saveCart(c) {
      localStorage.setItem("cart", JSON.stringify(c))
    }

    function updateCartCount() {
      if (!cartCountEl) return
      const totalQty = getCart().reduce((sum, item) => sum + item.quantity, 0)
      cartCountEl.textContent = totalQty
    }
  
    function renderCartDropdown() {
      if (!cartItemsEl || !cartTotalEl) return
      const items = getCart()
      cartItemsEl.innerHTML = ""
      let total = 0
  
      items.forEach(item => {
        total += item.price * item.quantity
        const li = document.createElement("li")
        li.innerHTML = `
          <span class="item-name">${item.name}</span>
          <button class="qty-decrease" data-id="${item.id}">−</button>
          <span class="item-qty">${item.quantity}</span>
          <button class="qty-increase" data-id="${item.id}">+</button>
          <span class="item-subtotal">₱${(item.price * item.quantity).toFixed(2)}</span>
        `
        cartItemsEl.appendChild(li)
      })

      if (cartTotalEl.tagName === "SPAN") {
        cartTotalEl.textContent = total.toFixed(2)
      } else {
        cartTotalEl.textContent = `Total: ₱${total.toFixed(2)}`
      }
    }
  
    function toggleCartDropdown() {
      if (!cartDropdown) return
      cartDropdown.classList.toggle("hidden")
      renderCartDropdown()
    }

    function addToCart(item) {
      const cart = getCart()
      const existing = cart.find(i => i.id === item.id)
      if (existing) existing.quantity++
      else cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 })
      saveCart(cart)
      updateCartCount()
    }

    function changeQty(id, delta) {
      let cart = getCart()
      const idx = cart.findIndex(i => i.id === id)
      if (idx === -1) return
      cart[idx].quantity += delta
      if (cart[idx].quantity <= 0) cart.splice(idx, 1)
      saveCart(cart)
      updateCartCount()
      renderCartDropdown()
    }

    document.addEventListener("DOMContentLoaded", () => {
      updateCartCount()
      if (viewCartBtn) viewCartBtn.addEventListener("click", toggleCartDropdown)
      if (cartItemsEl) {
        cartItemsEl.addEventListener("click", e => {
          if (e.target.matches(".qty-decrease")) changeQty(e.target.dataset.id, -1)
          if (e.target.matches(".qty-increase")) changeQty(e.target.dataset.id, +1)
        })
      }
    })

    window.addEventListener("storage", () => {
      updateCartCount()
      if (cartDropdown && !cartDropdown.classList.contains("hidden")) {
        renderCartDropdown()
      }
    })

    window.CartModule = { addToCart, toggleCartDropdown, updateCartCount }
  })()
