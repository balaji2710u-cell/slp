/**
 * Blueprints for GROUP A (Standards 6–8): 18 Courses
 */

export const blueprintsA = [
  // 1. Abacus and Mental Arithmetic
  {
    slug: "abacus-mental-arithmetic",
    title: "Abacus and Mental Arithmetic",
    description: "Build mental arithmetic speed and calculation reflexes using the Soroban abacus and Japanese Anzan visualization techniques.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Understand Soroban bead values (upper=5, lower=1)", "Execute direct addition and subtraction", "Apply small friends (5-complements)", "Apply big friends (10-complements)", "Practice Anzan mental math visualization"],
    prerequisites: ["Number counting up to 100"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Introduction to Soroban Abacus & Bead Values", detail: "Upper heaven bead = 5, lower earth beads = 1 each.", problem: "Beads at beam: 1 upper, 3 lower. What is the value?", solution: "8 (5 + 3 = 8)." },
      { title: "Direct Addition and Subtraction", detail: "Move earth beads with thumb (+) and index (-); move heaven bead with index.", problem: "Compute 2 + 2 + 5 - 3 on beads.", solution: "6." },
      { title: "The 5-Complement (Small Friends)", detail: "+4 = +5 - 1; +3 = +5 - 2; +2 = +5 - 3; +1 = +5 - 4.", problem: "Calculate 4 + 3 using 5-complements.", solution: "7 (+3 = +5 - 2)." },
      { title: "The 10-Complement (Big Friends) and Carrying", detail: "+9 = +10 - 1; +8 = +10 - 2; +7 = +10 - 3.", problem: "Calculate 8 + 7 using 10-complements.", solution: "15 (+7 = +10 - 3)." },
      { title: "Anzan Mental Visualization & Speed Drilling", detail: "Picture internal Soroban and calculate without physical apparatus.", problem: "Mentally compute: 15 + 23 - 8.", solution: "30." }
    ],
    questions: [
      { q: "What is the value of an upper-deck bead on a Soroban abacus?", opts: ["1", "5", "10", "50"], ans: 1, exp: "Upper heaven bead represents 5." },
      { q: "How many lower beads are on each rod of a Soroban?", opts: ["3", "4", "5", "2"], ans: 1, exp: "Each rod has 4 earth beads." },
      { q: "When do beads contribute to the total on an abacus?", opts: ["When moved to edges", "When moved to the dividing beam", "When inverted", "Always"], ans: 1, exp: "Beads only count when moved to the beam." },
      { q: "What is the small-friend formula for adding 4?", opts: ["+4 = +10 - 6", "+4 = +5 - 1", "+4 = +5 + 1", "+4 = +2 + 2"], ans: 1, exp: "+4 = +5 - 1." },
      { q: "What is the 10-complement of 7?", opts: ["2", "3", "4", "5"], ans: 1, exp: "7 + 3 = 10, so complement is 3." },
      { q: "What number is 1 upper and 4 lower beads at the beam?", opts: ["5", "8", "9", "10"], ans: 2, exp: "5 + 4 = 9." },
      { q: "What is the Anzan technique?", opts: ["Writing equations", "Mental math by visualizing an internal abacus", "Using a mechanical calculator", "Finger multiplication"], ans: 1, exp: "Anzan is mental calculation via abacus visualization." },
      { q: "What finger moves earth beads upward?", opts: ["Thumb", "Index finger", "Pinky", "Middle finger"], ans: 0, exp: "The thumb pushes earth beads upward." },
      { q: "In what direction do Soroban calculations move?", opts: ["Right to left", "Left to right", "Clockwise", "Bottom to top"], ans: 1, exp: "Calculations proceed left to right (highest place value first)." },
      { q: "Compute mentally: 42 + 28 - 15.", opts: ["50", "55", "60", "65"], ans: 1, exp: "42 + 28 = 70; 70 - 15 = 55." }
    ]
  },

  // 2. Basic English Communication
  {
    slug: "basic-english-communication",
    title: "Basic English Communication",
    description: "Learn practical conversational English for school and daily life: greetings, polite requests, questions, routines, and phone etiquette.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Introduce yourself and others clearly", "Use polite modal requests", "Master 5W1H question words", "Narrate daily routines", "Handle short phone calls"],
    prerequisites: ["English alphabet recognition"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Greetings & Self Introductions", detail: "Good morning/afternoon/evening. State name, age, grade, interests.", problem: "Correct: 'Myself Anand.'", solution: "'My name is Anand' or 'I am Anand'." },
      { title: "Polite Requests & Apologies", detail: "Could you please lend me your pencil? May I come in? Excuse me.", problem: "Make polite: 'Give water.'", solution: "'Could you please give me some water?'" },
      { title: "5W1H Question Words", detail: "Who, What, Where, When, Why, How.", problem: "Which word asks for reason?", solution: "Why." },
      { title: "Daily Routines & Telling Time", detail: "Present simple tense, quarter past/to, half past.", problem: "What is 8:15 in words?", solution: "Quarter past eight." },
      { title: "Telephone Conversations & Public Manners", detail: "Answering, taking messages, asking someone to repeat politely.", problem: "Voice is faint on phone. What to say?", solution: "'Could you please speak a little louder?'" }
    ],
    questions: [
      { q: "Which greeting is used at 10:00 AM?", opts: ["Good evening", "Good afternoon", "Good morning", "Good night"], ans: 2, exp: "Morning greeting applies until 12 PM." },
      { q: "Which is grammatically correct for introductions?", opts: ["Myself Priya.", "My name is Priya.", "Me Priya.", "I Priya."], ans: 1, exp: "'My name is Priya' is standard English." },
      { q: "What is the polite reply to 'Thank you'?", opts: ["You are welcome.", "Go away.", "Why thanks?", "Never mind."], ans: 0, exp: "'You are welcome' is standard polite reply." },
      { q: "Which word asks about location?", opts: ["Who", "When", "Where", "Why"], ans: 2, exp: "Where asks about location." },
      { q: "How to politely ask to enter a classroom?", opts: ["I am entering.", "May I come in, teacher?", "Open door.", "Can I come in now?"], ans: 1, exp: "'May I come in?' is formal polite expression." },
      { q: "What time is 'quarter to six'?", opts: ["6:15", "5:45", "6:45", "5:15"], ans: 1, exp: "Quarter to six is 5:45." },
      { q: "What should you say if you did not hear a statement?", opts: ["Pardon me, could you repeat that?", "Shout louder!", "What is wrong with you?", "Silence!"], ans: 0, exp: "Pardon me is polite clarification." },
      { q: "Which connector begins a sequence of steps?", opts: ["Finally", "First", "After that", "Last"], ans: 1, exp: "First marks the beginning." },
      { q: "Which word fills: '_____ is your best friend?'", opts: ["Who", "Where", "What", "When"], ans: 0, exp: "Who asks about a person." },
      { q: "When is 'Good night' used?", opts: ["Meeting someone at 8 PM", "Leaving or going to sleep at night", "At lunchtime", "In the morning"], ans: 1, exp: "Good night is strictly a parting phrase at night." }
    ]
  },

  // 3. English Grammar and Vocabulary
  {
    slug: "english-grammar-vocabulary",
    title: "English Grammar and Vocabulary",
    description: "Master 8 parts of speech, active tenses, subject-verb agreement, prefixes/suffixes, and sentence mechanics.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Identify all 8 parts of speech", "Use present, past, and future tenses", "Maintain subject-verb agreement", "Apply prefixes and suffixes", "Punctuate sentences accurately"],
    prerequisites: ["Basic reading skills"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The 8 Parts of Speech", detail: "Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection.", problem: "Identify part of speech of 'swiftly'.", solution: "Adverb." },
      { title: "Tenses: Past, Present, Future", detail: "Simple, continuous, and perfect tense formations.", problem: "Past tense of 'write'?", solution: "Wrote." },
      { title: "Subject-Verb Agreement", detail: "Singular subject takes singular verb; plural takes plural.", problem: "Choose: 'The box of pencils (is/are) heavy.'", solution: "is (subject is singular 'box')." },
      { title: "Prefixes, Suffixes & Root Words", detail: "un-, re-, pre-, -ful, -less, -ly.", problem: "Opposite of 'patient' using prefix?", solution: "Impatient." },
      { title: "Punctuation Rules & Mechanics", detail: "Capitals, commas, periods, question marks, apostrophes.", problem: "Correct: 'it is the boys book'", solution: "'It is the boy's book.'" }
    ],
    questions: [
      { q: "What part of speech is 'under'?", opts: ["Noun", "Preposition", "Adverb", "Adjective"], ans: 1, exp: "Under is a preposition showing position." },
      { q: "Choose correct agreement: 'Neither Ravi nor his friends _____ attending.'", opts: ["is", "are", "was", "has"], ans: 1, exp: "Verb agrees with closer subject 'friends' (plural)." },
      { q: "What is the past tense of 'run'?", opts: ["Runned", "Ran", "Running", "Ranned"], ans: 1, exp: "Past tense is ran." },
      { q: "What does prefix 're-' mean?", opts: ["Before", "Again", "Not", "Under"], ans: 1, exp: "Re- means again (e.g. rewrite)." },
      { q: "Identify the adjective in: 'Three bright stars shone.'", opts: ["Three and bright", "shone", "stars", "in"], ans: 0, exp: "Three and bright both modify stars." },
      { q: "'Everyone _____ completed the assignment.'", opts: ["has", "have", "are", "were"], ans: 0, exp: "Everyone is grammatically singular." },
      { q: "Which word means 'lacking care'?", opts: ["Careful", "Careless", "Caring", "Care"], ans: 1, exp: "Suffix -less denotes without." },
      { q: "Which shows correct possession for one cat?", opts: ["The cats tail", "The cat's tail", "The cats' tail", "The cat tail"], ans: 1, exp: "Cat's indicates singular possession." },
      { q: "What part of speech expresses sudden emotion?", opts: ["Conjunction", "Interjection", "Preposition", "Pronoun"], ans: 1, exp: "Interjections express sudden emotion (e.g. Wow!)." },
      { q: "Which sentence is punctuated correctly?", opts: ["Where are you going.", "Where are you going?", "Where are you going!", "where are you going?"], ans: 1, exp: "Questions require question marks and capital start." }
    ]
  },

  // 4. Reading Comprehension and Writing
  {
    slug: "reading-comprehension-writing",
    title: "Reading Comprehension and Writing",
    description: "Develop analytical reading skills, inferencing, paragraph structure, story writing, and formal leave letters.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Apply skimming and scanning techniques", "Identify main ideas and supporting details", "Use context clues to infer meanings", "Structure paragraphs with topic sentences", "Write formal leave applications"],
    prerequisites: ["English Grammar and Vocabulary"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Skimming, Scanning & Main Idea", detail: "Skim for gist, scan for specific facts, locate topic sentences.", problem: "What is scanning used for?", solution: "Finding specific facts, dates, or keywords." },
      { title: "Context Clues & Inferencing", detail: "Deduce meaning from surrounding definition, contrast, and synonym clues.", problem: "In 'He felt famished after the race and ate 4 plates', what does famished mean?", solution: "Extremely hungry." },
      { title: "The Hamburger Paragraph Model", detail: "Top bun (topic sentence), filling (3 details), bottom bun (conclusion).", problem: "What does the topic sentence do?", solution: "Introduces the central idea of the paragraph." },
      { title: "Narrative Writing & Sensory Details", detail: "Show, don't tell using the 5 physical senses.", problem: "Show, don't tell: 'He was nervous.'", solution: "'His hands shook as cold sweat gathered on his brow.'" },
      { title: "Formal Letter Writing", detail: "From, Date, To, Subject, Salutation, Body, Subscription.", problem: "What is the purpose of the subject line?", solution: "Briefly state the letter's purpose." }
    ],
    questions: [
      { q: "What is skimming used for?", opts: ["Deep study", "Getting the general idea quickly", "Finding phone numbers", "Proofreading spelling"], ans: 1, exp: "Skimming previews the main idea." },
      { q: "What is scanning?", opts: ["Reading aloud", "Searching for specific words or numbers", "Translating text", "Writing summaries"], ans: 1, exp: "Scanning targets specific data." },
      { q: "What is the top bun of a paragraph?", opts: ["Conclusion", "Topic sentence", "Vocabulary list", "Title"], ans: 1, exp: "Top bun is the topic sentence." },
      { q: "Which demonstrates 'Show, Don't Tell'?", opts: ["She was happy.", "A beaming smile lit her face and she leaped with joy.", "She had happiness.", "She was glad."], ans: 1, exp: "Describing physical actions shows emotion." },
      { q: "Where does the subject line appear in formal letters?", opts: ["After signature", "Before salutation", "On envelope only", "At the very top"], ans: 1, exp: "Subject line appears before salutation." },
      { q: "What does 'infer' mean?", opts: ["Copy word for word", "Deduce using evidence and reasoning", "Ignore facts", "Read backwards"], ans: 1, exp: "Inferencing deduces meaning from clues." },
      { q: "What clue type is introduced by 'unlike'?", opts: ["Contrast clue", "Synonym clue", "Rhyme clue", "Number clue"], ans: 0, exp: "Unlike marks a contrast clue." },
      { q: "Which transition indicates addition?", opts: ["However", "Furthermore", "Instead", "Nevertheless"], ans: 1, exp: "Furthermore introduces additional information." },
      { q: "What is the concluding sentence's job?", opts: ["Introduce a new topic", "Wrap up and reinforce the main idea", "Ask unrelated questions", "End abruptly"], ans: 1, exp: "Conclusion reinforces main idea and closes paragraph." },
      { q: "Which sign-off is appropriate for formal letters to teachers?", opts: ["Cheers", "Yours obediently / faithfully", "See ya", "Later"], ans: 1, exp: "Yours obediently/faithfully is formal." }
    ]
  },

  // 5. Tamil Language and Communication
  {
    slug: "tamil-language-communication",
    title: "Tamil Language and Communication",
    description: "Develop foundational literacy, clear pronunciation, Tirukkural ethics, and polite conversational skills in classical Tamil.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Identify Uyir (12) and Mei (18) letters", "Master Tamil SOV sentence structure", "Explain Tirukkural ethics", "Communicate politely in daily spoken Tamil", "Write basic paragraphs in Tamil"],
    prerequisites: ["Interest in learning classical Tamil"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Uyir, Mei and Uyir-Mei Letters", detail: "12 Uyir + 18 Mei + 216 Uyirmei + 1 Ayutham = 247 letters. Vallinam, Mellinam, Idaiyinam.", problem: "Which category does 'ம்' belong to?", solution: "Mellinam (soft nasal consonant)." },
      { title: "Tamil Sentence Structure: SOV", detail: "Tamil follows Subject - Object - Verb order (மலர் பாடம் படிக்கிறாள்).", problem: "Arrange: பாடம் / கண்ணன் / படிக்கிறான்", solution: "கண்ணன் பாடம் படிக்கிறான்." },
      { title: "Tirukkural: Wisdom for Students", detail: "Kural 391: கற்க கசடறக் கற்பவை; Kural 103: Gratitude.", problem: "What does 'கசடற' mean?", solution: "Flawlessly, without defects." },
      { title: "Polite Spoken Tamil", detail: "வணக்கம், தயவுசெய்து, நன்றி. Use 'நீங்கள்' for elders.", problem: "Polite word for 'Please' in Tamil?", solution: "தயவுசெய்து (Thayavu seidhu)." },
      { title: "Writing Short Tamil Paragraphs", detail: "Composing clear paragraphs on 'My School' and 'Nature'.", problem: "Translate: 'I read books'", solution: "நான் புத்தகங்கள் படிக்கிறேன்." }
    ],
    questions: [
      { q: "How many Uyir eluthukkal (vowels) exist in Tamil?", opts: ["10", "12", "18", "216"], ans: 1, exp: "There are 12 Uyir eluthukkal." },
      { q: "What is the standard Tamil sentence structure?", opts: ["SVO", "SOV", "VSO", "OSV"], ans: 1, exp: "Tamil follows Subject-Object-Verb (SOV) order." },
      { q: "Which letter group does 'க்' belong to?", opts: ["Mellinam", "Idaiyinam", "Vallinam", "Ayutham"], ans: 2, exp: "க் is part of Vallinam (hard consonants)." },
      { q: "Who composed the Tirukkural?", opts: ["Kambar", "Avvaiyar", "Tiruvalluvar", "Bharathi"], ans: 2, exp: "Tiruvalluvar composed Tirukkural." },
      { q: "What is 'ஃ' called?", opts: ["Uyir", "Mei", "Ayutha eluthu", "Uyirmei"], ans: 2, exp: "ஃ is the unique Ayutha letter." },
      { q: "Polite second-person pronoun in Tamil?", opts: ["நீ", "நீங்கள்", "அவன்", "இது"], ans: 1, exp: "நீங்கள் is the honorific polite form." },
      { q: "What does Kural 391 emphasize?", opts: ["Wealth", "Flawless learning and ethical conduct", "Warfare", "Commerce"], ans: 1, exp: "Learning thoroughly and acting accordingly." },
      { q: "What is the Tamil word for 'Thank you'?", opts: ["வணக்கம்", "நன்றி", "மன்னிப்பு", "வருக"], ans: 1, exp: "நன்றி expresses gratitude." },
      { q: "Which of these is a short vowel (Kuril)?", opts: ["ஆ", "இ", "ஈ", "ஊ"], ans: 1, exp: "இ is pronounced in one matra (short vowel)." },
      { q: "Total letters in the Tamil alphabet?", opts: ["100", "216", "247", "300"], ans: 2, exp: "12 + 18 + 216 + 1 = 247 letters." }
    ]
  },

  // 6. Mathematics Fundamentals
  {
    slug: "mathematics-fundamentals",
    title: "Mathematics Fundamentals",
    description: "Master integers, number line arithmetic, prime factorization, LCM, GCD, and BODMAS order of operations.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Perform arithmetic with negative numbers", "Factor composite numbers into primes", "Calculate LCM and HCF / GCD", "Apply BODMAS strictly", "Solve multi-step word problems"],
    prerequisites: ["Basic multiplication tables"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Number Systems & Negative Integers", detail: "Natural, Whole, Integers. Rules for signs: (-) * (-) = (+).", problem: "Calculate: -12 + 25 - (-5).", solution: "18 (-12 + 25 = 13; 13 + 5 = 18)." },
      { title: "Prime Numbers & Factorization", detail: "Prime vs composite. 2 is only even prime. Prime factor trees.", problem: "Prime factors of 60?", solution: "2^2 * 3 * 5." },
      { title: "LCM and HCF / GCD Calculation", detail: "HCF takes lowest prime powers; LCM takes highest prime powers. HCF * LCM = a * b.", problem: "HCF of 24 and 36?", solution: "12." },
      { title: "BODMAS Order of Operations", detail: "Brackets, Orders, Division/Multiplication, Addition/Subtraction.", problem: "Evaluate: 18 - 3 * 4 + 8 / 2.", solution: "10 (18 - 12 + 4 = 10)." },
      { title: "Word Problems & Practical Number Scenarios", detail: "Synchronizing events via LCM; equal division via HCF.", problem: "Bells toll at 6m and 8m. When do they toll together?", solution: "24 minutes (LCM of 6 and 8)." }
    ],
    questions: [
      { q: "What is -7 - (-15)?", opts: ["-22", "8", "-8", "22"], ans: 1, exp: "-7 + 15 = 8." },
      { q: "Which is the smallest prime number?", opts: ["0", "1", "2", "3"], ans: 2, exp: "2 is the smallest prime number." },
      { q: "What is HCF of 12 and 18?", opts: ["2", "3", "6", "36"], ans: 2, exp: "Highest common factor is 6." },
      { q: "What is LCM of 4 and 6?", opts: ["10", "12", "24", "2"], ans: 1, exp: "Least common multiple is 12." },
      { q: "Evaluate: 10 + 2 * (6 - 3).", opts: ["36", "16", "22", "12"], ans: 1, exp: "Brackets: 6-3=3; Multiply: 2*3=6; Add: 10+6=16." },
      { q: "If HCF=5 and LCM=60 for two numbers, and one is 15, what is the other?", opts: ["10", "20", "25", "30"], ans: 1, exp: "5 * 60 = 300 / 15 = 20." },
      { q: "Which number is prime?", opts: ["21", "29", "33", "49"], ans: 1, exp: "29 has no divisors except 1 and 29." },
      { q: "Evaluate: 30 - 10 / 2 * 3.", opts: ["30", "15", "0", "20"], ans: 1, exp: "10 / 2 = 5; 5 * 3 = 15; 30 - 15 = 15." },
      { q: "Prime factorization of 45?", opts: ["9 * 5", "3^2 * 5", "3 * 15", "1 * 45"], ans: 1, exp: "3^2 * 5 (both 3 and 5 are prime)." },
      { q: "Two signals change every 12s and 20s. LCM is:", opts: ["32s", "60s", "120s", "240s"], ans: 1, exp: "LCM(12, 20) = 60 seconds." }
    ]
  },

  // 7. Fractions, Decimals and Percentages
  {
    slug: "fractions-decimals-percentages",
    title: "Fractions, Decimals and Percentages",
    description: "Master visual fraction models, equivalent fractions, decimal place values, percentage conversions, and real-life shopping calculations.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Represent fractions visually", "Add, subtract, multiply, and divide fractions", "Convert seamlessly between fractions, decimals, and percentages", "Calculate percentage discounts and profits"],
    prerequisites: ["Mathematics Fundamentals"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Visualizing Fractions & Equivalent Fractions", detail: "Numerator represents parts taken; denominator represents total parts. Multiply or divide numerator and denominator by the same non-zero number for equivalent fractions.", problem: "Find an equivalent fraction for 3/5 with a denominator of 20.", solution: "12/20 (multiply numerator and denominator by 4)." },
      { title: "Addition & Subtraction of Unlike Fractions", detail: "Find LCM of denominators to convert to like fractions before adding or subtracting.", problem: "Evaluate: 2/5 + 1/3.", solution: "11/15 (6/15 + 5/15 = 11/15)." },
      { title: "Multiplication and Division of Fractions", detail: "Multiply numerators and denominators straight across. For division, multiply by the reciprocal of the second fraction.", problem: "Calculate: (2/3) * (9/10).", solution: "3/5 (18/30 simplified is 3/5)." },
      { title: "Decimals and Place Value System", detail: "Tenths (0.1), hundredths (0.01), thousandths (0.001). Convert between fractions and decimals.", problem: "Convert 0.375 into a simplified fraction.", solution: "3/8 (375/1000 = 3/8)." },
      { title: "Percentages & Real-Life Discount Calculations", detail: "Percent means per hundred. Calculate percentage of amounts and discount prices: Price = Original - Discount.", problem: "A book costs Rs. 400. With 25% discount, what is the selling price?", solution: "Rs. 300 (400 - 100 = 300)." }
    ],
    questions: [
      { q: "What is 3/4 expressed as a decimal?", opts: ["0.25", "0.50", "0.75", "0.85"], ans: 2, exp: "3 divided by 4 equals 0.75." },
      { q: "Evaluate: 1/2 + 2/3.", opts: ["3/5", "5/6", "7/6", "1/6"], ans: 2, exp: "LCM of 2 and 3 is 6: 3/6 + 4/6 = 7/6." },
      { q: "What is 15% of 200?", opts: ["15", "30", "45", "60"], ans: 1, exp: "(15 / 100) * 200 = 30." },
      { q: "Evaluate: (3/5) / (2/3).", opts: ["6/15", "9/10", "1/2", "5/6"], ans: 1, exp: "(3/5) * (3/2) = 9/10." },
      { q: "Which fraction is equivalent to 4/6 in simplest form?", opts: ["1/2", "2/3", "3/4", "5/6"], ans: 1, exp: "Dividing numerator and denominator by 2 gives 2/3." },
      { q: "What is 0.08 expressed as a percentage?", opts: ["0.8%", "8%", "80%", "0.08%"], ans: 1, exp: "0.08 * 100 = 8%." },
      { q: "If a school bag costs Rs. 800 and is discounted by 20%, what is the discount amount?", opts: ["Rs. 80", "Rs. 160", "Rs. 200", "Rs. 640"], ans: 1, exp: "20% of 800 = (20/100) * 800 = Rs. 160." },
      { q: "What is the reciprocal of 7/9?", opts: ["9/7", "-7/9", "7/9", "1/7"], ans: 0, exp: "The reciprocal flips numerator and denominator: 9/7." },
      { q: "Convert 2/5 to a percentage.", opts: ["20%", "25%", "40%", "50%"], ans: 2, exp: "(2/5) * 100% = 40%." },
      { q: "Which is the largest value: 0.6, 5/8, 65%, or 0.62?", opts: ["0.6", "5/8", "65%", "0.62"], ans: 2, exp: "0.6 = 60%, 5/8 = 62.5%, 0.62 = 62%, 65% is the largest." }
    ]
  },

  // 8. Introduction to Algebra and Geometry
  {
    slug: "intro-algebra-geometry",
    title: "Introduction to Algebra and Geometry",
    description: "Bridge arithmetic to algebra and geometry with variables, simple linear equations, angle classifications, triangles, perimeter, and area.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Use variables to represent unknown numbers", "Solve single-variable linear equations", "Classify angles (acute, right, obtuse, straight)", "Calculate perimeter and area of 2D shapes"],
    prerequisites: ["Mathematics Fundamentals"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Variables, Constants & Algebraic Expressions", detail: "Variables represent unknowns (x, y). Constants are fixed numbers. Expressions combine variables and operators.", problem: "Evaluate 4x - 3 when x = 5.", solution: "17 (4*5 - 3 = 17)." },
      { title: "Solving Simple Linear Equations", detail: "Balance principle: perform identical operations on both sides to isolate the variable (e.g. 2x + 7 = 19 -> 2x = 12 -> x = 6).", problem: "Solve for y: 3y - 8 = 16.", solution: "y = 8 (3y = 24 -> y = 8)." },
      { title: "Angles: Acute, Right, Obtuse & Supplementary", detail: "Acute (< 90°), Right (90°), Obtuse (90°-180°), Straight (180°). Complementary sum to 90°; Supplementary sum to 180°.", problem: "If angle A is 65 degrees, what is its complement?", solution: "25 degrees (90 - 65 = 25)." },
      { title: "Triangles & The Angle Sum Property", detail: "Interior angles of any triangle always sum to 180°. Equilateral, Isosceles, and Scalene triangles.", problem: "A triangle has angles 50° and 70°. Find the third angle.", solution: "60° (180 - 120 = 60)." },
      { title: "Perimeter and Area of 2D Polygons", detail: "Perimeter is boundary length. Rectangle area = length * width; Square area = side^2; Triangle area = (1/2) * base * height.", problem: "Area of triangle with base 10 cm and height 6 cm?", solution: "30 cm² (1/2 * 10 * 6 = 30)." }
    ],
    questions: [
      { q: "Solve for x: 3x + 9 = 24.", opts: ["3", "5", "7", "9"], ans: 1, exp: "3x = 15 -> x = 5." },
      { q: "What is the sum of interior angles in any triangle?", opts: ["90°", "180°", "270°", "360°"], ans: 1, exp: "Interior angles always sum to 180°." },
      { q: "What type of angle measures 125°?", opts: ["Acute", "Right", "Obtuse", "Reflex"], ans: 2, exp: "Between 90° and 180° is an obtuse angle." },
      { q: "Two angles that sum to 90° are called:", opts: ["Supplementary", "Complementary", "Adjacent", "Vertical"], ans: 1, exp: "Complementary angles sum to 90°." },
      { q: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?", opts: ["13 cm", "26 cm", "40 cm", "80 cm"], ans: 1, exp: "2 * (8 + 5) = 26 cm." },
      { q: "What is the area of a square with side length 7 cm?", opts: ["14 cm²", "28 cm²", "49 cm²", "56 cm²"], ans: 2, exp: "7 * 7 = 49 cm²." },
      { q: "In the expression 5y - 4, what is the variable?", opts: ["5", "y", "-", "4"], ans: 1, exp: "y is the letter representing the variable." },
      { q: "If one angle of a right-angled triangle is 35°, what is the other acute angle?", opts: ["45°", "55°", "65°", "90°"], ans: 1, exp: "90° - 35° = 55°." },
      { q: "What is the area of a triangle with base 12 m and height 5 m?", opts: ["30 m²", "60 m²", "17 m²", "34 m²"], ans: 0, exp: "0.5 * 12 * 5 = 30 m²." },
      { q: "Solve for p: p / 4 = 6.", opts: ["1.5", "10", "20", "24"], ans: 3, exp: "p = 6 * 4 = 24." }
    ]
  },

  // 9. General Science
  {
    slug: "general-science",
    title: "General Science",
    description: "Explore the living world, plant physiology, states of matter, solutions, acids/bases, and the scientific method.",
    category: "Science",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Distinguish living organisms by cellular characteristics", "Explain photosynthesis and plant transpiration", "Describe solid, liquid, gas molecular arrangements", "Test acids and bases using natural indicators", "Apply the scientific inquiry process"],
    prerequisites: ["Curiosity about the natural world"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Living vs Non-Living & Cellular Basis", detail: "Cells as structural units. Reproduction, metabolism, response to stimuli.", problem: "What is the basic unit of life?", solution: "The cell." },
      { title: "Plant Physiology & Photosynthesis", detail: "6CO2 + 6H2O + Sunlight -> C6H12O6 + 6O2 via chlorophyll in leaves.", problem: "What gas do plants release during photosynthesis?", solution: "Oxygen (O2)." },
      { title: "States of Matter & Phase Transitions", detail: "Solids (fixed shape/vol), Liquids (fixed vol), Gases (no fixed shape/vol). Melting, boiling, condensation.", problem: "What phase change is liquid to gas?", solution: "Evaporation / Boiling." },
      { title: "Acids, Bases & Natural Indicators", detail: "Acids taste sour (pH < 7); bases taste bitter/soapy (pH > 7). Litmus and turmeric indicators.", problem: "What color does turmeric turn in base (soap)?", solution: "Reddish-brown." },
      { title: "The Scientific Method & Experimentation", detail: "Observation -> Hypothesis -> Experiment -> Analysis -> Conclusion.", problem: "What is a hypothesis?", solution: "A testable prediction or explanation." }
    ],
    questions: [
      { q: "What is the green pigment essential for photosynthesis?", opts: ["Hemoglobin", "Chlorophyll", "Carotene", "Melanin"], ans: 1, exp: "Chlorophyll captures sunlight energy in chloroplasts." },
      { q: "What state of matter has neither fixed shape nor fixed volume?", opts: ["Solid", "Liquid", "Gas", "Crystal"], ans: 2, exp: "Gases expand to fill any container." },
      { q: "What is the pH of pure water?", opts: ["0", "7 (Neutral)", "14", "1"], ans: 1, exp: "Pure water has a neutral pH of 7." },
      { q: "What gas do plants absorb for photosynthesis?", opts: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"], ans: 1, exp: "Plants take in CO2 from the atmosphere." },
      { q: "Which natural indicator turns reddish in soapy water?", opts: ["Turmeric", "Salt", "Sugar", "Charcoal"], ans: 0, exp: "Turmeric changes from yellow to red in basic solutions." },
      { q: "What is the process of liquid turning to solid?", opts: ["Melting", "Freezing", "Boiling", "Sublimation"], ans: 1, exp: "Freezing converts liquid into solid." },
      { q: "Which organelle is the basic unit of life in all organisms?", opts: ["Atom", "Cell", "Molecule", "Organ"], ans: 1, exp: "The cell is the structural and functional unit of life." },
      { q: "What type of acid is present in lemons?", opts: ["Hydrochloric acid", "Citric acid", "Sulfuric acid", "Acetic acid"], ans: 1, exp: "Citrus fruits contain citric acid." },
      { q: "What is the first step in the scientific method?", opts: ["Draw conclusions", "Make observations / ask a question", "Publish report", "Reject hypothesis"], ans: 1, exp: "Observation triggers scientific inquiry." },
      { q: "What tiny pores on leaves allow gas exchange?", opts: ["Stomata", "Chloroplasts", "Xylem", "Roots"], ans: 0, exp: "Stomata regulate CO2 intake and O2 release." }
    ]
  },

  // 10. Physics in Everyday Life
  {
    slug: "physics-everyday-life",
    title: "Physics in Everyday Life",
    description: "Understand forces, friction, simple machines, light reflection, shadows, heat transfer, and sound vibrations around us.",
    category: "Science",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Classify contact and non-contact forces", "Explain friction and how to increase/decrease it", "Identify levers, pulleys, and inclined planes", "Explain reflection, refraction, and shadow formation", "Differentiate conduction, convection, and radiation"],
    prerequisites: ["Curiosity about physical phenomena"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Forces: Push, Pull & Gravity", detail: "Contact forces (muscular, friction) vs Non-contact (gravity, magnetism, electrostatic). Unit: Newton (N).", problem: "Is gravity a contact or non-contact force?", solution: "Non-contact force." },
      { title: "Friction: Friend and Foe", detail: "Friction resists relative motion. Useful for walking and braking; wasteful in machinery wear. Lubricants decrease friction.", problem: "Why do car tires have treads?", solution: "To increase friction and prevent slipping." },
      { title: "Simple Machines: Levers, Pulleys & Inclined Planes", detail: "Machines provide mechanical advantage. Effort, Fulcrum, Load in Class 1, 2, 3 levers.", problem: "What class of lever is a seesaw (fulcrum in middle)?", solution: "Class 1 lever." },
      { title: "Light: Rectilinear Propagation & Reflection", detail: "Light travels in straight lines. Law of reflection: Angle of incidence = Angle of reflection.", problem: "If angle of incidence is 40 degrees, what is angle of reflection?", solution: "40 degrees." },
      { title: "Heat Transfer: Conduction, Convection & Radiation", detail: "Conduction (solids), Convection (fluids), Radiation (electromagnetic waves through vacuum from Sun).", problem: "How does heat from the Sun reach Earth?", solution: "Radiation (travels through empty space)." }
    ],
    questions: [
      { q: "What is the SI unit of force?", opts: ["Joule", "Newton", "Watt", "Pascal"], ans: 1, exp: "Force is measured in Newtons (N)." },
      { q: "Which of the following is a non-contact force?", opts: ["Friction", "Muscular force", "Gravitational force", "Tension"], ans: 2, exp: "Gravity acts across space without contact." },
      { q: "What substance is applied to machine parts to reduce friction?", opts: ["Sand", "Lubricant / Oil", "Water", "Glue"], ans: 1, exp: "Lubricants form a smooth layer reducing friction." },
      { q: "According to the law of reflection, angle of incidence is:", opts: ["Greater than angle of reflection", "Equal to angle of reflection", "Always 90°", "Half of angle of reflection"], ans: 1, exp: "Angle of incidence equals angle of reflection." },
      { q: "Through which mode does heat travel in a metal rod?", opts: ["Radiation", "Convection", "Conduction", "Evaporation"], ans: 2, exp: "Conduction transfers heat through direct solid contact." },
      { q: "A ramp used to roll heavy boxes into a truck is an example of:", opts: ["Pulley", "Inclined plane", "Wedge", "Screw"], ans: 1, exp: "An inclined plane reduces required lifting force." },
      { q: "Why do shadows form?", opts: ["Light bends around corners", "Light travels in straight lines and is blocked by opaque objects", "Light is absorbed by air", "Mirrors absorb light"], ans: 1, exp: "Straight-line propagation causes shadows behind opaque objects." },
      { q: "What type of surface produces clear specular reflection?", opts: ["Rough wall", "Smooth flat mirror", "Wood table", "Fabric"], ans: 1, exp: "Smooth reflective surfaces produce sharp images." },
      { q: "How is sound produced?", opts: ["By heating objects", "By mechanical vibrations of matter", "By magnetic fields", "By sunlight"], ans: 1, exp: "Vibrations in matter produce sound waves." },
      { q: "Can sound travel through a complete vacuum?", opts: ["Yes, very fast", "No, it requires a material medium", "Only in space", "Yes, at speed of light"], ans: 1, exp: "Sound is a mechanical wave requiring a medium." }
    ]
  },

  // 11. Biology and the Human Body
  {
    slug: "biology-human-body",
    title: "Biology and the Human Body",
    description: "Explore the human digestive, circulatory, respiratory, nervous, and skeletal systems, along with nutrition and personal hygiene.",
    category: "Science",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Map the path of food through the digestive system", "Trace blood flow through the heart and blood vessels", "Explain gas exchange in the alveoli of lungs", "Identify the brain, spinal cord, and sensory nerves", "Recognize nutritional deficiency diseases"],
    prerequisites: ["General Science fundamentals"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Digestive System: Journey of Food", detail: "Mouth (salivary amylase) -> Esophagus -> Stomach (HCl, pepsin) -> Small intestine (nutrient absorption) -> Large intestine (water absorption).", problem: "Where does major nutrient absorption occur?", solution: "Small intestine." },
      { title: "Circulatory System: Heart & Blood Vessels", detail: "4 chambers: right/left atria and ventricles. Arteries carry oxygenated blood away; veins carry deoxygenated blood to heart.", problem: "Which blood vessels have thick elastic walls?", solution: "Arteries." },
      { title: "Respiratory System: Lungs & Gas Exchange", detail: "Trachea -> Bronchi -> Alveoli. Oxygen diffuses into capillaries; CO2 diffuses out.", problem: "Where does oxygen enter the blood in lungs?", solution: "Alveoli (microscopic air sacs)." },
      { title: "Nervous System & Sense Organs", detail: "Central Nervous System (Brain + Spinal Cord) and Peripheral Nerves. Neurons transmit electrical impulses.", problem: "What is the control center of the nervous system?", solution: "The Brain." },
      { title: "Nutrition, Vitamins & Disease Prevention", detail: "Carbohydrates, proteins, fats, vitamins (A, B, C, D), minerals (iron, calcium). Deficiencies: Scurvy (C), Rickets (D), Anemia (Iron).", problem: "Lack of Vitamin C causes which deficiency?", solution: "Scurvy." }
    ],
    questions: [
      { q: "In which organ is digestion and nutrient absorption completed?", opts: ["Stomach", "Small intestine", "Large intestine", "Esophagus"], ans: 1, exp: "Small intestine finishes digestion and absorbs nutrients into blood." },
      { q: "How many chambers are in the human heart?", opts: ["2", "3", "4", "6"], ans: 2, exp: "The human heart has 4 chambers (2 atria, 2 ventricles)." },
      { q: "Which blood vessels carry blood away from the heart under high pressure?", opts: ["Veins", "Arteries", "Capillaries", "Lymphatics"], ans: 1, exp: "Arteries carry blood away from the heart." },
      { q: "What microscopic sacs in the lungs facilitate gas exchange?", opts: ["Bronchioles", "Alveoli", "Trachea", "Larynx"], ans: 1, exp: "Alveoli provide surface area for O2 and CO2 diffusion." },
      { q: "What is the structural and functional unit of the nervous system?", opts: ["Nephron", "Neuron", "Alveolus", "Villi"], ans: 1, exp: "Neurons transmit nerve impulses." },
      { q: "Deficiency of Vitamin D causes which disease in children?", opts: ["Scurvy", "Beriberi", "Rickets", "Anemia"], ans: 2, exp: "Vitamin D deficiency leads to weakened bones (Rickets)." },
      { q: "Which mineral is required for hemoglobin formation in red blood cells?", opts: ["Calcium", "Iron", "Iodine", "Sodium"], ans: 1, exp: "Iron is essential to build oxygen-carrying hemoglobin." },
      { q: "What acid is secreted in the human stomach to kill bacteria and aid protein digestion?", opts: ["Sulfuric acid", "Hydrochloric acid (HCl)", "Nitric acid", "Citric acid"], ans: 1, exp: "Gastric juice contains HCl." },
      { q: "What muscle contracts and flattens to cause inhalation?", opts: ["Heart", "Diaphragm", "Biceps", "Stomach"], ans: 1, exp: "The diaphragm contracts downward during inhalation." },
      { q: "Which part of the brain controls balance and voluntary muscle coordination?", opts: ["Cerebrum", "Cerebellum", "Medulla", "Spinal cord"], ans: 1, exp: "The cerebellum coordinates motor balance and posture." }
    ]
  },

  // 12. Environmental Science
  {
    slug: "environmental-science",
    title: "Environmental Science",
    description: "Learn about ecosystems, food chains, the water cycle, biodiversity conservation, waste management (3Rs), and climate action.",
    category: "Science",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Map food chains and energy pyramids", "Explain the hydrologic and carbon cycles", "Apply the 3Rs (Reduce, Reuse, Recycle) to plastic waste", "Identify causes of air, water, and soil pollution", "Propose community actions for environmental conservation"],
    prerequisites: ["General Science"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Ecosystems, Food Chains & Webs", detail: "Producers (plants), Consumers (herbivores, carnivores), Decomposers (bacteria, fungi). 10% energy transfer rule.", problem: "What organism is at the base of every food chain?", solution: "Producers (autotrophs / green plants)." },
      { title: "The Water & Carbon Cycles", detail: "Evaporation, transpiration, condensation, precipitation, groundwater infiltration.", problem: "What process releases water vapor from plant leaves?", solution: "Transpiration." },
      { title: "Pollution: Causes, Effects & Solutions", detail: "Air pollution (smog, greenhouse gases), Water pollution (sewage, industrial effluent), Soil degradation.", problem: "What gas is the primary contributor to global warming?", solution: "Carbon dioxide (CO2)." },
      { title: "Solid Waste Management & The 3Rs", detail: "Reduce consumption, Reuse items, Recycle materials. Segregating biodegradable vs non-biodegradable waste.", problem: "Name the 3Rs of waste management.", solution: "Reduce, Reuse, Recycle." },
      { title: "Biodiversity & Renewable Energy", detail: "Wildlife conservation, national parks, solar energy, wind energy, reducing carbon footprints.", problem: "Name two renewable energy sources.", solution: "Solar energy and wind energy." }
    ],
    questions: [
      { q: "In a food chain, what role do green plants play?", opts: ["Consumers", "Producers", "Decomposers", "Parasites"], ans: 1, exp: "Green plants produce organic energy via photosynthesis." },
      { q: "What percentage of energy is typically transferred from one trophic level to the next?", opts: ["1%", "10%", "50%", "90%"], ans: 1, exp: "According to Lindeman's rule, approximately 10% is transferred." },
      { q: "What is the process where water vapor cools and turns into liquid clouds?", opts: ["Evaporation", "Condensation", "Precipitation", "Transpiration"], ans: 1, exp: "Condensation converts vapor to liquid droplets." },
      { q: "Which of the following is biodegradable waste?", opts: ["Plastic bag", "Banana peel", "Glass bottle", "Styrofoam cup"], ans: 1, exp: "Banana peels decompose naturally by microbial action." },
      { q: "What does the 'R' in the 3Rs stand for?", opts: ["React, Recover, Reverse", "Reduce, Reuse, Recycle", "Refuse, Reject, Return", "Retire, Rebuild, Rest"], ans: 1, exp: "The 3Rs are Reduce, Reuse, Recycle." },
      { q: "What is an example of an inexhaustible renewable resource?", opts: ["Coal", "Petroleum", "Solar energy", "Natural gas"], ans: 2, exp: "Sunlight is replenished continuously." },
      { q: "Excessive algae growth in water bodies due to fertilizer runoff is called:", opts: ["Photosynthesis", "Eutrophication", "Distillation", "Salinization"], ans: 1, exp: "Eutrophication depletes dissolved oxygen." },
      { q: "Which gas in the upper atmosphere shields Earth from harmful UV rays?", opts: ["Carbon dioxide", "Oxygen", "Ozone (O3)", "Methane"], ans: 2, exp: "The ozone layer absorbs dangerous ultraviolet radiation." },
      { q: "What is the loss of water vapor through microscopic plant pores called?", opts: ["Respiration", "Transpiration", "Precipitation", "Condensation"], ans: 1, exp: "Transpiration releases water from leaves." },
      { q: "What is the primary human driver of deforestation?", opts: ["Solar farms", "Agricultural expansion and logging", "Planting gardens", "Rooftop rainwater harvesting"], ans: 1, exp: "Land clearing for farming and timber drives forest loss." }
    ]
  },

  // 13. Computer Fundamentals
  {
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    description: "Understand computer hardware, CPU, RAM, storage, operating systems, binary numbers, and file management.",
    category: "Computer Science",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Differentiate input, processing, output, and storage devices", "Explain the role of the CPU, RAM, and SSD/Hard Drive", "Convert numbers between binary (base-2) and decimal (base-10)", "Navigate an operating system file hierarchy", "Use common keyboard shortcuts for productivity"],
    prerequisites: ["Curiosity about computers and technology"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Hardware vs Software & Computer Architecture", detail: "Input (keyboard, mouse) -> Processing (CPU) -> Output (monitor, printer) -> Storage (SSD, HDD).", problem: "Is a mouse an input or output device?", solution: "Input device." },
      { title: "The CPU & Memory Hierarchy (RAM vs Storage)", detail: "CPU (Central Processing Unit = brain). RAM (volatile temporary memory). Storage (non-volatile permanent data).", problem: "What happens to data in RAM when computer is turned off?", solution: "It is erased (RAM is volatile)." },
      { title: "Introduction to Binary (0s and 1s)", detail: "Computers use binary switches (transistors on/off). Base-2 positional values: 8, 4, 2, 1. Binary 1010 = 8 + 2 = 10.", problem: "Convert binary 110 to decimal.", solution: "6 (4 + 2 + 0 = 6)." },
      { title: "Operating Systems & File Management", detail: "Role of OS (Windows, Linux, Android). Files, folders, extensions (.txt, .docx, .png, .pdf). Path hierarchy.", problem: "What type of file is document.pdf?", solution: "Portable Document Format (PDF)." },
      { title: "Essential Keyboard Shortcuts & Typing", detail: "Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo), Ctrl+S (Save), Alt+Tab (Switch app). Home row touch typing.", problem: "Shortcut to save a file?", solution: "Ctrl + S." }
    ],
    questions: [
      { q: "What component is known as the 'brain' of the computer?", opts: ["Monitor", "RAM", "CPU (Central Processing Unit)", "Power supply"], ans: 2, exp: "The CPU executes instructions and controls processing." },
      { q: "Which of the following is volatile memory?", opts: ["Hard drive", "RAM", "USB flash drive", "ROM"], ans: 1, exp: "RAM loses its contents when power is turned off." },
      { q: "What is 1 Byte equivalent to?", opts: ["4 bits", "8 bits", "16 bits", "1024 bits"], ans: 1, exp: "1 Byte consists of 8 binary digits (bits)." },
      { q: "Convert binary 1001 to decimal:", opts: ["7", "8", "9", "10"], ans: 2, exp: "8 + 0 + 0 + 1 = 9." },
      { q: "Which of the following is an output device?", opts: ["Microphone", "Keyboard", "Barcode scanner", "Monitor"], ans: 3, exp: "A monitor displays visual output to the user." },
      { q: "What is the main software that manages computer hardware and applications?", opts: ["Web browser", "Operating System", "Antivirus", "Spreadsheet"], ans: 1, exp: "The Operating System manages hardware resources and software execution." },
      { q: "What is the standard shortcut to undo an accidental change?", opts: ["Ctrl + C", "Ctrl + Z", "Ctrl + P", "Ctrl + V"], ans: 1, exp: "Ctrl + Z is the universal undo command." },
      { q: "Which file extension denotes an image file?", opts: [".mp3", ".png", ".exe", ".docx"], ans: 1, exp: ".png is an image format (Portable Network Graphics)." },
      { q: "What does 1 Kilobyte (KB) represent in binary storage?", opts: ["100 bytes", "1000 bytes", "1024 bytes", "10000 bytes"], ans: 2, exp: "1 KB equals 2^10 = 1024 bytes." },
      { q: "Which device is used for non-volatile, long-term storage?", opts: ["RAM", "SSD / Hard Disk", "Cache", "Register"], ans: 1, exp: "SSDs and hard drives retain data permanently without power." }
    ]
  },

  // 14. Digital Literacy and Internet Safety
  {
    slug: "digital-literacy-internet-safety",
    title: "Digital Literacy and Internet Safety",
    description: "Navigate the web safely, protect personal privacy, recognize phishing, prevent cyberbullying, and verify online information.",
    category: "Computer Science",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Use search engines with boolean operators", "Create resilient passwords and manage credentials", "Spot phishing scams and malicious links", "Practice positive digital citizenship and anti-cyberbullying", "Identify trustworthy vs fake information online"],
    prerequisites: ["Computer Fundamentals"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "How the Internet Works & Effective Searching", detail: "Web browsers vs Search engines. Using quotes for exact phrase searches and minus (-) to exclude words.", problem: "How do you search for the exact phrase 'climate change'?", solution: "Put quotation marks around it: \"climate change\"." },
      { title: "Password Strength & Account Security", detail: "Creating strong passphrases (12+ characters with symbols). Never sharing passwords. Two-Factor Authentication (2FA).", problem: "Why is 'password123' dangerous?", solution: "It is predictable, short, and easily guessed by automated tools." },
      { title: "Phishing Scams & Fake Links", detail: "Phishing emails pretending to be banks or schools. Checking sender domain, suspicious attachments, and urgent threats.", problem: "An email says 'Click here urgently to win a free laptop'. What should you do?", solution: "Do not click; delete or report as phishing scam." },
      { title: "Cyberbullying Prevention & Digital Footprints", detail: "What you post online stays forever (digital footprint). Being kind online, reporting harassment, blocking abusive users.", problem: "What should you do if someone bullies you online?", solution: "Do not reply, save screenshots, block the user, and inform a parent or teacher." },
      { title: "Spotting Fake News & Evaluating Sources", detail: "Checking author credentials, publication dates, cross-referencing with reputable news outlets, reverse image searches.", problem: "Why should you check the publication date of an online article?", solution: "Information may be outdated or superseded by new facts." }
    ],
    questions: [
      { q: "What symbol in the browser address bar indicates an encrypted HTTPS connection?", opts: ["Red cross", "Padlock icon", "Dollar sign", "Question mark"], ans: 1, exp: "A padlock indicates secure SSL/TLS encryption." },
      { q: "Which of the following is the strongest password?", opts: ["12345678", "qwerty", "Blue$ky#2026!River", "mypassword"], ans: 2, exp: "Long passphrase with mixed case, numbers, and symbols is strongest." },
      { q: "What is 'phishing' in cybersecurity?", opts: ["Catching fish with a net", "Deceptive attempts to trick users into revealing sensitive credentials", "Updating software", "Speeding up internet"], ans: 1, exp: "Phishing fraudulently solicits private data." },
      { q: "What should you never share with strangers online?", opts: ["Your favorite color", "Your home address, passwords, and phone number", "Your favorite animal", "Your school subject"], ans: 1, exp: "Personal identifying information must remain private." },
      { q: "What is a 'digital footprint'?", opts: ["A computer mouse pad", "The permanent trail of data left by your online activities", "A shoe store website", "A printed document"], ans: 1, exp: "Your online posts and browsing create a digital footprint." },
      { q: "If you receive a suspicious message asking for an OTP, what should you do?", opts: ["Share the OTP immediately", "Never share the OTP with anyone", "Post the OTP on social media", "Send it to friends"], ans: 1, exp: "OTPs are confidential and should never be shared." },
      { q: "How can you search for an exact match phrase on Google?", opts: ["Put the words in quotation marks \"...\"", "Use capital letters only", "Add question marks", "Write backwards"], ans: 0, exp: "Quotation marks enforce exact phrase search." },
      { q: "What does 2FA stand for?", opts: ["Two-Factor Authentication", "Two Fast Actions", "Total File Access", "Twice Final Answer"], ans: 0, exp: "2FA adds a second verification step to passwords." },
      { q: "What is an effective response to cyberbullying?", opts: ["Insult them back", "Block the harasser and report to a trusted adult", "Delete all accounts and hide", "Share passwords"], ans: 1, exp: "Blocking and reporting protects your safety." },
      { q: "Before sharing news on social media, you should:", opts: ["Share it immediately without reading", "Verify the credibility of the source and facts", "Add more dramatic words", "Assume it is true"], ans: 1, exp: "Fact-checking prevents the spread of misinformation." }
    ]
  },

  // 15. Introduction to Coding with Scratch
  {
    slug: "intro-coding-scratch",
    title: "Introduction to Coding with Scratch",
    description: "Learn fundamental computer programming concepts visually: sprites, event triggers, loops, variables, and conditional broadcasts.",
    category: "Coding & Technology",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Create animated characters (sprites) and backdrops", "Use 'when green flag clicked' event triggers", "Build repetition using 'repeat' and 'forever' loops", "Implement decision making with 'if-then' blocks", "Create an interactive maze or catching game"],
    prerequisites: ["Basic computer usage"],
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Scratch Interface, Sprites & Coordinates", detail: "Stage, Sprite list, Block palette. (X, Y) coordinate system: Center is (0,0), X goes -240 to +240, Y goes -180 to +180.", problem: "Where is coordinate (0, 0) on the Scratch stage?", solution: "Directly in the center of the stage." },
      { title: "Events & Motion Blocks", detail: "'When green flag clicked', 'when key pressed', 'move 10 steps', 'turn 15 degrees', 'point in direction'.", problem: "Which block starts a program when the user presses spacebar?", solution: "'when space key pressed' event block." },
      { title: "Loops: Repeat vs Forever", detail: "Sequence vs Repetition. 'repeat 10' for fixed repetitions; 'forever' for continuous game loops.", problem: "Which loop runs continuously until the game stops?", solution: "'forever' loop block." },
      { title: "Conditionals & Sensing Blocks (If-Then)", detail: "'if touching mouse-pointer then', 'if on edge, bounce', Boolean logic (true/false).", problem: "How do you make a sprite bounce off screen borders?", solution: "'if on edge, bounce' block." },
      { title: "Variables & Creating a Catching Game", detail: "Making a 'Score' variable, 'change score by 1', broadcasting messages between sprites.", problem: "What block increases a score variable by 1?", solution: "'change [Score] by 1' block." }
    ],
    questions: [
      { q: "What is a character or graphic object called in Scratch?", opts: ["Script", "Sprite", "Block", "Stage"], ans: 1, exp: "Objects programmed in Scratch are called Sprites." },
      { q: "What are the X and Y coordinates of the center of the Scratch stage?", opts: ["(100, 100)", "(0, 0)", "(240, 180)", "(-100, -100)"], ans: 1, exp: "(0, 0) is the exact center of the stage." },
      { q: "Which color category represents 'Events' in Scratch?", opts: ["Blue (Motion)", "Yellow (Events)", "Orange (Variables)", "Purple (Looks)"], ans: 1, exp: "Yellow blocks contain event triggers." },
      { q: "What block is used to repeat code forever during a game?", opts: ["repeat 10", "forever", "repeat until", "stop all"], ans: 1, exp: "'forever' creates an infinite game loop." },
      { q: "What is the purpose of a 'Variable' in coding?", opts: ["To change the background color", "To store and track changing data like scores or lives", "To delete the sprite", "To play music"], ans: 1, exp: "Variables store data values that can change." },
      { q: "What happens when an 'if-then' condition evaluates to false?", opts: ["The program crashes", "The code inside the block is skipped", "The sprite disappears", "The computer restarts"], ans: 1, exp: "False conditions cause the enclosed block to be skipped." },
      { q: "Which block checks if two sprites collide?", opts: ["mouse down?", "touching [Sprite]?", "key space pressed?", "color is touching?"], ans: 1, exp: "'touching [Sprite]?' detects collision." },
      { q: "What happens when you broadcast a message in Scratch?", opts: ["It sends a radio signal", "Other sprites listening with 'when I receive' execute code", "The project is deleted", "Audio plays"], ans: 1, exp: "Broadcasts enable communication between sprites." },
      { q: "What block moves a sprite 10 units forward in its current direction?", opts: ["turn 15 degrees", "move 10 steps", "go to x:0 y:0", "change x by 10"], ans: 1, exp: "'move 10 steps' moves forward in current heading." },
      { q: "Who developed Scratch to teach programming visually to students?", opts: ["Google", "MIT Media Lab", "Microsoft", "Apple"], ans: 1, exp: "Scratch was created by the Lifelong Kindergarten Group at MIT Media Lab." }
    ]
  },

  // 16. Logical Reasoning and Problem Solving
  {
    slug: "logical-reasoning-problem-solving",
    title: "Logical Reasoning and Problem Solving",
    description: "Develop sharp analytical thinking, number series deduction, pattern recognition, syllogisms, and Venn diagram logic.",
    category: "Aptitude & Logic",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Identify arithmetic and geometric sequence patterns", "Solve analogy and odd-one-out puzzles", "Deduce relationships using Venn diagrams", "Analyze blood relations and directional movements", "Apply systematic trial and elimination strategies"],
    prerequisites: ["Mathematics Fundamentals"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Number & Letter Series Patterns", detail: "Arithmetic differences (+3, +5, +7), squares (1, 4, 9, 16, 25), alternating patterns.", problem: "Find next in sequence: 2, 5, 10, 17, 26, ___.", solution: "37 (Differences are +3, +5, +7, +9, +11: 26 + 11 = 37)." },
      { title: "Analogies & Odd-One-Out Deductions", detail: "A is to B as C is to D. Relationships: Part to whole, tool to user, cause to effect.", problem: "Doctor : Stethoscope :: Painter : _____?", solution: "Brush / Palette." },
      { title: "Venn Diagrams & Set Relationships", detail: "Overlapping circles showing common properties (e.g. Birds, Aquatic, Flying).", problem: "Do all mammals lay eggs?", solution: "No, most give birth to live young (with exceptions like platypus)." },
      { title: "Directions & Positional Sense", detail: "North, South, East, West. Left and right turns with degree angles.", problem: "Walk 10m North, turn right, walk 5m. In what direction are you facing?", solution: "East." },
      { title: "Coding-Decoding & Cipher Puzzles", detail: "Letter shifting (Caesar ciphers): CAT -> DBU (shift +1).", problem: "If PEN is coded as QFO, how is CUP coded?", solution: "DVQ (each letter +1)." }
    ],
    questions: [
      { q: "What is the next number: 3, 6, 12, 24, ___?", opts: ["30", "36", "48", "60"], ans: 2, exp: "Each number doubles: 24 * 2 = 48." },
      { q: "Book : Reading :: Fork : _____?", opts: ["Writing", "Eating", "Sleeping", "Driving"], ans: 1, exp: "A book is for reading; a fork is for eating." },
      { q: "Which word does not belong: Apple, Banana, Potato, Orange?", opts: ["Apple", "Banana", "Potato", "Orange"], ans: 2, exp: "Potato is a vegetable/tuber; others are fruits." },
      { q: "If A = 1, B = 2, C = 3, what is the value of DOG?", opts: ["23", "26", "27", "30"], ans: 1, exp: "D(4) + O(15) + G(7) = 26." },
      { q: "A person faces North and turns 90° clockwise. Which direction is this?", opts: ["West", "South", "East", "North-East"], ans: 2, exp: "90° clockwise from North is East." },
      { q: "Complete series: 1, 4, 9, 16, 25, ___?", opts: ["30", "36", "42", "49"], ans: 1, exp: "These are squares: 6^2 = 36." },
      { q: "If all Roses are Flowers, and all Flowers need Water, do all Roses need Water?", opts: ["No", "Yes", "Only in summer", "Cannot tell"], ans: 1, exp: "By syllogistic transitive property, yes." },
      { q: "Pen is to Write as Knife is to:", opts: ["Sew", "Cut", "Paint", "Glue"], ans: 1, exp: "Knife is a tool used to cut." },
      { q: "Pointing to a man, Ravi said 'He is my father's only son'. Who is the man?", opts: ["Ravi's brother", "Ravi himself", "Ravi's uncle", "Ravi's father"], ans: 1, exp: "The father's only son is Ravi himself." },
      { q: "Find the odd one out: 11, 13, 15, 17.", opts: ["11", "13", "15", "17"], ans: 2, exp: "15 is a composite number (3*5); the others are prime." }
    ]
  },

  // 17. Financial Literacy and Money Management
  {
    slug: "financial-literacy-money",
    title: "Financial Literacy and Money Management",
    description: "Learn practical personal finance: needs vs wants, family budgeting, savings bank accounts, simple interest, inflation, and money safety.",
    category: "Life Skills",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Differentiate essential needs from optional wants", "Construct a simple monthly budget plan", "Understand bank savings accounts and passbooks", "Calculate simple interest on savings", "Protect money from fraud and impulse purchases"],
    prerequisites: ["Mathematics Fundamentals"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Needs vs Wants & Smart Spending", detail: "Needs: Food, shelter, basic clothing, education, medicine. Wants: Video games, luxury clothes, branded snacks. Delayed gratification.", problem: "Classify: Is a school uniform a need or a want?", solution: "Need." },
      { title: "Creating a Personal / Family Budget", detail: "Income - Expenses = Savings. The 50/30/20 budget framework adapted for students.", problem: "If pocket money is Rs. 200 and you save Rs. 50, how much did you spend?", solution: "Rs. 150." },
      { title: "How Banks Work & Savings Accounts", detail: "Depositing money safely, bank passbooks, account numbers, debit cards, ATM safety.", problem: "Why should you never share your debit card PIN?", solution: "Anyone with your PIN can withdraw your money without permission." },
      { title: "Simple Interest & Growing Money", detail: "Formula: I = (P * R * T) / 100. Principal (P), Rate of interest (R%), Time in years (T).", problem: "Calculate interest on Rs. 1000 at 5% for 2 years.", solution: "Rs. 100 ((1000 * 5 * 2) / 100 = 100)." },
      { title: "Inflation & Wise Purchasing Choices", detail: "Inflation is the gradual rise in prices over time. Comparing unit prices when shopping.", problem: "Packet A is 500g for Rs. 50; Packet B is 1kg for Rs. 90. Which is cheaper per gram?", solution: "Packet B (Rs. 90/kg vs Rs. 100/kg)." }
    ],
    questions: [
      { q: "Which of the following is considered an essential need?", opts: ["Designer sunglasses", "Nutritious food", "Video game console", "Fast food delivery"], ans: 1, exp: "Nutritious food is necessary for survival." },
      { q: "What is the formula for Simple Interest?", opts: ["P + R + T", "(P * R * T) / 100", "P * (1 + R)^T", "P / (R * T)"], ans: 1, exp: "Simple Interest = (P * R * T) / 100." },
      { q: "What does a bank passbook record?", opts: ["Shopping wishlists", "Record of all deposits, withdrawals, and balance", "Teacher notes", "Exam marks"], ans: 1, exp: "Passbooks record account financial transactions." },
      { q: "What does PIN stand for in banking?", opts: ["Public Internet Number", "Personal Identification Number", "Private Instant Note", "Primary Input Name"], ans: 1, exp: "PIN is Personal Identification Number." },
      { q: "If you save Rs. 20 every week, how much will you save in 10 weeks?", opts: ["Rs. 100", "Rs. 200", "Rs. 250", "Rs. 300"], ans: 1, exp: "20 * 10 = Rs. 200." },
      { q: "What is inflation?", opts: ["Decrease in prices of all goods", "The general increase in prices over time reducing purchasing power", "Free money from banks", "Currency printing rate"], ans: 1, exp: "Inflation reduces how much you can buy with the same money." },
      { q: "Calculate interest on Rs. 2000 at 6% per annum for 1 year:", opts: ["Rs. 60", "Rs. 120", "Rs. 180", "Rs. 240"], ans: 1, exp: "(2000 * 6 * 1) / 100 = Rs. 120." },
      { q: "What is an emergency fund?", opts: ["Money kept for video games", "Savings set aside strictly for unexpected medical or urgent expenses", "Pocket money for sweets", "Loan borrowed from friends"], ans: 1, exp: "Emergency funds safeguard against unforeseen crises." },
      { q: "What is delayed gratification?", opts: ["Resisting an immediate reward to obtain a better future outcome", "Spending money as soon as you earn it", "Borrowing money immediately", "Throwing away savings"], ans: 0, exp: "Delayed gratification builds long-term wealth." },
      { q: "Why do banks pay interest on savings deposits?", opts: ["As a punishment", "To compensate customers for using their deposits to fund loans", "By mistake", "Because of tax"], ans: 1, exp: "Banks use deposits to lend and reward savers with interest." }
    ]
  },

  // 18. Study Skills and Learning Techniques
  {
    slug: "study-skills-learning-techniques",
    title: "Study Skills and Learning Techniques",
    description: "Learn proven cognitive science study techniques: Pomodoro timer, Cornell note-taking, active recall, spaced repetition, and exam calm.",
    category: "Life Skills",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    objectives: ["Implement the 25-minute Pomodoro study method", "Take structured Cornell notes during lectures and reading", "Use Active Recall instead of passive re-reading", "Apply Spaced Repetition flashcards for long-term retention", "Manage exam anxiety through planning and breathing exercises"],
    prerequisites: ["Enthusiasm to study smarter, not just longer"],
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The Pomodoro Technique & Beating Procrastination", detail: "25 minutes intense focus, 5 minutes rest. After 4 cycles, take a longer 20-minute break. Eliminating phone distractions.", problem: "How long is a standard Pomodoro study interval?", solution: "25 minutes." },
      { title: "The Cornell Note-Taking System", detail: "Divide page into 3 sections: Notes column (right), Cue/Questions column (left), Summary section (bottom).", problem: "What goes in the bottom section of a Cornell page?", solution: "A 2-3 sentence summary of the lesson." },
      { title: "Active Recall vs Passive Re-reading", detail: "Passive re-reading creates an illusion of competence. Active recall tests yourself by closing the book and retrieving information.", problem: "Which is more effective: reading notes 5 times or testing yourself once?", solution: "Testing yourself (active retrieval)." },
      { title: "Spaced Repetition & The Forgetting Curve", detail: "Ebbinghaus forgetting curve. Reviewing on Day 1, Day 3, Day 7, Day 14, Day 30 transfers memories to long-term storage.", problem: "Why is cramming before an exam ineffective long-term?", solution: "Information rapidly fades without spaced intervals." },
      { title: "Exam Preparation & Managing Stress", detail: "Creating a revision timetable, proper sleep (8 hours), hydration, deep belly breathing to calm test anxiety.", problem: "How many hours of sleep are recommended before an exam?", solution: "7 to 8 hours." }
    ],
    questions: [
      { q: "What is the standard focus duration in the Pomodoro technique?", opts: ["10 minutes", "25 minutes", "60 minutes", "2 hours"], ans: 1, exp: "Standard Pomodoro interval is 25 minutes." },
      { q: "What is 'Active Recall'?", opts: ["Highlighting sentences with colored pens", "Reading a chapter repeatedly", "Testing yourself to retrieve information from memory without looking", "Listening to background music"], ans: 2, exp: "Active recall forces the brain to retrieve information." },
      { q: "In the Cornell note-taking method, where is the summary written?", opts: ["Top right corner", "In the left margin", "At the bottom of the page", "On the back of the book"], ans: 2, exp: "The summary section sits at the bottom of the page." },
      { q: "What is the 'Feynman Technique'?", opts: ["Memorizing complex words", "Explaining a concept in simple language as if teaching a child", "Writing formulas 100 times", "Reading only the glossary"], ans: 1, exp: "Feynman technique tests comprehension through simple teaching." },
      { q: "What does the Ebbinghaus forgetting curve demonstrate?", opts: ["Memory gets stronger automatically", "Information is rapidly forgotten unless reviewed at spaced intervals", "Computers forget data", "Sleep is unnecessary"], ans: 1, exp: "Without review, memory decays rapidly over time." },
      { q: "Why is cramming all night before an exam counter-productive?", opts: ["It causes fatigue, poor memory retrieval, and reduced focus", "It saves time", "It guarantees top ranks", "It improves sleep"], ans: 0, exp: "Sleep deprivation impairs cognitive retrieval." },
      { q: "What should you do during the 5-minute Pomodoro break?", opts: ["Play high-intensity video games", "Stretch, drink water, or rest your eyes", "Start writing an essay", "Skip the break"], ans: 1, exp: "Short restful breaks recharge mental energy." },
      { q: "Which habit creates the 'illusion of competence'?", opts: ["Doing practice quizzes", "Merely highlighting notes without testing comprehension", "Writing flashcards", "Solving past exam papers"], ans: 1, exp: "Passive highlighting feels like studying but yields poor recall." },
      { q: "What is an effective physiological technique to reduce exam panic?", opts: ["Hyperventilating", "Slow, deep diaphragmatic breathing", "Drinking cold soda", "Shouting aloud"], ans: 1, exp: "Deep breathing activates the parasympathetic calming response." },
      { q: "How many Pomodoro cycles are completed before taking a longer break?", opts: ["1", "2", "4", "10"], ans: 2, exp: "A longer 15-30 minute break follows 4 cycles." }
    ]
  }
];
