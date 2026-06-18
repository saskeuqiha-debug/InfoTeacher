// ===== СЛАЙДЕР ДЛЯ ДИПЛОМОВ =====
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}
// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ ДЛЯ МЕТОДИКИ =====
// ===== АНИМАЦИЯ ДЛЯ МЕТОДИКИ (ЛЕВЫЕ И ПРАВЫЕ КАРТОЧКИ) =====
function checkMethodVisibility() {
    const leftCards = document.querySelectorAll('.method-card-left');
    const rightCards = document.querySelectorAll('.method-card-right');
    
    leftCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add('visible-left');
        }
    });
    
    rightCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add('visible-right');
        }
    });
}

window.addEventListener('scroll', checkMethodVisibility);
window.addEventListener('load', checkMethodVisibility);
// ===== ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ ДЛЯ ОТЗЫВОВ =====
const scrollWrapper = document.querySelector('.reviews-scroll-wrapper');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

if (scrollLeftBtn && scrollRightBtn && scrollWrapper) {
    scrollLeftBtn.addEventListener('click', () => {
        scrollWrapper.scrollBy({ left: -400, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        scrollWrapper.scrollBy({ left: 400, behavior: 'smooth' });
    });
}
// ===== ПЛАВНЫЙ СКРОЛЛ ДЛЯ МЕНЮ =====
document.querySelectorAll('.nav-links a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// ===== АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ СКРОЛЛЕ =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150; // смещение для активации чуть раньше
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
// ===== АНИМАЦИЯ СЧЁТЧИКОВ ПРИ ДОСТИЖЕНИИ БЛОКА =====
let countersStarted = false;
let countersAnimationRunning = false;

function animateCounters() {
    if (countersAnimationRunning) return;
    countersAnimationRunning = true;
    
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const duration = 30;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                setTimeout(updateCounter, duration);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

function checkCountersTrigger() {
    if (countersStarted) return;
    
    const achievementsSection = document.querySelector('#achievements');
    if (!achievementsSection) return;
    
    const sectionTop = achievementsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Если блок достижений виден в окне
    if (sectionTop < windowHeight - 50 && sectionTop + achievementsSection.offsetHeight > 0) {
        countersStarted = true;
        animateCounters();
    }
}

// Проверка при скролле
window.addEventListener('scroll', checkCountersTrigger);
// Проверка при загрузке
window.addEventListener('load', checkCountersTrigger);
// Проверка при клике на меню (на случай если перешли по ссылке)
document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#achievements') {
            setTimeout(checkCountersTrigger, 300);
        }
    });
});
