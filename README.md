# cloud-customer-service

## Hvordan kjøre applikasjonen
For å kunne kjøre applikasjonen må brukeren benytte seg av NTNUs nett "eduroam" eller VPN (Cisco AnyConnect).

Etter å ha klonet prosjektet til sin egen maskin: 
1. Navigere til prosjektet ved hjelp av **cd project4**
2. Kjør **npm install --global expo-cli**
3. Kjør **npm install** i project4 mappen
4. Kjør **npm start** 

## Hvordan åpne opp appen på mobil/nettbrett
### iPhone eller iPad
1. Åpne opp **kamera** app på telefonen
2. Skanne QR kode som er i terminalen eller i Expo Dev tools

### Android enheter
1. Laste ned applikasjonen **Expo Go** fra Play Store
2. Åpne **Expo Go** app
3. Trykke på **Scan QR Code** under Projects
4. Skanne QR kode som er i terminalen eller i Expo Dev tools 


## Oppgaven
Vi har valgt oppgave a) "Lag en React Native client hvor dere gjenbruker backend og det som kan gjenbrukes av kode og logikk for klienten (bruk expo-cli)"

Vi har videreført alle hovedfunksjoner vi hadde i prosjekt 3, og tilpasset de ulike komponentene til React Native. Dette innebærer liste over kunder, søkefeltet, mulighet for å filtrere og sortere resultater og legge til en ny bruker. Backend er også blitt gjenbrukt fra prosjekt 3. Backend er blitt deployet til en virtuell maskin som gjør at vi har tilgang til datene som er tilgjengelig i databasen. Backenden for prosjektet kjøres på urlen: http://it2810-46.idi.ntnu.no:4001/graphql.

## Om applikasjonen
Vår applikasjon presenterer en kundebase for en tenkt tjeneste, hvor man også kan legge til en ny kunde. Det er ikke implementert noen form for innlogging, men det ville vært naturlig å ha for en ekte tjeneste. Det er mulig å sortere listen på navn, og på alder (fødselsdato), filtrere på de tre ulike abonnementene og søke på kunder.

## Frontend

## UI
Filter og sortering har vi lagt i en egen sidemeny (modal) som er skjult ved åpning av applikasjonen. Default verdi på sortering er Navn a-z og alle subscriptions er med. Brukeren kan da velge å endre på disse, ved å trykke på filter-ikonet som ligger øverst til høyre i headeren. Når brukeren filtrerer oppdateres resultatene automatisk, og den kan velge å lukke menyen når den har filtrert slik den ønsker. 

### Add customer
På siden hvor man kan legge til en ny bruker har vi mange input-felter under hverandre, hvor man kan fylle inn informasjon om en ny kunde. Her har vi forbedret funksjonaliteten mye etter prosjekt3. Nå har vi  implementert sjekk om input er på riktig format, f.eks epost på "tekst@tekst.tekst" og nummer på telefonnummer hvor man også får kun tastatur med nummer på de feltene. Man får en popup som sier at man må fylle inn alle felter dersom man prøver å lagre uten å ha fylt inn alt, samt en popup med en beskjed om man vil lagre, og om man vil slette input når man trykker lagre/cancel. Dette gjør appen mye mer brukervennlig, da det er vanskeligere å gjøre feil, og man hele tiden får tilbakemelding på handlingene man utfører. 

## Universell utforming
Vi har fokusert på kravene i WCAG 2.0. Vi har gjort appen mulig å bruke for alle brukergrupper. Vi har intuitive navn på knapper (verb som tilsier hva handlingen utfører) og vi har lagt til accessibilityLabel på knapper og tekstfelt slik at appen er 100% mulig å bruke med en skjermlser. Vi har testet appen med skjermleser for å undersøke navigasjon, leserekkefølge og om menyer og innhold blir rett lest opp på både Android og iPhone. 

## Bruk av Git
For å få en oversikt over prosjektet, brøt vi ned oppgaven i issues. Hver issue hadde et nummer slik at gruppa kunne knytte commits til en spesifikt issue. Det er også blitt brukt labels til issuene for å vise hvilke typer arbeidsoppgaver det er. 
For at master branchen skulle fungere kontinuerlig, ble gruppa sammen enige om at koden skulle bli sjekket av et annet gruppemedlem først før det ble merget inn. Dette er for å sikre at all av funksjonalitet som er implementert, fungerer som det skal og for å sikre kodekvalitet. 
Gruppa ser likevel forbedringspotensial i bruk av Git til samarbeid. Utviklingsoppgavene kunne ha blitt brutt ned til flere issues slik at flere ikke trengte å jobbe på samme issuen. Dette er noe vi ønsker å forbedre oss ved fremtidige prosjekter.

## Testing
Vi har utført tester med skjermleser for å teste applikasjonens tilfredsstiller kravene til web accessibility. I tillegg har vi gjennomført en ende-til-ende test, samt brukertester på applikasjonen, for å kontrollere at funksjonaliteten er slik vi ønsker. For dette prosjektet har vi valgt å gjennomføre en manuell ende-til-ende test av applikasjonen for å sjekke at all av funksjonalitet fungerer som det skal. Dette innebærer å sjekke om søk, filtrering, sortering og pagination samt legge til en ny bruker fungerer som det skal. Vi sjekket også om designet er tilpasset for flere enheter. Applikasjonen er blitt testet både på iOS og Android enheter. 

## Videre utvikling
Grunnet tidsbegrensning og omfanget i prosjektet har ikke gruppen implementert videre funksjonalitet. En funksjonalitet som blir sett på som hensiktsmessig å implementere for en slik applikasjon er å kunne fjerne kunder som ikke benytter av tjenesten lenger. En annen funksjonalitet som kan være relevant er å kunne bytte abonnementstyper på kundene. For forbedring av brukeropplevelse kunne det ha vært mulig å implementere en funksjonalitet som lar brukerene bytte på mellom lys og mørk tema som kan gjøre det mer behagelig for øynene. Når det kommer til kodekvalitet kunne det blitt gjort om bruk av context API for filtering og søk om til redux for å gjøre det ryddigere med håndtering av global states. Likevel har vi gjort applikasjonen mer brukervennlig basert på tilbakemeldinger fra forrige prosjekt (prosjekt 3) som er nevnt i "Add Customer". Det har også blitt lagt til en indikator som er ment til å vise at dataene blir loadet. 
