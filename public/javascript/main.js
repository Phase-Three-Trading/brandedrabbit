// --- JavaScript for Mobile Menu ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        const iconHamburger = document.getElementById('icon-hamburger');
        const iconClose = document.getElementById('icon-close');
        const header = document.getElementById('header');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconHamburger.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            header.classList.toggle('menu-open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconHamburger.classList.remove('hidden');
                iconClose.classList.add('hidden');
                header.classList.remove('menu-open');
            });
        });

        // Contact form success message
        
        "use strict";

        document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("contact-form");
        if (!form) return; // exit if no form on this page

        const successEl = document.getElementById("form-success");
        const errorEl = document.getElementById("form-error");
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // stop normal submit/redirect
            successEl.textContent = "";
            errorEl.textContent = "";

            // disable button while sending
            submitBtn.disabled = true;
            submitBtn.classList.add("opacity-60", "cursor-not-allowed");

            try {
            const endpoint = "https://formsubmit.co/ajax/f54ffaec74334d67b3c8048b80f2a650";
            const formData = new FormData(form);

            const res = await fetch(endpoint, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (!res.ok) throw new Error("Network error");

            // success
            successEl.textContent = "Thank you for contacting Branded Rabbit, we'll be in touch soon.";
            form.reset();
            } catch (err) {
            errorEl.textContent = "Something went wrong. Please try again or email us directly.";
            console.error(err);
            } finally {
            // re-enable button
            submitBtn.disabled = false;
            submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
            }
        });
        });




        // --- JavaScript for Header, Particles, and Scroll Animations ---
        document.addEventListener('DOMContentLoaded', () => {
            const header = document.getElementById('header');
            const headerNav = document.getElementById('header-nav');
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];

            // --- Header Scroll Logic ---
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('#0d1119', 'backdrop-blur-sm', 'shadow-lg');
                    headerNav.classList.add('py-2');
                    headerNav.classList.remove('py-4');
                } else {
                    header.classList.remove('#0d1119', 'backdrop-blur-sm', 'shadow-lg');
                    headerNav.classList.remove('py-2');
                    headerNav.classList.add('py-4');
                }
            });

            // --- Particle Animation Logic ---
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                const homeSection = document.getElementById('home');
                if (homeSection) {
                    canvas.height = homeSection.offsetHeight;
                }
            }
            window.addEventListener('resize', resizeCanvas);

            class Particle {
                constructor(x, y, dX, dY, size, color) { this.x=x; this.y=y; this.directionX=dX; this.directionY=dY; this.size=size; this.color=color; }
                draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false); ctx.fillStyle=this.color; ctx.fill(); }
                update() {
                    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                    this.x += this.directionX; this.y += this.directionY; this.draw();
                }
            }

            function initParticles() {
                particles = [];
                let num = (canvas.height * canvas.width) / 9000;
                for (let i = 0; i < num; i++) {
                    let size = (Math.random() * 2) + 1;
                    let x = (Math.random() * ((canvas.width - size*2) - (size*2)) + size*2);
                    let y = (Math.random() * ((canvas.height - size*2) - (size*2)) + size*2);
                    let dX = (Math.random()*.4)-.2; let dY = (Math.random()*.4)-.2;
                    let color = 'rgba(249, 115, 22, 0.3)';
                    particles.push(new Particle(x, y, dX, dY, size, color));
                }
            }

            
            


            function connectParticles() {
                for (let a = 0; a < particles.length; a++) {
                    for (let b = a; b < particles.length; b++) {
                        let dist = ((particles[a].x - particles[b].x)**2) + ((particles[a].y - particles[b].y)**2);
                        if (dist < (canvas.width/7)*(canvas.height/7)) {
                            let opacity = 1 - (dist/20000);
                            ctx.strokeStyle = `rgba(107, 114, 128, ${opacity})`;
                            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke();
                        }
                    }
                }
            }

            function animateParticles() {
                requestAnimationFrame(animateParticles);
                ctx.clearRect(0,0,canvas.width, canvas.height);
                for (let i=0; i<particles.length; i++) particles[i].update();
                connectParticles();
            }

            resizeCanvas();
            initParticles();
            animateParticles();

            // --- Scroll-Reveal Logic ---
            const revealElements = document.querySelectorAll('.reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            revealElements.forEach(el => {
                observer.observe(el);
            });

            // --- Landio Card 3D Tilt Effect ---
            const cards = document.querySelectorAll('.landio-card');
            cards.forEach(card => {
                const content = card.querySelector('.landio-card-content');
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const { width, height } = rect;
                    const rotateX = (y / height - 0.5) * -25; // -12.5 to 12.5 deg
                    const rotateY = (x / width - 0.5) * 25;   // -12.5 to 12.5 deg
                    content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
                card.addEventListener('mouseleave', () => {
                    content.style.transform = 'rotateX(0) rotateY(0)';
                });
            });

            // --- "Why Us" Glow Ball Animation Logic ---
            const whyUsItems = document.querySelectorAll('.why-us-item');
            const glowBall = document.getElementById('glow-ball');
            const centralNode = document.getElementById('central-node');

            whyUsItems.forEach(item => {
                const targetNodeId = item.dataset.targetNode;
                const targetNode = document.getElementById(targetNodeId);

                item.addEventListener('mouseenter', () => {
                    const startX = parseFloat(centralNode.getAttribute('cx'));
                    const startY = parseFloat(centralNode.getAttribute('cy'));
                    const endX = parseFloat(targetNode.dataset.cx);
                    const endY = parseFloat(targetNode.dataset.cy);
                    
                    glowBall.setAttribute('cx', startX);
                    glowBall.setAttribute('cy', startY);
                    glowBall.style.opacity = '1';

                    let startTime = null;
                    const duration = 400; // ms

                    function animateGlowBall(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        
                        const currentX = startX + (endX - startX) * progress;
                        const currentY = startY + (endY - startY) * progress;

                        glowBall.setAttribute('cx', currentX);
                        glowBall.setAttribute('cy', currentY);

                        if (progress < 1) {
                            requestAnimationFrame(animateGlowBall);
                        } else {
                            targetNode.classList.add('active');
                            glowBall.style.opacity = '0';
                        }
                    }
                    requestAnimationFrame(animateGlowBall);
                });

                item.addEventListener('mouseleave', () => {
                    targetNode.classList.remove('active');
                });
            });
        });