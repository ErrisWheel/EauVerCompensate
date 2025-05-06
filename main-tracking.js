document.addEventListener("DOMContentLoaded", function () {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  console.log("Loaded orders:", orders);

  const cartPage = document.getElementById("cart-page");
  if (!cartPage) {
    console.log("cart-page element not found");
    return;
  }

  if (orders.length === 0) {
    cartPage.innerHTML = "<p>No orders found.</p>";
    return;
  }

  let orderHTML = "<h2>Order History</h2>";
  orders.forEach((order, index) => {
    orderHTML += 
      <div class="order-record">
        <p><strong>Order #${index + 1}</strong></p>
        <p>Name: ${order.name}</p>
        <p>Email: ${order.email}</p>
        <p>Address: ${order.address}</p>
        <p>Phone: ${order.phone}</p>
        <p>Total: ₱${order.total}</p>
        <p>Tracking No: ${order.tracking}</p>
        <hr>
      </div>
    ;
  });

  cartPage.innerHTML = orderHTML;
});
     
