// Function for form submission validation.
function validateAndSubmit() {
  // Get input values.
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var query = document.getElementById("query").value;

  // Regular expressions for validation.
  var flChecker = /^[A-Za-z\s]+$/; // Text only (first name and last name).
  var nChecker = /^\d{9,10}$/; // Numeric (9 or 10 digits for phone).
  var emailChecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format.

  // Check if any field is empty.
  if (
    fname === "" ||
    lname === "" ||
    phone === "" ||
    email === "" ||
    query === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Check if first name and last name contain only text.
  if (!flChecker.test(fname) || !flChecker.test(lname)) {
    alert("First name and last name should consist of text only.");
    return;
  }

  // Check if phone number is valid (9 or 10 digits, numeric only).
  if (!nChecker.test(phone)) {
    alert("Please enter a valid phone number (9 or 10 digits, numeric only).");
    return;
  }

  // Check if email address is valid.
  if (!emailChecker.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Form submission success message.
  alert("Form submitted successfully.");
  alert("This page does not submit, just evaluate the filds.");
}

/* ============================= */

/* STYLE FOR GALLERY */

// Function to toggle grid padding
// Toggle grid padding
function toggleGridPadding() {
  var button = document.querySelector('.btn-toggle'); // Get the button element
  var grid = document.getElementById('myGrid'); // Get the grid element

  if (grid.classList.contains('img-gallery')) {
    grid.classList.remove('img-gallery');
    grid.classList.add('toggle-button');
    button.textContent = 'Toggle Grid Padding OFF'; // Update button text
  } else {
    grid.classList.remove('toggle-button');
    grid.classList.add('img-gallery');
    button.textContent = 'Toggle Grid Padding ON'; // Update button text
  }
}



/* STYLE FOR GALLERY */

/* ============================= */
