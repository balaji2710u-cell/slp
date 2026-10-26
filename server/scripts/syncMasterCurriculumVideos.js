import fs from "fs";
import path from "path";

const masterPath = path.resolve("curriculum/masterCurriculum.js");
let content = fs.readFileSync(masterPath, "utf8");

// Define verified video mappings matching actual blueprint slugs
const NEW_CURRICULUM_VIDEOS = `// Comprehensive verified educational video sessions mapping across all curriculum tracks
const CURRICULUM_VIDEOS = {
  // --- Group A (Standards 6–8) ---
  "abacus-mental-arithmetic": [
    "https://www.youtube-nocookie.com/embed/d6uG-VHXvxw",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/d6uG-VHXvxw",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU"
  ],
  "basic-english-communication": [
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E"
  ],
  "english-grammar-vocabulary": [
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY"
  ],
  "reading-comprehension-writing": [
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY"
  ],
  "tamil-language-communication": [
    "https://www.youtube-nocookie.com/embed/FgW4yAkBs3k",
    "https://www.youtube-nocookie.com/embed/-1ntOyQcIX0",
    "https://www.youtube-nocookie.com/embed/frSy8ESfIg0",
    "https://www.youtube-nocookie.com/embed/bhF5iR1rufo",
    "https://www.youtube-nocookie.com/embed/qNnR3I-FET8"
  ],
  "mathematics-fundamentals": [
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
    "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28"
  ],
  "fractions-decimals-percentages": [
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ"
  ],
  "intro-algebra-geometry": [
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU"
  ],
  "general-science": [
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/QnQe0xW_JY4",
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI",
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8"
  ],
  "physics-everyday-life": [
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/1kUE0BZtTRc",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8"
  ],
  "biology-human-body": [
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ"
  ],
  "environmental-science": [
    "https://www.youtube-nocookie.com/embed/oJAbATJCugs",
    "https://www.youtube-nocookie.com/embed/oJAbATJCugs",
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/oJAbATJCugs",
    "https://www.youtube-nocookie.com/embed/oJAbATJCugs"
  ],
  "computer-fundamentals": [
    "https://www.youtube-nocookie.com/embed/O5nskjZ_GoI",
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q",
    "https://www.youtube-nocookie.com/embed/O5nskjZ_GoI",
    "https://www.youtube-nocookie.com/embed/vBURTt97EkA",
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q"
  ],
  "digital-literacy-internet-safety": [
    "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA"
  ],
  "intro-coding-scratch": [
    "https://www.youtube-nocookie.com/embed/zOa5o9Yq_ZU",
    "https://www.youtube-nocookie.com/embed/xD3DWFAo31U",
    "https://www.youtube-nocookie.com/embed/VgGTF3cI2Kg",
    "https://www.youtube-nocookie.com/embed/x14G4DCk4nY",
    "https://www.youtube-nocookie.com/embed/xuBWVj9NmEg"
  ],
  "logical-reasoning-problem-solving": [
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA"
  ],
  "financial-literacy-money": [
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ"
  ],
  "study-skills-learning-techniques": [
    "https://www.youtube-nocookie.com/embed/z1BvrkPF2LE",
    "https://www.youtube-nocookie.com/embed/4AiXfFTkMNQ",
    "https://www.youtube-nocookie.com/embed/SZbdK9e9bxs",
    "https://www.youtube-nocookie.com/embed/cVf38y07cfk",
    "https://www.youtube-nocookie.com/embed/mLhwdITTrfE"
  ],

  // --- Group B (Standards 7–10) ---
  "advanced-math-algebra": [
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU"
  ],
  "geometry-mensuration-trigonometry": [
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU"
  ],
  "statistics-probability": [
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/uhxtUt_-GyM",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/uhxtUt_-GyM",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28"
  ],
  "physics-motion-force-energy": [
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/1kUE0BZtTRc",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8"
  ],
  "chemistry-atoms-reactions": [
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI",
    "https://www.youtube-nocookie.com/embed/QnQe0xW_JY4",
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI",
    "https://www.youtube-nocookie.com/embed/QnQe0xW_JY4",
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI"
  ],
  "biology-cells-genetics-systems": [
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk"
  ],
  "advanced-english-communication": [
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E"
  ],
  "academic-writing-public-speaking": [
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E"
  ],
  "python-programming-fundamentals": [
    "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
    "https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc",
    "https://www.youtube-nocookie.com/embed/9Os0o3wzS_I",
    "https://www.youtube-nocookie.com/embed/W8KRzm-HUcc",
    "https://www.youtube-nocookie.com/embed/JeznW_7DlB0"
  ],
  "object-oriented-programming": [
    "https://www.youtube-nocookie.com/embed/pTB0EiLXUC8",
    "https://www.youtube-nocookie.com/embed/JeznW_7DlB0",
    "https://www.youtube-nocookie.com/embed/pTB0EiLXUC8",
    "https://www.youtube-nocookie.com/embed/JeznW_7DlB0",
    "https://www.youtube-nocookie.com/embed/pTB0EiLXUC8"
  ],
  "html-css-javascript": [
    "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg",
    "https://www.youtube-nocookie.com/embed/1Rs2ND1ryYc",
    "https://www.youtube-nocookie.com/embed/W6NZfCO5SIk",
    "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg",
    "https://www.youtube-nocookie.com/embed/W6NZfCO5SIk"
  ],
  "web-development-projects": [
    "https://www.youtube-nocookie.com/embed/mU6anWqZJcc",
    "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg",
    "https://www.youtube-nocookie.com/embed/mU6anWqZJcc",
    "https://www.youtube-nocookie.com/embed/W6NZfCO5SIk",
    "https://www.youtube-nocookie.com/embed/mU6anWqZJcc"
  ],
  "dsa-algorithmic-thinking": [
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0"
  ],
  "advanced-logical-reasoning": [
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA"
  ],
  "robotics-electronics-fundamentals": [
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q",
    "https://www.youtube-nocookie.com/embed/O5nskjZ_GoI",
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q",
    "https://www.youtube-nocookie.com/embed/O5nskjZ_GoI",
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q"
  ],
  "ai-fundamentals": [
    "https://www.youtube-nocookie.com/embed/JMUxmLyrhSk",
    "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    "https://www.youtube-nocookie.com/embed/i_LwzRVP7bg",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM",
    "https://www.youtube-nocookie.com/embed/JMUxmLyrhSk"
  ],
  "cybersecurity-digital-safety": [
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA"
  ],
  "financial-math-data-interpretation": [
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28"
  ],

  // --- Group C (After Standard 12 and Above) ---
  "python-professional-programming": [
    "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
    "https://www.youtube-nocookie.com/embed/JeznW_7DlB0",
    "https://www.youtube-nocookie.com/embed/W8KRzm-HUcc",
    "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
    "https://www.youtube-nocookie.com/embed/JeznW_7DlB0"
  ],
  "java-oop-design": [
    "https://www.youtube-nocookie.com/embed/A74TOX803D0",
    "https://www.youtube-nocookie.com/embed/A74TOX803D0",
    "https://www.youtube-nocookie.com/embed/pTB0EiLXUC8",
    "https://www.youtube-nocookie.com/embed/A74TOX803D0",
    "https://www.youtube-nocookie.com/embed/A74TOX803D0"
  ],
  "data-structures-algorithms": [
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0"
  ],
  "advanced-problem-solving-interviews": [
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA"
  ],
  "fullstack-web-development": [
    "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg",
    "https://www.youtube-nocookie.com/embed/W6NZfCO5SIk",
    "https://www.youtube-nocookie.com/embed/Oe421EPjeBE",
    "https://www.youtube-nocookie.com/embed/ENrzD9HAZK4",
    "https://www.youtube-nocookie.com/embed/mU6anWqZJcc"
  ],
  "react-frontend-development": [
    "https://www.youtube-nocookie.com/embed/w7ejDZ8SWv8",
    "https://www.youtube-nocookie.com/embed/w7ejDZ8SWv8",
    "https://www.youtube-nocookie.com/embed/bMknfKXIFA8",
    "https://www.youtube-nocookie.com/embed/w7ejDZ8SWv8",
    "https://www.youtube-nocookie.com/embed/bMknfKXIFA8"
  ],
  "nodejs-backend-api": [
    "https://www.youtube-nocookie.com/embed/Oe421EPjeBE",
    "https://www.youtube-nocookie.com/embed/ENrzD9HAZK4",
    "https://www.youtube-nocookie.com/embed/Oe421EPjeBE",
    "https://www.youtube-nocookie.com/embed/ENrzD9HAZK4",
    "https://www.youtube-nocookie.com/embed/Oe421EPjeBE"
  ],
  "database-design-sql": [
    "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
    "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
    "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
    "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY",
    "https://www.youtube-nocookie.com/embed/HXV3zeQKqGY"
  ],
  "mongodb-nosql-development": [
    "https://www.youtube-nocookie.com/embed/ofme2o29ngU",
    "https://www.youtube-nocookie.com/embed/ofme2o29ngU",
    "https://www.youtube-nocookie.com/embed/ofme2o29ngU",
    "https://www.youtube-nocookie.com/embed/ofme2o29ngU",
    "https://www.youtube-nocookie.com/embed/ofme2o29ngU"
  ],
  "git-github-collaboration": [
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk",
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk",
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk",
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk",
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk"
  ],
  "software-engineering-testing": [
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/RGOj5yH7evk",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0"
  ],
  "computer-networks-architecture": [
    "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
    "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA"
  ],
  "operating-systems-fundamentals": [
    "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
    "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
    "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
    "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
    "https://www.youtube-nocookie.com/embed/26QPDBe-NB8"
  ],
  "artificial-intelligence-concepts": [
    "https://www.youtube-nocookie.com/embed/JMUxmLyrhSk",
    "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    "https://www.youtube-nocookie.com/embed/i_LwzRVP7bg",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM",
    "https://www.youtube-nocookie.com/embed/JMUxmLyrhSk"
  ],
  "generative-ai-llms": [
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM",
    "https://www.youtube-nocookie.com/embed/zjkBMFhNj_g",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM",
    "https://www.youtube-nocookie.com/embed/kCc8FmEb1nY",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM"
  ],
  "prompt-engineering-productivity": [
    "https://www.youtube-nocookie.com/embed/zjkBMFhNj_g",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM",
    "https://www.youtube-nocookie.com/embed/zjkBMFhNj_g",
    "https://www.youtube-nocookie.com/embed/kCc8FmEb1nY",
    "https://www.youtube-nocookie.com/embed/zjkBMFhNj_g"
  ],
  "machine-learning-fundamentals": [
    "https://www.youtube-nocookie.com/embed/i_LwzRVP7bg",
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8",
    "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    "https://www.youtube-nocookie.com/embed/i_LwzRVP7bg",
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8"
  ],
  "deep-learning-neural-networks": [
    "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    "https://www.youtube-nocookie.com/embed/IHZwWFHWa-w",
    "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    "https://www.youtube-nocookie.com/embed/IHZwWFHWa-w",
    "https://www.youtube-nocookie.com/embed/aircAruvnKk"
  ],
  "data-analysis-python": [
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8",
    "https://www.youtube-nocookie.com/embed/ua-CiDNNj30",
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8",
    "https://www.youtube-nocookie.com/embed/ua-CiDNNj30",
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8"
  ],
  "data-science-visualization": [
    "https://www.youtube-nocookie.com/embed/ua-CiDNNj30",
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8",
    "https://www.youtube-nocookie.com/embed/ua-CiDNNj30",
    "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8",
    "https://www.youtube-nocookie.com/embed/ua-CiDNNj30"
  ],
  "cloud-computing-aws": [
    "https://www.youtube-nocookie.com/embed/k1RI5locZE4",
    "https://www.youtube-nocookie.com/embed/k1RI5locZE4",
    "https://www.youtube-nocookie.com/embed/k1RI5locZE4",
    "https://www.youtube-nocookie.com/embed/k1RI5locZE4",
    "https://www.youtube-nocookie.com/embed/k1RI5locZE4"
  ],
  "devops-docker-cicd": [
    "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo",
    "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo",
    "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo",
    "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo",
    "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo"
  ],
  "cybersecurity-ethical-hacking": [
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA"
  ],
  "building-ai-applications": [
    "https://www.youtube-nocookie.com/embed/kCc8FmEb1nY",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM",
    "https://www.youtube-nocookie.com/embed/zjkBMFhNj_g",
    "https://www.youtube-nocookie.com/embed/kCc8FmEb1nY",
    "https://www.youtube-nocookie.com/embed/jC4v5AS4RIM"
  ]
};`;

const NEW_GET_VIDEO = `function getVideoForLesson(slug, lessonIndex) {
  const list = CURRICULUM_VIDEOS[slug];
  if (list && list[lessonIndex]) {
    return { url: list[lessonIndex], type: "youtube" };
  }
  // Safe education fallback: do NOT substitute an unrelated video.
  // Returning empty URL causes the client learning page to display "Video Coming Soon"
  // while preserving full lesson notes, worked examples, and checkpoint quizzes.
  return { url: "", type: "none" };
}`;

// Replace the CURRICULUM_VIDEOS and DEFAULT_VIDEOS + getVideoForLesson
const regex = /\/\/ Comprehensive verified educational video sessions mapping across all curriculum tracks[\s\S]*?function getVideoForLesson\(slug, lessonIndex\) \{[\s\S]*?return \{ url: fallback, type: "youtube" \};\s*\}/;

if (!regex.test(content)) {
  console.error("Pattern not found in masterCurriculum.js");
  process.exit(1);
}

const updated = content.replace(regex, `${NEW_CURRICULUM_VIDEOS}\n\n${NEW_GET_VIDEO}`);
fs.writeFileSync(masterPath, updated, "utf8");
console.log("Successfully updated masterCurriculum.js with verified curriculum videos and safe fallback!");
