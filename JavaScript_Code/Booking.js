try{
    const formatINR = (n) =>  new Intl.NumberFormat('en-IN').format(n|0);
    
    // ============== IMAGE TILES TILT & GLOW ==============
    const allTiles = document.querySelectorAll('.tile');
    for(const t of allTiles){
      t.addEventListener('pointermove', (e)=>{
        const r = t.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width * 100;
        const my = (e.clientY - r.top) / r.height * 100;
        t.style.setProperty('--mx', mx + '%');
        t.style.setProperty('--my', my + '%');
        const rx = -((my/100) - .5) * 8; const ry = ((mx/100) - .5) * 10;
        t.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      t.addEventListener('pointerleave', ()=> t.style.transform = 'rotateX(0) rotateY(0)');
    }

    // ============== RING CAROUSEL HOVER PAUSE ==============
    const ring = document.getElementById('ring');
    ring.addEventListener('mouseenter', ()=> ring.style.animationPlayState = 'paused');
    ring.addEventListener('mouseleave', ()=> ring.style.animationPlayState = 'running');

    // ============== SCROLL REVEAL ==============
    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }
    }, {threshold:.2});
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

    // ============== PRICE ESTIMATOR ==============
const el = (id)=> document.getElementById(id);
const baseMap = { Wedding: 120000, Corporate: 90000, Birthday: 40000, Concert: 180000, Other: 50000 };
const formElems = ['eventType','guests','decor','photo','catering'];



function calc(){
  const type = el('eventType').value; 
  const guests = +el('guests').value || 0;
  const base = baseMap[type] || 0;
  const decor = +el('decor').value || 0; 
  const photo = +el('photo').value || 0;
  const catPer = +el('catering').value || 0; 
  const perGuest = catPer * guests;
  const addons = decor + photo;
  const total = base + perGuest + addons;

  el('total').textContent = '₹' + formatINR(total);
  el('base').textContent = '₹' + formatINR(base);
  el('perGuest').textContent = '₹' + formatINR(perGuest);
  el('addons').textContent = '₹' + formatINR(addons);
  el('guestCount').textContent = formatINR(guests);
  el('statusBadge').textContent = type ? 'Live' : 'Ready';

  return total;
}

formElems.forEach(id=> el(id).addEventListener('input', calc));

    // ============== FORM SUBMIT & SUMMARY MODAL ==============
    const modal = el('modal');
    function closeModal(){ modal.classList.remove('show'); stopConfetti(); }
    window.closeModal = closeModal;

    el('bookingForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const total = calc();
      // basic validation for date in future
      const dt = new Date(el('date').value + 'T' + (el('time').value||'00:00'));
      if(!el('eventType').value || !el('guests').value || !el('date').value || !el('time').value || !el('city').value || !el('name').value || !el('phone').value || !el('email').value){
        el('formHint').textContent = 'Please fill all required fields.'; el('formHint').style.color = 'var(--warn)'; return;
      }
      if(dt < new Date()){
        el('formHint').textContent = 'Please choose a future date/time.'; el('formHint').style.color = 'var(--warn)'; return;
      }
      el('formHint').textContent = 'Generating summary…'; el('formHint').style.color = 'var(--muted)';

      const ref = 'MPT' + Math.random().toString(36).slice(2,8).toUpperCase();
el('ref').textContent = ref;
el('sumTotal').textContent = "₹" + formatINR(total);

el('summary').innerHTML = `
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">
    <div>
      <div class="hint">Event</div>
      <div><b>${el('eventType').value}</b> • ${formatINR(+el('guests').value)} guests</div>
      <div class="hint">When</div>
      <div>${el('date').value} at ${el('time').value}</div>
      <div class="hint">Where</div>
      <div>${el('venue').value ? (el('venue').value + ', ') : ''}${el('city').value}</div>
    </div>
    <div>
      <div class="hint">Contact</div>
      <div>${el('name').value} • ${el('phone').value}</div>
      <div>${el('email').value}</div>
      <div class="hint">Add-ons</div>
      <div>
        Decor: ₹${formatINR(+el('decor').value)} • 
        Photo: ₹${formatINR(+el('photo').value)} • 
        Catering: ₹${formatINR(+el('catering').value)} / guest
      </div>
    </div>
  </div>`;


      setTimeout(() => {
  modal.classList.add('show');
  startConfetti();
  el('formHint').textContent = 'Confirmation Message sent to your mail.';
  el('formHint').style.color = 'var(--ok)';
}, 5000);
    });

    // ============== CONFETTI ==============
    const cnv = document.getElementById('confetti');
    const ctx = cnv.getContext('2d');
    let confetti, raf;
    function resize(){ cnv.width = innerWidth; cnv.height = innerHeight }
    window.addEventListener('resize', resize); resize();
    function spawn(){
      confetti = Array.from({length: 220}, ()=>({
        x: Math.random()*cnv.width,
        y: -Math.random()*cnv.height,
        s: Math.random()*6+3,
        v: Math.random()*1.5+1,
        r: Math.random()*Math.PI,
        w: Math.random()*18+6,
        h: Math.random()*8+4,
      }));
    }
    function draw(){
      ctx.clearRect(0,0,cnv.width,cnv.height);
      for(const p of confetti){
        p.y += p.v; p.r += .03; if(p.y > cnv.height + 20){ p.y = -20; p.x = Math.random()*cnv.width }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        // color shift via gradient
        const g = ctx.createLinearGradient(-p.w/2, -p.h/2, p.w/2, p.h/2);
        g.addColorStop(0, '#7c5cff'); g.addColorStop(.5, '#00e5ff'); g.addColorStop(1, '#ff4d8b');
        ctx.fillStyle = g; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    }
    function startConfetti(){ spawn(); draw(); }
    function stopConfetti(){ cancelAnimationFrame(raf); ctx.clearRect(0,0,cnv.width,cnv.height); }

    // ============== MISC ==============
    document.getElementById('yr').textContent = new Date().getFullYear();
    calc();

    // =================================
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
} catch (error) {
  console.error('An error occurred:', error);
}
