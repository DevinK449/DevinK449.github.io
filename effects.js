/* ============================================================
   VANILLA REACTBITS EFFECTS
   Converted from ReactBits (reactbits.dev) React components
   to plain JavaScript for use on any static HTML site.

   Usage: Just add <script src="effects.js"></script> before </body>
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. DECRYPTED TEXT
     Original: reactbits.dev/text-animations/decrypted-text
     ========================================================== */

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

  function initDecryptedText(el) {
    const originalText = el.getAttribute('data-text') || el.textContent;
    const speed = parseInt(el.getAttribute('data-speed')) || 50;
    const maxIterations = parseInt(el.getAttribute('data-max-iterations')) || 10;
    let interval = null;
    let isAnimating = false;

    function getRandomChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function renderText(text, revealedSet) {
      el.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        } else if (!revealedSet.has(i)) {
          span.className = 'encrypted-char';
        } else {
          span.className = 'revealed-char';
        }
        el.appendChild(span);
      });
    }

    function shuffleText(revealed) {
      return originalText.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (revealed.has(i)) return originalText[i];
        return getRandomChar();
      }).join('');
    }

    function animate() {
      if (isAnimating) return;
      isAnimating = true;

      const revealed = new Set();
      let iteration = 0;
      const charsPerTick = Math.max(1, Math.ceil(originalText.length / maxIterations));

      interval = setInterval(() => {
        let added = 0;
        while (added < charsPerTick && revealed.size < originalText.length) {
          const nextIdx = revealed.size;
          if (originalText[nextIdx] === ' ') {
            revealed.add(nextIdx);
          } else {
            revealed.add(nextIdx);
            added++;
          }
        }

        const display = shuffleText(revealed);
        renderText(display, revealed);
        iteration++;

        if (revealed.size >= originalText.length || iteration >= maxIterations * 2) {
          clearInterval(interval);
          interval = null;
          isAnimating = false;
          renderText(originalText, new Set(Array.from({ length: originalText.length }, (_, i) => i)));
        }
      }, speed);
    }

    function reset() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      isAnimating = false;
      const allRevealed = new Set(Array.from({ length: originalText.length }, (_, i) => i));
      renderText(originalText, allRevealed);
    }

    reset();

    // Hover to trigger
    el.addEventListener('mouseenter', animate);
    el.addEventListener('mouseleave', reset);
  }

  document.querySelectorAll('.decrypted-text').forEach(initDecryptedText);


  /* ==========================================================
     2. BORDER GLOW
     Original: reactbits.dev (BorderGlow component)
     ========================================================== */

  function initBorderGlow(card) {
    const edgeSensitivity = parseInt(card.getAttribute('data-edge-sensitivity')) || 30;
    const coneSpread = parseInt(card.getAttribute('data-cone-spread')) || 25;

    card.style.setProperty('--edge-sensitivity', edgeSensitivity);
    card.style.setProperty('--cone-spread', coneSpread);

    function getCenterOfElement() {
      const rect = card.getBoundingClientRect();
      return [rect.width / 2, rect.height / 2];
    }

    function getEdgeProximity(x, y) {
      const [cx, cy] = getCenterOfElement();
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    }

    function getCursorAngle(x, y) {
      const [cx, cy] = getCenterOfElement();
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    }

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const edge = getEdgeProximity(x, y);
      const angle = getCursorAngle(x, y);

      card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
      card.style.setProperty('--cursor-angle', angle.toFixed(3) + 'deg');
    });
  }

  document.querySelectorAll('.border-glow-card').forEach(initBorderGlow);


  /* ==========================================================
     3. SCROLL REVEAL
     Cards fade + slide up as they scroll into view
     ========================================================== */

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
        // After the reveal animation finishes, free up transform for tilt
        setTimeout(() => {
          entry.target.classList.add('tilt-ready');
        }, 900);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================================
     4. TILT EFFECT
     Cards tilt in 3D toward the cursor on hover
     ========================================================== */

  function initTilt(card) {
    const maxTilt = 8; // degrees

    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Normalize to -1 to 1
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;

      // Tilt: rotateX is inverse of Y movement, rotateY follows X
      const rotateX = -dy * maxTilt;
      const rotateY = dx * maxTilt;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    }

    function handleLeave() {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
  }

  document.querySelectorAll('.tilt-card').forEach(initTilt);

});
