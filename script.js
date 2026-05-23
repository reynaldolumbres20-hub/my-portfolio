// ========== IMAGE UPLOAD ==========
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');
const uploadStatus = document.getElementById('uploadStatus');

const savedPhoto = localStorage.getItem('savedPhoto');
if (savedPhoto && profileImage) {
    profileImage.src = savedPhoto;
}

if (imageUpload) {
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                uploadStatus.innerHTML = '❌ File too large! Max 2MB';
                uploadStatus.style.color = '#ff6b6b';
                setTimeout(() => { uploadStatus.innerHTML = ''; }, 3000);
                return;
            }
            
            if (!file.type.match('image.*')) {
                uploadStatus.innerHTML = '❌ Please select an image file!';
                uploadStatus.style.color = '#ff6b6b';
                setTimeout(() => { uploadStatus.innerHTML = ''; }, 3000);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                localStorage.setItem('savedPhoto', e.target.result);
                uploadStatus.innerHTML = '✅ Profile picture updated!';
                uploadStatus.style.color = '#4ecdc4';
                setTimeout(() => { uploadStatus.innerHTML = ''; }, 3000);
            };
            reader.readAsDataURL(file);
        }
    });
}

// ========== TYPING ANIMATION ==========
const roles = ['Web Developer', 'Graphic Designer', 'IT Graduate'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.querySelector('.typed-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    setTimeout(typeEffect, isDeleting ? 100 : 150);
}

if (typedTextElement) {
    setTimeout(typeEffect, 500);
}

// ========== COUNTING STATS ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        updateNumber();
    });
}

// Trigger stats when in view
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
    observer.observe(statsRow);
}

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.premium-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});

// ========== PARALLAX EFFECT ==========
document.addEventListener('mousemove', (e) => {
    const overlay = document.querySelector('.bg-overlay');
    if (overlay) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        overlay.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});
