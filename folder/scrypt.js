document.addEventListener('DOMContentLoaded', function () {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    let footer = document.querySelector('footer');
    let footerTop = footer.offsetTop;
    let footerHeight = footer.offsetHeight;

    // Add show-animate class to home section initially
    document.querySelector('section.home').classList.add('show-animate');

    // Toggle menu icon and navbar active class
    menuIcon.addEventListener('click', function () {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Handle scroll event
    window.addEventListener('scroll', function () {
        let top = window.scrollY;

        // Iterate through each section
        sections.forEach(sec => {
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            // Check if the top of the window is within the section's bounds
            if (top >= offset && top < offset + height) {
                // Remove active class from all nav links
                navLinks.forEach(links => {
                    links.classList.remove('active');
                });
                // Add active class to the corresponding nav link
                document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');

                // Add show-animate class to the section
                sec.classList.add('show-animate');
            } else {
                // Remove show-animate class from the section
                sec.classList.remove('show-animate');
            }
        });

        // Toggle sticky class on header based on scroll position
        let header = document.querySelector('header');
        header.classList.toggle('sticky', top > 100);

        // Calculate scroll position and footer position
        let scrollPosition = window.innerHeight + top;
        let footerPosition = footerTop + footerHeight;

        // Toggle show-animate class on footer based on scroll position
        footer.classList.toggle('show-animate', scrollPosition >= footerPosition);
    });
});
