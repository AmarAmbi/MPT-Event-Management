try {
  // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection reveal + count‑ups
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          // counters
          const nums = e.target.querySelectorAll('[data-count]');
          nums.forEach(n=>{
            const end = +n.getAttribute('data-count');
            const dur = 1100 + Math.random()*900; // 1.1s–2s
            const start = performance.now();
            const step = (t)=>{
              const p = Math.min(1, (t-start)/dur);
              n.textContent = Math.floor(end*p).toLocaleString();
              if(p<1) requestAnimationFrame(step); else n.textContent = end.toLocaleString();
            };
            requestAnimationFrame(step);
          });
          io.unobserve(e.target);
        }
      })
    },{threshold:.2});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // Simple tilt/parallax
    const tilts = document.querySelectorAll('.tilt');
    tilts.forEach(el=>{
      el.addEventListener('mousemove', (e)=>{
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width - .5;
        const y = (e.clientY - r.top)/r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x*8}deg) rotateX(${ -y*8}deg)`;
      });
      el.addEventListener('mouseleave', ()=>{
        el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
      });
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
} catch (error) {
  console.error('An error occurred:', error);
}

