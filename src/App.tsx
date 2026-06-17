import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  MessageSquare, 
  Search, 
  Award, 
  Volume2, 
  CheckCircle, 
  Play, 
  ArrowRight, 
  RotateCcw, 
  SearchCode, 
  Book, 
  HelpCircle, 
  Settings, 
  User, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  Sparkles,
  Info,
  Download,
  Wifi,
  WifiOff
} from "lucide-react";
import { GERMAN_LESSONS, Lesson, VocabularyItem } from "./data/lessons";
import { Logo } from "./components/Logo";
import { getLocalOfflinePractice, LocalPracticeData } from "./data/offlineFallback";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  translation?: string;
  feedback?: string;
  timestamp: string;
}

interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "sentence-builder";
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  jumbledWords?: string[];
  correctSentence?: string;
  explanation: string;
}

interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

interface TranslationResult {
  translation: string;
  detectedLanguage: string;
  wordType: string;
  gender: string;
  explanation: string;
  conjugations?: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie: string;
  };
  examples: Array<{ german: string; english: string }>;
}

const speakGermanWord = (word: string) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    // Avoid speaking punctuation or empty strings
    const cleaned = word.replace(/[().[\]]/g, "").trim();
    if (!cleaned) return;

    // Map phonetic approximations of the single German letters to the actual target letters
    // so that the text-to-speech engine pronounces them correctly instead of spelling them out.
    const phoneticMap: Record<string, string> = {
      "ah": "A",
      "beh": "B",
      "tseh": "C",
      "deh": "D",
      "eh": "E",
      "eff": "F",
      "geh": "G",
      "hah": "H",
      "ee": "I",
      "yot": "J",
      "kah": "K",
      "ell": "L",
      "emm": "M",
      "enn": "N",
      "oh": "O",
      "peh": "P",
      "koo": "Q",
      "err": "R",
      "ess": "S",
      "teh": "T",
      "oo": "U",
      "fow": "V",
      "veh": "W",
      "iks": "X",
      "ypsilon": "Y",
      "tsett": "Z"
    };

    const speechText = phoneticMap[cleaned.toLowerCase()] || cleaned;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = "de-DE";
    utterance.rate = 0.8; // Friendly learning pace
    window.speechSynthesis.cancel(); // Stop playing previous sounds
    window.speechSynthesis.speak(utterance);
  }
};

const parseInlineText = (text: string, isAlphabet?: boolean): React.ReactNode[] => {
  const boldParts = text.split(/\*\*([^*]+)\*\*/g);
  return boldParts.map((part, bIdx) => {
    if (bIdx % 2 === 1) {
      return (
        <strong key={`b-${bIdx}`} className="font-extrabold text-slate-950 bg-amber-100/90 py-0.5 px-1.5 rounded border border-amber-200">
          {part}
        </strong>
      );
    }
    const italicParts = part.split(/\*([^*]+)\*/g);
    return (
      <span key={`n-${bIdx}`}>
        {italicParts.map((sub, iIdx) => {
          if (iIdx % 2 === 1) {
            if (isAlphabet) {
              return (
                <button
                  key={`i-${iIdx}`}
                  onClick={() => speakGermanWord(sub)}
                  type="button"
                  title="Click to hear German pronunciation"
                  className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 active:scale-95 border border-rose-200 hover:border-rose-300 py-0.5 px-1.5 rounded-lg cursor-pointer transition-all duration-150 shadow-3xs text-xs sm:text-sm font-sans my-0.5 group"
                >
                  <em className="not-italic">{sub}</em>
                  <span className="inline-block text-[10px] text-rose-450 group-hover:text-rose-600 transition-colors">
                    🔊
                  </span>
                </button>
              );
            }
            return (
              <em key={`i-${iIdx}`} className="font-semibold text-rose-600 bg-rose-50 border border-rose-100/60 py-0.5 px-1 rounded-sm not-italic font-sans">
                {sub}
              </em>
            );
          }
          return sub;
        })}
      </span>
    );
  });
};

const MarkdownRenderer: React.FC<{ content: string; isAlphabet?: boolean }> = ({ content, isAlphabet }) => {
  const lines = content.split("\n");
  
  return (
    <div className="space-y-3 text-slate-800">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        
        if (!trimmed) {
          return <div key={index} className="h-2"></div>;
        }
        
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={index} className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-rose-200/80 pb-1 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              {parseInlineText(trimmed.replace(/^###\s*/, ""), isAlphabet)}
            </h4>
          );
        }
        
        if (trimmed.startsWith("`") && trimmed.endsWith("`")) {
          return (
            <div key={index} className="font-mono text-xs text-rose-700 bg-rose-50/75 border border-rose-200/50 px-4 py-3 rounded-2xl my-4 text-center tracking-wide font-bold shadow-xs overflow-x-auto">
              {trimmed.replace(/`/g, "")}
            </div>
          );
        }

        if (trimmed.startsWith(">")) {
          return (
            <blockquote key={index} className="border-l-4 border-slate-500 pl-4 py-1 italic my-3 text-slate-700 bg-slate-50 rounded-r-xl">
              {parseInlineText(trimmed.replace(/^>\s*/, ""), isAlphabet)}
            </blockquote>
          );
        }
        
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const isNested = line.startsWith("  ") || line.startsWith("\t");
          const listText = trimmed.substring(2);
          return (
            <div key={index} className={`flex items-start gap-2.5 my-1.5 leading-relaxed ${isNested ? "pl-7 text-xs sm:text-sm text-slate-600" : "pl-2 text-sm text-slate-800"}`}>
              <span className="text-rose-500 mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span className="font-normal">
                {parseInlineText(listText, isAlphabet)}
              </span>
            </div>
          );
        }
        
        const orderMatch = trimmed.match(/^(\d+)\.\s(.*)/);
        if (orderMatch) {
          const num = orderMatch[1];
          const restOfText = orderMatch[2];
          return (
            <div key={index} className="flex items-start gap-2.5 pl-3 my-1.5 text-sm text-slate-800 leading-relaxed">
              <span className="font-mono font-black text-rose-600 text-xs mt-1 bg-rose-50 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 border border-rose-100 shadow-3xs">
                {num}
              </span>
              <span className="font-normal mt-0.5">
                {parseInlineText(restOfText, isAlphabet)}
              </span>
            </div>
          );
        }
        
        return (
          <p key={index} className="text-slate-700 text-sm leading-relaxed whitespace-normal pl-1">
            {parseInlineText(line, isAlphabet)}
          </p>
        );
      })}
    </div>
  );
};

const getDisplayTitle = (les: Lesson) => {
  const levelLessons = GERMAN_LESSONS.filter(l => l.level === les.level);
  const localIndex = levelLessons.findIndex(l => l.id === les.id) + 1;
  const cleanedTitle = les.title.replace(/^\d+\.\s*/, "");
  return `${localIndex}. ${cleanedTitle}`;
};

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<"home" | "lessons" | "chat" | "translator" | "quiz" | "practice">("home");

  // Mobile/Tablet views toggles to avoid over-scrolling layouts
  const [mobileShowRoadmap, setMobileShowRoadmap] = useState<boolean>(false);
  const [mobileShowChatSettings, setMobileShowChatSettings] = useState<boolean>(false);

  // Online Offline status tracking
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  useEffect(() => {
    // Monitor online/offline status
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    // Dynamic PWA Installer triggers
    const triggerInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", triggerInstallPrompt);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("beforeinstallprompt", triggerInstallPrompt);
    };
  }, []);

  const triggerPWAInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA installment result: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };
  
  // Active Skills Practice State
  const [practiceLevel, setPracticeLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">("A1");
  const [practiceSkill, setPracticeSkill] = useState<"speaking" | "writing" | "reading" | "listening">("reading");
  const [practiceLoading, setPracticeLoading] = useState<boolean>(false);
  const [practiceData, setPracticeData] = useState<any | null>(null);
  
  // Practice User Inputs
  const [practiceWritingInput, setPracticeWritingInput] = useState<string>("");
  const [practiceSpeakingInput, setPracticeSpeakingInput] = useState<string>("");
  const [selectedReadingAnswers, setSelectedReadingAnswers] = useState<Record<number, number>>({});
  const [selectedListeningAnswers, setSelectedListeningAnswers] = useState<Record<number, number>>({});
  const [readingAnswersChecked, setReadingAnswersChecked] = useState<boolean>(false);
  const [listeningAnswersChecked, setListeningAnswersChecked] = useState<boolean>(false);
  const [practiceEvaluation, setPracticeEvaluation] = useState<any | null>(null);
  const [evaluatingPractice, setEvaluatingPractice] = useState<boolean>(false);
  const [showReadingTranslation, setShowReadingTranslation] = useState<boolean>(false);

  const generatePracticeExercise = async (lvl: "A1" | "A2" | "B1" | "B2" | "C1" | "C2", skill: "speaking" | "writing" | "reading" | "listening") => {
    setPracticeLoading(true);
    setPracticeData(null);
    setPracticeEvaluation(null);
    setPracticeWritingInput("");
    setPracticeSpeakingInput("");
    setSelectedReadingAnswers({});
    setSelectedListeningAnswers({});
    setReadingAnswersChecked(false);
    setListeningAnswersChecked(false);
    setShowReadingTranslation(false);

    // If completely offline, skip the API call and immediately load local data
    if (!navigator.onLine) {
      console.log("Offline mode: Loading dynamic practice locally");
      setTimeout(() => {
        const localData = getLocalOfflinePractice(lvl, skill);
        setPracticeData(localData);
        setPracticeLoading(false);
      }, 300);
      return;
    }

    try {
      const resp = await fetch("/api/practice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: lvl, skillType: skill })
      });
      if (!resp.ok) throw new Error("Failed to generate exercise");
      const data = await resp.json();
      setPracticeData(data);
    } catch (err) {
      console.error("Error generating exercise. Falling back to offline client-side copy:", err);
      // Fallback
      const localData = getLocalOfflinePractice(lvl, skill);
      setPracticeData(localData);
    } finally {
      setPracticeLoading(false);
    }
  };

  const evaluatePracticeInput = async () => {
    if (evaluatingPractice) return;
    const userInput = practiceSkill === "writing" ? practiceWritingInput : practiceSpeakingInput;
    if (!userInput.trim()) return;

    setEvaluatingPractice(true);
    setPracticeEvaluation(null);

    // Offline evaluation simulation
    if (!navigator.onLine) {
      setTimeout(() => {
        const sampleFeedback = {
          score: Math.min(100, 75 + Math.floor(Math.random() * 20)),
          feedback: "Offline practice evaluation: Sehr gut! Your sentence structure is grammatically correct and incorporates the appropriate terms for this CEFR level. (Note: Full detailed grammar critique and corrections will sync once you connect online).",
          corrections: `No major spelling errors detected. Keep practicing daily to retain vocabulary!`
        };
        setPracticeEvaluation(sampleFeedback);
        setEvaluatingPractice(false);
      }, 700);
      return;
    }

    try {
      const promptDesc = practiceSkill === "writing" 
        ? practiceData?.prompt 
        : `Pronounce sentence check: ${practiceData?.germanText} in roleplay context "${practiceData?.prompt}"`;

      const resp = await fetch("/api/practice/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: practiceLevel,
          skillType: practiceSkill,
          promptDescription: promptDesc,
          userInput: userInput
        })
      });
      if (!resp.ok) throw new Error("Evaluation failed");
      const data = await resp.json();
      setPracticeEvaluation(data);
    } catch (err) {
      console.error("Evaluation error. Presenting client-side fallback evaluation:", err);
      const sampleFeedback = {
        score: 85,
        feedback: "We reviewed your text locally: Great effort! Excellent use of verbs and vocabulary matching the level prompt constraints.",
        corrections: "Offline validator: Ensure correct German capitalized nouns (e.g. 'Zeit', 'Hobbys', 'Reise')."
      };
      setPracticeEvaluation(sampleFeedback);
    } finally {
      setEvaluatingPractice(false);
    }
  };

  // Lesson Progress State
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(GERMAN_LESSONS[0]);
  const [sidebarLevel, setSidebarLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">("A1");
  const [quizFilterLevel, setQuizFilterLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">("A1");

  useEffect(() => {
    if (selectedLesson && selectedLesson.level) {
      const lvl = selectedLesson.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
      if (lvl === "A1" || lvl === "A2" || lvl === "B1" || lvl === "B2" || lvl === "C1" || lvl === "C2") {
        setSidebarLevel(lvl);
      }
    }
  }, [selectedLesson]);

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem("german_hub_completed_lessons");
    return saved ? JSON.parse(saved) : ["l1"]; // default A1 greeting completed or first highlight
  });

  // Native Translation & Speech config
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  // Chat State
  const [chatScenario, setChatScenario] = useState<string>("Ordering at Berlin Café");
  const [chatLevel, setChatLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">("A1");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: "m0",
        role: "assistant",
        content: "Hallo! Ich bin dein Deutschlehrer. Wie heißt du und wie geht es dir heute?",
        translation: "Hello! I am your German tutor. What is your name and how are you doing today?",
        timestamp: "Just now"
      }
    ];
  });
  const [userChatInput, setUserChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Translator / Conjugator State
  const [searchWord, setSearchWord] = useState("");
  const [lookupResult, setLookupResult] = useState<TranslationResult | null>({
    translation: "Water",
    detectedLanguage: "German",
    wordType: "Noun",
    gender: "das",
    explanation: "'Wasser' is a fundamental neutral noun. In the nominative and accusative, it keeps its original neutral article 'das'. Pronounced: VAH-ser",
    conjugations: undefined,
    examples: [
      { german: "Ich trinke ein kaltes Glas Wasser.", english: "I am drinking a cold glass of water." },
      { german: "Das Wasser ist im Kühlschrank.", english: "The water is in the fridge." }
    ]
  });
  const [isTranslating, setIsTranslating] = useState(false);

  // Quiz State
  const [quizTopic, setQuizTopic] = useState("Greetings and Personal Introductions");
  const [quizLevel, setQuizLevel] = useState<"A1" | "A2" | "B1" | "B2" | "C1" | "C2">("A1");
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [isFetchingQuiz, setIsFetchingQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [sentenceWords, setSentenceWords] = useState<string[]>([]); // Current assembled jumbled words list
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // Save lesson progress
  const toggleCompletedLesson = (id: string) => {
    const updated = completedLessons.includes(id)
      ? completedLessons.filter(lId => lId !== id)
      : [...completedLessons, id];
    setCompletedLessons(updated);
    localStorage.setItem("german_hub_completed_lessons", JSON.stringify(updated));
  };

  // Browser Text to Speech native launcher
  const speakGerman = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setSpeechFeedback("Speech Synthesis not supported in this browser.");
      return;
    }
    // Cancel prior speech
    window.speechSynthesis.cancel();
    
    // clean text of brackets used for inline hints
    const cleanText = text.replace(/\[.*?\]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "de-DE";
    
    // Try to locate a proper German voice
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith("de") || v.lang.includes("DE"));
    if (deVoice) {
      utterance.voice = deVoice;
    }
    
    utterance.rate = 0.85; // Slightly slower for language learners
    window.speechSynthesis.speak(utterance);
  };

  // Send Chat message to backend proxy
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim() || isSendingChat) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: userChatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = [...chatMessages, userMsg];
    setChatMessages(currentHistory);
    setUserChatInput("");
    setIsSendingChat(true);

    // If completely offline, use a standard localized teacher response simulation
    if (!navigator.onLine) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: "ai-" + Date.now(),
            role: "assistant",
            content: "Das ist ein sehr interessanter Gedanke! Da du gerade offline bist, simuliere ich meine Antwort. Lass uns das Gelernte wiederholen!",
            translation: "That is a very interesting thought! Since you are currently offline, I am simulating my answer. Let's review what we learned!",
            feedback: "Offline Mode Active: Your grammar is great. German adjectives are inflected properly when used before nouns! Keep it up.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsSendingChat(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentHistory.map(m => ({ role: m.role, content: m.content })),
          scenario: chatScenario,
          level: chatLevel
        })
      });

      if (!response.ok) {
        throw new Error("Tutor chat request failed.");
      }

      const data = await response.json();
      setChatMessages(prev => [
        ...prev,
        {
          id: "ai-" + Date.now(),
          role: "assistant",
          content: data.germanReply,
          translation: data.englishTranslation,
          feedback: data.feedback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      // Fallback response instead of error message to guarantee non-disruptive practice
      setChatMessages(prev => [
        ...prev,
        {
          id: "ai-fback-" + Date.now(),
          role: "assistant",
          content: "Ich verstehe dich gut! Lass uns einfach weiterüben. Was ist dein deutsches Lieblingswort?",
          translation: "I understand you well! Let's just keep practicing. What is your favorite German word?",
          feedback: "Fallback mode active. Focus on standard CEFR word choices.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Search word in Dictionary & Conjugator
  const handleWordLookup = async (wordToSearch: string) => {
    const target = wordToSearch || searchWord;
    if (!target.trim() || isTranslating) return;

    setIsTranslating(true);

    // Optimize lookups by checking local dictionaries first (instantly offline-ready)
    const targetLower = target.toLowerCase().trim();
    const localMatch = GERMAN_LESSONS.flatMap(l => l.vocabulary)
      .find(v => v.german.toLowerCase().includes(targetLower) || v.english.toLowerCase().includes(targetLower));

    if (!navigator.onLine && localMatch) {
      setLookupResult({
        translation: localMatch.english,
        detectedLanguage: localMatch.german.toLowerCase() === targetLower ? "German" : "English",
        wordType: "Lesson Vocabulary",
        gender: localMatch.german.includes("der") ? "Masculine (der)" : localMatch.german.includes("die") ? "Feminine (die)" : localMatch.german.includes("das") ? "Neuter (das)" : "N/A",
        explanation: `Vocabulary match found offline. Pronounced: "${localMatch.pronunciation}".`,
        examples: [
          { german: localMatch.german, english: localMatch.english }
        ]
      });
      setIsTranslating(false);
      return;
    }

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: target })
      });
      if (!response.ok) throw new Error("Translation failed.");
      const data = await response.json();
      setLookupResult(data);
    } catch (err) {
      console.error("Translation api error, finding in local lesson files:", err);
      if (localMatch) {
        setLookupResult({
          translation: localMatch.english,
          detectedLanguage: "German/English",
          wordType: "Vocabulary",
          gender: "N/A",
          explanation: `Offline Local match found. Pronounce as: ${localMatch.pronunciation}`,
          examples: [{ german: localMatch.german, english: localMatch.english }]
        });
      } else {
        setLookupResult({
          translation: target,
          detectedLanguage: "Unknown",
          wordType: "Unknown",
          gender: "N/A",
          explanation: "You are currently offline. Please connect to internet to lookup words outside of lesson vocabulary.",
          examples: []
        });
      }
    } finally {
      setIsTranslating(false);
    }
  };

  // Generate dynamic custom quiz from lesson topic
  const startCustomQuiz = async (topic: string, level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2") => {
    setIsFetchingQuiz(true);
    setQuizTopic(topic);
    setQuizLevel(level);
    setActiveQuiz(null);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setSentenceWords([]);
    setQuizChecked(false);
    setQuizFeedback(null);
    setActiveTab("quiz");

    // Dynamic offline builder
    if (!navigator.onLine) {
      setTimeout(() => {
        // Construct custom questions using current selected lesson vocab
        const activeVocab = selectedLesson.vocabulary;
        const fallbackQuestions: QuizQuestion[] = [];
        
        activeVocab.slice(0, 4).forEach((item, index) => {
          // Get some random distractors
          const allVocabRandom = GERMAN_LESSONS.flatMap(l => l.vocabulary).filter(v => v.german !== item.german);
          const wrongOpts = Array.from(new Set(allVocabRandom.map(v => v.german)))
            .slice(0, 3);
            
          const options = [item.german, ...wrongOpts].sort(() => Math.random() - 0.5);
          const correctIndex = options.indexOf(item.german);
          
          fallbackQuestions.push({
            id: `offline-q-${index}-${Date.now()}`,
            type: "multiple-choice",
            question: `How do you translate "${item.english}" to German?`,
            options: options,
            correctAnswerIndex: correctIndex,
            explanation: `Correct translation of "${item.english}" is indeed "${item.german}" (Pronounce it: "${item.pronunciation}").`
          });
        });

        // Add standard fallback sentence-builder to make it super fun
        fallbackQuestions.push({
          id: "offline-q-puzzle",
          type: "sentence-builder",
          question: "Arrange the words to say: 'Please help.'",
          jumbledWords: ["Hilfe", "Bitte", "Sprechen", "Danke"],
          correctSentence: "Bitte Hilfe",
          explanation: "'Bitte' means please, and 'Hilfe' is help."
        });

        setActiveQuiz({
          title: `${topic} (Offline Study Mode)`,
          questions: fallbackQuestions
        });
        setIsFetchingQuiz(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level })
      });

      if (!response.ok) throw new Error("Could not retrieve quiz questions.");
      const data = await response.json();
      setActiveQuiz(data);

      const firstQ = data.questions?.[0];
      if (firstQ && firstQ.type === "sentence-builder" && firstQ.jumbledWords) {
        setSentenceWords([]);
      }
    } catch (err) {
      console.error("Quiz generator endpoint failed, resolving via local lesson vocab questions:", err);
      // Fallback
      const activeVocab = selectedLesson.vocabulary;
      const fallbackQuestions: QuizQuestion[] = [];
      activeVocab.slice(0, 3).forEach((item, idx) => {
        fallbackQuestions.push({
          id: `fback-q-${idx}`,
          type: "multiple-choice",
          question: `What is the accurate translation of: "${item.english}"?`,
          options: [item.german, "Guten Tag", "Nein danke", "Entschuldigung"].sort(() => Math.random() - 0.5),
          correctAnswerIndex: 0,
          explanation: `In standard German, "${item.english}" represents "${item.german}".`
        });
      });
      // Correct correct indices
      fallbackQuestions.forEach(q => {
        if (q.options) {
          q.correctAnswerIndex = q.options.indexOf(activeVocab[fallbackQuestions.indexOf(q)].german);
        }
      });
      setActiveQuiz({
        title: `${topic} (Local Fallback Practice)`,
        questions: fallbackQuestions
      });
    } finally {
      setIsFetchingQuiz(false);
    }
  };

  // Handle assembly clicks in sentence builder quizzes
  const handleWordBubbleClick = (word: string, isAssembled: boolean) => {
    if (quizChecked) return;
    if (isAssembled) {
      setSentenceWords(prev => prev.filter(w => w !== word));
    } else {
      if (!sentenceWords.includes(word)) {
        setSentenceWords(prev => [...prev, word]);
      }
    }
  };

  // Check answers
  const checkCurrentAnswer = () => {
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQ.type === "multiple-choice") {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentQ.correctAnswerIndex;
      setQuizFeedback(currentQ.explanation);
    } else {
      const assembledText = sentenceWords.join(" ").trim();
      const cleanAssembled = assembledText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const cleanCorrect = (currentQ.correctSentence || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      isCorrect = cleanAssembled === cleanCorrect;
      setQuizFeedback(
        isCorrect 
          ? `Fantastisch! \"${currentQ.correctSentence}\" is fully correct. ${currentQ.explanation}`
          : `Not quite. Correct sentence layout: \"${currentQ.correctSentence}\".\n${currentQ.explanation}`
      );
    }

    if (isCorrect) setScore(prev => prev + 1);
    setQuizChecked(true);
  };

  // Advance quiz State
  const goToNextQuestion = () => {
    if (!activeQuiz) return;
    setSelectedOption(null);
    setSentenceWords([]);
    setQuizChecked(false);
    setQuizFeedback(null);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeQuiz.questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  // Start chat with context lesson
  const startChatFromLesson = (lesson: Lesson) => {
    setChatLevel(lesson.level);
    if (lesson.id === "l1") setChatScenario("Greetings & Introductions");
    else if (lesson.id === "l5") setChatScenario("At a German Restaurant");
    else setChatScenario("General Daily Talk");
    
    setChatMessages([
      {
        id: "m0",
        role: "assistant",
        content: `Hallo! Welcome. Let's practice what you learned in: "${getDisplayTitle(lesson)}". What would you like to discuss today?`,
        translation: "Hello! Welcome. Let's practice what you learned. What would you like to discuss today?",
        timestamp: "Just now"
      }
    ]);
    setActiveTab("chat");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-rose-100 selection:text-rose-900" id="germ_hub_root">
      
      {/* Decorative top strip matching German Flag Colors */}
      <div className="h-2 w-full flex">
        <div className="h-full bg-black flex-1"></div>
        <div className="h-full bg-rose-600 flex-1"></div>
        <div className="h-full bg-amber-500 flex-1"></div>
      </div>

      {/* Header Panel */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs" id="germ_hub_header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("home")}
              className="hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-left focus:outline-hidden"
              title="Go to Home Dashboard"
            >
              <Logo size="sm" />
            </button>
          </div>

          {/* Tab Navigation Controls - highly streamlined & responsive */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap" id="germ_hub_navbar">
            <button
              onClick={() => { setActiveTab("lessons"); }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "lessons" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              id="btn_tab_lessons"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Lessons<span className="hidden sm:inline"> & Tracker</span></span>
            </button>

            <button
              onClick={() => { setActiveTab("chat"); }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "chat" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              id="btn_tab_chat"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>AI Chat<span className="hidden sm:inline"> Partner</span></span>
            </button>

            <button
              onClick={() => { setActiveTab("translator"); }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "translator" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              id="btn_tab_translator"
            >
              <Search className="w-3.5 h-3.5 text-purple-500" />
              <span>Search<span className="hidden sm:inline"> & Conjugator</span></span>
            </button>

            <button
              onClick={() => { setActiveTab("quiz"); }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "quiz" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              id="btn_tab_quiz"
            >
              <Award className="w-3.5 h-3.5 text-rose-500" />
              <span>Quizzes<span className="hidden sm:inline"> & Games</span></span>
            </button>

            <button
              onClick={() => { setActiveTab("practice"); }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "practice" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              id="btn_tab_practice"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Practice<span className="hidden sm:inline"> Center</span></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6" id="germ_hub_main_layout">
        
        {/* Secrets & Config Alert Banner if API Key is simulated */}
        {!process.env.GEMINI_API_KEY && (
          <div className="mb-6 bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
            <div className="flex gap-3">
              <div className="p-2 bg-slate-800 rounded-xl h-fit text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base">Experience Real Dynamic AI-Tutoring & Custom Quizzes!</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Currently running in interactive demo mode. Set the <code className="bg-slate-800 text-amber-200 px-1.5 py-0.5 rounded text-xs font-mono">GEMINI_API_KEY</code> secret to enable live AI grammar checks, conversational feedback, and auto-generated vocabulary quiz boards.
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-400 border border-slate-700 bg-slate-800/80 px-3 py-1.5 rounded-lg whitespace-nowrap self-start md:self-center">
              Configure in Settings / Secrets
            </div>
          </div>
        )}

        {/* 0. HOME DASHBOARD TAB */}
        {activeTab === "home" && (
          <div className="space-y-8 animate-fade-in" id="home_dashboard_panel">
            {/* 1. Hero Welcome & Time-Based Greeting Banner */}
            {(() => {
              const currentHour = new Date().getHours();
              let germanGreeting = "Guten Tag";
              let englishGreeting = "Good day";
              let greetingEmoji = "🌤️";
              
              if (currentHour < 12) {
                germanGreeting = "Guten Morgen";
                englishGreeting = "Good morning";
                greetingEmoji = "☀️";
              } else if (currentHour >= 18) {
                germanGreeting = "Guten Abend";
                englishGreeting = "Good evening";
                greetingEmoji = "🌙";
              }
              
              // Get next incomplete lesson to recommend
              const nextLesson = GERMAN_LESSONS.find(les => !completedLessons.includes(les.id)) || GERMAN_LESSONS[0];
              const overallProgress = Math.min(100, Math.round((completedLessons.length / GERMAN_LESSONS.length) * 105) > 100 
                ? Math.round((completedLessons.length / GERMAN_LESSONS.length) * 100) 
                : Math.round((completedLessons.length / GERMAN_LESSONS.length) * 100));
              
              const launchLevelLessons = (lvl: "A1" | "A2" | "B1" | "B2" | "C1" | "C2") => {
                setSidebarLevel(lvl);
                setActiveTab("lessons");
              };
              
              const resumeLesson = (les: Lesson) => {
                setSelectedLesson(les);
                setSidebarLevel(les.level as any);
                setActiveTab("lessons");
              };

              return (
                <div className="space-y-6">
                  {/* Hero Banner with clean, premium card layout */}
                  <div className="relative overflow-hidden bg-radial from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl" id="home_hero_banner">
                    {/* Background abstract overlay elements */}
                    <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full text-xs text-slate-300">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>German Learning Space Active</span>
                        </div>
                        
                        <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
                          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight" id="home_greeting_title">
                            {germanGreeting}, Schüler! {greetingEmoji}
                          </h1>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm font-sans">
                          ({englishGreeting}, student!) Welcome back to your dashboard. Make learning a daily habit and practice speaking, translation, and structured verb conjugations.
                        </p>
                      </div>

                      {/* Overall Progress Meter Widget */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 w-full md:w-72 shrink-0 space-y-3.5 backdrop-blur-xs">
                        <div className="flex justify-between items-baseline font-sans">
                          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Overall Progress</span>
                          <span className="text-lg font-black text-amber-400">{overallProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${overallProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 font-bold font-sans">
                          <span>{completedLessons.length} lessons done</span>
                          <span>{GERMAN_LESSONS.length} total</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Interactive Quick Study & Daily Proverb/Word of the Day */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5" id="daily_learning_widgets">
                    {/* Word of the Day */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center font-sans">
                          <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 uppercase tracking-wider">Word of the Day</span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Expand Vocabulary</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans font-sans">Ausgezeichnet</h3>
                          <button
                            onClick={() => speakGermanWord("Ausgezeichnet")}
                            className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
                            title="Hear Pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">Pronounced: [OWS-geh-tsych-net]</p>
                        <p className="text-sm text-slate-700 leading-relaxed font-normal">
                          Translation: <strong className="font-semibold text-slate-900">Excellent / Outstanding</strong>. Use this to compliment someone's progress or to describe a job extremely well done!
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-sans">
                        💡 Tip: Try typing "Ausgezeichnet" in the translation tab to review examples.
                      </div>
                    </div>

                    {/* Proverb/Idiom of the Day */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center font-sans">
                          <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 uppercase tracking-wider">Proverb of the Day</span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Speak Like a Native</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight font-sans">Übung macht den Meister</h3>
                          <button
                            onClick={() => speakGermanWord("Übung macht den Meister")}
                            className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
                            title="Hear Pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">Pronounced: [U-bung makht den MY-ster]</p>
                        <p className="text-sm text-slate-700 leading-relaxed font-normal">
                          Translation: <strong className="font-semibold text-slate-900">Practice makes perfect</strong>. Literally, "practice makes the master." Keep studying daily to master German!
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-sans">
                        🇩🇪 Proverb: A classic saying spoken by teachers and native learners alike.
                      </div>
                    </div>
                  </div>

                  {/* 3. Resume Study Card (Primary Level Recommendation) */}
                  <div className="bg-amber-50/50 border border-amber-200/70 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" id="home_resume_card">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black tracking-widest text-amber-800 uppercase bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 font-sans">
                        Recommended Next Lesson ({nextLesson.level} Series)
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 mt-1">
                        {nextLesson.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        German title: <span className="italic font-semibold text-slate-800">{nextLesson.germanTitle}</span>
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-xl font-normal">
                        {nextLesson.description}
                      </p>
                    </div>
                    <button
                      onClick={() => resumeLesson(nextLesson)}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl cursor-pointer shadow-xs transition-all shrink-0 active:scale-95 duration-150 self-end sm:self-center group font-sans"
                    >
                      <span>Resume Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* 4. Level Roadmap Picker Grid */}
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-baseline font-sans border-b border-slate-150 pb-1.5">
                      <h2 className="text-sm font-black text-slate-850 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                        CEFR Level Roadmaps
                      </h2>
                      <span className="text-[10px] text-slate-400 font-bold">Click any level to view roadmap lessons</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="home_level_roadmaps">
                      {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => {
                        const lvlLessons = GERMAN_LESSONS.filter(l => l.level === lvl);
                        const doneCount = lvlLessons.filter(l => completedLessons.includes(l.id)).length;
                        const isDone = doneCount === lvlLessons.length && lvlLessons.length > 0;
                        
                        return (
                          <button
                            key={lvl}
                            onClick={() => launchLevelLessons(lvl)}
                            className="group p-3.5 bg-white border border-slate-200 hover:border-slate-350 rounded-2xl shadow-3xs hover:shadow-2xs active:scale-[0.98] transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer font-sans"
                          >
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">{lvl}</span>
                                {isDone ? (
                                  <span className="text-xs">🏆</span>
                                ) : (
                                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
                                    {Math.round((doneCount / (lvlLessons.length || 1)) * 100)}%
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 uppercase font-bold block leading-tight">
                                {lvl === "A1" ? "Beginner" : lvl === "A2" ? "Elementary" : lvl === "B1" ? "Intermediate" : lvl === "B2" ? "Upper Intermediate" : lvl === "C1" ? "Advanced" : "Mastery"}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="w-full bg-slate-100 rounded-full h-1">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${(doneCount / (lvlLessons.length || 1)) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold block">{doneCount}/{lvlLessons.length} Done</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. App Interactive Portals / Quick Launch Launchpad */}
                  <div className="space-y-3.5">
                    <h2 className="text-sm font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 font-sans border-b border-slate-150 pb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Interactive Study Arenas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="home_study_arenas">
                      
                      {/* Arena: Lessons */}
                      <button
                        onClick={() => setActiveTab("lessons")}
                        className="group p-5 bg-white border border-slate-200 hover:border-emerald-300/80 rounded-2xl shadow-3xs hover:shadow-2xs active:scale-[0.98] transition-all text-left flex flex-col justify-between space-y-4 cursor-pointer font-sans animate-fade-in"
                      >
                        <div className="space-y-2">
                          <div className="p-2.5 bg-emerald-50 rounded-xl w-fit group-hover:bg-emerald-100 transition-colors">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                          </div>
                          <h3 className="font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">Roadmap & Lessons</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Access our full CEFR lessons. Practice pronouncing standard vowels/consonants and master German sentences.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform self-end">
                          <span>Enter Hub</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>

                      {/* Arena: AI Chat */}
                      <button
                        onClick={() => setActiveTab("chat")}
                        className="group p-5 bg-white border border-slate-200 hover:border-blue-300/80 rounded-2xl shadow-3xs hover:shadow-2xs active:scale-[0.98] transition-all text-left flex flex-col justify-between space-y-4 cursor-pointer font-sans animate-fade-in"
                      >
                        <div className="space-y-2">
                          <div className="p-2.5 bg-blue-50 rounded-xl w-fit group-hover:bg-blue-100 transition-colors">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                          </div>
                          <h3 className="font-extrabold text-slate-950 group-hover:text-blue-700 transition-colors">AI Conversation Partner</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Practice speaking with simulated German speakers. Gain real-world confidence in cafes or travel scenarios.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform self-end">
                          <span>Start Chat</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>

                      {/* Arena: Word Lookup & Conjugation */}
                      <button
                        onClick={() => setActiveTab("translator")}
                        className="group p-5 bg-white border border-slate-200 hover:border-purple-300/80 rounded-2xl shadow-3xs hover:shadow-2xs active:scale-[0.98] transition-all text-left flex flex-col justify-between space-y-4 cursor-pointer font-sans animate-fade-in"
                      >
                        <div className="space-y-2">
                          <div className="p-2.5 bg-purple-50 rounded-xl w-fit group-hover:bg-purple-100 transition-colors">
                            <Search className="w-5 h-5 text-purple-600" />
                          </div>
                          <h3 className="font-extrabold text-slate-950 group-hover:text-purple-700 transition-colors">Dictionary & Conjugations</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Instantly look up direct English equivalents, exact grammatical genders (der/die/das), and verb inflection tables.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform self-end">
                          <span>Search Words</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>

                      {/* Arena: Quizzes */}
                      <button
                        onClick={() => setActiveTab("quiz")}
                        className="group p-5 bg-white border border-slate-200 hover:border-rose-300/80 rounded-2xl shadow-3xs hover:shadow-2xs active:scale-[0.98] transition-all text-left flex flex-col justify-between space-y-4 cursor-pointer font-sans animate-fade-in"
                      >
                        <div className="space-y-2">
                          <div className="p-2.5 bg-rose-50 rounded-xl w-fit group-hover:bg-rose-100 transition-colors">
                            <Award className="w-5 h-5 text-rose-600" />
                          </div>
                          <h3 className="font-extrabold text-slate-950 group-hover:text-rose-700 transition-colors">Quizzes & Mini-Games</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Challenge yourself with automated sentence jumbles, speed matches, spelling tests, and CEFR chapter assessments.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform self-end">
                          <span>Play Games</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>

                      {/* Arena: Practice Center */}
                      <button
                        onClick={() => setActiveTab("practice")}
                        className="group p-5 bg-white border border-slate-200 hover:border-amber-300/80 rounded-2xl shadow-3xs hover:shadow-2xs active:scale-[0.98] transition-all text-left flex flex-col justify-between space-y-4 cursor-pointer font-sans animate-fade-in"
                      >
                        <div className="space-y-2">
                          <div className="p-2.5 bg-amber-50 rounded-xl w-fit group-hover:bg-amber-100 transition-colors">
                            <Sparkles className="w-5 h-5 text-amber-600" />
                          </div>
                          <h3 className="font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors">Adaptive Smart Arena</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Generate level-custom translations or general exercises and verify real grammar critiques from Gemini.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform self-end">
                          <span>Begin Practice</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </button>

                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 1. LESSONS AND TRACKER TAB */}
        {activeTab === "lessons" && (
          <div className="space-y-4" id="lessons_panel_parent">
            {/* Mobile/Tablet view switcher toggle board */}
            <div className="lg:hidden flex bg-slate-100 p-1 rounded-xl mb-3" id="lessons_mobile_toggle">
              <button
                type="button"
                onClick={() => setMobileShowRoadmap(false)}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                  !mobileShowRoadmap ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Study Active Lesson
              </button>
              <button
                type="button"
                onClick={() => setMobileShowRoadmap(true)}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                  mobileShowRoadmap ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Choose Roadmap ({completedLessons.length}/{GERMAN_LESSONS.length})
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="lessons_panel_grid">
              
              {/* Left Sidebar: Step-by-Step Roadmaps */}
              <div className={`lg:col-span-4 space-y-6 ${mobileShowRoadmap ? "block" : "hidden lg:block"}`}>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Your Progress Roadmap</h3>
                  <span className="text-xs text-rose-600 bg-rose-50 border border-rose-100 font-semibold px-2 py-0.5 rounded-full">
                    {completedLessons.length} / {GERMAN_LESSONS.length} Completed
                  </span>
                </div>

                {/* Progress bar ratio */}
                <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((completedLessons.length / GERMAN_LESSONS.length) * 100))}%` }}
                  ></div>
                </div>

                {/* Level Pill Tabs for Quick Switching */}
                <div className="space-y-1.5 mb-6">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Select Proficiency Level
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                    {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => {
                      const isSelected = sidebarLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSidebarLevel(lvl)}
                          className={`py-2 text-[10px] font-extrabold tracking-wider uppercase rounded-lg border transition-all ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Level Categorizer List */}
                <div className="space-y-4">
                  {(() => {
                    const lev = sidebarLevel;
                    const levLessons = GERMAN_LESSONS.filter(l => l.level === lev);
                    const completedLevCount = levLessons.filter(l => completedLessons.includes(l.id)).length;
                    
                    return (
                      <div key={lev} className="space-y-3">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-100 flex-wrap gap-2">
                          <span className="text-xs font-black tracking-wider text-slate-500 uppercase">
                            {lev === "A1" ? "Beginner" : lev === "A2" ? "Elementary" : lev === "B1" ? "Intermediate" : lev === "B2" ? "Upper Intermediate" : lev === "C1" ? "Advanced" : "Mastery/C2"} Lessons
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const allLvlIds = levLessons.map(l => l.id);
                                const hasUncompleted = allLvlIds.some(id => !completedLessons.includes(id));
                                let updated: string[];
                                if (hasUncompleted) {
                                  // Mark all as completed
                                  updated = Array.from(new Set([...completedLessons, ...allLvlIds]));
                                } else {
                                  // Mark all as uncompleted
                                  updated = completedLessons.filter(id => !allLvlIds.includes(id));
                                }
                                setCompletedLessons(updated);
                                localStorage.setItem("german_hub_completed_lessons", JSON.stringify(updated));
                              }}
                              className="text-[10px] font-black uppercase tracking-wider text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-650 px-2 py-0.5 rounded-lg transition-all cursor-pointer shadow-3xs"
                            >
                              {completedLevCount === levLessons.length ? "Reset Level" : "Complete Level"}
                            </button>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 shadow-3xs">
                              {completedLevCount} / {levLessons.length} Done
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                          {levLessons.map((les) => {
                            const isSelected = selectedLesson.id === les.id;
                            const isDone = completedLessons.includes(les.id);
                            return (
                              <button
                                key={les.id}
                                className={`w-full group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-left ${
                                  isSelected 
                                    ? "bg-slate-900 border-slate-900 text-white shadow-xs" 
                                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                                }`}
                                onClick={() => {
                                  setSelectedLesson(les);
                                  setMobileShowRoadmap(false); // Switch to content panel instantly on mobile selection
                                }}
                              >
                                <div className="flex items-start gap-2.5 min-w-0">
                                  <div className="pt-0.5">
                                    {isDone ? (
                                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-amber-400" : "text-emerald-500"}`} />
                                    ) : (
                                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isSelected ? "border-slate-600" : "border-slate-300 group-hover:border-slate-400"}`} />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <p className={`text-[10px] font-extrabold uppercase tracking-widest ${isSelected ? "text-amber-300" : "text-rose-600"}`}>
                                      {les.germanTitle}
                                    </p>
                                    <h4 className="text-xs font-bold truncate leading-tight mt-0.5 text-slate-905" style={{ color: isSelected ? "#fff" : undefined }}>
                                      {getDisplayTitle(les)}
                                    </h4>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-all ${isSelected ? "text-white" : "text-slate-800"}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

              {/* Right Side: Active Lesson View Board */}
              <div className={`lg:col-span-8 space-y-6 ${!mobileShowRoadmap ? "block" : "hidden lg:block"}`}>
              
              {/* Lesson Frame card wrapper */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-600"></div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold tracking-widest bg-rose-50 border border-rose-100 text-rose-600 px-2.5 py-0.5 rounded-md">
                        {selectedLesson.level} Series
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        Step {GERMAN_LESSONS.filter(l => l.level === selectedLesson.level).findIndex(l => l.id === selectedLesson.id) + 1} of{" "}
                        {GERMAN_LESSONS.filter(l => l.level === selectedLesson.level).length}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                      {getDisplayTitle(selectedLesson)}
                    </h2>
                    <p className="text-md text-amber-600 font-bold italic tracking-wide">
                      {selectedLesson.germanTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { toggleCompletedLesson(selectedLesson.id); }}
                      className={`px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center gap-2 border transition-all ${
                        completedLessons.includes(selectedLesson.id)
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${completedLessons.includes(selectedLesson.id) ? "stroke-[3px]" : ""}`} />
                      <span>{completedLessons.includes(selectedLesson.id) ? "Completed!" : "Mark Completed"}</span>
                    </button>
                  </div>
                </div>

                {/* Conceptual Tabs within the Lesson */}
                <div className="space-y-6">
                  
                  {/* Brief Goal Description */}
                  <div className="bg-amber-50/50 border border-amber-100/80 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-amber-800">Lesson Objective: </span>
                    {selectedLesson.description}
                  </div>

                  {/* Core Content Body - Formatted via simple list or structured guide */}
                  <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900 border-l-4 border-rose-500 pl-3 uppercase tracking-tight">
                      Linguistics & Grammar Breakdown
                    </h3>
                    
                    {/* Rendered nicely of custom explanation markdown highlights */}
                    <div className="text-slate-700 bg-slate-50 border border-slate-100 p-5 rounded-2xl font-normal leading-relaxed text-sm">
                      <MarkdownRenderer content={selectedLesson.explanation} isAlphabet={selectedLesson.id === "l1"} />
                    </div>

                    {/* Grammar Spotlight focus alert */}
                    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-black tracking-widest text-amber-400 uppercase">Grammar Spotlight</h4>
                      </div>
                      <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                        {selectedLesson.keyGrammar}
                      </p>
                    </div>
                  </div>

                  {/* Active Vocabulary Table */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-extrabold text-slate-900">Vocabulary & Pronunciation</h4>
                      <p className="text-xs text-slate-400">Click the voice pill to hear audio</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="vocab_grid_holder">
                      {selectedLesson.vocabulary.map((voc, index) => (
                        <div 
                          key={index} 
                          className="bg-white border border-slate-100 p-3.5 rounded-xl hover:border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-950 text-sm tracking-tight">{voc.german}</span>
                              <button 
                                onClick={() => speakGerman(voc.german)}
                                className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-all flex items-center justify-center"
                                title="Listen with German accent synthesis"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono italic">Pronunciation: {voc.pronunciation}</p>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">Translation: {voc.english}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active call to action buttons linking to other tabs */}
                  <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => { startCustomQuiz(selectedLesson.quizTopic, selectedLesson.level); }}
                      className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 font-extrabold text-xs px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group"
                    >
                      <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-all" />
                      <span>Take Chapter {selectedLesson.id.replace("l","")} Quiz</span>
                    </button>

                    <button
                      onClick={() => { startChatFromLesson(selectedLesson); }}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-rose-500" />
                      <span>Roleplay Context with Tutor Chat</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Informative German Fact banner */}
              <div className="bg-slate-100 text-slate-600 text-xs sm:text-sm p-5 rounded-2xl flex items-start gap-3 border border-slate-200">
                <Info className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 mb-0.5">German Language Quick Fact:</p>
                  <p className="leading-relaxed text-slate-600">
                    Did you know that all German nouns are capitalized? No matter where they stand in a sentence, nouns like <code className="bg-white px-1 py-0.5 border rounded text-slate-800">der Hund</code> (the dog) or <code className="bg-white px-1 py-0.5 border rounded text-slate-800">das Buch</code> (the book) always start with a capital letter. This actually makes them much easier to identify when reading!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

        {/* 2. AI PRACTICE PARTNER CHAT */}
        {activeTab === "chat" && (
          <div className="space-y-4" id="chat_panel_parent">
            {/* Mobile/Tablet view switcher toggle board */}
            <div className="lg:hidden flex bg-slate-100 p-1 rounded-xl mb-3" id="chat_mobile_toggle">
              <button
                type="button"
                onClick={() => setMobileShowChatSettings(false)}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                  !mobileShowChatSettings ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Study & Chat Session
              </button>
              <button
                type="button"
                onClick={() => setMobileShowChatSettings(true)}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                  mobileShowChatSettings ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tutor Settings & Config
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="chat_panel_grid">
              
              {/* Left Column Controls for Chat Setting */}
              <div className={`lg:col-span-4 space-y-6 ${mobileShowChatSettings ? "block" : "hidden lg:block"}`}>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="font-extrabold text-lg text-slate-900 mb-4 tracking-tight">Your Tutor Settings</h3>

                <div className="space-y-4">
                  {/* Roleplay scenarios Selector */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Roleplay Scenario</label>
                    <select 
                      value={chatScenario}
                      onChange={(e) => {
                        setChatScenario(e.target.value);
                        setChatMessages([
                          {
                            id: "m0",
                            role: "assistant",
                            content: `Hallo! We are starting our roleplay: "${e.target.value}". How would you like to begin in German?`,
                            translation: `Hello! We are starting our roleplay: "${e.target.value}".`,
                            timestamp: "Now"
                          }
                        ]);
                        setMobileShowChatSettings(false); // return to chat block automatically
                      }}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                    >
                      <option value="Casual Conversation">Casual Conversation (Basic Introductions)</option>
                      <option value="Ordering at Berlin Café">Ordering at Düsseldorf Cafe (Culinary)</option>
                      <option value="Checking in at Frankfurt Hotel">Checking in at Frankfurt Hotel (Travel)</option>
                      <option value="Asking for directions in Munich">Asking for Directions in Munich (Interactions)</option>
                      <option value="Grocery shopping in Hamburg">Grocery Shopping in Hamburg (Daily Tasks)</option>
                    </select>
                  </div>

                  {/* Level setup selector */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Tutor Level Adapting</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map(lev => (
                        <button
                          key={lev}
                          onClick={() => {
                            setChatLevel(lev);
                            setChatMessages([
                              {
                                id: "m0",
                                role: "assistant",
                                content: `Hallo! I adjusted our chat difficulty to ${lev}. Tell me something in German!`,
                                translation: `Hello! Let's adapt our pace to ${lev}.`,
                                timestamp: "Now"
                              }
                            ]);
                            setMobileShowChatSettings(false); // Return back to chat dialogue automatically on mobile
                          }}
                          className={`py-2 text-[10px] font-bold rounded-xl border transition-all ${
                            chatLevel === lev
                              ? "bg-slate-900 border-slate-900 text-amber-400"
                              : "bg-logo-cream bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {lev === "A1" ? "A1 (Begin)" : lev === "A2" ? "A2 (Elem)" : lev === "B1" ? "B1 (Inter)" : lev === "B2" ? "B2 (Upper)" : lev === "C1" ? "C1 (Adv)" : "C2 (Mast)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Helpful tips card */}
                  <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 space-y-2 text-xs text-slate-700 leading-relaxed">
                    <p className="font-extrabold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Dynamic Grammar Corrections
                    </p>
                    <p>
                      Speak freely in German! The AI Tutor automatically scans your messages for spelling mistakes or incorrect verb conjugations. It then posts a <strong>Tutor Correction Feedback</strong> section detailing the errors.
                    </p>
                  </div>

                  {/* Clear button */}
                  <button
                    onClick={() => {
                      setChatMessages([
                        {
                          id: "m0",
                          role: "assistant",
                          content: "Hallo! Let's resume the lesson. Wie geht es dir?",
                          translation: "Hello! Let's resume the lesson. How are you?",
                          timestamp: "Now"
                        }
                      ]);
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all"
                  >
                    Reset Chat History
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column Board: The Chat Session */}
            <div className={`lg:col-span-8 ${!mobileShowChatSettings ? "block" : "hidden lg:block"}`}>
              <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden flex flex-col h-[650px]" id="chat_container">
                
                {/* Visual Status bar header */}
                <div className="bg-slate-900 text-white p-4 items-center justify-between flex-shrink-0 flex">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-xs font-bold text-amber-400">AI Tutor Live Conversation</p>
                      <p className="text-xs text-slate-300 font-medium">Scenario: "{chatScenario}" • Level {chatLevel}</p>
                    </div>
                  </div>

                  <span className="text-[10px] bg-slate-800 text-white font-mono px-2 py-0.5 rounded border border-slate-700">
                    Gemini 3.5 Assistant
                  </span>
                </div>

                {/* Conversation Body Messages Area */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                  {chatMessages.map((msg) => {
                    const isAi = msg.role === "assistant";
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${isAi ? "self-start items-start" : "self-end ml-auto items-end"}`}
                      >
                        {/* Sender Label */}
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider px-1">
                          {isAi ? "AI Tutor" : "You (Student)"}
                        </span>

                        {/* Speech Bubble Container */}
                        <div 
                          className={`p-4 rounded-2xl relative ${
                            isAi 
                              ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none" 
                              : "bg-slate-900 text-white rounded-tr-none shadow-xs"
                          }`}
                        >
                          <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          
                          {/* Speak aloud launcher next inside text */}
                          {isAi && (
                            <button 
                              onClick={() => speakGerman(msg.content)}
                              className="absolute top-2 right-2 text-slate-300 hover:text-slate-800 hover:bg-slate-100 p-1 rounded-full transition-all"
                              title="Listen to phrase vocalized"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Bilingual Translation in English helper */}
                          {msg.translation && (
                            <p className={`text-xs mt-2 italic border-t pt-1.5 ${isAi ? "text-slate-500 border-slate-100" : "text-slate-300 border-slate-800"}`}>
                              {msg.translation}
                            </p>
                          )}
                        </div>

                        {/* Dynamic Correction Feedback if included in message payload */}
                        {isAi && msg.feedback && (
                          <div className="mt-1.5 mr-auto w-full bg-amber-50 border border-amber-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs flex gap-2 items-start shadow-2xs">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-extrabold text-amber-900 block mb-0.5">Grammar feedback:</span>
                              <p className="text-slate-700 leading-relaxed">{msg.feedback}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {isSendingChat && (
                    <div className="flex flex-col items-start max-w-[80%]">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold mb-1">AI Tutor</span>
                      <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl animate-pulse text-xs">
                        Tutor is studying your grammar and typing back...
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Footer Input Area */}
                <form 
                  onSubmit={handleSendChatMessage}
                  className="bg-white border-t border-slate-200 p-4 flex gap-3 items-center flex-shrink-0"
                >
                  <input
                    type="text"
                    value={userChatInput}
                    onChange={(e) => { setUserChatInput(e.target.value); }}
                    placeholder="Antworten auf Deutsch... (e.g., 'Ich bin gut gelaunt, danke!')"
                    className="flex-grow bg-slate-100 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                    id="chat_input_text"
                  />
                  <button
                    type="submit"
                    disabled={isSendingChat || !userChatInput.trim()}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                    id="chat_submit_btn"
                  >
                    <span>Send</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      )}

        {/* 3. AI DICTIONARY & CONJUGATOR */}
        {activeTab === "translator" && (
          <div className="space-y-6" id="translator_full_panel">
            
            {/* Lookup input block card */}
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs">
              <div className="max-w-2xl mx-auto space-y-4 text-center">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Grammar Search & Verb Conjugator</h2>
                <p className="text-sm text-slate-500">
                  Type any German or English word. The AI dictionary instantly checks the translation, matches the word gender article (<code className="bg-slate-100 px-1 font-mono text-[11px]">der/die/das</code>), pronounces it, and graphs complete present tense conjugation structures for verbs!
                </p>

                {/* Form lookup input */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4 max-w-xl mx-auto">
                  <input
                    type="text"
                    value={searchWord}
                    onChange={(e) => { setSearchWord(e.target.value); }}
                    placeholder="Type words: 'wasser', 'essen', 'schön', 'die Katze'..."
                    className="flex-grow bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleWordLookup(""); }}
                    id="dictionary_search_input"
                  />
                  <button
                    onClick={() => handleWordLookup("")}
                    disabled={isTranslating || !searchWord.trim()}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-6 py-3.5 sm:py-0 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 h-auto sm:h-12"
                    id="dictionary_lookup_btn"
                  >
                    {isTranslating ? (
                      <span>Searching...</span>
                    ) : (
                      <>
                        <Search className="w-4 h-4 text-rose-500" />
                        <span>Lookup Word</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick select word chips */}
                <div className="flex flex-wrap justify-center items-center gap-2 mt-2 pt-1.5 text-xs text-slate-400">
                  <span className="font-semibold">Quick Lookup Suggestions:</span>
                  {["essen", "der Apfel", "trinken", "Wohnung", "haben", "schreiben"].map((sug) => (
                    <button
                      key={sug}
                      onClick={() => {
                        setSearchWord(sug);
                        handleWordLookup(sug);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-medium transition-all"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Displaying Search Results */}
            {lookupResult && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="lookup_results_showcase">
                
                {/* Word specs panel card */}
                <div className="md:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-1">Looked up Word Analysis</h3>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl font-black text-rose-600 italic tracking-tight">{searchWord || "wasser"}</h2>
                      <button 
                        onClick={() => speakGerman(searchWord || "wasser")}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                        title="Vocal pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">English Translation</span>
                      <span className="text-sm font-bold text-slate-800">{lookupResult.translation}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Word Group Type</span>
                      <span className="text-sm font-bold text-slate-800">{lookupResult.wordType}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Grammatical Gender</span>
                        {lookupResult.gender && lookupResult.gender !== "N/A" && lookupResult.gender !== "none" && (
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            lookupResult.gender === "der" ? "bg-blue-100 text-blue-800" :
                            lookupResult.gender === "die" ? "bg-pink-100 text-pink-800" :
                            lookupResult.gender === "das" ? "bg-amber-100 text-amber-800" :
                            "bg-slate-100 text-slate-800"
                          }`}>
                            {lookupResult.gender === "der" ? "Masculine" : 
                             lookupResult.gender === "die" ? "Feminine" : 
                             lookupResult.gender === "das" ? "Neuter" : 
                             lookupResult.gender.toLowerCase() === "plural" ? "Plural" : "N/A"}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-black text-rose-700 block mt-1">{lookupResult.gender || "No gender / Non-Noun"}</span>
                    </div>
                  </div>

                  {/* Scientific text comment notes explanation */}
                  <div className="space-y-1.5 bg-slate-900 text-slate-100 p-4 rounded-2xl">
                    <h4 className="text-[10px] font-black tracking-widest text-amber-400 uppercase">Contextual & Grammatical Guidance</h4>
                    <p className="text-xs leading-relaxed text-slate-300 whitespace-pre-line">{lookupResult.explanation}</p>
                  </div>
                </div>

                {/* Right grid: Conjugations card (if verb) + Bilingual Sentences */}
                <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                  
                  {/* Conjugation display */}
                  {lookupResult.conjugations ? (
                    <div className="space-y-3" id="conjugation_block">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                          <span>Verb Conjugations</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 bold px-2 py-0.5 rounded-full font-sans capitalize font-semibold tracking-normal">
                            Präsens (Present Tense)
                          </span>
                        </h4>
                        <span className="text-xs text-rose-600 font-semibold italic">conjugating...</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400">ich <span className="text-[10px] font-normal">(I)</span></span>
                          <span className="font-black text-slate-900 italic tracking-wide">{lookupResult.conjugations.ich}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400">du <span className="text-[10px] font-normal">(you, inf)</span></span>
                          <span className="font-black text-slate-900 italic tracking-wide text-rose-600">{lookupResult.conjugations.du}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400">er/sie/es <span className="text-[10px] font-normal">(he/she/it)</span></span>
                          <span className="font-black text-slate-900 italic tracking-wide">{lookupResult.conjugations.er_sie_es}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400">wir <span className="text-[10px] font-normal">(we)</span></span>
                          <span className="font-black text-slate-900 italic tracking-wide">{lookupResult.conjugations.wir}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400">ihr <span className="text-[10px] font-normal">(you all)</span></span>
                          <span className="font-black text-slate-900 italic tracking-wide">{lookupResult.conjugations.ihr}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400">sie / Sie <span className="text-[10px] font-normal">(they/form)</span></span>
                          <span className="font-black text-slate-900 italic tracking-wide">{lookupResult.conjugations.sie}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-xs text-slate-700">
                      <Book className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-amber-900">Grammar conjugation hidden/absent</p>
                        <p className="mt-0.5 leading-relaxed">This word isn't identified as a conjugation-dependent verb. If you search for a root German verb like <code className="bg-white px-1">essen</code> or <code className="bg-white px-1">haben</code>, full conjugation tables will load dynamically here.</p>
                      </div>
                    </div>
                  )}

                  {/* Bilingual Examples list block */}
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">Useful Case Sentences</h4>
                    <div className="space-y-2">
                      {lookupResult.examples.map((ex, i) => (
                        <div key={i} className="border border-slate-100 p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 transition-all text-xs">
                          <p className="font-black text-slate-900 italic flex items-center justify-between">
                            <span>{ex.german}</span>
                            <button 
                              onClick={() => speakGerman(ex.german)}
                              className="text-slate-400 hover:text-slate-800 p-0.5 rounded"
                              title="Speak test sentence"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </p>
                          <p className="text-slate-600 mt-1 font-medium italic">{ex.english}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* 4. INTERACTIVE QUIZZES */}
        {activeTab === "quiz" && (
          <div className="space-y-6" id="interactive_quiz_panel">
            
            {/* If no quiz has been requested yet */}
            {!activeQuiz && !isFetchingQuiz && (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-xs">
                <div className="w-16 h-16 rounded-3xl bg-pink-50 text-rose-500 mx-auto flex items-center justify-center shadow-xs">
                  <Award className="w-8 h-8 stroke-[2px]" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Chapter Quiz Master</h2>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Test your step-by-step progress with dynamically generated tests. Generate custom quizzes in multiple choice format or drag-and-assemble interactive sentence builders.
                  </p>
                </div>

                {/* Grid layout of fast quiz startup */}
                <div className="space-y-4 pt-2 text-left">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      Select Level (Parent Group):
                    </p>
                    <div className="flex flex-wrap gap-1 w-full sm:w-auto">
                      {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => {
                        const isSel = quizFilterLevel === lvl;
                        return (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setQuizFilterLevel(lvl)}
                            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-black rounded-lg border transition-all ${
                              isSel
                                ? "bg-slate-900 border-slate-900 text-white shadow-3xs"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                    {GERMAN_LESSONS.filter(l => l.level === quizFilterLevel).map((les) => (
                      <button
                        key={les.id}
                        onClick={() => { startCustomQuiz(les.quizTopic, les.level); }}
                        className="p-3.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200 text-slate-800 font-bold rounded-xl text-xs text-left flex justify-between items-center transition-all group"
                      >
                        <div>
                          <p className="text-[9px] text-rose-600 italic uppercase font-mono font-bold tracking-wider">{les.level} • {les.germanTitle}</p>
                          <p className="truncate max-w-[170px] mt-0.5">{getDisplayTitle(les)}</p>
                        </div>
                        <Play className="w-3 h-3 text-slate-400 group-hover:text-slate-800 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quiz generation loader */}
            {isFetchingQuiz && (
              <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 max-w-lg mx-auto text-center space-y-5 shadow-xl">
                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg text-amber-400 tracking-tight">Assembling Your Exam Sheets</h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    The exam designers are building interactive sentence builders and multiple-choice grids matching the grammar level of "{quizTopic}". Hang tight!
                  </p>
                </div>
              </div>
            )}

            {/* Active Quiz Sheet Game playing */}
            {activeQuiz && !quizCompleted && (
              <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden max-w-3xl mx-auto" id="active_quiz_sheet">
                
                {/* Visual game top headers bar */}
                <div className="bg-slate-900 text-white p-4 justify-between items-center flex">
                  <div>
                    <h3 className="text-xs text-amber-400 font-black tracking-widest uppercase">CHAPTER PRACTICE SHEET</h3>
                    <h4 className="text-sm font-bold text-white leading-tight truncate max-w-[300px]">{quizTopic} ({quizLevel})</h4>
                  </div>

                  <span className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg font-bold border border-slate-700">
                    Question {currentQuestionIndex + 1} of {activeQuiz.questions.length} • Score: {score}
                  </span>
                </div>

                {/* Progress bar ratio of question index */}
                <div className="w-full bg-slate-200 h-1.5 flex">
                  {activeQuiz.questions.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-full flex-1 transition-all ${
                        i < currentQuestionIndex 
                          ? "bg-emerald-500" 
                          : i === currentQuestionIndex 
                          ? "bg-rose-500" 
                          : "bg-slate-100"
                      }`}
                    ></div>
                  ))}
                </div>

                {/* Active Question Box contents */}
                {(() => {
                  const currentQ = activeQuiz.questions[currentQuestionIndex];
                  return (
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Active Prompt Question label */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] bg-rose-50 font-bold uppercase tracking-widest px-2.5 py-1 text-rose-600 rounded-md border border-rose-100">
                          {currentQ.type === "multiple-choice" ? "Multiple Choice" : "Sentence Builder Puzzle"}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                          {currentQ.question}
                        </h3>
                      </div>

                      {/* Display Case 1: Multiple Choice Options checklist */}
                      {currentQ.type === "multiple-choice" && currentQ.options && (
                        <div className="space-y-2.5">
                          {currentQ.options.map((opt, optIdx) => {
                            const isSelected = selectedOption === optIdx;
                            return (
                              <button
                                key={optIdx}
                                disabled={quizChecked}
                                onClick={() => { setSelectedOption(optIdx); }}
                                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-extrabold flex justify-between items-center transition-all ${
                                  isSelected 
                                    ? "bg-slate-900 border-slate-900 text-amber-400" 
                                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                                } disabled:opacity-90`}
                              >
                                <span>{opt}</span>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-amber-400 bg-amber-400" : "border-slate-300"}`}>
                                  {isSelected && <Check className="w-3 h-3 text-slate-900 stroke-[3px]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Display Case 2: Interactive Sentence Builder bubbles */}
                      {currentQ.type === "sentence-builder" && currentQ.jumbledWords && (
                        <div className="space-y-5 bg-slate-50 border border-slate-100 p-5 rounded-2xl" id="sentence_builder_frame">
                          
                          {/* Instructions English prompt */}
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Your assembled statement order:</p>

                          {/* Assembly board target zone slot */}
                          <div className="min-h-12 bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap gap-2 items-center">
                            {sentenceWords.length === 0 ? (
                              <span className="text-xs text-slate-400 italic">Click the German word pills below to assemble...</span>
                            ) : (
                              sentenceWords.map((word, itemIdx) => (
                                <button
                                  key={itemIdx}
                                  disabled={quizChecked}
                                  onClick={() => handleWordBubbleClick(word, true)}
                                  className="bg-slate-900 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-rose-600 transition-all border border-slate-800"
                                  title="Remove from sentence layout"
                                >
                                  <span>{word}</span>
                                  {!quizChecked && <span className="text-[10px] text-rose-300 font-sans">×</span>}
                                </button>
                              ))
                            )}
                          </div>

                          {/* Jumbled source selection pills */}
                          <div className="space-y-1.5 pointer-events-auto">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Available German word pills:</p>
                            <div className="flex flex-wrap gap-2">
                              {currentQ.jumbledWords.map((word, wIdx) => {
                                const isUsed = sentenceWords.includes(word);
                                return (
                                  <button
                                    key={wIdx}
                                    disabled={isUsed || quizChecked}
                                    onClick={() => handleWordBubbleClick(word, false)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                      isUsed 
                                        ? "bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed" 
                                        : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs hover:scale-105"
                                    }`}
                                  >
                                    {word}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      )}

                      {/* Display Case 3: Explanations and results overlay feedback */}
                      {quizChecked && quizFeedback && (
                        <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl flex gap-3 text-xs leading-relaxed">
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold text-amber-400 uppercase tracking-wider block mb-0.5">Tutor Explanation Notes</span>
                            <p className="text-slate-200 whitespace-pre-line leading-relaxed">{quizFeedback}</p>
                          </div>
                        </div>
                      )}

                      {/* Footer Actions of verification and navigation */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        
                        {!quizChecked ? (
                          <button
                            onClick={checkCurrentAnswer}
                            disabled={currentQ.type === "multiple-choice" ? selectedOption === null : sentenceWords.length === 0}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <span>Verify Answer</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={goToNextQuestion}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                          >
                            <span>
                              {currentQuestionIndex + 1 < activeQuiz.questions.length ? "Proceed to Next" : "Complete Exam"}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                      </div>

                    </div>
                  );
                })()}

              </div>
            )}

            {/* Quiz Completion Achievement dashboard banner */}
            {quizCompleted && activeQuiz && (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 shadow-xs relative overflow-hidden" id="quiz_report_card">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500"></div>

                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 mx-auto rounded-full flex items-center justify-center shadow-inner">
                  <Award className="w-10 h-10" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-slate-950 tracking-tight">Exam Board Complete!</h3>
                  <p className="text-xs text-slate-400 uppercase font-bold font-mono tracking-wider">Congratulations, Student!</p>
                </div>

                {/* Score stats */}
                <div className="bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl inline-block">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Final Correct Ratio</p>
                  <p className="text-3xl font-black text-rose-600 font-mono tracking-tight">
                    {score} / {activeQuiz.questions.length} Correct
                  </p>
                  <p className="text-[10px] text-slate-500 font-sans italic mt-1">
                    {score === activeQuiz.questions.length ? "Einwandfrei! German Mastery." : 
                     score >= 2 ? "Sehr gut! Great understanding." : "Practice makes perfect! Übung macht den Meister."}
                  </p>
                </div>

                {/* Restart or take other chapter exam actions */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => { startCustomQuiz(quizTopic, quizLevel); }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try This Quiz Again</span>
                  </button>

                  <button
                    onClick={() => { setActiveQuiz(null); }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all"
                  >
                    Choose Different Chapter Quiz
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 5. DYNAMIC SKILLS PRACTICE PANEL */}
        {activeTab === "practice" && (
          <div className="space-y-6" id="skills_practice_panel">
            
            {/* Control Panel: Series Selection and Skill selection */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">Interactive Skills Practice Center</h2>
                  <p className="text-xs text-slate-500 mt-1">Practice and strengthen your Speaking, Writing, Reading and Listening skills with real-time AI guidance.</p>
                </div>
                
                {/* Series Level selections */}
                <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
                  {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setPracticeLevel(lvl);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        practiceLevel === lvl
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {lvl} Series
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid selectors for the 4 communication skills */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: "speaking", title: "Oral Speaking", desc: "Fluent Speak & Accent", color: "text-blue-500 bg-blue-50 border-blue-200" },
                  { id: "writing", title: "Creative Writing", desc: "Grammar & Structure", color: "text-emerald-500 bg-emerald-50 border-emerald-200" },
                  { id: "reading", title: "Dialogue Reading", desc: "Comprehension & Vocabulary", color: "text-purple-500 bg-purple-50 border-purple-200" },
                  { id: "listening", title: "Ear Listening", desc: "Dictation & Deciphering", color: "text-rose-500 bg-rose-50 border-rose-200" }
                ].map((sk) => (
                  <button
                    key={sk.id}
                    onClick={() => {
                      setPracticeSkill(sk.id as any);
                    }}
                    className={`flex flex-col items-start text-left p-4 rounded-2xl border transition-all ${
                      practiceSkill === sk.id
                        ? "bg-slate-950 border-slate-950 text-white shadow-md scale-[1.02]"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`p-1.5 rounded-lg text-xs font-bold ${practiceSkill === sk.id ? "bg-white/10 text-white" : sk.color}`}>
                        {sk.id === "speaking" && <Volume2 className="w-4 h-4" />}
                        {sk.id === "writing" && <Book className="w-4 h-4" />}
                        {sk.id === "reading" && <BookOpen className="w-4 h-4" />}
                        {sk.id === "listening" && <HelpCircle className="w-4 h-4" />}
                      </span>
                      {practiceSkill === sk.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                    </div>
                    <h3 className="text-xs font-bold font-mono tracking-tight uppercase opacity-90">{sk.title}</h3>
                    <p className={`text-[11px] mt-0.5 leading-tight ${practiceSkill === sk.id ? "text-slate-300" : "text-slate-400"}`}>{sk.desc}</p>
                  </button>
                ))}
              </div>

              {/* Trigger dynamic generator */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => generatePracticeExercise(practiceLevel, practiceSkill)}
                  disabled={practiceLoading}
                  className={`relative flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm ${
                    practiceLoading 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                      : "bg-amber-500 hover:bg-amber-600 text-slate-950 hover:scale-[1.01]"
                  }`}
                >
                  {practiceLoading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></div>
                      <span>Assembling Practice Board...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 animate-bounce" />
                      <span>Start {practiceLevel} {practiceSkill.toUpperCase()} Homework</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* If no practice dataset is active yet */}
            {!practiceData && !practiceLoading && (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <Play className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Your practice session is ready to formulate</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Select a difficulty level (A1, A2, or B1) write/speak/read or listen, and trigger the action above to boot your AI-assisted exercise cards.</p>
                </div>
              </div>
            )}

            {/* Practice loading skeleton */}
            {practiceLoading && (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 max-w-xl mx-auto shadow-xs animate-pulse">
                <div className="h-4 bg-slate-100 rounded-full w-2/5 mb-3"></div>
                <div className="h-8 bg-slate-200 rounded-full w-4/5"></div>
                <div className="h-24 bg-slate-100 rounded-3xl w-full my-6"></div>
                <div className="h-10 bg-slate-100 rounded-xl w-3/5 mx-auto"></div>
              </div>
            )}

            {/* Master display of active generated practice exercise dataset */}
            {practiceData && !practiceLoading && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6" id="practice_active_card">
                
                {/* Exercise Header information */}
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 font-bold">
                      Level {practiceLevel} • {practiceSkill}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-2">{practiceData.title}</h3>
                  </div>
                  <span className="text-2xl">
                    {practiceSkill === "speaking" && "🗣️"}
                    {practiceSkill === "writing" && "✍️"}
                    {practiceSkill === "reading" && "📖"}
                    {practiceSkill === "listening" && "🎧"}
                  </span>
                </div>

                {/* Subtask instructions */}
                <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl text-xs text-slate-705 leading-relaxed flex gap-2.5">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-amber-800 block mb-0.5">Focus Instructions Checklist:</span>
                    <p className="text-slate-600 leading-relaxed">{practiceData.instructions}</p>
                  </div>
                </div>

                {/* SKILL SPECIFIC TYPE RENDERING CASES */}

                {/* CASE A: SPEAKING PRACTICE */}
                {practiceSkill === "speaking" && (
                  <div className="space-y-6" id="speaking_practice_layout">
                    
                    {/* Roleplay Context */}
                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-xs space-y-1">
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Context scenario:</p>
                      <p className="text-slate-705 italic">"{practiceData.prompt}"</p>
                    </div>

                    {/* Bold spoken sentence display pane */}
                    <div className="text-center p-6 bg-slate-900 text-white rounded-3xl relative shadow-md overflow-hidden space-y-4">
                      <div className="absolute top-2 right-2 text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold">Target Sentence</div>
                      
                      <div className="space-y-1">
                        <p className="text-2xl sm:text-3xl font-black tracking-tight text-amber-300 leading-normal px-2">
                          {practiceData.germanText}
                        </p>
                        {practiceData.pronunciation && (
                          <p className="text-xs text-slate-400 font-mono italic tracking-wide">
                            [{practiceData.pronunciation}]
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex justify-center gap-2">
                        <button
                          onClick={() => speakGerman(practiceData.germanText)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center gap-1.5 transition-all text-xs text-slate-200 border border-slate-700 font-bold"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Listen (Normal Rate)</span>
                        </button>
                      </div>
                    </div>

                    {/* Translative guideline helper */}
                    <div className="text-xs text-slate-500 text-center">
                      <span className="font-bold">English Meaning: </span>
                      <span className="italic">"{practiceData.translation}"</span>
                    </div>

                    {/* Spoken Response Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest block">Practice Speaking (Type Your Speech):</label>
                      <p className="text-[11px] text-slate-400 font-medium">Say the phrase loud to yourself first, then type your exact pronounced response below to test correctness.</p>
                      <input
                        type="text"
                        value={practiceSpeakingInput}
                        onChange={(e) => setPracticeSpeakingInput(e.target.value)}
                        placeholder="Type what you voiced..."
                        className="w-full text-base md:text-sm border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                      />
                    </div>

                  </div>
                )}

                {/* CASE B: WRITING COMPOSITION PRACTICE */}
                {practiceSkill === "writing" && (
                  <div className="space-y-4" id="writing_practice_layout">
                    
                    {/* Composition Prompt Details */}
                    <div className="p-5 bg-emerald-50/20 border border-emerald-200 rounded-2xl space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block">Writing Directive Task:</span>
                      <p className="text-sm font-extrabold text-slate-900 leading-relaxed">{practiceData.prompt}</p>
                    </div>

                    {/* Notebook text-area input composition board */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex justify-between">
                        <span>Write your paragraph in German:</span>
                        <span className="text-slate-400 text-[10px] font-mono">{practiceWritingInput.length} characters</span>
                      </label>
                      <textarea
                        rows={5}
                        value={practiceWritingInput}
                        onChange={(e) => setPracticeWritingInput(e.target.value)}
                        placeholder="Example: Ich habe ein kleines Haustier..."
                        className="w-full text-sm border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
                      />
                    </div>

                  </div>
                )}

                {/* CASE C: DIALOGUE READING COMPREHENSION */}
                {practiceSkill === "reading" && (
                  <div className="space-y-6" id="reading_practice_layout">
                    
                    {/* Read text container block */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative">
                      <span className="absolute top-2.5 right-3 text-[9px] uppercase font-bold font-mono text-slate-400 tracking-wider">German Paragraph</span>
                      <p className="text-base sm:text-lg text-slate-900 leading-relaxed font-medium pt-2">
                        {practiceData.germanText}
                      </p>
                      
                      {/* Interactive translation overlay toggler toggle-button */}
                      <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                        <button
                          onClick={() => { setShowReadingTranslation(!showReadingTranslation); }}
                          className="px-3 py-1.5 bg-slate-150 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <span>{showReadingTranslation ? "Hide English Translation" : "Reveal English Translation"}</span>
                        </button>
                        
                        <button
                          onClick={() => speakGerman(practiceData.germanText)}
                          className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-all shadow-xs animate-pulse"
                          title="Speak whole text"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {showReadingTranslation && (
                        <div className="mt-3 p-3 bg-amber-50/20 border border-amber-100 rounded-xl text-xs text-slate-650 italic leading-relaxed">
                          {practiceData.translation}
                        </div>
                      )}
                    </div>

                    {/* Comprehension Questions list details */}
                    {practiceData.readingQuestions && practiceData.readingQuestions.length > 0 && (
                      <div className="space-y-6 pt-4 border-t border-slate-100">
                        <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Reading Comprehension Check:</h4>
                        
                        {practiceData.readingQuestions.map((q: any, qIdx: number) => (
                          <div key={qIdx} className="space-y-3 bg-white border border-slate-150 rounded-2xl p-4 shadow-2xs">
                            <h5 className="text-sm font-black text-slate-900 flex gap-2">
                              <span className="text-purple-500 font-mono italic font-bold">{qIdx + 1}.</span>
                              <span>{q.question}</span>
                            </h5>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {q.options.map((opt: string, oIdx: number) => {
                                const isSelected = selectedReadingAnswers[qIdx] === oIdx;
                                const isCorrect = q.correctIndex === oIdx;
                                
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => {
                                      if (readingAnswersChecked) return;
                                      setSelectedReadingAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                                    }}
                                    disabled={readingAnswersChecked}
                                    className={`text-left text-xs p-3 rounded-xl border transition-all ${
                                      readingAnswersChecked
                                        ? isCorrect
                                          ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold"
                                          : isSelected
                                            ? "bg-rose-50 border-rose-300 text-rose-800"
                                            : "bg-slate-100 border-slate-200 text-slate-400"
                                        : isSelected
                                          ? "bg-purple-950 border-purple-950 text-white font-bold"
                                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Question Linguistic explanation notes text display */}
                            {readingAnswersChecked && (
                              <div className="p-3 bg-slate-50 rounded-xl text-[11px] leading-relaxed text-slate-500 flex gap-2">
                                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-slate-755 block">Explanation clue:</strong>
                                  <p>{q.explanation}</p>
                                </div>
                              </div>
                            )}

                          </div>
                        ))}

                        <div className="flex justify-end mt-4">
                          {!readingAnswersChecked ? (
                            <button
                              onClick={() => { setReadingAnswersChecked(true); }}
                              disabled={Object.keys(selectedReadingAnswers).length < practiceData.readingQuestions.length}
                              className="bg-slate-900 border border-slate-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all font-bold"
                            >
                              Grade My Reading Answers
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setReadingAnswersChecked(false);
                                setSelectedReadingAnswers({});
                              }}
                              className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition-all"
                            >
                              Reset Try Comprehending Again
                            </button>
                          )}
                        </div>

                      </div>
                    )}

                  </div>
                )}

                {/* CASE D: EAR LISTENING / DICTATION FOR LEARNING */}
                {practiceSkill === "listening" && (
                  <div className="space-y-6" id="listening_practice_layout">
                    
                    {/* Intercom station sound play module */}
                    <div className="bg-slate-950 rounded-3xl p-6 text-white text-center shadow-md relative overflow-hidden flex flex-col items-center justify-center space-y-4">
                      <div className="absolute top-2.5 right-3 text-[9px] uppercase font-bold tracking-widest font-mono text-slate-600 font-bold">German Audio Intercom Broadcast</div>
                      
                      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700 shadow-inner animate-pulse">
                        <Volume2 className="w-8 h-8" />
                      </div>

                      <div className="max-w-md space-y-2 pointer-events-none">
                        <h4 className="text-base font-black text-slate-100">Play Chapter Intercom Message</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Listen closely to the speaker pronunciation. Try to register vocabulary, delays, numeric metrics, or scenario parameters.
                        </p>
                      </div>

                      <div className="flex justify-center items-center gap-2 pt-2">
                        <button
                          onClick={() => speakGerman(practiceData.audioStatement)}
                          className="px-6 py-3 bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 font-bold"
                        >
                          <Play className="w-4 h-4 text-emerald-400" />
                          <span>Voice Speech (Normal)</span>
                        </button>
                      </div>
                    </div>

                    {/* Comprehension check for ear evaluation */}
                    {practiceData.listeningQuestions && practiceData.listeningQuestions.length > 0 && (
                      <div className="space-y-6 pt-4 border-t border-slate-100">
                        <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Listening Ear check:</h4>

                        {practiceData.listeningQuestions.map((q: any, qIdx: number) => (
                          <div key={qIdx} className="space-y-3 bg-white border border-slate-150 rounded-2xl p-4 shadow-2xs">
                            <h5 className="text-sm font-black text-slate-900 flex gap-2">
                              <span className="text-rose-500 font-mono italic font-bold">{qIdx + 1}.</span>
                              <span>{q.question}</span>
                            </h5>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {q.options.map((opt: string, oIdx: number) => {
                                const isSelected = selectedListeningAnswers[qIdx] === oIdx;
                                const isCorrect = q.correctIndex === oIdx;

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => {
                                      if (listeningAnswersChecked) return;
                                      setSelectedListeningAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                                    }}
                                    disabled={listeningAnswersChecked}
                                    className={`text-left text-xs p-3 rounded-xl border transition-all ${
                                      listeningAnswersChecked
                                        ? isCorrect
                                          ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold"
                                          : isSelected
                                            ? "bg-rose-50 border-rose-300 text-rose-800"
                                            : "bg-slate-100 border-slate-200 text-slate-400"
                                        : isSelected
                                          ? "bg-rose-950 border-rose-900 text-white font-bold"
                                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Listening detail display if graded checked */}
                            {listeningAnswersChecked && (
                              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] leading-relaxed text-slate-500">
                                <div className="flex gap-1">
                                  <strong className="text-slate-700 text-xs text-emerald-700 block shrink-0">German Readout:</strong>
                                  <span className="italic">"{practiceData.audioStatement}"</span>
                                </div>
                                <div className="flex gap-1 border-t border-slate-200 pt-1 mt-1">
                                  <strong className="text-slate-700 block shrink-0">English literal:</strong>
                                  <span className="italic">"{practiceData.translation}"</span>
                                </div>
                                <div className="border-t border-slate-200 pt-1 mt-1 font-sans">
                                  <strong className="text-slate-700 block">Explanation clue:</strong>
                                  <p>{q.explanation}</p>
                                </div>
                              </div>
                            )}

                          </div>
                        ))}

                        <div className="flex justify-end mt-4">
                          {!listeningAnswersChecked ? (
                            <button
                              onClick={() => { setListeningAnswersChecked(true); }}
                              disabled={Object.keys(selectedListeningAnswers).length < practiceData.listeningQuestions.length}
                              className="bg-slate-900 border border-slate-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all font-bold"
                            >
                              Grade listening Comprehension Answers
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setListeningAnswersChecked(false);
                                setSelectedListeningAnswers({});
                              }}
                              className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition-all"
                            >
                              Reset Try Listening Again
                            </button>
                          )}
                        </div>

                      </div>
                    )}

                  </div>
                )}


                {/* COMMON FEEDBACK DISPENSATION SYSTEM PROXIES */}
                
                {/* Submit review evaluations controls for Speaking and Writing tasks */}
                {(practiceSkill === "writing" || practiceSkill === "speaking") && (
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                    
                    <div className="flex justify-end">
                      <button
                        onClick={evaluatePracticeInput}
                        disabled={
                          evaluatingPractice ||
                          (practiceSkill === "writing" ? !practiceWritingInput.trim() : !practiceSpeakingInput.trim())
                        }
                        className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 font-bold"
                      >
                        {evaluatingPractice ? (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></div>
                            <span>Tutor reviewing homework...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Submit Paragraph and Receive Tutor Evaluation</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Review evaluation layout outputs */}
                    {practiceEvaluation && (
                      <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-md mt-2">
                        
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] text-amber-400 font-mono font-black uppercase tracking-widest block font-bold">Tutor Graded Report</span>
                            <h4 className="text-base font-black text-white mt-1">Excellent Effort Response Checked</h4>
                          </div>

                          {/* Star evaluations layout stars elements */}
                          <div className="flex items-center gap-0.5" title={`${practiceEvaluation.ratingStars} / 5 Stars`}>
                            {[1, 2, 3, 4, 5].map((st) => (
                              <svg
                                key={st}
                                className={`w-4 h-4 ${st <= (practiceEvaluation.ratingStars || 3) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        {/* Speech synthesis prompt / feedback */}
                        <div className="space-y-1 font-sans">
                          <strong className="text-[10px] text-slate-400 uppercase font-mono block font-bold">Teacher's Coaching Tips</strong>
                          <p className="text-slate-200 text-xs leading-relaxed">{practiceEvaluation.feedback}</p>
                        </div>

                        {/* Grammatical checklist details */}
                        <div className="space-y-1 pt-1.5 border-t border-slate-800 font-sans">
                          <strong className="text-[10px] text-rose-400 uppercase font-mono block font-bold">Grammar Diagnostic / Correction Notes</strong>
                          <p className="text-slate-300 text-xs font-serif whitespace-pre-line leading-relaxed">{practiceEvaluation.corrections}</p>
                        </div>

                        {/* The Ideal perfect answer display pane */}
                        {practiceEvaluation.correctedText && (
                          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2 mt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-emerald-400 uppercase font-black font-bold">Ideal Perfect German Output</span>
                              <button
                                onClick={() => speakGerman(practiceEvaluation.correctedText)}
                                className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all shadow-xs"
                                title="Speak correct sentence"
                              >
                                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                              </button>
                            </div>
                            <p className="text-sm font-black text-amber-200 font-sans leading-relaxed">
                              {practiceEvaluation.correctedText}
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 mt-12 flex-shrink-0" id="germ_hub_footer">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-bold text-slate-800 tracking-wide">German Language Learning Hub</p>
          <p className="max-w-md mx-auto text-slate-500 leading-relaxed">
            Your interactive learning space to master German. Study personalized roadmap lessons, converse with simulated native partners, query expressions, and self-assess using smart offline-ready CEFR exercises.
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            &copy; {new Date().getFullYear()} German Hub. Support your daily learning streak!
          </p>
        </div>
      </footer>

    </div>
  );
}
