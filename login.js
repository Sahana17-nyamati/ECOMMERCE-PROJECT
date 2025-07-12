

let form = document.getElementById("login-form");
let loginEmail = document.getElementById("email");
let pass = document.getElementById("pass");

let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Reset error messages
  emailError.textContent = "";
  passError.textContent = "";

  let isValid = true;

  // Basic validation
  if (loginEmail.value.trim() === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  }

  if (pass.value.trim() === "") {
    passError.textContent = "Password is required";
    isValid = false;
  }

  if (!isValid) return;

  let storedData = JSON.parse(localStorage.getItem('signupData')) || [];

  // storedData should be an array of user objects
  const user = storedData.find(
    (user) => user.email === loginEmail.value.trim() && user.password === pass.value
  );

  if (!user) {
    alert("Invalid email or password, or user not found.");
  } else {
    alert("Login successful!");

    // Save login session
    localStorage.setItem('loginData', JSON.stringify({ username: user.username }));

    window.location.href = "home.html";
  }
});

