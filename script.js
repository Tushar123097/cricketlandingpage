// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Three.js Cricket Ball Animation
const cricketAnimation = document.getElementById('cricket-animation');
let scene, camera, renderer, ball, bat;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, cricketAnimation.clientWidth / cricketAnimation.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(cricketAnimation.clientWidth, cricketAnimation.clientHeight);
    cricketAnimation.appendChild(renderer.domElement);

    // Create cricket ball
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100
    });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Create cricket bat
    const batGeometry = new THREE.BoxGeometry(0.2, 2, 0.1);
    const batMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    bat = new THREE.Mesh(batGeometry, batMaterial);
    bat.position.set(1, 0, 0);
    scene.add(bat);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Ball animation
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    ball.position.y = Math.sin(Date.now() * 0.001) * 0.5;

    // Bat animation
    bat.rotation.z = Math.sin(Date.now() * 0.001) * 0.5;

    renderer.render(scene, camera);
}

// Initialize Three.js when the window loads
window.addEventListener('load', initThreeJS);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 5%';
        navbar.style.background = 'rgba(34, 38, 41, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 5%';
        navbar.style.background = 'rgba(34, 38, 41, 0.9)';
    }
});

// Hero section animations
gsap.from('.hero h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero p', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.cta-button', {
    duration: 1,
    y: 20,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
});

// Match cards animations
gsap.utils.toArray('.match-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Player cards animations
gsap.utils.toArray('.player-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Highlight cards animations
gsap.utils.toArray('.highlight-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Join section animation
gsap.from('.join-content', {
    scrollTrigger: {
        trigger: '.join-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Button hover effects
const buttons = document.querySelectorAll('.cta-button, .join-button, .book-tickets');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Scroll to top button
const scrollTop = document.querySelector('.scroll-top');
scrollTop.addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: 0
        },
        ease: 'power3.inOut'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.style.opacity = '1';
        scrollTop.style.visibility = 'visible';
    } else {
        scrollTop.style.opacity = '0';
        scrollTop.style.visibility = 'hidden';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (renderer) {
        camera.aspect = cricketAnimation.clientWidth / cricketAnimation.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(cricketAnimation.clientWidth, cricketAnimation.clientHeight);
    }
}); 