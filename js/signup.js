
let form = document.getElementById("signup-form");
let username = document.getElementById("username");
let password = document.getElementById("password");
let cPassword = document.getElementById("cpass");
let Email = document.getElementById('mail');

let usernameError = document.getElementById('usernameError');
let passwordError = document.getElementById("passError");
let confirmError = document.getElementById('cpError');
let mailError = document.getElementById("mailError");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous error messages
  usernameError.innerText = "";
  passwordError.innerText = "";
  confirmError.innerText = "";
  mailError.innerText = "";

  let valid = true;

  // Username validation
  const userInputError = username.value.trim();
  if (!userInputError) {
    usernameError.innerText = "User should not give space";
    valid = false;
  } else if (username.value.length < 3) {
    usernameError.innerText = "User must enter at least 3 characters";
    valid = false;
  } else if (username.value.length > 15) {
    usernameError.innerText = "User should not enter more than 15 characters";
    valid = false;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]+$/.test(userInputError)) {
    usernameError.innerText = "Username must contain both uppercase and lowercase letters.";
    valid = false;
  }

  // Password validation
  const passwordInputError = password.value.trim();
  if (!passwordInputError) {
    passwordError.innerText = "Password is required";
    valid = false;
  } else if (!/(?=.*[a-z])/.test(passwordInputError)) {
    passwordError.innerText = "Password needs a lowercase letter";
    valid = false;
  } else if (!/(?=.*[0-9])/.test(passwordInputError)) {
    passwordError.innerText = "Password needs a number";
    valid = false;
  } else if (!/(?=.*[A-Z])/.test(passwordInputError)) {
    passwordError.innerText = "Password needs an uppercase letter";
    valid = false;
  } else if (!/(?=.*[@#$%&*_])/.test(passwordInputError)) {
    passwordError.innerText = "Password needs a special character";
    valid = false;
  } else if (password.value.length < 3) {
    passwordError.innerText = "Password should be at least 3 characters";
    valid = false;
  } else if (password.value.length > 9) {
    passwordError.innerText = "Password cannot be more than 9 characters";
    valid = false;
  }

  // Confirm Password validation
  const confirmPasswordValue = cPassword.value.trim();
  if (!confirmPasswordValue) {
    confirmError.innerText = "Confirm password required";
    valid = false;
  } else if (confirmPasswordValue !== passwordInputError) {
    confirmError.innerText = "Passwords should match";
    valid = false;
  }

  // Email validation
  const emailValue = Email.value.trim();
  if (!emailValue) {
    mailError.innerText = "Email required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    mailError.innerText = "Enter a proper email";
    valid = false;
  }

  // Proceed if all inputs are valid
  if (valid) {
    let existingUsers = [];

    try {
      const stored = JSON.parse(localStorage.getItem("signupData"));
      if (Array.isArray(stored)) {
        existingUsers = stored;
      } else if (stored && typeof stored === "object") {
        existingUsers = [stored]; // Handle old single-user format
      }
    } catch (error) {
      console.warn("Corrupted signupData found. Resetting...");
      localStorage.removeItem("signupData");
    }

    // Prevent duplicate email
    if (existingUsers.some(user => user.email === emailValue)) {
      mailError.innerText = "Email already registered";
      return;
    }

    // Add new user
    const userData = {
      username: username.value.trim(),
      password: password.value,
      email: emailValue
    };

    existingUsers.push(userData);
    localStorage.setItem("signupData", JSON.stringify(existingUsers));

    alert("Signup successful!");
    form.reset();
    window.location.href = "index.html";
  }
});
