
// SESSION CHECK
const loginData = JSON.parse(localStorage.getItem('loginData'));
if (!loginData) {
  alert("Please log in first.");
  window.location.href = "login.html";
}

// LOGOUT
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('loginData');
  alert("Logged out successfully.");
  window.location.href = "index.html";
});

// GO TO CART
document.getElementById('cart').addEventListener('click', () => {
  window.location.href = "cart.html";
});

// PRODUCTS
const products = [
  {
    id: 1,
    name: "Stylish Shoes",
    price: 999,
    image: "../projectweb/images/img1.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    image: "../projectweb/images/img2.jpg"
  },
  {
    id: 3,
    name: "Cool Backpack",
    price: 1299,
    image: "../projectweb/images/img3.jpg"
  }
];

// SHOW PRODUCTS
const container = document.getElementById("product-container");
products.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col-md-4";
  col.innerHTML = `
    <div class="card">
        <div class="card-img-top"> <img src="${product.image}"  alt="${product.name}" height="200px" width="355px"></div>
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Price: ₹${product.price}</p>
        <button class="btn btn-outline-primary" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;
  container.appendChild(col);
});

// ADD TO CART
container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.getAttribute("data-id"));
    const product = products.find(p => p.id === id);
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
  }
});

