document.addEventListener("DOMContentLoaded", function() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const tbody = document.getElementById("order-table-body");

  orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.customer}</td>
      <td>${order.email}</td>
      <td>${order.phone}</td>
      <td>${order.trackingNo}</td>
      <td>${order.amount}</td>
    `;
    tbody.appendChild(row);
  });
});
