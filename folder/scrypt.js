document.addEventListener('DOMContentLoaded', function () {
  let menuIcon = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');
  let homeSci = document.querySelector('.home-sci');
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');
  let footer = document.querySelector('footer');
  let footerTop = footer.offsetTop;
  let footerHeight = footer.offsetHeight;

  document.querySelector('section.home').classList.add('show-animate');

  menuIcon.addEventListener('click', function () {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    homeSci.classList.toggle('active'); 
  });

  // Handle scroll event
  window.addEventListener('scroll', function () {
    const top = window.scrollY;
    const homeSectionHeight = document.querySelector('.home').offsetHeight;

    // Toggle sticky class on header based on scroll position
    const header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);

    // Iterate through each section
    sections.forEach(sec => {
      let offset = sec.offsetTop - 100;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      // Check if the top of the window is within the section's bounds
      if (top >= offset && top < offset + height) {
        // Remove active class from all nav links
        navLinks.forEach(links => links.classList.remove('active'));

        // Add active class to the corresponding nav link
        document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');

        // Add show-animate class to the section
        sec.classList.add('show-animate');
      } else {
        // Remove show-animate class from the section on scroll out
        sec.classList.remove('show-animate');
      }
    });

    // Calculate scroll position and footer position (optimized for performance)
    let scrollPosition = window.scrollY + window.innerHeight; // Combine in one line

    // Toggle show-animate class on footer based on scroll position
    footer.classList.toggle('show-animate', scrollPosition >= footerTop + footerHeight);
  });
});
