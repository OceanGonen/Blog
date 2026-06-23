const floatUpBtn = document.getElementById('float-up');
const sinkDownBtn = document.getElementById('sink-down');
const sections = document.querySelectorAll('section');
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

function scrollToSection(sectionIndex) {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
        programmaticScroll = true;
        window.scrollTo({ top: sections[sectionIndex].offsetTop, behavior: 'smooth' });
        setTimeout(() => { programmaticScroll = false; }, 800);
    }
}

function snapToNearestSection() {
    const footer = document.querySelector('footer');
    const footerRect = footer ? footer.getBoundingClientRect() : null;

    if (footerRect && footerRect.top < window.innerHeight) {
        // Footer is at least partially visible
        if (footerRect.top > 0) {
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


function updateNavDots(activeIndex) {
    document.querySelectorAll('.section-nav-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === activeIndex);
    });
}

function updateButtons() {
    const section = getCurrentSection();
    const sectionNav = document.getElementById('section-nav');

    floatUpBtn.style.display = 'none';
    sinkDownBtn.style.display = 'none';
    if (sectionNav) sectionNav.classList.remove('visible');

    if (isFooterInView()) {
        floatUpBtn.style.display = 'block';
        if (sectionNav) sectionNav.classList.add('visible');
        updateNavDots(section);
        return;
    }

    if (section > 0) {
        floatUpBtn.style.display = 'block';
        sinkDownBtn.style.display = 'block';
        if (sectionNav) sectionNav.classList.add('visible');
    }

    updateNavDots(section);
}


floatUpBtn.addEventListener('click', () => {
    if (isFooterInView()) {
        scrollToSection(sections.length - 1);
        return;
    }
    scrollToSection(getCurrentSection() - 1);
});

sinkDownBtn.addEventListener('click', () => {
    const section = getCurrentSection();
    if (section === sections.length - 1) {
        programmaticScroll = true;
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => { programmaticScroll = false; }, 800);
        return;
    }
    scrollToSection(section + 1);
});

window.addEventListener('scroll', () => {
    updateButtons();
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

// Projecten: data + row generation + popover
(function () {
    const projects = [
        {
            title: 'Sprint 0',
            shortDesc: 'Persoonlijke one-pager',
            longDesc: 'Lees over mijn denkwijze, leerdoelen en passies',
            tech: ['HTML', 'CSS', 'JavaScript'],
            thumb: 'images/projects/Sprint0/Sprint0-thumbnail.png',
            preview: 'images/projects/Sprint0/Sprint0-preview.png',
            github: 'https://oceangonen.github.io/onepager-WebDD/',
        },
        {
            title: 'Browser Technology',
            shortDesc: 'Erfbelasting formulier in de huisstijl van NS',
            longDesc: 'Geleerd te werken met progressive enhancement en positive user feedback',
            tech: ['HTML', 'CSS', 'JavaScript'],
            thumb: 'images/projects/BT/BT-thumbnail.png',
            preview: 'images/projects/BT/BT-preview.png',
            github: 'https://github.com/OceanGonen/NSformulier',
        },

        {
            title: 'CSS to the Rescue',
            shortDesc: '(Mostly) CSS only',
            longDesc: 'POV skeuromorfisch spaceship cockpit',
            tech: ['CSS'],
            thumb: 'images/projects/CSS/CSS-thumbnail.png',
            preview: 'images/projects/CSS/CSS-preview.png',
            github: 'https://github.com/OceanGonen/CSS-eindopdracht',
        },
        {
            title: 'Human Centered Design',
            shortDesc: 'Toegankelijke Annotatie tool',
            longDesc: 'Dit project is gebouwd volgens de Exclusive Design principes van Vasilis van Gemert. In plaats van te ontwerpen voor een breed publiek, is alles hier gemaakt voor één specifieke persoon: Roger.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            thumb: 'images/projects/HCD/HCD-thumbnail.png',
            preview: 'images/projects/HCD/HCD-preview.png',
            github: 'https://github.com/OceanGonen/Human-Centered-Design',
        },
        {
            title: 'API',
            shortDesc: 'LiChess Game finder/analyzer',
            longDesc: 'Een Lichess schaakanalyse tool gebouwd met Astro. De applicatie haalt via de Lichess API de geanalyseerde schaakpartijen van een speler op en visualiseert de ratingontwikkeling over tijd als een interactieve grafiek. ',
            tech: ['API', 'Astro', 'JavaScript', 'CSS', 'Chart.js'],
            thumb: 'images/projects/API/API-thumbnail.png',
            preview: 'images/projects/API/API-preview.png',
            github: 'https://github.com/OceanGonen/astro.project',
        },
        {
            title: 'Hackathon',
            shortDesc: 'Informatie pagina over Nebula',
            longDesc: 'Nebula is een project vanuit SRON om meer te weten te komen over zwarte gaten',
            tech: ['JavaScript', 'CSS', 'Animations'],
            thumb: 'images/projects/Hackathon/Hackathon-thumbnail.png',
            preview: 'images/projects/Hackathon/Hackathon-preview.png',
            github: 'https://github.com/OceanGonen/nebula2',
        },

        {
            title: 'Meesterproef',
            shortDesc: 'Videlio is een stichting die zich inzet voor de onafhankelijkheid van blinden of slechtzienden.',
            longDesc: 'Voor onze schoolopdracht mogen wij voor deze stichting een nieuwe website ontwikkelen. We willen met onze website echt Videlio uitstralen; Iedereen is welkom en kan bijdragen.',
            tech: ['JavaScript', 'Astro', 'API', 'CSS'],
            thumb: 'images/projects/Meesterproef/Meesterproef-thumbnail.png',
            preview: 'images/projects/Meesterproef/Meesterproef-preview.png',
            github: 'https://github.com/hendrythomas/wdd-videlio-2026',
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
            name: 'Kilian Valkof',
            topic: 'Progressive Enhancement',
            date: '04-02-26',
            title: 'Kilian Valkof',
            subtitle: 'Progressive Enhancement',
            essay: [
                'Kilian had het over The Rule of Least Power, dus eigenlijk komt het erop neer dat je altijd de minst krachtige taal moet pakken die werkt. HTML voor CSS voor JavaScript, in die volgorde nadenken. Hij legde uit dat HTML en CSS declaratief zijn en JS imperatief, en dat declaratief gewoon makkelijker te snappen en te onderhouden is.',
                'Hij liet een paar dingen zien die me wel verrasten. Een custom checkbox kan zonder JS, je zet appearance none, voegt een before element toe en speelt met checked. Smooth scrollen kan ook gewoon met scroll behavior smooth in je CSS, daar heb je geen jQuery voor nodig, ook al lijkt jQuery soms korter, onder water draait het zelf nog op allerlei imperatieve trucjes. Voor een fixed header gebruik je trouwens scroll margin in plaats van een normale margin, anders verdwijnt je content er gewoon achter.',
                'Wat ik grappig vond was dat hij liet zien dat je accordions ook gewoon met details en summary kan bouwen. Je kan zelf het open attribute zetten, maar zodra de gebruiker erop klikt is het verder aan de browser, jij bepaalt alleen de beginstand. Het pijltje verander je met summary marker, en met een open summary marker selector laat je hem omdraaien.',
                'Voor popups raadde hij dialog aan in plaats van alert of confirm, en hij legde uit dat animaties daarop eerst lastig waren omdat er geen beginpunt was om vanaf te animeren. Dat is nu opgelost met starting style.',
                'Het stukje dat me het meest bijbleef was zijn uitleg over prefers reduced motion. Hij zei dat je niet eerst alles vol animatie moet bouwen en dan reduced motion eruit moet slopen, maar precies andersom. Bouw eerst de rustige, toegankelijke versie en voeg daarna animatie toe voor mensen die geen voorkeur hebben aangegeven. Dat vond ik eigenlijk een hele logische manier van denken die ik zelf nog niet zo had bekeken.',
                'Aan het einde noemde hij nog field sizing content, waarmee een input meegroeit met de tekst, en appearance base select, waarmee je een select volledig kan stylen. Hij verwees naar Baseline om bij te houden wat er al breed ondersteund wordt.',
                'Ik vond Kilian wel een sterke spreker. Hij liet veel concrete voorbeelden zien in plaats van alleen maar theorie, en daardoor bleef het overzichtelijk. Het enige is dat hij soms best snel door de slides ging, waardoor ik een paar dingen pas later kon terugzoeken.'
            ],
        },
        {
            name: 'Peter Paul Koch',
            topic: 'Browser tech',
            date: '19-02-26',
            title: 'Peter Paul Koch',
            subtitle: 'Browser tech',
            essay: [
                'Peter Paul Koch begon eigenlijk heel basaal, hij legde uit dat het internet gewoon een manier is om data van A naar B te sturen, en dat het web daar een specifiek onderdeel van is, namelijk webpaginas die van A naar B gaan. Daarna liet hij zien dat een browser eigenlijk uit losse onderdelen bestaat die niks van elkaar afweten. Je hebt een rendering engine die HTML en CSS verwerkt, een aparte JavaScript engine, en dan nog de DOM en de AOM, waarbij de DOM de pagina leesbaar maakt voor JavaScript en de AOM hetzelfde doet maar dan specifiek voor screenreaders.',
                'Hij liet ook zien hoe JavaScript precies geladen wordt. Zonder iets erbij voert de browser een script meteen uit, met defer wordt eerst alle HTML ingeladen en pas daarna het script, en met async maakt het niet uit wanneer, als het maar niet meteen is. Ook legde hij uit dat CSS een eigen parser heeft die best lang kan duren, waardoor je soms even HTML zonder styling op je scherm ziet. Layout veranderen tijdens het laden noemde hij ook zwaar voor de browser, bijvoorbeeld als er ineens een extra kolom bijkomt.',
                'Het stuk browsergeschiedenis vond ik het leukste deel. Mosaic was de eerste met plaatjes, Internet Explorer maakte indruk door gratis te zijn, en Konqueror was rond 2000 een belangrijke browser voor Linux. Apple koos die als basis voor hun eigen rendering engine omdat ze anders wilden zijn maar het zichzelf niet te moeilijk wilden maken, en daar is uiteindelijk webkit uit ontstaan. Chrome bouwde eerst op webkit voort en splitste dat later af naar Blink. Tegenwoordig draaien bijna alle browsers op dezelfde rendering engine, op een paar uitzonderingen na zoals Ladybird en het Spaanse, worker owned bedrijf Igalia, die nog hun eigen engines bouwen.',
                'Wat me het meest bijbleef was zijn uitleg over backwards compatibility. Alles wat ooit op het web heeft gewerkt blijft voor altijd werken, browsers halen nooit iets weg. Hij noemde zelfs de Internet Explorer 6 modus, die je nog steeds kan triggeren door simpelweg de doctype weg te halen. Logisch klinkt het wel, maar het zorgt er ook voor dat er allerlei opties blijven bestaan die voor ons nu eigenlijk nergens meer op slaan.',
                'Ik vond het wel een soort mindfuck dat Koch ondanks alles nog steeds vooraan lijkt te staan als het om browserontwikkeling gaat. Ik had nooit zo goed beseft hoe jong het web eigenlijk nog is, en dit hoorcollege maakte dat ineens heel concreet.',
                'Koch vond ik een fijne spreker om naar te luisteren, hij bracht best technische stof op een rustige manier, met genoeg geschiedenis ertussendoor om het niet droog te laten worden. Het enige is dat het soms wat los van elkaar stond, het voelde meer als een verzameling interessante feiten dan als één lijn, maar inhoudelijk leerde ik er wel veel van.'
            ],
        },
        {
            name: 'Nils Binder',
            topic: 'Webdesign bij 9Elements',
            date: '04-03-26',
            title: 'Nils Binder',
            subtitle: 'Webdesign bij 9Elements',
            essay: [
                'Nils had net als Peter Paul het over hoe het werkveld vroeger was, en dat vond ik weer leuk om te horen, het went niet snel hoe rap dit vakgebied verandert. Hij werkt zelf bij 9elements, waar communication design, product development en web development gewoon nauw met elkaar samenwerken. Hij was ook heel enthousiast over CSS day en zei dat hij daar graag heen wil, wat ik wel grappig vond om te horen van iemand die zelf al zo ervaren is.',
                'Hij vertelde dat designers vroeger met Photoshop werkten, en dat het best lastig was om dat naar werkende code te vertalen. Tools als Figma maken dat nu makkelijker, maar volgens Nils zorgt dat ook voor minder creativiteit, omdat we nu allemaal dezelfde gespecialiseerde tools gebruiken en daardoor ook steeds dezelfde soort websites bouwen. Vroeger kon je met Photoshop dingen ontwerpen die op het web simpelweg niet mogelijk waren, en nu is het eigenlijk omgekeerd, er kan zoveel meer op het web dan Figma je laat zien, dus die tool beperkt je juist.',
                'Verder liet hij creatieve manieren zien om grid en whitespace te gebruiken, bijvoorbeeld door fr eenheden te gebruiken om ruimte asymmetrisch te verdelen, zoiets als grid template columns met 2fr 3fr auto 1fr. Hij liet ook subgrid zien, waarbij rijen van het parent element hergebruikt worden, zodat alles netjes uitgelijnd blijft zelfs als maar één van de kindelementen van grootte verandert.',
                'Het stuk dat me het meest bijbleef was zijn uitleg over een soort stopmotion effect, waarbij je een lange strip van afbeeldingen stap voor stap laat animeren met steps in plaats van een vloeiende animatie of video. Dat wil ik zelf zeker een keer proberen. Hij noemde ook nog view transitions om bijvoorbeeld van taal te wisselen op een pagina.',
                'Ik vond Nils echt een sterke developer en designer, de websites die hij liet zien waren indrukwekkend en zaten vol slimme technische dingen. Wel viel me op dat ze niet altijd even toegankelijk leken, vooral door alle bewegende animaties, het contrast tussen kleuren en lettertypes op sommige plekken, en het gebruik van alleen een dunne outline op sommige elementen. Het was voor mij een goede reminder dat hoe cool een website ook is, toegankelijkheid toch echt het belangrijkste blijft. Zijn werk was wel heel inspirerend en ik kijk er naar uit om zelf wat met deze creatieve technieken te spelen.'
            ],
        },
        {
            name: 'Robert Broersma',
            topic: 'Systeem richtlijnen',
            date: '12-03-26',
            title: 'Robert Broersma',
            subtitle: 'Systeem richtlijnen',
            essay: [
                'Robbert Broersma werkt aan het NL Design System en zijn hoorcollege ging over hoe je goede formulieren bouwt, niet alleen qua uiterlijk maar vooral ook toegankelijk en prettig in gebruik. Hij begon meteen met de basis, vraag alleen wat je echt nodig hebt, leg uit waarom je iets vraagt, en stel nooit twee keer dezelfde vraag. Een goede intro tekst helpt daarbij ook, leg van tevoren uit hoe lang het invullen duurt, welke velden verplicht zijn, of je tussendoor kan opslaan, en met wie de gegevens gedeeld worden.',
                'Wat me bijbleef was zijn punt over uitlijning. Alles links uitlijnen is beter voor mensen met tunnelvisie, ook al zien knoppen rechts er voor de meeste mensen cooler uit. Kleurcontrast moet ook kloppen bij subtielere dingen zoals placeholder of helper tekst, die zijn vaak veel te licht. Fouten geef je niet alleen met kleur aan maar ook met bijvoorbeeld een streep of kruis, en een asterisk is eigenlijk niet de beste manier om een verplicht veld aan te geven, hij raadde aan om gewoon het woord verplicht te gebruiken als daar ruimte voor is. Componenten moeten minimaal 44 bij 44 pixels zijn, ook voor dingen als radiobuttons, zodat mensen met motorische problemen ze nog goed kunnen aanklikken.',
                'Foutmeldingen vond ik ook een interessant onderdeel. Die moet je eigenlijk al van tevoren uitleggen, ze moeten op het juiste moment verschijnen, en ze horen zowel bij het veld zelf te staan als bovenaan de pagina. Je kan een input linken aan zon foutmelding of helper tekst met aria describedby, en dat kan trouwens ook op een hele fieldset gezet worden in plaats van op elk los veld.',
                'Voor toetsenbord en screenreader gebruik ging hij nog dieper de diepte in. Elk veld, elke knop en elke link moet met alleen de tab toets bereikbaar zijn, in een logische volgorde, en de focusindicator moet altijd duidelijk zichtbaar blijven. Bij screenreaders worden labels en beschrijvingen voorgelezen zodra een veld focus krijgt, foutmeldingen onderbreken de gebruiker niet, en een bevestiging dat iets gelukt is wordt automatisch voorgelezen, bijvoorbeeld via een alert. Een knop als volgende zet je het beste in een lijstje als er nog iets onder volgt, dat werkt weer prettiger voor de screenreader.',
                'Een super nuttig hoorcollege, ik vond het alleen wel jammer dat het pas werd gegeven toen we het grootste deel van onze formulieren al hadden opgezet.'
            ],
        },
        {
            name: 'Johan Huijkman',
            topic: 'Accessibility',
            date: '09-04-26',
            title: 'Johan Huijkman',
            subtitle: 'Accessibility',
            essay: [
                'Johan Huijkman is toegankelijkheidsexpert bij Q42 en hij begon zijn hoorcollege meteen sterk, door een hele pagina via een screenreader te laten horen. Het was een snelle stem, maar toch duurde het best lang voordat je er doorheen was, en het was best confronterend om te beseffen hoeveel iemand met een screenreader allemaal moet doorworstelen voor iets simpels als een bestelling plaatsen op bol.com. Dat voorbeeld vatte eigenlijk meteen zijn hoofdpunt samen, een website kan helemaal voldoen aan de regels en toch in de praktijk niet bruikbaar zijn.',
                'Hij ging in op de WCAG principes, perceivable, operable, understandable en robust, maar maakte ook duidelijk dat dit niet voelt als echt inclusief. Er staan bijvoorbeeld maar vier eisen in specifiek voor dove mensen. Het is dus wel een handig hulpmiddel, maar zeker niet het enige waarmee je een website zou moeten bouwen, je kan WCAG namelijk ook makkelijk verkeerd interpreteren. Daarom raadde hij aan om mensen te zoeken die het voor je kunnen testen. Hij liet een video zien van iemand die blind is en via Google door de website van Artis navigeerde, en daar kwam uit naar voren dat screenreaders vaak al heel veel ingebouwde handigheden hebben, zoals van kop naar kop springen, waardoor iets als een knop om naar hoofdcontent te gaan eigenlijk vaak overbodig is.',
                'Voor mensen met een visuele beperking had hij het over captchas die vaak gewoon niet werken, pop up navigatie die in de weg zit, en het feit dat de meeste sites maar tot 200 procent zoom getest worden terwijl sommige mensen tot 300 of zelfs 400 procent nodig hebben. Voor mensen met motorische problemen of prikkelgevoeligheid is veel informatie op een klein beeldveld al snel vermoeiend, klikken kan letterlijk pijn doen, en te felle kleuren kunnen migraine veroorzaken. Bij formulieren is het daarom belangrijk dat je gewoon verder kan waar je gebleven was. Voor mensen op het autismespectrum is voorspelbaarheid juist het belangrijkste, ze kunnen moeilijk filteren tussen visuele en auditieve prikkels, dus een element dat per se de aandacht trekt zorgt er al snel voor dat ze niet meer kunnen focussen op de echte inhoud. Een rustige layout, duidelijke navigatie en hierarchie helpen daar enorm bij.',
                'Testen was eigenlijk de grootste boodschap van het hele verhaal, en ik vond dat hij dat heel goed overbracht. Johan gebruikte hele concrete, echte voorbeelden van mensen die op het web tegen dingen aanlopen waar volgens mij over het algemeen veel te weinig bij stilgestaan wordt.'
            ],

        },
        {
            name: 'Rosa',
            topic: 'Tinkering & digital infrastructure',
            date: '02-04-2026',
            title: 'Rosa',
            subtitle: 'Sleutelen & digital infrastructure',
            essay: [
                'De presentatie van Rosa ging over hacken in de brede zin van het woord, dus dingen op een alternatieve manier doen, zelf maken en creatief omgaan met wat je al hebt in plaats van meteen iets nieuws te kopen.',
                'Een concept dat me meteen aansprak was planned obsolescence. Fabrikanten maken producten bewust zo dat je er steeds moeilijker zelf in kan komen, zodat je sneller geneigd bent om iets nieuws te kopen dan om zelf te gaan sleutelen. Zodra de software ermee stopt, wordt de hardware vaak ook meteen nutteloos, ook al werkt die op zich nog gewoon goed.',
                'Daarna had ze het over afhankelijkheid, vooral van Amerikaanse big tech bedrijven. Hoe minder je daarvan afhangt, hoe meer controle je eigenlijk hebt over je eigen spullen en je eigen data.',
                'Ze legde ook uit wat een server eigenlijk is, namelijk gewoon een computer die informatie opslaat en die op afstand bereikbaar is, eigenlijk niet meer dan een computer met een router. Je kan dus ook gewoon je eigen server draaien, bijvoorbeeld op een oude computer, dan ben je niet afhankelijk van een externe partij, maar het heeft wel impact op de keuzes die je voor een site kan maken. Op een oude computer kan je nou eenmaal niet alle nieuwe snufjes kwijt, en eigenlijk houd je daardoor meteen ook rekening met de computers van je eigen gebruikers. Ze noemde ook een paar alternatieve servers, zoals servers die op zonne energie draaien, reizende servers, en NODE9.org, een server die juist eco gedreven is.',
                'Static site generators kwamen ook voorbij. Die kopiëren alles naar de server op het moment dat jij dat zelf wil, waardoor het minder impact heeft op de server zelf, en je houdt ook nog eens leesbare code over. Je kan dan prima met markdown werken, omdat er toch niet van buitenaf in je server gehackt kan worden.',
                'Ik vond Rosa echt heel leuk over deze dingen vertellen. Het sprak me aan hoe ze zich loszet van de norm en een soort groen minimalisme creëert zonder dat het saai of overdreven strak aanvoelt. Het voelde meer alsof ze steeds kijkt naar de essentie van wat er eigenlijk moet gebeuren, en dat dan met zo min mogelijk impact probeert te doen.'
            ],
        },
        {
            name: 'Marleen Stikker',
            topic: 'The Web You Want',
            date: '17-04-26',
            title: 'Marleen Stikker',
            subtitle: 'The Web You Want',
            essay: [
                'Marleen Stikker van Waag Futurelab sloot de Weekly Nerd reeks af, en het voelde meteen als een van de meest urgente sessies tot nu toe. Ze legde uit dat sociale media eigenlijk al sinds 1994 bestaan, maar dat we sindsdien nooit echt controle hebben gehad over onze privacy of over wat we via algoritmes te zien krijgen. We geven ons lot eigenlijk aan een klein groepje mensen aan de top van de grote techbedrijven, en daar staat ontzettend veel op het spel.',
                'Ze stelde een vraag die in eerste instantie grappig klinkt maar dat helemaal niet is, namelijk waarom een stofzuiger foto\'s naar het bedrijf erachter zou moeten sturen. Dat is volgens haar een symptoom van een veel groter probleem, digitale afhankelijkheid en surveillance by design. Bijna elk apparaat en elk platform is tegenwoordig gebouwd om data te verzamelen, niet om jou als gebruiker echt te dienen.',
                'Regulatie zag ze niet als de vijand van innovatie maar juist als een voorwaarde ervoor. Ze noemde Europese wetgeving zoals de GDPR, de Digital Services Act, de Data Governance Act en de AI Act, die volgens haar juist markten openen, creativiteit stimuleren, nieuwe spelers ruimte geven en democratie verdedigen. Beperkingen en grenzen kunnen dus juist helpen bij innovatie, in plaats van die alleen maar tegen te houden.',
                'Wat deze sessie voor mij zo sterk maakte was dat het eigenlijk alles bij elkaar bracht wat we de hele minor al gehoord hadden. Rosa\'s vraag over waar je website eigenlijk leeft, Peter Paul Koch\'s uitleg over browsers als een soort publiek platform, en zelfs de sessie over agentic AI kwamen ineens samen. Het maakte me duidelijk dat het web helemaal niet neutraal is, het is ontworpen door mensen met belangen, en als developer kies ik eigenlijk elke dag mee hoe dat web eruitziet. Dat is een verantwoordelijkheid die ik daarvoor toch wel had onderschat.'
            ],
        },
        {
            name: 'Hans de Zwart',
            topic: 'Privacy',
            date: '21-05-26',
            title: 'Hans de Zwart',
            subtitle: 'Privacy',
            essay: [
                'Hans de Zwart begon zijn sessie met een test. Ga met een gloednieuwe browser naar nu.nl en kijk hoeveel partijen binnen een paar seconden al weten dat je daar bent. Het antwoord is behoorlijk schrikbarend, in real time worden je gegevens al doorgestuurd naar tientallen adverteerders, nog voordat de pagina helemaal geladen is. Hij stelde daarna nog een vraag die bleef hangen, bestaat er eigenlijk nog een websitebezoek dat niet ergens bij Google in beeld komt?',
                'Pas daarna kwam hij bij de vraag wat privacy nou eigenlijk is, iets waarvan de meeste mensen denken het wel te weten maar dat in de praktijk toch lastiger blijkt. Hij onderscheidde drie lagen, privacy als individueel recht om met rust gelaten te worden, als sociaal recht om in elke situatie iemand anders te mogen zijn, en als democratische noodzaak, de ruimte om zelf een mening te vormen zonder dat iemand meekijkt. Hij zei een zin die ik wel grappig vond, hij loopt rond in een wereld waarin hij niets wil kopen, maar leeft in een wereld die hem voortdurend alles probeert aan te smeren.',
                'Het concept dat me het meest is bijgebleven was contextuele integriteit. Privacy gaat volgens hem niet zozeer over geheimhouding, maar over verwachting. Je vertelt je dokter andere dingen dan je werkgever, en dat is helemaal niet gek, het wordt pas een probleem als die gegevens buiten de context komen waarin je ze had gedeeld, bij partijen waar je ze nooit voor bedoeld had. Eigenlijk is dat gewoon gezond verstand over hoe mensen met elkaar omgaan, maar dan toegepast op data.',
                'Daarna ging hij dieper in op hoe de wet dit eigenlijk probeert te regelen. Toestemming is de meest gebruikte juridische basis, maar die moet wel vrij en geïnformeerd zijn en altijd weer ingetrokken kunnen worden. Doelbinding houdt in dat je data alleen mag gebruiken voor het doel waarvoor je die verzameld hebt, toestemming voor het ene doel is geen toestemming voor het andere, wat heel logisch klinkt maar in de praktijk massaal genegeerd wordt.',
                'Het laatste deel ging over AI. ChatGPT is getraind op het hele internet, dus ook op alles wat er ooit over jou online heeft gestaan. Met agentic AI wordt het volgens hem nog urgenter, die agents gaan steeds dieper je computer in, koppelen allerlei tools aan elkaar en handelen namens jou, waardoor er een heel nieuw soort surveillance ontstaat, waarbij data niet alleen wordt bewaard maar ook actief wordt ingezet.',
                'Deze weeklynerd sloot goed aan op die van Marleen Stikker. Waar zij het had over het web dat we eigenlijk zouden willen, ging Hans juist over de prijs die we betalen voor het web zoals het nu is. Wat me het meest raakte was het besef dat ik als developer hier gewoon in meebeslis, welke data ik opvraag en welke ik opsla zijn keuzes, doelbinding en minimaliseren zijn geen juridische formaliteiten maar gewoon ontwerpbeslissingen die ik zelf neem.'
            ],
        },
        {
            name: 'Marvin Sernee',
            topic: 'Q42',
            date: '28-05-26',
            title: 'Marvin Sernee',
            subtitle: 'Q42',
            essay: [
                'Het stukje dat me het langst is bijgebleven van Marvins sessie was eigenlijk niet over design systems zelf, maar over hoe je met stakeholders omgaat. Hij zei dat gedeelde verantwoordelijkheid eigenlijk geen verantwoordelijkheid is. Zijn advies daarbij, kijk altijd naar het probleem dat iemand probeert op te lossen, niet naar de oplossing die diegene zelf al bedacht heeft. Bij een grote klant heb je nou eenmaal veel meer mensen die allemaal denken dat hun wens het belangrijkst is, en dan helpt het om steeds een stap terug te doen.',
                'Marvin werkt zelf bij Q42, en hij maakte vanaf het begin duidelijk dat een design system in de praktijk heel anders werkt dan op papier. Je begint altijd met uitzoeken waarom de huidige situatie niet werkt en waar je naartoe wil, en pas als die antwoorden scherp zijn ga je verder met de design language, Figma en een roadmap.',
                'Wat ik niet verwacht had was zijn kritiek op Atomic Design. Hij vond het in de praktijk gewoon niet werken, omdat de onderdelen al snel zo klein worden dat niemand meer weet of iets nou een atom of een molecule moet heten. Bij Q42 gebruiken ze daarom een simpeler model met drie lagen. Onderaan zit de foundation, dus tokens, kleuren, iconen en witruimte, daar bouwt alles op verder. Daarboven zitten losse, herbruikbare componenten zoals knoppen en cards. En de bovenste laag is voor patronen, combinaties van componenten die samen een hele flow vormen. Hij voegde daar nog aan toe dat zo\'n systeem nooit klaar is, je houdt ermee bezig zolang het product leeft, anders gaat het juist achteruit.',
                'Zijn punt over AI vond ik ook origineel, hij zei dat je het moet behandelen als een peuter, met heel duidelijke instructies en voorbeelden, zodat de output ook beter wordt. Voor saaie of repetitieve klussen zoals debuggen prima, maar het echte creatieve werk doe je toch liever zelf, anders verlies je het vakmanschap waar het uiteindelijk om gaat.',
                'Aan het einde had hij het nog over toegankelijkheid, en zijn boodschap was simpel, betrek developers en designers er samen vroeg bij, niet pas als losse check achteraf, dan kost het bijna geen extra tijd. Leuk detail, hij haakte daarbij aan op wat Kilian eerder had verteld over het dialog element, de browser regelt focus en screenreader ondersteuning al, dus waarom zou je dat zelf opnieuw uitvinden.',
                'Marvin was wat mij betreft een van de meest down to earth sprekers tot nu toe, geen mooie praatjes maar gewoon eerlijke verhalen over wat in de praktijk wel en niet werkt.'
            ],
        },
        {
            name: 'Bas',
            topic: 'De Voorhoede',
            date: 'Jun 2025',
            title: 'Bas',
            subtitle: 'De Voorhoede',
            essay: [
                'Bas had het over een heel andere uitdaging, namelijk offline-first development. Hij liet een webapplicatie zien voor liftinspecteurs die ook zonder internetverbinding moet blijven werken, en dat stelt je voor vragen die je bij een normale webapp gewoon nooit hoeft te stellen. Wat hij zei over waarom projecten uitlopen vond ik raak, klanten weten aan het begin zelf nog niet precies wat ze willen, nieuwe inzichten komen pas tijdens het bouwen, en de scope groeit gewoon mee. Bij offline-first is dat volgens hem geen excuus meer dat je kan gebruiken, je bent vanaf dag één verplicht om eerlijk te zijn over wat de applicatie écht nodig heeft, want je kan die keuzes later niet zomaar meer terugdraaien.',
                'Offline-first dwingt je gewoon om scherper na te denken over wat een applicatie echt nodig heeft. Dat is een les die verder gaat dan alleen offline projecten.'
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

        const wnCb = document.getElementById('wn-essay-expand');
        if (wnCb) wnCb.checked = false;

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

// Sidebar nav 
document.querySelectorAll('.section-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        scrollToSection(parseInt(btn.dataset.section, 10));
    });
});


(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const eel = document.getElementById('eel');
    const segs = Array.from(document.querySelectorAll('.eel-seg'));
    const COUNT = segs.length;
    const SEG_LEN = 12;
    const ORBIT_RADIUS = 140;
    const ORBIT_SPEED = 0.012;

    // Bron: ClaudeAI 
    segs.forEach((seg, i) => {
        const progress = i / (COUNT - 1);
        const size = (1 - progress) * 18 + 5;
        seg.style.width = size + 'px';
        seg.style.height = size + 'px';
        seg.style.opacity = 1 - progress * 0.5;
        seg.style.background = `rgba(${28 + Math.round((1 - progress) * 38)}, ${175 + Math.round((1 - progress) * 70)}, ${195 + Math.round((1 - progress) * 60)}, ${0.6 + (1 - progress) * 0.4})`;
    });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let orbitAngle = 0;
    let headTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const positions = segs.map((_, i) => ({
        x: window.innerWidth / 2 + i * SEG_LEN,
        y: window.innerHeight / 2
    }));

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function checkVisibility() {
        const first = document.querySelector('section:first-of-type');
        if (!first) return;
        eel.classList.toggle('visible', first.getBoundingClientRect().bottom <= 0);
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

    function tick() {
        orbitAngle += ORBIT_SPEED;

        const orbitX = mouse.x + Math.cos(orbitAngle) * ORBIT_RADIUS;
        const orbitY = mouse.y + Math.sin(orbitAngle) * ORBIT_RADIUS * 0.6;

        headTarget.x += (orbitX - headTarget.x) * 0.01;
        headTarget.y += (orbitY - headTarget.y) * 0.01;

        const head = positions[0];
        const dx = headTarget.x - head.x;
        const dy = headTarget.y - head.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const spd = Math.min(dist * 0.05, 3.5);
        if (dist > 0.5) {
            head.x += (dx / dist) * spd;
            head.y += (dy / dist) * spd;
        }

        for (let i = 1; i < COUNT; i++) {
            const prev = positions[i - 1];
            const seg = positions[i];
            const ddx = prev.x - seg.x;
            const ddy = prev.y - seg.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d > SEG_LEN) {
                seg.x = prev.x - (ddx / d) * SEG_LEN;
                seg.y = prev.y - (ddy / d) * SEG_LEN;
            }
        }

        segs.forEach((seg, i) => {
            seg.style.left = positions[i].x + 'px';
            seg.style.top = positions[i].y + 'px';
        });

        requestAnimationFrame(tick);
    }

    tick();
})();