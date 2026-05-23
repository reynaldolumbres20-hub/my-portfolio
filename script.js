// Image Upload
const uploadInput = document.getElementById('uploadInput');
const profileImg = document.getElementById('profileImg');
const uploadMsg = document.getElementById('uploadMsg');

const savedImg = localStorage.getItem('savedProfileImg');
if (savedImg && profileImg) {
    profileImg.src = savedImg;
}

if (uploadInput) {
    uploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                uploadMsg.innerHTML = '❌ Max 2MB only';
                uploadMsg.style.color = '#ff6b6b';
                setTimeout(() => uploadMsg.innerHTML = '', 3000);
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                localStorage.setItem('savedProfileImg', e.target.result);
                uploadMsg.innerHTML = '✅ Profile updated!';
                uploadMsg.style.color = '#4ecdc4';
                setTimeout(() => uploadMsg.innerHTML = '', 3000);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Typing Animation
const roles = ['Web Developer', 'Graphic Designer', 'IT Graduate'];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
    if (!roleText) return;
    const current = roles[roleIdx];
    if (deleting) {
        roleText.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        roleText.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }
    if (!deleting && charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, 2000);
        return;
    }
    if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeRole, 500);
        return;
    }
    setTimeout(typeRole, deleting ? 80 : 120);
}
setTimeout(typeRole, 500);

// Scroll Reveal
const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.info-card, .project, .achievement').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.5s ease';
    reveal.observe(el);
});
