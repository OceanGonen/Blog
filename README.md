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
<img width="515" height="128" alt="image" src="https://github.com/user-attachments/assets/1a033ef8-4e6a-4039-aa90-511e9f3f4571" />

## Nieuwe Mouse cursor animatie 
<img width="510" height="304" alt="image" src="https://github.com/user-attachments/assets/8b12eb07-9e0d-4aad-8f25-9ef7f83d71c4" />
De Javascript hiervoor was een klein beetje boven mijn niveau, dus ik had wel weer een beetje hulp ingeschakeld van AI, maar ik wilde dit heel graag in mijn Blog site hebben. 

De paling bestaat uit twaalf losse divs die via CSS gestyled zijn als aflopende cirkels, groot aan de kop en klein aan de staart.
Bij het opstarten geeft een forEach elke div zijn eigen grootte, kleur en opacity op basis van zijn positie in de rij, puur via inline styles in JS.

De beweging werkt via twee stappen. Eerst berekent de orbit een punt rondom de muis, een ellips die continu rondgaat via orbitAngle die elke frame een klein beetje ophoog gaat.
Daarna trekt elk volgend segment zich naar het vorige toe. Als de afstand groter is dan SEG_LEN pixels schuift het segment op totdat de afstand weer klopt. Zo ontstaat de slangbeweging automatisch zonder dat je die apart hoeft te animeren.
<img width="932" height="509" alt="image" src="https://github.com/user-attachments/assets/e0a06e4b-0841-4757-9ae7-19eebc48ca4e" />
