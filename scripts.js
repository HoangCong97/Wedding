// Hiệu ứng xuất hiện khi cuộn tới các khối .portrait-item (theo logic .single-portrait.portrait-ready.portrait-inview)
document.addEventListener('DOMContentLoaded', function() {
  var singlePortrait = document.querySelector('.single-portrait');
  if (singlePortrait) {
    singlePortrait.classList.add('portrait-ready');
    function checkInView() {
      var rect = singlePortrait.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 60 && rect.bottom > 60) {
        singlePortrait.classList.add('portrait-inview');
      } else {
        singlePortrait.classList.remove('portrait-inview');
      }
    }
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    checkInView();
  }
});
// Hiệu ứng xuất hiện khi cuộn tới các khối .portrait-item
document.addEventListener('DOMContentLoaded', function() {
  function revealPortraitItems() {
    var items = document.querySelectorAll('.portrait-item');
    var windowHeight = window.innerHeight;
    items.forEach(function(item) {
      var rect = item.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        item.classList.add('show');
      }
    });
  }
  window.addEventListener('scroll', revealPortraitItems);
  revealPortraitItems(); // Kiểm tra lần đầu khi tải trang
});
// Updated openCard function for splitting animation
function openCard() {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.classList.add('split');
    setTimeout(() => {
      cover.style.display = 'none';
    }, 1000); // Matches the transition duration
  }
}

// Dropdown suggestion logic
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('open-wish-dropdown');
  var list = document.getElementById('wish-dropdown-list');
  var textarea = document.getElementById('msg');
  if (btn && list) {
    btn.setAttribute('aria-expanded', 'false');

    function setOpenState(isOpen) {
      list.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      setOpenState(!list.classList.contains('open'));
    });

    list.querySelectorAll('.suggest-dropdown-item').forEach(function(item) {
      item.addEventListener('click', function() {
        textarea.value = item.getAttribute('data-msg');
        textarea.focus();
        setOpenState(false);
      });
    });

    document.addEventListener('click', function(e) {
      if (!list.contains(e.target) && !btn.contains(e.target)) {
        setOpenState(false);
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        setOpenState(false);
      }
    });
  }
});