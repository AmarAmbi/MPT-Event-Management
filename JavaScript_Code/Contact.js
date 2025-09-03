 // Footer year
    document.getElementById('yr').textContent = new Date().getFullYear();

    // Intersection Observer for reveal animations
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('visible'); io.unobserve(e.target)}
      })
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // Tilt effect for cards / images
    const tiltEls = document.querySelectorAll('.tilt');
    tiltEls.forEach(el=>{
      const r=16; const p=800; // rotation limit & perspective
      el.style.transformStyle='preserve-3d';
      el.addEventListener('mousemove', (e)=>{
        const b = el.getBoundingClientRect();
        const cx = e.clientX - b.left; const cy = e.clientY - b.top;
        const rx = ((cy / b.height) - .5) * -r;
        const ry = ((cx / b.width)  - .5) *  r;
        el.style.transform = `perspective(${p}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener('mouseleave', ()=>{
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      });
    });

    

    // Contact form handling with simple validation + modal
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const okBtn = document.getElementById('okBtn');
    const sendBtn = document.getElementById('sendBtn');

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      // Simple validations
      if(!/^[A-Za-z\s]{3,}/.test(data.name||'')) return nudge('Please enter a valid name');
      if(!/^\+?\d[\d\s-]{7,}$/.test(data.phone||'')) return nudge('Please enter a valid phone');
      if(!/^\S+@\S+\.\S+$/.test(data.email||'')) return nudge('Please enter a valid email');
      if(!data.msg || data.msg.trim().length < 10) return nudge('Tell us a bit more (10+ chars)');

      sendBtn.disabled = true; sendBtn.textContent = 'Sending…';
      // Simulate sending + store in localStorage for reference
      setTimeout(()=>{
        const key = 'mpt_enquiry_' + Date.now();
        localStorage.setItem(key, JSON.stringify(data));
        sendBtn.disabled = false; sendBtn.textContent = 'Send Enquiry';
        modal.classList.add('active');
      }, 800);
    });
    okBtn.addEventListener('click', ()=> modal.classList.remove('active'));

    function nudge(msg){
      // cute inline toast near button
      let toast = document.createElement('div');
      toast.textContent = msg;
      toast.style.cssText = `position:fixed; left:50%; bottom:24px; transform:translateX(-50%);\n        background:linear-gradient(135deg, rgba(255,93,108,.95), rgba(255,93,108,.75)); color:#0b0d1f;\n        padding:10px 14px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,.35); z-index:80; font-weight:800;`;
      document.body.appendChild(toast);
      setTimeout(()=>{ toast.style.transition='opacity .5s, transform .5s'; toast.style.opacity='0'; toast.style.transform='translateX(-50%) translateY(10px)'; }, 1600);
      setTimeout(()=> toast.remove(), 2200);
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