const firebaseConfig = {
  apiKey: "AIzaSyBLbZ9sruFN_bCuv-MMBTvil1x5gCuG-2w",
  authDomain: "wedding-8f40a.firebaseapp.com",
  projectId: "wedding-8f40a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// gửi comment
function send() {
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("msg").value.trim();

  if (!name || !msg) {
    alert("Nhập đầy đủ nha!");
    return;
  }

  db.collection("comments").add({
    name,
    msg,
    time: Date.now()
  });

  document.getElementById("name").value = "";
  document.getElementById("msg").value = "";
}

// realtime
db.collection("comments")
.orderBy("time", "desc")
.onSnapshot(snapshot => {
  let html = "";
  let count = 0;
  snapshot.forEach(doc => {
    if (count >= 5) return;
    const d = doc.data();
    const date = new Date(d.time || Date.now());
    html += `
      <div class="comment">
        <b>${d.name}</b> <small>${date.toLocaleString()}</small><br>
        ${d.msg}
      </div>
    `;
    count++;
  });
  html += `<button id="showAllCommentsBtn" class="show-all-comments-btn">Hiển thị tất cả lời chúc</button>`;
  document.getElementById("comments").innerHTML = html;
  const btn = document.getElementById("showAllCommentsBtn");
  if (btn) {
    btn.addEventListener("click", function() {
      // Chuyển sang màn hình lời chúc
      window.location.href = "comments.html";
    });
  }
});

// MỞ THIỆP + NHẠC
function openCard() {
  const cover = document.getElementById("cover");
  cover.classList.add("split");
  setTimeout(() => {
    cover.style.display = 'none';
    startIntroAutoScroll();
  }, 1000);
}

function initPortraitAnimation() {
  const portrait = document.querySelector('.single-portrait');
  if (!portrait) return;
  portrait.classList.add('portrait-ready');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        portrait.classList.add('portrait-inview');
        observer.unobserve(portrait);
      }
    });
  }, { threshold: 0.15 });
  observer.observe(portrait);
}

let introSequenceStarted = false;

function startIntroAutoScroll() {
  if (introSequenceStarted) return;
  introSequenceStarted = true;

  const firstSection = document.querySelector(".first-image-section");
  const overlay = document.querySelector(".first-image-overlay");
  if (!firstSection || !overlay) return;

  const lastLine = overlay.querySelector(".wedding-date");
  if (!lastLine) {
    scrollToOverlayTop();
    return;
  }

  lastLine.addEventListener("animationend", () => {
    scrollToOverlayTop();
  }, { once: true });

  firstSection.classList.add("intro-animate");
}

function scrollToOverlayTop() {
  const firstSection = document.querySelector(".first-image-section");
  const overlay = document.querySelector(".first-image-overlay");
  if (!firstSection || !overlay) return;

  const targetTop = Math.max(0, firstSection.offsetTop + firstSection.offsetHeight - overlay.offsetHeight);
  const startTop = window.pageYOffset;
  const distance = targetTop - startTop;
  const duration = 2800;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateScroll(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      initPortraitAnimation();
    }
  }

  requestAnimationFrame(animateScroll);
}

// bật/tắt nhạc
// function toggleMusic() {
//   const m = document.getElementById("music");
//   if (m.paused) m.play();
//   else m.pause();
// }

// countdown
const target = new Date("2026-03-28T17:00:00");

setInterval(() => {
  const el = document.getElementById("countdown");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    el.innerText = "🎉 Đã đến ngày cưới!";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor(diff / 1000) % 60;

  el.innerText = `⏳ ${d} ngày ${h} giờ ${m} phút ${s} giây`;
}, 1000);

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
let touchStartX = 0;
let touchEndX = 0;

// Click ảnh để mở/đóng lightbox
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", function(e) {
    e.stopPropagation();
    if (lightbox.classList.contains("active")) {
      closeLightbox();
    } else {
      lightboxImg.src = this.src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Click ảnh đầu tiên để mở lightbox
const firstImage = document.querySelector(".first-image-section img");
if (firstImage) {
  firstImage.addEventListener("click", function(e) {
    e.stopPropagation();
    if (lightbox.classList.contains("active")) {
      closeLightbox();
    } else {
      lightboxImg.src = this.src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
}

// Đóng lightbox khi click nền
lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Vuốt để đóng
lightboxImg.addEventListener("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
});

lightboxImg.addEventListener("touchend", function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

// Vuốt chuột để đóng (desktop)
let mouseStartX = 0;
lightboxImg.addEventListener("mousedown", function(e) {
  mouseStartX = e.clientX;
});

lightboxImg.addEventListener("mouseup", function(e) {
  const mouseEndX = e.clientX;
  const diff = Math.abs(mouseEndX - mouseStartX);
  if (diff > 50) {
    closeLightbox();
  }
});

// Click vào ảnh lightbox để đóng
lightboxImg.addEventListener("click", function(e) {
  e.stopPropagation();
  closeLightbox();
});

// Cuộn chuột để đóng
lightbox.addEventListener("wheel", function(e) {
  if (lightbox.classList.contains("active")) {
    e.preventDefault();
    closeLightbox();
  }
}, { passive: false });

function handleSwipe() {
  const diff = Math.abs(touchEndX - touchStartX);
  if (diff > 50) {
    closeLightbox();
  }
}

function closeLightbox() {
  lightbox.classList.add("closing");
  document.body.style.overflow = "auto";
  setTimeout(() => {
    lightbox.classList.remove("active");
    lightbox.classList.remove("closing");
  }, 300);
}

function setupPortraitRevealOnScroll() {
  const portraitSection = document.querySelector(".single-portrait");
  if (!portraitSection) return;

  let hasScrolled = false;
  let inView = false;
  let revealed = false;

  const reveal = () => {
    if (revealed || !hasScrolled || !inView) return;
    revealed = true;
    portraitSection.classList.add("portrait-ready");
    requestAnimationFrame(() => {
      portraitSection.classList.add("portrait-inview");
    });
  };

  const onScroll = () => {
    hasScrolled = true;
    reveal();
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    inView = true;
    return;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        inView = entry.isIntersecting;
        if (inView) {
          reveal();
        }
        if (revealed) {
          window.removeEventListener("scroll", onScroll);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.22,
      rootMargin: "0px 0px 26% 0px"
    });

    observer.observe(portraitSection);
    return;
  }

  const fallbackOnScroll = () => {
    const rect = portraitSection.getBoundingClientRect();
    inView = rect.top < window.innerHeight * 1.08;
    if (inView) {
      reveal();
    }
    if (revealed) {
      window.removeEventListener("scroll", fallbackOnScroll);
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", fallbackOnScroll, { passive: true });
}

setupPortraitRevealOnScroll();
