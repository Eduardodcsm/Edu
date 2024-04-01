document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const homeSci = document.querySelector('.home-sci');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const footer = document.querySelector('footer');
  const footerTop = footer.offsetTop;
  const footerHeight = footer.offsetHeight;

  document.querySelector('section.home').classList.add('show-animate');

  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    homeSci.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
    const top = window.scrollY;
    const header = document.querySelector('header');

    header.classList.toggle('sticky', top > 100);

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

    const scrollPosition = window.scrollY + window.innerHeight;
    footer.classList.toggle('show-animate', scrollPosition >= footerTop + footerHeight);
  });

  // JavaScript code to handle "Read more" button click
  const readMoreBtn = document.getElementById('readMoreBtn');
  readMoreBtn.addEventListener('click', () => {
    const shortDescription = document.getElementById('shortDescription');
    const longDescription = document.getElementById('longDescription');

    shortDescription.style.display = shortDescription.style.display === 'none' ? 'block' : 'none';
    longDescription.style.display = longDescription.style.display === 'none' ? 'block' : 'none';
    readMoreBtn.textContent = shortDescription.style.display === 'none' ? 'Read more' : 'Read less';
  });
});