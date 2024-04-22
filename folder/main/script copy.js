
  // JavaScript code to handle form submission and thank you message display
  const form = document.querySelector('#suggestionForm');
  const thankYouSection = document.querySelector('#thankYouSection');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });

      if (response.ok) {
        // Show the thank you message
        thankYouSection.style.display = 'block';
        
        // Scroll to the thank you message
        thankYouSection.scrollIntoView({ behavior: 'smooth' });
        
        // Hide the thank you message after 5 seconds
        setTimeout(() => {
          thankYouSection.style.display = 'none';
          
          // Fade back to the home page
          document.querySelector('.home').style.opacity = '1';
        }, 5000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error
    }
  });