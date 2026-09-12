lucide.createIcons();

const schoolBanners = document.querySelectorAll('.hero-course-banner');
let schoolBannerIndex = 0;

if (schoolBanners.length > 1) {
  setInterval(() => {
    schoolBanners[schoolBannerIndex].classList.remove('is-active');
    schoolBannerIndex = (schoolBannerIndex + 1) % schoolBanners.length;
    schoolBanners[schoolBannerIndex].classList.add('is-active');
  }, 3800);
}

const courseMenuToggle = document.querySelector('.menu-toggle');
const courseNavLinks = document.querySelector('#nav-links');
const coursesDropdown = document.querySelector('.nav-dropdown');
const coursesTrigger = document.querySelector('.nav-dropdown-trigger');

if (coursesDropdown && coursesTrigger) {
  const setCoursesExpanded = (isExpanded) => {
    coursesTrigger.setAttribute('aria-expanded', isExpanded);
  };

  coursesDropdown.addEventListener('mouseenter', () => setCoursesExpanded(true));
  coursesDropdown.addEventListener('mouseleave', () => setCoursesExpanded(false));
  coursesTrigger.addEventListener('focus', () => setCoursesExpanded(true));
  coursesTrigger.addEventListener('blur', () => setCoursesExpanded(false));
}

courseMenuToggle.addEventListener('click', () => {
  const isOpen = courseNavLinks.classList.toggle('open');
  courseMenuToggle.setAttribute('aria-expanded', isOpen);
  courseMenuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  lucide.createIcons();
});

const filters = document.querySelectorAll('.filter-button');
const tiles = document.querySelectorAll('.course-tile');
const emptyState = document.querySelector('.catalogue-empty');
const searchInput = document.querySelector('#course-search');
const searchClear = document.querySelector('.search-clear');
let activeFilter = 'all';
const detailTargets = {
  design: 'course-details.html#school-design',
  future: 'course-details.html#school-foundation',
  leadership: 'course-details.html#school-growth'
};

tiles.forEach((tile) => {
  const target = tile.classList.contains('tile-business') ? 'course-details.html#school-business' : detailTargets[tile.dataset.category];
  if (target) tile.href = target;
});

const updateCatalogue = () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  tiles.forEach((tile) => {
    const matchesFilter = activeFilter === 'all' || tile.dataset.category === activeFilter;
    const matchesSearch = !query || tile.textContent.toLowerCase().includes(query);
    const isVisible = matchesFilter && matchesSearch;
    tile.classList.toggle('is-hidden', !isVisible);
    if (isVisible) visibleCount += 1;
  });

  searchClear.classList.toggle('is-visible', Boolean(query));
  emptyState.classList.toggle('is-visible', visibleCount === 0);
};

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    activeFilter = filter.dataset.filter;
    filters.forEach((button) => button.classList.toggle('is-active', button === filter));
    updateCatalogue();
  });
});

searchInput.addEventListener('input', updateCatalogue);
searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
  updateCatalogue();
});
