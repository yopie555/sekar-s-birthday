/* ================================
   SEKAR'S BIRTHDAY WEBSITE
   JavaScript Animations
   ================================ */

// Falling Flowers Animation
class FallingFlowers {
    constructor() {
        this.container = document.getElementById('falling-flowers');
        this.flowers = ['🌸', '🌷', '🌼', '🌺', '💮', '🏵️'];
        this.isRunning = true;
        this.init();
    }

    init() {
        // Create flowers periodically
        this.createFlowerInterval = setInterval(() => {
            if (this.isRunning) {
                this.createFlower();
            }
        }, 800);

        // Initial burst of flowers
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.createFlower(), i * 200);
        }
    }

    createFlower() {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        flower.textContent = this.flowers[Math.floor(Math.random() * this.flowers.length)];

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        flower.style.left = `${startX}px`;

        // Random size
        const size = 0.8 + Math.random() * 1.2;
        flower.style.fontSize = `${size}rem`;

        // Random duration
        const duration = 6 + Math.random() * 6;
        flower.style.animationDuration = `${duration}s`;

        // Random opacity
        flower.style.opacity = 0.4 + Math.random() * 0.5;

        // Add sway effect with inline style
        const swayAmount = 20 + Math.random() * 40;
        const swayDuration = 2 + Math.random() * 2;
        flower.style.animation = `
            fall ${duration}s linear forwards,
            sway ${swayDuration}s ease-in-out infinite
        `;

        this.container.appendChild(flower);

        // Remove flower after animation ends
        setTimeout(() => {
            if (flower.parentNode) {
                flower.remove();
            }
        }, duration * 1000);
    }

    stop() {
        this.isRunning = false;
        if (this.createFlowerInterval) {
            clearInterval(this.createFlowerInterval);
        }
    }

    start() {
        this.isRunning = true;
        this.init();
    }
}

// Intersection Observer for section animations
class SectionAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateSection(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Observe cards
        document.querySelectorAll('.flower-card, .photo-frame').forEach(card => {
            observer.observe(card);
        });
    }

    animateSection(element) {
        if (element.classList.contains('greeting-section')) {
            this.animateGreeting();
        } else if (element.classList.contains('reasons-section')) {
            this.animateReasons();
        }
    }

    animateGreeting() {
        const greetingTitle = document.querySelector('.greeting-title');
        if (greetingTitle) {
            greetingTitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    }

    animateReasons() {
        const cards = document.querySelectorAll('.flower-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
}

// Smooth scroll with offset
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Parallax effect for stars
class StarParallax {
    constructor() {
        this.stars = document.querySelector('.stars');
        if (this.stars) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (this.stars) {
                this.stars.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Interactive cursor effect
class CursorEffect {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.createSparkle(e.clientX, e.clientY);
        });
    }

    createSparkle(x, y) {
        // Only create sparkle occasionally
        if (Math.random() > 0.95) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 9999;
                animation: sparkle 1s ease-out forwards;
            `;

            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }
}

// Add sparkle animation to stylesheet
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .visible {
        opacity: 1;
    }
`;
document.head.appendChild(sparkleStyle);

// Music Player Controller with Autoplay
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('bg-music');
        this.button = document.getElementById('music-toggle');
        this.icon = this.button.querySelector('.music-icon');
        this.text = this.button.querySelector('.music-text');
        this.isPlaying = false;
        this.hasInteracted = false;
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.toggle());

        // Update button state when audio ends or pauses
        this.audio.addEventListener('play', () => this.updateUI(true));
        this.audio.addEventListener('pause', () => this.updateUI(false));
        this.audio.addEventListener('ended', () => this.updateUI(false));

        // Handle audio loading errors
        this.audio.addEventListener('error', () => {
            console.log('🎵 Tambahkan file music.mp3 ke folder untuk memainkan musik!');
            this.text.textContent = 'No Music';
        });

        // Attempt autoplay on page load
        this.attemptAutoplay();

        // Fallback: Play on first user interaction (for browsers that block autoplay)
        this.setupFirstInteractionPlay();
    }

    attemptAutoplay() {
        // Try to autoplay immediately
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                console.log('🎵 Musik dimulai otomatis!');
                this.hasInteracted = true;
            }).catch(error => {
                // Autoplay was prevented, wait for user interaction
                console.log('🎵 Autoplay diblokir browser. Musik akan dimainkan saat klik pertama.');
                this.showAutoplayHint();
            });
        }
    }

    setupFirstInteractionPlay() {
        const startMusicOnInteraction = (e) => {
            if (!this.hasInteracted && this.audio.paused) {
                this.audio.play().then(() => {
                    this.hasInteracted = true;
                    this.hideAutoplayHint();
                }).catch(err => {
                    console.log('🎵 Gagal memainkan musik:', err.message);
                });
            }
            // Remove listeners after first interaction
            if (this.hasInteracted) {
                document.removeEventListener('click', startMusicOnInteraction);
                document.removeEventListener('touchstart', startMusicOnInteraction);
                document.removeEventListener('keydown', startMusicOnInteraction);
                document.removeEventListener('scroll', startMusicOnInteraction);
            }
        };

        // Listen for any user interaction
        document.addEventListener('click', startMusicOnInteraction);
        document.addEventListener('touchstart', startMusicOnInteraction);
        document.addEventListener('keydown', startMusicOnInteraction);
        document.addEventListener('scroll', startMusicOnInteraction, { once: true });
    }

    showAutoplayHint() {
        // Show a subtle hint that music will play on interaction
        this.button.classList.add('waiting');
        this.text.textContent = 'Klik untuk musik';
    }

    hideAutoplayHint() {
        this.button.classList.remove('waiting');
    }

    toggle() {
        this.hasInteracted = true;
        if (this.audio.paused) {
            this.audio.play().catch(e => {
                console.log('🎵 Musik tidak bisa dimainkan:', e.message);
                alert('Tambahkan file "music.mp3" ke folder yang sama dengan index.html untuk memainkan musik! 🎵');
            });
        } else {
            this.audio.pause();
        }
    }

    updateUI(playing) {
        this.isPlaying = playing;
        if (playing) {
            this.button.classList.add('playing');
            this.icon.textContent = '🎶';
            this.text.textContent = 'Pause';
        } else {
            this.button.classList.remove('playing');
            this.icon.textContent = '🎵';
            this.text.textContent = 'Play';
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize falling flowers
    const fallingFlowers = new FallingFlowers();

    // Initialize section animations
    new SectionAnimator();

    // Initialize smooth scroll
    new SmoothScroll();

    // Initialize star parallax
    new StarParallax();

    // Initialize cursor effect
    new CursorEffect();

    // Initialize music player
    new MusicPlayer();

    // Console message
    console.log('🌸 Selamat Ulang Tahun Sekar! 🌸');
    console.log('🌷 Website ini dibuat dengan penuh cinta 💕');

    // Optional: Reduce flowers on mobile for performance
    if (window.innerWidth < 768) {
        // Reduce flower frequency on mobile
        fallingFlowers.stop();
        setInterval(() => {
            if (document.querySelectorAll('.falling-flower').length < 10) {
                fallingFlowers.createFlower();
            }
        }, 1500);
    }
});

// Easter egg: Click on main title to trigger flower burst
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('opening-title') ||
        e.target.classList.contains('name-highlight')) {
        const container = document.getElementById('falling-flowers');
        const flowers = ['🌸', '🌷', '🌼', '🌺', '💮', '🏵️', '💐', '🌹'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const flower = document.createElement('div');
                flower.className = 'falling-flower';
                flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
                flower.style.left = `${e.clientX + (Math.random() - 0.5) * 200}px`;
                flower.style.top = `${e.clientY}px`;
                flower.style.fontSize = `${1 + Math.random() * 1.5}rem`;
                flower.style.animation = `fall ${4 + Math.random() * 4}s linear forwards`;
                container.appendChild(flower);

                setTimeout(() => flower.remove(), 8000);
            }, i * 50);
        }
    }
});
