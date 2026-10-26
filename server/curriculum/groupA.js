/**
 * SmartLearn Curriculum - GROUP A: Standards 6–8 (18 Courses)
 * High-quality educational content designed for foundational learners.
 * Explains concepts step-by-step with accessible language, worked examples,
 * key takeaways, practice activities, and comprehensive 10-question assessments.
 */

export const groupACourses = [
  // 1. Abacus and Mental Arithmetic
  {
    slug: "abacus-mental-arithmetic",
    title: "Abacus and Mental Arithmetic",
    description: "Build exceptional speed, concentration, and numerical intuition using the Soroban abacus and Japanese Anzan mental arithmetic techniques. Move from physical bead manipulation to lightning-fast mental calculation.",
    category: "Mathematics",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Understand the structure and bead values of the Soroban abacus",
      "Perform direct addition and subtraction with speed and accuracy",
      "Apply the 5-complement (small friends) and 10-complement (big friends) rules",
      "Transition from physical abacus manipulation to Anzan mental visualization",
      "Multiply single and multi-digit numbers mentally"
    ],
    prerequisites: ["Basic counting and number recognition up to 100"],
    estimatedDuration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Introduction to the Soroban Abacus & Bead Values",
        objective: "Identify the frame, beam, upper deck (heaven beads), and lower deck (earth beads) and read values from 0 to 99.",
        description: "Learn the physical anatomy of the Japanese Soroban abacus and how beads represent place values.",
        content: `### 1. Anatomy of the Soroban Abacus
The Soroban consists of a rectangular wooden or plastic frame divided horizontally by a beam (reckoning bar).
* **Upper Deck (Heaven):** Each rod has 1 bead. When moved toward the beam, it represents a value of **5**.
* **Lower Deck (Earth):** Each rod has 4 beads. Each bead moved up toward the beam represents **1**.
* **Active Position:** Beads only count when they are moved **toward the dividing beam**.

### 2. Reading Numbers
* **0 (Zero):** All upper beads pushed up away from the beam; all lower beads pushed down away from the beam.
* **1 to 4:** Push 1, 2, 3, or 4 lower beads UP to the beam using your thumb.
* **5:** Lower the upper bead down to the beam using your index finger.
* **6 to 9:** Combine the upper 5-bead with 1, 2, 3, or 4 lower beads using a pinch movement.

### 3. Worked Example
To set **7**:
1. Pull the upper bead DOWN to the beam with your index finger (value = 5).
2. Push 2 lower beads UP to the beam with your thumb (value = 2).
3. Total on the rod = 5 + 2 = 7.`,
        keyTakeaways: [
          "Upper bead equals 5; each lower bead equals 1.",
          "Beads only have value when moved toward the central beam.",
          "Always use thumb for earth beads (upward) and index finger for heaven beads (down/up)."
        ],
        practiceActivity: {
          instructions: "Calculate the total value represented on the unit rod.",
          problem: "The upper bead is moved down to the beam, and 3 lower beads are pushed up to the beam. What number is represented?",
          solution: "8 (Upper bead = 5, plus 3 lower beads = 3. Total: 5 + 3 = 8).",
          hints: ["Upper bead value is 5", "Each lower bead value is 1"]
        },
        videoUrl: "https://www.youtube-nocookie.com/embed/1vE9Vp6b_5s",
        videoType: "youtube",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Direct Addition and Subtraction on the Abacus",
        objective: "Perform simple multi-digit addition and subtraction without complement formulas.",
        description: "Master direct bead movements using the thumb and index finger for sums within 4 and 9.",
        content: `### 1. Direct Addition
Direct addition is used when sufficient beads are available on the rod without needing borrowing or carryover rules.
* **Rule:** Push lower beads up with thumb (+1 to +4) or upper bead down with index (+5).
* **Example:** $2 + 2 = 4$. Push 2 earth beads up, then push another 2 earth beads up.

### 2. Direct Subtraction
Direct subtraction is the reverse operation.
* **Rule:** Pull earth beads down with index finger (-1 to -4) or push heaven bead up (-5).
* **Example:** $7 - 2 = 5$. On a rod showing 7 (heaven bead + 2 earth beads), move 2 earth beads down. Exactly 5 remains.

### 3. Two-Digit Calculations
Always calculate from left to right (tens first, then units) on the Soroban, matching human reading order!`,
        keyTakeaways: [
          "Direct operations require no formula because available beads suffice.",
          "Abacus operations move naturally from left to right (highest place value first)."
        ],
        practiceActivity: {
          instructions: "Solve the direct arithmetic sequence step-by-step.",
          problem: "Start with 1. Add 3. Add 5. Subtract 2. What is the final result?",
          solution: "7. Steps: 1 + 3 = 4; 4 + 5 = 9; 9 - 2 = 7.",
          hints: ["Add 3 lower beads to 1 lower bead to get 4", "Drop heaven bead for +5 to reach 9"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 960,
        order: 1,
        isPreview: false
      },
      {
        title: "The 5-Complement (Small Friends) Technique",
        objective: "Apply small-friend formulas when lower beads are insufficient but the 5-bead is available.",
        description: "Learn how complementary pairs of 5 (+4 = +5 - 1, +3 = +5 - 2) unlock addition when lower beads are exhausted.",
        content: `### 1. What are Small Friends?
Small friends are pairs of numbers that add up to **5**:
* 4 and 1 (because 4 + 1 = 5)
* 3 and 2 (because 3 + 2 = 5)

### 2. Addition Formulas with 5-Complement
When you need to add a number but do not have enough lower beads available, use the heaven bead (+5) and subtract the complement:
* $+4 = +5 - 1$
* $+3 = +5 - 2$
* $+2 = +5 - 3$
* $+1 = +5 - 4$

### 3. Worked Example: $3 + 4$
1. Start with 3 on the unit rod (3 earth beads up).
2. We need to add 4, but only 1 earth bead remains at the bottom.
3. Apply formula $+4 = +5 - 1$:
   - Move upper bead DOWN (+5).
   - Move 1 lower bead DOWN (-1).
4. Rod now shows 1 upper bead and 2 lower beads $= 5 + 2 = 7$. Correct!`,
        keyTakeaways: [
          "Small friends are pairs that sum to 5: (4,1), (3,2).",
          "When lower beads are full, introduce the 5-bead and subtract the difference."
        ],
        practiceActivity: {
          instructions: "Identify the formula and solve.",
          problem: "Calculate 4 + 3 using the 5-complement formula.",
          solution: "7. Formula: +3 = +5 - 2. Start at 4, add upper bead (+5), subtract 2 lower beads (-2) = 7.",
          hints: ["Complement of 3 to 5 is 2", "Add 5, subtract 2"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1020,
        order: 2,
        isPreview: false
      },
      {
        title: "The 10-Complement (Big Friends) and Carrying",
        objective: "Perform addition and subtraction across place values using base-10 complements.",
        description: "Master carry-over operations by combining rods when numbers exceed 9.",
        content: `### 1. What are Big Friends?
Big friends are pairs of digits that sum to **10**:
* 9 and 1 | 8 and 2 | 7 and 3 | 6 and 4 | 5 and 5

### 2. The 10-Complement Addition Formula
When a rod reaches 9 and cannot take more beads:
* **Add 1 to the next left rod (+10), subtract the complement from current rod.**
* $+9 = +10 - 1$
* $+8 = +10 - 2$
* $+7 = +10 - 3$
* $+6 = +10 - 4$
* $+5 = +10 - 5$

### 3. Worked Example: $8 + 7$
1. Set 8 on the units rod (5 + 3).
2. To add 7: We cannot add 7 on this rod. Formula is $+7 = +10 - 3$.
3. Push 1 lower bead UP on the tens rod (+10).
4. Pull 3 lower beads DOWN on the units rod (-3).
5. Units rod now shows 5; Tens rod shows 1. Result $= 15$.`,
        keyTakeaways: [
          "Big friends sum to 10: (9,1), (8,2), (7,3), (6,4), (5,5).",
          "Carryover means advancing 1 bead on the left neighbor rod and removing the complement."
        ],
        practiceActivity: {
          instructions: "Compute using 10-complements.",
          problem: "What is 6 + 8 on the abacus? Which beads move?",
          solution: "14. Formula: +8 = +10 - 2. Add 1 on tens rod (+10), subtract 2 on units rod (-2 from 6 leaves 4). Total: 14.",
          hints: ["Big friend of 8 is 2", "+8 = +10 - 2"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1100,
        order: 3,
        isPreview: false
      },
      {
        title: "Anzan Mental Visualization & Speed Arithmetic",
        objective: "Mentally visualize the Soroban abacus to calculate multi-digit arithmetic without physical apparatus.",
        description: "Develop the photographic internal abacus (Anzan) technique practiced by global mental math champions.",
        content: `### 1. What is Anzan?
Anzan (暗算) is the Japanese practice of calculating mentally by visualizing an internal Soroban in the mind's eye.

### 2. Steps to Develop Anzan
1. **Physical Fluency:** Always practice physical bead movement first until the motor pattern is automatic.
2. **Ghost Fingers:** Move your fingers in the air as if operating the abacus, while closing your eyes.
3. **Internal Screen:** Picture a shining beam and see red/golden beads snapping to the beam.
4. **Flash Arithmetic:** Start with 2 single-digit additions, gradually increasing digits and speed.

### 3. Mental Multiplication via Grid Method
To multiply $23 \\times 4$:
* Multiply tens: $20 \\times 4 = 80$ (set 8 on tens rod in mind)
* Multiply units: $3 \\times 4 = 12$ (add 1 to tens rod $= 9$, set 2 on units rod)
* Final Answer $= 92$.`,
        keyTakeaways: [
          "Anzan trains the right hemisphere of the brain via spatial bead visualization.",
          "Finger micro-movements bridge the transition between physical abacus and pure mental math."
        ],
        practiceActivity: {
          instructions: "Calculate mentally using the Anzan method.",
          problem: "Mentally compute: 15 + 23 - 8.",
          solution: "30. Step 1: 15 + 20 = 35; 35 + 3 = 38; 38 - 8 = 30.",
          hints: ["Add tens first: 10 + 20 = 30", "Units: 5 + 3 - 8 = 0"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1200,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Abacus and Mental Arithmetic - Comprehensive Assessment",
      description: "Evaluate your bead value recognition, complement formula mastery, and mental arithmetic precision.",
      passingPercentage: 70,
      questions: [
        {
          question: "What is the numerical value of a single upper deck bead (heaven bead) when moved to the beam?",
          options: ["1", "5", "10", "50"],
          correctAnswer: 1,
          explanation: "In a Soroban abacus, each bead in the upper deck represents a value of 5."
        },
        {
          question: "How many lower deck beads (earth beads) are present on each rod of a standard Soroban abacus?",
          options: ["3", "4", "5", "2"],
          correctAnswer: 1,
          explanation: "A standard Japanese Soroban has exactly 4 earth beads on each rod below the dividing beam."
        },
        {
          question: "When are beads considered active (counted in the total) on the abacus?",
          options: [
            "When pushed to the outer wooden frame",
            "When moved toward the central horizontal reckoning beam",
            "When all beads touch each other",
            "Only when placed on the extreme right rod"
          ],
          correctAnswer: 1,
          explanation: "Beads only contribute to the count when moved inward toward the central dividing beam."
        },
        {
          question: "Which small-friend complement formula is applied when adding 4 and lower beads are insufficient?",
          options: ["+4 = +10 - 6", "+4 = +5 - 1", "+4 = +5 + 1", "+4 = +2 + 2"],
          correctAnswer: 1,
          explanation: "The 5-complement formula for +4 is +5 - 1 because 4 and 1 are complementary pairs summing to 5."
        },
        {
          question: "What is the 'big friend' (10-complement) of the number 7?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1,
          explanation: "The complement of 7 in base 10 is 3, because 7 + 3 = 10."
        },
        {
          question: "If a rod displays 1 upper bead and 3 lower beads touching the beam, what number is represented?",
          options: ["4", "7", "8", "9"],
          correctAnswer: 2,
          explanation: "Upper bead = 5, plus 3 lower beads (each = 1): 5 + 3 = 8."
        },
        {
          question: "To subtract 8 using the 10-complement rule on the abacus, what actions are taken?",
          options: [
            "Subtract 10 on left rod, add 2 on current rod",
            "Add 10 on left rod, subtract 2 on current rod",
            "Subtract 5 on current rod, subtract 3 on left rod",
            "Clear all beads on the current rod"
          ],
          correctAnswer: 0,
          explanation: "The formula -8 is -10 + 2: push down 1 bead on the tens rod (-10) and add 2 beads on the units rod (+2)."
        },
        {
          question: "In what direction are calculations generally performed on a Soroban abacus?",
          options: [
            "Right to left (units to hundreds)",
            "Left to right (highest place value to lowest)",
            "From the center outward",
            "Bottom to top"
          ],
          correctAnswer: 1,
          explanation: "Calculations on the Soroban are performed from left to right (highest place value first), mirroring mental math processes."
        },
        {
          question: "What is 'Anzan' in the context of Soroban arithmetic?",
          options: [
            "A digital calculator application",
            "The practice of calculating mentally by visualizing an internal abacus",
            "A wooden abacus cleaning tool",
            "A test grading certification"
          ],
          correctAnswer: 1,
          explanation: "Anzan is the Japanese term for mental arithmetic performed by visualizing the beads of an abacus moving internally."
        },
        {
          question: "Using mental arithmetic: What is the result of 47 + 28 - 15?",
          options: ["58", "60", "62", "64"],
          correctAnswer: 1,
          explanation: "47 + 28 = 75; 75 - 15 = 60."
        }
      ]
    }
  },

  // 2. Basic English Communication
  {
    slug: "basic-english-communication",
    title: "Basic English Communication",
    description: "Learn essential conversational English for everyday life, school, and public interactions. Master practical greetings, self-introductions, polite requests, directions, and phone etiquette.",
    category: "English & Languages",
    learningGroup: "Standards 6–8",
    level: "Beginner",
    learningObjectives: [
      "Introduce yourself and others with confidence and correct grammar",
      "Use polite expressions (please, thank you, excuse me) in social contexts",
      "Formulate questions using who, what, where, when, why, and how",
      "Describe daily routines, family, hobbies, and immediate surroundings",
      "Conduct short telephone conversations and navigate basic social situations"
    ],
    prerequisites: ["Familiarity with English alphabet and basic phonics"],
    estimatedDuration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Greetings, Farewells & Self Introductions",
        objective: "Introduce yourself clearly, state your name, school, and interests, and greet others appropriately at different times of day.",
        description: "Master formal and informal greetings and deliver a polished 30-second self-introduction.",
        content: `### 1. Greetings by Time of Day
* **Morning (Dawn to 12:00 PM):** "Good morning! How are you today?"
* **Afternoon (12:00 PM to 5:00 PM):** "Good afternoon, teacher / sir / madam."
* **Evening (5:00 PM onwards):** "Good evening!" (Note: "Good night" is only used when parting or going to sleep!)

### 2. The 4-Part Self Introduction
1. **Greeting:** "Hello everyone / Good morning."
2. **Name & Age:** "My name is Priya. I am 13 years old."
3. **School & Location:** "I study in Standard 8 at Government High School, Madurai."
4. **Hobby / Ambition:** "I enjoy reading science books and playing badminton. My goal is to become an engineer."

### 3. Common Error to Avoid
* **Incorrect:** "Myself Priya."
* **Correct:** "I am Priya" or "My name is Priya."`,
        keyTakeaways: [
          "Never say 'Myself [Name]'; always say 'I am [Name]' or 'My name is [Name]'.",
          "'Good night' is a farewell, not a greeting."
        ],
        practiceActivity: {
          instructions: "Choose the correct sentence to introduce yourself to a new teacher.",
          problem: "Which sentence is grammatically correct and polite?\nA) Myself Rajesh from 7th class.\nB) Good morning teacher, my name is Rajesh and I am in Standard 7.\nC) Hey teacher, I Rajesh.",
          solution: "B is correct. It includes a polite greeting, correct verb 'is', and standard phrasing.",
          hints: ["Avoid 'Myself'", "Include a polite greeting"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 900,
        order: 0,
        isPreview: true
      },
      {
        title: "Polite Requests, Gratitude & Apologies",
        objective: "Use modal verbs 'could', 'may', and polite phrases to ask for help, apologize, and express thanks.",
        description: "Learn the power of 'the magic words' in conversational English to build respectful relationships.",
        content: `### 1. The Magic Words
* **Please:** softens requests ("Please pass the notebook.")
* **Thank you / You are welcome:** acknowledges assistance
* **Excuse me:** used to get attention or move past someone
* **I am sorry / Pardon me:** acknowledges mistakes

### 2. Asking for Permission
* "May I come in, sir?" (Formal, for teachers and elders)
* "Could you please lend me your pencil?" (Polite request)
* "Can I borrow this book?" (Informal, with friends)

### 3. Responding to Gratitude
When someone says "Thank you", reply with:
* "You are welcome."
* "It is my pleasure."
* "No problem at all!" (Informal)`,
        keyTakeaways: [
          "Use 'May I' for formal permission and 'Could you' for polite requests.",
          "Always acknowledge a favor with 'Thank you' and respond with 'You are welcome'."
        ],
        practiceActivity: {
          instructions: "Convert the blunt statement into a polite request.",
          problem: "Blunt: 'Give me water.' Make it polite.",
          solution: "'Could you please give me a glass of water?' or 'May I please have some water?'",
          hints: ["Use 'Could you please...'", "Add polite words"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 920,
        order: 1,
        isPreview: false
      },
      {
        title: "Asking and Answering 5W1H Questions",
        objective: "Formulate and respond to questions using Who, What, Where, When, Why, and How.",
        description: "Master question words to ask directions, clarify instructions, and seek information.",
        content: `### 1. The 5W + 1H Family
* **Who (Person):** "Who is your English teacher?" -> "Mrs. Shanthi is my teacher."
* **What (Thing/Action):** "What are you studying?" -> "I am studying algebra."
* **Where (Place):** "Where is the library?" -> "It is on the second floor next to the lab."
* **When (Time):** "When does the assembly start?" -> "It starts at 8:45 AM."
* **Why (Reason):** "Why were you absent yesterday?" -> "Because I had a fever."
* **How (Manner/Process):** "How do you solve this puzzle?" -> "By finding matching patterns."

### 2. Sentence Structure of Questions
Question Word + Helping Verb + Subject + Main Verb?
* Example: Where (QW) + do (HV) + you (Subj) + live (MV)?`,
        keyTakeaways: [
          "Every question word targets specific information: person, place, time, or reason.",
          "In questions, the auxiliary verb comes before the subject."
        ],
        practiceActivity: {
          instructions: "Fill in the blank with the appropriate question word.",
          problem: "_____ is your school located?",
          solution: "Where (asking for a location).",
          hints: ["Location requires 'Where'"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 960,
        order: 2,
        isPreview: false
      },
      {
        title: "Describing Daily Routines & Time Expressions",
        objective: "Use simple present tense to talk about daily habits, schedules, and tell the time accurately.",
        description: "Build fluent paragraphs describing morning to evening activities using sequence words.",
        content: `### 1. Sequence Connectors
Use connectors to link your actions:
* *First... Then... Next... After that... Finally...*

### 2. Example Routine
"First, I wake up at 6:00 AM. Then, I brush my teeth and drink warm water. Next, I help my mother and study for one hour. At 8:15 AM, I walk to school with my classmates. In the evening, after that, I play football with my friends. Finally, I complete my homework and go to sleep at 9:30 PM."

### 3. Telling Time
* 7:15 -> "Quarter past seven"
* 7:30 -> "Half past seven"
* 7:45 -> "Quarter to eight"`,
        keyTakeaways: [
          "Use simple present tense for habitual actions ('I wake up', 'She studies').",
          "Sequence words make spoken English sound natural and organized."
        ],
        practiceActivity: {
          instructions: "Identify the correct time phrase.",
          problem: "How do you say 8:15 in words?\nA) Quarter to eight\nB) Quarter past eight\nC) Half past eight",
          solution: "B) Quarter past eight.",
          hints: ["15 minutes after 8 is quarter past"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 980,
        order: 3,
        isPreview: false
      },
      {
        title: "Telephone Conversations & Public Etiquette",
        objective: "Communicate clearly over telephone calls and handle public inquiries at a bus stop, shop, or clinic.",
        description: "Learn essential phone phrases: answering, taking a message, clarifying audio, and polite sign-offs.",
        content: `### 1. Answering a Phone Call
* "Hello, Priya speaking. How may I help you?"
* "May I know who is speaking, please?"

### 2. Asking to Speak with Someone
* "Hello, could I please speak with Mr. Anand?"
* "I am calling on behalf of the science club."

### 3. When You Cannot Hear Clearly
* "Pardon me, your voice is breaking up. Could you please repeat that?"
* "Could you please speak a little louder? I am unable to hear you clearly."

### 4. Ending the Call Politely
* "Thank you for your time. Have a good day!"
* "Goodbye!"`,
        keyTakeaways: [
          "Always state your name when answering an unfamiliar phone call.",
          "Use polite clarification phrases like 'Could you please repeat that?' rather than shouting 'What?'."
        ],
        practiceActivity: {
          instructions: "Choose the polite response on a telephone call.",
          problem: "The caller's voice is unclear. What should you say?\nA) Speak loudly!\nB) What? I cannot hear!\nC) Excuse me, your voice is breaking. Could you please repeat that?",
          solution: "C is polite and constructive.",
          hints: ["Choose the polite modal request"]
        },
        videoUrl: "",
        videoType: "none",
        duration: 1040,
        order: 4,
        isPreview: false
      }
    ],
    assessment: {
      title: "Basic English Communication - Final Assessment",
      description: "Demonstrate your understanding of greetings, polite expressions, question words, and conversational etiquette.",
      passingPercentage: 70,
      questions: [
        {
          question: "Which of the following is the most appropriate greeting at 10:30 AM?",
          options: ["Good night", "Good evening", "Good morning", "Good afternoon"],
          correctAnswer: 2,
          explanation: "The morning greeting 'Good morning' is used from dawn until 12:00 noon."
        },
        {
          question: "Which sentence is grammatically standard when introducing yourself?",
          options: ["Myself Suresh.", "My name is Suresh.", "I Suresh.", "Me is Suresh."],
          correctAnswer: 1,
          explanation: "'My name is Suresh' or 'I am Suresh' are standard English forms. Starting with 'Myself' is grammatically incorrect in standard English."
        },
        {
          question: "What is the polite response when someone thanks you for helping them?",
          options: ["What do you want?", "You are welcome.", "Go away.", "Why thanks?"],
          correctAnswer: 1,
          explanation: "'You are welcome' or 'My pleasure' is the customary polite response to 'Thank you'."
        },
        {
          question: "Which question word is used to inquire about a location or place?",
          options: ["Who", "When", "Where", "Why"],
          correctAnswer: 2,
          explanation: "'Where' specifically asks about geographic locations, places, or positions."
        },
        {
          question: "How should you politely ask your teacher for permission to enter the classroom?",
          options: ["I am coming in.", "May I come in, teacher?", "Open the door!", "Can I enter or what?"],
          correctAnswer: 1,
          explanation: "'May I come in?' uses the formal modal auxiliary 'may' appropriate for addressing teachers and superiors."
        },
        {
          question: "What time is meant by 'quarter to four'?",
          options: ["4:15", "3:45", "4:45", "3:15"],
          correctAnswer: 1,
          explanation: "'Quarter to four' means 15 minutes before 4:00, which is 3:45."
        },
        {
          question: "If you cannot hear someone on a telephone call, what is the best phrase to use?",
          options: [
            "Shout louder!",
            "I am sorry, your voice is unclear. Could you please repeat that?",
            "Hang up the phone!",
            "You have bad phone."
          ],
          correctAnswer: 1,
          explanation: "Polite clarification using 'Could you please repeat that?' maintains professional communication etiquette."
        },
        {
          question: "Which sequence connector is best used to begin describing a sequence of morning events?",
          options: ["Finally", "First", "After that", "Last"],
          correctAnswer: 1,
          explanation: "'First' indicates the opening or initial action in a chronological sequence."
        },
        {
          question: "Which question word should fill the blank: '_____ wrote the national anthem?'",
          options: ["Who", "Where", "When", "What"],
          correctAnswer: 0,
          explanation: "'Who' asks about the identity of a person (the author/composer)."
        },
        {
          question: "When is 'Good night' used in spoken English?",
          options: [
            "When greeting someone at 8:00 PM for dinner",
            "When meeting a friend at 9:00 PM",
            "When taking leave or parting at night to go to sleep",
            "During the early morning sunrise"
          ],
          correctAnswer: 2,
          explanation: "'Good night' is strictly a farewell expression used when leaving at night or going to sleep; 'Good evening' is the greeting."
        }
      ]
    }
  }
];
