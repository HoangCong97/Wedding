// Tháng 3 năm 2026: bắt đầu vào Chủ nhật (0)
(function () {
  const WEDDING_DAY = 28;
  const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  // 1/3/2026 là Chủ nhật → startOffset = 0
  const START_OFFSET = 0;
  const TOTAL_DAYS = 31;

  const container = document.getElementById('calendar-container');
  if (!container) return;

  const section = document.createElement('section');
  section.className = 'calendar-section';
  section.setAttribute('aria-label', 'Lịch tháng 3 năm 2026');

  const title = document.createElement('h2');
  title.textContent = 'Tháng 3 / 2026';
  section.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'calendar-grid';

  // Hàng tên thứ
  DAY_NAMES.forEach(function (name) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell day-name';
    cell.textContent = name;
    grid.appendChild(cell);
  });

  // Ô trống đầu tháng
  for (let i = 0; i < START_OFFSET; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-cell empty';
    grid.appendChild(empty);
  }

  // Các ngày trong tháng
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell' + (d === WEDDING_DAY ? ' wedding-day' : '');
    if (d === WEDDING_DAY) {
      cell.setAttribute('aria-label', 'Ngày cưới 28 tháng 3 năm 2026');
      // Tạo SVG trái tim với số 28 ở giữa
      cell.innerHTML = `
        <span class="heart-wrapper">
          <svg viewBox="0 0 48 44" class="heart-svg" width="38" height="35" style="vertical-align:middle;">
            <path d="M24 41s-1.7-1.5-7.2-6.1C7.2 28.1 2 22.9 2 16.5 2 10.7 6.7 6 12.5 6c3.2 0 6.2 1.5 8.1 4C22.8 8.1 25.8 6 29 6 34.8 6 39.5 10.7 39.5 16.5c0 6.4-5.2 11.6-14.8 18.4C25.7 39.5 24 41 24 41z" fill="#ff4fa2" stroke="#e13e7b" stroke-width="2"/>
          </svg>
          <span class="heart-day">28</span>
        </span>
      `;
    } else {
      cell.textContent = d;
    }
    grid.appendChild(cell);
  }

  // Ô trống cuối tháng để lấp đầy hàng cuối
  const totalCells = START_OFFSET + TOTAL_DAYS;
  const remainder = totalCells % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-cell empty';
      grid.appendChild(empty);
    }
  }

  section.appendChild(grid);

  const note = document.createElement('p');
  note.className = 'calendar-note';
  note.textContent = 'Ngày đặc biệt của chúng mình: 28.03.2026';
  section.appendChild(note);

  container.appendChild(section);
})();
