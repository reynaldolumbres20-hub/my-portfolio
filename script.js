// IMAGE UPLOAD - Local Save (sa browser/device mo lang)
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');
const uploadStatus = document.getElementById('uploadStatus');

// Load saved image from localStorage
const savedPhoto = localStorage.getItem('savedPhoto');
if (savedPhoto && profileImage) {
    profileImage.src = savedPhoto;
}

// Handle image upload
if (imageUpload) {
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                uploadStatus.innerHTML = '❌ File too large! Max 2MB';
                uploadStatus.style.color = '#ff6b6b';
                setTimeout(() => { uploadStatus.innerHTML = ''; }, 3000);
                return;
            }
            
            // Check file type
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

// Scroll Reveal Animation
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0) translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.inner-card, .projects-card, .achievements-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Parallax effect on mouse move for circles
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
