# INL-AI

## Vad gör tjänsten?

Den här tjänsten är en AI-bildgenerator som låter dig skapa bilder baserat på korta beskrivningar. Om du inte har någon idé kan du också få en slumpmässig beskrivning att jobba med. Och du kan ladda ner de bilder som genereras.

## Målgruppen

Vem kan använda detta?

- Kreativa själar som designers och konstnärer som behöver lite inspiration.
- Tech-entusiaster som vill leka med AI-genererade bilder.
- Vanliga användare som vill skapa coola bilder.

## Avvägningar om etik och säker användning

Etik tas på allvar! Tjänsten är designad för att undvika att generera stötande eller olämpligt innehåll. Vi uppmanar alla att använda den på ett ansvarsfullt sätt och inte för något som kan vara skadligt.

## Andra väsentliga avvägningar som gjorts vid utvecklingen

- En hel del fokus har lagts på användarvänlighet och prestanda, just så att tjänsten är relativt snabb och användarvänlig, men viktigast så att du får dina bilder utan för mycket dröjsmål.
- Säkerhet är viktigt, så vi skyddar API-nycklar och användardata.
- Gränssnittet är enkelt och intuitivt, så även om du inte är tech-savvy kan du använda det utan problem.

---

## Teknisk dokumentation

Projektet är byggt med React och använder Axios för att kommunicera med OpenAI:s API. Här är en översikt över hur det fungerar:

1. **Komponentstruktur**: Huvudkomponenten `ImageGenerator` hanterar all logik för att generera bilder och hämta slumpmässiga beskrivningar. Den använder Reacts `useState` och `useRef` för att hantera tillstånd och referenser.

2. **API-anrop**:

   - För att generera en bild görs ett POST-anrop till OpenAI:s bildgenererings-API med en användardefinierad prompt.
   - För att hämta en slumpmässig prompt görs ett annat POST-anrop till OpenAI:s chat-API, där en kort beskrivning av en bild genereras.

3. **Laddningshantering**: Under tiden som API-anropen görs, sätts en laddningsindikator på för att ge användaren feedback.

4. **Stil och layout**: CSS används för att styla komponenterna och ge en responsiv design. Framer Motion används för att animera bilder och ikoner för en mer dynamisk användarupplevelse.

5. **Nedladdning av bilder**: När en bild har genererats kan användaren ladda ner den genom att klicka på en nedladdningsikon, vilket görs genom att sätta `href`-attributet till bildens URL.

## Komma igång

För att köra projektet lokalt, följ dessa steg:

1. Klona repositoryt:

   ```
   git clone <repository-url>
   npm i   -- först i roten
   ```

2. Installera beroenden:

   ```
   cd ai
   npm install  -- sen i react foldern
   ```

3. Starta applikationen:

   ```
   npm start
   ```

4. För att använda applikationen lokalt behöver du en API-nyckel. Kontakta mig för att få tillgång till `REACT_APP_API_KEY` som behövs för att kommunicera med OpenAI:s API.

Om du har några frågor eller behöver hjälp, tveka inte att kontakta mig! // mvh. William Janssen
