/**
 * GROUP A (Standards 6–8): 18 Courses
 * Real educational lessons and 10-question assessments for foundational students.
 */

export const groupACourses = [
  // 1. Abacus and Mental Arithmetic
  {
    slug: "abacus-mental-arithmetic",
    title: "Abacus and Mental Arithmetic",
    description: "Build mental arithmetic speed and calculation reflexes using the Soroban abacus and Japanese Anzan visualization techniques.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Understand Soroban abacus structure, heaven beads (5) and earth beads (1)",
      "Perform direct addition and subtraction without formulas",
      "Apply 5-complement (small friends) formulas",
      "Apply 10-complement (big friends) carry-over formulas",
      "Visualize mental beads using the Anzan technique"
    ],
    prerequisites: ["Number counting up to 100"],
    estimatedDuration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Introduction to the Soroban Abacus & Bead Values",
        objective: "Identify the frame, beam, upper deck (heaven beads = 5), and lower deck (earth beads = 1).",
        description: "Learn how the Soroban abacus represents base-10 numbers with upper and lower beads.",
        content: `### 1. Anatomy of the Soroban Abacus
The Soroban consists of an outer rectangular frame and a horizontal dividing beam (reckoning bar).
* **Upper Deck (Heaven):** Each rod has 1 bead representing **5**.
* **Lower Deck (Earth):** Each rod has 4 beads representing **1** each.
* **Active Position:** Beads only count when pushed toward the central beam.

### 2. Reading Numbers
* To represent **3**: Push 3 lower beads up to the beam.
* To represent **5**: Move the upper bead down to the beam.
* To represent **8**: Move the upper bead down (5) and push 3 lower beads up (3). Total: 5 + 3 = 8.`,
        keyTakeaways: ["Heaven bead = 5", "Each earth bead = 1", "Only beads touching the beam count"],
        practiceActivity: {
          instructions: "Calculate the value shown on the unit rod.",
          problem: "The heaven bead is at the beam, and 2 earth beads are pushed up. What number is this?",
          solution: "7 (5 + 2 = 7).",
          hints: ["Upper bead is 5", "Two lower beads are 2"]
        },
        videoUrl: "https://www.youtube-nocookie.com/embed/1vE9Vp6b_5s",
        videoType: "youtube",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Direct Addition and Subtraction",
        objective: "Add and subtract numbers directly without carry-over formulas.",
        description: "Move earth beads with thumb and heaven beads with index finger for direct arithmetic.",
        content: `### Direct Arithmetic Principles
When beads are freely available on the rod, add or subtract directly.
* **Thumb:** Pushes lower beads up (+1 to +4).
* **Index Finger:** Pulls lower beads down (-1 to -4) and moves upper bead up and down.
* Example: $4 + 5 = 9$. Push 4 earth beads up, then move heaven bead down (+5).`,
        keyTakeaways: ["Thumb is for earth beads up", "Index finger is for earth beads down and heaven beads"],
        practiceActivity: {
          instructions: "Solve the direct sequence.",
          problem: "Start at 2. Add 2. Add 5. Subtract 3. What is the result?",
          solution: "6 (2 + 2 = 4; 4 + 5 = 9; 9 - 3 = 6).",
          hints: ["Work step by step on the beads"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 950,
        order: 1,
        isPreview: false
      },
      {
        title: "The 5-Complement (Small Friends) Method",
        objective: "Apply +4 = +5 - 1 and +3 = +5 - 2 when lower beads are insufficient.",
        description: "Learn complementary pairs that sum to 5 to execute intermediate additions.",
        content: `### Small Friends Formulas
Small friends sum to 5: (4,1) and (3,2).
* $+4 = +5 - 1$
* $+3 = +5 - 2$
* $+2 = +5 - 3$
* $+1 = +5 - 4$
Example: $3 + 4$. With 3 earth beads up, only 1 remains below. Pull heaven bead down (+5) and pull 1 earth bead down (-1). Result = 7.`,
        keyTakeaways: ["Small friends sum to 5", "Introduce upper 5-bead and subtract the difference"],
        practiceActivity: {
          instructions: "Compute 4 + 2 using small friends.",
          problem: "Start with 4. Apply +2 = +5 - 3. What is the value?",
          solution: "6 (4 + 5 - 3 = 6).",
          hints: ["Complement of 2 to 5 is 3"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1000,
        order: 2,
        isPreview: false
      },
      {
        title: "The 10-Complement (Big Friends) and Carrying",
        objective: "Execute base-10 carry operations across multiple rods.",
        description: "Transfer overflow values to the tens rod using big friends (complements of 10).",
        content: `### Big Friends Formulas
Big friends sum to 10: (9,1), (8,2), (7,3), (6,4), (5,5).
* $+9 = +10 - 1$
* $+8 = +10 - 2$
* $+7 = +10 - 3$
When the units rod cannot fit more beads, push 1 bead up on the tens rod (+10) and subtract the complement on the units rod.`,
        keyTakeaways: ["Big friends sum to 10", "Advance left neighbor rod by 1, remove complement from current rod"],
        practiceActivity: {
          instructions: "Compute 7 + 6 using big friends.",
          problem: "Start at 7. Apply +6 = +10 - 4. What is the final reading?",
          solution: "13 (Tens rod = 1, units rod = 3).",
          hints: ["Big friend of 6 is 4"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1050,
        order: 3,
        isPreview: false
      },
      {
        title: "Anzan Mental Visualization & Speed Arithmetic",
        objective: "Visualize moving beads in the mind to compute rapidly without physical tools.",
        description: "Bridge physical abacus manipulation to the photographic mental math technique.",
        content: `### Developing Anzan Mental Arithmetic
1. **Mental Image:** Close eyes and picture the central reckoning beam.
2. **Ghost Movements:** Form light finger gestures to trigger motor memory.
3. **Speed Drilling:** Progress from single digits to 2-digit and 3-digit mental sums.`,
        keyTakeaways: ["Anzan stimulates right-brain spatial memory", "Regular 5-minute flash drills build extreme calculation speed"],
        practiceActivity: {
          instructions: "Compute mentally using the Anzan method.",
          problem: "Calculate: 18 + 24 - 12.",
          solution: "30 (18 + 24 = 42; 42 - 12 = 30).",
          hints: ["Add tens first, then units"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1100,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Abacus and Mental Arithmetic Assessment",
      description: "Test your understanding of bead representation, complement rules, and mental math.",
      passingPercentage: 70,
      questions: [
        { question: "What is the value of one upper-deck (heaven) bead on a Soroban abacus?", options: ["1", "5", "10", "50"], correctAnswer: 1, explanation: "Each heaven bead represents 5." },
        { question: "How many lower-deck (earth) beads exist on each rod?", options: ["3", "4", "5", "2"], correctAnswer: 1, explanation: "Standard Soroban abacus has 4 earth beads per rod." },
        { question: "When are beads counted toward the total?", options: ["When moved to frame edges", "When moved toward the dividing beam", "When all beads touch", "Only on the rightmost rod"], correctAnswer: 1, explanation: "Beads are active only when touching the beam." },
        { question: "Which formula represents adding 4 using 5-complements?", options: ["+4 = +10 - 6", "+4 = +5 - 1", "+4 = +5 + 1", "+4 = +2 + 2"], correctAnswer: 1, explanation: "4 and 1 are complements summing to 5: +4 = +5 - 1." },
        { question: "What is the 10-complement (big friend) of 8?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "8 + 2 = 10, so the complement is 2." },
        { question: "If a rod shows 1 heaven bead and 3 earth beads at the beam, what number is it?", options: ["4", "7", "8", "9"], correctAnswer: 2, explanation: "5 + 3 = 8." },
        { question: "What is the rule to subtract 7 using 10-complements?", options: ["-7 = -10 + 3", "-7 = -10 - 3", "-7 = -5 - 2", "-7 = +10 - 7"], correctAnswer: 0, explanation: "-7 is achieved by subtracting 10 on the left rod and adding 3 on the current rod." },
        { question: "In which direction are standard abacus calculations performed?", options: ["Right to left", "Left to right", "Bottom to top", "Clockwise"], correctAnswer: 1, explanation: "Calculations on the Soroban proceed from left to right." },
        { question: "What does the term 'Anzan' mean in mathematics?", options: ["Mechanical calculator", "Mental calculation using visualized abacus", "Multiplication chart", "Finger counting"], correctAnswer: 1, explanation: "Anzan is Japanese for mental calculation with a visualized Soroban." },
        { question: "What is the result of 35 + 27 - 12?", options: ["48", "50", "52", "54"], correctAnswer: 1, explanation: "35 + 27 = 62; 62 - 12 = 50." }
      ]
    }
  },

  // 2. Basic English Communication
  {
    slug: "basic-english-communication",
    title: "Basic English Communication",
    description: "Learn practical conversational English for school, home, and daily interactions with self-introductions, polite requests, and question words.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Introduce yourself clearly and politely",
      "Use polite expressions (please, thank you, excuse me)",
      "Form questions with Who, What, Where, When, Why, How",
      "Describe daily schedules and tell time accurately",
      "Handle short telephone and public interactions"
    ],
    prerequisites: ["English alphabet and basic vocabulary"],
    estimatedDuration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Greetings, Farewells & Self Introductions",
        objective: "Deliver a polished 30-second self-introduction and greet people appropriately.",
        description: "Master everyday greetings and learn how to introduce your name, grade, and interests.",
        content: `### Everyday Greetings
* **Morning (Dawn-12 PM):** "Good morning!"
* **Afternoon (12-5 PM):** "Good afternoon!"
* **Evening (5 PM+):** "Good evening!"
* *Note:* "Good night" is exclusively a parting phrase when leaving or sleeping.

### Standard Self Introduction
1. "Hello everyone, my name is Priya."
2. "I am 13 years old and study in Standard 8."
3. "My favorite subject is Science, and I enjoy reading."`,
        keyTakeaways: ["Never say 'Myself Name', always 'My name is' or 'I am'", "'Good night' is for parting only"],
        practiceActivity: {
          instructions: "Select the correct introduction.",
          problem: "Which is grammatically correct?\nA) Myself Arun.\nB) My name is Arun.",
          solution: "B) My name is Arun.",
          hints: ["Avoid starting with 'Myself'"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 850,
        order: 0,
        isPreview: true
      },
      {
        title: "Polite Requests & Apologies",
        objective: "Use 'Could you please', 'May I', and 'Thank you' in everyday interactions.",
        description: "Transform abrupt commands into courteous, respectful requests.",
        content: `### Courteous Phrasing
* Instead of "Give me your pen", say: *"Could you please lend me your pen?"*
* Instead of "I want to come in", say: *"May I come in, teacher?"*
* When apologizing: *"I am sorry for being late. It will not happen again."*`,
        keyTakeaways: ["Use 'Could you please' for requests", "Use 'May I' for permission"],
        practiceActivity: {
          instructions: "Make the statement polite.",
          problem: "Convert 'Move aside' into a polite request.",
          solution: "'Excuse me, could you please make way?' or 'Excuse me, may I pass?'",
          hints: ["Use 'Excuse me'"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 880,
        order: 1,
        isPreview: false
      },
      {
        title: "The 5W1H Question Words",
        objective: "Formulate questions to ask for information, directions, and reasons.",
        description: "Master Who, What, Where, When, Why, and How in conversations.",
        content: `### Question Words Guide
* **Who:** People ("Who is your class teacher?")
* **What:** Things / Actions ("What are you writing?")
* **Where:** Places ("Where is the science laboratory?")
* **When:** Time ("When will the bus arrive?")
* **Why:** Reasons ("Why is the sky blue?")
* **How:** Manner / Method ("How do we solve this?")`,
        keyTakeaways: ["Each 5W1H word serves a specific inquiry function", "Verb comes before subject in questions"],
        practiceActivity: {
          instructions: "Fill in the blank with the correct word.",
          problem: "_____ is your school located?",
          solution: "Where.",
          hints: ["Asks about location"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 900,
        order: 2,
        isPreview: false
      },
      {
        title: "Describing Daily Routines & Telling Time",
        objective: "Narrate your typical day using time phrases and connectors.",
        description: "Use simple present tense and sequence markers (first, next, then, finally).",
        content: `### Telling Time Expressions
* 7:15 = "Quarter past seven"
* 7:30 = "Half past seven"
* 7:45 = "Quarter to eight"

### Sequence Connectors
"First, I wake up at 6:00 AM. Next, I prepare for school. Then, I attend my classes. Finally, I complete my homework in the evening."`,
        keyTakeaways: ["Use present simple for routines", "Quarter past = :15, Quarter to = :45"],
        practiceActivity: {
          instructions: "Identify the time in words.",
          problem: "What is 4:45 in words?",
          solution: "Quarter to five.",
          hints: ["15 minutes until five"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 920,
        order: 3,
        isPreview: false
      },
      {
        title: "Telephone Conversations & Public Etiquette",
        objective: "Handle phone calls politely and seek assistance in public places.",
        description: "Learn phone greetings, message taking, and asking for directions.",
        content: `### Phone Etiquette
* Answering: *"Hello, this is Suresh. How may I help you?"*
* Asking for someone: *"Could I please speak with Anita?"*
* If voice is unclear: *"Pardon me, your voice is breaking up. Could you please repeat that?"*`,
        keyTakeaways: ["Identify yourself when answering", "Use polite clarification when audio is poor"],
        practiceActivity: {
          instructions: "Choose the polite response.",
          problem: "Someone asks for directions and you don't know. What do you say?",
          solution: "'I am sorry, I am not familiar with this area. You may ask at that shop.'",
          hints: ["Apologize politely and suggest an alternative"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 950,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Basic English Communication Assessment",
      description: "Evaluate your conversational skills, question formation, and social etiquette.",
      passingPercentage: 70,
      questions: [
        { question: "What is the appropriate greeting at 10:00 AM?", options: ["Good afternoon", "Good evening", "Good morning", "Good night"], correctAnswer: 2, explanation: "Morning greeting applies until 12:00 PM." },
        { question: "Which self-introduction is grammatically correct?", options: ["Myself Deepak.", "My name is Deepak.", "Me Deepak.", "I is Deepak."], correctAnswer: 1, explanation: "'My name is Deepak' is standard English." },
        { question: "What should you say after receiving help from someone?", options: ["What next?", "Thank you very much.", "Move away.", "It is okay."], correctAnswer: 1, explanation: "'Thank you very much' expresses gratitude." },
        { question: "Which question word asks about a person?", options: ["Where", "Who", "When", "Why"], correctAnswer: 1, explanation: "'Who' asks about identity of a person." },
        { question: "How do you politely ask permission to drink water in class?", options: ["I will drink water.", "May I please drink water, teacher?", "Give me water bottle.", "Water now."], correctAnswer: 1, explanation: "'May I please...' is the polite permission formula." },
        { question: "What time is 'half past six'?", options: ["6:15", "6:30", "6:45", "7:30"], correctAnswer: 1, explanation: "Half past six is 6:30." },
        { question: "Which phrase is best when a caller's voice is faint?", options: ["Shout at me!", "Could you please speak a little louder?", "Why are you whispering?", "Hang up."], correctAnswer: 1, explanation: "'Could you please speak a little louder?' is polite." },
        { question: "Which connector denotes the final step in a routine?", options: ["First", "Next", "Finally", "Then"], correctAnswer: 2, explanation: "'Finally' concludes a sequence." },
        { question: "Which question word asks for a reason?", options: ["How", "Why", "Where", "What"], correctAnswer: 1, explanation: "'Why' inquires about causes or reasons." },
        { question: "When do you use 'Good night'?", options: ["At 7 PM when arriving for dinner", "When meeting a teacher at night", "When leaving or going to sleep at night", "At noon"], correctAnswer: 2, explanation: "'Good night' is exclusively a farewell at night." }
      ]
    }
  },

  // 3. English Grammar and Vocabulary
  {
    slug: "english-grammar-vocabulary",
    title: "English Grammar and Vocabulary",
    description: "Master the 8 parts of speech, active/passive voice, tenses, subject-verb agreement, and build an expansive vocabulary for clear writing.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Identify and use all 8 parts of speech correctly",
      "Apply past, present, and future tenses with consistency",
      "Maintain strict subject-verb agreement in complex sentences",
      "Form plurals, prefixes, suffixes, and antonym/synonym pairs",
      "Construct clear, compound, and complex sentences"
    ],
    prerequisites: ["Basic reading and sentence formation"],
    estimatedDuration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "The 8 Parts of Speech Overview",
        objective: "Identify nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.",
        description: "Understand the fundamental building blocks of all English sentences.",
        content: `### The 8 Parts of Speech
1. **Noun:** Name of person, place, or thing (*Kavita, Chennai, book*).
2. **Pronoun:** Replaces a noun (*he, she, it, they*).
3. **Verb:** Action or state (*run, study, is, was*).
4. **Adjective:** Describes a noun (*tall, bright, three*).
5. **Adverb:** Modifies verb, adjective, or adverb (*quickly, very, yesterday*).
6. **Preposition:** Shows position or relationship (*in, on, under, between*).
7. **Conjunction:** Connects words or clauses (*and, but, because, although*).
8. **Interjection:** Expresses emotion (*Wow!, Alas!, Hurrah!*).`,
        keyTakeaways: ["Every word in a sentence functions as one of the 8 parts of speech", "A word's category depends on its job in context"],
        practiceActivity: {
          instructions: "Identify the part of speech of the highlighted word.",
          problem: "In 'She ran *quickly* to catch the bus', what part of speech is 'quickly'?",
          solution: "Adverb (it modifies the action verb 'ran').",
          hints: ["Modifies how she ran", "Ends in -ly"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Present, Past, and Future Tenses",
        objective: "Construct simple, continuous, and perfect tenses accurately.",
        description: "Express time relationships correctly using regular and irregular verbs.",
        content: `### Tense Formations
* **Simple Present:** "He reads a book every day." (Habit)
* **Present Continuous:** "He is reading right now." (Action in progress)
* **Simple Past:** "He read the book yesterday." (Completed action)
* **Simple Future:** "He will read the book tomorrow." (Upcoming action)
* **Present Perfect:** "He has read three books this week." (Past action linked to present)`,
        keyTakeaways: ["Singular third-person takes -s in simple present (he walks)", "Continuous tenses use be-verb + ing"],
        practiceActivity: {
          instructions: "Fill in the correct past tense form.",
          problem: "Yesterday, we _____ (go) to the science exhibition.",
          solution: "went (irregular past of 'go').",
          hints: ["Irregular verb form of 'go'"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 950,
        order: 1,
        isPreview: false
      },
      {
        title: "Subject-Verb Agreement Rules",
        objective: "Ensure singular subjects take singular verbs and plural subjects take plural verbs.",
        description: "Avoid the most common grammatical error in writing and speech.",
        content: `### Golden Rules of Agreement
1. **Singular Subject = Singular Verb:** "The boy *plays* football."
2. **Plural Subject = Plural Verb:** "The boys *play* football."
3. **Compound Subjects with 'and':** "Ravi and Sam *are* friends."
4. **Collective Nouns (Usually Singular):** "The team *is* winning the match."
5. **Indefinite Pronouns:** *Everyone, each, somebody* are singular ("Everyone *has* a notebook").`,
        keyTakeaways: ["Singular verbs end in 's' (is, does, has, runs)", "'Everyone' and 'each' are strictly singular"],
        practiceActivity: {
          instructions: "Select the correct verb.",
          problem: "Neither the teacher nor the students _____ (was/were) present.",
          solution: "were (when joined by 'neither... nor', the verb agrees with the closer subject 'students').",
          hints: ["Look at the subject closest to the verb"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1000,
        order: 2,
        isPreview: false
      },
      {
        title: "Prefixes, Suffixes & Root Words",
        objective: "Expand vocabulary exponentially by decoding Greek and Latin roots, prefixes, and suffixes.",
        description: "Multiply your word power by learning root word building blocks.",
        content: `### Word Anatomy
* **Prefix (Front):** *un-* (not) + happy = unhappy | *pre-* (before) + view = preview | *re-* (again) + write = rewrite.
* **Root (Core):** *bio* (life) + *logy* (study) = biology | *tele* (distant) + *phone* (sound) = telephone.
* **Suffix (End):** *care* + *-ful* = careful (adjective) | *quick* + *-ly* = quickly (adverb) | *teach* + *-er* = teacher (noun).`,
        keyTakeaways: ["Prefixes change meaning; suffixes often change the part of speech", "Root knowledge enables guessing unknown words"],
        practiceActivity: {
          instructions: "Create a word meaning 'not possible'.",
          problem: "Combine the prefix 'im-' with 'possible'.",
          solution: "Impossible.",
          hints: ["Prefix 'im-' means not"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 980,
        order: 3,
        isPreview: false
      },
      {
        title: "Punctuation & Sentence Mechanics",
        objective: "Use commas, apostrophes, quotation marks, and capital letters accurately.",
        description: "Deliver clean, unambiguous sentences with standard punctuation rules.",
        content: `### Essential Punctuation Rules
1. **Capital Letters:** Start of sentence, proper nouns (*India, Dr. Abdul Kalam*), and pronoun *I*.
2. **Apostrophe for Possession vs Contraction:**
   * Possession: *"The student's bag"* (one student), *"The students' bags"* (many students).
   * Contraction: *"It's"* = *It is*; *"Its"* = possessive pronoun.
3. **Commas in a List:** *"I bought apples, bananas, and oranges."*`,
        keyTakeaways: ["'It's' always means 'It is'", "Commas separate independent items in a series"],
        practiceActivity: {
          instructions: "Fix the punctuation in the sentence.",
          problem: "Fix: 'the students dog lost its collar'",
          solution: "'The student's dog lost its collar.' (Capitalize 'The', add apostrophe to 'student's').",
          hints: ["Dog belongs to student", "Start with capital letter"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1020,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "English Grammar and Vocabulary Assessment",
      description: "Test your command of parts of speech, tenses, subject-verb agreement, and word structures.",
      passingPercentage: 70,
      questions: [
        { question: "Which of the following words is a preposition?", options: ["Quickly", "Under", "Beautiful", "Because"], correctAnswer: 1, explanation: "'Under' indicates spatial position and is a preposition." },
        { question: "Choose the sentence with correct subject-verb agreement:", options: ["The list of items are on the desk.", "The list of items is on the desk.", "The list of items were on the desk.", "The list of items have been on the desk."], correctAnswer: 1, explanation: "The subject is the singular noun 'list', so the singular verb 'is' is required." },
        { question: "What is the past tense of the irregular verb 'catch'?", options: ["Catched", "Caught", "Cote", "Catching"], correctAnswer: 1, explanation: "The past tense of catch is caught." },
        { question: "What does the prefix 'micro-' mean in microscope?", options: ["Large", "Fast", "Small", "Invisible"], correctAnswer: 2, explanation: "'Micro-' is a Greek root meaning small." },
        { question: "Identify the conjunction in: 'She studied hard, but she felt nervous.'", options: ["studied", "hard", "but", "felt"], correctAnswer: 2, explanation: "'But' connects the two independent clauses as a coordinating conjunction." },
        { question: "Which word correctly completes: 'Everyone _____ finished their project.'?", options: ["have", "has", "are", "were"], correctAnswer: 1, explanation: "'Everyone' is an indefinite pronoun treated as grammatically singular." },
        { question: "What is the antonym of the word 'generous'?", options: ["Kind", "Selfish / Stingy", "Polite", "Wealthy"], correctAnswer: 1, explanation: "Selfish or stingy is the opposite of generous." },
        { question: "Which sentence uses the apostrophe correctly?", options: ["The dog wagged it's tail.", "The dog wagged its tail.", "The dogs' wagged it tail.", "The dog's wagged its tail."], correctAnswer: 1, explanation: "'Its' is the possessive pronoun; 'it's' is a contraction of 'it is'." },
        { question: "In 'The gentle breeze blew softly', what part of speech is 'gentle'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: 2, explanation: "'Gentle' describes the noun 'breeze', so it is an adjective." },
        { question: "Which tense is used in: 'They will have finished by noon'?", options: ["Simple Future", "Future Continuous", "Future Perfect", "Present Perfect"], correctAnswer: 2, explanation: "'Will have finished' is the future perfect tense." }
      ]
    }
  },

  // 4. Reading Comprehension and Writing
  {
    slug: "reading-comprehension-writing",
    title: "Reading Comprehension and Writing",
    description: "Develop strong reading strategies, analytical thinking, paragraph construction, narrative writing, and formal letter drafting.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Extract main ideas and supporting details from unseen texts",
      "Infer author intent and contextual vocabulary meaning",
      "Structure cohesive paragraphs with topic, supporting, and concluding sentences",
      "Write vivid narrative essays using sensory details",
      "Format formal leave letters and informal letters correctly"
    ],
    prerequisites: ["English Grammar fundamentals"],
    estimatedDuration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Skimming, Scanning & Finding the Main Idea",
        objective: "Apply skimming for gist and scanning for specific factual details in non-fiction texts.",
        description: "Master reading speed techniques used by active readers.",
        content: `### Reading Strategies
* **Skimming:** Rapid reading of titles, headings, and opening sentences to grasp the overall theme (*gist*).
* **Scanning:** Looking specifically for keywords, numbers, names, or dates without reading every word.
* **Main Idea:** The central point the author wants the reader to understand, usually stated in the topic sentence.`,
        keyTakeaways: ["Skim for overall meaning; scan for specific facts", "The main idea answers: 'What is this primarily about?'"],
        practiceActivity: {
          instructions: "Determine the main idea.",
          problem: "Text: 'Honeybees pollinate over 80% of flowering crops worldwide. Without them, apple, almond, and berry harvests would drop dramatically, threatening global food security.' What is the main idea?",
          solution: "Honeybees are vital to global crop pollination and food security.",
          hints: ["Identify the central topic connecting both sentences"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Context Clues and Inferencing",
        objective: "Deduce meanings of unfamiliar words and read between the lines using textual evidence.",
        description: "Become a reading detective by using surrounding sentences to unlock difficult vocabulary.",
        content: `### Types of Context Clues
1. **Definition Clue:** "The *arboretum*, a specialized botanical garden devoted to trees, was quiet."
2. **Synonym Clue:** "The boy was *lethargic*; he felt sluggish and tired."
3. **Contrast Clue:** "Unlike his *gregarious* brother who loved parties, Anand was quiet and shy."`,
        keyTakeaways: ["Surrounding words provide clues to unknown vocabulary", "Inferencing combines text clues with your own background knowledge"],
        practiceActivity: {
          instructions: "Infer word meaning.",
          problem: "In 'The arid desert received almost no rainfall for three years', what does 'arid' mean?",
          solution: "Dry / lacking moisture.",
          hints: ["Sentence mentions 'almost no rainfall'"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 920,
        order: 1,
        isPreview: false
      },
      {
        title: "The Hamburger Paragraph Model",
        objective: "Construct well-organized paragraphs with a topic sentence, 3 supporting details, and a conclusion.",
        description: "Use the visual hamburger structure to write cohesive, persuasive paragraphs.",
        content: `### The Hamburger Anatomy
* **Top Bun (Topic Sentence):** Introduces the main idea clearly.
* **The Filling (Supporting Sentences):** 3 concrete facts, reasons, or examples.
* **Bottom Bun (Concluding Sentence):** Wraps up the thought and restates the main idea in fresh words.`,
        keyTakeaways: ["Every paragraph should focus on one main idea", "Use transition words (furthermore, in addition, consequently)"],
        practiceActivity: {
          instructions: "Identify the off-topic sentence.",
          problem: "Paragraph about solar energy: 'Solar panels convert sunlight into electricity. They produce zero greenhouse emissions. Coal mining is hazardous work. Solar energy reduces electricity bills.' Which sentence is off-topic?",
          solution: "'Coal mining is hazardous work' is off-topic in a paragraph focused on solar energy benefits.",
          hints: ["Look for the sentence that shifts subject away from solar"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 960,
        order: 2,
        isPreview: false
      },
      {
        title: "Narrative Writing & Sensory Details",
        objective: "Write engaging short stories using the 'Show, Don't Tell' technique and 5 senses.",
        description: "Transform flat statements into vivid scenes that captivate readers.",
        content: `### Show, Don't Tell
* *Telling:* "Ravi was very afraid."
* *Showing:* "Ravi's hands trembled, his breath caught in his throat, and cold sweat beaded across his forehead."
Engage the 5 senses: sight, sound, smell, touch, and taste to place the reader directly in the setting.`,
        keyTakeaways: ["Showing uses sensory actions; telling just states feelings", "Create compelling characters with clear desires and obstacles"],
        practiceActivity: {
          instructions: "Convert telling to showing.",
          problem: "Show, don't tell: 'The weather was cold.'",
          solution: "'Icy gusts of wind bit through my sweater as frosty breath puffed into the pale air.'",
          hints: ["Describe how cold feels on skin or looks in the air"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1000,
        order: 3,
        isPreview: false
      },
      {
        title: "Formal Letter Writing (Leave & Application Letters)",
        objective: "Draft standard formal letters with proper sender address, date, recipient, subject, salutation, body, and sign-off.",
        description: "Master the standard format for school leave letters, library requests, and official notes.",
        content: `### Formal Letter Structure
1. **From:** Sender's Name & Address
2. **Date:** 25 October 2026
3. **To:** The Headmaster / Principal, School Name, City
4. **Subject:** Concise reason (e.g., *Subject: Application for two days medical leave*)
5. **Salutation:** Respected Sir / Madam,
6. **Body:** 2-3 concise paragraphs stating the reason and dates.
7. **Subscription:** Yours obediently / Yours faithfully, [Name, Class, Roll No.]`,
        keyTakeaways: ["Subject line must be brief and clear", "Never use casual abbreviations in formal correspondence"],
        practiceActivity: {
          instructions: "Identify the appropriate sign-off.",
          problem: "Which sign-off is appropriate when writing to your school principal?\nA) Cheers,\nB) Yours obediently,\nC) Best wishes,",
          solution: "B) Yours obediently (or Yours faithfully / respectfully).",
          hints: ["Formal correspondence requires respectful sign-offs"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1050,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Reading Comprehension and Writing Assessment",
      description: "Evaluate your reading analysis, inferencing, paragraph structure, and formal writing ability.",
      passingPercentage: 70,
      questions: [
        { question: "What is the reading strategy 'skimming' primarily used for?", options: ["Finding a specific phone number", "Grasping the general idea of a text quickly", "Memorizing every sentence", "Correcting spelling errors"], correctAnswer: 1, explanation: "Skimming quickly previews the text to get the main idea." },
        { question: "What is 'scanning' in reading comprehension?", options: ["Reading line-by-line out loud", "Searching for specific keywords or data", "Translating words to another language", "Drawing illustrations"], correctAnswer: 1, explanation: "Scanning searches the text for a specific piece of information." },
        { question: "In the 'Hamburger Paragraph' model, what is the role of the top bun?", options: ["Concluding sentence", "Topic sentence that introduces the main idea", "Random trivia", "Author biography"], correctAnswer: 1, explanation: "The top bun is the topic sentence setting the main idea." },
        { question: "Which sentence is an example of 'Show, Don't Tell'?", options: ["She was sad.", "Tears welled in her eyes as her chin quivered in silence.", "She felt unhappy about the result.", "She had sadness."], correctAnswer: 1, explanation: "Describing physical tears and quivering chin shows sadness through sensory details." },
        { question: "What is the purpose of the 'Subject' line in a formal letter?", options: ["To write the full story", "To state the purpose of the letter in a single concise line", "To write the recipient's phone number", "To list the sender's hobbies"], correctAnswer: 1, explanation: "The subject line summarizes the letter's purpose for rapid reading." },
        { question: "If a text states 'The sky darkened, birds flew frantically to their nests, and thunder rumbled', what can you infer?", options: ["Morning has arrived", "A storm is approaching", "The sun is shining brightly", "It is winter"], correctAnswer: 1, explanation: "Thunder, darkening sky, and sheltering birds indicate an imminent storm." },
        { question: "What type of context clue is used in: 'Unlike terrestrial animals that walk on land, aquatic creatures live in water'?", options: ["Contrast clue", "Pronunciation clue", "Rhyme clue", "Number clue"], correctAnswer: 0, explanation: "'Unlike' introduces a contrast clue defining aquatic versus terrestrial." },
        { question: "Where does the date appear in standard formal letter formatting?", options: ["At the very end of the signature", "Below the sender's address before the recipient's designation", "In the subject line", "Only on the envelope"], correctAnswer: 1, explanation: "The date appears after the sender's details and before the recipient address." },
        { question: "Which transition word indicates a result or consequence?", options: ["Meanwhile", "Consequently", "For instance", "Initially"], correctAnswer: 1, explanation: "'Consequently' introduces a logical result or outcome." },
        { question: "What makes a concluding sentence effective?", options: ["Introducing an unrelated new topic", "Restating the core main idea and providing a sense of closure", "Stopping mid-sentence", "Asking unrelated questions"], correctAnswer: 1, explanation: "A good concluding sentence synthesizes the main point and closes the thought." }
      ]
    }
  }
];
