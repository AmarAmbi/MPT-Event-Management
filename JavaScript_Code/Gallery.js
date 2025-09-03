// Existing filter logic for gallery images
const buttons = document.querySelectorAll('.filters button');
const galleryImages = document.querySelectorAll('.gallery img');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filterCategory = btn.dataset.filter;
    galleryImages.forEach(img => {
      if (img.dataset.category === filterCategory || filterCategory === 'all') {
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Show only 'wedding' category initially
  galleryImages.forEach(img => {
    if (img.dataset.category === 'wedding') {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });

  // Show upcoming events by default
  const upcomingCards = document.querySelectorAll('.event-card.upcoming');
  const completedCards = document.querySelectorAll('.event-card.completed');
  upcomingCards.forEach(card => card.style.display = 'block');
  completedCards.forEach(card => card.style.display = 'none');

  // Style the Proceed to Payment button
  const proceedBtn = document.getElementById('proceedToPaymentBtn');
  if (proceedBtn) {
    proceedBtn.style.backgroundColor = '#4CAF50';
    proceedBtn.style.color = 'white';
    proceedBtn.style.border = 'none';
    proceedBtn.style.padding = '10px 20px';
    proceedBtn.style.borderRadius = '5px';
    proceedBtn.style.cursor = 'pointer';
    proceedBtn.style.fontWeight = 'bold';
  }
});

// Toggle between upcoming and completed events
const eventButtons = document.querySelectorAll('.event-btn');
const upcomingCards = document.querySelectorAll('.event-card.upcoming');
const completedCards = document.querySelectorAll('.event-card.completed');

eventButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    eventButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    if (filter === 'upcoming') {
      upcomingCards.forEach(card => card.style.display = 'block');
      completedCards.forEach(card => card.style.display = 'none');
    } else {
      upcomingCards.forEach(card => card.style.display = 'none');
      completedCards.forEach(card => card.style.display = 'block');
    }
  });
});

// Add Book Now buttons to upcoming cards
const upcomingEvents = document.querySelectorAll('.event-card.upcoming');
upcomingEvents.forEach(card => {
  const btn = document.createElement('button');
  btn.innerText = 'Book Now';
  btn.className = 'book-btn';
  card.appendChild(btn);
});

// Modal logic
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('bookingForm');
const userIdInput = document.getElementById('userId');
const eventNameInput = document.getElementById('eventName');
const membersInput = document.getElementById('members');
const amountInput = document.getElementById('amount');

let selectedPrice = 0;

// Open modal on Book Now
const bookButtons = document.querySelectorAll('.book-btn');
bookButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const card = upcomingEvents[i];
    const eventName = card.querySelector('h3').innerText;
    const priceText = card.querySelector('p:nth-child(5)').innerText;
    selectedPrice = parseInt(priceText.match(/\d+/)[0]);
    eventNameInput.value = eventName;
    membersInput.value = '';
    amountInput.value = '';
    modal.style.display = 'block';
  });
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Auto-calculate amount based on members input
membersInput.addEventListener('input', () => {
  const members = parseInt(membersInput.value);
  if (!isNaN(members) && members > 0) {
    amountInput.value = members * selectedPrice;
  } else {
    amountInput.value = '';
  }
});

// Submit form and navigate to payment
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  localStorage.setItem('bookingDetails', JSON.stringify({
    userId: userIdInput.value,
    eventName: eventNameInput.value,
    members: membersInput.value,
    amount: amountInput.value
  }));
  window.location.href = 'Payment.html';
};


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