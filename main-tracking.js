document.getElementById("cashout-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const amount = document.getElementById("amount").value;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrder = {
    orderId: `ORD-${Date.now()}`,
    customer: name,
    email: email,
    phone: phone,
    trackingNo: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
    amount: `₱${amount}`
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully!");

});
