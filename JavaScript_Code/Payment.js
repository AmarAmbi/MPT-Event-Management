document.addEventListener("DOMContentLoaded", () => {
  const details = JSON.parse(localStorage.getItem('bookingDetails'));
  if (details) {
    document.getElementById('userId').textContent = details.userId;
    document.getElementById('eventName').textContent = details.eventName;
    document.getElementById('members').textContent = details.members;
    document.getElementById('amount').textContent = details.amount;
  }

  const sections = ['cardDetails', 'upiDetails', 'netbankingDetails', 'walletDetails'];
  const submitButton = document.getElementById('makePaymentBtn');

  function showSection(id) {
    sections.forEach(sec => document.getElementById(sec).classList.add('hidden'));
    if (id) document.getElementById(id).classList.remove('hidden');
    checkInputs();
  }

  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', () => {
      localStorage.setItem('lastPaymentMethod', radio.id);
      showSection(`${radio.id}Details`);
    });
  });

  document.getElementById('walletSelect').addEventListener('change', () => {
    document.getElementById('walletAuth').classList.toggle('hidden', document.getElementById('walletSelect').value === '');
    checkInputs();
  });

  document.getElementById('bank').addEventListener('change', () => {
    document.getElementById('netbankingAuth').classList.toggle('hidden', document.getElementById('bank').value === '');
    checkInputs();
  });

  function checkInputs() {
    const inputs = document.querySelectorAll('.check-input');
    let valid = true;
    inputs.forEach(el => {
      if (el.offsetParent !== null && el.value.trim() === '') {
        valid = false;
      }
    });
    submitButton.disabled = !valid;
  }

  document.querySelectorAll('.check-input').forEach(el => {
    el.addEventListener('input', checkInputs);
    el.addEventListener('change', checkInputs);
  });

  document.getElementById('payNowFromSummary').addEventListener('click', () => {
    document.getElementById('bookingSummarySection').classList.add('hidden');
    document.getElementById('paymentSection').classList.remove('hidden');

    const savedMethod = localStorage.getItem('lastPaymentMethod');
    if (savedMethod) {
      document.getElementById(savedMethod).checked = true;
      showSection(`${savedMethod}Details`);
    } else {
      showSection('cardDetails');
    }
  });

  document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const paymentId = "MPT" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: true
    });

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header background
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 20, 'F');

    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("MPT Events - Payment Receipt", 105, 13, null, null, 'center');

    // Body text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    let y = 30;

    doc.text("Receipt Details", 14, y);
    doc.line(14, y + 2, 196, y + 2);
    y += 10;

    doc.text(`User ID:`, 20, y);       doc.text(details.userId, 60, y);        y += 8;
    doc.text(`Event Name:`, 20, y);    doc.text(details.eventName, 60, y);     y += 8;
    doc.text(`Members:`, 20, y);       doc.text(details.members, 60, y);       y += 8;
    doc.text(`Amount Paid:`, 20, y);   doc.text(`${details.amount}`, 60, y);   y += 8;

    // ❌ REMOVED payment method, wallet name, mobile number from PDF

    doc.text(`Payment ID:`, 20, y);    doc.text(paymentId, 60, y);             y += 8;
    doc.text(`Date & Time:`, 20, y);   doc.text(formattedDateTime, 60, y);     y += 10;

    // ✅ Mixed color "Payment Status: Success"
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Status:", 20, y);
    doc.setTextColor(0, 128, 0);
    doc.text("Success", 60, y); // green
    y += 10;

    doc.setDrawColor(200);
    doc.line(14, y, 196, y);

    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Thank you for booking with MPT Events!", 105, y, null, null, 'center');

    doc.save("MPT_Booking_Receipt.pdf");

    const messageBox = document.createElement('div');
    messageBox.textContent = `✅ Payment Successful! Payment ID: ${paymentId}`;
    messageBox.style.color = 'green';
    messageBox.style.fontWeight = 'bold';
    messageBox.style.fontSize = '18px';
    messageBox.style.margin = '20px 0';
    messageBox.style.textAlign = 'center';
    document.getElementById('paymentSection').appendChild(messageBox);

    setTimeout(() => {
      document.getElementById('paymentSection').classList.add('hidden');
      document.getElementById('thankYouPeopup').classList.remove('hidden');
    }, 1500);
  });

  document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('thankYouPeopup').classList.add('hidden');
    window.location.href = 'Gallery.html';
  });
});
