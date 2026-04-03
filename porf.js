// ===== STATE =====
let noClickCount = 0;
let gameInterval = null;
let gameTimer = null;
let gameScore = 0;
let gameSeconds = 30;
let gameRunning = false;

const noMessages = [
  { emoji: "😤", title: "Eh?! NO?! 😤", msg: "Are tu khup chukichi ahe! Ek baar aur soch..." },
  { emoji: "😭", title: "Again NO?! 😭", msg: "Arre yaar... mala saglyanna sangava lagal ka? 😤 Ek baar YES bol!" },
  { emoji: "🤦‍♂️", title: "Seriously?! 🤦‍♂️", msg: "6th class pansun ekta ahe... ani NO boltes? Tuzi himmat kashi zali! 😂" },
  { emoji: "😡", title: "TU KAY KARTO?! 😡", msg: "4 April la anniversary ahe ani TU NO boltes?! Bhai mala yeda kel! 💀" },
  { emoji: "🥹", title: "Ek chance de baba...", msg: "JEE paper deta deta tuzha haat dhamadla hota... ani TU NO? 😭 YES bol PLEASE!" },
  { emoji: "🤡", title: "Circus aahe ka ithe?! 🤡", msg: "Cottage Cafe madhye bhetlelo... sab bhool gelas ka?! 😤" },
  { emoji: "💔", title: "Hridaya phutla... 💔", msg: "Okay theek aahe, mi ata tuzyasathi ek sad shayari lihtil... YES bol baba!" },
  { emoji: "🚨", title: "EMERGENCY ALERT 🚨", msg: "YES button la maa lagali aahe... please click karo warna button rodu lagel! 😂" },
  { emoji: "🫠", title: "Main pighal gelo... 🫠", msg: "Aataa tu hie NO dabto rahil ani mi hie wait karat basil... YES bol na yaar!" },
  { emoji: "😤", title: "OKAY FINE...", msg: "Tu NO dablis, mi YES la chocolates denar hoto... think once more! 🍫" },
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  generateBgHearts();
  placeNoButton();
  buildTimeline();
});

window.addEventListener('resize', placeNoButton);

// ===== HEARTS BACKGROUND =====
function generateBgHearts() {
  const bg = document.getElementById('heartsBg');
  const emojis = ['💖', '💕', '🌸', '✨', '💗', '💓', '🌹', '⭐'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'bg-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    h.style.animationDuration = (Math.random() * 10 + 8) + 's';
    h.style.animationDelay = (Math.random() * 10) + 's';
    bg.appendChild(h);
  }
}

// ===== SCREEN NAV =====
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const next = document.getElementById(screenId);
  next.classList.add('active');
  next.classList.add('screen-enter');
  setTimeout(() => next.classList.remove('screen-enter'), 700);

  if (screenId === 'screen-final') {
    setTimeout(() => {
      launchFireworks();
      launchConfetti();
    }, 400);
  }
}

// ===== YES HANDLER =====
function handleYes() {
  noClickCount = 0;
  // Animate YES button
  const btn = document.getElementById('yesBtn');
  btn.textContent = '💖 YAYYYY!!!';
  btn.style.animation = 'none';
  btn.style.transform = 'scale(1.2)';
  btn.style.boxShadow = '0 0 40px rgba(40,167,69,0.8)';

  // Mini confetti burst
  launchConfetti(40);

  setTimeout(() => {
    goTo('screen-story');
  }, 800);
}

// ===== NO BUTTON ESCAPE =====
function placeNoButton() {
  const btn = document.getElementById('noBtn');
  if (!btn) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const bw = 140;
  const bh = 55;
  const x = Math.random() * (vw - bw - 40) + 20;
  const y = Math.random() * (vh - bh - 120) + 60;
  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
}

function escapeNo(e, btn) {
  e.preventDefault();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const bw = btn.offsetWidth || 140;
  const bh = btn.offsetHeight || 55;

  // Try to move away from cursor/touch
  let attempts = 0;
  let x, y;
  do {
    x = Math.random() * (vw - bw - 40) + 20;
    y = Math.random() * (vh - bh - 120) + 60;
    attempts++;
  } while (attempts < 20);

  btn.style.transition = 'left 0.2s, top 0.2s';
  btn.style.left = x + 'px';
  btn.style.top = y + 'px';

  setTimeout(() => {
    btn.style.transition = '';
  }, 250);

  // Show a tiny shaking effect
  btn.style.animation = 'shake 0.3s ease';
  setTimeout(() => btn.style.animation = '', 350);
}

// If user somehow manages to click NO (mobile fallback)
document.addEventListener('DOMContentLoaded', () => {
  const noBtn = document.getElementById('noBtn');
  if (noBtn) {
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleNoClick();
    });
  }
});

function handleNoClick() {
  noClickCount++;
  const data = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];

  // Show counter
  const counter = document.getElementById('noCounter');
  const counterText = document.getElementById('noCountText');
  counter.style.display = 'block';
  counterText.textContent = `Tu ${noClickCount} wela NO dablis... shart hoon! 😂`;

  showNoPopup(data);
  placeNoButton();
}

// ===== POPUP =====
function showNoPopup(data) {
  document.getElementById('popupEmoji').textContent = data.emoji;
  document.getElementById('popupTitle').textContent = data.title;
  document.getElementById('popupMsg').textContent = data.msg;

  const popup = document.getElementById('noPopup');
  popup.classList.add('show');

  // Re-animate emoji
  const emoji = document.getElementById('popupEmoji');
  emoji.style.animation = 'none';
  requestAnimationFrame(() => {
    emoji.style.animation = 'shake 0.5s ease-in-out';
  });
}

function retryYes() {
  closePopup();
  handleYes();
}

function closePopupAndTryAgain() {
  closePopup();
  placeNoButton();
}

function closePopup() {
  document.getElementById('noPopup').classList.remove('show');
}

// ===== TIMELINE =====
const storyEvents = [
  { year: "CLASS 6TH", emoji: "👀", text: "6th class madhye pahilyanda tuzha glimps milla... dusrya section madhye hoti tu. Kaay ek sundar hoti! 😍" },
  { year: "CLASS 7TH", emoji: "💭", text: "7th la tula mahit zhalein mi tujhyavar love karto. Khup dhadas nahi hota, pan mann maanat navhta! 💓" },
  { year: "CLASS 8TH", emoji: "🎉", text: "8th mdhye same section milli! Rozach bhetne, hasne - hou gele mi completely pavagalela! 🥹" },
  { year: "TEACHER MAHIT", emoji: "😬", text: "Amchya teacher la samjla ki kahi tari chalu aahe... thodi tension pan dil khush! 😅" },
  { year: "CORONA 2020", emoji: "😷", text: "Corona ala ani school band... ghara lock. Tuzya vina khup jadvala zaala. Digital love chalu zala! 💬" },
  { year: "CLASS 10TH END", emoji: "🏠", text: "10th ch ending la ghar mahit zhalein amchya badd'l... thoda storm ala. Pan amchi love kahi halali nahi! 💪" },
  { year: "3 APRIL 2024", emoji: "📝", text: "Nanded la JEE paper hota - tuzha paan hota! 4 la maza paper, tuzha morning shift... fate wali mulaqat! ✨" },
  { year: "5 APRIL 2024", emoji: "☕", text: "Cottage Cafe - sab misunderstanding dur zhalein. Amhi vapis ek zhalo. Woh din hamesha yaad raheel! 💕" },
  { year: "4 APRIL 2026", emoji: "🎊", text: "Aaj 2 saal poorn! Tujhya barobar har pal khaas ahe. Happy Anniversary, Meri Pillu Domdy! 🎉💖" },
];

function buildTimeline() {
  const tl = document.getElementById('timeline');
  storyEvents.forEach((event, i) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.animationDelay = (i * 0.1) + 's';
    item.innerHTML = `
      <div class="timeline-dot">${event.emoji}</div>
      <div class="timeline-card">
        <div class="timeline-year">${event.year}</div>
        <div class="timeline-text">${event.text}</div>
      </div>
    `;
    tl.appendChild(item);
  });
}

// ===== HEART CATCH GAME =====
const heartEmojis = ['💖', '💕', '💗', '💓', '❤️', '💝', '🌸', '✨'];
const bombEmojis = ['💔', '😤', '🚫'];

function startGame() {
  document.getElementById('startGameBtn').style.display = 'none';
  document.getElementById('gameResult').style.display = 'none';
  gameScore = 0;
  gameSeconds = 30;
  gameRunning = true;

  document.getElementById('gameScore').textContent = '0';
  document.getElementById('gameTime').textContent = '30';

  const area = document.getElementById('gameArea');
  area.innerHTML = '';

  // Spawn hearts
  gameInterval = setInterval(() => {
    if (!gameRunning) return;
    spawnFallingItem();
  }, 600);

  // Countdown
  gameTimer = setInterval(() => {
    gameSeconds--;
    document.getElementById('gameTime').textContent = gameSeconds;
    if (gameSeconds <= 0) {
      endGame();
    }
  }, 1000);
}

function spawnFallingItem() {
  const area = document.getElementById('gameArea');
  const isBomb = Math.random() < 0.15;
  const emoji = isBomb
    ? bombEmojis[Math.floor(Math.random() * bombEmojis.length)]
    : heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const el = document.createElement('div');
  el.className = 'falling-heart';
  el.textContent = emoji;
  el.dataset.bomb = isBomb ? 'true' : 'false';

  const areaW = area.offsetWidth;
  const x = Math.random() * (areaW - 50) + 10;
  el.style.left = x + 'px';
  el.style.top = '-40px';

  const duration = (Math.random() * 2 + 2) + 's';
  el.style.animationDuration = duration;

  el.addEventListener('click', () => catchItem(el, isBomb));

  area.appendChild(el);

  // Remove after fall
  setTimeout(() => {
    if (el.parentNode) el.remove();
  }, parseFloat(duration) * 1000 + 200);
}

function catchItem(el, isBomb) {
  if (!gameRunning) return;
  const rect = el.getBoundingClientRect();
  const areaRect = document.getElementById('gameArea').getBoundingClientRect();

  // Burst effect
  const burst = document.createElement('div');
  burst.className = 'caught-burst';
  burst.textContent = isBomb ? '💥' : '✨';
  burst.style.left = (rect.left - areaRect.left) + 'px';
  burst.style.top = (rect.top - areaRect.top) + 'px';
  document.getElementById('gameArea').appendChild(burst);
  setTimeout(() => burst.remove(), 600);

  el.remove();

  if (isBomb) {
    gameScore = Math.max(0, gameScore - 3);
    navigator.vibrate && navigator.vibrate(200);
  } else {
    gameScore++;
  }
  document.getElementById('gameScore').textContent = gameScore;
}

function endGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  clearInterval(gameTimer);

  document.getElementById('gameArea').innerHTML = '';

  let msg, emoji;
  if (gameScore >= 20) {
    emoji = '🏆'; msg = `Waah! ${gameScore} hearts pakdlis! Tu ekdum champion ahe! 💖`;
  } else if (gameScore >= 10) {
    emoji = '🥰'; msg = `${gameScore} hearts! Chaan played! Mazaach ala na? 😄`;
  } else {
    emoji = '😅'; msg = `Sirf ${gameScore} hearts? No problem, practice karuya! 😂`;
  }

  const result = document.getElementById('gameResult');
  result.style.display = 'block';
  result.innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:10px;">${emoji}</div>
    <p style="color:white;font-size:1.1rem;">${msg}</p>
    <button class="btn-magic" style="margin-top:20px;" onclick="goTo('screen-final')">
      Pudhcha Surprise Baghuyat! 💝
      <div class="btn-shine"></div>
    </button>
  `;

  document.getElementById('startGameBtn').style.display = 'none';
}

// ===== FIREWORKS =====
function launchFireworks() {
  const fw = document.getElementById('fireworks');
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createFirework(fw), i * 300);
  }
}

function createFirework(container) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight / 2);
  const colors = ['#ff6b9d', '#ffd700', '#c77dff', '#ff4d79', '#00ffcc', '#ffb3c6'];

  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'firework-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = (Math.random() * 6 + 4) + 'px';
    p.style.height = p.style.width;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    const angle = (i / 16) * 360;
    const dist = Math.random() * 120 + 60;
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist;
    const dur = (Math.random() * 0.6 + 0.6) + 's';

    p.style.animationDuration = dur;
    p.style.animationName = 'fireworkExplode';

    // Manual keyframe via JS transform end
    p.style.setProperty('--dx', dx + 'px');
    p.style.setProperty('--dy', dy + 'px');

    // Use transform directly
    p.animate([
      { transform: `translate(0, 0) scale(1)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
    ], {
      duration: parseFloat(dur) * 1000,
      easing: 'ease-out',
      fill: 'forwards'
    });

    container.appendChild(p);
    setTimeout(() => p.remove(), parseFloat(dur) * 1000 + 100);
  }
}

// ===== CONFETTI =====
function launchConfetti(count = 80) {
  const confettiEmojis = ['🎉', '💖', '🌸', '✨', '🎊', '💕', '⭐', '🌟', '🎈'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = '-20px';
      c.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
      c.style.animationDuration = (Math.random() * 2 + 2) + 's';
      c.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }, i * 30);
  }
}

// ===== MOBILE: prevent NO button click =====
document.addEventListener('touchmove', (e) => {
  const noBtn = document.getElementById('noBtn');
  if (!noBtn) return;
  const touch = e.touches[0];
  const rect = noBtn.getBoundingClientRect();
  const dist = Math.sqrt(
    Math.pow(touch.clientX - (rect.left + rect.width/2), 2) +
    Math.pow(touch.clientY - (rect.top + rect.height/2), 2)
  );
  if (dist < 100) {
    escapeNo(e, noBtn);
  }
}, { passive: true });
