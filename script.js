// Example: Simple greeting popup
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to TeluguRoots 🌿");
});

// Simple form handler for contact page
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for contacting TeluguRoots!');
      form.reset();
    });
  }
});
