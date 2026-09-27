/**
 * @adamstore Official Portal - Interactive Features
 * Search Filter, Blue Light Running Animation, Cool Click Shockwave & Sparks
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnSearch = document.getElementById('btnSearch');
  const searchDrawer = document.getElementById('searchDrawer');
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const linkCards = document.querySelectorAll('.link-card');
  const emptyState = document.getElementById('emptyState');

  const btnMenu = document.getElementById('btnMenu');
  const btnReport = document.getElementById('btnReport');
  const socialShareBtn = document.getElementById('socialShareBtn');
  const shareModal = document.getElementById('shareModal');
  const btnCloseShare = document.getElementById('btnCloseShare');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const btnCopyLink = document.getElementById('btnCopyLink');
  const shareWaLink = document.getElementById('shareWaLink');
  const shareTelegramLink = document.getElementById('shareTelegramLink');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Set current URL in share modal
  if (shareUrlInput) {
    const currentUrl = window.location.href.split('?')[0];
    shareUrlInput.value = currentUrl;

    if (shareWaLink) {
      shareWaLink.href = `https://api.whatsapp.com/send?text=${encodeURIComponent('Cek link resmi @adamstore: ' + currentUrl)}`;
    }
    if (shareTelegramLink) {
      shareTelegramLink.href = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Official Portal @adamstore')}`;
    }
  }

  // Audio Context for Futuristic Cyber Click Sound
  let audioCtx = null;
  function playFuturisticClickSound() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;

      // Tone 1: High crisp blip
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.09);

      // Tone 2: Sub-bass punch
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.12);

      gain2.gain.setValueAtTime(0.06, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc2.start(now);
      osc2.stop(now + 0.12);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  // Toast Function
  let toastTimer = null;
  function showToast(msg) {
    if (toastMessage) toastMessage.textContent = msg;
    if (toastNotification) {
      toastNotification.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastNotification.classList.remove('show');
      }, 2500);
    }
  }

  // Toggle Search Drawer
  if (btnSearch && searchDrawer && searchInput) {
    btnSearch.addEventListener('click', () => {
      playFuturisticClickSound();
      const isOpen = searchDrawer.classList.toggle('open');
      if (isOpen) {
        searchDrawer.setAttribute('aria-hidden', 'false');
        setTimeout(() => searchInput.focus(), 150);
      } else {
        searchDrawer.setAttribute('aria-hidden', 'true');
        searchInput.value = '';
        filterLinks('');
      }
    });
  }

  // Search Filter Logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (btnClearSearch) {
        btnClearSearch.classList.toggle('active', query.length > 0);
      }
      filterLinks(query);
    });
  }

  if (btnClearSearch && searchInput) {
    btnClearSearch.addEventListener('click', () => {
      searchInput.value = '';
      btnClearSearch.classList.remove('active');
      filterLinks('');
      searchInput.focus();
    });
  }

  function filterLinks(query) {
    let visibleCount = 0;
    linkCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const category = (card.getAttribute('data-category') || '').toLowerCase();
      if (!query || text.includes(query) || category.includes(query)) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // ==========================================================
  // ANIMASI KLIK KEREN: BOUNCE, SHOCKWAVE & NEON SPARK EXPLOSION
  // ==========================================================
  linkCards.forEach(card => {
    card.addEventListener('click', function(e) {
      playFuturisticClickSound();

      // 1. Card Slam / Bounce Animation
      card.classList.remove('clicked');
      void card.offsetWidth; // Trigger reflow
      card.classList.add('clicked');
      setTimeout(() => card.classList.remove('clicked'), 450);

      // Coordinates
      const rect = card.getBoundingClientRect();
      const clickX = e.clientX || (rect.left + rect.width / 2);
      const clickY = e.clientY || (rect.top + rect.height / 2);

      // 2. Shockwave Ripple Inside Card
      const inner = card.querySelector('.link-card-inner') || card;
      const innerRect = inner.getBoundingClientRect();
      const relX = clickX - innerRect.left;
      const relY = clickY - innerRect.top;

      const shockwave = document.createElement('span');
      shockwave.classList.add('click-shockwave');
      shockwave.style.left = `${relX}px`;
      shockwave.style.top = `${relY}px`;
      inner.appendChild(shockwave);

      // 3. Quick Flash Highlight
      const flash = document.createElement('div');
      flash.classList.add('click-flash');
      inner.appendChild(flash);

      setTimeout(() => {
        shockwave.remove();
        flash.remove();
      }, 700);

      // 4. Glowing Neon Blue Sparks Burst (14 sparks in radial spread)
      createNeonSparks(clickX, clickY);
    });
  });

  function createNeonSparks(x, y) {
    const sparkCount = 14;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.classList.add('click-spark');
      
      const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const distance = 40 + Math.random() * 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      // Color variation between cyan and royal blue
      if (i % 2 === 0) {
        spark.style.background = '#00e5ff';
        spark.style.boxShadow = '0 0 10px #00e5ff, 0 0 18px #0070f3';
      } else {
        spark.style.background = '#38bdf8';
        spark.style.boxShadow = '0 0 12px #38bdf8, 0 0 22px #0284c7';
      }

      document.body.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 700);
    }
  }

  // Share Modal Handlers
  function openShareModal() {
    playFuturisticClickSound();
    if (shareModal) shareModal.classList.add('open');
  }

  function closeShareModal() {
    playFuturisticClickSound();
    if (shareModal) shareModal.classList.remove('open');
  }

  if (socialShareBtn) {
    socialShareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openShareModal();
    });
  }

  if (btnCloseShare) {
    btnCloseShare.addEventListener('click', closeShareModal);
  }

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        closeShareModal();
      }
    });
  }

  // Copy Link Handler
  if (btnCopyLink && shareUrlInput) {
    btnCopyLink.addEventListener('click', () => {
      playFuturisticClickSound();
      navigator.clipboard.writeText(shareUrlInput.value)
        .then(() => {
          showToast('Tautan profil berhasil disalin!');
          closeShareModal();
        })
        .catch(() => {
          shareUrlInput.select();
          document.execCommand('copy');
          showToast('Tautan profil berhasil disalin!');
          closeShareModal();
        });
    });
  }

  // Menu Button Info
  if (btnMenu) {
    btnMenu.addEventListener('click', () => {
      playFuturisticClickSound();
      showToast('Portal Resmi @adamstore - Aman & Terpercaya');
    });
  }

  // Report Button
  if (btnReport) {
    btnReport.addEventListener('click', () => {
      playFuturisticClickSound();
      showToast('Terima kasih. Laporan akan ditinjau oleh tim keamanan.');
    });
  }
});
