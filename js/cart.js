

// LOGOUT FUNCTIONALITY
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("loginData");
  alert("Logged out successfully.");
  window.location.href = "index.html";
});

const cartContainer = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function renderCart() {
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p class='text-center text-muted'>Your cart is empty.</p>";
    totalSpan.innerText = "0";
    return;
  }

  let tableHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price (₹)</th>
          <th>Quantity</th>
          <th>Subtotal (₹)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${subtotal}</td>
        <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;
  cartContainer.innerHTML = tableHTML;
  totalSpan.innerText = total;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cartItems");
    cartItems = [];
    renderCart();
  }
});

renderCart();
