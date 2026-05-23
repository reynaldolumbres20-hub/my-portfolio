// Image Upload
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');

if (imageUpload) {
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                localStorage.setItem('savedPhoto', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

const savedPhoto = localStorage.getItem('savedPhoto');
if (savedPhoto && profileImage) {
    profileImage.src = savedPhoto;
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0) translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for scroll animation
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.circle1, .circle2, .circle3');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    circles.forEach((circle, index) => {
        const speed = 20 + (index * 10);
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255,255,255,0.5)';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s linear';
        const rect = this.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + 'px';
        ripple.style.top = e.clientY - rect.top + 'px';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% { width: 0; height: 0; opacity: 0.5; }
        100% { width: 200px; height: 200px; opacity: 0; }
    }
`;
document.head.appendChild(style);
