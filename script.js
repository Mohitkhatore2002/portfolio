// Portfolio 2055 — Core Interactions

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        delay: 100,
        reset: false,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });

    sr.reveal('.hero > *, .section h2, .card, .project-case-study, .about-content, .contact-info, .contact-form, .metrics-grid, .ai-banner, .agent-terminal, .trajectory-timeline', {
        interval: 100
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. CUSTOM CURSOR
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    
    // Check if device supports hover
    const isHoverable = window.matchMedia('(hover: hover)').matches;

    if (isHoverable && dot && ring) {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        // 10% lerp as per specs
        const speed = 0.1;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the dot
            dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
        });

        // Animate the ring with lag
        function animateRing() {
            ringX += (mouseX - ringX) * speed;
            ringY += (mouseY - ringY) * speed;
            
            ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover states
        const hoverTargets = document.querySelectorAll('a, button, .card, .project-case-study, input, textarea');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => ring.classList.add('hover'));
            target.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    } else if (dot && ring) {
        // Hide custom cursor on mobile/touch devices
        dot.style.display = 'none';
        ring.style.display = 'none';
    }

    // 3. AI THINKING BANNER ROTATION
    const bannerText = document.getElementById('aiBannerText');
    if (bannerText) {
        const prompts = [
            "Thinking: Ask me why Mohit chose MongoDB over MySQL for Porlob...",
            "Analyzing: What architecture powers the AI agent on this site?",
            "Evaluating: Why should I hire someone with 1 year of experience?",
            "Querying: How does Mohit handle zero-downtime schema migrations?",
            "Processing: What does 'architecture-first engineering' mean in practice?"
        ];
        
        let promptIndex = 0;

        setInterval(() => {
            // Remove animation class to reset
            bannerText.style.animation = 'none';
            // Force reflow
            void bannerText.offsetWidth;
            
            promptIndex = (promptIndex + 1) % prompts.length;
            bannerText.textContent = prompts[promptIndex];
            
            // Re-apply animation
            bannerText.style.animation = 'bannerFade 0.5s ease forwards';
        }, 4000);
    }

    // 4. AI AGENT TERMINAL
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');

    if (terminalInput && terminalBody) {
        terminalInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const query = this.value.trim();
                
                // Clear input
                this.value = '';

                // Add user question
                appendTerminalLine('q', query);

                // Add thinking state
                const thinkingId = appendTerminalLine('a', 'Thinking...');

                // Mock API call delay (replace with actual Spring AI endpoint later)
                setTimeout(() => {
                    const thinkingEl = document.getElementById(thinkingId);
                    if (thinkingEl) {
                        thinkingEl.textContent = "This is a mocked response. Connect the Spring AI backend to enable live RAG querying over Mohit's portfolio and architecture decisions.";
                        thinkingEl.style.color = "var(--plasma)";
                    }
                    
                    // Scroll to bottom
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 1500);
            }
        });

        function appendTerminalLine(type, text) {
            const wrapper = document.createElement('div');
            wrapper.className = 'terminal-qa';
            
            const line = document.createElement('div');
            line.className = type === 'q' ? 'terminal-q' : 'terminal-a';
            line.textContent = text;
            
            const id = 'line-' + Date.now();
            line.id = id;

            wrapper.appendChild(line);
            terminalBody.appendChild(wrapper);
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            return id;
        }
    }
});
