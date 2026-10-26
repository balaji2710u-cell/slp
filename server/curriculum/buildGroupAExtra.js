/**
 * Group A Courses 5 to 18 (Standards 6–8)
 */

export const groupAExtraCourses = [
  // 5. Tamil Language and Communication
  {
    slug: "tamil-language-communication",
    title: "Tamil Language and Communication",
    description: "Develop foundational literacy, clear pronunciation, ethical insights from Tirukkural, and polite conversational skills in classical Tamil.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Master Tamil vowel (Uyir) and consonant (Mei) sound patterns",
      "Understand sentence structure: Subject-Object-Verb (SOV) order",
      "Interpret and recite selected Tirukkural couplets with ethical meaning",
      "Express daily communication politely in formal and colloquial Tamil",
      "Write short descriptive paragraphs in clear Tamil script"
    ],
    prerequisites: ["Familiarity with basic Tamil alphabet or interest in learning"],
    estimatedDuration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Uyir, Mei and Uyir-Mei Letters & Phonetics",
        objective: "Identify the 12 Uyir eluthukkal (vowels), 18 Mei eluthukkal (consonants), and Ayutha eluthu (ஃ).",
        description: "Explore the phonetic architecture of Tamil and understand how vowels combine with consonants.",
        content: `### 1. Tamil Letter Structure
* **Uyir Eluthukkal (உயிர் எழுத்துக்கள் - 12):** Fundamental life sounds from 'அ' to 'ஔ'.
  - Short vowels (குறில்): அ, இ, உ, எ, ஒ
  - Long vowels (நெடில்): ஆ, ஈ, ஊ, ஏ, ஐ, ஓ, ஔ
* **Mei Eluthukkal (மெய் எழுத்துக்கள் - 18):** Body consonants with a dot (புள்ளி), grouped into:
  - Vallinam (வல்லினம் - hard): க், ச், ட், த், ப், ற்
  - Mellinam (மெல்லினம் - soft nasal): ங், ஞ், ண், ந், ம், ன்
  - Idaiyinam (இடையினம் - medium): ய், ர், ல், வ், ழ், ள்
* **Ayutha Eluthu (ஆய்த எழுத்து - 1):** 'ஃ' (Accompanying letter).`,
        keyTakeaways: ["12 Uyir + 18 Mei + 216 Uyirmei + 1 Ayutham = 247 letters in Tamil", "Vallinam, Mellinam, and Idaiyinam categorize sound hardness"],
        practiceActivity: {
          instructions: "Identify the letter category.",
          problem: "Which group of consonants does 'ம்' (M) belong to in Tamil?\nA) Vallinam\nB) Mellinam\nC) Idaiyinam",
          solution: "B) Mellinam (Soft nasal consonant).",
          hints: ["Soft sound produced through the nose"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Tamil Sentence Structure: Subject-Object-Verb (SOV)",
        objective: "Construct correct sentences following the standard Tamil Subject-Object-Verb (SOV) order.",
        description: "Contrast Tamil word order with English (SVO) and build daily spoken expressions.",
        content: `### Sentence Word Order
* **English:** Subject + Verb + Object (*"Malar reads a book."*)
* **Tamil:** Subject + Object + Verb (*"மலர் புத்தகம் படிக்கிறாள்."* - Malar book reads).
In Tamil, the main finite verb almost always completes the sentence.`,
        keyTakeaways: ["Tamil follows SOV (Subject - Object - Verb) word order", "Verbs reflect gender, number, and tense endings"],
        practiceActivity: {
          instructions: "Arrange the words in correct Tamil sentence order.",
          problem: "Arrange: படிக்கிறான் (reads) / கண்ணன் (Kannan) / பாடம் (lesson).",
          solution: "கண்ணன் பாடம் படிக்கிறான் (Kannan lesson reads).",
          hints: ["Subject first, then object, then verb at the end"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 920,
        order: 1,
        isPreview: false
      },
      {
        title: "Tirukkural: Universal Wisdom & Practical Ethics",
        objective: "Analyze selected couplets of Tiruvalluvar focusing on gratitude, education, and speech.",
        description: "Learn classical couplets and their direct relevance to modern student life.",
        content: `### Kural 391: The Power of Education
*"கற்க கசடறக் கற்பவை கற்றபின்*
*நிற்க அதற்குத் தக."*
**Meaning:** Learn flawlessly whatever you learn; after learning, let your conduct strictly reflect that knowledge.

### Kural 103: Gratitude
*"செய்யாமல் செய்த உதவிக்கு வையகமும்*
*வானகமும் ஆற்றல் அரிது."*
**Meaning:** Assistance rendered without prior obligation cannot be repaid even by offering heaven and earth.`,
        keyTakeaways: ["Education is incomplete without ethical conduct", "Gratitude is a central virtue in Tamil philosophy"],
        practiceActivity: {
          instructions: "Explain the moral takeaway of Kural 391.",
          problem: "According to 'Karka Kasadara', what must a student do after learning?",
          solution: "Live and conduct oneself strictly in accordance with the learned principles.",
          hints: ["Review 'Nirka atharkut thaga'"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 950,
        order: 2,
        isPreview: false
      },
      {
        title: "Polite Spoken Tamil & Relationship Terms",
        objective: "Use respectful honorifics and polite greetings in family, school, and public contexts.",
        description: "Learn respectful forms (வணக்கம், தயவுசெய்து, நன்றி) and family kinship terms.",
        content: `### Polite Terms in Tamil
* Greeting: வணக்கம் (Vanakkam)
* Please: தயவுசெய்து (Thayavu seidhu)
* Thank you: நன்றி (Nandri)
* Welcome: நல்வரவு (Nalvaravu)
* Respectful address: அய்யா (Sir), அம்மா (Madam), தாங்கள் / நீங்கள் (You - respectful).`,
        keyTakeaways: ["Always use 'நீங்கள்' instead of 'நீ' when speaking with elders and teachers", "'வணக்கம்' is the universal Tamil greeting"],
        practiceActivity: {
          instructions: "Choose the respectful phrase.",
          problem: "How do you politely ask an elder to sit down?\nA) உட்கார்\nB) தயவுசெய்து உட்காருங்கள்",
          solution: "B) தயவுசெய்து உட்காருங்கள் (respectful plural form).",
          hints: ["Honorific suffix '-ங்கள்' denotes respect"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 980,
        order: 3,
        isPreview: false
      },
      {
        title: "Reading & Writing Short Tamil Paragraphs",
        objective: "Compose short descriptive essays on topics such as 'My School' and 'Nature'.",
        description: "Synthesize vocabulary, sandhi rules, and sentence structures into cohesive written paragraphs.",
        content: `### Paragraph Composition Guide
1. **தலைப்பு (Heading):** என் பள்ளி (My School)
2. **அறிமுகம் (Introduction):** நான் அரசு மேல்நிலைப் பள்ளியில் எட்டாம் வகுப்பு படிக்கிறேன்.
3. **விளக்கம் (Body):** எங்கள் பள்ளியில் பெரிய விளையாட்டு மைதானமும் நூலகமும் உள்ளன.
4. **முடிவு (Conclusion):** நான் என் பள்ளியை மிகவும் நேசிக்கிறேன்.`,
        keyTakeaways: ["Use simple, clear sentences", "Ensure correct conjunctions like மற்றும் (and), ஆனால் (but)"],
        practiceActivity: {
          instructions: "Write a sentence in Tamil describing what you like to do.",
          problem: "Translate to Tamil: 'I like to read books.'",
          solution: "எனக்கு புத்தகங்கள் படிக்கப் பிடிக்கும் (Enakku puththakangal padikka pidikkum).",
          hints: ["Use 'எனக்கு... பிடிக்கும்' pattern"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1000,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Tamil Language and Communication Assessment",
      description: "Test your understanding of Tamil phonetics, grammar structure, Tirukkural ethics, and polite communication.",
      passingPercentage: 70,
      questions: [
        { question: "How many Uyir eluthukkal (vowels) exist in the Tamil language?", options: ["10", "12", "18", "216"], correctAnswer: 1, explanation: "There are exactly 12 Uyir eluthukkal (அ to ஔ)." },
        { question: "What is the standard sentence word order in the Tamil language?", options: ["SVO (Subject-Verb-Object)", "SOV (Subject-Object-Verb)", "VSO (Verb-Subject-Object)", "OSV (Object-Subject-Verb)"], correctAnswer: 1, explanation: "Tamil syntax follows Subject-Object-Verb (SOV) order." },
        { question: "Which consonant group does 'க்' (k) belong to?", options: ["Mellinam", "Idaiyinam", "Vallinam", "Ayutham"], correctAnswer: 2, explanation: "க், ச், ட், த், ப், ற் form the Vallinam (hard consonants) group." },
        { question: "Who composed the timeless ethical literature 'Tirukkural'?", options: ["Kambar", "Avvaiyar", "Tiruvalluvar", "Bharathiyar"], correctAnswer: 2, explanation: "Tiruvalluvar composed the Tirukkural comprising 1330 couplets." },
        { question: "What is the letter 'ஃ' called in Tamil grammar?", options: ["Uyir eluthu", "Mei eluthu", "Ayutha eluthu", "Uyirmei eluthu"], correctAnswer: 2, explanation: "'ஃ' is the unique single Ayutha eluthu." },
        { question: "What is the respectful pronoun used to address an elder or teacher in Tamil?", options: ["நீ (Nee)", "நீங்கள் (Neengal)", "அவன் (Avan)", "இது (Idhu)"], correctAnswer: 1, explanation: "'நீங்கள்' is the polite honorific second-person pronoun." },
        { question: "What does 'கற்க கசடற' in Kural 391 instruct students to do?", options: ["To study without paying attention", "To learn flawlessly without doubts or defects", "To memorize without understanding", "To stop studying"], correctAnswer: 1, explanation: "'கசடற' means without defects or blemishes; to learn thoroughly." },
        { question: "What is the Tamil word for 'Thank you'?", options: ["வணக்கம்", "நன்றி", "மன்னிப்பு", "வருக"], correctAnswer: 1, explanation: "நன்றி (Nandri) signifies gratitude and thanks." },
        { question: "Which of the following is a short vowel (குறில் எழுத்து)?", options: ["ஆ", "ஈ", "இ", "ஊ"], correctAnswer: 2, explanation: "'இ' is a Kuril (short vowel) pronounced in one matra." },
        { question: "What is the total number of letters in the standard Tamil alphabet?", options: ["100", "216", "247", "300"], correctAnswer: 2, explanation: "12 Uyir + 18 Mei + 216 Uyirmei + 1 Ayutham = 247 letters." }
      ]
    }
  },

  // 6. Mathematics Fundamentals
  {
    slug: "mathematics-fundamentals",
    title: "Mathematics Fundamentals",
    description: "Master foundational arithmetic, place value, prime numbers, factors, multiples, LCM, GCD, and BODMAS order of operations.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Understand natural numbers, whole numbers, integers, and place value",
      "Calculate Least Common Multiple (LCM) and Greatest Common Divisor (GCD/HCF)",
      "Identify prime and composite numbers using the Sieve of Eratosthenes",
      "Apply BODMAS / PEMDAS order of operations strictly",
      "Solve multi-step word problems involving integers"
    ],
    prerequisites: ["Basic addition and multiplication tables 1 to 10"],
    estimatedDuration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Number Systems & Integers on the Number Line",
        objective: "Differentiate natural numbers, whole numbers, and integers, and perform arithmetic on the number line.",
        description: "Visualize negative numbers, zero, and positive numbers in real-world contexts like temperature and debt.",
        content: `### Sets of Numbers
* **Natural Numbers (N):** Counting numbers starting at 1: {1, 2, 3, ...}
* **Whole Numbers (W):** Natural numbers plus zero: {0, 1, 2, 3, ...}
* **Integers (Z):** Negative and positive whole numbers: {..., -3, -2, -1, 0, 1, 2, 3, ...}

### Rules for Integer Operations
* $(-) \\times (-) = (+)$
* $(-) \\times (+) = (-)$
* Adding negatives: $(-4) + (-6) = -10$
* Subtracting negatives: $5 - (-3) = 5 + 3 = 8$`,
        keyTakeaways: ["Subtracting a negative number is equivalent to addition", "Zero is neither positive nor negative"],
        practiceActivity: {
          instructions: "Calculate the integer value.",
          problem: "Evaluate: -15 + 23 - (-7).",
          solution: "15 (-15 + 23 = 8; 8 - (-7) = 8 + 7 = 15).",
          hints: ["Subtracting -7 becomes +7"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Prime Numbers, Factors & Prime Factorization",
        objective: "Find factors of composite numbers and decompose them into prime factor trees.",
        description: "Master prime numbers (having only 1 and itself as factors) and prime factorization.",
        content: `### Prime vs Composite
* **Prime Number:** Has exactly two distinct factors: 1 and itself (*2, 3, 5, 7, 11, 13, 17, 19, 23...*). Note: **2 is the only even prime number.**
* **1 is neither prime nor composite.**
* **Prime Factorization of 60:**
  $60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2^2 \\times 3 \\times 5$.`,
        keyTakeaways: ["2 is the smallest and only even prime number", "Every integer greater than 1 has a unique prime factorization"],
        practiceActivity: {
          instructions: "Find the prime factorization.",
          problem: "Write 84 as a product of prime factors.",
          solution: "2^2 * 3 * 7 (2 * 2 * 3 * 7 = 84).",
          hints: ["Divide by 2 twice to get 21, then factor 21"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 940,
        order: 1,
        isPreview: false
      },
      {
        title: "LCM and HCF / GCD Calculation Methods",
        objective: "Calculate the Least Common Multiple (LCM) and Highest Common Factor (HCF) using division and prime factors.",
        description: "Apply LCM and GCD to solve real-world scheduling and grouping problems.",
        content: `### Definitions & Formulas
* **HCF (Highest Common Factor):** Product of the lowest powers of common prime factors.
* **LCM (Least Common Multiple):** Product of the highest powers of all prime factors.
* **Fundamental Relation:** For any two numbers $a$ and $b$:
  $$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$$

### Example: Numbers 12 and 18
* $12 = 2^2 \\times 3$
* $18 = 2 \\times 3^2$
* $\\text{HCF} = 2^1 \\times 3^1 = 6$
* $\\text{LCM} = 2^2 \\times 3^2 = 36$
* Check: $6 \\times 36 = 216 = 12 \\times 18$. Correct!`,
        keyTakeaways: ["HCF takes lowest powers of common primes", "HCF(a,b) * LCM(a,b) = a * b"],
        practiceActivity: {
          instructions: "Find HCF and LCM.",
          problem: "Find the HCF of 24 and 36.",
          solution: "12 (Factors of 24: 1,2,3,4,6,8,12,24; Factors of 36: 1,2,3,4,6,9,12,18,36. Highest common is 12).",
          hints: ["Prime factors: 24 = 2^3 * 3, 36 = 2^2 * 3^2"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 980,
        order: 2,
        isPreview: false
      },
      {
        title: "BODMAS / PEMDAS Order of Operations",
        objective: "Evaluate complex numerical expressions strictly following the standard order of operations.",
        description: "Eliminate arithmetic ambiguity using Brackets, Orders, Division, Multiplication, Addition, and Subtraction.",
        content: `### The BODMAS Rule
1. **B - Brackets:** Innermost first: (), [], {}
2. **O - Orders:** Powers, roots, and 'of'
3. **D & M - Division and Multiplication:** Left to right
4. **A & S - Addition and Subtraction:** Left to right

### Worked Example: $8 + 2 \\times (6 - 2)^2 \\div 4$
1. Brackets: $(6 - 2) = 4$. Expression: $8 + 2 \\times 4^2 \\div 4$.
2. Order (power): $4^2 = 16$. Expression: $8 + 2 \\times 16 \\div 4$.
3. Multiply/Divide from left: $2 \\times 16 = 32$; then $32 \\div 4 = 8$.
4. Addition: $8 + 8 = 16$. Final Answer: **16**.`,
        keyTakeaways: ["Division and multiplication have equal priority, evaluated left to right", "Never perform addition before multiplication unless grouped by brackets"],
        practiceActivity: {
          instructions: "Evaluate using BODMAS.",
          problem: "Calculate: 20 - 4 * 3 + 12 / 6.",
          solution: "10 (Multiplication: 4*3 = 12; Division: 12/6 = 2; Left to right: 20 - 12 + 2 = 8 + 2 = 10).",
          hints: ["Do 4*3 and 12/6 first"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1020,
        order: 3,
        isPreview: false
      },
      {
        title: "Word Problems & Practical Number Applications",
        objective: "Translate real-life word scenarios into mathematical equations and solve accurately.",
        description: "Apply factors, multiples, and operations to unit rates, budgets, and scheduling puzzles.",
        content: `### Problem Solving Strategy
1. **Read & Understand:** Identify what is given and what is asked.
2. **Assign Quantities:** Write down known numbers with units.
3. **Choose the Mathematical Model:** Does the problem require finding when two cycles align (LCM) or dividing items into maximum equal groups (HCF)?
* **Example:** Three bells toll together at intervals of 9, 12, and 15 minutes. When will they toll together again?
  - Solve for $\\text{LCM}(9, 12, 15) = 180$ minutes $= 3$ hours!`,
        keyTakeaways: ["Synchronizing repetitive cycles requires LCM", "Dividing into equal batches without remainder requires HCF"],
        practiceActivity: {
          instructions: "Solve the word problem.",
          problem: "A teacher has 48 pencils and 64 erasers. What is the maximum number of identical gift packs she can create with no items left over?",
          solution: "16 packs (HCF of 48 and 64 is 16. Each pack gets 3 pencils and 4 erasers).",
          hints: ["Find the Highest Common Factor of 48 and 64"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1050,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Mathematics Fundamentals Assessment",
      description: "Test your skills in integer arithmetic, prime numbers, LCM, GCD, and BODMAS operations.",
      passingPercentage: 70,
      questions: [
        { question: "What is the value of: -8 - (-14)?", options: ["-22", "6", "-6", "22"], correctAnswer: 1, explanation: "-8 - (-14) = -8 + 14 = 6." },
        { question: "Which of the following is the only even prime number?", options: ["0", "2", "4", "6"], correctAnswer: 1, explanation: "2 is the only even prime number; all other even numbers are divisible by 2." },
        { question: "What is the HCF of 18 and 24?", options: ["3", "6", "12", "72"], correctAnswer: 1, explanation: "Factors of 18: 1, 2, 3, 6, 9, 18; Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Greatest common factor is 6." },
        { question: "What is the LCM of 6 and 8?", options: ["14", "24", "48", "2"], correctAnswer: 1, explanation: "Multiples of 6: 6, 12, 18, 24; Multiples of 8: 8, 16, 24. Least common multiple is 24." },
        { question: "Evaluate: 12 + 4 * (5 - 2).", options: ["48", "24", "32", "16"], correctAnswer: 1, explanation: "Brackets first: 5 - 2 = 3. Multiply: 4 * 3 = 12. Add: 12 + 12 = 24." },
        { question: "If HCF(a, b) = 4 and LCM(a, b) = 24, and a = 8, what is b?", options: ["6", "12", "16", "24"], correctAnswer: 1, explanation: "a * b = HCF * LCM -> 8 * b = 4 * 24 = 96 -> b = 96 / 8 = 12." },
        { question: "Which of the following numbers is prime?", options: ["27", "37", "49", "51"], correctAnswer: 1, explanation: "37 has no divisors other than 1 and 37 (27 = 3*9, 49 = 7*7, 51 = 3*17)." },
        { question: "Evaluate: 50 - 20 / 4 * 2.", options: ["15", "40", "47.5", "10"], correctAnswer: 1, explanation: "Division and multiplication left to right: 20 / 4 = 5; 5 * 2 = 10. Subtract: 50 - 10 = 40." },
        { question: "What is the prime factorization of 36?", options: ["4 * 9", "2^2 * 3^2", "6 * 6", "2 * 3 * 6"], correctAnswer: 1, explanation: "36 = 2 * 2 * 3 * 3 = 2^2 * 3^2 (all factors must be prime)." },
        { question: "Two lighthouses flash every 10 seconds and 15 seconds. If they flash together now, after how many seconds will they flash together again?", options: ["25 seconds", "30 seconds", "150 seconds", "5 seconds"], correctAnswer: 1, explanation: "LCM of 10 and 15 is 30 seconds." }
      ]
    }
  }
];
