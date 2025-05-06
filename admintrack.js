document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the orders from localStorage (or another source if you're not using localStorage)
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  
  // Get the table body where order rows will be inserted
  const tbody = document.getElementById("order-table-body");

  // If there are no orders, display a message
  if (orders.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5">No orders found.</td>`;
    tbody.appendChild(row);
    return;
  }

  // Sort the orders in descending order based on the date (or another property)
  orders.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Loop through each order and create a row for each one
  orders.forEach((order) => {
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
