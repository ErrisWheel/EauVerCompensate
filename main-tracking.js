function completeCheckout() {
  const orderId = "ORD" + Math.floor(Math.random() * 100000); // unique ID
  const order = {
    id: orderId,
    product: "Perfume A",
    quantity: 1,
    status: "Processing"
  };

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully! Order ID: " + orderId);
}
