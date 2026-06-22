# Meesterschap Blog
Het is een iteratie op de one-pager die ik aan het begin van de minor maakte in Sprint 0, maar dan deels opnieuw opgebouwd met alles wat ik sindsdien heb geleerd.
Alle aanpassingen van de Sprint0 website op volgorde van secties.

## Intro sectie
Oud:
<img width="1887" height="892" alt="image" src="https://github.com/user-attachments/assets/b0d1b818-14a1-40b2-8752-03db953e0bd7" />

Nieuw:
<img width="1888" height="885" alt="image" src="https://github.com/user-attachments/assets/cca7d226-ad57-4375-9e9b-8e1e8d5bc24c" />
Heb op een hele simpele manier de zeilboot gemaakt met border radius vooral, met daar bij een ook een simpele zeil animatie. Ik nam ook een beetje inspiratie uit codepen.
<img width="440" height="684" alt="image" src="https://github.com/user-attachments/assets/67a466db-0b46-4f5a-adbe-1285be79d942" />

## Leerdoelen sectie
Oud:
<img width="1885" height="886" alt="image" src="https://github.com/user-attachments/assets/aa8de8da-8d84-402a-9e8e-43d0ef1d44ce" />

Nieuw:
<img width="1882" height="874" alt="image" src="https://github.com/user-attachments/assets/38d653e0-94b6-4e47-94d2-40c04e84d190" />
Ik heb geprobeerd mijn eigen dynamische draggable kanban functie gebouwd met een beetje hulp van AI. Het was iets ingewikkelder dan ik dacht, maar volgens mij is het redelijk goed gelukt.
Met deze funtie had ik de meeste moeite mee: 
<img width="769" height="475" alt="image" src="https://github.com/user-attachments/assets/272ebef9-4e76-4966-b1fe-fe0ceb178c0a" />
Maar als ik het goed begrijp kijkt getDropTarget welke kaart je muis voorbij is. Hij loopt alle kaarten in de kolom langs en checkt of jouw muispositie (y) boven het midden van een kaart zit. De eerste kaart waarbij dat zo is, is waar de gesleepte kaart voor geplaatst wordt. Vindt hij geen kaart, geeft hij null terug, wat betekent dat je onderaan de kolom loslaat.

## Nieuwe Projecten sectie
<img width="1883" height="890" alt="image" src="https://github.com/user-attachments/assets/d91c76bd-dbbc-4408-a8f2-91f9593e2f1c" />
De projecten staan als een array van objecten in je JS, elk met een titel, beschrijving, technologieën, thumbnail en GitHub link. Met forEach bouwt de code voor elk project dynamisch een rij in de DOM, inclusief een afbeelding, tekst en pills voor de tech stack.
De popover aan de linkerkant werkt via mouseenter op elke rij. Zodra je er overheen hovert vult hij de popover met de gegevens van dat project en zet hij een visible class erop die hem zichtbaar maakt via CSS. mouseleave op de hele layout haalt die class er weer af.
<img width="766" height="290" alt="image" src="https://github.com/user-attachments/assets/6295568d-5a84-445e-bfb0-f57788450a3e" /> <img width="414" height="199" alt="image" src="https://github.com/user-attachments/assets/23fb696d-5b00-4076-bf12-685881e88475" />

## Niewe Weeklynerds sectie
<img width="1882" height="892" alt="image" src="https://github.com/user-attachments/assets/f6bf9947-9a30-4b76-a001-847e0d37c068" />
Eigenlijk op dezlefde manier als met de projecten staan de sprekers als een array van objecten in je JS, elk met een naam, onderwerp, datum en een array van paragrafen als essay.
Bij het laden bouwt een forEach de sidebar dynamisch op, voor elke spreker een knop met naam en onderwerp. Als je op een knop klikt roept hij showEssay aan met de index van die spreker.
<img width="596" height="350" alt="image" src="https://github.com/user-attachments/assets/c641f1f6-8338-4981-9169-bf6ea4b43076" /> <img width="500" height="235" alt="image" src="https://github.com/user-attachments/assets/fdc32672-d052-4c90-992c-396764b49832" />


## Nieuwe sectie nav
<img width="230" height="882" alt="image" src="https://github.com/user-attachments/assets/33e78751-d1ca-4df0-8071-2edc001b1a05" />
De sidebar nav bestaat uit knoppen met een data-section attribuut dat de index van de bijbehorende sectie bijhoudt.
Bij een klik roept hij simpelweg scrollToSection aan met die index, die dan smoothscrollt naar de bovenkant van die sectie via offsetTop.
<img width="903" height="277" alt="image" src="https://github.com/user-attachments/assets/c12ecd54-bda9-465d-b0ce-448c110f2c9e" />

<img width="515" height="128" alt="image" src="https://github.com/user-attachments/assets/1a033ef8-4e6a-4039-aa90-511e9f3f4571" />

## Nieuwe Mouse cursor animatie 
<img width="510" height="304" alt="image" src="https://github.com/user-attachments/assets/8b12eb07-9e0d-4aad-8f25-9ef7f83d71c4" />
De Javascript hiervoor was een klein beetje boven mijn niveau, dus ik had wel weer een beetje hulp ingeschakeld van AI, maar ik wilde dit heel graag in mijn Blog site hebben. 

De paling bestaat uit twaalf losse divs die via CSS gestyled zijn als aflopende cirkels, groot aan de kop en klein aan de staart.
Bij het opstarten geeft een forEach elke div zijn eigen grootte, kleur en opacity op basis van zijn positie in de rij, puur via inline styles in JS.

De beweging werkt via twee stappen. Eerst berekent de orbit een punt rondom de muis, een ellips die continu rondgaat via orbitAngle die elke frame een klein beetje ophoog gaat.
Daarna trekt elk volgend segment zich naar het vorige toe. Als de afstand groter is dan SEG_LEN pixels schuift het segment op totdat de afstand weer klopt. Zo ontstaat de slangbeweging automatisch zonder dat je die apart hoeft te animeren.
<img width="932" height="509" alt="image" src="https://github.com/user-attachments/assets/e0a06e4b-0841-4757-9ae7-19eebc48ca4e" />

# Reflectie

## Meesterproef
Voor de Meesterproef werkte ik met Romy, Eva en Thomas aan een nieuwe website voor Videlio. Het was de eerste keer dat ik aan een project werkte met een echte opdrachtgever, en dat voelde meteen anders dan alles wat ik daarvoor had gedaan. Als CMD'er voelde ik me wel redelijk goed voorbereid door alle vakken die we tot dit punt hebben gevolgd. We hebben namelijk best veel gehad over sprint iteratie, usertests, professioneel werken en verschillende casussen, maar nu waren ze allemaal gecombineerd en in praktijk gezet voor dit project, want het wel op een goede manier spannend maakt.

Het lastigste was niet het bouwen zelf, maar het afstemmen. Wie pakt wat op, hoe houd je elkaar op de hoogte, en hoe zorg je dat je code goed samenwerkt met wat een ander heeft geschreven. We hadden allemaal een eigen manier van werken en die moesten we ergens in het midden zien te vinden. Dat kostte in het begin meer tijd dan ik had verwacht, maar het werd wel makkelijker naarmate we beter wisten wat we aan elkaar hadden.

Wat ik echt heb leren waarderen was het contact met de opdrachtgever. De momenten waarop we iets lieten zien en vroegen wat ze ervan vonden, waren bijna altijd productiever dan de sessies waarbij we te lang op eigen houtje doorwerkten. Feedback ophalen voelt soms als een onderbreking van het bouwen, maar in de praktijk voorkomt het dat je tijd steekt in iets wat toch niet de goede richting op gaat.

Het project zelf vroeg ook om een andere manier van denken over toegankelijkheid, niet als iets wat je achteraf controleert maar als iets wat je in elke beslissing meeneemt. Dat was soms best lastig combineren met de snelheid die een teamproject vraagt, maar het heeft me wel bewuster gemaakt van hoe ik code schrijf.


## Mezelf
Aan het begin van de minor had ik al een basiskennis van HTML, CSS en JavaScript, maar ik merkte snel dat er een groot verschil zit tussen iets werkend krijgen en iets goed bouwen. De talks en opdrachten dwongen me om na te denken over keuzes die ik daarvoor gewoon niet maakte.

Wat ik over mezelf heb geleerd is ik neig ernaar om te snel met het eerste idee door te zetten. Itereren voelt soms als tijdverlies, maar het levert bijna altijd een beter resultaat op. Dat is een patroon dat ik bewust wil blijven doorbreken, in code maar ook in design en samenwerking.

Ik merkte ook dat ik toegankelijkheid aan het begin van de minor vooral zag als een set regels die je afvinkt. Na de talks van Johan Huijkman en Robbert Broersma begon ik het anders te zien, als een manier van denken die je vanaf het begin meeneemt, niet als controlemomenten achteraf. Dat heeft concreet invloed gehad op hoe ik code schrijf.

Debuggen was lange tijd iets wat ik deed op gevoel. Tijdens de Meesterproef dwong de complexiteit van het project me om de devtools echt te leren gebruiken.

Wat ik mezelf nog wil blijven aanleren is eerder om hulp vragen. Ik werk graag dingen zelf uit, maar ik merkte dat ik soms te lang op een probleem bleef zitten terwijl een tweede blik van een teamgenoot het waarschijnlijk in een fractie van de tijd had opgelost.

### Uitgelichte Leerdoelen:
- Iteratief werken,
De feedbackmomenten met de opdrachtgever dwongen me om tussentijds bij te sturen in plaats van door te blijven bouwen op iets wat misschien toch niet klopte.

- Debuggen als professional,
Ik ben de devtools steeds meer gaan gebruiken als echt gereedschap in plaats van blind console.log'en en hopen dat ik het probleem toevallig tegenkom.

- API filteren,
Ik begrijp nu hoe ik fetch verzoeken optimaliseer door alleen de velden op te halen die ik echt nodig heb, in plaats van alles binnenhalen en daarna sorteren.

## De Minor
De minor Web Design & Development was intensiever dan ik had verwacht, maar ook veel interessanter. Ik had niet gedacht dat ik in zo'n korte tijd zoveel over browsers, toegankelijkheid, privacy en het web als infrastructuur zou leren. De sprekers van de Weekly Nerd gaven steeds een ander perspectief, en dat zorgde ervoor dat ik steeds opnieuw moest nadenken over dingen die ik al dacht te begrijpen.

Als ik eerlijk ben, had ik soms liever meer tijd gehad om dieper op één onderwerp in te gaan. Maar ik begrijp ook dat de breedte van de minor juist de bedoeling is: laten zien hoe groot en hoe gelaagd het vakgebied eigenlijk is. En dat is gelukt. Ik ga hier weg met meer vragen dan antwoorden, maar wel met het gevoel dat ik weet waar ik die antwoorden moet zoeken.

# Product Biografie, Meesterproef

Week 1 — 18 t/m 24 mei
======================

De eerste paginadie ik aanpakte was de "Over ons" pagina. Lijkt simpel, maar als je doelgroep grotendeels blind of slechtziend is, verandert elke beslissing. Welke volgorde lees je voor? Wat hoort een screenreader te zeggen? Kan je met alleen eentoetsenbord door de pagina navigeren?

Ik begon met de basis: een globale stylesheet met CSS variabelen zodat kleur en typografie consistent zijn door de hele site.

<img width="940" height="194" alt="image" src="https://github.com/user-attachments/assets/c123ceb1-64d2-4c8d-8fd3-0458064c5009" />


Donkergrijs als achtergrond, wit voor tekst, en een knalgeel als accentkleur. Dat geel is bewust voor hoog contrast, goed zichtbaar voor slechtzienden, net al shunhuidige website.

De eerste versie was functioneel maar echt niet mooi. Gewoon een lijst met namen en een paar paragrafen. Ik wist dat het beter kon, maar ik moest eerst de basis goedhebben.

Dekoppenstructuur was ook belangrijk. h1 voor de paginatitel, h2 voor de secties,h3 voor de namen van bestuursleden. Screenreaders lezen dit voor als een soortinhoudsopgave, dus als je die volgorde verpest snap de gebruiker er niks van.

Elke sectie heeft ook een aria-label gekregen die verwijst naar de bijbehorende kop:

De bestuursleden, veel iteraties
--------------------------------

Dit onderdeelheeft me het meest gekost. De eerste versie had gewoon een lijst, daarnacirkels met initialen, daarna echte foto's. Elke keer dacht ik: dit kan persoonlijker.
<img width="393" height="308" alt="image" src="https://github.com/user-attachments/assets/66f18334-8d1a-4913-adfe-59189de46b2b" /><img width="535" height="310" alt="image" src="https://github.com/user-attachments/assets/8011605c-d02c-4634-84e3-d2b08ce8a3e9" />


Ik heb meerdere kaartvormen geprobeerd. Rechthoek, rond, asymmetrisch, druppel. Uiteindelijk ben ik gegaan voor een diagonale border-radius op de kaart en een druppelvormop de foto:
<img width="940" height="523" alt="image" src="https://github.com/user-attachments/assets/29f3d7dc-d83f-4bf9-b3a7-aa224f157ee2" />

Het voelt organischer dan een perfecte cirkel. Alsof de kaart een beetje beweegt.

De quotes waren ook een bewuste keuze. Eerst zaten ze achter een hover-effect — je moest over de kaart bewegen om ze te zien. Maar dat werkt niet voor slechtzienden, en eigenlijk ook niet voor mensen die met een toetsenbord navigeren. Dus ik heb ze altijd zichtbaar gemaakt. Minder "cool" misschien, maar veel toegankelijker.
<img width="939" height="424" alt="image" src="https://github.com/user-attachments/assets/97666eaa-a59a-4e10-a4f6-92e371cf8b38" />

Heb ook met een iframe hun adres op google maps op de pagina weergegeven, maar na een workshop met Victor had hij uitgelegd dat iframes niet erg toegankelijk zijn voor screenreaders, omdat als je daarop klikt, de sr niet meer weet dat hij nog opde pagina van Videlio zit. Daarom houden we alleen de link om het adres te openen in google maps en nog een afbeelding van de locatie / gebouw zelf.

Week 2 — 25 t/m 31 mei
======================

In miro heb ik de informatie infrastructuur wat overzichtelijk uitgestipt voor het team. Deze flow staat niet vast er wordt waarschijnlijk nog wel aangepast naar mate we verder komen en meer pagina’s af hebben, maar een goed begin voor aankomende vrijdag.
<img width="940" height="448" alt="image" src="https://github.com/user-attachments/assets/07c5d35c-bfad-4a19-9aa9-4f501db967e1" />

De homepage
-----------

Toen de Over ons pagina voor nu af was ben ik aan de homepage begonnen. Daar wilde ik belangrijke dingen binnen Videlio uitlichten: binnenlopen voor koffie, workshops, de verhalen van VIPs en het VIPLab.

De hero sectie heeft een grid met de intro tekst links en een uitgelichte workshop rechts:
<img width="940" height="417" alt="image" src="https://github.com/user-attachments/assets/7797ce7a-b784-4ffc-8fbb-fe7eea3796a4" />

 Ook heb ik een paar iteraties gemaakt op hun logo om wat meer uniformiteit aan de pagina te geven:
<img width="388" height="427" alt="image" src="https://github.com/user-attachments/assets/b1b6c31c-c17b-4032-8ed5-278ada3ab500" />

Week 3 — 1 t/m 7 juni
=====================

Een voorleesknop
----------------

Ik heb een herbruikbare ReadAloudButton component gebouwd met de Web Speech API, die per sectie van een pagina aangeroepen kan worden. De knopkleur is een custom property (--a11y-color) zodat die later voor alle toegankelijkheidsfeatures consistent hergebruikt kan worden.
<img width="940" height="278" alt="image" src="https://github.com/user-attachments/assets/514326a6-76e7-4722-ba2b-b5d49ca7dec0" />

De basisversie was simpel — een knop die met SpeechSynthesisUtterance de tekst van een opgegeven element voorleest:
<img width="940" height="148" alt="image" src="https://github.com/user-attachments/assets/08087192-f5f9-49aa-9e63-667fecdfa8a7" />

Maar een knop die alleen "speelt" of "stopt" voelde niet compleet aan. Gebruikers die nog een beetje zicht hebben, hebben nog geen idee of het voorlezen al bijna klaar is, of nog net begonnen. Daarom heb ik een voortgangsbalk toegevoegd die meeloopt met eengeschatte spreektijd, gebaseerd op een gemiddeld leestempo van 150 woorden per minuut. Het is een schatting, geen exacte meting, maar ik vond het een goed uitgangspunt.
<img width="940" height="246" alt="image" src="https://github.com/user-attachments/assets/523672b6-4890-47dc-b29c-3b7e35d447d4" />

Eerst had ik onder de knop ook een statusregel staan ("Bezig met voorlezen...", "Klaar") metaria-live="polite", in de veronderstelling dat dit netjes zou zijnvoor screenreadergebruikers. Bleek averechts te werken: een screenreader lasdan zowel de voorgelezen hoofdtekst voor (via speechSynthesis) als de statuswijziging. Twee overlappende spraakstromen tegelijk. Verwarrend in plaatsvan behulpzaam.

De oplossing was die statusregel juist teverbergen voor screenreaders, omdat hij puur bedoeld is als visuele indicatorvoor mensen die wél kunnen zien maar liever luisteren:
<img width="797" height="41" alt="image" src="https://github.com/user-attachments/assets/f16e71e6-3924-4dd8-8108-ae1580202a01" />

Week 4 — 8 t/m 14 juni
======================

WordPress als CMS koppelen
--------------------------

Dit was compleet nieuw voor mij. Niet werken met API’s, maar content beheren vanuit een headlessCMS. Tot nu toe stond alle content hardcoded in de Astro-bestanden, maar dat is niet houdbaar als bestuursleden zelf content moeten kunnen toevoegen. We kregen toegang tot een testomgeving van WordPress (dev1.videlio.nl) en ik ben begonnen met de eerste koppeling — een artikel over LumiCane testen via de WordPressREST API.
<img width="940" height="83" alt="image" src="https://github.com/user-attachments/assets/76a601b5-a9f7-4454-b68e-0c7094defb00" />

Het kostte wat tijd om te snappen hoe Astro's getStaticPaths() samenwerkt met WordPress-data, en hoe je moet omgaan met HTML-entities die WordPress teruggeeft (zoals– voor “-“). Ik heb daarvoor een herbruikbare decodeHtml.js utility geschreven die ik nu op elke pagina gebruik waar WordPress-content binnenkomt.

Informatiearchitectuur herzien
------------------------------

Na het gesprek met Roger en Peter vrijdag werd duidelijk dat het huidige structuur nog niet de kernpunten van Videlio naar boven hield. We hebben de site herstructureerd naar vier duidelijke pilaren: VIP Lab, Fysieke toegankelijkheid, Persoonlijke groei, en Community. Elk pilaarkreeg zijn eigen pagina die automatisch zowel WordPress-artikelen als activiteiten toont, gefilterd op de juiste categorie via WordPress.

Week 5 — 15 t/m 17 juni
=======================

Een toegankelijke zoekfunctie met Pagefind
------------------------------------------
<img width="940" height="81" alt="image" src="https://github.com/user-attachments/assets/50bb3827-7516-45c6-b217-868bbc5b8e94" />

Uit de test met Ihab bleek dat hij een manier miste om snel te vinden wat je zoekt zonder de hele site door te hoeven tabben. Voor blinde en slechtziende gebruikers is dat extra belangrijk, want navigeren met een toetsenbord of screenreader kost tijd, en een goede zoekfunctie scheelt enorm.

Om mensen snel content te laten vinden heb ik Pagefind geïntegreerd. Het is een zoekmachine die specifiek gebouwd is voor statische sites.

Pagefind indexeert standaard alle zichtbare tekst binnen een data-pagefind-body attribuut. In eerste instantie liet ik dat per ongeluk de hele pagina indexeren, inclusief navigatie, een toegankelijkheidsmenu, en knoppen als "Contrastthema gebruiken". Het zoekresultaat gaf complete rommel terug, ellenlange brokken tekst die niks met de zoekterm te maken hadden. Ik liet uiteindelijk alleen de paginatitel indexeren, via een onzichtbaar element in de Mainlayout:
<img width="940" height="200" alt="image" src="https://github.com/user-attachments/assets/05d114ef-7ed4-4efe-b461-ce48e79f83d4" />

Met data-pagefind-ignore op de rest van de pagina om te voorkomen dat alles daar omheen ook wordt meegenomen.

maar dat bracht een interessante toegankelijkheidsuitdaging met zich mee: bij het gesprek met Peter bleek dat hij niet doorhad dat erzoekresultaten verschenen onder de zoekbalk. De oplossing werd een volledige dialog die opent zodra je op zoeken klikt, met:

*   Een delay van 1 seconde voordat resultaten worden voorgelezen aan een screenreader, zodat je niet midden in het typen wordt onderbroken
    

*   Een focus-trap zodat je met Tab niet per ongeluk de dialog uit kan navigeren
    

*   Een visuele animatie waarbij een gele rechthoek vanuit het hele scherm krimpt naar de positie van de zoekbalk, om de aandacht er naartoe te trekken
    
<img width="940" height="334" alt="image" src="https://github.com/user-attachments/assets/bd08a986-3964-4c09-aa79-639279e7b01b" />

Bron voor de ARIA-patronen die ik hierbijgebruikte: [WAI-ARIA AuthoringPractices Guide — Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)[Pagefind documentatie](https://pagefind.app/docs/)
