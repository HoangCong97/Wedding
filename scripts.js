// Moved inline scripts from index.html
function openCard() {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.classList.add('hide');
    setTimeout(() => {
      cover.style.display = 'none';
    }, 1000);
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