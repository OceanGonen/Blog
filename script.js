const floatUpBtn = document.getElementById('float-up');
const sinkDownBtn = document.getElementById('sink-down');
const sections = document.querySelectorAll('section');
let snapTimer = null;
let programmaticScroll = false;

function getCurrentSection() {
    let currentSection = 0;

    //Source: https://stackoverflow.com/questions/44172651/difference-between-getboundingclientrect-top-and-offsettop?
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            currentSection = index;
        }
    });
    return currentSection;
}

function isFooterInView() {
    const footer = document.querySelector('footer');
    if (!footer) return false;
    const rect = footer.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function scrollToCenter(sectionIndex) {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
        const section = sections[sectionIndex];

        //Source:https://stackoverflow.com/questions/11529070/scroll-to-the-center-of-viewport?
        const top = section.offsetTop + (section.offsetHeight / 2) - (window.innerHeight / 2);

        programmaticScroll = true;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        setTimeout(() => { programmaticScroll = false; }, 800);
    }
}

function snapToNearestSection() {
    const footer = document.querySelector('footer');
    const footerRect = footer.getBoundingClientRect();

    if (footerRect.top < window.innerHeight) {
        // Footer is at least partially visible
        if (footerRect.top > 0) {
            // Footer is sliding in from the bottom — snap to show it fully
            programmaticScroll = true;
            footer.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { programmaticScroll = false; }, 800);
        }
        return;
    }

    const viewportCenter = window.scrollY + window.innerHeight / 2;
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    sections.forEach((section, index) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
        }
    });

    scrollToCenter(nearestIndex);
}


function updateButtons() {
    const section = getCurrentSection();

    floatUpBtn.style.display = 'none';
    sinkDownBtn.style.display = 'none';

    if (isFooterInView()) {
        floatUpBtn.style.display = 'block';
        return;
    }

    if (section > 0) {
        floatUpBtn.style.display = 'block';
        sinkDownBtn.style.display = 'block';
    }
}


floatUpBtn.addEventListener('click', () => {
    if (isFooterInView()) {
        scrollToCenter(sections.length - 1);
        return;
    }
    scrollToCenter(getCurrentSection() - 1);
});

sinkDownBtn.addEventListener('click', () => {
    const section = getCurrentSection();
    if (section === sections.length - 1) {
        programmaticScroll = true;
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { programmaticScroll = false; }, 800);
        return;
    }
    scrollToCenter(section + 1);
});

window.addEventListener('scroll', () => {
    updateButtons();
    if (programmaticScroll) return;
    clearTimeout(snapTimer);
    snapTimer = setTimeout(snapToNearestSection, 300);
});
window.addEventListener('load', updateButtons);
updateButtons();


//Glowing cursor in deep
const glowElems = document.querySelectorAll('section:not(:first-of-type), footer');

glowElems.forEach((section, index) => {
    section.addEventListener('mousemove', e => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const opacity = 0.1 + (index * 0.105);

        section.style.setProperty('--cursorX', x + 'px');
        section.style.setProperty('--cursorY', y + 'px');
        section.style.setProperty('--glowOpacity', opacity);
    });

    section.addEventListener('mouseleave', () => {
        section.style.setProperty('--glowOpacity', 0);
    });
});



//Water particles
const particleContainer = document.getElementById('particle-container');
const particleCount = 50;

// Create the particles
for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 1 + 'px';
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

    particleContainer.appendChild(particle);
}

// Update color based on depth
window.addEventListener('scroll', () => {
    const pageHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // Update Particle Visibility
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => {
        if (scrollY < pageHeight) {
            p.style.opacity = '0';
        } else {
            p.style.opacity = '0.4';
        }
    });

    if (scrollY >= pageHeight) {
        const r = Math.floor(255 - (scrollPercent * (255 - 66)));
        const g = 255;
        const b = 255;
        const newColor = `rgb(${r}, ${g}, ${b})`;
        particleContainer.style.setProperty('--particle-color', newColor);
    }
});

// Projects — data + row generation + popover
(function () {
    const projects = [
        {
            title: 'Annotation Tool - Human Centered Design',
            shortDesc: 'Korte beschrijving',
            longDesc: 'Hier komt nog een lange beschrijving',
            tech: ['HTML', 'CSS', 'JavaScript'],
            thumb: 'images/projects/HCD/HCD-thumbnail.png',
            preview: 'images/projects/HCD/HCD-preview.png',
            github: 'https://github.com/OceanGonen/Human-Centered-Design',
        },
        {
            title: 'LiChess Game Analyzer',
            shortDesc: 'Korte beschrijving',
            longDesc: 'Hier komt nog een lange beschrijving',
            tech: ['API', 'Astro', 'JavaScript', 'CSS', 'Chart.js'],
            thumb: 'images/projects/API/API-thumbnail.png',
            preview: 'images/projects/API/API-preview.png',
            github: 'https://github.com/OceanGonen/astro.project',
        },
        {
            title: 'NS style Tax Forum',
            shortDesc: 'Korte beschrijving',
            longDesc: 'Hier komt nog een lange beschrijving',
            tech: ['HTML', 'CSS', 'JavaScript'],
            thumb: 'images/projects/BT/BT-thumbnail.png',
            preview: 'images/projects/BT/BT-preview.png',
            github: 'https://github.com/OceanGonen/NSformulier',
        },
        {
            title: 'Blackjack + basic strategy tool',
            shortDesc: 'Korte beschrijving',
            longDesc: 'Hier komt nog een lange beschrijving',
            tech: ['JavaScript'],
            thumb: 'images/projects/IP/IP-thumbnail.png',
            preview: 'images/projects/IP/IP-preview.png',
            github: 'https://github.com/OceanGonen',
        },
        {
            title: 'Spaceship Simulator, (almost) CSS only',
            shortDesc: 'Korte beschrijving',
            longDesc: 'Hier komt nog een lange beschrijving',
            tech: ['CSS'],
            thumb: 'images/projects/CSS/CSS-thumbnail.png',
            preview: 'images/projects/CSS/CSS-preview.png',
            github: 'https://github.com/OceanGonen/CSS-eindopdracht',
        },
        {
            title: 'PetMatch',
            shortDesc: 'Korte beschrijving',
            longDesc: 'Hier komt nog een lange beschrijving',
            tech: ['JavaScript', 'JSON', 'API'],
            thumb: 'https://placehold.co/90x65/0a1232/6b99d9?text=img',
            preview: 'https://placehold.co/400x140/0a1232/6b99d9?text=Preview',
            github: 'https://github.com/DiegoR03/ProjectTech',
        },

    ];

    const list = document.getElementById('projects-list');
    const popover = document.getElementById('project-popover');
    const layout = document.querySelector('.projects-layout');

    if (!list || !popover || !layout) return;

    const popoverImg = popover.querySelector('.popover-img');
    const popoverTitle = popover.querySelector('.popover-title');
    const popoverDesc = popover.querySelector('.popover-desc');
    const popoverLink = popover.querySelector('.popover-link');

    projects.forEach(project => {
        const row = document.createElement('div');
        row.className = 'project-row';

        const thumb = document.createElement('img');
        thumb.className = 'project-thumb';
        thumb.src = project.thumb;
        thumb.alt = project.title + ' thumbnail';
        thumb.width = 90;
        thumb.height = 65;

        const info = document.createElement('div');
        info.className = 'project-row-info';

        const titleEl = document.createElement('span');
        titleEl.className = 'project-title';
        titleEl.textContent = project.title;

        const descEl = document.createElement('span');
        descEl.className = 'project-short-desc';
        descEl.textContent = project.shortDesc;

        const pillsEl = document.createElement('div');
        pillsEl.className = 'project-pills';
        project.tech.forEach(t => {
            const pill = document.createElement('span');
            pill.className = 'pill';
            pill.textContent = t;
            pillsEl.appendChild(pill);
        });

        info.appendChild(titleEl);
        info.appendChild(descEl);
        info.appendChild(pillsEl);
        row.appendChild(thumb);
        row.appendChild(info);

        row.addEventListener('mouseenter', () => {
            popoverTitle.textContent = project.title;
            popoverDesc.textContent = project.longDesc;
            popoverLink.href = project.github;
            popoverImg.src = project.preview;
            popoverImg.style.display = 'block';
            popover.classList.add('visible');
        });

        list.appendChild(row);
    });

    layout.addEventListener('mouseleave', () => {
        popover.classList.remove('visible');
    });
})();

//Section 1. Weekly Nerd essay viewer ///////////////////////////////////////////////////////////////

(function () {
    const speakers = [
        {
            name: 'Johan Huijkman',
            topic: 'Accessibility',
            date: 'Feb 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [

            ],
        },

        {
            name: 'Kilian Valkof',
            topic: 'Progressive Enhancement',
            date: 'Mar 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [
            ],
        },
        {
            name: 'Peter Paul Koch',
            topic: 'Browser tech',
            date: 'Mar 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [
            ],
        },
        {
            name: 'Nils Binder',
            topic: 'Webdesign bij 9Elements',
            date: 'Apr 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [
            ],
        },
        {
            name: 'Robert Broersma',
            topic: 'Systeem richtlijnen',
            date: 'Apr 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [
            ],
        },
        {
            name: 'Rosa',
            topic: 'Tinkering & digital infrastructure',
            date: 'May 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [
            ],
        },

        {
            name: 'Niels Leenheer',
            topic: 'Creatieve CSS Experimenten',
            date: 'May 2025',
            title: 'title',
            subtitle: 'subtitle',
            essay: [
            ],
        },
    ];

    const speakerList = document.getElementById('wn-speaker-list');
    const essayPanel = document.getElementById('wn-essay-panel');
    const titleEl = document.getElementById('wn-essay-title');
    const subtitleEl = document.getElementById('wn-essay-subtitle');
    const numberEl = document.getElementById('wn-essay-number');
    const dateEl = document.getElementById('wn-essay-date');
    const bodyEl = document.getElementById('wn-essay-body');

    if (!speakerList || !essayPanel) return;

    function showEssay(index) {
        const s = speakers[index];
        numberEl.textContent = `#${index + 1}`;
        dateEl.textContent = s.date;
        titleEl.textContent = s.title;
        subtitleEl.textContent = s.subtitle;
        bodyEl.innerHTML = s.essay.map(p => `<p>${p}</p>`).join('');

        essayPanel.classList.remove('animating');
        void essayPanel.offsetWidth;
        essayPanel.classList.add('animating');

        speakerList.querySelectorAll('.wn-speaker-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
    }

    speakers.forEach((s, i) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'wn-speaker-btn';
        btn.setAttribute('aria-label', `Essay over ${s.name} — ${s.topic}`);
        btn.innerHTML = `<span class="wn-speaker-name">${s.name}</span><span class="wn-speaker-topic">${s.topic}</span>`;
        btn.addEventListener('click', () => showEssay(i));
        li.appendChild(btn);
        speakerList.appendChild(li);
    });

    showEssay(0);
})();

//Section 2. Projects //////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const cards = entry.target.querySelectorAll('.goal-card');

            if (entry.isIntersecting) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal');
                    }, index * 200);
                });
            } else {
                cards.forEach(card => {
                    card.classList.remove('reveal');
                });
            }
        });
    }, observerOptions);

    const leerdoelenSection = document.querySelector('#leerdoelen');
    if (leerdoelenSection) {
        observer.observe(leerdoelenSection);
    }
});

//Project list, :before & :after 
const projectsList = document.getElementById('projects-list');

function updateListFades() {
    const atTop = projectsList.scrollTop <= 2;
    const atBottom = projectsList.scrollTop + projectsList.clientHeight >= projectsList.scrollHeight - 2;

    projectsList.classList.toggle('scrolled-top', atTop);
    projectsList.classList.toggle('scrolled-bottom', atBottom);
}

projectsList.addEventListener('scroll', updateListFades);
updateListFades();

//Section 4. Kanban — CSS-only, no JS needed.
