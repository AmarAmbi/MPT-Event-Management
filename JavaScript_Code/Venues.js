function openModal() {
  document.getElementById("pricingModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("pricingModal").style.display = "none";
}

// Attach modal open to pricing buttons
document.addEventListener("DOMContentLoaded", () => {
  const pricingButtons = document.querySelectorAll(".pricing-btn");
  pricingButtons.forEach(btn => btn.addEventListener("click", openModal));

  const locationFilter = document.getElementById("locationFilter");
  const typeFilter = document.getElementById("typeFilter");
  const searchInput = document.getElementById("searchInput");
  const venueCards = document.querySelectorAll(".venue-card");

  function applyFilters() {
    const location = locationFilter?.value || "";
    const type = typeFilter?.value || "";
    const search = searchInput?.value.toLowerCase() || "";

    venueCards.forEach(card => {
      const matchesLocation = location === "Select Venue Location" || card.dataset.location === location;
      const matchesType = type === "Select Venue Type" || card.dataset.type === type;
      const matchesSearch = card.textContent.toLowerCase().includes(search);

      card.style.display = (matchesLocation && matchesType && matchesSearch) ? "block" : "none";
    });
  }

  locationFilter?.addEventListener("change", applyFilters);
  typeFilter?.addEventListener("change", applyFilters);
  searchInput?.addEventListener("input", applyFilters);
});

// FAQ toggle (if present)
document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.icon');

      const isOpen = answer.style.display === 'block';
      answer.style.display = isOpen ? 'none' : 'block';
      btn.classList.toggle('open');
      icon.textContent = isOpen ? '+' : '-';
    });
  });
});

// Form Submission
document.getElementById("availability-form").addEventListener("submit", function(event) {
  event.preventDefault();
  showSuccessPopup();
  closeModal(); // Optional: close modal after submit
});

function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 8000);
}


// --------------scroll----------------
    let mybutton = document.getElementById("scrollTopBtn");

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
heroCard1
    function topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }