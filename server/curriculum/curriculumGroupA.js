/**
 * Full Curriculum - GROUP A: Standards 6–8 (18 Courses)
 * Complete educational courses with 5 lessons each and 10 assessment questions each.
 */

import { groupACourses as c1to2 } from "./definitionsGroupA.js";
import { groupAExtraCourses as c3to6 } from "./buildGroupAExtra.js";

// Helper to assemble lessons
function makeLessons(lessonsData) {
  return lessonsData.map((l, idx) => ({
    title: l.title,
    objective: l.objective || `Master the principles of ${l.title}.`,
    description: l.description || `In-depth exploration of ${l.title}.`,
    content: l.content,
    keyTakeaways: l.keyTakeaways || ["Understand core definitions", "Apply step-by-step problem solving", "Practice exercises regularly"],
    practiceActivity: l.practiceActivity || {
      instructions: "Solve the practice problem to test your understanding.",
      problem: `Apply the concept of ${l.title} to solve a practical exercise.`,
      solution: `Solution applies ${l.title} principles accurately.`,
      hints: ["Review the concept definitions", "Follow the worked example"]
    },
    videoUrl: l.videoUrl || "",
    videoType: l.videoType || "none",
    duration: l.duration || 900 + idx * 60,
    order: idx,
    isPreview: idx === 0
  }));
}

// 7. Fractions, Decimals and Percentages
const c7 = {
  slug: "fractions-decimals-percentages",
  title: "Fractions, Decimals and Percentages",
  description: "Master visual fraction models, equivalent fractions, decimal place values, percentage conversions, and real-life shopping calculations.",
  category: "Mathematics",
  learningGroup: "Standards 6–8",
  level: "Beginner",
  learningObjectives: ["Represent fractions visually", "Add, subtract, multiply, and divide fractions", "Convert seamlessly between fractions, decimals, and percentages", "Calculate percentage discounts and profits"],
  prerequisites: ["Mathematics Fundamentals"],
  estimatedDuration: "12 hours",
  thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
  isPublished: true,
  lessons: makeLessons([
    {
      title: "Visualizing Fractions & Equivalent Fractions",
      content: "### Fractions as Equal Parts of a Whole\nA fraction $a/b$ represents $a$ equal parts out of a total $b$ parts.\n* **Numerator ($a$):** Number of parts considered.\n* **Denominator ($b$):** Total equal parts.\n* **Equivalent Fractions:** Multiplying or dividing both numerator and denominator by the same non-zero number produces equal value ($1/2 = 2/4 = 4/8$).",
      practiceActivity: { problem: "Find an equivalent fraction for 3/5 with a denominator of 20.", solution: "12/20 (Multiply numerator and denominator by 4: 3*4=12, 5*4=20).", hints: ["20 divided by 5 is 4"] }
    },
    {
      title: "Addition & Subtraction of Unlike Fractions",
      content: "### Finding the Common Denominator (LCM)\nTo add or subtract fractions with different denominators, first convert them to equivalent fractions with their LCM.\n* Example: $1/3 + 1/4$. $\\text{LCM}(3,4) = 12$.\n* $1/3 = 4/12$ and $1/4 = 3/12$.\n* Sum: $4/12 + 3/12 = 7/12$.",
      practiceActivity: { problem: "Evaluate: 2/5 + 1/3.", solution: "11/15 (LCM of 5 and 3 is 15: 6/15 + 5/15 = 11/15).", hints: ["Find LCM of 5 and 3"] }
    },
    {
      title: "Multiplication and Division of Fractions",
      content: "### Fraction Operations\n* **Multiplication:** Multiply straight across: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$.\n* **Division:** Multiply by the reciprocal (flip the second fraction): $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.\n* Example: $\\frac{3}{4} \\div \\frac{2}{5} = \\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8} = 1\\frac{7}{8}$.",
      practiceActivity: { problem: "Calculate: (2/3) * (9/10).", solution: "3/5 (18/30 simplified by dividing by 6 gives 3/5).", hints: ["Cross-cancel before multiplying"] }
    },
    {
      title: "Decimals and Place Value System",
      content: "### Decimals as Base-10 Fractions\nDecimals extend place value to the right of the decimal point:\n* Tenths ($1/10 = 0.1$)\n* Hundredths ($1/100 = 0.01$)\n* Thousandths ($1/1000 = 0.001$)\n* Example: $0.75 = 75/100 = 3/4$.",
      practiceActivity: { problem: "Convert 0.375 into a simplified fraction.", solution: "3/8 (375/1000 divided by 125/125 = 3/8).", hints: ["Divide 375 and 1000 by 125"] }
    },
    {
      title: "Percentages & Real-Life Discount Calculations",
      content: "### Percent Means 'Per One Hundred'\n* $P\\% = P / 100$.\n* Finding percentage of a number: $20\\%$ of $450 = \\frac{20}{100} \\times 450 = 90$.\n* **Discount Price:** Original Price - Discount Amount. A shirt priced at Rs. 600 with $15\\%$ discount costs $600 - 90 = \\text{Rs. } 510$.",
      practiceActivity: { problem: "A book costs Rs. 400. If there is a 25% discount, what is the selling price?", solution: "Rs. 300 (Discount = 25% of 400 = 100; Price = 400 - 100 = Rs. 300).", hints: ["25% is one quarter"] }
    }
  ]),
  assessment: {
    title: "Fractions, Decimals and Percentages Assessment",
    description: "Evaluate your fraction operations, decimal conversions, and percentage mastery.",
    passingPercentage: 70,
    questions: [
      { question: "What is 3/4 expressed as a decimal?", options: ["0.25", "0.50", "0.75", "0.85"], correctAnswer: 2, explanation: "3 divided by 4 equals 0.75." },
      { question: "Evaluate: 1/2 + 2/3.", options: ["3/5", "5/6", "7/6", "1/6"], correctAnswer: 1, explanation: "LCM of 2 and 3 is 6: 3/6 + 4/6 = 7/6." },
      { question: "What is 15% of 200?", options: ["15", "30", "45", "60"], correctAnswer: 1, explanation: "(15 / 100) * 200 = 30." },
      { question: "Evaluate: (3/5) / (2/3).", options: ["6/15", "9/10", "1/2", "5/6"], correctAnswer: 1, explanation: "(3/5) * (3/2) = 9/10." },
      { question: "Which fraction is equivalent to 4/6 in simplest form?", options: ["1/2", "2/3", "3/4", "5/6"], correctAnswer: 1, explanation: "Dividing numerator and denominator by 2 gives 2/3." },
      { question: "What is 0.08 expressed as a percentage?", options: ["0.8%", "8%", "80%", "0.08%"], correctAnswer: 1, explanation: "0.08 * 100 = 8%." },
      { question: "If a school bag costs Rs. 800 and is discounted by 20%, what is the discount amount?", options: ["Rs. 80", "Rs. 160", "Rs. 200", "Rs. 640"], correctAnswer: 1, explanation: "20% of 800 = (20/100) * 800 = Rs. 160." },
      { question: "What is the reciprocal of 7/9?", options: ["9/7", "-7/9", "7/9", "1/7"], correctAnswer: 0, explanation: "The reciprocal flips numerator and denominator: 9/7." },
      { question: "Convert 2/5 to a percentage.", options: ["20%", "25%", "40%", "50%"], correctAnswer: 2, explanation: "(2/5) * 100% = 40%." },
      { question: "Which is the largest value?", options: ["0.6", "5/8", "65%", "0.62"], correctAnswer: 2, explanation: "0.6 = 60%, 5/8 = 62.5%, 0.62 = 62%, 65% is the largest." }
    ]
  }
};

// 8. Introduction to Algebra and Geometry
const c8 = {
  slug: "intro-algebra-geometry",
  title: "Introduction to Algebra and Geometry",
  description: "Bridge arithmetic to algebra and geometry with variables, simple linear equations, angle classifications, triangles, perimeter, and area.",
  category: "Mathematics",
  learningGroup: "Standards 6–8",
  level: "Beginner",
  learningObjectives: ["Use variables to represent unknown numbers", "Solve single-variable linear equations (e.g. 2x + 5 = 15)", "Classify angles (acute, right, obtuse, straight)", "Calculate perimeter and area of rectangles, squares, and triangles"],
  prerequisites: ["Mathematics Fundamentals"],
  estimatedDuration: "14 hours",
  thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
  isPublished: true,
  lessons: makeLessons([
    {
      title: "Variables, Constants & Algebraic Expressions",
      content: "### Algebra as Generalized Arithmetic\n* **Variable:** A symbol (usually a letter like $x, y, n$) representing an unknown value.\n* **Constant:** A fixed number ($5, -3, 100$).\n* **Expression:** A combination of variables, constants, and operators without an equal sign ($3x + 7$).",
      practiceActivity: { problem: "Evaluate the expression 4x - 3 when x = 5.", solution: "17 (4*5 - 3 = 20 - 3 = 17).", hints: ["Substitute 5 in place of x"] }
    },
    {
      title: "Solving Simple Linear Equations",
      content: "### The Balance Scale Principle\nAn equation is like a balanced scale: whatever operation you perform on one side, you must perform on the other.\n* Example: $2x + 7 = 19$.\n  - Subtract 7 from both sides: $2x = 12$.\n  - Divide both sides by 2: $x = 6$.\n  - Check: $2(6) + 7 = 12 + 7 = 19$. Correct!",
      practiceActivity: { problem: "Solve for y: 3y - 8 = 16.", solution: "y = 8 (3y = 24 -> y = 24 / 3 = 8).", hints: ["Add 8 to both sides first"] }
    },
    {
      title: "Angles: Acute, Right, Obtuse & Supplementary",
      content: "### Angle Types\n* **Acute Angle:** Less than $90^\\circ$.\n* **Right Angle:** Exactly $90^\\circ$.\n* **Obtuse Angle:** Between $90^\\circ$ and $180^\\circ$.\n* **Straight Angle:** Exactly $180^\\circ$.\n* **Complementary Angles:** Sum to $90^\\circ$.\n* **Supplementary Angles:** Sum to $180^\\circ$.",
      practiceActivity: { problem: "If angle A is 65 degrees, what is its complementary angle?", solution: "25 degrees (90 - 65 = 25).", hints: ["Complementary angles sum to 90 degrees"] }
    },
    {
      title: "Triangles & The Angle Sum Property",
      content: "### Properties of Triangles\n* The sum of the interior angles of any triangle is always **$180^\\circ$**.\n* **Equilateral:** All 3 sides and angles equal ($60^\\circ$ each).\n* **Isosceles:** 2 equal sides and 2 equal opposite angles.\n* **Scalene:** All 3 sides and angles different.",
      practiceActivity: { problem: "A triangle has angles measuring 50 degrees and 70 degrees. What is the third angle?", solution: "60 degrees (180 - (50 + 70) = 180 - 120 = 60 degrees).", hints: ["All 3 angles sum to 180"] }
    },
    {
      title: "Perimeter and Area of 2D Polygons",
      content: "### Formulas\n* **Perimeter:** Total distance around the outer boundary.\n  - Rectangle: $2(l + w)$\n  - Square: $4s$\n* **Area:** Space enclosed inside the 2D boundary.\n  - Rectangle: $l \\times w$\n  - Square: $s^2$\n  - Triangle: $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$",
      practiceActivity: { problem: "Find the area of a triangle with base 10 cm and height 6 cm.", solution: "30 cm^2 (1/2 * 10 * 6 = 30 cm^2).", hints: ["Formula: 1/2 * base * height"] }
    }
  ]),
  assessment: {
    title: "Introduction to Algebra and Geometry Assessment",
    description: "Evaluate your algebra equation solving, angle classifications, and area calculations.",
    passingPercentage: 70,
    questions: [
      { question: "Solve for x: 3x + 9 = 24.", options: ["3", "5", "7", "9"], correctAnswer: 1, explanation: "3x = 24 - 9 = 15 -> x = 15 / 3 = 5." },
      { question: "What is the sum of interior angles in any triangle?", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1, explanation: "The angles of any triangle always sum to 180°." },
      { question: "What type of angle measures 125°?", options: ["Acute", "Right", "Obtuse", "Reflex"], correctAnswer: 2, explanation: "Angles between 90° and 180° are obtuse angles." },
      { question: "Two angles that sum to 90° are called:", options: ["Supplementary", "Complementary", "Adjacent", "Vertical"], correctAnswer: 1, explanation: "Complementary angles sum to 90°." },
      { question: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?", options: ["13 cm", "26 cm", "40 cm", "80 cm"], correctAnswer: 1, explanation: "Perimeter = 2 * (8 + 5) = 2 * 13 = 26 cm." },
      { question: "What is the area of a square with side length 7 cm?", options: ["14 cm²", "28 cm²", "49 cm²", "56 cm²"], correctAnswer: 2, explanation: "Area = side * side = 7 * 7 = 49 cm²." },
      { question: "In expression 5y - 4, what is the variable?", options: ["5", "y", "-", "4"], correctAnswer: 1, explanation: "y is the letter representing the variable." },
      { question: "If one angle of a right-angled triangle is 35°, what is the other acute angle?", options: ["45°", "55°", "65°", "90°"], correctAnswer: 1, explanation: "90° - 35° = 55° (or 180 - 90 - 35 = 55°)." },
      { question: "What is the area of a triangle with base 12 m and height 5 m?", options: ["30 m²", "60 m²", "17 m²", "34 m²"], correctAnswer: 0, explanation: "Area = 0.5 * 12 * 5 = 30 m²." },
      { question: "Solve for p: p / 4 = 6.", options: ["1.5", "10", "20", "24"], correctAnswer: 3, explanation: "p = 6 * 4 = 24." }
    ]
  }
};

// Export curated Group A courses
export const groupACoursesComplete = [
  ...c1to2,
  ...c3to6,
  c7,
  c8
];
