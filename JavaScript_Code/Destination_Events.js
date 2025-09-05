document.addEventListener('DOMContentLoaded', () => {
  try {
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          const answer = btn.nextElementSibling;
          const icon = btn.querySelector('.icon');

          const isOpen = answer.style.display === 'block';
          answer.style.display = isOpen ? 'none' : 'block';
          btn.classList.toggle('open');
          icon.textContent = isOpen ? '+' : '–';
        } catch (err) {
          console.error("FAQ toggle error:", err);
        }
      });
    });
  } catch (err) {
    console.error("FAQ setup error:", err);
  }
});
