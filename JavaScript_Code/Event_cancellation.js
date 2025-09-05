Try{
const $ = id=>document.getElementById(id);
const { jsPDF } = window.jspdf;

function showToast(msg){
  const t=$('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

$('cancelForm').addEventListener('submit', async e=>{
  e.preventDefault();

  const data = {
    bookingId: $('bookingId').value,
    email: $('email').value,
    eventDate: $('eventDate').value,
    phone: $('phone').value,
    reason: $('reason').value,
    refund: $('refund').value,
    details: $('details').value
  };

  // Generate barcode on hidden canvas
  JsBarcode("#barcodeCanvas", data.bookingId || "MPT-CANCEL", {
    format:"CODE128", width:2, height:40, displayValue:false
  });
  const barcodeDataUrl = $('barcodeCanvas').toDataURL("image/png");

  // ================= Create PDF =================
  const doc = new jsPDF();

  // ---- Header with background color ----
  doc.setFillColor(40,116,240); // Blue
  doc.rect(0, 0, 210, 25, "F"); // full-width rectangle (A4 width = 210mm)
  doc.setTextColor(255,255,255);
  doc.setFont("helvetica","bold");
  doc.setFontSize(16);
  doc.text("MPT Events — Cancellation Receipt", 105, 16, {align:"center"});

  // ---- Body ----
  doc.setTextColor(0,0,0);
  doc.setFont("helvetica","normal");
  doc.setFontSize(12);

  let y = 40;
  doc.text(`Booking ID: ${data.bookingId}`,20,y); y+=10;
  doc.text(`Email: ${data.email}`,20,y); y+=10;
  doc.text(`Event Date: ${data.eventDate}`,20,y); y+=10;
  doc.text(`Phone: ${data.phone}`,20,y); y+=10;
  doc.text(`Reason: ${data.reason}`,20,y); y+=10;
  doc.text(`Refund Preference: ${data.refund}`,20,y); y+=10;
  doc.text(`Details: ${data.details}`,20,y); y+=15;

  // Barcode inside PDF
  doc.addImage(barcodeDataUrl,"PNG",20,y,100,30);
  y+=50;

  // CANCELLED mark
  doc.setTextColor(220,0,0);
  doc.setFontSize(26);
  doc.text("EVENT CANCELLED",20,y);

  // ---- Footer with background color ----
  doc.setFillColor(230,230,230); // Light gray
  doc.rect(0, 285, 210, 12, "F"); // bottom bar
  doc.setTextColor(60,60,60);
  doc.setFontSize(10);
  doc.text("Thank you for choosing MPT Events | www.mptevents.com", 105, 293, {align:"center"});

  // Save
  doc.save("Event_Cancellation.pdf");
  showToast("Request submitted ✔ PDF downloaded.");
  e.target.reset();
});

// ---------------- Form logic ----------------
const form = $('cancelForm');
const hint = $('formHint');
const toast = $('toast');
const dot = $('liveDot');

function showToast(msg){
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 3800);
}

function validate(){
  let ok = true; let first;
  form.querySelectorAll('[required]').forEach(el=>{
    if(!el.value.trim()){ ok=false; el.style.borderColor='var(--err)'; if(!first) first = el; }
    else el.style.borderColor='rgba(255,255,255,.12)';
  });
  if(!ok && first){ first.focus(); showToast('Please fill all required fields'); }
  return ok;
}

form.addEventListener('input', ()=>{
  hint.textContent = 'Filling…';
  dot.style.background = 'var(--brand)';
  dot.style.boxShadow = '0 0 16px var(--brand)';
});

form.addEventListener('reset', ()=>{
  hint.textContent = 'Reset. Awaiting input…';
  dot.style.background = 'var(--warn)';
  dot.style.boxShadow = '0 0 16px var(--warn)';
});

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(!validate()) return;

  hint.textContent = 'Submitting…';
  dot.style.background = 'var(--brand-2)';
  dot.style.boxShadow = '0 0 16px var(--brand-2)'
});

// keep cube/slides pause logic unchanged
const cube = document.querySelector('.cube');
const slides = document.querySelector('.slides');
[cube, slides].forEach(el=>{
  el.addEventListener('pointerenter', ()=> el.style.animationPlayState='paused');
  el.addEventListener('pointerleave', ()=> el.style.animationPlayState='running');
});
} catch (error) {
  console.error('An error occurred:', error);
}
