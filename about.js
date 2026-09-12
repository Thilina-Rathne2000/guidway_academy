lucide.createIcons();

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
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

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  lucide.createIcons();
});
