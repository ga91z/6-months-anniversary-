// ── FLOATING PETALS ──
const emojis = ['😌','🌯','🌮','🐷'];
for (let i = 0; i < 14; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = emojis[i % emojis.length];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
  p.style.animationDuration = (12 + Math.random() * 16) + 's';
  p.style.animationDelay = (Math.random() * 14) + 's';
  document.body.appendChild(p);
}

// ── TIMELINE SCROLL REVEAL ──
const moments = document.querySelectorAll('.moment');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
moments.forEach(m => obs.observe(m));

// ── QUIZ DATA ──
const questions = [
  {
    q: "what's my usual coffee order",
    opts: ["Iced Americano", "Spanish Latte", "Vanilla Cold Brew", "Flat White"],
    ans: 1
  },
  {
    q: "if I had to eat one food for the rest of my life",
    opts: ["Burgers", "Wings", "Sushi", "Pizza"],
    ans: 2
  },
  {
    q: "Wings or burgers",
    opts: ["Wings", "Burgers", "both, they just both peak", "I'd rather have sushi"],
    ans: 0
  },
  {
    q: "what's my favorite anime (right now) may change soon btw",
    opts: ["code geass", "owari no seraph", "evangelion", "frieren", "Fullmetal alchemist"],
    ans: 3
  },
  {
    q: "what's my favorite manga",
    opts: ["jojo", "claymore", "berserk", "punpun"],
    ans: 2
  },
  {
    q: "Vanilla or chocolate",
    opts: ["Chocolate", "Vanilla", "Both", "Neither"],
    ans: 1
  },
  {
    q: "favorite movie I think",
    opts: ["terminator 2", "Green Book", "La La Land", "Parasite"],
    ans: 1
  }
];

let current = 0, score = 0, answered = false;

const feedbacks = {
  good: ["hmph u got it right", "well it's easy anyway hmph", "good girl", "whatever", "awwww u know that :3" ],
  bad:  ["just say u hate me", "die", "so u just want me to die", "BAD GF"]
};

function initQuiz() {
  current = 0; score = 0; answered = false;
  document.getElementById('quiz-result').style.display = 'none';
  document.querySelector('.quiz-progress').style.display = 'flex';
  document.getElementById('q-label').style.display = '';
  document.getElementById('q-text').style.display = '';
  document.getElementById('q-options').style.display = '';
  document.getElementById('q-feedback').style.display = '';
  document.getElementById('q-next').style.display = '';
  buildProgressBars();
  showQ();
}

function buildProgressBars() {
  const pb = document.getElementById('progress-bars');
  pb.innerHTML = '';
  questions.forEach(() => {
    const b = document.createElement('div');
    b.className = 'quiz-progress-bar';
    pb.appendChild(b);
  });
}

function showQ() {
  answered = false;
  const q = questions[current];
  document.getElementById('q-label').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('q-text').textContent = q.q;
  const opts = document.getElementById('q-options');
  opts.innerHTML = '';
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = o;
    btn.onclick = () => pick(i);
    opts.appendChild(btn);
  });
  const fb = document.getElementById('q-feedback');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
  const next = document.getElementById('q-next');
  next.className = 'quiz-next';
  next.textContent = current < questions.length - 1 ? 'Next →' : 'See Results 🎉';
}

function pick(i) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const opts = document.querySelectorAll('.quiz-opt');
  const fb = document.getElementById('q-feedback');
  const bars = document.querySelectorAll('.quiz-progress-bar');

  if (i === q.ans) {
    opts[i].className = 'quiz-opt correct';
    score++;
    const msg = feedbacks.good[Math.floor(Math.random() * feedbacks.good.length)];
    fb.textContent = msg;
    fb.className = 'quiz-feedback show good';
    bars[current].classList.add('done');
  } else {
    opts[i].className = 'quiz-opt wrong';
    opts[q.ans].className = 'quiz-opt reveal';
    const msg = feedbacks.bad[Math.floor(Math.random() * feedbacks.bad.length)];
    fb.textContent = msg + ' The answer was: ' + q.opts[q.ans];
    fb.className = 'quiz-feedback show bad';
  }
  document.getElementById('q-next').className = 'quiz-next show';
}

function nextQ() {
  current++;
  if (current < questions.length) {
    showQ();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector('.quiz-progress').style.display = 'none';
  document.getElementById('q-label').style.display = 'none';
  document.getElementById('q-text').style.display = 'none';
  document.getElementById('q-options').style.display = 'none';
  document.getElementById('q-feedback').style.display = 'none';
  document.getElementById('q-next').style.display = 'none';

  const res = document.getElementById('quiz-result');
  res.style.display = 'block';
  document.getElementById('result-score').textContent = score + '/' + questions.length;

  let msg;
  if (score === 7)      msg = "AWWWWWW gf u did well thx btw :3 I love you so much happy anniversary :3";
  else if (score >= 5)  msg = "u could've been better at least u got most of them right ;(";
  else if (score >= 3)  msg = "HMPH, JUST HMPH";
  else                  msg = "BAD GF NOT EVEN 3 RIGHT HMPH KYS NOT HAPPY ANNIVERSARY ILL KMS";

  document.getElementById('result-msg').textContent = msg;
}

function restartQuiz() {
  initQuiz();
}

// ── INIT ──
initQuiz();
