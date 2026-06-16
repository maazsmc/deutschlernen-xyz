export interface LocalPracticeData {
  title: string;
  instructions: string;
  germanText?: string;
  translation?: string;
  pronunciation?: string;
  audioStatement?: string;
  prompt?: string;
  readingQuestions?: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
  listeningQuestions?: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export const getLocalOfflinePractice = (lvl: string, skill: string): LocalPracticeData => {
  if (skill === "speaking") {
    if (lvl === "A1") {
      return {
        title: "Self-Introductions (Sich vorstellen)",
        instructions: "Introduce yourself in simple German sentences. Focus on name, origin, and age.",
        germanText: "Hallo! Ich heiße Anna. Ich komme aus Berlin und ich bin zwanzig Jahre alt.",
        translation: "Hello! My name is Anna. I come from Berlin and I am twenty years old.",
        pronunciation: "hah-loh! ikh HY-seh AHN-nah. ikh KOM-meh ows bair-LEEN oont ikh bin TSVAN-tsikh YAH-reh ahlt",
        prompt: "Say hello to a new teammate, tell them your name, where you are from, and your age in simple German."
      };
    } else if (lvl === "A2") {
      return {
        title: "Next Week Plans (Pläne für nächste Woche)",
        instructions: "Explain travel plans or weekend arrangements with compound tenses.",
        germanText: "Nächste Woche fliege ich für ein paar Tage nach Hamburg, um meine Familie zu besuchen.",
        translation: "Next week I am flying to Hamburg for a couple of days to visit my family.",
        pronunciation: "NEKH-steh VOKH-eh FLEE-gheh ikh fewr yn pahr TAH-gheh nahk HAHM-boork, oom MY-neh fah-MEE-lyeh tsoo beh-ZOO-khen",
        prompt: "A colleague asks you what you are doing next week. Practice explaining your travel arrangements."
      };
    } else if (lvl === "B1") {
      return {
        title: "Giving Recommendations (Empfehlungen geben)",
        instructions: "Use polite suggestions and subjunctive (Konjunktiv II) to offer travel advice.",
        germanText: "Wenn ich du wäre, würde ich am Wochenende den Zug nehmen, da die Autobahn oft überlastet ist.",
        translation: "If I were you, I would take the train on the weekend, as the highway is often congested.",
        pronunciation: "ven ikh doo VAIR-eh, VEUR-deh ikh ahm VOKH-en-en-deh dayn tsook NAY-men, dah dee OW-toh-bahn oft EW-ber-lahs-tet ist",
        prompt: "Offer recommendations to a close friend traveling to Berlin."
      };
    } else if (lvl === "B2") {
      return {
        title: "Expressing Unfulfilled Wishes (Wünsche ausdrücken)",
        instructions: "Formulate subjunctive wishes about the past or desirable future states.",
        germanText: "Wenn ich doch bloß mehr Zeit für meine Hobbys gehabt hätte!",
        translation: "If only I had had more time for my hobbies!",
        pronunciation: "ven ikh dokh blohs mair tsyt fewr MY-neh HOB-bees geh-HAHP-t HET-teh",
        prompt: "Express a past regret about having too much work and too little leisure time."
      };
    } else if (lvl === "C1") {
      return {
        title: "Advocating for Climate Policies (Stellungnahme)",
        instructions: "Express complex political statements with nominal sentences.",
        germanText: "Angesichts der globalen Erwärmung ist die sofortige Umsetzung drastischer Maßnahmen unerlässlich.",
        translation: "In light of global warming, the immediate implementation of drastic measures is indispensable.",
        pronunciation: "AHN-geh-zikhts dair gloh-BAH-len air-VÄR-moong ist dee zoh-FOR-tee-geh OOM-zet-soong DRAHS-tish-er MAHS-nah-men oon-air-LEHS-likh",
        prompt: "Provide an academic stance on climate action using sophisticated register."
      };
    } else {
      return {
        title: "Deep Nuance & Particles (Gedanklicher Reichtum)",
        instructions: "Convey complete mastery of stylistic nuance and modal particles.",
        germanText: "Du hättest mir ja Bescheid geben können, dann wäre das Missverständnis eh gar nicht erst entstanden.",
        translation: "You could indeed have let me know, then the misunderstanding would not have arisen in the first place anyway.",
        pronunciation: "doo HET-esst meer yah beh-SHYNT GAY-ben KERN-nen, dahn VAIR-eh dahs MISS-fair-shtent-nis ay gahr nikht airst ent-SHTAHN-den",
        prompt: "Formulate a sophisticated, emotionally nuanced statement with modal particles 'ja' and 'eh'."
      };
    }
  } else if (skill === "writing") {
    if (lvl === "A1") {
      return {
        title: "Ordering Breakfast at Café (Frühstück bestellen)",
        instructions: "Write simple greetings, order a hot drink and food politely, and ask for the bill.",
        prompt: "Draft a simple email or script where you order: a tea ('einen Tee'), a croissant ('ein Croissant'), and ask for the price politely."
      };
    } else if (lvl === "A2") {
      return {
        title: "Inquiring about Apartments (Wohnungssuche)",
        instructions: "Compose polite requests checking apartment features with correct adjective endings.",
        prompt: "Write a short request message to a landlord asking if the apartment has a balcony, how high the warm rent ('Warmmiete') is, and if pets are allowed."
      };
    } else if (lvl === "B1") {
      return {
        title: "Expressing Opinions on Remote Work (Homeoffice)",
        instructions: "Construct complex arguments with subordinate clauses (weil, obwohl, dass) outlining benefits and drawbacks.",
        prompt: "Write a short paragraph analyzing remote work. State at least one positive side (flexibility) and one negative side (isolation) in German."
      };
    } else if (lvl === "B2") {
      return {
        title: "Letters of Complaint (Eine Beschwerde schreiben)",
        instructions: "Formulate a formal complaint structured with polite irritation and connecting particles.",
        prompt: "Write a short complaint about a delayed delivery. State that you ordered the goods two weeks ago and request a prompt resolution or refund."
      };
    } else if (lvl === "C1") {
      return {
        title: "Analysing Demographic Statistics (Demografischer Wandel)",
        instructions: "Use nominal style elements and passive voice to write an academic reflection.",
        prompt: "Draft a formal commentary on the challenges of an aging society. Focus on the pension budget and health infrastructure using nominal style prepositional blocks like 'aufgrund des Anstiegs der Lebenserwartung'."
      };
    } else {
      return {
        title: "Philosophical Discourse on Technology (Mensch und Maschine)",
        instructions: "Compose highly elegant critiques utilizing subjunctive, modal particles, and advanced idioms.",
        prompt: "Write an essay snippet arguing whether AI will replace human creativity. Use complex compound nouns and include fine idioms such as 'von elementarer Bedeutung' or 'außer Zweifel stehen'."
      };
    }
  } else if (skill === "reading") {
    if (lvl === "A1") {
      return {
        title: "My Family at Home (Meine Familie)",
        instructions: "Read the story text and answer the multiple choice comprehension items.",
        germanText: "Hallo! Ich habe eine kleine Familie. Ich wohne mit meinem Vater, meiner Mutter und meiner Schwester Sophie in München. Mein Vater arbeitet als Lehrer und meine Mutter ist Ärztin. Meine Schwester Sophie geht noch zur Schule. Wir haben auch einen Hund namens Rex. Er ist sehr verspielt.",
        translation: "Hello! I have a small family. I live with my father, my mother and my sister Sophie in Munich. My father works as a teacher and my mother is a doctor. My sister Sophie still goes to school. We also have a dog named Rex. He is very playful.",
        readingQuestions: [
          {
            question: "Wo wohnt die Familie?",
            options: ["In Berlin", "In München", "In Hamburg", "In Köln"],
            correctIndex: 1,
            explanation: "The text says: 'Wir wohnen ... in München'."
          },
          {
            question: "Was macht die Mutter beruflich?",
            options: ["Sie ist Lehrerin", "Sie ist Ingenieurin", "Sie ist Ärztin", "Sie studiert"],
            correctIndex: 2,
            explanation: "The text says: 'meine Mutter ist Ärztin.'"
          }
        ]
      };
    } else if (lvl === "A2") {
      return {
        title: "Shopping in Berlin (Einkaufen in Berlin)",
        instructions: "Read the diary entry about department store schedules and complete responses.",
        germanText: "Letzten Samstag war ein anstrengender Tag. Ich bin am Vormittag auf den Flohmarkt gegangen, um gebrauchte Bücher zu suchen. Danach wollte ich Kleidung in einem Einkaufszentrum kaufen. Leider waren dort zu viele Leute und die Schlangen an der Kasse waren extrem lang. Zum Schluss habe ich im Supermarkt frisches Gemüse für das Abendessen gekauft.",
        translation: "Last Saturday was an exhausting day. I went to the flea market in the morning to search for used books. After that, I wanted to buy clothing in a shopping center. Unfortunately, there were too many people and the lines at the cash register were extremely long. Finally, I bought fresh vegetables at the supermarket for dinner.",
        readingQuestions: [
          {
            question: "Warum ging die Person am Vormittag auf den Flohmarkt?",
            options: ["Um Kleidung zu kaufen", "Um gebrauchte Bücher zu suchen", "Um Gemüse zu essen", "Um Freunde zu treffen"],
            correctIndex: 1,
            explanation: "The text states: '...auf den Flohmarkt gegangen, um gebrauchte Bücher zu suchen.'"
          },
          {
            question: "Wie beschreibt der Autor das Einkaufszentrum?",
            options: ["Es war sehr ruhig und leer", "Es war geschlossen", "Es waren zu viele Leute und lange Kassen-Schlangen", "Es war extrem billig"],
            correctIndex: 2,
            explanation: "The text explicitly complains: '...waren dort zu viele Leute und die Schlangen an der Kasse waren extrem lang.'"
          }
        ]
      };
    } else if (lvl === "B1") {
      return {
        title: "Sustainability in Germany (Nachhaltigkeit im Alltag)",
        instructions: "Understand standard public arguments about ecological efforts in German urban lifestyles.",
        germanText: "Nachhaltiger Konsum gewinnt in Deutschland zunehmend an Bedeutung. Viele Menschen verzichten im Alltag bewusst auf das eigene Auto und nutzen stattdessen den öffentlichen Personennahverkehr oder das Fahrrad. Zudem besagt eine aktuelle Studie, dass der Kauf von regionalen Bio-Lebensmitteln nicht nur die CO2-Emissionen verringert, sondern gleichzeitig die heimischen Landwirte stärkt. Ein bewusster Konsum schont wertvolle natürliche Ressourcen.",
        translation: "Sustainable consumption is increasingly gaining importance in Germany. Many people consciously do without their own car in everyday life and instead use public transport or the bicycle. Furthermore, a recent study states that purchasing regional organic food not only reduces CO2 emissions but simultaneously supports local farmers. Conscious consumption safeguards valuable natural resources.",
        readingQuestions: [
          {
            question: "Wie reisen viele Deutsche im Alltag umweltbewusst?",
            options: ["Mit Inlandsflügen", "Sie nutzen Bus, Bahn oder das Fahrrad", "Ausschließlich mit Sportwagen", "Sie verreisen gar nicht"],
            correctIndex: 1,
            explanation: "The text states: '...nutzen stattdessen den öffentlichen Personennahverkehr oder das Fahrrad.'"
          },
          {
            question: "Welchen doppelten Vorteil hat der Kauf regionaler Bio-Lebensmittel?",
            options: ["Es ist billig und schmeckt süß", "Es schont Ressourcen und erhält Museen", "Es reduziert CO2-Emissionen und stärkt heimische Landwirte", "Es verkürzt den Schultag"],
            correctIndex: 2,
            explanation: "According to the text: '...nicht nur die CO2-Emissionen verringert, sondern gleichzeitig die heimischen Landwirte stärkt.'"
          }
        ]
      };
    } else if (lvl === "B2") {
      return {
        title: "The Energy Transition (Die Energiewende)",
        instructions: "Read the article about German clean energy strategies and answer the questions.",
        germanText: "Die sogenannte Energiewende stellt eine der größten wirtschaftlichen Aufgaben für den modernen Industriestandort Deutschland dar. Ziel ist es, bis Mitte des Jahrhunderts Treibhausgase um mindestens 80 Prozent zu reduzieren. Durch den Ausbau von Wind- und Solarenergie soll die Stromversorgung Schritt für Schritt dekarbonisiert werden. Allerdings kritisiert die Industrie, dass die Netzkosten und die Strompreise im internationalen Vergleich zu hoch seien.",
        translation: "The so-called energy transition represents one of the largest economic tasks for the modern industrial location Germany. The goal is to reduce greenhouse gases by at least 80 percent by the middle of the century. Through the expansion of wind and solar energy, the power supply is to be decarbonized step by step. However, industry complains that grid costs and power prices are too high in international comparison.",
        readingQuestions: [
          {
            question: "Welches Ziel hat die Energiewende bis Mitte des Jahrhunderts?",
            options: ["Erhöhung der Kohleverstromung", "Reduktion der Treibhausgase um mindestens 80%", "Verdopplung des gesamten Schienennetzes", "Stopp jeglicher Solarforschung"],
            correctIndex: 1,
            explanation: "The text states: 'Ziel ist es, bis Mitte des Jahrhunderts Treibhausgase um mindestens 80 Prozent zu reduzieren.'"
          },
          {
            question: "Was wird von der Industrie kritisiert?",
            options: ["Dass es zu viel Wind gibt", "Die unzuverlässigen Bahnen", "Zu hohe Netzkosten und Strompreise", "Fehlende ausgebildete Techniker"],
            correctIndex: 2,
            explanation: "The text says: 'Allerdings kritisiert die Industrie, dass die Netzkosten und die Strompreise ... zu hoch seien.'"
          }
        ]
      };
    } else if (lvl === "C1") {
      return {
        title: "Standardization of Language (Sprachlicher Purismus)",
        instructions: "Analyse an essay on linguistic adaptation and cultural integration.",
        germanText: "Die Debatte über den Einfluss von Anglizismen auf das Gegenwartsdeutsch offenbart tief verwurzelte soziolinguistische Ängste. Während Traditionalisten vor Sprachverfall warnen und rigorose Regulierungen fordern, plädiert die moderne Linguistik für einen pragmatischen Umgang. Sprachen entwickelten sich historisch gesehen stets durch selektive Entlehnungen. Ein legislatives Einschreiten zur Reinhaltung der Sprache liefe der natürlichen Flexibilität kommunikativer Praktiken grundlegend zuwider.",
        translation: "The debate over the influence of Anglicisms on contemporary German reveals deeply rooted sociolinguistic anxieties. While traditionalists warn of language decay and demand rigorous regulations, modern linguistics argues for a pragmatic approach. Historically, languages have always evolved through selective borrowing. Legislative intervention to keep the language pure would run fundamentally counter to the natural flexibility of communicative practices.",
        readingQuestions: [
          {
            question: "Wie bewertet die moderne Linguistik den Einfluss von Anglizismen?",
            options: ["Sie fordert ein Verbot von englischen Ausdrücken", "Sie plädiert für einen pragmatischen Umgang", "Sie prophezeit den baldigen Untergang des Deutschen", "Sie ignoriert sprachliche Phänomene gänzlich"],
            correctIndex: 1,
            explanation: "The text explicitly states: 'während Traditionalisten ... fordern, plädiert die moderne Linguistik für einen pragmatischen Umgang.'"
          },
          {
            question: "Was wäre die Folge eines legislativen Einschreitens laut Text?",
            options: ["Eine Beschleunigung des Lernfortschritts", "Es liefe der natürlichen Flexibilität kommunikativer Praktiken zuwider", "Der sofortige Ausstieg aus der Union", "Die totale Standardisierung aller Sprachen"],
            correctIndex: 1,
            explanation: "The author says: 'Ein legislatives Einschreiten zur Reinhaltung der Sprache liefe der natürlichen Flexibilität... zuwider.'"
          }
        ]
      };
    } else {
      return {
        title: "Determinism & Free Will (Determinismus und Willensfreiheit)",
        instructions: "Analyze a complex philosophy prompt and answer the comprehension items.",
        germanText: "Die neurobiologische Infragestellung der menschlichen Willensfreiheit rührt an das Fundament unseres moralischen Selbstverständnisses. Postuliert man nämlich die lückenlose Vorherbestimmtheit aller kognitiven Prozesse durch neuronale Determinanten, so entbehrt das Konzept der persönlichen Verantwortung jeglicher rationalen Grundlage. Dennoch verweist die Rechtsphilosophie darauf, dass die soziale Kohäsion ohne das Postulat einer, wenn auch fiktiven, moralischen Zurechenbarkeit kollabieren müsste.",
        translation: "The neurobiological questioning of human free will touches the foundation of our moral self-understanding. For if one postulates the seamless predetermination of all cognitive processes by neuronal determinants, then the concept of personal responsibility lacks any rational basis. Nevertheless, the philosophy of law points out that social cohesion would have to collapse without the postulate of a moral accountability, even if it is a fictional one.",
        readingQuestions: [
          {
            question: "Was passiert mit der persönlichen Verantwortung, wenn alle kognitiven Prozesse vorherbestimmt sind?",
            options: ["Sie gewinnt an evolutionärer Relevanz", "Sie entbehrt jeglicher rationalen Grundlage", "Sie wird gesetzlich verordnet", "Sie bleibt unverändert bestehen"],
            correctIndex: 1,
            explanation: "The text says: '...so entbehrt das Konzept der persönlichen Verantwortung jeglicher rationalen Grundlage.'"
          },
          {
            question: "Warum benötigt die Rechtsphilosophie das Postulat der moralischen Zurechenbarkeit?",
            options: ["Um neue Gefängnisse zu rechtfertigen", "Damit die soziale Kohäsion nicht kollabiert", "Um medizinische Studien zu unterstützen", "Weil es empirisch bewiesen ist"],
            correctIndex: 1,
            explanation: "The text specifies: '...dass die soziale Kohäsion ohne das Postulat einer... moralischen Zurechenbarkeit kollabieren müsste.'"
          }
        ]
      };
    }
  } else {
    if (lvl === "A1") {
      return {
        title: "Friendly Greetings (Nette Grüße)",
        instructions: "Listen to the welcome statement and discover the correct answer.",
        audioStatement: "Guten Tag! Mein Name ist Herr Schmidt. Herzlich willkommen in Berlin. Ich hoffe, Sie haben einen angenehmen Aufenthalt.",
        translation: "Good day! My name is Mr. Schmidt. Warm welcome to Berlin. I hope you have a pleasant stay.",
        listeningQuestions: [
          {
            question: "What is the speaker's name in the audio?",
            options: ["Herr Müller", "Herr Schmidt", "Frau Schneider", "Herr Wagner"],
            correctIndex: 1,
            explanation: "The speaker clearly states: 'Mein Name ist Herr Schmidt.'"
          }
        ]
      };
    } else if (lvl === "A2") {
      return {
        title: "Inviting Over for Dinner (Eine Einladung zum Essen)",
        instructions: "Listen to this audio prompt where a friend calls to set up a shared meal.",
        audioStatement: "Hallo Sabine! Hast du heute Abend Lust, zusammen mit mir Pizza zu essen? Wir könnten uns um halb acht im Café treffen.",
        translation: "Hello Sabine! Would you like to eat pizza together tonight? We could meet at half past seven in the café.",
        listeningQuestions: [
          {
            question: "At what time does the friend propose to meet Sabine?",
            options: ["7:00 PM (Sieben Uhr)", "7:30 PM (Halb acht)", "8:00 PM (Acht Uhr)", "6:30 PM (Halb sieben)"],
            correctIndex: 1,
            explanation: "'halb acht' in German represents half-eight, which translates to 7:30 PM."
          }
        ]
      };
    } else if (lvl === "B1") {
      return {
        title: "Agreeing on an Activity (Terminabsprache)",
        instructions: "Listen to this dialogue clip indicating a schedule change and find out when the speakers will meet.",
        audioStatement: "Eigentlich wollten wir uns am Dienstag treffen. Aber da ich am Dienstag arbeiten muss, schlage ich Donnerstag vor. Passt das?",
        translation: "Actually, we wanted to meet on Tuesday. But since I have to work on Tuesday, I propose Thursday. Does that suit?",
        listeningQuestions: [
          {
            question: "Which day is the final proposal to meet?",
            options: ["Tuesday (Dienstag)", "Wednesday (Mittwoch)", "Thursday (Donnerstag)", "Friday (Freitag)"],
            correctIndex: 2,
            explanation: "The speaker proposes 'Donnerstag' as work came up on Tuesday."
          }
        ]
      };
    } else if (lvl === "B2") {
      return {
        title: "News Broadcast: Corporate Acquisition (Nachrichten)",
        instructions: "Listen to the corporate news clip and report the financial volume.",
        audioStatement: "Der Solar-Riese SunTech übernimmt nach wochenlangen Verhandlungen den insolventen Konkurrenten Helios für achtzig Millionen Euro.",
        translation: "The solar giant SunTech is acquiring the insolvent competitor Helios for eighty million euros after weeks of negotiations.",
        listeningQuestions: [
          {
            question: "How much is the transaction value for the acquisition of Helios?",
            options: ["€18,000,000", "€80,000,000", "€8,000,000", "€800,000,000"],
            correctIndex: 1,
            explanation: "'achtzig Millionen' translates to eighty million euros (80,000,000)."
          }
        ]
      };
    } else if (lvl === "C1") {
      return {
        title: "University Lecture snippet on Artificial Intelligence (KI-Kritik)",
        instructions: "Listen carefully to the professor's stance on artificial neural networks.",
        audioStatement: "Trotz fortschreitender Algorithmisierung der Kreativität bleibt ein KI-System auf historische Dateninferenz beschränkt und vermag keine echte, d.h. aus existenziellem Erleben geborene, kognitive Originalität zu schöpfen.",
        translation: "Despite the advancing algorithmization of creativity, an AI system remains restricted to historical data inference and is unable to create genuine cognitive originality born from existential experience.",
        listeningQuestions: [
          {
            question: "What according to the lecture is the primary limitation of AI art or creativity?",
            options: ["Lack of electric power infrastructure", "It is restricted to historical data inference and lacks existential originality", "It generates files too large for standard platforms", "It relies entirely on copyright infringement"],
            correctIndex: 1,
            explanation: "The lecture states the system 'bleibt auf historische Dateninferenz beschränkt und vermag keine echte ... Originalität zu schöpfen.'"
          }
        ]
      };
    } else {
      return {
        title: "Political Commentary on International Relationships (Diplomatisches Parkett)",
        instructions: "Listen to the highly elaborate broadcast snippet and answer.",
        audioStatement: "Jegliche einseitige Aufkündigung des multilateralen Abkommens stünde nicht nur im eklatanten Widerspruch zum Völkerrecht, sondern würde auch die ohnehin fragile diplomatische Balance vollends zunichte machen.",
        translation: "Any unilateral termination of the multilateral agreement would not only stand in blatant contradiction to international law but would also completely destroy the already fragile diplomatic balance.",
        listeningQuestions: [
          {
            question: "What is predicted to happen if the agreement is unilaterally terminated?",
            options: ["The diplomatic balance will completely collapse", "New trade routes will emerge immediately", "Financial ratings will rise by two brackets", "A peaceful resolution is guaranteed"],
            correctIndex: 0,
            explanation: "The speech explains: '...würde auch die ohnehin fragile diplomatische Balance vollends zunichte machen' (would completely destroy the balance)."
          }
        ]
      };
    }
  }
};
