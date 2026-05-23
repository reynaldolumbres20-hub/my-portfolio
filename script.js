// ========== PROFESSIONAL GATE SYSTEM ==========
const gateOverlay = document.getElementById('gateOverlay');
const mainContent = document.getElementById('mainContentWrapper');
const unlockBtn = document.getElementById('unlockGateBtn');
const leftPanel = document.querySelector('.gate-left-panel');
const rightPanel = document.querySelector('.gate-right-panel');

function openGate() {
    // Open the gate panels
    leftPanel.classList.add('open');
    rightPanel.classList.add('open');
    
    // Wait for gate animation then hide overlay and show content
    setTimeout(() => {
        gateOverlay.classList.add('hide-gate');
        setTimeout(() => {
            gateOverlay.style.display = 'none';
        }, 800);
    }, 800);
    
    // Reveal main content
    setTimeout(() => {
        mainContent.classList.add('reveal-main');
        startTypingAnimation();
        startScrollReveal();
    }, 1000);
}

if (unlockBtn) {
    unlockBtn.addEventListener('click', openGate);
}

// ========== TYPING ANIMATION ==========
const roles = ['Web Developer', 'Graphic Designer', 'IT Graduate'];
let roleIdx = 0, charIdx = 0, deleting = false;
let roleText = null;
let typingTimeout = null;

function startTypingAnimation() {
    roleText = document.getElementById('roleText');
    if (!roleText) return;
    typeRole();
}

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
        typingTimeout = setTimeout(typeRole, 2000);
        return;
    }
    if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingTimeout = setTimeout(typeRole, 500);
        return;
    }
    typingTimeout = setTimeout(typeRole, deleting ? 80 : 120);
}

// ========== SCROLL REVEAL ==========
function startScrollReveal() {
    const revealElements = document.querySelectorAll('.info-card, .project, .achievement');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease';
        revealObserver.observe(el);
    });
}

window.addEventListener('load', function() {
    if (gateOverlay.style.display === 'none') {
        startTypingAnimation();
        startScrollReveal();
    }
});
