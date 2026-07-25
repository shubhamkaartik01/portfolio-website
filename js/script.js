/* ============================================================
   SCRIPT.JS — All JavaScript functionality
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. LOADING SCREEN
    // ============================================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 700);
    });

    // ============================================================
    // 2. THEME TOGGLE (with Local Storage)
    // ============================================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ============================================================
    // 3. TYPING EFFECT
    // ============================================================
    const typedText = document.getElementById('typedText');
    const typedCursor = document.getElementById('typedCursor');
    const roles = ['Frontend Developer', 'Web Designer', 'Problem Solver', 'Creative Thinker'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (!isDeleting) {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            setTimeout(typeEffect, 80);
        } else {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 300);
                return;
            }
            setTimeout(typeEffect, 40);
        }
    }
    typeEffect();

    // ================================================================================
    // 3B title effect
    // ==================================================================================

    const titleTypedText = document.getElementById('titleTypedText');
    const titleCursor = document.getElementById('titleCursor');

    const titleWords = ['Kumar', 'Kaartik'];  // Words to alternate
    let titleIndex = 0;
    let titleCharIndex = 0;
    let titleIsDeleting = false;

    function titleTypeEffect() {
        const currentWord = titleWords[titleIndex];

        if (!titleIsDeleting) {
            // Typing forward
            titleTypedText.textContent = currentWord.substring(0, titleCharIndex + 1);
            titleCharIndex++;

            if (titleCharIndex === currentWord.length) {
                // Word complete → pause before deleting
                titleIsDeleting = true;
                setTimeout(titleTypeEffect, 3000);  // Wait 2 seconds
                return;
            }
            setTimeout(titleTypeEffect, 100);  // Typing speed
        } else {
            // Deleting backward
            titleTypedText.textContent = currentWord.substring(0, titleCharIndex - 1);
            titleCharIndex--;

            if (titleCharIndex === 0) {
                // Fully deleted → switch to next word
                titleIsDeleting = false;
                titleIndex = (titleIndex + 1) % titleWords.length;
                setTimeout(titleTypeEffect, 300);  // Pause before typing next
                return;
            }
            setTimeout(titleTypeEffect, 50);  // Deleting speed
        }
    }

    // Start the title typing effect
    titleTypeEffect();

    // ============================================================
    // 4. NAVBAR — Mobile toggle, scroll spy, active link
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Scroll Spy & Active Link
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);

    // ============================================================
    // 5. SMOOTH SCROLL (for anchor links)
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 6. BACK TO TOP BUTTON
    // ============================================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    // 7. SCROLL REVEAL (Intersection Observer)
    // ============================================================
    const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================================
    // 8. COUNTER ANIMATION
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + '+';
                clearInterval(interval);
            } else {
                el.textContent = current;
            }
        }, 20);
    }

    // ============================================================
    // 9. SKILLS — Render cards with progress bars
    // ============================================================
    const skillsData = [
        { name: 'HTML5', icon: 'fab fa-html5', desc: 'Semantic, accessible markup', progress: 90 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', desc: 'Modern layouts, animations', progress: 85 },
        { name: 'JavaScript', icon: 'fab fa-js', desc: 'ES6+, DOM, AJAX', progress: 80 },
        { name: 'Git', icon: 'fab fa-git-alt', desc: 'Version control', progress: 75 },
        { name: 'GitHub', icon: 'fab fa-github', desc: 'Collaboration, repositories', progress: 70 },
        { name: 'Responsive Design', icon: 'fas fa-mobile-alt', desc: 'Mobile-first, fluid grids', progress: 88 },
        { name: 'REST API', icon: 'fas fa-cloud', desc: 'Fetch, Axios, JSON', progress: 72 },
        { name: 'DOM Manipulation', icon: 'fas fa-code', desc: 'Dynamic content, events', progress: 82 },
        { name: 'ES6+', icon: 'fab fa-js-square', desc: 'Arrow functions, classes, modules', progress: 78 },
        { name: 'JSON', icon: 'fas fa-database', desc: 'Data interchange, parsing', progress: 70 },
        { name: 'AJAX', icon: 'fas fa-sync-alt', desc: 'Asynchronous requests', progress: 68 },
        { name: 'Local Storage', icon: 'fas fa-save', desc: 'Client-side storage', progress: 65 },
        { name: 'Performance Optimization', icon: 'fas fa-tachometer-alt', desc: 'Lazy load, minify', progress: 60 }
    ];

    const skillsGrid = document.getElementById('skillsGrid');
    skillsData.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card fade-up';
        card.innerHTML = `
            <div class="skill-icon"><i class="${skill.icon}"></i></div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-desc">${skill.desc}</div>
            <div class="skill-progress">
                <div class="skill-progress-bar" data-progress="${skill.progress}"></div>
            </div>
        `;
        skillsGrid.appendChild(card);
    });

    // Animate progress bars on scroll
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.skill-progress-bar');
                if (bar) {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => progressObserver.observe(card));

    // ============================================================
    // 10. PROJECTS — Render with filter
    // ============================================================
    const projectsData = [
        // {
        //     name: 'QuizMaster',
        //     desc: 'Interactive quiz app with dynamic questions and score tracking.',
        //     tech: ['HTML', 'CSS', 'JavaScript'],
        //     category: 'javascript',
        //     live: '#',
        //     github: '#'
        // },
        {
            src: "/assert/project-01-weather.png",
            name: 'Weather App',
            desc: 'Real-time weather data using OpenWeatherMap API with location search.',
            tech: ['JavaScript', 'API', 'CSS'],
            category: 'api',
            live: 'https://weatherwebsite01.netlify.app/',
            github: 'https://github.com/shubhamkaartik01/weather-app'
        },
        {
            src: "/assert/project-02-portfolio.png",
            name: 'Portfolio Website',
            desc: 'Modern, responsive portfolio for a developer (this very site).',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'responsive',
            live: '#',
            github: '#'
        },
        {
            src: "/assert/project-03-task.png",
            name: 'Task Management App',
            desc: 'Kanban-style task board with drag & drop and local storage.',
            tech: ['JavaScript', 'Local Storage', 'CSS'],
            category: 'javascript',
            live: 'https://shubhamkaartik-todolistproject.netlify.app/',
            github: 'https://github.com/shubhamkaartik01/ToDoList-webpage'
        },
        // {
        //     src: "#",
        //     name: 'Student Management System',
        //     desc: 'CRUD app for managing student records with search and filter.',
        //     tech: ['JavaScript', 'JSON', 'Bootstrap'],
        //     category: 'javascript',
        //     live: '#',
        //     github: '#'
        // }
    ];

    const projectsGrid = document.getElementById('projectsGrid');

    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
        filtered.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card fade-up';
            card.innerHTML = `
                <div class="project-img">
                    <img src="${proj.src}" alt="">
                </div>
                <div class="project-body">
                    <h3>${proj.name}</h3>
                    <p>${proj.desc}</p>
                    <div class="project-tech">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${proj.live}" class="live" target="_blank"><i class="fas fa-eye"></i> Live</a>
                        <a href="${proj.github}" class="github" target="_blank"><i class="fab fa-github"></i> Code</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
        // Re-trigger fade-up
        document.querySelectorAll('.project-card').forEach(el => {
            setTimeout(() => el.classList.add('visible'), 100);
        });
    }

    renderProjects();

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });

    // ============================================================
    // 11. SERVICES — Render
    // ============================================================
    const servicesData = [
        { name: 'Website Developer', icon: 'fas fa-pencil-ruler', desc: 'Modern, aesthetic UI/UX Developer' },
        { name: 'Frontend Development', icon: 'fas fa-code', desc: 'Clean, responsive code' },
        { name: 'Responsive Website', icon: 'fas fa-mobile-alt', desc: 'Mobile-first, adaptive layouts' },
        { name: 'Landing Page Development', icon: 'fas fa-landmark', desc: 'High-converting landing pages' },
        { name: 'Website Maintenance', icon: 'fas fa-tools', desc: 'Updates, bug fixes, performance' },
        { name: 'Bug Fixing', icon: 'fas fa-bug', desc: 'Debugging and issue resolution' },
        { name: 'UI Development', icon: 'fas fa-layer-group', desc: 'Pixel-perfect interfaces' }
    ];

    const servicesGrid = document.getElementById('servicesGrid');
    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card fade-up';
        card.innerHTML = `
            <i class="${service.icon}"></i>
            <h4>${service.name}</h4>
            <p>${service.desc}</p>
        `;
        servicesGrid.appendChild(card);
    });

    // ============================================================
    // 12. TIMELINE — Render
    // ============================================================
    const timelineData = [
        { date: '2023 – 2026', title: 'BCA — Bachelor Of Computer Application', desc: 'Graduated with focus on web development and programming.' },
        { date: '2023 – 2024', title: 'Java', desc: 'Studied core Java concepts such as classes, objects, inheritance, polymorphism, exception handling, collections, and basic application development.' },
        { date: '2024 – 2025', title: 'Python', desc: 'Built a strong foundation in Python programming, problem-solving, and core programming concepts through hands-on practice.' },
        { date: '2025 – 2026', title: 'Frontend Development Learning', desc: 'Intensive self-study: HTML, CSS, JavaScript, responsive design.' },
        { date: '2025', title: 'JavaScript Mastery', desc: 'Deep dive into ES6, DOM, APIs, and building interactive projects.' },
        { date: '2026 – Present', title: 'Current Learning', desc: 'Exploring React, TypeScript, and advanced frontend architectures.' }
    ];

    const timelineContainer = document.getElementById('timelineItems');
    timelineData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item fade-up';
        div.innerHTML = `
            <div class="date">${item.date}</div>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        `;
        timelineContainer.appendChild(div);
    });

    // ============================================================
    // 13. CERTIFICATES — Render
    // ============================================================
    const certificatesData = [
        { title: 'Java', provider: 'Great Learning', src: '/certificate/Java_Certificate.jpg', icon: 'fa-brands fa-java' },
        { title: 'Java DSA', provider: 'Great Learning', src: '/certificate/Java_DSA_Certificate.jpg', icon: 'fa-brands fa-java' },
        { title: 'Responsive Web Design', provider: 'freeCodeCamp', src: '', icon: 'fa-duotone fa-globe-www' },
        { title: 'Frontend Development', provider: 'Udemy', src: '', icon: 'fas fa-certificate' },
        { title: 'Git & GitHub', provider: 'LinkedIn Learning', src: '', icon: 'fas fa-certificate' }
    ];

    const certGrid = document.getElementById('certificatesGrid');
    certificatesData.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card fade-up';
        card.innerHTML = `
            <div class="cert-img"><i class="${cert.icon}"></i></div>
            <h4>${cert.title}</h4>
            <p>${cert.provider}</p>
            <a href="${cert.src}" target="_blank" class="btn btn-primary btn-sm">View Certificate</a>
        `;
        certGrid.appendChild(card);
    });

    // ============================================================
    // 14. FORM VALIDATION
    // ============================================================
    // const form = document.getElementById('contactForm');
    // const fullName = document.getElementById('fullName');
    // const email = document.getElementById('email');
    // const subject = document.getElementById('subject');
    // const message = document.getElementById('message');
    // const successMsg = document.getElementById('formSuccess');

    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     let valid = true;

    //     // Reset errors
    //     document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
    //     successMsg.classList.remove('show');

    //     // Validate Full Name
    //     if (fullName.value.trim() === '') {
    //         document.getElementById('fullNameError').classList.add('show');
    //         valid = false;
    //     }
    //     // Validate Email
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailPattern.test(email.value.trim())) {
    //         document.getElementById('emailError').classList.add('show');
    //         valid = false;
    //     }
    //     // Validate Subject
    //     if (subject.value.trim() === '') {
    //         document.getElementById('subjectError').classList.add('show');
    //         valid = false;
    //     }
    //     // Validate Message
    //     if (message.value.trim() === '') {
    //         document.getElementById('messageError').classList.add('show');
    //         valid = false;
    //     }

    //     if (valid) {
    //         successMsg.classList.add('show');
    //         form.reset();
    //         setTimeout(() => successMsg.classList.remove('show'), 5000);
    //     }
    // });

// ============================================================
// CONTACT FORM – Formspree Integration (Fixed)
// ============================================================

const form = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const successMsg = document.getElementById('formSuccess');
const submitBtn = form.querySelector('button[type="submit"]');

// ----- Helper: Show error for a field -----
function showError(fieldId) {
    document.getElementById(fieldId + 'Error').classList.add('show');
}

// ----- Helper: Hide all errors -----
function hideAllErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
}

// ----- Form submit handler -----
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Reset previous errors & success
    hideAllErrors();
    successMsg.classList.remove('show');

    // 2. Validate each field
    let valid = true;

    if (fullName.value.trim() === '') {
        showError('fullName');
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError('email');
        valid = false;
    }

    if (subject.value.trim() === '') {
        showError('subject');
        valid = false;
    }

    if (message.value.trim() === '') {
        showError('message');
        valid = false;
    }

    if (!valid) return;

    // 3. Disable button & show spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // 4. Build JSON data object
    const data = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim()
    };

    // 5. Send to Formspree as JSON
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',   // ✅ fixed spelling
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)                // ✅ use 'data', not 'formData'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errData => {
                throw new Error(errData.error || 'Server error');
            });
        }
    })
    .then(() => {
        successMsg.classList.add('show');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        setTimeout(() => successMsg.classList.remove('show'), 6000);
    })
    .catch(error => {
        console.error('Formspree Error:', error);
        alert('❌ Oops! Something went wrong. Please try again or contact me directly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });
});


    // ============================================================
    // 15. BUTTON RIPPLE EFFECT
    // ============================================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================================
    // 16. CUSTOM CURSOR (Desktop only)
    // ============================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        // Scale on hover interactive elements
        document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .service-card, .cert-card, .social-link')
            .forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorDot.style.width = '16px';
                    cursorDot.style.height = '16px';
                    cursorOutline.style.width = '50px';
                    cursorOutline.style.height = '50px';
                    cursorOutline.style.borderColor = 'var(--secondary-color)';
                });
                el.addEventListener('mouseleave', () => {
                    cursorDot.style.width = '8px';
                    cursorDot.style.height = '8px';
                    cursorOutline.style.width = '36px';
                    cursorOutline.style.height = '36px';
                    cursorOutline.style.borderColor = 'var(--primary-color)';
                });
            });

        // Hide cursor on mobile (if resized)
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                cursorDot.style.display = 'none';
                cursorOutline.style.display = 'none';
            } else {
                cursorDot.style.display = 'block';
                cursorOutline.style.display = 'block';
            }
        });
    } else {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // ============================================================
    // 17. LAZY LOADING (placeholder for images)
    // ============================================================
    // All images are placeholder icons; no actual images to lazy load.
    // But we add a generic lazy load for any <img> with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    });

    // ============================================================
    // 18. ADD FADE-UP CLASS TO SECTIONS FOR ANIMATION
    // ============================================================
    document.querySelectorAll('.section > .container').forEach(el => {
        el.classList.add('fade-up');
    });

    // ============================================================
    // 19. SCROLL SPY TRIGGER UPDATE
    // ============================================================
    updateActiveLink();

    console.log('Portfolio website loaded successfully!');
});