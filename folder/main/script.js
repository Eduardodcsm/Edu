document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const homeSci = document.querySelector('.home-sci');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  const readMoreBtn = document.getElementById("readMoreBtn");
  const shortDescription = document.getElementById("shortDescription");
  const longDescription = document.getElementById("longDescription");
  const otherProjectsLink = document.querySelector('a[href="folder/pages/page.html"]');
  const suggestionForm = document.getElementById("suggestionForm");
  const thankYouSection = document.querySelector('#thankYouSection');

  // Add initial animation to home section
  document.querySelector('section.home').classList.add('show-animate');

  let footerTop = 0, footerHeight = 0;
  if (footer) {
    footerTop = footer.offsetTop;
    footerHeight = footer.offsetHeight;
  }

  const toggleFooterAnimation = () => {
    if (footer) {
      const scrollPosition = window.scrollY + window.innerHeight;
      footer.classList.toggle('show-animate', scrollPosition >= footerTop + footerHeight);
    }
  };

  // Toggle navbar on menu icon click
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
      if (homeSci) homeSci.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const yOffset = -50;
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Scroll events: sticky header, section animation, footer animation
  window.addEventListener('scroll', () => {
    const top = window.scrollY;
    header.classList.toggle('sticky', top > 100);

    sections.forEach(sec => {
      const offset = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
        sec.classList.add('show-animate');
      } else {
        sec.classList.remove('show-animate');
      }
    });

    toggleFooterAnimation();
  });

  // Read more/less toggle in About section
  if (readMoreBtn) {
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

  // Other Projects link – normal navigation
  if (otherProjectsLink) {
    otherProjectsLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = otherProjectsLink.href;
    });
  }

  // Form submission handling for suggestion form
  if (suggestionForm) {
    suggestionForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(suggestionForm);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Form submission successful:", data);
        if (thankYouSection) {
          thankYouSection.style.display = 'block';
          thankYouSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            thankYouSection.style.display = 'none';
          }, 3000);
        }
      } catch (error) {
        console.error("There was an error with form submission:", error);
      }
    });
  }
});

function changePlaceholder() {
  const mobileNumberInput = document.getElementById("mobileNumberInput");
  if (mobileNumberInput) {
    mobileNumberInput.placeholder = "No Required";
  }
}
