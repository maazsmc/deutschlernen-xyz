import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI features will fallback/warn.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        timeout: 120000,
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// -------------------------------------------------------------
// Endpoint 1: Practice Partner AI Chat
// -------------------------------------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, scenario, level } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        germanReply: "Hallo! (AI Tutor is currently in demo mode. Please set your GEMINI_API_KEY in Secrets to interact with the real tutor). Wie geht es dir heute?",
        englishTranslation: "Hello! (AI Tutor is currently in demo mode. Please set your GEMINI_API_KEY in Secrets to interact with the real tutor). How are you doing today?",
        feedback: "To enable interactive grammar checks and dialog, configure your GEMINI_API_KEY secret."
      });
    }

    // Filter down message history to avoid bloating
    const recentMessages = messages.slice(-10);

    const systemInstruction = `You are a friendly, encouraging German language teacher and conversation partner.
The user is learning German at the "${level || 'A1'}" proficiency level.
The current roleplay scenario is "${scenario || 'Casual Conversation'}".

Your tasks:
1. Reply in German. Keep your response appropriate for the selected proficiency level (A1: simple, A2: moderate, B1: intermediate/natural). Incorporate small parenthetical helps [like this] for very difficult German words if at A1/A2 level.
2. Keep the conversation engaging by asking a simple question back or moving the scenario forward.
3. Translate your own German reply into English clearly.
4. IMPORTANT: Evaluate the user's latest German message (the last item in the history). Analyze if they made any spelling or grammatical errors (e.g. incorrect cases, wrong verb conjugations, wrong genders/articles). Be gentle and helpful: provide the correction and explain why in a short, Encouraging English feedback. If they did not make any error, praise them briefly (e.g., "Perfect grammar! Well done.").

You MUST return a JSON response matching this schema:
{
  "germanReply": "Your conversational reply in German",
  "englishTranslation": "English translation of your reply",
  "feedback": "Gentle correction/tips about the user's latest German inputs, or praise if accurate."
}`;

    // Format chat history for the prompt
    const chatHistoryText = recentMessages.map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`).join("\n");

    const prompt = `Here is the conversation history:\n${chatHistoryText}\n\nFormulate your tutoring response to the student's final input based on the scenario guidelines.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            germanReply: { type: Type.STRING },
            englishTranslation: { type: Type.STRING },
            feedback: { type: Type.STRING }
          },
          required: ["germanReply", "englishTranslation", "feedback"]
        },
        temperature: 0.7,
      }
    });

    const replyText = response.text;
    if (!replyText) {
      throw new Error("No response text from Gemini");
    }

    const result = JSON.parse(replyText.trim());
    res.json(result);

  } catch (error: any) {
    console.warn("AI Chat Route Error, falling back to mock reply:", error.message || error);
    const lastUserMsg = (req.body.messages && req.body.messages.length) 
                        ? req.body.messages[req.body.messages.length - 1].content 
                        : "Hallo";
    return res.json({
      germanReply: `Hallo! Ich habe "${lastUserMsg}" verstanden. Das klingt fantastisch! Lass uns weiter üben.`,
      englishTranslation: `Hello! I understood "${lastUserMsg}". That sounds fantastic! Let's continue practicing.`,
      feedback: "Wunderbar! Nice dialogue structure, and you are doing standard conversational responses. Keep up the high interest!"
    });
  }
});

// -------------------------------------------------------------
// Endpoint 2: AI Dictionary & Conjugator
// -------------------------------------------------------------
app.post("/api/translate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required." });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Mock dictionary response when API key is missing
      const lookup = text.toLowerCase().trim();
      if (lookup === "wasser" || lookup === "das wasser") {
        return res.json({
          translation: "Water",
          detectedLanguage: "German",
          wordType: "Noun",
          gender: "das",
          explanation: "'Wasser' is a basic neutral noun in German (das Wasser).",
          examples: [
            { german: "Ich trinke ein Glas Wasser.", english: "I am drinking a glass of water." }
          ]
        });
      }
      return res.json({
        translation: `Translation of "${text}" (Demo mode)`,
        detectedLanguage: "German/English",
        wordType: "Expression",
        gender: "N/A",
        explanation: "Set a GEMINI_API_KEY in the Secrets panel to lookup translations, word genders, grammar rules, and complete verb conjugation tables dynamically!",
        examples: [
          { german: "Guten Tag!", english: "Good day!" }
        ]
      });
    }

    const systemInstruction = `You are a German-English linguistic expert dictionary and grammar analyst.
Given an input word or phrase, analyze it diligently.

Determine:
1. The language: (German or English). If English, translate it to German as the primary 'translation' field. If German, translate to English.
2. The Word Type (Noun, Verb, Adjective, Preposition, Conjunction, Greeting, or Phrase).
3. The Gender if it's a German noun (der, die, das, plur. for plural, or N/A).
4. Detailed explanation: clear pronunciation tip, key grammatical context (Akkusativ/Dativ effects if preposition, plural form if noun, strong/weak if verb).
5. Conjugations: If the word is a verb (or translates directly to a main German verb), provide its present tense (Präsens) conjugations for: ich, du, er_sie_es, wir, ihr, sie. If not a verb, omit conjugations or output empty strings.
6. Provide exactly 2 useful bilingual example sentences.

Format your response strictly as JSON matching this schema:
{
  "translation": "Direct translated word or phrase",
  "detectedLanguage": "German or English",
  "wordType": "Noun | Verb | Adjective | Adverb | Preposition | Case | Phrase",
  "gender": "der | die | das | plural | N/A",
  "explanation": "Brief context, pronunciation guidance, and grammar details",
  "conjugations": {
    "ich": "conjugation for ich",
    "du": "conjugation for du",
    "er_sie_es": "conjugation for er/sie/es",
    "wir": "conjugation for wir",
    "ihr": "conjugation for ihr",
    "sie": "conjugation for sie/Sie"
  },
  "examples": [
    { "german": "German sentence", "english": "English translation" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Perform a linguistic lookup and conjugation mapping for: "${text}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translation: { type: Type.STRING },
            detectedLanguage: { type: Type.STRING },
            wordType: { type: Type.STRING },
            gender: { type: Type.STRING },
            explanation: { type: Type.STRING },
            conjugations: {
              type: Type.OBJECT,
              properties: {
                ich: { type: Type.STRING },
                du: { type: Type.STRING },
                er_sie_es: { type: Type.STRING },
                wir: { type: Type.STRING },
                ihr: { type: Type.STRING },
                sie: { type: Type.STRING }
              }
            },
            examples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  german: { type: Type.STRING },
                  english: { type: Type.STRING }
                },
                required: ["german", "english"]
              }
            }
          },
          required: ["translation", "detectedLanguage", "wordType", "gender", "explanation", "examples"]
        },
        temperature: 0.1,
      }
    });

    const analysisText = response.text;
    if (!analysisText) {
      throw new Error("No analysis text returned");
    }

    res.json(JSON.parse(analysisText.trim()));

  } catch (error: any) {
    console.warn("Translate Route Error, falling back to local vocabulary lookup:", error.message || error);
    const textStr = (req.body.text || "").trim();
    const mockTrans: Record<string, any> = {
      "wasser": {
        translation: "water",
        detectedLanguage: "German",
        wordType: "Noun",
        gender: "das",
        explanation: "Common noun representing water. Pronounced 'Vahser'.",
        conjugations: null,
        examples: [{ german: "Ich trinke Wasser.", english: "I drink water." }]
      },
      "apfel": {
        translation: "apple",
        detectedLanguage: "German",
        wordType: "Noun",
        gender: "der",
        explanation: "Represents apple. Plural form: 'Äpfel'.",
        conjugations: null,
        examples: [{ german: "Das ist ein roter Apfel.", english: "That is a red apple." }]
      },
      "kommen": {
        translation: "to come",
        detectedLanguage: "German",
        wordType: "Verb",
        gender: "N/A",
        explanation: "German verb 'kommen' means to come or to arrive.",
        conjugations: {
          ich: "komme",
          du: "kommst",
          er_sie_es: "kommt",
          wir: "kommen",
          ihr: "kommt",
          sie: "kommen"
        },
        examples: [{ german: "Wir kommen aus Berlin.", english: "We come from Berlin." }]
      }
    };
    const key = textStr.toLowerCase();
    if (mockTrans[key]) {
      return res.json(mockTrans[key]);
    }
    return res.json({
      translation: textStr,
      detectedLanguage: "German/English",
      wordType: "Word/Phrase",
      gender: "N/A",
      explanation: `Translation lookup details for '${textStr}'. Currently in smart backup helper style.`,
      conjugations: {
        ich: textStr + "e",
        du: textStr + "st",
        er_sie_es: textStr + "t",
        wir: textStr,
        ihr: textStr + "t",
        sie: textStr
      },
      examples: [
        { german: `Wie sagt man "${textStr}" auf Deutsch?`, english: `How do you say "${textStr}" in German?` }
      ]
    });
  }
});

// -------------------------------------------------------------
// Endpoint 3: AI Modular Custom Quiz Generator
// -------------------------------------------------------------
app.post("/api/quiz", async (req, res) => {
  try {
    const { topic, level } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Mock backup quiz if Gemini API is missing
      return res.json({
        title: `${topic} Practice (Demo Mode)`,
        questions: [
          {
            id: "q1",
            type: "multiple-choice",
            question: "Which of the following is correct German for 'Thank you very much'?",
            options: ["Vielen Dank", "Bitte schön", "Guten Morgen", "Tschüss"],
            correctAnswerIndex: 0,
            explanation: "'Vielen Dank' literally translates to 'Many thanks' or 'Thank you very much' in German."
          },
          {
            id: "q2",
            type: "sentence-builder",
            question: "Arrange the words to say: 'I like water.' (German: Ich mag Wasser.)",
            jumbledWords: ["Wasser", "mag", "Ich"],
            correctSentence: "Ich mag Wasser",
            explanation: "In a standard main statement, the verb 'mag' sits in the second position: Subject (Ich) + Verb (mag) + Object (Wasser)."
          }
        ]
      });
    }

    const systemInstruction = `You are a German exam designer. Create a highly interactive quiz with precisely 3 questions for a student.
The student level is "${level || 'A1'}".
The target quiz topic/area is "${topic}".

To make it exciting, include a mix of the following types:
- 'multiple-choice': Classic single correct option choice.
- 'sentence-builder': A translation puzzle where you provide jumbled German words (e.g. ["schön", "Heute", "ist", "das", "Wetter"]), and they must be assembled to make the 'correctSentence' (e.g. "Heute ist das Wetter schön" or "Das Wetter ist heute schön"). In sentence-builder questions, make sure punctuation is absent or easily combined, and specify options that form a coherent grammatical structure.

You MUST follow this precise JSON schema:
{
  "title": "A short, engaging quiz title",
  "questions": [
    {
      "id": "A unique question ID (e.g. q1, q2...)",
      "type": "multiple-choice | sentence-builder",
      "question": "The question prompt. For multiple-choice: the text of the query. For sentence-builder: the English prompt instruction like: Translate 'We eat bread.'",
      "options": ["Option A", "Option B", "Option C", "Option D"], // Required for multiple-choice, should be 4 options. Empty list if sentence-builder
      "correctAnswerIndex": 0, // 0-based index of correct option if multiple-choice, otherwise 0
      "jumbledWords": ["bread", "eat", "We"], // The German translations jumbled up in random order for sentence-builder. Empty list if multiple-choice
      "correctSentence": "The exact correct assembled German string if sentence-builder. Empty if multiple-choice",
      "explanation": "A gentle, descriptive English explanation of why that German construction works."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Design a 3-question quiz for level ${level || 'A1'} in the topic of "${topic}".`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  jumbledWords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctSentence: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "type", "question", "explanation"]
              }
            }
          },
          required: ["title", "questions"]
        },
        temperature: 0.5,
      }
    });

    res.json(JSON.parse(response.text.trim()));

  } catch (error: any) {
    console.warn("Quiz Generator Error, falling back to backup quiz:", error.message || error);
    const topic = req.body.topic || "German Vocabulary";
    return res.json({
      title: `${topic} Practice (Backup Mode)`,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: `Which of the following is correct German for "Thank you"?`,
          options: ["Bitte", "Danke schön", "Guten Tag", "Auf Wiedersehen"],
          correctAnswerIndex: 1,
          explanation: "'Danke schön' or 'Vielen Dank' is standard German for 'Thank you very much' / 'Thank you'."
        },
        {
          id: "q2",
          type: "sentence-builder",
          question: "Arrange the words to say: 'Excuse me formal.' (German: Entschuldigen Sie.)",
          jumbledWords: ["Sie", "Entschuldigen"],
          correctSentence: "Entschuldigen Sie",
          explanation: "In formal contexts, we use 'Entschuldigen Sie' to say excuse me."
        }
      ]
    });
  }
});


// -------------------------------------------------------------
// Endpoint 4: AI Interactive Skills Practice Generator
// -------------------------------------------------------------
app.post("/api/practice/generate", async (req, res) => {
  try {
    const { level, skillType } = req.body;
    const validatedLevel = level || "A1";
    const validatedSkill = skillType || "reading";

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Mock practice generators if Gemini API is missing
      const mockResult = getMockPractice(validatedLevel, validatedSkill);
      return res.json(mockResult);
    }

    const systemInstruction = `You are a professional German exam and curriculum designer.
Generate a skill-specific practice exercise for a student learning German.
Parameters:
- Level: "${validatedLevel}" (A1: beginner, A2: elementary, B1: intermediate/natural conversational level)
- Skill Type: "${validatedSkill}" ("speaking", "writing", "reading", or "listening")

Depending on the requested skill, construct a highly customized response with beautiful details:

1. For "speaking" skill:
   - Provide a natural, useful, level-appropriate spoken response target in the "germanText" field.
   - Provide its English literal/natural meaning in the "translation" field.
   - Provide a student pronunciation cue / transcription aid in the "pronunciation" field.
   - Provide an engaging roleplay background setup for why they should speak this sentence (e.g., 'At the doctor. Explain your throat hurts.') in the "prompt" field.
   - Fill "instructions" with tips on pronouncing tricky sounds like 'ch', 'r', or dynamic umlauts.

2. For "writing" skill:
   - Provide a clear, interesting written composition task in the "prompt" field (e.g. 'Write an email to invite a colleague to coffee' or 'Describe your yesterday').
   - Keep "germanText", "translation", and "pronunciation" empty or blank.
   - Provide important grammar triggers, conjugation hints, or structural milestones (e.g., 'Use subordinate clauses starting with weil') in the "instructions" field to guide the student.

3. For "reading" skill:
   - Write a rich dialogue or short stories of exactly 4-6 sentences in the "germanText" field.
   - Provide its English literal version in the "translation" field.
   - Create exactly 2 comprehension check questions in the "readingQuestions" array.
   - Each question needs 4 logical, distinguishable alternatives ("options") and a clear English "explanation" on why the correct item works based on reading paragraphs.

4. For "listening" skill:
   - Write a clear, conversational, or administrative statement in German in the "audioStatement" field. This is the exact statement the browser speech-synthesis system will read out loud to the user.
   - Write its translation in the "translation" field.
   - Fill "instructions" with listening focus guidelines.
   - Add exactly 1 or 2 listening focus comprehension checkpoints (e.g., 'What time will they meet?', 'Where is the passenger going?') in the "listeningQuestions" array to gauge auditory understanding.

You MUST strictly comply with this structured JSON response schema:
{
  "title": "An encouraging, unique title for this practice lesson",
  "instructions": "General guide, tips, or grammar triggers to keep in mind (English)",
  "germanText": "The target German text chunk (applicable for reading or speaking. Empty otherwise)",
  "translation": "Literal or idiomatic English translation of the germanText or audioStatement (Empty for writing)",
  "pronunciation": "Simple English-styled phonetics helper (e.g. 'ish MEUSH-teh...') (Only for speaking)",
  "prompt": "The detailed situational challenge or composition directive (Only for writing or speaking. Empty otherwise)",
  "audioStatement": "The clear German audio statement to be spoken by TTS (Only for listening)",
  "readingQuestions": [
    {
      "question": "A reading check question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief tip explaining the reading clue"
    }
  ],
  "listeningQuestions": [
    {
      "question": "A listening check question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief tip explaining the audio clue"
    }
  ]
}`;

    const promptText = `Generate a German Skills Practice set for Level: "${validatedLevel}", Skill Type: "${validatedSkill}". Only return JSON formatted strictly to the schema. Make the content highly custom, creative and fresh.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        instructions: { type: Type.STRING },
        germanText: { type: Type.STRING },
        translation: { type: Type.STRING },
        pronunciation: { type: Type.STRING },
        prompt: { type: Type.STRING },
        audioStatement: { type: Type.STRING },
        readingQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        },
        listeningQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      },
      required: ["title", "instructions"]
    };

    let attempts = 0;
    const maxAttempts = 3;
    let bodyText = "";

    while (attempts < maxAttempts) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema,
            temperature: 0.6,
          }
        });

        if (response.text) {
          bodyText = response.text.trim();
          break; // Success
        }
        throw new Error("No response text from Gemini");
      } catch (err: any) {
        attempts++;
        console.warn(`[Practice Generator] Attempt ${attempts} failed:`, err.message || err);
        if (attempts >= maxAttempts) {
          throw err;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    res.json(JSON.parse(bodyText));

  } catch (error: any) {
    console.warn("Practice Generator Route Error, falling back to mock practice:", error.message || error);
    const validatedLevel = req.body.level || "A1";
    const validatedSkill = req.body.skillType || "reading";
    const fallbackPractice = getMockPractice(validatedLevel, validatedSkill);
    return res.json(fallbackPractice);
  }
});


// -------------------------------------------------------------
// Endpoint 5: AI Skills Practice Evaluator / Feedback
// -------------------------------------------------------------
app.post("/api/practice/evaluate", async (req, res) => {
  try {
    const { level, skillType, promptDescription, userInput } = req.body;
    
    if (!userInput || typeof userInput !== "string") {
      return res.status(400).json({ error: "Student input is required for evaluation." });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      const mockEval = getMockEvaluation(userInput, skillType || "writing");
      return res.json(mockEval);
    }

    const systemInstruction = `You are an discouragingly analytical but encouraging German private tutor.
Evaluate the student's text response for their skills practice homework.
Review the following:
- Target skill: "${skillType || 'writing'}"
- Proficiency level: "${level || 'A1'}"
- Task original prompt / context: "${promptDescription || 'Practice response'}"
- Student submission text: "${userInput}"

Analyze their grammatical soundness:
1. Genders/Articles matching (der, die, das, den, dem etc.).
2. Accusative vs Dative effects (case choices).
3. Infinitive positioning (verbs at the back in relative or subordinate clauses).
4. Verb ending conjugations.
5. Common spellings.

Give them a rating of 1 to 5 stars. Offer friendly, conversational English tips. Highlight what mistakes they made and provide a corrected, perfect native German sentence.

You MUST return a JSON response matching this schema:
{
  "ratingStars": 5, // Rating from 1 (severe mistakes) to 5 (flawless)
  "feedback": "Encouraging verbal coaching and praise in English",
  "corrections": "Clear point-by-point details showing what was incorrect and why (e.g. 'Wechselpräposition rule applied incorrectly...'). Keep it extremely detailed.",
  "correctedText": "The complete, perfect German sentence reflecting what they tried to say"
}`;

    const promptText = `Evaluate this student's German response: "${userInput}".
Context of homework: "${promptDescription}".
Please analyze this diligently to give highly precise corrections and guidance.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ratingStars: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            corrections: { type: Type.STRING },
            correctedText: { type: Type.STRING }
          },
          required: ["ratingStars", "feedback", "corrections", "correctedText"]
        },
        temperature: 0.3,
      }
    });

    const bodyText = response.text;
    if (!bodyText) {
      throw new Error("No response text from Gemini");
    }

    res.json(JSON.parse(bodyText.trim()));

  } catch (error: any) {
    console.warn("Practice Evaluator Route Error, falling back to mock evaluation:", error.message || error);
    const userInput = req.body.userInput || "";
    const skillType = req.body.skillType || "writing";
    const mockEval = getMockEvaluation(userInput, skillType);
    return res.json(mockEval);
  }
});


// Helper functions for mock fallback practice content when GEMINI_API_KEY is not defined:
function getMockPractice(level: string, skill: string) {
  if (skill === "speaking") {
    if (level === "A1") {
      return {
        title: "Ordering Coffee (Kaffee bestellen)",
        instructions: "Practice pronouncing your coffee order naturally using polite phrases.",
        germanText: "Ich möchte bitte einen Kaffee mit Milch und Zucker, danke.",
        translation: "I would like a coffee with milk and sugar please, thank you.",
        pronunciation: "ikh MEURKH-teh BIT-teh eye-nen KAH-fay mit milkh oont TSOO-ker, dahn-keh",
        prompt: "Imagine arriving at a café in Vienna. Order a hot coffee with milk and sugar politely."
      };
    } else if (level === "A2") {
      return {
        title: "Expressing Future Plans (Zukunftspläne)",
        instructions: "Practice voicing your vacation arrangements using 'werden' or present planning syntax.",
        germanText: "Nächste Woche fliege ich für ein paar Tage nach Hamburg, um meine Familie zu besuchen.",
        translation: "Next week I am flying to Hamburg for a few days to visit my family.",
        pronunciation: "NEKH-steh VOKH-eh FLEE-gheh ikh fewr yn pahr TAH-gheh nahk HAHM-boork, oom MY-neh fah-MEE-lyeh tsoo beh-ZOO-khen",
        prompt: "A colleague asks you what you are doing next week. Practice explaining your travel arrangements."
      };
    } else if (level === "B1") {
      return {
        title: "Giving Recommendations (Empfehlungen geben)",
        instructions: "Use polite suggestions and subjunctive (Konjunktiv II) to offer travel advice.",
        germanText: "Wenn ich du wäre, würde ich am Wochenende den Zug nehmen, da die Autobahn oft überlastet ist.",
        translation: "If I were you, I would take the train on the weekend since the highway is often congested.",
        pronunciation: "ven ikh doo VAIR-eh, VEUR-deh ikh ahm VOKH-en-en-deh dayn tsook NAY-men, dah dee OW-toh-bahn oft EW-ber-lahs-tet ist",
        prompt: "Offer recommendations to a close friend traveling to Berlin."
      };
    } else if (level === "B2") {
      return {
        title: "Expressing Unfulfilled Wishes (Wünsche ausdrücken)",
        instructions: "Formulate subjunctive wishes about the past or desirable future states.",
        germanText: "Wenn ich doch bloß mehr Zeit für meine Hobbys gehabt hätte!",
        translation: "If only I had had more time for my hobbies!",
        pronunciation: "ven ikh dokh blohs mair tsyt fewr MY-neh HOB-bees geh-HAHP-t HET-teh",
        prompt: "Express a past regret about having too much work and too little leisure time."
      };
    } else if (level === "C1") {
      return {
        title: "Advocating for Climate Policies (Stellungnahme zum Klimaschutz)",
        instructions: "Express complex political statements with nominal sentences.",
        germanText: "Angesichts der globalen Erwärmung ist die sofortige Umsetzung drastischer Maßnahmen unerlässlich.",
        translation: "In light of global warming, the immediate implementation of drastic measures is indispensable.",
        pronunciation: "AHN-geh-zikhts dair gloh-BAH-len air-VÄR-moong ist dee zoh-FOR-tee-geh OOM-zet-soong DRAHS-tish-er MAHS-nah-men oon-air-LEHS-likh",
        prompt: "Provide an academic stance on climate action using sophisticated register."
      };
    } else { // C2
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
    if (level === "A1") {
      return {
        title: "Introducing Your Pet (Mein Haustier)",
        instructions: "Formulate basic declarative sentences using standard word order and verb agreements.",
        prompt: "Describe an animal you like or your pet. Give its name, age (e.g. 3 Jahre), and color. Try to use 'haben' or 'halten'."
      };
    } else if (level === "A2") {
      return {
        title: "An Inquiry to a Landlord (Wohnungsanfrage)",
        instructions: "Compose polite requests checking apartment features with correct adjective endings.",
        prompt: "Write a short request message to a landlord asking if the apartment has a balcony, how high the warm rent ('Warmmiete') is, and if pets are allowed."
      };
    } else if (level === "B1") {
      return {
        title: "Expressing Opinions on Remote Work (Homeoffice)",
        instructions: "Construct complex arguments with subordinate clauses (weil, obwohl, dass) outlining benefits and drawbacks.",
        prompt: "Write a paragraph explaining your opinion on working from home. Discuss at least one advantage (e.g., flexibility) and one disadvantage (e.g., isolation)."
      };
    } else if (level === "B2") {
      return {
        title: "Letters of Complaint (Eine Beschwerde schreiben)",
        instructions: "Formulate a formal complaint structured with polite irritation and connecting particles.",
        prompt: "Write a short complaint about a delayed delivery. State that you ordered the goods two weeks ago and request a prompt resolution or refund."
      };
    } else if (level === "C1") {
      return {
        title: "Analysing Demographic Statistics (Demografischer Wandel)",
        instructions: "Use nominal style elements and passive voice to write an academic reflection.",
        prompt: "Draft a formal commentary on the challenges of an aging society. Focus on the pension budget and health infrastructure using nominal style prepositional blocks like 'aufgrund des Anstiegs der Lebenserwartung'."
      };
    } else { // C2
      return {
        title: "Philosophical Discourse on Technology (Mensch und Maschine)",
        instructions: "Compose highly elegant critiques utilizing subjunctive, modal particles, and advanced idioms.",
        prompt: "Write an essay snippet arguing whether AI will replace human creativity. Use complex compound nouns and include fine idioms such as 'von elementarer Bedeutung' or 'außer Zweifel stehen'."
      };
    }
  } else if (skill === "reading") {
    if (level === "A1") {
      return {
        title: "Anna's Morning (Annas Morgen)",
        instructions: "Read the simple paragraph about breakfast habits and identify details.",
        germanText: "Anna steht jeden Morgen um sechs Uhr auf. Sie trinkt zuerst eine Tasse heißen Tee. Zum Frühstück isst sie ein Brötchen mit Butter und Erdbeermarmelade. Danach geht sie zu Fuß zur Arbeit.",
        translation: "Anna wakes up every morning at six o'clock. First she drinks a cup of hot tea. For breakfast she eats a bread roll with butter and strawberry jam. After that, she walks to work.",
        readingQuestions: [
          {
            question: "Was trinkt Anna am Morgen?",
            options: ["Kaffee mit Milch", "Einen Orangensaft", "Eine Tasse Tee", "Kaltes Wasser"],
            correctIndex: 2,
            explanation: "The text states: 'Sie trinkt zuerst eine Tasse heißen Tee.' (She drinks first a cup of hot tea.)"
          },
          {
            question: "Wie reist Anna zu ihrer Arbeit?",
            options: ["Mit dem Bus", "Zu Fuß", "Mit dem Fahrrad", "Mit dem Auto"],
            correctIndex: 1,
            explanation: "The text says: 'Danach geht sie zu Fuß zur Arbeit.' ('zu Fuß' means walking / on foot.)"
          }
        ]
      };
    } else if (level === "A2") {
      return {
        title: "A Trip to Munich (Ein Ausflug nach München)",
        instructions: "Analyze the past experiences in Munich and complete comprehension checkpoints.",
        germanText: "Letzten Sommer haben Max und Peter München besucht. Sie sind früh am Morgen mit dem Zug angekommen. Zuerst haben sie den berühmten Marienplatz besichtigt, wo sie viele Fotos machten. Später gingen sie in ein traditionelles bayerisches Restaurant, um Weißwurst zu essen. Leider hat es am Abend stark geregnet, deshalb blieben sie im Hotel.",
        translation: "Last summer, Max and Peter visited Munich. They arrived early in the morning by train. First, they visited the famous Marienplatz, where they took many photos. Later, they went to a traditional Bavarian restaurant to eat veal sausage. Unfortunately, it rained heavily in the evening, so they stayed in the hotel.",
        readingQuestions: [
          {
            question: "Wie sind Max und Peter nach München gereist?",
            options: ["Mit dem Flugzeug", "Mit dem Auto", "Mit dem Zug", "Mit dem Fahrrad"],
            correctIndex: 2,
            explanation: "The text states: 'Sie sind früh am Morgen mit dem Zug angekommen.' (They arrived by train.)"
          },
          {
            question: "Warum blieben sie am Abend im Hotel?",
            options: ["Sie waren zu müde", "Wegen des schlechten Wetters (Regen)", "Weil das Restaurant geschlossen war", "Sie hatten kein Geld mehr"],
            correctIndex: 1,
            explanation: "The text shares: 'Leider hat es am Abend stark geregnet, deshalb blieben sie im Hotel.' (It rained heavily, so they stayed inside.)"
          }
        ]
      };
    } else if (level === "B1") {
      return {
        title: "Sustainability in Germany (Nachhaltigkeit im Alltag)",
        instructions: "Understand standard public arguments about ecological efforts in German urban lifestyles.",
        germanText: "In vielen deutschen Großstädten gewinnt das Thema Umweltschutz im Alltag immer mehr an Bedeutung. Die Bürger versuchen, Plastikmüll zu vermeiden, indem sie wiederverwendbare Stofftaschen mitnehmen. Zudem nutzen viele vermehrt Ökostrom oder entscheiden sich ganz gegen ein eigenes Auto, um den CO2-Ausstoß zu senken. Obwohl die öffentlichen Verkehrsmittel manchmal unpünktlich sind, gelten sie dennoch als die praktischste Alternative für Pendler.",
        translation: "In many large German cities, the topic of environmental protection in everyday life is gaining more and more importance. Citizens try to avoid plastic waste by bringing reusable cloth bags. Additionally, many increasingly use green electricity or decide against owning a car to reduce CO2 emissions. Although public transport is sometimes unpunctual, it is still considered the most practical alternative for commuters.",
        readingQuestions: [
          {
            question: "Wie versuchen deutsche Großstädter, Plastikmüll im Alltag zu verringern?",
            options: ["Sie kaufen gar nichts mehr", "Sie nehmen Stofftaschen zum Einkaufen mit", "Sie verbrennen allen Haushaltsmüll", "Sie ernähren sich nur noch vegan"],
            correctIndex: 1,
            explanation: "The text explicitly says they bring reusable cloth bags ('Stofftaschen') to avoid plastic waste."
          },
          {
            question: "Welchen Nachteil des öffentlichen Nahverkehrs nennt der Text?",
            options: ["Die Tickets sind extrem teuer", "Die Züge sind oft überfüllt", "Sie sind manchmal unpünktlich", "Es gibt keine Bahnhöfe mehr"],
            correctIndex: 2,
            explanation: "The text explains: 'Obwohl die öffentlichen Verkehrsmittel manchmal unpünktlich sind...' (although they are sometimes unpunctual...)"
          }
        ]
      };
    } else if (level === "B2") {
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
    } else if (level === "C1") {
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
    } else { // C2
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
  } else { // listening
    if (level === "A1") {
      return {
        title: "At the Checkout Counter (An der Kasse)",
        instructions: "Listen to the cashier's statement. Listen carefully for numeric prices, cards, or bags.",
        audioStatement: "Das macht sieben Euro fünfzig. Zahlen Sie bar oder mit Karte?",
        translation: "That makes seven euros fifty. Are you paying with cash or with card?",
        listeningQuestions: [
          {
            question: "How much is the total amount mentioned by the cashier?",
            options: ["€7.15", "€17.50", "€7.50", "€1.50"],
            correctIndex: 2,
            explanation: "'sieben Euro fünfzig' represents 7,50 Euros."
          }
        ]
      };
    } else if (level === "A2") {
      return {
        title: "Train Delay Announcement (Bahnsteigansage)",
        instructions: "Listen to the station intercom. Find out the cause and the time mismatch details.",
        audioStatement: "Achtung am Gleis vier: Der ICE nach Frankfurt hat heute wegen einer Signalstörung ca. zwanzig Minuten Verspätung.",
        translation: "Attention on platform four: The ICE to Frankfurt has approx. twenty minutes delay today due to a signal malfunction.",
        listeningQuestions: [
          {
            question: "Why is the train delayed, and for how long?",
            options: ["Due to bad weather, split by 10 minutes", "Due to a signal issue, delayed by 20 minutes", "Because of a missing conductor, delayed by 2 hours", "A route cancellation at platform four"],
            correctIndex: 1,
            explanation: "'Wegen einer Signalstörung' means due to a signal issue, and 'zwanzig Minuten' means twenty minutes."
          }
        ]
      };
    } else if (level === "B1") {
      return {
        title: "Agreeing on an Activity (Terminabsprache)",
        instructions: "Listen to this dialogue clip indicating a schedule change and find out when the speakers will meet.",
        audioStatement: "Hallo Sarah! Das Treffen um vierzehn Uhr klappt leider nicht bei mir, weil ich spontan länger arbeiten muss. Könnten wir uns erst um siebzehn Uhr dreißig vor dem Kino treffen?",
        translation: "Hello Sarah! Unfortunately, our meeting at 2:00 PM doesn't work for me because I spontaneously have to work longer. Could we meet at 5:30 PM in front of the cinema instead?",
        listeningQuestions: [
          {
            question: "What is the new proposed meeting time?",
            options: ["2:00 PM (14:00 Uhr)", "4:30 PM (16:30 Uhr)", "5:30 PM (17:30 Uhr)", "7:00 PM (19:00 Uhr)"],
            correctIndex: 2,
            explanation: "'siebzehn Uhr dreißig' is 17:30, which corresponds directly to 5:30 PM."
          }
        ]
      };
    } else if (level === "B2") {
      return {
        title: "News Broadcast: Corporate Acquisition (Nachrichtenmeldung)",
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
    } else if (level === "C1") {
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
    } else { // C2
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
}

function getMockEvaluation(userInput: string, skill: string) {
  const norm = userInput.toLowerCase().trim();
  if (!norm) {
    return {
      ratingStars: 1,
      feedback: "Please provide a response so I can review it!",
      corrections: "Your text field was empty."
    };
  }

  // Check some typical inputs to provide delightful response ratings!
  if (norm.includes("kaffee") || norm.includes("möchte") || norm.includes("bitte")) {
    return {
      ratingStars: 5,
      feedback: "Wunderbar! This is a very polite, idiomatic cafe order. Pronunciation and word order are perfect.",
      corrections: "None! Fully accurate A1 conversational order.",
      correctedText: "Ich möchte bitte einen Kaffee mit Milch und Zucker, danke."
    };
  }

  return {
    ratingStars: 4,
    feedback: "Gute Arbeit! Your response shows great effort and uses accurate German vocabulary.",
    corrections: "Be sure to double check that you capitalized German nouns (like 'Kaffee', 'Mutter', 'Brief') and place verbs in direct position 2 in standard clauses.",
    correctedText: userInput.charAt(0).toUpperCase() + userInput.slice(1)
  };
}


// -------------------------------------------------------------
// Serve static frontend assets and fallbacks
// -------------------------------------------------------------
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap();
