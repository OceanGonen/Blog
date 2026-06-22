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
Voor de Meesterproef werkte ik met Romy, Eva en Thomas aan een nieuwe website voor Videlio. Het was de eerste keer dat ik aan een project werkte met een echte opdrachtgever, en dat voelde meteen anders dan alles wat ik daarvoor had gedaan. Als CMD'er voelde ik me wel redelijk goed voorbereid door alle vakken die we tot dit punt hebben gevolgd. We hebben namelijk best veel gehad over sprint iteratie, usertests, professioneel werken en verschillende casussen, maar nu waren ze allemaal gecombineerd en in praktijk gezet voor dit project.

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

