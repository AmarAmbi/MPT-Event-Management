try{
    // Helper
    const el = (id) => document.getElementById(id);

    // Year in footer
    el('year').textContent = new Date().getFullYear();

    // Open/close modal
    const modal = el('modal');
    const openers = ['openQuote','openQuote2','openQuote3'].map(id=>el(id));
    openers.forEach(btn=> btn && btn.addEventListener('click', ()=> modal.classList.add('show')));
    el('closeModal').addEventListener('click', ()=> modal.classList.remove('show'));
    el('cancelForm').addEventListener('click', ()=> modal.classList.remove('show'));

    // Form submit (demo only)
    el('quoteForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const hint = el('formHint');
      hint.style.color = 'var(--ok)';
      hint.textContent = 'Thanks! We\'ll email your personalized plan shortly.';
      setTimeout(()=>{ modal.classList.remove('show'); e.target.reset(); hint.textContent=''; }, 1600);
    });

    // IntersectionObserver for reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('show'); io.unobserve(en.target); } });
    }, { threshold: .2 });
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

    // Parallax orbs
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      parallaxItems.forEach(n=>{
        const speed = parseFloat(n.getAttribute('data-parallax'));
        n.style.transform = `translateY(${y*speed/100}px)`;
      });
    }, {passive:true});

    // 3D tilt effect
    const tiltEls = [...document.querySelectorAll('[data-tilt]')];
    tiltEls.forEach(card=>{
      const rect = () => card.getBoundingClientRect();
      let raf = null;
      const handle = (e)=>{
        const r = rect();
        const x = (e.clientX - r.left)/r.width - .5;
        const y = (e.clientY - r.top)/r.height - .5;
        const rx = (+y * 8).toFixed(2);
        const ry = (-x * 10).toFixed(2);
        if(raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(()=>{
          card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        });
      };
      const reset = ()=> card.style.transform = '';
      card.addEventListener('mousemove', handle);
      card.addEventListener('mouseleave', reset);
    });

    // Keyboard accessibility for modal
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && modal.classList.contains('show')) modal.classList.remove('show');
    });
    } catch (error) {
  console.error('An error occurred:', error);
}
