document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const homeSci = document.querySelector('.home-sci');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const footer = document.querySelector('footer');
  let footerTop, footerHeight;
  if (footer) {
    footerTop = footer.offsetTop; // Move inside if statement
    footerHeight = footer.offsetHeight; // Move inside if statement
  }
  const header = document.querySelector('header');
  const suggestionPopup = document.getElementById("suggestionPopup");
  const readMoreBtn = document.getElementById("readMoreBtn");
  const shortDescription = document.getElementById("shortDescription");
  const longDescription = document.getElementById("longDescription");
  const otherProjectsLink = document.querySelector('a[href="folder/pages/page.html"]');
  const suggestionForm = document.getElementById("suggestionForm");
  const thankYouSection = document.querySelector('#thankYouSection');

  // Add 'show-animate' class to the home section initially
  document.querySelector('section.home').classList.add('show-animate');

  // Ensure footer exists before accessing its properties
  if (footer) {
    // Toggle 'show-animate' class for the footer
    const scrollPosition = window.scrollY + window.innerHeight;
    footer.classList.toggle('show-animate', scrollPosition >= footerTop + footerHeight);
  }

  // Toggle menu icon and navbar
  if(menuIcon){
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
      homeSci.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const yOffset = -50; // Adjust as needed
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
    if (footer) {
      footer.classList.toggle('show-animate', scrollPosition >= footerTop + footerHeight);
    }
  });

  // Read more/less button functionality
  if(readMoreBtn){
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
  }

  // Handling click event for the "Other Projects" link
  if (otherProjectsLink) {
    otherProjectsLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default navigation behavior
      window.location.href = otherProjectsLink.href; // Navigate to the specified URL
    });
  }

  // Function to open the popup
  function openPopup() {
    suggestionPopup.style.display = "block";
  }

  // Function to close the popup
  function closePopup() {
    suggestionPopup.style.display = "none";
  }

  // Event listener for the close button click
  const closeBtn = document.getElementById("closeBtn");
  if(closeBtn){
    closeBtn.addEventListener("click", closePopup);
  }

  // Event listener for submitting the form (you can handle this part according to your backend)
  if (suggestionForm) {
    suggestionForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission
      const formData = new FormData(suggestionForm);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Form submission successful:", data);
        closePopup(); // Close the popup after successful submission
        // Display a thank you message
        thankYouSection.style.display = 'block';
        thankYouSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          thankYouSection.style.display = 'none';
        }, 3000); // Adjust the time (in milliseconds) as needed
      } catch (error) {
        console.error("There was an error with form submission:", error);
        // Optionally, you can display an error message to the user
      }
    });
  }
});

function changePlaceholder() {
  const mobileNumberInput = document.getElementById("mobileNumberInput");
  mobileNumberInput.placeholder = "No Required";
}
