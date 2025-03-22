document.querySelectorAll('.card').forEach(label => {
    label.addEventListener('click', () => {
      const inputId = label.getAttribute('for');
      const input = document.getElementById(inputId);
  
      // if already selected, navigate
      if (input && input.checked) {
        const url = label.getAttribute('data-link');
        if (url) {
          window.location.href = url;
        }
      }
    });
  });
  