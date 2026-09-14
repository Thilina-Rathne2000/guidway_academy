lucide.createIcons();

const heroSlides = document.querySelectorAll('.hero-slide');
const heroSlideCount = document.querySelector('.hero-slide-count');
const heroSlideProgress = document.querySelector('.hero-slide-line span');
let heroSlideIndex = 0;

const showHeroSlide = (nextIndex) => {
  heroSlides[heroSlideIndex].classList.remove('is-active');
  heroSlideIndex = nextIndex % heroSlides.length;
  heroSlides[heroSlideIndex].classList.add('is-active');
  if (heroSlideCount) heroSlideCount.textContent = String(heroSlideIndex + 1).padStart(2, '0');
  if (heroSlideProgress) heroSlideProgress.style.width = `${((heroSlideIndex + 1) / heroSlides.length) * 100}%`;
};

if (heroSlides.length > 1) {
  setInterval(() => showHeroSlide(heroSlideIndex + 1), 5200);
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const coursesDropdown = document.querySelector('.nav-dropdown');
const coursesTrigger = document.querySelector('.nav-dropdown-trigger');

const setCoursesExpanded = (isExpanded) => {
  coursesTrigger.setAttribute('aria-expanded', isExpanded);
};

coursesDropdown.addEventListener('mouseenter', () => setCoursesExpanded(true));
coursesDropdown.addEventListener('mouseleave', () => setCoursesExpanded(false));
coursesTrigger.addEventListener('focus', () => setCoursesExpanded(true));
coursesTrigger.addEventListener('blur', () => setCoursesExpanded(false));

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  lucide.createIcons();
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

const stories = [
  {
    quote: 'Northstar gave me the confidence to stop waiting for permission and start building the thing I had been thinking about for years.',
    name: 'Elena Cruz',
    role: 'Product designer, Mexico City',
    initials: 'EC',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85'
  },
  {
    quote: 'I came for a course and found a way of working that has changed how I show up every day.',
    name: 'Samira Okafor',
    role: 'Founder, Lagos',
    initials: 'SO',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=85'
  },
  {
    quote: 'The projects made the learning stick. I finished with a portfolio piece I was genuinely proud of.',
    name: 'Theo Martin',
    role: 'Creative developer, London',
    initials: 'TM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85'
  }
];
let storyIndex = 0;
const quote = document.querySelector('.large-quote');
const personName = document.querySelector('.person strong');
const personRole = document.querySelector('.person div span');
const personAvatar = document.querySelector('.person-avatar');
const testimonialSection = document.querySelector('.testimonial-section');
let testimonialTimer;

const renderStory = (direction) => {
  storyIndex = (storyIndex + direction + stories.length) % stories.length;
  const story = stories[storyIndex];
  quote.style.opacity = '0';
  quote.style.transform = 'translateY(10px)';
  setTimeout(() => {
    quote.textContent = story.quote;
    personName.textContent = story.name;
    personRole.textContent = story.role;
    personAvatar.src = story.image;
    personAvatar.alt = story.name;
    quote.style.opacity = '1';
    quote.style.transform = 'translateY(0)';
  }, 100);
};

document.querySelectorAll('.quote-controls .icon-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    renderStory(index === 1 ? 1 : -1);
  });
});

const startTestimonialAutoSlide = () => {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => renderStory(1), 4000);
};

testimonialSection.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
testimonialSection.addEventListener('mouseleave', startTestimonialAutoSlide);
testimonialSection.addEventListener('focusin', () => clearInterval(testimonialTimer));
testimonialSection.addEventListener('focusout', (event) => {
  if (!testimonialSection.contains(event.relatedTarget)) startTestimonialAutoSlide();
});
startTestimonialAutoSlide();
