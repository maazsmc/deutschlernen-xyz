export interface VocabularyItem {
  german: string;
  pronunciation: string;
  english: string;
  notes?: string;
}

export interface Lesson {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  germanTitle: string;
  description: string;
  explanation: string;
  keyGrammar: string;
  vocabulary: VocabularyItem[];
  quizTopic: string;
}

export const GERMAN_LESSONS: Lesson[] = [
  {
    id: "l1",
    level: "A1",
    title: "1. The Alphabet, Phonics & Sounds",
    germanTitle: "Das Alphabet & die Aussprache",
    description: "Master the unique sounds of the German alphabet, umlauts (ä, ö, ü), the special character ß, and crucial consonant combinations.",
    explanation: `The German alphabet contains the same 26 letters as English, plus four special sounds: **ä**, **ö**, **ü**, and **ß**. Understanding these and typical phonetic pairings allows you to read and pronounce almost any German word with perfect clarity!

### 1. The 26 Letters of the Standard German Alphabet:
Here is how each letter is pronounced on its own. **Click the red words to hear their pronunciation!**

* **A** (Pronounced: *ah*)
* **B** (Pronounced: *beh*)
* **C** (Pronounced: *tseh*)
* **D** (Pronounced: *deh*)
* **E** (Pronounced: *eh*)
* **F** (Pronounced: *eff*)
* **G** (Pronounced: *geh*)
* **H** (Pronounced: *hah*)
* **I** (Pronounced: *ee*)
* **J** (Pronounced: *yot*)
* **K** (Pronounced: *kah*)
* **L** (Pronounced: *ell*)
* **M** (Pronounced: *emm*)
* **N** (Pronounced: *enn*)
* **O** (Pronounced: *oh*)
* **P** (Pronounced: *peh*)
* **Q** (Pronounced: *koo*)
* **R** (Pronounced: *err*)
* **S** (Pronounced: *ess*)
* **T** (Pronounced: *teh*)
* **U** (Pronounced: *oo*)
* **V** (Pronounced: *fow*)
* **W** (Pronounced: *veh*)
* **X** (Pronounced: *iks*)
* **Y** (Pronounced: *ypsilon*)
* **Z** (Pronounced: *tsett*)

### 2. The Four Special German Characters:
* **Ä / ä** (Umlaut): Pronounced like the 'e' in "bet" or the 'a' in "late" (e.g., *Mädchen* - girl).
* **Ö / ö** (Umlaut): Formed by making an "ay" sound with your tongue while rounding your lips (resembles 'i' in "girl" or French 'eu') (e.g., *schön* - beautiful).
* **Ü / ü** (Umlaut): Formed by making an "ee" sound with your tongue while rounding your lips tightly (resembles French 'u') (e.g., *müde* - tired).
* **ß** (or *Eszett*): Sounded like a sharp double "ss". Note that it does not have an uppercase form historically, and is never used at the beginning of words (e.g., *heiß* - hot, *heißen* - to be named).

### 3. Major Vowel and Consonant Combinations (Phonics):
* **ei**: Sounded like "eye" in English (e.g., *nein* - no, *zwei* - two).
* **ie**: Sounded like a long "ee" in "green" (e.g., *sie* - she, *sieben* - seven).
* **eu / äu**: Sounded like "oy" in "boy" (e.g., *neu* - new, *Häuser* - houses).
* **sch**: Sounded like the english "sh" (e.g., *schnell* - fast, *Schule* - school).
* **st / sp**: At the *beginning* of a word or syllable, they are spoken as "sht" and "shp" (e.g., *sprechen* - to speak [shp-re-chen], *Straße* - street [sht-rahs-seh]).
* **ch**: Pronounced in two ways:
  1. Soft breezy 'ch' (after e, i, ä, ö, ü), like blowing air between tongue and teeth (e.g., *ich* - I).
  2. Throaty scratchy 'ch' (after a, o, u), like a soft clearing of the throat (e.g., *Buch* - book).
* **w**: Pronounced like the English **v** (e.g., *Wasser* - water [vahs-ser]).
* **v**: Pronounced like the English **f** (e.g., *Vater* - father [fah-ter]).
* **z**: Pronounced like a crisp "ts" (e.g., *zwei* - two [tsvy]).`,
    keyGrammar: "Introductory letter sounds and phonetic pairings. Realize that letters like 'V' sound like 'F', 'W' sounds like 'V', and 'Z' sounds like 'TS'.",
    vocabulary: [
      { german: "heißen", pronunciation: "HY-sen", english: "to be named", notes: "Uses the special 'ß' character" },
      { german: "nein", pronunciation: "nyne", english: "no", notes: "Classic 'ei' combination" },
      { german: "sieben", pronunciation: "ZEE-ben", english: "seven", notes: "'ie' sounds like 'ee', and 's' sounds like 'z'" },
      { german: "deutsch", pronunciation: "doytch", english: "German", notes: "'eu' sounds like 'oy'" },
      { german: "ich", pronunciation: "ikh", english: "I", notes: "Has the soft breezy 'ch' sound" },
      { german: "Buch", pronunciation: "bookh", english: "book", notes: "Has the throaty heavy 'ch' sound" },
      { german: "Mädchen", pronunciation: "MAYD-khen", english: "girl", notes: "Includes both 'ä' and soft 'ch'" },
      { german: "Wasser", pronunciation: "VAHS-ser", english: "water", notes: "'W' is pronounced like 'V'" }
    ],
    quizTopic: "German Alphabet, Umlauts and Letter Sounds"
  },
  {
    id: "l2",
    level: "A1",
    title: "2. Greetings, Introductions & Demographics",
    germanTitle: "Begrüßungen & Persönliche Angaben",
    description: "Learn to formalize greetings, politely greet contacts, present your name, origin nation, residence city, and spoken tongue.",
    explanation: `Starting a conversation with standard greetings and quick introductions sets a warm, polite stage. German clearly distinguishes between formal (Sie) and friendly (du) speech registers.

### 1. Common Greetings (Begrüßungen):
* **Hallo** - Hello (universal and casual).
* **Guten Morgen** - Good morning (used until approx. 11:00 AM).
* **Guten Tag** - Good day (used from late morning until 6:00 PM).
* **Guten Abend** - Good evening (from 6:00 PM onwards).
* **Tschüss** - Bye (friendly, informal).
* **Auf Wiedersehen** - Goodbye (formal).

### 2. Essential Questions to Introduce Yourself:
* **Asking for name:**
  * *Informal:* Wie heißt du? (What's your name?) -> **Ich heiße Anna.** or **Ich bin Anna.**
  * *Formal:* Wie heißen Sie?
* **Asking for origin (Where you come from):**
  * *Informal:* Woher kommst du? -> **Ich komme aus den USA / aus Kanada / aus Indien.**
  * *Formal:* Woher kommen Sie?
* **Asking for residence (Where you currently live):**
  * *Informal:* Wo wohnst du? -> **Ich wohne in Berlin / in München.**
  * *Formal:* Wo wohnen Sie?
* **Asking for spoken languages:**
  * *Informal:* Welche Sprachen sprichst du? -> **Ich spreche Deutsch und Englisch.**
  * *Formal:* Welche Sprachen sprechen Sie?

### 3. Politeness Accents:
* **Sehr erfreut!** or **Freut mich!** - Nice to meet you!
* **Wie geht es dir?** (informal) or **Wie geht es Ihnen?** (formal) - How are you?
* **Mir geht es sehr gut, danke.** - I am doing very well, thank you.`,
    keyGrammar: "Introduction to informal singular 'du' vs respectful formal capitalized 'Sie'. Contrast: 'wohns**t** du' with 'wohn**en** Sie'.",
    vocabulary: [
      { german: "Guten Tag", pronunciation: "GOO-ten TAHK", english: "Good day / Hello" },
      { german: "Wie heißen Sie?", pronunciation: "vee HY-sen zee", english: "What is your name? (formal)" },
      { german: "Woher kommen Sie?", pronunciation: "voh-HAIR KOM-en zee", english: "Where do you come from? (formal)" },
      { german: "Ich komme aus...", pronunciation: "ikh KOM-meh ows", english: "I come from..." },
      { german: "Wo wohnst du?", pronunciation: "voh vohnst doo", english: "Where do you live? (informal)" },
      { german: "Sprechen Sie Deutsch?", pronunciation: "SHPREKH-en zee doytch", english: "Do you speak German? (formal)" },
      { german: "Wie geht es Ihnen?", pronunciation: "vee gayt es EEN-en", english: "How are you? (formal)" },
      { german: "Sehr erfreut", pronunciation: "zair air-FROYT", english: "Nice to meet you / Delighted" }
    ],
    quizTopic: "Greetings, Introductions and Personal Demographics"
  },
  {
    id: "l3",
    level: "A1",
    title: "3. Counting & Numbers 0-100+",
    germanTitle: "Zahlen von 0 bis 100",
    description: "Learn to write and quickly call numbers 0 to 100, exchange telephone coordinate sequences, and speak your age.",
    explanation: `Numbers are necessary for checking prices, reading clocks, giving phone numbers, and talking about your age. In German, numbers above 20 follow a backward 'unit-and-ten' order!

### 1. Baseline Numbers 0 to 12 (Irregular):
* 0: **null**, 1: **eins**, 2: **zwei**, 3: **drei**, 4: **vier**, 5: **fünf**, 6: **sechs**, 7: **sieben**, 8: **acht**, 9: **neun**, 10: **zehn**, 11: **elf**, 12: **zwölfen / zwölf**.

### 2. Teenage Numbers 13 to 19:
Formed by appending the single digit unit prefix to **zehn** (ten).
* 13: **dreizehn** (three-ten)
* 14: **vierzehn** (four-ten)
* 15: **fünfzehn**
* 16: **sechzehn** (note: the 's' in sechs is dropped)
* 17: **siebzehn** (note: the 'en' in sieben is dropped)
* 18: **achtzehn**
* 19: **neunzehn**

### 3. The Round Tens (20, 30, 40...):
Standard round tens end in the suffix **-zig** (with 30 being an exception ending in **-ßig**).
* 20: **zwanzig**, 30: **dreißig**, 40: **vierzig**, 50: **fünfzig**, 60: **sechzig**, 70: **siebzig**, 80: **achtzig**, 90: **neunzig**.

### 4. Compound Numbers (The "Reverse" Rule):
For numbers between the tens (like 21, 54, 87), Germans state the single unit first, joined by the word **und** (and), followed by the round ten.
* 21: *one-and-twenty* = **einundzwanzig** (note: eins loses its 's')
* 35: *five-and-thirty* = **fünfunddreißig**
* 54: *four-and-fifty* = **vierundfünfzig**
* 87: *seven-and-eighty* = **siebenundachtzig**
* 100: **hundert** or **einhundert**.

### 5. Stating Age (Alter):
* Question: **Wie alt bist du?** (How old are you?)
* Answer: **Ich bin einunddreißig Jahre alt.** (I am 31 years old).`,
    keyGrammar: "Placing singular units ahead of round tens combined using the word 'und'. E.g. 'vierundzwanzig' rather than saying 'zwanzigvier'.",
    vocabulary: [
      { german: "null", pronunciation: "nool", english: "zero" },
      { german: "zwei", pronunciation: "tsvy", english: "two" },
      { german: "fünf", pronunciation: "fewnf", english: "five" },
      { german: "elf", pronunciation: "elf", english: "eleven" },
      { german: "zwanzig", pronunciation: "TSVAHN-tsikh", english: "twenty" },
      { german: "einunddreißig", pronunciation: "YN-oont-DRY-sikh", english: "thirty-one" },
      { german: "Wie alt bist du?", pronunciation: "vee ahlt bist doo", english: "How old are you?" },
      { german: "Jahre alt", pronunciation: "YAH-reh ahlt", english: "years old" }
    ],
    quizTopic: "Numbers and Age"
  },
  {
    id: "l4",
    level: "A1",
    title: "4. Subject Pronouns & Regular Verbs",
    germanTitle: "Personalpronomen & Konjugation",
    description: "Establish the complete table of grammatical subject pronouns and conjugate regular present-tense verbs.",
    explanation: `Unlike English where verb endings rarely change (e.g., "I work", "he works"), German verbs require a unique conjugated ending suffix for almost every subject pronoun.

### 1. Grammatical Subject Pronouns (Personalpronomen):
* **ich** - I
* **du** - you (informal singular)
* **er / sie / es** - he / she / it
* **wir** - we
* **ihr** - you all (informal plural)
* **sie** - they
* **Sie** - you (formal singular / plural - always capitalized!)

### 2. Present Tense Conjugation Recipe (Präsens):
To construct a present tense sentence, take the verb infinitive (e.g., *wohnen* - to live), remove the **-en** suffix to isolate the "stem" (*wohn-*), and add the corresponding regular ending suffixes:
* **ich** -> add **-e** (*ich wohne*)
* **du** -> add **-st** (*du wohnst*)
* **er/sie/es** -> add **-t** (*er wohnt*)
* **wir** -> add **-en** (*wir wohnen*)
* **ihr** -> add **-t** (*ihr wohnt*)
* **sie / Sie** -> add **-en** (*sie wohnen / Sie wohnen*)

### 3. Minor Spelling Adjustments:
* **Stem ending in t or d** (e.g., *arbeiten* - to work): Add an extra **-e-** before endings starting with 's' or 't' to make pronunciation pleasant:
  * *du arbeit**e**st*, *er arbeit**e**t*, *ihr arbeit**e**t*.
* **Stem ending in s, z or ß** (e.g., *heißen* - to be named): Drop the 's' in the 'du' suffix:
  * *du heiß**t**.*`,
    keyGrammar: "Regular verb endings table: **-e**, **-st**, **-t**, **-en**, **-t**, **-en** (recalled as 'est-ten-ten').",
    vocabulary: [
      { german: "wohnen", pronunciation: "VOH-nen", english: "to live / reside" },
      { german: "arbeiten", pronunciation: "AHR-by-ten", english: "to work" },
      { german: "lernen", pronunciation: "LAIR-nen", english: "to learn / study" },
      { german: "machen", pronunciation: "MAHKH-en", english: "to make / do" },
      { german: "kommen", pronunciation: "KOM-en", english: "to come" },
      { german: "schreiben", pronunciation: "SHRY-ben", english: "to write" },
      { german: "hören", pronunciation: "HER-en", english: "to hear / listen" },
      { german: "trinken", pronunciation: "TRINK-en", english: "to drink" }
    ],
    quizTopic: "Subject Pronouns and Regular Present Tense Verb Conjugation"
  },
  {
    id: "l5",
    level: "A1",
    title: "5. The Pillars: Sein & Haben",
    germanTitle: "Die Hilfsverben: Sein & Haben",
    description: "Master the conjugations and essential daily duties of the two core irregular auxiliary verbs.",
    explanation: `Just like in English, "to be" (*sein*) and "to have" (*haben*) are the single most important verbs in German. They are highly irregular but used in almost every conversational paragraph.

### 1. Conjugating 'sein' (to be) - Completely Irregular!
* **ich bin** - I am
* **du bist** - you are
* **er/sie/es ist** - he/she/it is
* **wir sind** - we are
* **ihr seid** - you all are (careful: *seid* with a 'd', not to be confused with *seit* meaning since)
* **sie / Sie sind** - they/you (formal) are

*Usage Examples:*
* **Ich bin müde.** - I am tired.
* **Wer bist du?** - Who are you?
* **Das ist fantastisch!** - That is fantastic!

### 2. Conjugating 'haben' (to have) - Slight Stem Drops!
* **ich habe** - I have
* **du hast** - you have (note: the 'b' in the stem *hab-* is dropped!)
* **er/sie/es hat** - he/she/it has (note: the 'b' is dropped!)
* **wir haben** - we have
* **ihr habt** - you all have
* **sie / Sie haben** - they/you (formal) have

*Usage Examples:*
* **Ich habe eine Frage.** - I have a question.
* **Hast du heute Zeit?** - Do you have time today?
* **Wir haben Glück.** - We are lucky (lit. *We have luck*).`,
    keyGrammar: "Irregular auxiliary verb conjugations for **sein** and **haben**. Crucial pattern is that 'du/er/sie/es' forms are highly modified from the base stem.",
    vocabulary: [
      { german: "sein", pronunciation: "zyne", english: "to be" },
      { german: "haben", pronunciation: "HAH-ben", english: "to have" },
      { german: "Ich bin müde", pronunciation: "ikh bin MOO-deh", english: "I am tired" },
      { german: "Hast du Hunger?", pronunciation: "hahst doo HOONG-er", english: "Are you hungry?" },
      { german: "Wir haben Zeit", pronunciation: "veer HAH-ben tsyt", english: "We have time" },
      { german: "Wer ist das?", pronunciation: "vair ist dahs", english: "Who is that?" },
      { german: "Ich habe ein Auto", pronunciation: "ikh HAH-beh ayn OW-toh", english: "I have a car" },
      { german: "Es ist kalt", pronunciation: "es ist kahlt", english: "It is cold" }
    ],
    quizTopic: "Conjugation of Sein and Haben"
  },
  {
    id: "l6",
    level: "A1",
    title: "6. Articles, Genders & Negation 'kein'",
    germanTitle: "Artikel, Genus & Negation",
    description: "Learn to recognize masculine, feminine, neuter nouns, plural groups, indefinite indicators, and negative articles.",
    explanation: `In English, there is only one word for "the". In German, every single noun has a grammatical gender (masculine, feminine, or neuter). You must learn nouns with their genders!

### 1. Definite Articles ("The") in the Subject Case (Nominative):
* **Der** (Masculine) - *der Hund* (the dog)
* **Die** (Feminine) - *die Katze* (the cat)
* **Das** (Neuter) - *das Haus* (the house)
* **Die** (Plural - same for all genders) - *die Hunde* (the dogs)

### 2. Indefinite Articles ("A / An") in Nominative:
* Masculine: **ein** -> *ein Hund* (a dog)
* Feminine: **eine** -> *eine Katze* (a cat)
* Neuter: **ein** -> *ein Haus* (a house)
* Plural: No indefinite article exists in plural. Just say: *Hunde* (dogs).

### 3. Noun Negation ("No/None/Not a") using "kein":
If you want to say "this is not a table" or "I have no sibling", you must negate the noun itself using **kein** (for masculine/neuter) and **keine** (for feminine/plural).
* Masculine: **kein** Hund -> *Das ist kein Hund.* (That is not a dog.)
* Feminine: **keine** Katze -> *Das ist keine Katze.* (That is not a cat.)
* Neuter: **kein** Haus -> *Wir haben kein Haus.* (We have no house.)
* Plural: **keine** Kinder -> *Sie haben keine Kinder.* (They have no children.)`,
    keyGrammar: "Articles change based on gender: Masc (der/ein/kein), Fem (die/eine/keine), Neut (das/ein/kein), Plur (die/---/keine).",
    vocabulary: [
      { german: "der Mann", pronunciation: "dair mahn", english: "the man" },
      { german: "die Frau", pronunciation: "dee frow", english: "the woman" },
      { german: "das Kind", pronunciation: "dahs kint", english: "the child" },
      { german: "der Hund", pronunciation: "dair hoont", english: "the dog" },
      { german: "die Katze", pronunciation: "dee KAHT-seh", english: "the cat" },
      { german: "das Buch", pronunciation: "dahs bookh", english: "the book" },
      { german: "das Haus", pronunciation: "dahs hows", english: "the house" },
      { german: "kein", pronunciation: "kyne", english: "no / not any (negation)" }
    ],
    quizTopic: "Definite, Indefinite and Negative Articles in Nominative"
  },
  {
    id: "l7",
    level: "A1",
    title: "7. Family, Relations & Possessive Determiners",
    germanTitle: "Die Familie & Possessivartikel",
    description: "Discuss members of the modern family and state personal possession using 'mein' (my) and 'dein' (your).",
    explanation: `Talking about family members is an excellent way to practice vocabulary and describe ownership. To say "my father" or "your grandmother", we use possessive adjectives which take endings identical to the 'ein/eine' indefinite article chart.

### 1. Essential Family Members:
* **die Eltern** - parents
* **der Vater** - father / **die Mutter** - mother
* **der Sohn** - son / **die Tochter** - daughter
* **der Bruder** - brother / **die Schwester** - sister
* **die Geschwister** - siblings
* **der Opa** - grandfather / **die Oma** - grandmother
* **der Mann** - husband / **die Frau** - wife

### 2. Possessive Determiners: "mein" (my) & "dein" (your):
The endings of possessive determiners match the gender and case of the noun being described:
* **Mein / Dein** (Masculine & Neuter):
  * *mein Vater* (my father), *mein Kind* (my child)
  * *dein Vater* (your father), *dein Kind* (your child)
* **Meine / Deine** (Feminine & Plural, add trailing **-e**):
  * *meine Mutter* (my mother), *meine Geschwister* (my siblings)
  * *deine Mutter* (your mother), *deine Geschwister* (your siblings)

*Usage examples in conversation:*
* **Das ist meine Schwester.** - That is my sister.
* **Ist das dein Bruder?** - Is that your brother?
* **Unsere Eltern wohnen in Berlin.** - Our parents live in Berlin.`,
    keyGrammar: "Possessive adjectives require an inflectional '-e' when preceding feminine or plural nouns in the subject position.",
    vocabulary: [
      { german: "der Vater", pronunciation: "dair FAH-ter", english: "the father" },
      { german: "die Mutter", pronunciation: "dee MOOT-ter", english: "the mother" },
      { german: "das Baby", pronunciation: "dahs BAY-bee", english: "the baby" },
      { german: "die Eltern", pronunciation: "dee EL-tern", english: "the parents" },
      { german: "die Geschwister", pronunciation: "dee geh-SHVIS-ter", english: "the siblings" },
      { german: "mein / meine", pronunciation: "myn / MY-neh", english: "my" },
      { german: "dein / deine", pronunciation: "dyn / DY-neh", english: "your" },
      { german: "die Schwester", pronunciation: "dee SHVES-ter", english: "the sister" }
    ],
    quizTopic: "Family Vocabulary and Possessive Pronouns"
  },
  {
    id: "l8",
    level: "A1",
    title: "8. Calendar, Weekdays & Clock Time",
    germanTitle: "Uhrzeit & Wochentage",
    description: "Learn to state the days of the week, months, and read time in both formal and informal styles.",
    explanation: `Structuring schedules, saying dates, and expressing specific hours are vital day-to-day coordination skills.

### 1. Days of the Week (Wochentage) - All are Masculine (der):
* **Montag** (Monday), **Dienstag** (Tuesday), **Mittwoch** (Wednesday), **Donnerstag** (Thursday), **Freitag** (Friday), **Samstag** or *Sonnabend* (Saturday), **Sonntag** (Sunday).
* **Preposition rule:** Always use **am** (on) with days: **am Montag** (on Monday), **am Wochenende** (on the weekend).

### 2. Months of the Year (Monate) - All are Masculine (der):
* **Januar**, **Februar**, **März**, **April**, **Mai**, **Juni**, **Juli**, **August**, **September**, **Oktober**, **November**, **Dezember**.
* **Preposition rule:** Always use **im** (in) with months: **im Juli** (in July).

### 3. Telling Time (Uhrzeit):
German uses two registers:
* **The Formal 24-Hour Digital Clock** (Used in news broadcast, flights):
  * Say: Hour + "Uhr" + Minutes.
  * 08:30 -> **acht Uhr dreißig**
  * 14:15 -> **vierzehn Uhr fünfzehn**
  * 20:45 -> **zwanzig Uhr fünfundvierzig**
* **The Informal 12-Hour Casual Clock** (Used in daily conversation):
  * Relies on minutes relative to the half hour or main hour. Note that **halb** (half) means half-way TO the upcoming hour!
  * **vor** = before / **nach** = after.
  * 08:15 -> **Viertel nach acht** (quarter past eight)
  * 07:45 -> **Viertel vor acht** (quarter to eight)
  * 08:30 -> **halb neun** (lit. *half nine* - meaning 30 minutes until nine!)
  * 08:25 -> **fünf vor halb neun** (five minutes before half line)
  * **Preposition rule:** Use **um** for specific hours: **um 8 Uhr** (at 8 o'clock).`,
    keyGrammar: "Use of temporal prepositions: **um** for clock times (*um 10 Uhr*), **am** for weekdays/dates (*am Samstag*), and **im** for months/seasons (*im Sommer*).",
    vocabulary: [
      { german: "Wie spät ist es?", pronunciation: "vee shpayt ist es", english: "What time is it? (colloquial)" },
      { german: "Es ist halb acht", pronunciation: "es ist hahlp ahkt", english: "It is 7:30 (halfway to eight)" },
      { german: "Uhr", pronunciation: "oor", english: "o'clock / clock" },
      { german: "am Montag", pronunciation: "ahm MOHN-tahk", english: "on Monday" },
      { german: "im Sommer", pronunciation: "im ZOM-mer", english: "in the summer" },
      { german: "um wie viel Uhr?", pronunciation: "oom vee feel oor", english: "at what time?" },
      { german: "die Woche", pronunciation: "dee VOH-kheh", english: "the week" },
      { german: "das Wochenende", pronunciation: "dahs VOH-khen-en-deh", english: "the weekend" }
    ],
    quizTopic: "Numbers and Formal and Informal Time Expressions"
  },
  {
    id: "l9",
    level: "A1",
    title: "9. Foods, Drinks & The Accusative Case",
    germanTitle: "Essen & Der Akkusativ",
    description: "Identify food items and master the direct object Accusative case where only masculine changes.",
    explanation: `German has four cases that show a noun's function in a sentence. The **Nominative** case is for the subject acting. The **Accusative** case is for the direct object receiving the action.

### 1. The Fantastic Secret: Only Masculine Changes!
When a sentence shifts into the Accusative Case, feminine, neuter, and plural nouns keep their standard nominative articles completely unchanged. Only masculine articles undergo a transformation!
* **Der** becomes **Den**
* **Ein** becomes **Einen**
* **Kein** becomes **Keinen**
* **Mein** becomes **Meinen**

### 2. Seeing it in action with transitive verbs (haben, essen, trinken, kaufen):
* **Der Apfel** (masculine apple):
  * Subject: *Der Apfel ist lecker.* (The apple is delicious.)
  * Direct Object: *Ich esse **den** Apfel.* (I am eating the apple.)
  * Direct Object: *Ich kaufe **einen** Apfel.* (I am buying an apple.)
* **Die Banane** (feminine banana):
  * Direct Object: *Ich esse **eine** Banane.* (Unchanged!)
* **Das Wasser** (neuter water):
  * Direct Object: *Ich trinke **ein** Wasser.* (Unchanged!)`,
    keyGrammar: "Direct objects in the Accusative case. Only masculine singular nouns undergo article shifts (der -> den, ein -> einen).",
    vocabulary: [
      { german: "essen", pronunciation: "ES-sen", english: "to eat" },
      { german: "trinken", pronunciation: "TRINK-en", english: "to drink" },
      { german: "der Apfel", pronunciation: "dair AHP-fel", english: "the apple" },
      { german: "der Kaffee", pronunciation: "dair KAF-ay", english: "the coffee" },
      { german: "die Milch", pronunciation: "dee milkh", english: "the milk" },
      { german: "das Brot", pronunciation: "dahs broht", english: "the bread" },
      { german: "das Gemüse", pronunciation: "dahs geh-MEW-zeh", english: "the vegetables" },
      { german: "das Wasser", pronunciation: "dahs VAHS-ser", english: "the water" }
    ],
    quizTopic: "Food, Beverage and direct objects in Accusative Case"
  },
  {
    id: "l10",
    level: "A1",
    title: "10. At the Restaurant & Polite Orders",
    germanTitle: "Im Restaurant & Höflichkeit",
    description: "Order menu items gracefully, request the bill, ask questions and learn tips / dining rules.",
    explanation: `When dining out in Germany, politeness is conveyed via grammatical mood rather than excessive words.

### 1. Politeness Modals instead of "I want...":
Never translate "I want" literally (*Ich will*) in a restaurant, as it sounds extremely aggressive. Instead, use:
* **Ich möchte gern...** - I would like... (e.g., *Ich möchte gern die Suppe, bitte.*)
* **Ich hätte gern...** - I would like to have... (e.g., *Ich hätte gern ein Bier.*)

### 2. Useful Phrases for the Table:
* **Könnte ich bitte die Speisekarte haben?** - Could I please have the menu?
* **Guten Appetit!** - Enjoy your meal!
* **Prost!** or **Zum Wohl!** - Cheers!

### 3. Paying the bill (*Die Rechnung zahlen*):
To pay, alert the waiter politely. You often pay directly at the table:
* **Zahlen, bitte!** - Pay, please!
* The server will ask: **Zusammen oder getrennt?** (Together or separately?)
* Reply: **Zusammen, bitte.** (Together, please) or **Getrennt, bitte.** (Separately, please).
* **Tipping custom:** Give sound rounding up (approx. 5-10% in cash). Handing money, say: **Es stimmt so.** (Keep the change).`,
    keyGrammar: "Use of the polite subjunctive auxiliary expressions **möchte gern** and **hätte gern**. Notice question helper: Verb resides in Position 1 for Yes/No requests.",
    vocabulary: [
      { german: "die Speisekarte", pronunciation: "dee SHPY-zeh-kar-teh", english: "the menu" },
      { german: "die Rechnung", pronunciation: "dee REKH-noong", english: "the bill / invoice" },
      { german: "Ich möchte gern...", pronunciation: "ikh MERCH-teh gairn", english: "I would like..." },
      { german: "zahlen, bitte", pronunciation: "TSAH-len BIT-teh", english: "pay, please" },
      { german: "Zusammen oder getrennt?", pronunciation: "tsoo-ZAH-men oh-der geh-TRENT", english: "Together or separate?" },
      { german: "Das schmeckt lecker", pronunciation: "dahs shmekt LEK-er", english: "That tastes delicious" },
      { german: "Guten Appetit!", pronunciation: "GOO-ten Ah-peh-TEET", english: "Enjoy your meal!" },
      { german: "Es stimmt so", pronunciation: "es shtimt zoh", english: "Keep the change" }
    ],
    quizTopic: "Dining Dialogues and Polite Subjunctive Wishes"
  },
  {
    id: "l11",
    level: "A1",
    title: "11. Hobbies, Free Time & Separable Verbs",
    germanTitle: "Freizeit & Trennbare Verben",
    description: "Learn to describe leisure hobbies and dominate separable verb clauses.",
    explanation: `German has a highly unique class of verbs called **Separable Verbs** (Trennbare Verben). These verbs consist of an action base and a structural spatial prefix (e.g., **auf-** + **stehen** = *aufstehen* / to stand up).

### 1. The Prefix-Kicking Sentence Rule:
In a normal direct sentence, you conjugate the core base verb normally and place it in **Position 2**. But you must detach the prefix and kick it to the **absolute end** of the clause!

* **aufstehen** (to get up / prefix is *auf*):
  * Infinitive: *aufstehen*
  * Conjugated Sentence: *Ich **stehe** jeden Morgen um sieben Uhr **auf**.*
* **einkaufen** (to shop groceries / prefix is *ein*):
  * Conjugated Sentence: *Er **kauft** heute Gemüse **ein**.*
* **fernsehen** (to watch TV / prefix is *fern*):
  * Conjugated Sentence: *Wir **sehen** am Abend **fern**.*

### 2. Common Separable Prefixes:
Keep an eye out for prefixes like **auf-**, **ein-**, **an-**, **mit-**, **fern-**, **ab-**, and **aus-**. Notice they are heavily stressed in speech pronunciation!`,
    keyGrammar: "Separable verb word orders: Subject + Conjugated Base Verb (Position 2) + Other Details + Prefix (Absolute End of sentence).",
    vocabulary: [
      { german: "aufstehen", pronunciation: "OWF-shtay-en", english: "to get up" },
      { german: "einkaufen", pronunciation: "YN-kow-fen", english: "to grocery shop" },
      { german: "fernsehen", pronunciation: "FERN-zay-en", english: "to watch TV" },
      { german: "Fahrrad fahren", pronunciation: "FAHR-raht fah-ren", english: "to ride a bike" },
      { german: "Musik hören", pronunciation: "moo-ZEEK her-en", english: "to listen to music" },
      { german: "lesen", pronunciation: "LAY-zen", english: "to read" },
      { german: "der Sport", pronunciation: "dair shport", english: "the sport" },
      { german: "die Freizeit", pronunciation: "dee FRY-tsyt", english: "the free time" }
    ],
    quizTopic: "Hobbies and Separable Verb Sentences"
  },
  {
    id: "l12",
    level: "A1",
    title: "12. Daily Duties & Modal Verbs",
    germanTitle: "Modalverben im Alltag",
    description: "Express competence, obligations, wants, and permission using the structural family of German Modal Verbs.",
    explanation: `Modal verbs express how you interact with an activity (ability, obligation, desire, permission). They follow a unique structural word order rules.

### 1. Strict Modal Sentence order:
* The conjugated modal verb is placed in **Position 2**.
* The main action verb is placed at the **very end of the sentence in its infinitive form** (unconjugated!).
* *Example:* **Ich kann Deutsch sprechen.** (I can speak German - 'kann' in Position 2, 'sprechen' at the absolute end).
* *Example:* **Wir müssen heute Deutsch lernen.** (We must learn German today).

### 2. Irregular Singular Stems (Crucial!):
In the singular (ich, du, er/sie/es), modal verbs change their vowel stem. Furthermore, the **ich** and **er/sie/es** forms have NO endings and look completely identical!
* **Können** (Ability / Can):
  * *ich kann*, *du kannst*, *er/sie/es kann* (we/you/they are regular: *wir können*, *ihr könnt*, *sie können*)
* **Müssen** (Duty / Must / Have to):
  * *ich muss*, *du musst*, *er/sie/es muss* (*wir müssen*, *ihr müsst*, *sie müssen*)
* **Wollen** (Will / Strong Desire / Want):
  * *ich will*, *du willst*, *er/sie/es will* (*wir wollen*, *ihr wollt*, *sie wollen*)`,
    keyGrammar: "Modals: Modal verb conjugated in Position 2 + Infinitive at the physical end of the clause. Note identical Conjugation of 'ich' and 'er/sie/es'.",
    vocabulary: [
      { german: "können", pronunciation: "KERN-en", english: "can / to be able to" },
      { german: "müssen", pronunciation: "MEWS-sen", english: "must / to have to" },
      { german: "wollen", pronunciation: "VOL-en", english: "to want" },
      { german: "dürfen", pronunciation: "DEWR-fen", english: "may / to be permitted to" },
      { german: "sollen", pronunciation: "ZOL-en", english: "should / ought to" },
      { german: "mögen", pronunciation: "MER-gen", english: "to like" },
      { german: "Hausaufgaben machen", pronunciation: "HOWS-owf-gah-ben MAHKH-en", english: "to do homework" },
      { german: "schlafen", pronunciation: "SHLAH-fen", english: "to sleep" }
    ],
    quizTopic: "Modal Verbs Word Orders"
  },
  {
    id: "l13",
    level: "A1",
    title: "13. Shopping, Clothing & Colors",
    germanTitle: "Kleidung, Farben & Einkaufen",
    description: "Learn to describe outfits, identify major colors, ask for different sizes, and talk about prices in a German clothing store.",
    explanation: `When go shopping (*Einkaufen*), you'll need vocabulary for garments, sizes, colors, and basic financial transactions.

### 1. Colors (Farben):
* **rot** (red), **blau** (blue), **grün** (green), **gelb** (yellow), **schwarz** (black), **weiß** (white), **grau** (gray), **braun** (brown).
* Usage: *Das Hemd ist blau.* (The shirt is blue.)

### 2. Outfits & Clothing (Kleidung):
* **der Mantel** (coat), **der Pullover** (sweater), **die Hose** (pants), **die Jacke** (jacket), **das Hemd** (shirt), **das Kleid** (dress), **die Schuhe** (shoes - plural).

### 3. Shopping Phrases:
* **Ich suche eine Hose.** - I am looking for pants.
* **Haben Sie das auch in Größe L?** - Do you have this in size L as well?
* **Kann ich das anprobieren?** - Can I try this on?
* **Wo ist die Umkleidekabine?** - Where is the changing room?
* **Wie viel kostet das?** or **Was kostet der Mantel?** - How much does it cost? / What does the coat cost?`,
    keyGrammar: "Demonstrative pronouns: using definite articles as words to say 'this one' or 'that one' (e.g. *Der da kostet 50 Euro*). Declension of 'dieser' (this) like the definite article.",
    vocabulary: [
      { german: "die Kleidung", pronunciation: "dee KLY-doong", english: "the clothing" },
      { german: "die Hose", pronunciation: "dee HOH-zeh", english: "the pants" },
      { german: "der Pullover", pronunciation: "dair pool-OH-ver", english: "the sweater" },
      { german: "das Hemd", pronunciation: "dahs hemt", english: "the shirt" },
      { german: "Wie viel kostet...", pronunciation: "vee feel KOS-tet", english: "How much costs..." },
      { german: "grün", pronunciation: "grewn", english: "green" },
      { german: "die Umkleidekabine", pronunciation: "dee OOM-kly-deh-kah-bee-neh", english: "the changing room" },
      { german: "Größe", pronunciation: "GRER-seh", english: "size" }
    ],
    quizTopic: "Shopping, Clothing Names and Colors"
  },
  {
    id: "l14",
    level: "A1",
    title: "14. Home, Furniture & Two-Way Prepositions",
    germanTitle: "Haus, Möbel & Wechselpräpositionen",
    description: "Describe your home, identify rooms and typical furniture, and learn the basic concept of space position with prepositions.",
    explanation: `Your home (*dein Zuhause*) consists of different rooms (*Räume*) containing various items of furniture (*Möbel*). German describes these locations using two-way prepositions.

### 1. Rooms of the House (Räume):
* **das Wohnzimmer** (living room), **das Schlafzimmer** (bedroom), **die Küche** (kitchen), **das Badezimmer** (bathroom), **der Flur** (hallway).

### 2. Common Furniture (Möbel):
* **das Bett** (bed), **der Tisch** (table), **der Stuhl** (chair), **das Sofa** (sofa), **der Schrank** (cupboard / closet), **die Lampe** (lampe).

### 3. Introduction to Two-Way Prepositions (Wechselpräpositionen):
These prepositions (**in, an, auf, unter, über, vor, hinter, neben, zwischen**) can take either the Dative or Accusative cases:
* Use **Dative** if it is a stable static location (**Wo?** - Where is it?):
  * *Das Buch liegt auf **dem** Tisch.* (The book lies on the table - Dative!)
* Use **Accusative** if it is a dynamic movement or direction (**Wohin?** - To where?):
  * *Ich lege das Buch auf **den** Tisch.* (I am putting the book onto the table - Accusative!)`,
    keyGrammar: "Two-Way prepositions (Wechselpräpositionen). Location 'Wo' takes Dative (der/das -> dem). Direction 'Wohin' takes Accusative (der -> den).",
    vocabulary: [
      { german: "das Wohnzimmer", pronunciation: "dahs VOHN-tsim-mer", english: "the living room" },
      { german: "die Küche", pronunciation: "dee KEW-kheh", english: "the kitchen" },
      { german: "das Bett", pronunciation: "dahs bet", english: "the bed" },
      { german: "der Tisch", pronunciation: "dair tish", english: "the table" },
      { german: "der Schrank", pronunciation: "dair shrahnk", english: "the cupboard" },
      { german: "auf dem Tisch", pronunciation: "owf daym tish", english: "on the table (dative)" },
      { german: "neben", pronunciation: "NAY-ben", english: "next to" },
      { german: "wohnen", pronunciation: "VOH-nen", english: "to live" }
    ],
    quizTopic: "Rooms, Furniture and basic Position Prepositions"
  },
  {
    id: "l15",
    level: "A1",
    title: "15. Health, Body & Expressing Ills",
    germanTitle: "Körper & Gesundheit",
    description: "Learn the names of main body parts, describe minor health complaints, and express physical sensations or pain.",
    explanation: `Being able to describe your physical body and state when you are unwell is a vital conversational survival skill when visiting German-speaking countries.

### 1. Parts of the Body (Körperteile):
* **der Kopf** (head), **der Arm** (arm), **die Hand** (hand / plur. *Hände*), **das Bein** (leg), **der Fuß** (foot / plur. *Füße*), **der Bauch** (belly / stomach), **der Rücken** (back), **das Auge** (eye / plur. *Augen*).

### 2. Describing Pain (*Schmerzen*):
You can state pain in two standard ways:
1. Combining the body part with the word **-schmerzen** (aches/pains):
   * *Ich habe **Kopfschmerzen**.* (I have a headache.)
   * *Ich habe **Bauchschmerzen**.* (I have a stomach ache.)
2. Using the verb **wehtun** (to hurt / ache):
   * *Mein Kopf tut weh.* (My head hurts - singular)
   * *Meine Beine tun weh.* (My legs hurt - plural)

### 3. Sickness & Medical Greetings:
* **Ich bin krank.** - I am sick.
* **Ich habe Fieber.** - I have a fever.
* **Ich habe eine Erkältung.** - I have a cold.
* **Gute Besserung!** - Get well soon!`,
    keyGrammar: "Using 'wehtun' as a separable verb: **tut weh** (singular subject) vs **tun weh** (plural subject). Note that 'wehtun' takes a dative recipient if stated: *Mir tut der Bauch weh.*",
    vocabulary: [
      { german: "der Kopf", pronunciation: "dair kopf", english: "the head" },
      { german: "die Hand", pronunciation: "dee hahnt", english: "the hand" },
      { german: "der Bauch", pronunciation: "dair bowkh", english: "the stomach" },
      { german: "Kopfschmerzen", pronunciation: "KOPF-shmairt-sen", english: "headache" },
      { german: "weh tun", pronunciation: "vay toon", english: "to hurt" },
      { german: "Ich bin krank", pronunciation: "ikh bin krahnk", english: "I am sick" },
      { german: "die Erkältung", pronunciation: "dee air-KEL-toong", english: "the cold" },
      { german: "Gute Besserung!", pronunciation: "GOO-teh BES-seh-roong", english: "Get well soon!" }
    ],
    quizTopic: "Body Parts and expressing Illnesses"
  },
  {
    id: "l16",
    level: "A1",
    title: "16. Cities, Directions & Polite Imperatives",
    germanTitle: "Stadt, Wegbeschreibung & Imperativ",
    description: "Navigate throughout a city, ask for locations (stations, bathrooms), and learn how to politely direct others with imperative verbs.",
    explanation: `When traveling in a German city, you'll need coordinates to find your way and understand directions spoken by locals.

### 1. City Locations (Orte in der Stadt):
* **der Bahnhof** (train station), **die Haltestelle** (bus/tram stop), **das Hotel** (hotel), **das Restaurant** (restaurant), **die Bank** (bank), **die Toilette** (bathroom), **die Apotheke** (pharmacy).

### 2. Asking for Directions:
* **Entschuldigung, wo ist der Bahnhof?** - Excuse me, where is the train station?
* **Wie komme ich zum Hotel?** - How do I get to the hotel?
* **Gibt es hier eine Apotheke?** - Is there a pharmacy here?

### 3. Understanding Directions:
* **geradeaus** - straight ahead / **links** - left / **rechts** - right.
* **erste Querstraße links** - first cross street on the left.

### 4. Giving Polite Suggestions (The Formal Imperative):
To tell someone politely to go somewhere, place the Verb in **Position 1** followed immediately by **Sie**:
* **Gehen Sie geradeaus!** - Go straight ahead!
* **Biegen Sie rechts ab!** - Turn right! (from the separable verb *abbiegen*)
* **Entschuldigen Sie!** - Pardon/Excuse me!`,
    keyGrammar: "Polite formal imperative: Verb (Position 1) + Sie. Substantive nouns combine in dative when asking 'How do I get to...': **zum** (to masculine/neuter *zu dem*) and **zur** (to feminine *zu der*).",
    vocabulary: [
      { german: "der Bahnhof", pronunciation: "dair BAHN-hohf", english: "the train station" },
      { german: "Entschuldigung", pronunciation: "ent-SHOOL-dee-goong", english: "excuse me / sorry" },
      { german: "geradeaus", pronunciation: "geh-RAH-deh-ows", english: "straight ahead" },
      { german: "links / rechts", pronunciation: "leanks / rekhts", english: "left / right" },
      { german: "Gehen Sie...", pronunciation: "GAY-en zee", english: "Go... (polite directive)" },
      { german: "Biegen Sie ab", pronunciation: "BEE-gen zee ahp", english: "Turn... (polite directive)" },
      { german: "zum Bahnhof", pronunciation: "tsoom BAHN-hohf", english: "to the train station" },
      { german: "zur Toilette", pronunciation: "tsoor toy-LET-teh", english: "to the toilet" }
    ],
    quizTopic: "City Venues, Directions and Polite Imperatives"
  },
  {
    id: "l17",
    level: "A1",
    title: "17. Weather, Seasons & Sensation Phrases",
    germanTitle: "Wetter, Jahreszeiten & Empfindungen",
    description: "Learn how to speak about rain, snow, heat, describe the 4 seasons, and utilize the personal sensation dative structure.",
    explanation: `The weather is a classic topic of small talk. Speaking about physical temperatures in German has a special grammar rule you must not miss!

### 1. Seasons of the Year (Jahreszeiten) - All are Masculine (der):
* **der Frühling** (spring), **der Sommer** (summer), **der Herbst** (autumn/fall), **der Winter** (winter).
* Preposition: **im Sommer** (in summer), **im Winter** (in winter).

### 2. Describing the Weather (Wetter):
* **Das Wetter ist schön / schlecht.** - The weather is good / bad.
* **Es regnet.** - It is raining. / **Es schneit.** - It is snowing.
* **Es ist windig.** - It is windy. / **Es ist bewölkt.** - It is cloudy.
* **Die Sonne scheint.** - The sun is shining.

### 3. Crucial Sensation Grammar: "Sensing" temperatures:
In English, you say "I am hot" or "I am cold". In German, if you say "Ich bin warm/kalt", it translates to "I am warm-headed" or "I am sexually cold/heartless".
To convey feeling high or low physical temperature, you must use **Dative (mir) + Es ist + Sensation adjective**:
* **Mir ist kalt.** - I am cold (lit. *To me it is cold.*)
* **Mir ist warm.** - I am hot/warm.
* **Mir ist heiß.** - I am very hot.`,
    keyGrammar: "Sensation sentences with Dative pronouns: **Mir ist kalt/heiß** instead of nominative 'Ich bin'. Using dummy subject 'es' for natural climate events (**es regnet**, **es schneit**).",
    vocabulary: [
      { german: "das Wetter", pronunciation: "dahs VET-ter", english: "the weather" },
      { german: "die Sonne", pronunciation: "dee ZON-neh", english: "the sun" },
      { german: "Es regnet", pronunciation: "es REKH-net", english: "It is raining" },
      { german: "im Winter", pronunciation: "im VIN-ter", english: "in winter" },
      { german: "Mir ist kalt", pronunciation: "meer ist kahlt", english: "I am cold (personal feeling)" },
      { german: "Es ist windig", pronunciation: "es ist VIN-dikh", english: "It is windy" },
      { german: "scheinen", pronunciation: "SHY-nen", english: "to shine" },
      { german: "schön", pronunciation: "shern", english: "beautiful / nice" }
    ],
    quizTopic: "Weather, Seasons and Personal Temp Sensation"
  },
  {
    id: "l18",
    level: "A1",
    title: "18. Simple Past of Auxiliaries (war & hatte)",
    germanTitle: "Präteritum von sein & haben",
    description: "Learn how to talk about past states or possession using the simple past forms 'war' (was) and 'hatte' (had).",
    explanation: `While Conversational Past (Perfekt) is used for active verb occurrences (e.g. *Ich habe gegessen*), Germans almost always prefer the **Präteritum** (Simple Past) for the helper auxiliaries **sein** and **haben** in speech because it is far simpler.

### 1. Simple Past of 'sein' -> **war** (was):
Highly useful for states, locations, and descriptions in the past:
* **ich war** - I was / **du warst** - you were
* **er/sie/es war** - he/she/it was (note: ich & er/sie/es are identical!)
* **wir waren** - we were / **ihr wart** - you all were / **sie/Sie waren** - they/you were
* *Example:* **Ich war gestern in Berlin.** (I was in Berlin yesterday.)
* *Example:* **Es war sehr kalt.** (It was very cold.)

### 2. Simple Past of 'haben' -> **hatte** (had):
Perfect for ownership or conditions in the past:
* **ich hatte** - I had / **du hattest** - you had
* **er/sie/es hatte** - he/she/it had (identical structure!)
* **wir hatten** - we had / **ihr hattet** - you all had / **sie/Sie hatten** - they/you had
* *Example:* **Ich hatte ein Auto.** (I had a car.)
* *Example:* **Hattest du gestern Zeit?** (Did you have time yesterday?)`,
    keyGrammar: "Präteritum rules for auxiliaries: **war** and **hatte**. Learn the identical forms of the 1st Person (ich) and 3rd Person singular (er/sie/es).",
    vocabulary: [
      { german: "gestern", pronunciation: "GES-tern", english: "yesterday" },
      { german: "letztes Jahr", pronunciation: "LETS-tes yahr", english: "last year" },
      { german: "früher", pronunciation: "FREW-er", english: "previously / in earlier times" },
      { german: "Ich war müde", pronunciation: "ikh vahr MOO-deh", english: "I was tired" },
      { german: "Wir hatten Glück", pronunciation: "veer HAHT-ten glewk", english: "We were lucky (had luck)" },
      { german: "wo warst du?", pronunciation: "voh vahrst doo", english: "where were you?" },
      { german: "hatte", pronunciation: "HAHT-teh", english: "had (1st/3rd person past)" },
      { german: "Keine Zeit haben", pronunciation: "KY-neh tsyt HAH-ben", english: "to have no time" }
    ],
    quizTopic: "Präteritum of Sein and Haben"
  },
  {
    id: "l19",
    level: "A1",
    title: "19. Jobs, Professions & Workplaces",
    germanTitle: "Beruf und Arbeit",
    description: "Learn to name major professions, tell others what you do for a living, and describe your workplace.",
    explanation: `Describing your job (*der Beruf*) and where you work is one of the most common A1 conversation topics. Let's master the key vocab and grammatical structures.

### 1. Gender in Professions:
In German, professions have distinct masculine and feminine forms. The feminine is almost always formed by adding **-in** to the masculine, and its plural is **-innen**. If the masculine form has an 'a', 'o', or 'u', it often takes an umlaut in the feminine!
* **der Lehrer** (male teacher) -> **die Lehrerin** (female teacher)
* **der Arzt** (male doctor) -> **die Ärztin** (female doctor)
* **der Student** (male college student) -> **die Studentin** (female college student)
* **der Ingenieur** (male engineer) -> **die Ingenieurin** (female engineer)

### 2. Telling Someone Your Profession:
Never translate "I am a doctor" literally with "ein"! In German, you say the name of the profession directly without any article after *sein*:
* **Ich bin Lehrer.** - I am a teacher (male).
* **Ich bin Ärztin.** - I am a doctor (female).
* Alternatively, use "von Beruf" (by profession):
  * **Ich bin Ingenieur von Beruf.** - I am an engineer by profession.

### 3. Explaining Where you Work & Your Role:
* Use the preposition **bei** (at/with) for companies:
  * **Ich arbeite bei Siemens / bei Google.** - I work at Siemens / Google.
* Use **als** (as) to designate your role:
  * **Ich arbeite als Verkäufer.** - I work as a salesman.
* Use **in** / **an** (with dative) for building types:
  * **Ich arbeite in einer Schule.** - I work in a school (feminine dative after *in*).
  * **Ich arbeite in einem Krankenhaus.** - I work in a hospital (neuter dative after *in*).
  * **Ich arbeite an einer Universität.** - I work at a university (feminine dative after *an*).`,
    keyGrammar: "Expressing professions without indefinite articles (e.g., 'Ich bin Ingenieur'). Using 'bei' + company name, 'als' + role, and 'in/an' + dative for location.",
    vocabulary: [
      { german: "der Beruf", pronunciation: "dair beh-ROOF", english: "job / profession" },
      { german: "der Lehrer / die Lehrerin", pronunciation: "dair LAY-rer / dee LAY-rer-in", english: "teacher (male / female)" },
      { german: "der Arzt / die Ärztin", pronunciation: "dair ahrtst / dee AIRTS-tin", english: "doctor (male / female)" },
      { german: "arbeiten bei...", pronunciation: "AHR-by-ten by", english: "to work at (company)" },
      { german: "arbeiten als...", pronunciation: "AHR-by-ten ahls", english: "to work as (role)" },
      { german: "das Büro", pronunciation: "dahs bew-ROH", english: "the office" },
      { german: "arbeitslos", pronunciation: "AHR-byts-lohs", english: "unemployed" },
      { german: "die Arbeit", pronunciation: "dee AHR-byt", english: "the work / job" }
    ],
    quizTopic: "German Profession Names and Employment Expressions"
  },
  {
    id: "l20",
    level: "A1",
    title: "20. Traveling, Transportation & Prepositions",
    germanTitle: "Reisen & Verkehrsmittel",
    description: "Learn transport terms, buy tickets, and master the prepositions of travel directional and local settings.",
    explanation: `When moving around or traveling, you will need to describe your transportation vehicle (*das Verkehrsmittel*) and specify directions.

### 1. Modes of Transport (Verkehrsmittel):
* **das Auto** - car
* **der Zug** - train
* **der Bus** - bus
* **die U-Bahn** - subway
* **das Fahrrad** - bicycle
* **das Flugzeug** - airplane

### 2. Travelling "BY" a Vehicle using "mit":
To say you are going by train, bus, or car, use the preposition **mit** (with). Note that **mit** ALWAYS takes the **Dative** case!
* **mit dem Zug** (masc. dative) - by train
* **mit dem Auto** (neut. dative) - by car
* **mit der U-Bahn** (fem. dative) - by subway
* **mit dem Fahrrad** - by bicycle
* *Example:* **Ich fahre mit dem Bus.** (I am going by bus.)

### 3. Heading to Destinations: "nach" vs "in":
When stating "I am going to...", your preposition choice depends on the destination:
* Use **nach** for cities, countries without articles, and continents:
  * **Ich reise nach Berlin / nach Deutschland.** - I travel to Berlin / Germany.
* Use **in** (+ Accusative) for countries with articles (like *die Schweiz* - Switzerland, *die Türkei* - Turkey, *die USA* - plural):
  * **Ich fliege in die Schweiz.** (I fly to Switzerland)
  * **Ich reise in die USA.** (I travel to the USA)
* Use **zu** (+ Dative) for people or specific general locations:
  * **Ich gehe zum Arzt.** (I am going to the doctor - *zu dem* -> *zum*)
  * **Ich gehe zur Schule.** (I am going to school - *zu der* -> *zur*)`,
    keyGrammar: "The preposition 'mit' requires the dative case. Directional rules: 'nach' for cities/unarticled countries, 'in' + accusative for articled countries, 'zu' + dative for general targets.",
    vocabulary: [
      { german: "die Fahrkarte", pronunciation: "dee FAHR-kar-teh", english: "the ticket" },
      { german: "der Zug", pronunciation: "dair tsook", english: "the train" },
      { german: "fliegen", pronunciation: "FLEE-gen", english: "to fly" },
      { german: "fahren", pronunciation: "FAH-ren", english: "to drive / go (using wheels)" },
      { german: "der Reisepass", pronunciation: "dair RY-zeh-pahs", english: "passport" },
      { german: "mit dem Auto", pronunciation: "mit daym OW-toh", english: "by car" },
      { german: "Guten Flug!", pronunciation: "GOO-ten flook", english: "Have a good flight!" },
      { german: "die Haltestelle", pronunciation: "dee HAHL-teh-shtel-leh", english: "the bus/tram stop" }
    ],
    quizTopic: "German Vehicles, Travel Prepositions and Directions"
  },
  {
    id: "l21",
    level: "A1",
    title: "21. Grocery Shopping, Weights & Measures",
    germanTitle: "Lebensmittel einkaufen",
    description: "Learn to purchase groceries at German supermarkets, ask for amounts, and handle weight measurements correctly.",
    explanation: `Shopping for food (*Lebensmittel*) is a daily activity. German supermarkets and markets require understanding weight terms and packaging measurements.

### 1. Key Quantities and Weights:
* **das Gramm** (g) - gram
* **das Kilo / Kilogramm** (kg) - kilogram / kilo (plural in quantities remains *Kilo*)
* **das Pfund** - pound (equals 500 grams in Germany)
* **der Liter** (l) - liter

### 2. Containers and Packaging (Partitives):
* **eine Flasche** (a bottle of...) -> *eine Flasche Milch* (a bottle of milk)
* **eine Packung** (a packet of...) -> *eine Packung Nudeln* (noodles)
* **ein Becher** (a cup/tub of...) -> *ein Becher Joghurt*
* **eine Dose** (a can of...) -> *eine Dose Tomaten*
* **ein Glas** (a jar of...) -> *ein Glas Marmelade* (jam)

### 3. Shopping Phrases at the Market:
* **Ich hätte gern ein Kilo Äpfel, bitte.** - I would like a kilo of apples, please.
* **Was kostet eine Flasche Wasser?** - How much is a bottle of water?
* **Haben Sie sonst noch einen Wunsch?** - Do you have any other wish? (Typical question from vendors)
* **Das ist alles, danke.** - That is all, thank you.
* **Ich brauche noch eine Packung Butter.** - I still need a pack of butter.`,
    keyGrammar: "Expressing 'a bottle of...' or 'a package of...' does NOT use a preposition like of/von! Just state container + item direct: 'eine Flasche Milch', 'zwei Kilo Äpfel'.",
    vocabulary: [
      { german: "die Lebensmittel", pronunciation: "dee LAY-bens-mit-tel", english: "groceries / food supplies" },
      { german: "das Kilo", pronunciation: "dahs KEE-loh", english: "kilogram" },
      { german: "eine Flasche", pronunciation: "EYE-neh FLAH-sheh", english: "a bottle" },
      { german: "eine Packung", pronunciation: "EYE-neh PAHK-oong", english: "a pack / container" },
      { german: "die Dose", pronunciation: "dee DOH-zeh", english: "the can" },
      { german: "Sonst noch etwas?", pronunciation: "zonst nokh ET-vahs", english: "Anything else?" },
      { german: "Wie viel wiegt das?", pronunciation: "vee feel veekt dahs", english: "How much does that weigh?" },
      { german: "das Gramm", pronunciation: "dahs grahm", english: "gram" }
    ],
    quizTopic: "Supermarket Vocab, Measurements and Shopping Dialogues"
  },
  {
    id: "l22",
    level: "A1",
    title: "22. Making Appointments & Invitations",
    germanTitle: "Termine und Einladungen",
    description: "Learn to schedule business and friendly social commitments, accept/reject invites, and postpone appointments.",
    explanation: `Germans value punctuality and formal arrangement highly. Standardized terms for scheduling meetings or social dates are essential to A1.

### 1. Proposing a Date or Invite:
* **Hast du am Samstag Zeit?** - Do you have time on Saturday?
* **Wollen wir uns am Sonntag treffen?** - Do we want to meet on Sunday?
* **Ich lade dich zu meiner Party ein!** - I invite you to my party! (*einladen* is a separable verb!)
* **Hast du Lust auf einen Kaffee?** - Do you feel like a coffee?

### 2. Accepting an Appointment:
* **Ja, gern!** - Yes, gladly!
* **Ja, das passt mir gut.** - Yes, that suits me well.
* **Abgemacht!** - It's a deal! / Settled!
* **Gute Idee!** - Great idea!

### 3. Declining or Postponing (Tut mir leid!):
Always express polite regret:
* **Es tut mir leid, aber ich kann nicht.** - I am sorry, but I can't.
* **Ich habe leider keine Zeit.** - Unfortunately, I have no time.
* **Können wir den Termin verschieben?** - Can we postpone/move the appointment?
* **Passt es dir vielleicht am Montag?** - Does Monday suit you maybe?`,
    keyGrammar: "Separable verb 'einladen' (to invite) kicks 'ein' to the end: 'Ich lade dich ein'. Using 'am' with days of the week, and using polite 'leider' / 'es tut mir leid' when declining.",
    vocabulary: [
      { german: "einladen", pronunciation: "YN-lah-den", english: "to invite" },
      { german: "der Termin", pronunciation: "dair tair-MEEN", english: "the appointment" },
      { german: "treffen", pronunciation: "TREF-en", english: "to meet" },
      { german: "Es tut mir leid", pronunciation: "es toot meer lyt", english: "I am sorry" },
      { german: "verschieben", pronunciation: "fair-SHEE-ben", english: "to postpone / move" },
      { german: "absagen", pronunciation: "AHP-zah-gen", english: "to cancel" },
      { german: "Passt dir das?", pronunciation: "pahst deer dahs", english: "Does that suit you?" },
      { german: "die Einladung", pronunciation: "dee YN-lah-doong", english: "the invitation" }
    ],
    quizTopic: "Scheduling Appointments and Expressing Invitations"
  },
  {
    id: "l23",
    level: "A1",
    title: "23. Writing Letters & Emails",
    germanTitle: "Briefe und E-Mails schreiben",
    description: "Complete standard conventions for written communication, covering greeting phrases and official letter signatures.",
    explanation: `The writing part of the CEFR A1 exam relies heavily on standard templates for letters (*der Brief*) and emails (*die E-Mail*). Master these frozen polite formats and you will ace any written German test.

### 1. Formal Written Style (To landlords, doctors, state workers, schools):
* **GREETING:**
  * **Sehr geehrte Damen und Herren,** (Dear Sir or Madam, - always used when name is unknown)
  * If name is known: **Sehr geehrter Herr Müller,** (masculine) / **Sehr geehrte Frau Müller,** (feminine)
* **IMPORTANT NOTE:** In German, the first word of the actual message body starts with a **lowercase** letter because the greeting ends in a comma!
* **CLOSURE:**
  * **Mit freundlichen Grüßen** (With friendly greetings - note: no comma is placed after this closure in German!)
  * Sign with your full name.

### 2. Informal Friendly Style (To friends, family, partners):
* **GREETING:**
  * **Lieber Thomas,** (Dear Thomas, - masculine 'Lieber')
  * **Liebe Sarah,** (Dear Sarah, - feminine 'Liebe')
  * **Hallo Stefan,** (Hello Stefan)
* **CLOSURE:**
  * **Viele Grüße** or **Liebe Grüße** (Best/lovely greetings)
  * Sign with your first name.

### Let's see a typical A1 Email prompt:
*Prompt: Write to hotel booking. Say you want double room for 2 nights.*
"Sehr geehrte Damen und Herren,
ich möchte ein Doppelzimmer für zwei Nächte buchen. Wir kommen am Freitag an.
Mit freundlichen Grüßen,
John Smith"`,
    keyGrammar: "Case endings on written pronouns (formal capitalized 'Sie', 'Ihr', 'Ihnen' vs informal 'du', 'dein', 'dir'). Gendered greetings: 'Dear' is 'Sehr geehrter' (masc/formal), 'Sehr geehrte' (fem/formal), 'Lieber' (masc/informal), 'Liebe' (fem/informal).",
    vocabulary: [
      { german: "eine E-Mail schreiben", pronunciation: "EYE-neh ee-mayl SHRY-ben", english: "to write an email" },
      { german: "Sehr geehrte", pronunciation: "zair gay-AIR-teh", english: "Dear (formal, plural or feminine)" },
      { german: "Sehr geehrter", pronunciation: "zair gay-AIR-ter", english: "Dear (formal, masculine)" },
      { german: "Lieber / Liebe", pronunciation: "LEE-ber / LEE-beh", english: "Dear (informal, Masc/Fem)" },
      { german: "Mit freundlichen Grüßen", pronunciation: "mit FROYNT-likh-en GREW-sen", english: "With kind regards" },
      { german: "antworten", pronunciation: "AHNT-vor-ten", english: "to reply / answer" },
      { german: "der Brief", pronunciation: "dair breef", english: "the letter" },
      { german: "Liebe Grüße", pronunciation: "LEE-beh GREW-seh", english: "Best regards (informal)" }
    ],
    quizTopic: "German Email Templates and Letter Salutations"
  },
  {
    id: "l24",
    level: "A1",
    title: "24. Booking a Hotel & Accommodation",
    germanTitle: "Im Hotel & Reservierungen",
    description: "Learn daily hotel coordination dialogs, reservations, and common customer support requesting structures.",
    explanation: `When arriving at a German hotel (*das Hotel*), youth hostel (*die Jugendherberge*), or guesthouse (*die Pension*), specific vocabulary enables you to check-in efficiently.

### 1. Types of Rooms:
* **das Einzelzimmer** (EZ) - single room
* **das Doppelzimmer** (DZ) - double room
* **das Bett** - bed

### 2. Useful Hotel Dialogue:
* **Ich habe ein Zimmer reserviert.** - I have reserved a room.
* **Auf welchen Namen?** - On what name? -> *Auf den Namen Smith.* (Under the name Smith.)
* **Inklusive Frühstück?** - Breakfast included? -> *Ja, mit Frühstück.* / *Nein, ohne Frühstück.*
* **Darf ich Ihren Reisepass sehen?** - May I see your passport?
* **Hier ist Ihr Schlüssel.** - Here is your key.
* **Wo ist das Zimmer?** - Where is the room? -> *Im ersten Stock.* (On the first floor - dative!)

### 3. Customer Requests & Complaints:
* **Wie lautet das WLAN-Passwort?** - What is the Wi-Fi password?
* **Wann gibt es Frühstück?** - When is breakfast? -> *Von sieben bis zehn Uhr.* (From 7 to 10 o'clock.)
* **Die Heizung funktioniert nicht.** - The heating is not working.
* **Ich brauche noch ein Handtuch.** - I still need a towel.
* **Wann muss ich auschecken?** - When do I have to check out?`,
    keyGrammar: "Prepositions used in hotel services: **mit** (with) and **ohne** (without). Remember **mit** takes Dative case, while **ohne** (without) takes Accusative. Using 'im' + ordinals: 'im ersten/zweiten Stock'.",
    vocabulary: [
      { german: "das Doppelzimmer", pronunciation: "dahs DOP-pel-tsim-mer", english: "double room" },
      { german: "das Einzelzimmer", pronunciation: "dahs YN-tsel-tsim-mer", english: "single room" },
      { german: "das Frühstück", pronunciation: "dahs FREW-shtewk", english: "the breakfast" },
      { german: "der Schlüssel", pronunciation: "dair SHLEWS-sel", english: "the key" },
      { german: "das WLAN", pronunciation: "dahs veh-lahn", english: "the Wi-Fi" },
      { german: "das Gepäck", pronunciation: "dahs geh-PEK", english: "luggage" },
      { german: "buchen", pronunciation: "BOO-khen", english: "to book / reserve" },
      { german: "Hat das Zimmer eine Dusche?", pronunciation: "haht dahs TSIM-mer EYE-neh DOO-sheh", english: "Does the room have a shower?" }
    ],
    quizTopic: "Hotel Check-in Conversations and Booking Expressions"
  },
  {
    id: "l24b",
    level: "A1",
    title: "24b. Post Office & Bank Transactions",
    germanTitle: "Auf der Post und der Bank",
    description: "Learn basic terms and phrases to open a bank account, withdraw cash, or mail letters and packages.",
    explanation: `Everyday bureaucratic errands like mailing a letter or handling money are typical A1 survival scenarios in Germany. Here is how to navigate them.

### 1. At the Post Office (Auf der Post):
When sending letters (*der Brief*) or packages (*das Paket*) from a German post office (*die Post*), you need these verbs and nouns:
* **verschicken** / **senden** - to send / ship
* **abholen** - to pick up
* **die Briefmarke** - the stamp
* *Example:* **Ich möchte dieses Paket nach England verschicken.** (I would like to send this package to England.)

### 2. At the Bank (Auf der Bank):
Handling your bank account (*das Sparkonto* / *Girokonto*) and cash (*das Bargeld*):
* **ein Konto eröffnen** - to open a bank account
* **Geld abheben** - to withdraw money
* **der Geldautomat** - the ATM
* **Geld einzahlen** - to deposit money
* **überweisen** - to transfer money (via bank transfer)
* *Example:* **Wo kann ich hier Geld abheben?** (Where can I withdraw money here?)`,
    keyGrammar: "Using 'auf der' + dative feminine for physical presence inside the post or bank (e.g. 'auf der Post', 'auf der Bank'). Using 'nach' + country names without articles.",
    vocabulary: [
      { german: "die Post", pronunciation: "dee post", english: "the post office" },
      { german: "die Bank", pronunciation: "dee bahnk", english: "the bank" },
      { german: "das Paket", pronunciation: "dahs pah-KAYT", english: "the package / parcel" },
      { german: "die Briefmarke", pronunciation: "dee breef-mahr-keh", english: "the postage stamp" },
      { german: "Geld abheben", pronunciation: "gelt AHP-hay-ben", english: "to withdraw cash" },
      { german: "der Geldautomat", pronunciation: "dair GELT-ow-toh-maht", english: "the ATM" },
      { german: "überweisen", pronunciation: "ew-ber-VAY-zen", english: "to transfer money" },
      { german: "ein Konto eröffnen", pronunciation: "yn KON-toh air-EUF-nen", english: "to open an account" }
    ],
    quizTopic: "Post Office and Banking Dialogues"
  },
  {
    id: "l25",
    level: "A2",
    title: "25. Talking about the Past (Perfekt)",
    germanTitle: "Das Perfekt",
    description: "Express your history, actions, and previous activities using the conversational past tense.",
    explanation: `To speak about the past in general conversational German, you will use the **Perfekt** tense. It is formed using an auxiliary verb (**haben** or **sein**) paired with the verb's past participle (**Partizip II**) sitting at the very end of the sentence.

### 1. The Formula:
\`Subject + Conjugated Haben/Sein + ... other details ... + Partizip II (Verbend)\`

### 2. When to use Haben vs. Sein as the Auxiliary?
* **Sein** is used for verbs of motion or change of state (e.g., *gehen* - went, *laufen* - ran, *aufwachen* - woke up).
* **Haben** is used for all other transitive and standard verbs.

### 3. Examples:
1. *Ich habe ein Buch gekauft.* (I bought a book - with 'haben')
2. *Ich bin nach Berlin gefahren.* (I drove to Berlin - with motion-based 'sein')`,
    keyGrammar: "Formation of conversational past participles (often starting with **ge-** and ending in **-t** or **-en**). Placing the past participle strictly at the back of the clause.",
    vocabulary: [
      { german: "gemacht", pronunciation: "geh-MAHKHT", english: "done / made (Partizip II)" },
      { german: "gesprochen", pronunciation: "geh-SHPROKH-en", english: "spoken (Partizip II)" },
      { german: "gegangen", pronunciation: "geh-GAHNG-en", english: "gone / walked (Partizip II)" },
      { german: "Ich habe gelernt", pronunciation: "ikh HAH-beh geh-LAIRNT", english: "I learned / have studied" },
      { german: "Ich bin gereist", pronunciation: "ikh bin geh-RYST", english: "I traveled / have traveled" },
      { german: "gesehen", pronunciation: "geh-ZAY-en", english: "seen (Partizip II)" },
      { german: "gegessen", pronunciation: "geh-GES-sen", english: "eaten (Partizip II)" },
      { german: "getrunken", pronunciation: "geh-TROON-ken", english: "drunk (Partizip II)" }
    ],
    quizTopic: "The German Perfekt Past Tense"
  },
  {
    id: "l26",
    level: "A2",
    title: "26. Reflexive Verbs & Pronouns",
    germanTitle: "Reflexivverben",
    description: "Learn how to express actions you perform on yourself, and distinguish between Accusative and Dative reflexive pronouns.",
    explanation: `Reflexive verbs are very common in German. They require a reflexive pronoun (*sich*, *mich*, *dich*, *uns*, etc.) because the subject is also the object of the action.

### 1. Accusative vs Dative Reflexive Pronouns:
Use **Accusative** when there is no other direct object in the clause:
* *Ich wasche mich.* (I wash myself.)
* *Du freust dich.* (You are happy / looking forward.)

Use **Dative** when there is already another direct object in the clause:
* *Ich wasche mir die Hände.* (I wash my hands - "die Hände" is the direct object.)
* *Du putzt dir die Zähne.* (You brush your teeth - "die Zähne" is the direct object.)

### 2. Full Pronoun Chart:
1. **ich** -> *mich* (acc) / *mir* (dat)
2. **du** -> *dich* (acc) / *dir* (dat)
3. **er / sie / es** -> *sich* (acc) / *sich* (dat)
4. **wir** -> *uns* (acc) / *uns* (dat)
5. **ihr** -> *euch* (acc) / *euch* (dat)
6. **sie / Sie** -> *sich* (acc) / *sich* (dat)`,
    keyGrammar: "Dative reflexive pronouns are used when an additional object is specified; otherwise, use accusative. 'Sich' remains the reflexive pronoun for all third-person singular and plural subjects.",
    vocabulary: [
      { german: "sich freuen auf", pronunciation: "zikh FROY-en owf", english: "to look forward to" },
      { german: "sich waschen", pronunciation: "zikh VAH-shen", english: "to wash oneself" },
      { german: "sich anziehen", pronunciation: "zikh AHN-tsee-hen", english: "to dress oneself" },
      { german: "sich beeilen", pronunciation: "zikh beh-EYE-len", english: "to hurry up" },
      { german: "sich fühlen", pronunciation: "zikh FEW-len", english: "to feel (well/sick/etc)" },
      { german: "sich entspannen", pronunciation: "zikh ent-SHPAHN-nen", english: "to relax oneself" },
      { german: "sich interessieren für", pronunciation: "zikh in-teh-reh-SEER-en fewr", english: "to be interested in" },
      { german: "sich duschen", pronunciation: "zikh DOO-shen", english: "to shower oneself" }
    ],
    quizTopic: "Reflexive Pronouns and Sich-Verben"
  },
  {
    id: "l27",
    level: "A2",
    title: "27. Comparatives & Superlatives",
    germanTitle: "Komparativ & Superlativ",
    description: "Master the three stages of German adjectives to make elegant comparisons and state ultimate qualities.",
    explanation: `In German, adjectives have three forms: standard (Positiv), comparative (Komparativ), and superlative (Superlativ).

### 1. The Comparative Form (Komparativ):
Simply add **-er** to the base adjective. Short, single-syllable adjectives with vowels *a*, *o*, or *u* usually take an umlaut!
* **schnell** (fast) -> **schneller** (faster)
* **alt** (old) -> **älter** (older)
* **groß** (big) -> **größer** (bigger)
* Use **als** (than) to make comparisons:
  * *Er ist älter als ich.* (He is older than I.)

### 2. The Superlative Form (Superlativ):
Formed using **am** + adjective ending in **-sten**. Vowels also take an umlaut!
* **schnell** -> **am schnellsten** (the fastest)
* **alt** -> **am ältesten** (the oldest - inserts 'e' for easier pronunciation)
* **groß** -> **am größten** (the biggest)

### 3. Highly Irregular Adjectives to Memorize:
1. **gut** (good) -> **besser** (better) -> **am besten** (the best)
2. **viel** (much) -> **mehr** (more) -> **am meisten** (the most)
3. **gern** (gladly) -> **lieber** (preferably) -> **am liebsten** (favorite)`,
    keyGrammar: "Use 'als' for inequalities (e.g. 'größer als') and 'so... wie' for equal comparisons (e.g. 'so groß wie'). Superlative forms with 'am' append '-sten' or '-esten'.",
    vocabulary: [
      { german: "besser", pronunciation: "BES-ser", english: "better" },
      { german: "am besten", pronunciation: "ahm BES-ten", english: "best / the best" },
      { german: "mehr", pronunciation: "mair", english: "more" },
      { german: "am meisten", pronunciation: "ahm MY-sten", english: "most / the most" },
      { german: "älter", pronunciation: "EL-ter", english: "older" },
      { german: "am schnellsten", pronunciation: "ahm SHNEL-sten", english: "the fastest" },
      { german: "lieber", pronunciation: "LEE-ber", english: "preferably / rather" },
      { german: "am liebsten", pronunciation: "ahm LEEP-sten", english: "most of all / favorite" }
    ],
    quizTopic: "German Adjective Comparison and Superlatives"
  },
  {
    id: "l28",
    level: "A2",
    title: "28. Adjective Declension Pathways",
    germanTitle: "Adjektivdeklination",
    description: "Guide yourself through weak, strong, and mixed transitions when placing adjectives before nouns.",
    explanation: `In German, if an adjective stands directly *before* a noun, its ending must change depending on the gender, number, case, and what kind of article is used. This is called adjective declension.

### 1. The Three Declension Pathways:
1. **Weak Declension** (after Definite articles *der, die, das*):
   * The article already shows the gender clearly, so the adjective needs only a simple **-e** or **-en** ending!
   * *der gute Kaffee* (masc nominative)
   * *die gute Suppe* (fem nominative)
2. **Mixed Declension** (after Indefinite articles *ein, eine, kein* or possessives):
   * The article shows some gender, but not all. The adjective ending must represent the distinct gender!
   * *ein guter Kaffee* (masc nominative - gains **-er**)
   * *ein gutes Buch* (neut nominative - gains **-es**)
3. **Strong Declension** (when there is NO article at all):
   * The adjective must do all the heavy lifting and carry the exact ending of the definite article!
   * *kalter Tee* (masc nominative - gains **-er**)
   * *frische Milch* (fem nominative - gains **-e**).`,
    keyGrammar: "Weak endings append '-e' or '-en'. Mixed paths add traditional nominative markers '-er' (masc), '-es' (neuter), '-e' (fem). Strong paths inherit the actual article indicators.",
    vocabulary: [
      { german: "ein schöner Tag", pronunciation: "yn SWEU-ner tahk", english: "a beautiful day" },
      { german: "das neue Auto", pronunciation: "dahs NOY-eh OW-toh", english: "the new car" },
      { german: "gute Freunde", pronunciation: "GOO-teh FROYNT-eh", english: "good friends" },
      { german: "mit kalter Milch", pronunciation: "mit KAHL-ter milkh", english: "with cold milk (dative strong)" },
      { german: "ein kaltes Bier", pronunciation: "yn KAHL-tes beer", english: "a cold beer" },
      { german: "der nette Mann", pronunciation: "dair NET-teh mahn", english: "the nice man" },
      { german: "eine nette Frau", pronunciation: "EYE-neh NET-teh frow", english: "a nice woman" },
      { german: "für ein ganzes Jahr", pronunciation: "fewr yn GAHN-tses yahr", english: "for a whole year" }
    ],
    quizTopic: "Interactive Adjective Declension Paths"
  },
  {
    id: "l29",
    level: "A2",
    title: "29. Simple Past of Mon & Modal Verbs",
    germanTitle: "Das Präteritum",
    description: "Learn when to use the written simple past tense and comfortably conjugate modal verbs in past settings.",
    explanation: `The simple past (*Präteritum*) is primarily used in written texts, stories, and news. However, for modal verbs and auxiliary verbs (sein/haben), it is *always* preferred over the conversational Perfekt even in spoken German.

### 1. Auxiliaries: "sein" vs "haben" in Präteritum:
* **sein** (to be) -> *ich war* (I was), *du warst*, *er/sie/es war*, *wir waren*, *ihr wart*, *sie/Sie waren*.
* **haben** (to have) -> *ich hatte* (I had), *du hattest*, *er/sie/es hatte*, *wir hatten*, *ihr hattet*, *sie/Sie hatten*.

### 2. Conjugating Modal Verbs in Präteritum:
All modals drop their umlauts in the past tense and add the past suffix **-te** followed by the regular personal endings:
* **können** -> stem becomes **konn-** -> *ich konnte*, *du konntest*, *er/sie/es konnte*, *wir konnten*, *ihr konntet*, *sie konnten*.
* **müssen** -> stem **muss-** -> *ich musste*, *du musstest*, *er/sie/es musste*.
* **wollen** -> stem **woll-** -> *ich wollte*, *du wolltest*, *er/sie/es wollte*. [already lacks umlaut]
* **dürfen** -> stem **durf-** -> *ich durfte*, *du durftest*, *er/sie/es durfte*.`,
    keyGrammar: "Präteritum forms of modals do NOT use umlauts. First and third person singular forms are identical (e.g., 'ich konnte', 'er konnte') and have no additional personal endings.",
    vocabulary: [
      { german: "ich war", pronunciation: "ikh vahr", english: "I was" },
      { german: "ich hatte", pronunciation: "ikh HAHT-teh", english: "I had" },
      { german: "ich konnte", pronunciation: "ikh KON-teh", english: "I was able to / could" },
      { german: "ich musste", pronunciation: "ikh MOOS-teh", english: "I had to" },
      { german: "ich wollte", pronunciation: "ikh VOL-teh", english: "I wanted to" },
      { german: "ich durfte", pronunciation: "ikh DOORFT-teh", english: "I was allowed to" },
      { german: "Es war einmal...", pronunciation: "es vahr YN-mahl", english: "Once upon a time..." },
      { german: "wir waren", pronunciation: "veer VAH-ren", english: "we were" }
    ],
    quizTopic: "Auxiliary and Modal Verb Simple Past Conjugations"
  },
  {
    id: "l30",
    level: "A2",
    title: "30. Possessive Genitive & Prepositions",
    germanTitle: "Der Genitiv",
    description: "Master the formal Genitive case to describe possession, and unlock crucial genitive prepositions like 'wegen' and 'während'.",
    explanation: `The Genitive is the fourth and final German case. It is used to show ownership/possession (like English "of the" or "'s") and is required by certain prepositions.

### 1. Genitive Article Changes:
* Masculine and Neuter: **der/das** -> **des** (the noun also gains an **-s** or **-es** ending!)
  * *das Auto des Vaters* (the father's car)
  * *das Buch des Kindes* (the child's book)
* Feminine and Plural: **die** -> **der** (noun stays unchanged!)
  * *die Tasche der Mutter* (the mother's bag)
  * *die Häuser der Stadt* (the city's houses)

### 2. Common Genitive Prepositions:
These prepositions always command a genitive object:
* **wegen** (because of): *wegen des Regens* (because of the rain)
* **während** (during): *während des Films* (during the film)
* **trotz** (despite): *trotz der Kälte* (despite the cold)`,
    keyGrammar: "Genitive shifts masculine/neuter articles to 'des' and appends '-s' or '-es' to the noun. Feminine/plural articles shift to 'der' without noun suffix modification.",
    vocabulary: [
      { german: "des Vaters", pronunciation: "des FAH-ters", english: "of the father / father's" },
      { german: "der Mutter", pronunciation: "dair MOOT-ter", english: "of the mother / mother's" },
      { german: "wegen des Regens", pronunciation: "VAY-gen des RAY-gens", english: "because of the rain" },
      { german: "während des Unterrichts", pronunciation: "VAIR-ent des OON-ter-rikhts", english: "during the lesson" },
      { german: "trotz der Probleme", pronunciation: "trots dair proh-BLAY-meh", english: "despite the problems" },
      { german: "das Ende des Films", pronunciation: "dahs EN-deh des films", english: "the end of the movie" },
      { german: "des Hauses", pronunciation: "des HOW-zes", english: "of the house" },
      { german: "der Kinder", pronunciation: "dair KIN-der", english: "of the children" }
    ],
    quizTopic: "Genitive Case and Prepositions with Genitive"
  },
  {
    id: "l31",
    level: "A2",
    title: "31. Verbs with Fixed Prepositions",
    germanTitle: "Verben mit Präpositionen",
    description: "Master verbs that require fixed prepositions and learn to ask questions using 'da-' and 'wo-' structures.",
    explanation: `Many German verbs are hitched to specific prepositions that require either the Accusative or Dative case. Furthermore, when referring to things, Germans use clever compound words.

### 1. Verbs with Fixed Prepositions:
* **warten auf** (+ Accusative) - to wait for: *Ich warte auf den Bus.*
* **sich freuen auf** (+ Accusative) - to look forward to: *Ich freue mich auf den Urlaub.*
* **sich freuen über** (+ Accusative) - to be happy about (something present/past): *Ich freue mich über das Geschenk.*
* **träumen von** (+ Dative) - to dream of: *Ich träume von einem Haus.*

### 2. "Da-" and "Wo-" Compounds (Pronominal Adverbs):
When referring to things (not people), join the preposition with **da-** (for statements) or **wo-** (for questions). If the preposition starts with a vowel, insert a helper 'r'!
* *Worauf wartest du?* (What are you waiting for?) -> *Ich warte **darauf**.* (I am waiting for it.)
* *Wovon träumst du?* (What are you dreaming of?) -> *Ich träume **davon**.* (I dream of it.)`,
    keyGrammar: "Fixed prepositional verbs command a particular case. Objects representing things utilize 'da(r)-' prefix for prononimal substitution and 'wo(r)-' for interrogative form.",
    vocabulary: [
      { german: "warten auf", pronunciation: "VAHR-ten owf", english: "to wait for" },
      { german: "darauf", pronunciation: "dah-ROWF", english: "for it / on it" },
      { german: "worauf?", pronunciation: "voh-ROWF", english: "what for?" },
      { german: "sich freuen auf", pronunciation: "zikh FROY-en owf", english: "to look forward to" },
      { german: "träumen von", pronunciation: "TROY-men fon", english: "to dream of" },
      { german: "davon", pronunciation: "dah-FON", english: "of it / about it" },
      { german: "denken an", pronunciation: "DEN-ken ahn", english: "to think of (+ Acc)" },
      { german: "darüber", pronunciation: "dah-REE-ber", english: "about that / over that" }
    ],
    quizTopic: "Fixed Prepositions and Da-/Wo- Compound Structures"
  },
  {
    id: "l32",
    level: "A2",
    title: "32. Infinitive Phrases with 'zu'",
    germanTitle: "Infinitive mit zu",
    description: "Learn to attach secondary action ideas to main clauses using 'zu' + infinitive structure, including 'um...zu'.",
    explanation: `In German, if you have two actions in one sentence where the second action depends on the first, you can link them using **zu** + infinitive placed at the end of the sentence.

### 1. Simple 'zu' Infinitive Clauses:
* *Es ist schwierig, Deutsch **zu lernen**.* (It is difficult to learn German.)
* *Ich habe vergessen, dich **anzurufen**.* (I forgot to call you - note: 'zu' goes inside separable verbs between prefix and base!).

### 2. Infinitive Conjunctions (um...zu, ohne...zu, anstatt...zu):
These are very popular subordinate connectors:
* **um...zu** (in order to / to):
  * *Ich lerne Deutsch, **um** in Berlin **zu arbeiten**.* (I learn German in order to work in Berlin.)
* **ohne...zu** (without ...ing):
  * *Er ging, **ohne** Tschüss **zu sagen**.* (He left without saying goodbye.)`,
    keyGrammar: "Infinitive structures with 'zu' put 'zu' directly before the final verb. Separable verbs sandwich 'zu' in the middle (e.g. 'anzurufen'). No verb conjugation is done in the backend clause.",
    vocabulary: [
      { german: "um zu arbeiten", pronunciation: "oom tsoo AHR-by-ten", english: "in order to work" },
      { german: "ohne zu fragen", pronunciation: "OH-neh tsoo FRAH-gen", english: "without asking" },
      { german: "Es ist gesund, ... zu", pronunciation: "es ist geh-ZOONT ... tsoo", english: "It is healthy to..." },
      { german: "Ich versuche, ... zu", pronunciation: "ikh fair-ZOO-kheh ... tsoo", english: "I try to..." },
      { german: "Es macht Spaß, ... zu", pronunciation: "es makht shpahs ... tsoo", english: "It is fun to..." },
      { german: "bereit zu gehen", pronunciation: "beh-RYT tsoo GAY-hen", english: "ready to go" },
      { german: "anzufangen", pronunciation: "AHN-tsoo-fahng-en", english: "to begin (separable infinitive)" },
      { german: "aufzuhören", pronunciation: "OWF-tsoo-heu-ren", english: "to stop (separable infinitive)" }
    ],
    quizTopic: "Constructing Infinitive Clauses and um...zu Connectors"
  },
  {
    id: "l33",
    level: "A2",
    title: "33. Connecting with Relative Clauses",
    germanTitle: "Relativsätze",
    description: "Combine sentences smoothly using relative pronouns to describe people, objects, and ideas in perfect detail.",
    explanation: `Relative clauses are subordinate clauses that describe a noun in the main clause, equivalent to English "who", "which", or "that". They always sit at the end of the clause and require commas!

### 1. Relative Pronouns (Relativpronomen):
Relative pronouns look identical to definite articles (der, die, das) in most cases, except in plural Dative (*denen*) and Genitive (*dessen / deren*).
* **Masculine:** *der* (nom), *den* (acc), *dem* (dat)
* **Feminine:** *die* (nom), *die* (acc), *der* (dat)
* **Neuter:** *das* (nom), *das* (acc), *dem* (dat)

### 2. Building a Relative Clause (Verb-Kickers):
Because relative clauses are subordinate, they are comma-separated and **kick the conjugated verb to the absolute end**!
* *Das ist der Mann, **der** in Berlin **wohnt**.* (This is the man who lives in Berlin - Nominative subject.)
* *Dort ist das Buch, **das** ich gestern **gelesen habe**.* (There is the book that I read yesterday - Accusative object.)`,
    keyGrammar: "Relative pronouns adopt the gender & number of the antecedent noun, but get their case from their grammatical function inside the relative clause itself.",
    vocabulary: [
      { german: "der Mann, der...", pronunciation: "dair mahn dair", english: "the man who..." },
      { german: "die Frau, die...", pronunciation: "dee frow dee", english: "the woman who..." },
      { german: "das Auto, das...", pronunciation: "dahs OW-toh dahs", english: "the car which..." },
      { german: "die Leute, die...", pronunciation: "dee LOY-teh dee", english: "the people who..." },
      { german: "denen ich helfe", pronunciation: "DAY-nen ikh HEL-feh", english: "whom I help (plural dative)" },
      { german: "mit dem ich spreche", pronunciation: "mit daym ikh SHREKH-eh", english: "with whom I speak (masc dative)" },
      { german: "das Buch, das...", pronunciation: "dahs bookh dahs", english: "the book that..." },
      { german: "die Stadt, in der...", pronunciation: "dee shtat in dair", english: "the city in which..." }
    ],
    quizTopic: "Relative Pronouns and Clause Syntactic Word Order"
  },
  {
    id: "l34",
    level: "A2",
    title: "34. Desired Subjunctive Wishes",
    germanTitle: "Der Konjunktiv II",
    description: "Express hypothetical dreams, polite wishes, and provide soft recommendations using subjunctive structures.",
    explanation: `The **Konjunktiv II** is the German subjunctive mood. It is used to express dreams, advice, politeness, and hypothetical statements (equivalent to English "would", "could", "should").

### 1. Polite Request Helpers:
Germans use Konjunktiv II elements to formulate perfectly polite questions:
* **Wäre** (would be): *Das **wäre** fantastisch!* (That would be fantastic!)
* **Hätte** (would have): *Ich **hätte** gern eine Frage.* (I would have/like a question.)
* **Könnte** (could): ***Könnten** Sie mir helfen?* (Could you help me?)

### 2. The Conditional Helper "würde" + Infinitive:
For almost all standard verbs, we build the hypothetical clause using **würde** (conjugated in Position 2) + the action verb at the end:
* *Ich **würde** gern ein Auto **kaufen**.* (I would like to buy a car.)
* *Wenn ich reich **wäre**, **würde** ich eine Weltreise **machen**.* (If I were rich, I would do a world trip.)`,
    keyGrammar: "Subjunctive II is formed primarily with 'würde' + infinitive. High-frequency exceptions that conjugate directly include 'wäre' (sein) and 'hätte' (haben).",
    vocabulary: [
      { german: "ich wäre", pronunciation: "ikh VAIR-eh", english: "I would be" },
      { german: "ich hätte", pronunciation: "ikh HET-teh", english: "I would have" },
      { german: "ich würde", pronunciation: "ikh VEUR-deh", english: "I would" },
      { german: "Ich hätte gern...", pronunciation: "ikh HET-teh gairn", english: "I would like to have..." },
      { german: "Was würden Sie tun?", pronunciation: "vahs VEUR-den zee toon", english: "What would you do?" },
      { german: "könnten Sie?", pronunciation: "KEUN-ten zee", english: "could you?" },
      { german: "an deiner Stelle", pronunciation: "ahn DY-ner SHTEL-leh", english: "in your place / if I were you" },
      { german: "Es wäre schön", pronunciation: "es VAIR-eh sheun", english: "It would be nice" }
    ],
    quizTopic: "German Subjunctive II Conditional Grammar"
  },
  {
    id: "l35",
    level: "A2",
    title: "35. Direct & Indirect Personal Pronouns",
    germanTitle: "Direkte & indirekte Personalpronomen",
    description: "Master direct accusative pronouns (mich, dich, ihn, sie) and indirect dative pronouns (mir, dir, ihm, ihr) to express receiving actions or benefit.",
    explanation: `In German, direct objects receive actions (Accusative) and indirect objects benefit or receive the direct object (Dative). The personal pronouns change depending on the case.

### 1. The Accusative Pronouns (Direct Objects):
These answer the question **Wen?** (Whom / What?):
* **ich** -> **mich** (me)
* **du** -> **dich** (you)
* **er / sie / es** -> **ihn / sie / es** (him / her / it)
* **wir** -> **uns** (us)
* **ihr** -> **euch** (you all)
* **sie / Sie** -> **sie / Sie** (them / you formal)

*Examples:*
* *Ich liebe dich.* (I love you.)
* *Er sieht ihn.* (He sees him.)

### 2. The Dative Pronouns (Indirect Objects/Beneficiaries):
These answer the question **Wem?** (To/for whom?):
* **ich** -> **mir** (to/for me)
* **du** -> **dir** (to/for you)
* **er / sie / es** -> **ihm / ihr / ihm** (to/for him / to/for her / to/for it)
* **wir** -> **uns** (to/for us)
* **ihr** -> **euch** (to/for you all)
* **sie / Sie** -> **ihnen / Ihnen** (to/for them / to/for you formal - always capitalized!)

*Examples:*
* *Wie geht es dir?* (How is it going to you? = How are you?)
* *Kannst du mir helfen?* (Can you help me?)
* *Ich schenke ihr ein Buch.* (I present [to] her a book.)

### 3. Sentence Position Word Order Rule:
If you have both a dative and accusative pronoun in a sentence, the **accusative pronoun** always comes *first*:
* *Ich schenke es ihr.* (I present it to her.)`,
    keyGrammar: "Declension of personal pronouns in the Accusative and Dative cases. Knowing that 'helfen' and 'gratulieren' always take a dative pronoun companion.",
    vocabulary: [
      { german: "mir", pronunciation: "meer", english: "to me / for me (dative)" },
      { german: "dir", pronunciation: "deer", english: "to you / for you (dative inform.)" },
      { german: "ihm", pronunciation: "eem", english: "to him / to it (dative)" },
      { german: "ihr", pronunciation: "eer", english: "to her (dative)" },
      { german: "ihnen", pronunciation: "EEN-en", english: "to them (dative)" },
      { german: "Ihnen", pronunciation: "EEN-en", english: "to you (dative formal)" },
      { german: "uns / euch", pronunciation: "oonss / oykh", english: "to us / to you all" },
      { german: "helfen", pronunciation: "HEL-fen", english: "to help (+ Dative)" }
    ],
    quizTopic: "Direct and Indirect Personal Pronouns"
  },
  {
    id: "l36",
    level: "A2",
    title: "36. Indirect Questions & Ob-Clauses",
    germanTitle: "Indirekte Fragen und der Ob-Satz",
    description: "Formulate polite inquiries and indirect questions using question words (W-Fragen) and the conjunction 'ob' (whether).",
    explanation: `Using indirect questions is a key part of polite German conversation. Instead of saying "Where is the station?" (*Wo ist der Bahnhof?*), which can sound blunt, you say "Do you know where the station is?" This triggers a subordinate clause layout.

### 1. Indirect Questions with Question Words (W-Fragen):
The question word (**wo, wann, warum, wie**) connects the main clause to the indirect question. The conjugated verb gets kicked to the **absolute end of the sentence**!
* Direct: *Wo ist das Hotel?* (Where is the hotel?)
* Indirect: *Wissen Sie, wo das Hotel **ist**?* (Do you know where the hotel is? - Note 'ist' at the end!)
* Indirect: *Ich möchte wissen, wann der Zug **ankommt**.* (I would like to know when the train arrives.)

### 2. Indirect Questions with Yes/No Answers ("ob" - whether/if):
If the direct question is a Yes/No question, we connect them using the subordinating conjunction **ob** (whether/if). The verb is kicked to the end!
* Direct: *Kommt er heute?* (Is he coming today?)
* Indirect: *Ich weiß nicht, **ob** er heute **kommt**.* (I don't know whether he is coming today.)
* Indirect: *Können Sie mir sagen, **ob** das Museum geöffnet **ist**?* (Can you tell me if the museum is open?)`,
    keyGrammar: "Indirect questions act as subordinate clauses: strict verb-at-the-end ordering. Use of 'ob' to translate 'whether/if' for yes/no direct questions.",
    vocabulary: [
      { german: "ob", pronunciation: "ohp", english: "whether / if" },
      { german: "wissen", pronunciation: "VIS-sen", english: "to know (facts)" },
      { german: "Ich weiß nicht", pronunciation: "ikh vyse nikht", english: "I don't know" },
      { german: "Wissen Sie, ... ?", pronunciation: "VIS-sen zee", english: "Do you know...?" },
      { german: "Können Sie mir sagen, ... ?", pronunciation: "KERN-en zee meer ZAH-gen", english: "Can you tell me...?" },
      { german: "warum", pronunciation: "vah-ROOM", english: "why" },
      { german: "wie spät", pronunciation: "vee shpayt", english: "how late (referring to time)" },
      { german: "obwohl", pronunciation: "ohp-VOHL", english: "although" }
    ],
    quizTopic: "Indirect Questions and Ob-Clauses"
  },
  {
    id: "l37",
    level: "A2",
    title: "37. The Passive Voice",
    germanTitle: "Das Passiv im Präsens",
    description: "Learn to focus purely on the action or recipient rather than the actor using present tense Passiv (werden + Partizip II).",
    explanation: `In active sentences, we focus on who does the action: "The mechanic repairs the car." In passive sentences, we focus on what is being done or what happens to the object: "The car is being repaired."

### 1. Passive Voice Formula in Present Tense (Präsens Passiv):
We build this using the conjugated auxiliary verb **werden** (to become) in Position 2, and place the main verb's past participle (**Partizip II**) at the absolute end of the sentence:
\`Subject / Object + Conjugated Werden + ... other info ... + Partizip II\`

### 2. Conjugating 'werden' in Present Tense:
* **ich werde** / **du wirst** (umlaut & drop 'd'!)
* **er / sie / es wird** (drop 'd'!)
* **wir werden** / **ihr werdet** / **sie / Sie werden**

### 3. Examples:
* Active: *Der Koch bereitet das Essen zu.* (The cook prepares the food.)
* Passive: *Das Essen **wird** zubereitet.* (The food is being prepared.)
* Active: *Sie schließen die Tür.* (They close the door.)
* Passive: *Die Tür **wird** geschlossen.* (The door is being closed.)

### 4. Specifying the Actor using "von" (+ Dative):
If you still want to say *who* did it in a passive slot:
* *Das Auto wird **von dem Mechaniker** repariert.* (The car is repaired by the mechanic.)`,
    keyGrammar: "Formation of passive sentences: conjugated 'werden' + past participle at the end. Specifying the passive actor using 'von' + dative.",
    vocabulary: [
      { german: "werden", pronunciation: "VAIR-den", english: "to become / auxiliary for passive" },
      { german: "wird", pronunciation: "virt", english: "becomes / is (3rd person sing. passive helper)" },
      { german: "repariert werden", pronunciation: "reh-pah-REERT VAIR-den", english: "to be repaired" },
      { german: "gebaut", pronunciation: "geh-BOWT", english: "built (Partizip II)" },
      { german: "gekocht", pronunciation: "geh-KOKHT", english: "cooked (Partizip II)" },
      { german: "gereinigt", pronunciation: "geh-RY-nikht", english: "cleaned / purified (Partizip II)" },
      { german: "von uns", pronunciation: "fon oons", english: "by us (dative)" },
      { german: "abgeholt werden", pronunciation: "AHP-geh-holt VAIR-den", english: "to be picked up" }
    ],
    quizTopic: "German Present Tense Passive Voice"
  },
  {
    id: "l38",
    level: "A2",
    title: "38. Spatial Placement Verbs",
    germanTitle: "Lokale Positions- und Richtungsverben",
    description: "Master the fundamental pairs of state location (lying, standing) versus active movement placement (laying, putting) with Dative or Accusative cases.",
    explanation: `In German, describing location divides strictly into two groups: static states (where something already is) and dynamic directions (where you are putting something). They map to paired, distinct verbs.

### 1. Position Verbs (Static State) -> Use Dative (Wo?):
These represent a quiet, non-moving location and answer the question **Wo?**:
* **stehen** (to stand / be upright): *Das Glas steht auf dem Tisch.* (Dative: *dem Tisch*)
* **liegen** (to lie / be flat): *Das Buch liegt auf dem Sofa.* (Dative: *dem Sofa*)
* **sitzen** (to sit): *Die Katze sitzt auf dem Stuhl.* (Dative: *dem Stuhl*)
* **hängen** (to hang / be suspended): *Das Bild hängt an der Wand.* (Dative: *der Wand*)

### 2. Direction Verbs (Dynamic Action) -> Use Accusative (Wohin?):
These represent a movement or active transfer and answer the question **Wohin?** (To where?):
* **stellen** (to place upright / stand): *Ich stelle das Glas auf den Tisch.* (Accusative: *den Tisch*)
* **legen** (to place flat / lay): *Ich lege das Buch auf das Sofa.* (Accusative: *das Sofa*)
* **setzen** (to seat / place down): *Ich setze das Baby auf den Stuhl.* (Accusative: *den Stuhl*)
* **hängen** (to hang up / suspend): *Ich hänge das Bild an die Wand.* (Accusative: *die Wand*)`,
    keyGrammar: "Dynamic placement verbs (stellen, legen, setzen, hängen) are transitive and require Accusative. Static verbs (stehen, liegen, sitzen, hängen) require Dative.",
    vocabulary: [
      { german: "legen", pronunciation: "LAY-gen", english: "to place flat / lay down (+ Acc)" },
      { german: "liegen", pronunciation: "LEE-gen", english: "to lie / be flat (+ Dat)" },
      { german: "stellen", pronunciation: "SHTEL-en", english: "to place upright / stand (+ Acc)" },
      { german: "stehen", pronunciation: "SHTAY-en", english: "to stand / be upright (+ Dat)" },
      { german: "setzen", pronunciation: "ZET-sen", english: "to seat / place down (+ Acc)" },
      { german: "sitzen", pronunciation: "ZIT-sen", english: "to sit / be seated (+ Dat)" },
      { german: "hängen", pronunciation: "HENG-en", english: "to hang (both dynamic & static)" },
      { german: "stecken", pronunciation: "SHTEK-en", english: "to stick / insert in (+ Acc/Dat)" }
    ],
    quizTopic: "State Location vs Dynamic Direction Verbs"
  },
  {
    id: "l39",
    level: "A2",
    title: "39. House Hunting & Relocation",
    germanTitle: "Wohnungssuche und Umzug",
    description: "Learn standard housing terms, navigate German rental listings, review rental contracts (Mietvertrag), and talk about moving.",
    explanation: `Renting or searching for an apartment (*Wohnungssuche*) is standard in Germany. To understand listings and sign a lease, you must understand key rental terms.

### 1. Warm rent versus Cold rent:
German rental prices distinguish between the baseline rent and utility inclusive prices:
* **die Kaltmiete** (cold rent): The bare rent price *excluding* heating, water, and trash removal.
* **die Warmmiete** (warm rent): The total monthly rent *including* utility estimates (**die Nebenkosten**).
* **die Kaution** (deposit): Usually 2 to 3 months of cold rent.

### 2. Apartment Attributes and Layout abbreviations:
* **das Apartment / die Wohnung** - apartment, flat
* **das Erdgeschoss** (EG) - ground floor
* **das Dachgeschoss** (DG) - attic floor / top floor
* **der Mietvertrag** - the rental contract / lease
* **die Wohngemeinschaft** (WG) - shared flat (extremely popular among German students and young professionals!).

### 3. Relocating (Der Umzug):
The verb **umziehen** is separable and means to relocate/move houses. It uses **sein** as its helper in the past tense!
* *Ich **ziehe** am Samstag in eine neue Wohnung **um**.* (I relocate into a new apartment on Saturday.)
* *Ich **bin** gestern **umgezogen**.* (I moved houses yesterday.)`,
    keyGrammar: "Using 'in' + accusative for directional moving targets (e.g. 'in die Wohnung umziehen') versus 'in' + dative to describe living in an apartment (e.g. 'in der Wohnung wohnen').",
    vocabulary: [
      { german: "die Wohnung", pronunciation: "dee VOH-noong", english: "the apartment / flat" },
      { german: "die Kaution", pronunciation: "dee kow-TSYOHN", english: "rental security deposit" },
      { german: "der Mietvertrag", pronunciation: "dair MEET-fair-trahk", english: "rental contract / lease" },
      { german: "die Warmmiete", pronunciation: "dee VARM-mee-teh", english: "total rent including utility charges" },
      { german: "Nebenkosten", pronunciation: "NAY-ben-kos-ten", english: "utility costs / extra charges" },
      { german: "umziehen", pronunciation: "OOM-tsee-hen", english: "to move houses / relocate" },
      { german: "die Wohngemeinschaft (WG)", pronunciation: "dee VOHN-geh-myn-shaft", english: "shared apartment / flatshare" },
      { german: "der Vermieter", pronunciation: "dair fair-MEE-ter", english: "landlord" }
    ],
    quizTopic: "Apartment Rental and Relocation Vocabulary"
  },
  {
    id: "l40",
    level: "A2",
    title: "40. Doctor Visits & Medical Health",
    germanTitle: "Arztbesuch und Gesundheit",
    description: "Consult with medical practitioners, describe detailed physical symptoms, obtain pharmacy prescriptions, and request sick leave certificates.",
    explanation: `Navigating the medical system (*das Gesundheitssystem*) is a major CEFR A2 topic. Let's master reporting physical complaints, booking appointments with doctors, and processing prescriptions.

### 1. Describing Symptoms (Beschwerden beschreiben):
You can describe symptoms using **haben** (to have) or **sich fühlen** (to feel reflexive):
* *Ich habe **Husten** (cough) und **Schnupfen** (runny nose).*
* *Ich fühle **mich** heute schwach und deprimiert.* (I feel weak and depressed today.)
* **der Schmerz / die Schmerzen** (pain/aches): *Ich habe starke Rückenschmerzen.* (I have severe backache.)

### 2. At the Doctor's Office (In der Arztpraxis):
* **einen Termin vereinbaren** - to arrange/make an appointment
* **das Wartezimmer** - the waiting room
* **untersuchen** (to examine): *Der Arzt untersucht mein Knie.* (The doctor examines my knee.)

### 3. Prescriptions & Sick Leave Certificates (Rezepte & Atteste):
To buy medicine at the pharmacy (*die Apotheke*), you often need an official slip from the doctor:
* **das Rezept** - the prescription slip
* **das Medikament / die Medizin** - medicine / pill
* **die Krankmeldung** or **das Attest** - official sick leave certificate for employers or schools (called *der gelbe Schein* historically).
  * *Ich brauche eine Krankmeldung für meinen Arbeitgeber.* (I need a sick certificate for my employer.)`,
    keyGrammar: "Reactions and sensations with reflexive 'sich fühlen'. Preceding destination prepositions: 'zum' Arzt gehen (to the doctor - masculine dative), and 'in die' Apotheke gehen (accusative directional).",
    vocabulary: [
      { german: "die Arztpraxis", pronunciation: "dee ARTST-prahk-sis", english: "the medical clinic / doctor's office" },
      { german: "das Rezept", pronunciation: "dahs reh-TSEPT", english: "medical prescription slip" },
      { german: "die Krankmeldung", pronunciation: "dee KRAHNK-mel-doong", english: "employee/student sick leave certificate" },
      { german: "Husten und Schnupfen", pronunciation: "HOOS-ten oont SHNOOP-fen", english: "cough and sniffles / runny nose" },
      { german: "untersuchen", pronunciation: "oon-ter-ZOO-khen", english: "to examine medically" },
      { german: "das Medikament", pronunciation: "dahs meh-dee-kah-MENT", english: "medicine / pharmaceutical drug" },
      { german: "einnehmen", pronunciation: "YN-nay-men", english: "to take / swallow (medicine) (separable)" },
      { german: "Gute Besserung!", pronunciation: "GOO-teh BES-seh-roong", english: "Get well soon!" }
    ],
    quizTopic: "Medical Phrases and Pharmacy Consultation Dialogues"
  },
  {
    id: "l41",
    level: "A2",
    title: "41. Office Life & Employment Careers",
    germanTitle: "Berufsalltag und Digitalisierung",
    description: "Navigate corporate environments, handle professional emails and calls, apply for jobs (Bewerbung), and prepare for interviews.",
    explanation: `Professional life (*Berufsleben*) and digital tasks are a crucial part of the modern A2 landscape, letting you operate effectively in German-speaking work environments.

### 1. Job Applications (Bewerbung):
* **sich bewerben um** (+ Accusative / reflexive): *Ich bewerbe mich um eine Stelle als IT-Spezialist.* (I am applying for a position as IT Specialist.)
* **die Bewerbung** - job application
* **der Lebenslauf** - curriculum vitae (CV) / resume
* **das Vorstellungsgespräch** - job interview
  * *Morgen habe ich ein wichtiges Vorstellungsgespräch.* (Tomorrow I have an important job interview.)

### 2. Office Routines & Virtual Coordinates:
* **die Besprechung / das Meeting** - business meeting
* **der Kollege / die Kollegin** - colleague, coworker (male / female)
* **eine E-Mail weiterleiten** - to forward an email
* **einen Anruf annehmen** - to answer/take a phone call
* **vereinbaren** (to agree / schedule): *Wir have den Termin vereinbart.* (We have scheduled the date.)`,
    keyGrammar: "The prepositional object verb 'sich bewerben um' requires the Accusative case. Use of the dynamic reflexive pronouns in professional requests.",
    vocabulary: [
      { german: "sich bewerben um", pronunciation: "zikh beh-VAIR-ben oom", english: "to apply for a job (+ Acc)" },
      { german: "das Vorstellungsgespräch", pronunciation: "dahs FOR-shtel-loongs-geh-shprekh", english: "job / employment interview" },
      { german: "der Lebenslauf", pronunciation: "dair LAY-bens-lowf", english: "curriculum vitae (CV) / resume" },
      { german: "die Besprechung", pronunciation: "dee beh-SHPREKH-oong", english: "business meeting / conference" },
      { german: "weiterleiten", pronunciation: "VY-ter-ly-ten", english: "to forward / pass on (separable)" },
      { german: "der Kollege", pronunciation: "dair kol-LAY-geh", english: "coworker / colleague" },
      { german: "eine Stelle annehmen", pronunciation: "eye-neh SHTEL-leh AHN-nay-men", english: "to accept a job position" },
      { german: "die Abteilung", pronunciation: "dee ahp-TY-loong", english: "department / corporate division" }
    ],
    quizTopic: "Workplace Routine and Career Development Vocabulary"
  },
  {
    id: "l41b",
    level: "A2",
    title: "41b. Conjunctions & Word Order (ADUSO vs. Inversion)",
    germanTitle: "Konjunktionen und Wortstellung",
    description: "Demystify word order after connectors! Distinguish Position 0 conjunctions (ADUSO) from adverbial conjunctions that cause subject-verb inversion.",
    explanation: `German conjunctions are categorized into three groups based on how they affect the word order of the clause. Master these three categories to construct complex ideas flawlessly!

### 1. Coordinate Conjunctions (ADUSO) — Position 0:
These connectors link elements without changing the original word order of the sentence. They are:
* **A**ber (but)
* **D**enn (because - coordinating)
* **U**nd (and)
* **S**ondern (but rather - used after a negative statement)
* **O**der (or)

They sit in **Position 0**. The subject immediately follows in Position 1, and the conjugated verb sits in Position 2:
* *Ich mag Kaffee, **aber** ich trinke Tee.* (Position 0: *aber*, Position 1: *ich*, Position 2: *trinke*)
* *Er kommt nicht heute, **denn** er ist krank.* (He is not coming today, because he is sick.)

### 2. Adverbial Conjunctions — Position 1 (Inversion):
These act as adverbs representing cause, concession, or time. When they start a clause, they occupy **Position 1**, forcing the conjugated verb to come immediately in **Position 2**, and pushing the subject to **Position 3** (Inversion):
* **deshalb / darum / deswegen** (therefore / that's why)
* **trotzdem** (nevertheless / anyway)
* **sonst** (otherwise)
* **dann / danach** (then / after that)

*Examples:*
* *Ich bin müde, **deshalb** gehe ich ins Bett.* (Therefore I go to bed.)
* *Es regnet, **trotzdem** spielen die Kinder draußen.* (It is raining, nevertheless the children are playing outside.)`,
    keyGrammar: "Position 0 connectors (ADUSO) keep standard SV order. Position 1 connectors (deshalb, trotzdem, sonst) require immediate verb-subject inversion (V + S).",
    vocabulary: [
      { german: "deshalb", pronunciation: "des-HALP", english: "therefore / that's why" },
      { german: "trotzdem", pronunciation: "TROTTS-dem", english: "nevertheless / anyway" },
      { german: "sondern", pronunciation: "ZON-dern", english: "but rather" },
      { german: "sonst", pronunciation: "zonst", english: "otherwise" },
      { german: "danach", pronunciation: "dah-NAHKH", english: "afterwards / after that" },
      { german: "denn", pronunciation: "den", english: "because (coordinating)" },
      { german: "darum", pronunciation: "DAH-room", english: "therefore" },
      { german: "oder", pronunciation: "OH-der", english: "or" }
    ],
    quizTopic: "Coordinating Conjunctions and Inversion Word Order"
  },
  {
    id: "l41c",
    level: "A2",
    title: "41c. Travel, Train Bookings & Transfers",
    germanTitle: "Reisen, Fahrkarten und Umsteigen",
    description: "Master traveling via railways, purchasing tickets on local transit, dealing with delays, and understanding system announcements.",
    explanation: `Traveling by train is a way of life in German-speaking countries. To comfortably navigate the railway system (*die Deutsche Bahn*) and local public transit (*der ÖPNV*), you must know standard phrases and announcements.

### 1. At the Station & Platform (Am Bahnhof und am Gleis):
* **das Gleis** - track / platform: *Der Zug fährt auf Gleis vier ab.* (The train departs on track 4.)
* **die Abfahrt** (departure) vs. **die Ankunft** (arrival)
* **die Verspätung** (delay) - very common!
  * *Der Zug hat leider 15 Minuten Verspätung.* (The train unfortunately has a 15-minute delay.)

### 2. Buying Tickets (Fahrkarten kaufen):
* **die Fahrkarte** or **das Ticket** - ticket
* **einfache Fahrt** (one-way ticket) vs. **Hin- und Rückfahrt** (round-trip ticket)
* **Fahrkarte entwerten** - validating/stamping the ticket (mandatory on many municipal trains/busses!).
* **die Kontrolle** - ticket inspection: *Die Fahrkarten, bitte!* (Tickets, please!)

### 3. Making Connection Transfers (Die Verbindung & Umsteigen):
* **umsteigen** - to transfer / change trains (separable!)
* **einsteigen** (to board) vs. **aussteigen** (to disembark)
* **direkte Verbindung** - direct train connection (no transfers needed).
  * *Muss ich umsteigen?* (Do I have to transfer/change trains?)
  * *Nein, das ist eine direkte Verbindung.* (No, it is a direct connection.)`,
    keyGrammar: "Separable transport verbs: einsteigen, aussteigen, umsteigen (e.g. 'Ich steige in Frankfurt um'). Prepositions with transport: 'mit der U-Bahn' (by subway - dative feminine), 'mit dem Zug' (by train - dative masculine).",
    vocabulary: [
      { german: "umsteigen", pronunciation: "OOM-tsee-gen", english: "to transfer / change trains (separable)" },
      { german: "das Gleis", pronunciation: "dahs glyss", english: "the train track / platform" },
      { german: "die Verspätung", pronunciation: "dee fair-SHPAY-toong", english: "the delay" },
      { german: "einfache Fahrt", pronunciation: "YN-fah-kheh fahrt", english: "one-way ticket" },
      { german: "direkt", pronunciation: "dee-REKT", english: "direct / direct connection" },
      { german: "aussteigen", pronunciation: "OWS-tsee-gen", english: "to disembark / exit (separable)" },
      { german: "einsteigen", pronunciation: "YN-tsee-gen", english: "to board / enter train (separable)" },
      { german: "der Schaffner", pronunciation: "dair SHAHF-ner", english: "the ticket conductor" }
    ],
    quizTopic: "Public Rail Transit and Travel Dialogues"
  },
  {
    id: "l41d",
    level: "A2",
    title: "41d. Feasts, Cultural Celebrations & Congratulations",
    germanTitle: "Feste, Feiertage & Glückwünsche",
    description: "Learn how to describe celebratory events, invite others to festivals, and extend elegant congratulations for birthdays and holidays.",
    explanation: `German culture is rich with festivals (*Feste*), holidays (*Feiertage*), and family gatherings. Learn to celebrate birthdays, weddings, Christmas, and Easter, and wish others well!

### 1. Major German Holidays & Events:
* **das Ostern** (Easter)
* **das Weihnachten** (Christmas): *Frohe Weihnachten!* (Merry Christmas!)
* **das Silvester** (New Year's Eve): *Guten Rutsch!* (literally: "Good slide!" = Happy New Year!)
* **der Geburtstag** (birthday)
* **die Hochzeit** (wedding)

### 2. Giving Wishes & Best Congratulations:
When congratulating others on special achievements or lifecycle milestones, Germans use standard dative expressions:
* *Herzlichen Glückwunsch zum Geburtstag!* (Heartfelt congratulations on your birthday!)
* *Alles Gute!* (All the best!)
* *Gratulieren* (to congratulate) always takes a **Dative** beneficiary object!
  * *Ich gratuliere **dir**.* (I congratulate you.)
  * *Wir gratulieren **Ihnen** herzlich zur Hochzeit.* (We congratulate you formally on your wedding.)

### 3. Standard Expressions:
* **Guten Appetit!** - Enjoy your meal! (spoken before dining)
* **Prost!** or **Zum Wohl!** - Cheers! (spoken during toasts)
* **Frohe Ostern!** - Happy Easter!`,
    keyGrammar: "Dative congratulations formulas using 'zu' (zum Geburtstag, zur Hochzeit). Verbs requiring dative: 'gratulieren' (e.g. 'Ich gratuliere dir zum Geburtstag').",
    vocabulary: [
      { german: "Herzlichen Glückwunsch!", pronunciation: "HERT-likh-en GLEWK-voonsh", english: "Heartfelt congratulations!" },
      { german: "gratulieren", pronunciation: "grah-too-LEER-en", english: "to congratulate (+ Dative)" },
      { german: "der Geburtstag", pronunciation: "dair geh-BOORTS-tahk", english: "the birthday" },
      { german: "die Hochzeit", pronunciation: "dee HOKH-tsyt", english: "the wedding" },
      { german: "Guten Rutsch!", pronunciation: "GOO-ten rootsh", english: "Happy New Year!" },
      { german: "Frohe Weihnachten!", pronunciation: "FROH-eh VY-nahkh-ten", english: "Merry Christmas!" },
      { german: "Prost!", pronunciation: "prohst", english: "Cheers!" },
      { german: "feiern", pronunciation: "FY-ern", english: "to celebrate / party" }
    ],
    quizTopic: "German Cultural Festivals and Birthday Greetings"
  },
  {
    id: "l42",
    level: "B1",
    title: "42. Subordinate Clauses (Verb-Kickers)",
    germanTitle: "Nebensätze",
    description: "Express complex arguments, opinions, and dependencies using subordinating conjunctions.",
    explanation: `Subordinate clauses in German follow a unique, famous rule often referred to as the "Verb Kicker". When you connect a dependent clause using certain conjunctions, the conjugated verb gets kicked to the absolute end.

### Common Conjunctions that 'Kick':
* **weil** - because
* **dass** - that
* **wenn** - if / when
* **ob** - whether / if

### Comparative Word Order:
* Normal Clause (Verb in position 2): *Ich habe heute keine Zeit.* (I have no time today.)
* Subordinate Clause (Verb kicked to end): *Ich komme nicht, **weil** ich heute keine Zeit **habe**.* (I am not coming because I have no time today!)

Look at what happened: **habe** migrated to the very end of the sub-clause because of **weil**!`,
    keyGrammar: "Subordinate clause structure, strict positioning of the conjugated main verb at the final spot, and setting up commas (which are mandatory before German clauses!).",
    vocabulary: [
      { german: "weil", pronunciation: "vyle", english: "because" },
      { german: "dass", pronunciation: "dahs", english: "that" },
      { german: "wenn", pronunciation: "ven", english: "if / when" },
      { german: "Ich glaube, dass...", pronunciation: "ikh GLOW-beh dahs", english: "I believe that..." },
      { german: "ob", pronunciation: "ohp", english: "whether / if" },
      { german: "obwohl", pronunciation: "ohp-VOHL", english: "although" },
      { german: "da", pronunciation: "dah", english: "since / as" },
      { german: "trotzdem", pronunciation: "TROT-tsdem", english: "nevertheless" }
    ],
    quizTopic: "Subordinate Clauses and Conjunctions"
  },
  {
    id: "l43",
    level: "B2",
    title: "43. Subjunctive II for Hypotheses & Regrets",
    germanTitle: "Konjunktiv II der Gegenwart und Vergangenheit",
    description: "Formulate polite requests, conditional sentences, imaginary scenarios, and express regrets about past events using Konjunktiv II.",
    explanation: `Konjunktiv II (Subjunctive II) is used to express dreams, hypotheticals, polite phrasing, and unfulfilled desires or regrets.

### 1. Present Hypotheticals (Gegenwart):
For most verbs, we use the helper verb **würden** + infinitive at the very end.
* *Ich **würde** gerne nach Deutschland reisen.* (I would like to travel to Germany.)
* For **haben** and **sein**, we use their special subjunctive forms: **hätten** and **wären**.
  * *Wenn ich reich **wäre**, **hätte** ich ein Schloss.* (If I were rich, I would have a castle.)

### 2. Formulating Polite Requests:
Subjunctive II makes questions and requests much softer:
* *Könnten Sie mir bitte helfen?* (Could you please help me?)
* *Ich hätte gerne einen Kaffee.* (I would like to have a coffee, please.)

### 3. Past Regrets (Vergangenheit):
To talk about things that did *not* happen in the past, we use:
\`wäre / hätte (in Konjunktiv II) + Partizip II (at the end)\`
* *Hätte ich mehr gelernt!* (If only I had learned more!)
* *Wenn wir früher gegangen wären, hätten wir den Zug nicht verpasst.* (If we had left earlier, we wouldn't have missed the train.)`,
    keyGrammar: "Formation of present subjunctive with 'würden' + infinitive, auxiliary forms 'hätten'/'wären', and past subjunctive with 'hätte'/'wäre' plus past participle.",
    vocabulary: [
      { german: "würde", pronunciation: "vyr-deh", english: "would" },
      { german: "hätte", pronunciation: "het-teh", english: "would have" },
      { german: "wäre", pronunciation: "vair-eh", english: "would be" },
      { german: "könnte", pronunciation: "kern-teh", english: "could / would be able to" },
      { german: "sollte", pronunciation: "zol-teh", english: "should / ought to" },
      { german: "wenn doch nur", pronunciation: "ven dokh noor", english: "if only..." },
      { german: "verpassen", pronunciation: "fair-PAHS-sen", english: "to miss (bus, train)" },
      { german: "die Möglichkeit", pronunciation: "dee MERG-likh-kayt", english: "the possibility / opportunity" }
    ],
    quizTopic: "Subjunctive II (Konjunktiv II)"
  },
  {
    id: "l44",
    level: "C1",
    title: "44. Nominalization & Nominal Style",
    germanTitle: "Nominalisierung und Nominalstil",
    description: "Transform verbs, adjectives, and clauses into nouns to adopt a precise, executive, and academic German register.",
    explanation: `C1-level German relies heavily on the **Nominalstil** (nominal style), which is the standard in academia, science, bureaucracy, and high-level business. Content is packaged densely in nouns and prepositions instead of verbal clauses.

### 1. Verbal vs Nominal Comparison:
Instead of saying: "Because the temperatures are rising, the polar caps are melting."
* **Verbalstil**: *Weil die Temperaturen steigen, schmelzen die Polarkappen.*
* **Nominalstil**: *Durch den Anstieg der Temperaturen schmelzen die Polarkappen.*
Notice how "steigen" became "der Anstieg" (noun) and "weil" became the preposition "durch" (+ Dative).

### 2. Common Prepositional Conversions:
* **weil / da** (because) -> **wegen** / **aufgrund** (+ Genitive)
* **wenn / falls** (if) -> **bei** (+ Dative)
* **obwohl** (although) -> **trotz** (+ Genitive)
* **während** (while - clause) -> **während** (+ Genitive - preposition)

### 3. Creating Nouns from Verbs:
* Infinite nouns (always neuter): *lesen* -> *das Lesen* (the reading)
* Suffix derivations: *regulieren* -> *die Regulierung* (the regulation), *untersuchen* -> *die Untersuchung* (the investigation).`,
    keyGrammar: "Systematic conversion between verbal clauses and nominal style using genitive and dative prepositions. Nominalization suffixes like -ung, -heit, -keit, -schaft, -tion.",
    vocabulary: [
      { german: "die Untersuchung", pronunciation: "dee oon-ter-ZOO-khoong", english: "the investigation / examination" },
      { german: "der Anstieg", pronunciation: "dair AHN-steek", english: "the rise / increase" },
      { german: "aufgrund des", pronunciation: "owf-GROONT des", english: "on the grounds of / due to (+ Genitive)" },
      { german: "trotz der", pronunciation: "trots dair", english: "despite / in spite of (+ Genitive)" },
      { german: "die Durchführung", pronunciation: "dee DEWRKH-few-roong", english: "the implementation / execution" },
      { german: "gewährleisten", pronunciation: "geh-VAIR-ly-sten", english: "to guarantee / ensure" },
      { german: "beziehungsweise (bzw.)", pronunciation: "beh-TSEE-oongs-vy-zuh", english: "respectively / or else" },
      { german: "in Erwägung ziehen", pronunciation: "in air-VAY-goong tsee-hen", english: "to take into consideration" }
    ],
    quizTopic: "Nominalization and Academic Style"
  },
  {
    id: "l45",
    level: "C2",
    title: "45. Complex Sentence Layouts & Stylistics",
    germanTitle: "Satzbau und feine Stilistik auf C2-Niveau",
    description: "Master elegant participle attributes, precise modal particles, and sophisticated idiomatic structures to converse on a native level.",
    explanation: `At the C2 mastery level, the focus shifts to aesthetic phrasing, absolute syntax precision, and the subtle emotional coloring provided by German modal particles.

### 1. Participial Attributes (Partizipialattribute):
This structure beds a lot of information *before* a noun, which in English is usually resolved as a relative clause behind the noun.
* English structure: "The train, which arrived on platform 4 with a delay, ..."
* German C2 Participial attribute: *Der auf Gleis 4 mit Verspätung **eingetroffene** Zug ...*
Notice that the whole action (auf Gleis 4 mit Verspätung eingetroffene) is treated as an extended adjective modifying "Zug"!

### 2. Modal Particles (Modalpartikeln):
These add subtle feeling/tone to spoken sentences and have no direct English translation:
* **ja**: unexpected consensus/surprise: *Das ist **ja** herrlich!* (That is indeed marvelous!)
* **denn**: interest/slight impatience: *Wie alt bist du **denn**?* (How old are you then?)
* **halt / eben**: resignation to an unchangeable fact: *Es ist **halt** so.* (It's just the way it is.)
* **eh / sowieso**: default redundant/anyway: *Ich gehe **eh** dorthin.* (I'm going there anyway.)`,
    keyGrammar: "Formation and declension of extended participial attributes (Partizip I and II as modifiers) and the semantic coloring of common German spoken particles.",
    vocabulary: [
      { german: "eingetroffen", pronunciation: "YN-geh-trof-fen", english: "arrived (Partizip II)" },
      { german: "die Verspätung", pronunciation: "dee fair-SHPAY-toong", english: "the delay" },
      { german: "vermeintlich", pronunciation: "fair-MYNT-likh", english: "supposed / apparent" },
      { german: "hervorragend", pronunciation: "hair-VOR-rah-gent", english: "outstanding / superb" },
      { german: "das Einvernehmen", pronunciation: "dahs YN-fair-nay-men", english: "agreement / mutual understanding" },
      { german: "auf Anhieb", pronunciation: "owf AHN-heep", english: "at first attempt / right away" },
      { german: "umgangssprachlich", pronunciation: "OOM-gahngs-shprakh-likh", english: "colloquial" },
      { german: "scheinbar", pronunciation: "SHYN-bahr", english: "seemingly / apparently" }
    ],
    quizTopic: "Sophisticated C2 Stylistics"
  }
];
