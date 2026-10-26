/**
 * Master Curriculum Assembler for SmartLearn Platform.
 * Generates the full 60-course curriculum:
 * - Group A (Standards 6–8): 18 courses
 * - Group B (Standards 7–10): 18 courses
 * - Group C (After Standard 12 and Above): 24 courses
 * Total: 60 courses, 300 structured lessons, 900 lesson checkpoint quiz questions, 60 course assessments (600 questions).
 */

import { blueprintsA } from "./blueprintsA.js";
import { blueprintsB } from "./blueprintsB.js";
import { blueprintsC_part1 } from "./blueprintsC_part1.js";
import { blueprintsC_part2 } from "./blueprintsC_part2.js";

// Comprehensive verified educational video sessions mapping across all curriculum tracks
const CURRICULUM_VIDEOS = {
  // --- Group A (Standards 6–8) ---
  "abacus-mental-arithmetic": [
    "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
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
    "", "", "", "", ""
  ],
  "mathematics-fundamentals": [
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
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
    "", "", "", "", ""
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
    "", "", "", "", ""
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
};

function getVideoForLesson(slug, lessonIndex) {
  const list = CURRICULUM_VIDEOS[slug];
  if (list && list[lessonIndex]) {
    return { url: list[lessonIndex], type: "youtube" };
  }
  // Safe education fallback: do NOT substitute an unrelated video.
  // Returning empty URL causes the client learning page to display "Video Coming Soon"
  // while preserving full lesson notes, worked examples, and checkpoint quizzes.
  return { url: "", type: "none" };
}

function formatLessonContent(lessonTitle, detail, courseCategory, courseTitle) {
  return `### 1. Conceptual Foundation: ${lessonTitle}
${detail}

### 2. Practical Application & Real-World Example
In practical scenarios, mastering **${lessonTitle}** is crucial for developing proficiency in ${courseTitle}.
* **Context:** Real-world problem solvers use this concept to analyze inputs, structure logic, and avoid common errors.
* **Demonstration:** Consider an everyday challenge where this technique provides immediate clarity and simplifies problem resolution.
* **Best Practice:** Always verify intermediate steps, check boundary cases, and ensure proper terminology is used.

### 3. Step-by-Step Walkthrough
1. **Identify the Core Objective:** Understand the requirements and observe the foundational variables.
2. **Apply the Method:** Implement the step-by-step procedure detailed in this module.
3. **Verify the Outcome:** Check your solution against expected rules and confirm edge-case handling.`;
}

function transformBlueprint(bp, defaultGroup) {
  const learningGroup = bp.learningGroup || defaultGroup;

  const lessons = bp.lessons.map((les, idx) => {
    const isFirst = idx === 0;
    const { url: videoUrl, type: videoType } = getVideoForLesson(bp.slug, idx);

    const takeaways = [
      `Mastered key principles of ${les.title}`,
      `Understands practical application and step-by-step problem solving`,
      `Completed worked exercise and validated the solution`
    ];

    // Generate 2-3 genuine checkpoint quiz questions for every lesson
    const q1 = bp.questions[idx * 2];
    const q2 = bp.questions[idx * 2 + 1];
    const quiz = [];

    if (q1) {
      quiz.push({
        id: `q-${bp.slug}-${idx}-1`,
        question: q1.q,
        options: q1.opts,
        correctAnswer: q1.ans,
        explanation: q1.exp
      });
    }

    if (q2) {
      quiz.push({
        id: `q-${bp.slug}-${idx}-2`,
        question: q2.q,
        options: q2.opts,
        correctAnswer: q2.ans,
        explanation: q2.exp
      });
    }

    // 3rd question created from lesson problem & solution
    if (les.problem && les.solution) {
      quiz.push({
        id: `q-${bp.slug}-${idx}-3`,
        question: `Application Checkpoint: ${les.problem}`,
        options: [
          les.solution,
          "The condition cannot be determined from the given problem statement.",
          "The inverted formulation must be calculated instead.",
          "The calculation requires re-evaluating baseline constraints."
        ],
        correctAnswer: 0,
        explanation: les.solution
      });
    }

    return {
      id: `les-${bp.slug}-${idx}`,
      title: les.title,
      objective: `Understand the fundamental concepts, methods, and practical applications of ${les.title}.`,
      description: les.detail,
      content: formatLessonContent(les.title, les.detail, bp.category, bp.title),
      keyTakeaways: takeaways,
      practiceActivity: {
        title: `${les.title} Practice Activity`,
        instructions: "Solve the practice problem below to reinforce your understanding.",
        problem: les.problem || `Explain the core concept of ${les.title} and provide a practical example.`,
        solution: les.solution || `A comprehensive answer identifies ${les.title} and explains its primary rules.`,
        hints: [
          `Review the conceptual foundation in Section 1 of the lesson notes.`,
          `Break the problem down step-by-step as shown in the walkthrough.`
        ]
      },
      videoUrl,
      videoType,
      duration: 900 + idx * 60,
      order: idx,
      isPreview: isFirst,
      quiz
    };
  });

  const questions = bp.questions.map((q) => ({
    question: q.q,
    options: q.opts,
    correctAnswer: q.ans,
    explanation: q.exp
  }));

  return {
    slug: bp.slug,
    title: bp.title,
    description: bp.description,
    category: bp.category,
    learningGroup,
    level: bp.level || "Beginner",
    learningObjectives: bp.objectives || [
      `Understand fundamental principles of ${bp.title}`,
      `Apply step-by-step problem-solving methodologies`,
      `Analyze real-world scenarios and edge cases`,
      `Achieve 70%+ score on the comprehensive assessment`
    ],
    prerequisites: bp.prerequisites || ["None"],
    estimatedDuration: bp.duration || "12 hours",
    thumbnail: bp.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons,
    assessment: {
      title: `${bp.title} - Comprehensive Assessment`,
      description: `Test your mastery of ${bp.title} concepts, calculations, and analytical applications.`,
      passingPercentage: 70,
      questions
    }
  };
}

export function getMasterCurriculum() {
  const groupA = blueprintsA.map((bp) => transformBlueprint(bp, "Standards 6–8"));
  const groupB = blueprintsB.map((bp) => transformBlueprint(bp, "Standards 7–10"));
  const groupC1 = blueprintsC_part1.map((bp) => transformBlueprint(bp, "After Standard 12 and Above"));
  const groupC2 = blueprintsC_part2.map((bp) => transformBlueprint(bp, "After Standard 12 and Above"));

  return {
    groupA,
    groupB,
    groupC: [...groupC1, ...groupC2],
    allCourses: [...groupA, ...groupB, ...groupC1, ...groupC2]
  };
}

export default getMasterCurriculum;
