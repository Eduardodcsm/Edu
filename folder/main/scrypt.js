document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const homeSci = document.querySelector('.home-sci');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const footer = document.querySelector('footer');
  const footerTop = footer.offsetTop;
  const footerHeight = footer.offsetHeight;
  const header = document.querySelector('header');

  // Add 'show-animate' class to the home section initially
  document.querySelector('section.home').classList.add('show-animate');

  // Toggle menu icon and navbar
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    homeSci.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const yOffset = -100; // Adjust as needed
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });

  // Scroll event listener
  window.addEventListener('scroll', () => {
    const top = window.scrollY;

    // Toggle 'sticky' class for the header
    header.classList.toggle('sticky', top > 100);

    // Highlight active navigation links and trigger animations for sections
    sections.forEach(sec => {
      const offset = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`header nav a[href="#${id}"]`).classList.add('active');
        sec.classList.add('show-animate');
      } else {
        sec.classList.remove('show-animate');
      }
    });

    // Toggle 'show-animate' class for the footer
    const scrollPosition = window.scrollY + window.innerHeight;
    footer.classList.toggle('show-animate', scrollPosition >= footerTop + footerHeight);

    // Add 'show-animate' class to the contact section
    const contactSection = document.querySelector('#contact');
    const contactOffset = contactSection.offsetTop - 100;
    if (top >= contactOffset) {
      contactSection.classList.add('show-animate');
    } else {
      contactSection.classList.remove('show-animate');
    }
  });

  // Read more/less button functionality
  const readMoreBtn = document.getElementById("readMoreBtn");
  const shortDescription = document.getElementById("shortDescription");
  const longDescription = document.getElementById("longDescription");

  readMoreBtn.addEventListener("click", function() {
    if (shortDescription.style.display === "none") {
      shortDescription.style.display = "block";
      longDescription.style.display = "none";
      readMoreBtn.innerText = "Read more";
    } else {
      shortDescription.style.display = "none";
      longDescription.style.display = "block";
      readMoreBtn.innerText = "Read less";
    }
  });

  // Handling click event for the "Other Projects" link
  const otherProjectsLink = document.querySelector('a[href="folder/pages/page.html"]');
  if (otherProjectsLink) {
    otherProjectsLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default navigation behavior
      window.location.href = otherProjectsLink.href; // Navigate to the specified URL
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Get the button and popup elements
  const suggestionBtn = document.getElementById("suggestionBtn");
  const suggestionPopup = document.getElementById("suggestionPopup");
  const thankYouMessage = document.getElementById("thankYouMessage"); // Thank you message element

  // Function to open the popup
  function openPopup() {
    suggestionPopup.style.display = "block";
    thankYouMessage.style.display = "none"; // Hide thank you message initially
  }

  // Function to close the popup
  function closePopup() {
    suggestionPopup.style.display = "none";
  }

  // Event listener for the button click
  suggestionBtn.addEventListener("click", openPopup);

  // Event listener for the close button click
  document.getElementById("closeBtn").addEventListener("click", closePopup);

  // Event listener for submitting the form (you can handle this part according to your backend)
  document.getElementById("suggestionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const suggestionText = document.getElementById("suggestionText").value;
    console.log("Submitted suggestion:", suggestionText);
    // Here you can send the suggestion to your backend using AJAX or fetch
    closePopup(); // Close the popup after submission
    thankYouMessage.style.display = "block"; // Display thank you message
  });
});
