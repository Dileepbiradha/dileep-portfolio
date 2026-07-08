(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ============================================================
     Word-split title reveal (3D flip-up text on scroll)
     ============================================================ */
  function wrapWords(el) {
    if (!el || el.dataset.wrapped) return;
    el.dataset.wrapped = '1';
    const lines = el.innerHTML.split(/<br\s*\/?>/i);
    let wordIndex = 0;
    const html = lines.map((line) => {
      return line.trim().split(/\s+/).filter(Boolean).map((word) => {
        const markup = `<span class="word"><span class="word-inner" style="--wi:${wordIndex}">${word}</span></span>`;
        wordIndex += 1;
        return markup;
      }).join(' ');
    }).join('<br>');
    el.innerHTML = html;
  }
  document.querySelectorAll('.section-title, .contact-title').forEach(wrapWords);

  /* ============================================================
     Scroll-triggered reveal
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ============================================================
     Hero keyboard "fly-in" entrance
     ============================================================ */
  const keyField = document.querySelector('.key-field');
  if (keyField) {
    if (reduceMotion) {
      keyField.classList.add('armed');
    } else {
      requestAnimationFrame(() => {
        setTimeout(() => keyField.classList.add('armed'), 250);
      });
    }
  }

  /* ============================================================
     Scrollspy for rail nav + hero index counter
     ============================================================ */
  const sections = Array.from(document.querySelectorAll('.section[id]'));
  const dots = document.querySelectorAll('.rail-dot');
  const dotMap = new Map();
  dots.forEach((d) => dotMap.set(d.getAttribute('href').slice(1), d));
  const idxCurrent = document.querySelector('.idx-current');
  const idxFill = document.querySelector('.idx-fill');
  const total = sections.length;

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        const dot = dotMap.get(id);
        if (dot) {
          dots.forEach((d) => d.classList.remove('active'));
          dot.classList.add('active');
        }
        const pos = sections.findIndex((s) => s.id === id) + 1;
        if (idxCurrent) idxCurrent.textContent = String(pos).padStart(2, '0');
        if (idxFill) idxFill.style.width = ((pos / total) * 100) + '%';
      });
    }, { threshold: 0.4 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ============================================================
     Scroll progress bar
     ============================================================ */
  const progressBar = document.querySelector('.scroll-progress-bar');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ============================================================
     Custom cursor + click ripple
     ============================================================ */
  const cursor = document.querySelector('.cursor-dot');
  if (cursor && !reduceMotion && hasFineHover) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .project-card, .tag').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
  }

  const rippleLayer = document.querySelector('.click-ripple-layer');
  if (rippleLayer) {
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      rippleLayer.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ============================================================
     Magnetic buttons (mouse animation, desktop only)
     ============================================================ */
  if (!reduceMotion && hasFineHover) {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });
  }

  /* ============================================================
     Project card 3D tilt (desktop only)
     ============================================================ */
  if (!reduceMotion && hasFineHover) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 2.4}deg) rotateX(${y * -2.4}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
      });
    });
  }

  /* ============================================================
     Code rain — populate fast-scrolling fake code columns
     ============================================================ */
  const codeSnippets = [
    'const pipeline = new RAGPipeline();',
    'await pipeline.retrieve(query);',
    'def augment(context, query):',
    '    return f"{context}\\n{query}"',
    'app.post("/api/v1/chat")',
    'class InventoryService(Base):',
    '    __tablename__ = "products"',
    'SELECT * FROM stock WHERE qty < 10;',
    'response = gemini.generate(prompt)',
    'if not user.has_role("admin"):',
    '    raise Forbidden()',
    'router.get("/dashboard", auth, ctrl)',
    'export default function Dashboard() {',
    '  const [data, setData] = useState();',
    'git commit -m "feat: add RAG route"',
    'jwt.verify(token, SECRET_KEY)',
    'CREATE INDEX idx_sku ON products;',
    'model.fit(X_train, y_train, cnn_lstm)',
    'cv2.CascadeClassifier(FACE_MODEL)',
    'alembic revision --autogenerate',
  ];
  document.querySelectorAll('.code-col').forEach((col, ci) => {
    const pres = col.querySelectorAll('pre');
    const lines = [];
    for (let i = 0; i < 24; i++) lines.push(codeSnippets[(i + ci * 5) % codeSnippets.length]);
    const text = lines.join('\n');
    pres.forEach((p) => { p.textContent = text; });
  });

  /* ============================================================
     3D laptop — open + chart animate when scrolled into view
     ============================================================ */
  const laptops = document.querySelectorAll('[data-laptop]');
  if ('IntersectionObserver' in window) {
    const laptopIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-open', '');
        }
      });
    }, { threshold: 0.35 });
    laptops.forEach((l) => laptopIO.observe(l));
  } else {
    laptops.forEach((l) => l.setAttribute('data-open', ''));
  }

  /* ============================================================
     Emotion analyzer — animated scanning + percentage counters
     ============================================================ */
  document.querySelectorAll('[data-emotion-scan]').forEach((widget) => {
    const rows = widget.querySelectorAll('.emo-row');
    const dotsEl = widget.querySelector('.scan-label .dots');
    let dotsTimer = null;
    let cycleTimer = null;
    let running = false;

    function animateCount(el, target, duration) {
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(target * eased);
        el.textContent = val + '%';
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function runScan() {
      rows.forEach((row) => {
        const target = parseInt(row.dataset.target, 10) || 0;
        const fill = row.querySelector('.emo-fill');
        const pct = row.querySelector('.emo-pct');
        fill.style.width = '4%';
        pct.textContent = '0%';
        requestAnimationFrame(() => {
          fill.style.width = target + '%';
          animateCount(pct, target, 1200);
        });
      });
    }

    function startDots() {
      if (reduceMotion) return;
      let n = 0;
      dotsTimer = setInterval(() => {
        n = (n + 1) % 4;
        if (dotsEl) dotsEl.textContent = '.'.repeat(n);
      }, 420);
    }
    function stopDots() {
      if (dotsTimer) clearInterval(dotsTimer);
      dotsTimer = null;
    }

    function start() {
      if (running) return;
      running = true;
      runScan();
      startDots();
      if (!reduceMotion) {
        cycleTimer = setInterval(runScan, 6000);
      }
    }
    function stop() {
      running = false;
      stopDots();
      if (cycleTimer) clearInterval(cycleTimer);
      cycleTimer = null;
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start(); else stop();
        });
      }, { threshold: 0.3 });
      io.observe(widget);
    } else {
      start();
    }
  });

  /* ============================================================
     Copy demo credentials on click
     ============================================================ */
  document.querySelectorAll('.demo-creds').forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.textContent.replace('\u2713 copied', '').trim();
      const creds = text.replace(/^Demo login\s*\u2014\s*/, '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(creds).catch(() => {});
      }
      el.classList.add('copied');
      setTimeout(() => el.classList.remove('copied'), 1600);
    });
  });

  /* ============================================================
     Smooth-scroll for in-page links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
})();
