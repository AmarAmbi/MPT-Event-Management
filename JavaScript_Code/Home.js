    // Year
    document.getElementById('y').textContent = new Date().getFullYear();

    // IntersectionObserver reveal
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } })
    }, {threshold:.12});
    document.querySelectorAll('[data-animate]').forEach(el=>io.observe(el));

    // Auto slider
    const slider = document.getElementById('slider');
    let scrollPos = 0;
    function autoSlide(){
      scrollPos += 1; // px
      if(scrollPos >= slider.scrollWidth - slider.clientWidth){ scrollPos = 0 }
      slider.scrollLeft = scrollPos;
      requestAnimationFrame(autoSlide);
    }
    requestAnimationFrame(autoSlide);

    // Animated counters
    const counters = document.querySelectorAll('[data-counter]');
    const io2 = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const target = +e.target.getAttribute('data-counter');
          const numEl = e.target.querySelector('.num');
          let cur = 0; const step = Math.ceil(target/120);
          const tick = ()=>{ cur += step; if(cur>target) cur = target; numEl.textContent = cur; if(cur<target) requestAnimationFrame(tick) };
          tick(); io2.unobserve(e.target);
        }
      })
    }, {threshold:.4});
    counters.forEach(c=>io2.observe(c));


    // Tilt effect on cards (subtle 3D)
    document.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('pointermove', (e)=>{
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width - .5;
        const y = (e.clientY - r.top)/r.height - .5;
        card.style.transform = `rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', ()=>{ card.style.transform = '' });
    });

    // 3D Ring mouse control (pause + drag)
    const ring = document.getElementById('ring');
    let dragging=false, startX=0, rot=0;
    ring.addEventListener('pointerdown', e=>{dragging=true; startX=e.clientX; ring.style.animationPlayState='paused'});
    window.addEventListener('pointerup', ()=>{dragging=false; ring.style.animationPlayState='running'});
    window.addEventListener('pointermove', e=>{ if(!dragging) return; const dx=e.clientX-startX; startX=e.clientX; rot += dx*.2; ring.style.transform=`rotateY(${rot}deg)`; });

    // Lead form fake submit
    document.getElementById('leadForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      localStorage.setItem('mpt_lead', JSON.stringify({...data, ts: Date.now()}));
      alert('Thanks '+data.name+'! Our team will reach out shortly.');
      e.target.reset();
    });

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

    function topFunction() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }