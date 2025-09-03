document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.icon');

      const isOpen = answer.style.display === 'block';
      answer.style.display = isOpen ? 'none' : 'block';
      btn.classList.toggle('open');
      icon.textContent = isOpen ? '+' : '–';
    });
  });
});