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
});
