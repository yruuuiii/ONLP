// ===============================
// 初期変数定義（スライダーとカラー）
// ===============================
let current = 0;
let autoSlide;
let currentColor = "white";

// カラーごとの画像マップ
const imageMap = {
  white: ['images/white1.png', 'images/white2.png', 'images/white3.png', 'images/white4.png'],
  black: ['images/black1.png', 'images/black2.png', 'images/black3.png', 'images/black4.png'],
  brown: ['images/brown1.png', 'images/brown2.png', 'images/brown3.png', 'images/brown4.png']
};

// カラーごとの品番マップ
const colorCodes = {
  white: "ON-WHITE001",
  black: "ON-BLACK001",
  brown: "ON-BROWN001"
};

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// ===============================
// スライド表示更新
// ===============================
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i]?.classList.remove('active');
  });
  slides[index].classList.add('active');
  dots[index]?.classList.add('active');
}

// ===============================
// スライダー操作
// ===============================
function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// ===============================
// カラー切り替え
// ===============================
const colorThumbs = document.querySelectorAll('.color-thumb');
colorThumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    colorThumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    currentColor = thumb.dataset.color;
    const newImages = imageMap[currentColor];
    const slideImages = document.querySelectorAll('.slide');

    slideImages.forEach((slide, i) => {
      slide.src = newImages[i];
    });

    current = 0;
    showSlide(current);

    // 商品名と品番を更新
    document.querySelector('.product-info h2').textContent = `Cloudventure ${capitalize(currentColor)}`;
    document.querySelector('.code').textContent = `品番:${colorCodes[currentColor]}`;
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===============================
// FAQ（アコーディオン）処理
// ===============================
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));

    if (!isOpen) {
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===============================
// モーダル表示処理
// ===============================
document.getElementById("open-login")?.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "flex";
});

document.getElementById("loginModal")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = "none";
  }
});

// ===============================
// サイズ選択ボタン
// ===============================
document.querySelectorAll(".sizes button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    document.querySelectorAll(".sizes button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ===============================
// スライダー操作（ボタン・ドット）
// ===============================
document.querySelector('.next')?.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

document.querySelector('.prev')?.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    current = i;
    showSlide(current);
    stopAutoSlide();
    startAutoSlide();
  });
});

// ===============================
// タッチスワイプ対応
// ===============================
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-container')?.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container')?.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (distance > 50) {
    prevSlide();
  } else if (distance < -50) {
    nextSlide();
  }

  stopAutoSlide();
  startAutoSlide();
});

// ===============================
// 初期化処理
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const initialImages = imageMap[currentColor];
  const slideImages = document.querySelectorAll('.slide');
  slideImages.forEach((slide, i) => {
    slide.src = initialImages[i];
  });

  document.querySelector('.product-info h2').textContent = `Cloudventure ${capitalize(currentColor)}`;
  document.querySelector('.code').textContent = `品番:${colorCodes[currentColor]}`;

  showSlide(current);
  startAutoSlide();
});
