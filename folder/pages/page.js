document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.querySelector('.login-container');
    var content = document.querySelector('.content');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way
  
      // TODO: Replace this condition with your actual authentication logic
      var loginSuccessful = true;
  
      if (loginSuccessful) {
        // Hide the login form and show the content
        loginForm.style.display = 'none';
        content.style.display = 'block';
      } else {
        // Handle a failed login
        alert('Login failed. Please try again.');
      }
    });
  });