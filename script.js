// Gallery modal data
const galleryData = [
    {
        title: "Mobile App Development",
        description: "Building responsive and user-friendly mobile applications for iOS and Android platforms. I specialize in creating smooth, intuitive interfaces that engage users and deliver exceptional experiences across all devices.",
        tags: ["React Native", "Flutter", "Responsive"]
    },
    {
        title: "UI/UX Design",
        description: "Creating beautiful and functional user interfaces with focus on user experience. I design wireframes, prototypes, and high-fidelity mockups that translate ideas into engaging digital products with stunning visuals.",
        tags: ["Figma", "Adobe XD", "Prototyping"]
    },
    {
        title: "Web Development",
        description: "Full-stack web development using modern technologies like React, Node.js, and various databases. I build scalable, performant web applications that solve real-world problems and deliver exceptional user experiences.",
        tags: ["React", "Node.js", "Web Apps"]
    },
    {
        title: "API Development",
        description: "Designing and building robust REST and GraphQL APIs that power modern applications. I ensure security, performance, and scalability in all API implementations with best practices and documentation.",
        tags: ["REST API", "GraphQL", "Backend"]
    },
    {
        title: "Data Analytics",
        description: "Analyzing complex datasets to provide actionable insights. I use Python, SQL, and visualization tools to help businesses make data-driven decisions and understand patterns in their data.",
        tags: ["Python", "SQL", "Visualization"]
    },
    {
        title: "AI/ML Solutions",
        description: "Implementing machine learning models for various applications including classification, prediction, and natural language processing. I help businesses leverage AI to improve their products and gain competitive advantages.",
        tags: ["TensorFlow", "Python", "AI"]
    }
];

// Open modal
function openModal(index) {
    const modal = document.getElementById('galleryModal');
    const item = galleryData[index];
    
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDescription').textContent = item.description;
    
    // Update image based on index
    const images = [
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E📱%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='24' fill='white' text-anchor='middle'%3EMobile App%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f5576c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E🎨%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='24' fill='white' text-anchor='middle'%3EUI/UX Design%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234facfe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2300f2fe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E💻%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='24' fill='white' text-anchor='middle'%3EWeb Development%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fa709a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fee140;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad4)'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E🚀%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='24' fill='white' text-anchor='middle'%3EAPI Development%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2330cfd0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23330867;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad5)'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E📊%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='24' fill='white' text-anchor='middle'%3EData Analytics%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23a8edea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fed6e3;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad6)'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E🤖%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='24' fill='white' text-anchor='middle'%3EAI/ML Solutions%3C/text%3E%3C/svg%3E"
    ];
    
    document.getElementById('modalImage').src = images[index];
    
    // Update tags
    const tags = item.tags;
    document.getElementById('tag1').textContent = tags[0] || '';
    document.getElementById('tag2').textContent = tags[1] || '';
    document.getElementById('tag3').textContent = tags[2] || '';
    
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scrolling and Active Nav Link
const navItems = document.querySelectorAll('.nav-link');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    });
});

// Scroll Event - Update Active Nav Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll Animation - Fade In Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .stat, .testimonial-card, .info-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Responsive Navigation
function handleResize() {
    if (window.innerWidth > 768) {
        if (navLinks) {
            navLinks.style.display = 'flex';
        }
    } else {
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Smooth scroll behavior
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

console.log('✨ Portfolio website with interactive gallery loaded successfully!');