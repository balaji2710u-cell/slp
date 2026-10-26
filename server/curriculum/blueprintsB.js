/**
 * Blueprints for GROUP B (Standards 7–10): 18 Courses
 * Rigorous educational content with 5 lessons each and 10 assessment questions each.
 */

export const blueprintsB = [
  // 1. Advanced Mathematics and Algebra
  {
    slug: "advanced-math-algebra",
    title: "Advanced Mathematics and Algebra",
    description: "Master quadratic equations, polynomials, algebraic identities, linear inequalities, and simultaneous systems.",
    category: "Mathematics",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Factorize polynomials using algebraic identities", "Solve quadratic equations using factoring and the quadratic formula", "Graph and solve simultaneous linear equations in two variables", "Solve linear inequalities and plot solution sets on number lines", "Apply algebraic modeling to projectile and profit word problems"],
    prerequisites: ["Introduction to Algebra and Geometry"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Polynomials & Standard Algebraic Identities", detail: "(a+b)^2 = a^2 + 2ab + b^2; (a-b)^2 = a^2 - 2ab + b^2; a^2 - b^2 = (a-b)(a+b); (x+a)(x+b) = x^2 + (a+b)x + ab.", problem: "Expand: (2x + 3)^2.", solution: "4x^2 + 12x + 9." },
      { title: "Quadratic Equations: Factoring & Splitting Terms", detail: "ax^2 + bx + c = 0. Finding factors that multiply to ac and add to b.", problem: "Solve: x^2 - 5x + 6 = 0.", solution: "x = 2 or x = 3 ((x-2)(x-3) = 0)." },
      { title: "The Quadratic Formula & Discriminant", detail: "x = (-b +- sqrt(b^2 - 4ac)) / (2a). Discriminant D = b^2 - 4ac: D > 0 (2 real roots), D = 0 (1 real root), D < 0 (no real roots).", problem: "Find discriminant of x^2 + 4x + 4 = 0.", solution: "D = 16 - 16 = 0 (one repeated real root)." },
      { title: "Simultaneous Linear Equations in Two Variables", detail: "Substitution and elimination methods. 2x + y = 10 and x - y = 2.", problem: "Solve: x + y = 14 and x - y = 4.", solution: "x = 9, y = 5." },
      { title: "Linear Inequalities on the Number Line", detail: "Solving 3x - 5 <= 7. Reversing inequality sign when multiplying/dividing by a negative number.", problem: "Solve: -2x < 8.", solution: "x > -4 (dividing by -2 reverses inequality)." }
    ],
    questions: [
      { q: "What is the factorization of x^2 - 16?", opts: ["(x - 4)(x - 4)", "(x + 4)(x - 4)", "(x + 8)(x - 2)", "(x - 16)(x + 1)"], ans: 1, exp: "Difference of squares: a^2 - b^2 = (a+b)(a-b)." },
      { q: "What are the roots of x^2 - 7x + 12 = 0?", opts: ["2 and 6", "3 and 4", "-3 and -4", "1 and 12"], ans: 1, exp: "(x - 3)(x - 4) = 0 -> x = 3, 4." },
      { q: "If the discriminant b^2 - 4ac > 0, the quadratic equation has:", opts: ["Two distinct real roots", "One repeated real root", "No real roots", "Zero roots"], ans: 0, exp: "Positive discriminant yields two distinct real solutions." },
      { q: "Solve simultaneous equations: x + y = 10, x - y = 2.", opts: ["x=5, y=5", "x=6, y=4", "x=7, y=3", "x=8, y=2"], ans: 1, exp: "Adding equations: 2x = 12 -> x = 6, y = 4." },
      { q: "What happens to an inequality sign when dividing both sides by a negative number?", opts: ["It remains unchanged", "It reverses direction", "It turns into an equal sign", "It cancels out"], ans: 1, exp: "Multiplying or dividing by a negative reverses inequality." },
      { q: "What is the value of (a + b)^2 - (a - b)^2?", opts: ["2ab", "4ab", "2(a^2 + b^2)", "0"], ans: 1, exp: "(a^2+2ab+b^2) - (a^2-2ab+b^2) = 4ab." },
      { q: "Solve: 2x - 7 < 5.", opts: ["x < 6", "x > 6", "x < -1", "x > 1"], ans: 0, exp: "2x < 12 -> x < 6." },
      { q: "What is the degree of the polynomial 4x^3 - 5x^2 + 7?", opts: ["1", "2", "3", "5"], ans: 2, exp: "The highest exponent of the variable is 3." },
      { q: "For what value of k does x^2 + 6x + k = 0 have equal roots?", opts: ["3", "6", "9", "12"], ans: 2, exp: "D = b^2 - 4ac = 36 - 4k = 0 -> 4k = 36 -> k = 9." },
      { q: "If x = 3 is a root of x^2 - kx + 6 = 0, what is k?", opts: ["2", "3", "5", "6"], ans: 2, exp: "3^2 - 3k + 6 = 0 -> 15 - 3k = 0 -> k = 5." }
    ]
  },

  // 2. Geometry, Mensuration and Trigonometry
  {
    slug: "geometry-mensuration-trigonometry",
    title: "Geometry, Mensuration and Trigonometry",
    description: "Master Pythagoras theorem, circle theorems, volume/surface area of 3D solids, and sine, cosine, tangent trigonometric ratios.",
    category: "Mathematics",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Apply Pythagoras theorem in right triangles", "Compute surface areas and volumes of cylinders, cones, and spheres", "Calculate arc length and sector areas of circles", "Define sine, cosine, and tangent ratios (SOH-CAH-TOA)", "Solve heights and distances angles of elevation problems"],
    prerequisites: ["Introduction to Algebra and Geometry"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Pythagoras Theorem & Right Triangle Applications", detail: "In right triangle: a^2 + b^2 = c^2 (hypotenuse). Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17).", problem: "A right triangle has legs 6 cm and 8 cm. Find hypotenuse.", solution: "10 cm (sqrt(36 + 64) = sqrt(100) = 10)." },
      { title: "Circles: Tangents, Chords & Arc Lengths", detail: "Circumference = 2*pi*r, Area = pi*r^2. Arc length = (theta/360)*2*pi*r. Sector area = (theta/360)*pi*r^2.", problem: "Find circumference of circle with radius 7 cm (pi=22/7).", solution: "44 cm (2 * 22/7 * 7 = 44)." },
      { title: "3D Mensuration: Cylinder, Cone & Sphere", detail: "Cylinder V = pi*r^2*h; Cone V = (1/3)*pi*r^2*h; Sphere V = (4/3)*pi*r^3, Surface Area = 4*pi*r^2.", problem: "Volume of cylinder with r=3 cm, h=7 cm (pi=22/7)?", solution: "198 cm^3 (22/7 * 9 * 7 = 198)." },
      { title: "Introduction to Trigonometric Ratios (SOH CAH TOA)", detail: "sin(theta) = opp/hyp; cos(theta) = adj/hyp; tan(theta) = opp/adj. Key values at 0, 30, 45, 60, 90 degrees.", problem: "What is sin(30 degrees)?", solution: "1/2 (0.5)." },
      { title: "Heights & Distances: Angles of Elevation", detail: "Angle of elevation looking up; angle of depression looking down. tan(theta) = Height / Distance.", problem: "A 10m pole casts a shadow of 10m. What is sun's elevation angle?", solution: "45 degrees (tan(theta) = 10/10 = 1 -> theta = 45)." }
    ],
    questions: [
      { q: "In a right triangle with legs 5 cm and 12 cm, what is the hypotenuse?", opts: ["13 cm", "14 cm", "15 cm", "17 cm"], ans: 0, exp: "sqrt(25 + 144) = sqrt(169) = 13 cm." },
      { q: "What is the formula for the volume of a sphere of radius r?", opts: ["4*pi*r^2", "(4/3)*pi*r^3", "(1/3)*pi*r^2*h", "2*pi*r*h"], ans: 1, exp: "Volume of a sphere is (4/3)*pi*r^3." },
      { q: "What is the value of tan(45°)?", opts: ["0", "1/2", "1", "sqrt(3)"], ans: 2, exp: "tan(45°) = 1." },
      { q: "What is the area of a circle with radius 14 cm (pi = 22/7)?", opts: ["88 cm²", "154 cm²", "616 cm²", "308 cm²"], ans: 2, exp: "22/7 * 14 * 14 = 22 * 28 = 616 cm²." },
      { q: "In trigonometry, what is sin²(θ) + cos²(θ) equal to?", opts: ["0", "1", "2", "tan(θ)"], ans: 1, exp: "Fundamental identity: sin²(θ) + cos²(θ) = 1." },
      { q: "A ladder 10 m long leans against a wall reaching 8 m height. How far is the foot from the wall?", opts: ["2 m", "4 m", "6 m", "8 m"], ans: 2, exp: "sqrt(10^2 - 8^2) = sqrt(100 - 64) = sqrt(36) = 6 m." },
      { q: "What is the curved surface area of a cylinder of radius r and height h?", opts: ["pi*r^2*h", "2*pi*r*h", "2*pi*r*(r+h)", "pi*r*l"], ans: 1, exp: "Curved surface area is 2*pi*r*h." },
      { q: "What is cos(60°)?", opts: ["0", "1/2", "sqrt(3)/2", "1"], ans: 1, exp: "cos(60°) = 1/2." },
      { q: "What is the relationship between tangent and circle radius at point of contact?", opts: ["Parallel", "Perpendicular (90°)", "At 45°", "Opposite"], ans: 1, exp: "A tangent is always perpendicular to radius at contact." },
      { q: "If tan(θ) = 3/4, what is sin(θ)?", opts: ["3/5", "4/5", "5/3", "4/3"], ans: 0, exp: "Opp=3, Adj=4 -> Hyp=5 -> sin(θ) = 3/5." }
    ]
  },

  // 3. Statistics and Probability
  {
    slug: "statistics-probability",
    title: "Statistics and Probability",
    description: "Learn measures of central tendency (mean, median, mode), grouped data histograms, and theoretical/experimental probability.",
    category: "Mathematics",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Calculate mean, median, and mode for raw and grouped data", "Construct and interpret frequency polygons and histograms", "Calculate range and standard deviation concepts", "Compute probability of single and compound events", "Apply probability to genetics and game theory scenarios"],
    prerequisites: ["Mathematics Fundamentals"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Measures of Central Tendency: Mean, Median, Mode", detail: "Mean = sum/n. Median = middle value of ordered list. Mode = most frequent value.", problem: "Find median of: 3, 7, 2, 9, 5.", solution: "5 (Ordered: 2, 3, 5, 7, 9; middle is 5)." },
      { title: "Grouped Frequency Tables & Histograms", detail: "Class intervals, class marks, frequencies, cumulative frequencies (ogives).", problem: "What is the class mark of interval 20-30?", solution: "25 ((20 + 30) / 2 = 25)." },
      { title: "Measures of Dispersion: Range & Variance", detail: "Range = Max - Min. Dispersion shows how spread out data is around the mean.", problem: "Find range of: 12, 5, 29, 18, 7.", solution: "24 (29 - 5 = 24)." },
      { title: "Theoretical Probability & Sample Spaces", detail: "P(E) = favorable outcomes / total outcomes. 0 <= P(E) <= 1. P(not E) = 1 - P(E).", problem: "Probability of rolling an even number on a 6-sided die?", solution: "1/2 (3/6 = 1/2)." },
      { title: "Compound Events & Independence", detail: "Tossing two coins: HH, HT, TH, TT. Probability of at least one head = 3/4.", problem: "What is the probability of flipping two heads in a row?", solution: "1/4 (1/2 * 1/2 = 1/4)." }
    ],
    questions: [
      { q: "What is the mean of: 4, 8, 12, 16, 20?", opts: ["10", "12", "14", "16"], ans: 1, exp: "Sum = 60; 60 / 5 = 12." },
      { q: "What is the mode of data set: 2, 5, 3, 5, 7, 5, 8, 2?", opts: ["2", "3", "5", "7"], ans: 2, exp: "5 appears 3 times, which is the most frequent." },
      { q: "What is the probability of drawing an Ace from a standard 52-card deck?", opts: ["1/13", "1/52", "1/4", "4/13"], ans: 0, exp: "4 Aces / 52 cards = 1/13." },
      { q: "The probability of an impossible event is:", opts: ["0", "0.5", "1", "-1"], ans: 0, exp: "Impossible events have a probability of exactly 0." },
      { q: "If P(E) = 0.35, what is P(not E)?", opts: ["0.35", "0.65", "0.75", "1.35"], ans: 1, exp: "1 - 0.35 = 0.65." },
      { q: "What is the median of: 10, 15, 20, 25, 30, 35?", opts: ["20", "22.5", "25", "21"], ans: 1, exp: "Middle pair is 20 and 25: (20 + 25) / 2 = 22.5." },
      { q: "What is the sum of probabilities of all elementary outcomes of an experiment?", opts: ["0", "0.5", "1", "100"], ans: 2, exp: "The total probability space always sums to 1." },
      { q: "When rolling two standard dice, how many total possible outcomes exist?", opts: ["12", "24", "36", "64"], ans: 2, exp: "6 * 6 = 36 outcomes." },
      { q: "What is the range of: 45, 12, 88, 34, 91, 23?", opts: ["68", "79", "88", "91"], ans: 1, exp: "91 - 12 = 79." },
      { q: "In a bag with 4 red and 6 blue marbles, what is the probability of picking red?", opts: ["4/6", "2/5", "3/5", "1/2"], ans: 1, exp: "4 / (4 + 6) = 4/10 = 2/5." }
    ]
  },

  // 4. Physics: Motion, Force and Energy
  {
    slug: "physics-motion-force-energy",
    title: "Physics: Motion, Force and Energy",
    description: "Explore kinematics equations, Newton's 3 laws of motion, momentum, work, kinetic/potential energy, and conservation laws.",
    category: "Science",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Differentiate speed vs velocity and distance vs displacement", "Apply kinematic equations: v = u + at, s = ut + 0.5at^2, v^2 = u^2 + 2as", "Explain and calculate Newton's 3 laws (F = ma)", "Calculate Work (W = F * d), Kinetic Energy (0.5mv^2), and Potential Energy (mgh)", "Demonstrate conservation of mechanical energy"],
    prerequisites: ["Physics in Everyday Life"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Kinematics: Velocity, Speed & Acceleration", detail: "Displacement is vector; distance is scalar. a = (v - u) / t. Acceleration due to gravity g = 9.8 m/s^2.", problem: "A car accelerates from 0 to 20 m/s in 4 seconds. What is its acceleration?", solution: "5 m/s^2 (20 / 4 = 5)." },
      { title: "The 3 Equations of Motion", detail: "1) v = u + at | 2) s = ut + 0.5at^2 | 3) v^2 = u^2 + 2as.", problem: "A stone drops from rest for 3s (g=10 m/s^2). What distance does it fall?", solution: "45 m (s = 0 + 0.5 * 10 * 9 = 45 m)." },
      { title: "Newton's Laws of Motion & Momentum", detail: "1st: Inertia. 2nd: F = ma. 3rd: Action-Reaction. Momentum p = mv.", problem: "Find force needed to accelerate a 2 kg mass at 4 m/s^2.", solution: "8 N (F = 2 * 4 = 8 N)." },
      { title: "Work, Power & The Work-Energy Theorem", detail: "Work W = F * d * cos(theta) [Joules]. Power P = W / t [Watts]. 1 Horsepower = 746 Watts.", problem: "A force of 50 N moves a box 4 m in force direction. Work done?", solution: "200 J (50 * 4 = 200 J)." },
      { title: "Kinetic, Potential Energy & Conservation", detail: "KE = 0.5*m*v^2; GPE = m*g*h. Total mechanical energy E = KE + PE remains constant in closed system.", problem: "A 2 kg ball is at 5 m height (g=10). Find its potential energy.", solution: "100 J (PE = 2 * 10 * 5 = 100 J)." }
    ],
    questions: [
      { q: "What is the SI unit of momentum?", opts: ["kg·m/s", "Newton", "Joule", "m/s²"], ans: 0, exp: "Momentum p = mv has units kg·m/s." },
      { q: "Which equation of motion relates velocity, acceleration, and displacement?", opts: ["v = u + at", "s = ut + 0.5at²", "v² = u² + 2as", "F = ma"], ans: 2, exp: "v² = u² + 2as." },
      { q: "According to Newton's Second Law, Force equals:", opts: ["m / a", "m * a", "m * v", "0.5 * m * v²"], ans: 1, exp: "F = ma." },
      { q: "What is the kinetic energy of a 4 kg object moving at 3 m/s?", opts: ["12 J", "18 J", "36 J", "72 J"], ans: 1, exp: "KE = 0.5 * 4 * 3^2 = 2 * 9 = 18 J." },
      { q: "What happens to the kinetic energy if an object's speed doubles?", opts: ["Doubles", "Triples", "Quadruples (4x)", "Remains same"], ans: 2, exp: "KE depends on v^2, so doubling speed quadruples energy." },
      { q: "What is the SI unit of Power?", opts: ["Joule", "Newton", "Watt", "Pascal"], ans: 2, exp: "Power is measured in Watts (Joules/sec)." },
      { q: "Which property measures an object's resistance to change in motion?", opts: ["Friction", "Inertia (Mass)", "Gravity", "Velocity"], ans: 1, exp: "Inertia depends on mass (Newton's 1st law)." },
      { q: "If an object moves in a circular path at constant speed, is it accelerating?", opts: ["No, speed is constant", "Yes, because direction changes continuously", "Only when stopping", "Never"], ans: 1, exp: "Changing direction means velocity is changing (centripetal acceleration)." },
      { q: "What is the acceleration due to gravity near Earth's surface?", opts: ["4.9 m/s²", "9.8 m/s²", "19.6 m/s²", "32 m/s²"], ans: 1, exp: "g is approximately 9.8 m/s²." },
      { q: "Action and reaction forces in Newton's Third Law:", opts: ["Act on the same object and cancel out", "Act on different objects simultaneously", "Act at different times", "Have different magnitudes"], ans: 1, exp: "Action-reaction forces act on different interacting bodies." }
    ]
  },

  // 5. Chemistry: Atoms, Elements and Reactions
  {
    slug: "chemistry-atoms-reactions",
    title: "Chemistry: Atoms, Elements and Reactions",
    description: "Explore atomic structure, the periodic table, chemical bonding (ionic and covalent), balancing chemical equations, and reaction types.",
    category: "Science",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Describe subatomic particles: protons, neutrons, electrons", "Navigate the periodic table by groups and periods", "Differentiate ionic bonding (electron transfer) from covalent bonding (sharing)", "Balance chemical reaction equations according to mass conservation", "Identify combination, decomposition, displacement, and redox reactions"],
    prerequisites: ["General Science"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Atomic Structure & Subatomic Particles", detail: "Protons (+1, nucleus), Neutrons (0, nucleus), Electrons (-1, shells). Atomic number Z = protons; Mass number A = protons + neutrons.", problem: "An atom has 6 protons and 8 neutrons. What is its mass number?", solution: "14 (6 + 8 = 14)." },
      { title: "The Periodic Table Trends", detail: "Mendeleev and Modern Periodic Table (Moseley). 18 Groups, 7 Periods. Valence electrons determine chemical reactivity.", problem: "Which group contains noble / inert gases?", solution: "Group 18." },
      { title: "Chemical Bonding: Ionic vs Covalent", detail: "Ionic: metal loses e-, non-metal gains e- (e.g. NaCl). Covalent: non-metals share pairs of e- (e.g. H2O, CH4).", problem: "What type of bond forms between Sodium (Na) and Chlorine (Cl)?", solution: "Ionic bond (electron transfer)." },
      { title: "Balancing Chemical Equations", detail: "Law of Conservation of Mass: Atoms on reactant side must equal atoms on product side. __H2 + __O2 -> __H2O.", problem: "Balance: H2 + O2 -> H2O.", solution: "2H2 + O2 -> 2H2O." },
      { title: "Types of Reactions & Energy Changes", detail: "Combination (A+B->AB), Decomposition (AB->A+B), Displacement (Zn+CuSO4->ZnSO4+Cu), Exothermic (releases heat) vs Endothermic (absorbs heat).", problem: "Is respiration an exothermic or endothermic reaction?", solution: "Exothermic (releases energy)." }
    ],
    questions: [
      { q: "What particle determines the atomic number of an element?", opts: ["Neutron", "Proton", "Electron", "Positron"], ans: 1, exp: "Atomic number is defined by the number of protons." },
      { q: "What type of chemical bond involves sharing electron pairs?", opts: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], ans: 1, exp: "Covalent bonds share valence electrons." },
      { q: "What is the balanced coefficient for O2 in: 2Mg + O2 -> 2MgO?", opts: ["1", "2", "3", "4"], ans: 0, exp: "1 molecule of O2 supplies 2 oxygen atoms to form 2 MgO." },
      { q: "Which element is the most abundant gas in Earth's atmosphere?", opts: ["Oxygen", "Nitrogen (N2)", "Carbon dioxide", "Argon"], ans: 1, exp: "Nitrogen constitutes ~78% of the atmosphere." },
      { q: "What reaction absorbs heat from its surroundings?", opts: ["Exothermic", "Endothermic", "Combustion", "Neutralization"], ans: 1, exp: "Endothermic reactions absorb thermal energy." },
      { q: "What is the pH of an acidic solution?", opts: ["Greater than 7", "Less than 7", "Exactly 7", "Exactly 14"], ans: 1, exp: "Acids have pH < 7." },
      { q: "What happens when iron rusts?", opts: ["It loses weight", "It oxidizes by reacting with oxygen and water", "It melts", "It becomes an alloy"], ans: 1, exp: "Rusting is the slow oxidation of iron into hydrated iron oxide." },
      { q: "Which group of elements is unreactive and has a complete valence shell?", opts: ["Alkali metals", "Halogens", "Noble gases (Group 18)", "Transition metals"], ans: 2, exp: "Noble gases have complete octets (stable)." },
      { q: "What is the chemical formula for common table salt?", opts: ["KCl", "NaCl", "NaOH", "HCl"], ans: 1, exp: "Sodium chloride is NaCl." },
      { q: "According to the Law of Conservation of Mass:", opts: ["Mass increases in chemical reactions", "Mass cannot be created or destroyed in a chemical reaction", "Atoms transform into energy", "Products weigh less than reactants"], ans: 1, exp: "Total mass of reactants equals total mass of products." }
    ]
  },

  // 6. Biology: Cells, Genetics and Human Systems
  {
    slug: "biology-cells-genetics-systems",
    title: "Biology: Cells, Genetics and Human Systems",
    description: "Explore cell biology, organelles, mitosis/meiosis, DNA structure, Mendelian inheritance, and the endocrine/immune systems.",
    category: "Science",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Compare plant vs animal and prokaryotic vs eukaryotic cells", "Describe DNA double helix, genes, and chromosomes", "Predict genetic outcomes using Punnett squares", "Explain cellular division: Mitosis vs Meiosis", "Understand hormones and endocrine regulation"],
    prerequisites: ["Biology and the Human Body"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Cell Organelles: Nucleus, Mitochondria & Chloroplasts", detail: "Nucleus (DNA vault), Mitochondria (powerhouse producing ATP), Ribosomes (protein synthesis), Cell wall/chloroplasts (plants only).", problem: "Why are mitochondria called the powerhouses of the cell?", solution: "They generate ATP energy via cellular respiration." },
      { title: "Cell Division: Mitosis vs Meiosis", detail: "Mitosis: 1 cell -> 2 identical diploid daughter cells (growth/repair). Meiosis: 1 cell -> 4 genetically diverse haploid gametes (reproduction).", problem: "How many chromosomes do human body cells vs sperm/egg cells have?", solution: "46 chromosomes in body cells (2n); 23 in gametes (n)." },
      { title: "DNA, Genes & Chromosomes", detail: "Watson-Crick double helix. Nucleotide bases: Adenine pairs with Thymine (A-T), Cytosine pairs with Guanine (C-G).", problem: "If one strand of DNA is AGTC, what is complementary strand?", solution: "TCAG." },
      { title: "Mendelian Genetics & Punnett Squares", detail: "Gregor Mendel. Dominant (T) vs Recessive (t) alleles. Monohybrid cross: Tt x Tt gives 3 tall : 1 short phenotypic ratio.", problem: "What is the expected phenotype ratio of a Tt x Tt cross?", solution: "3 : 1 (75% dominant, 25% recessive)." },
      { title: "The Endocrine System & Hormonal Control", detail: "Pituitary (master gland), Thyroid (thyroxine/metabolism), Pancreas (insulin/glucagon for blood sugar), Adrenal (adrenaline fight-or-flight).", problem: "Which hormone regulates blood sugar?", solution: "Insulin (secreted by pancreas)." }
    ],
    questions: [
      { q: "Which organelle is known as the 'powerhouse of the cell'?", opts: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"], ans: 2, exp: "Mitochondria produce ATP cellular energy." },
      { q: "In DNA, which base always pairs with Adenine (A)?", opts: ["Cytosine", "Thymine", "Guanine", "Uracil"], ans: 1, exp: "Adenine pairs specifically with Thymine via two hydrogen bonds." },
      { q: "How many chromosomes do normal human somatic cells contain?", opts: ["23", "46 (23 pairs)", "48", "92"], ans: 1, exp: "Humans have 23 pairs (46 total) of chromosomes." },
      { q: "What is the father of modern genetics?", opts: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Robert Hooke"], ans: 1, exp: "Mendel uncovered inheritance laws through pea plant experiments." },
      { q: "Which cell organelle is found in plant cells but absent in animal cells?", opts: ["Mitochondria", "Cell wall and Chloroplast", "Ribosome", "Nucleus"], ans: 1, exp: "Cellulose cell walls and chloroplasts are unique to plants." },
      { q: "What type of cell division produces sperm and egg gametes?", opts: ["Mitosis", "Meiosis", "Binary fission", "Budding"], ans: 1, exp: "Meiosis reduces chromosome count by half to produce haploid gametes." },
      { q: "Which hormone prepares the body for 'fight or flight' during danger?", opts: ["Thyroxine", "Insulin", "Adrenaline", "Melatonin"], ans: 2, exp: "Adrenaline boosts heart rate and blood flow during stress." },
      { q: "In a monohybrid cross between two heterozygous tall plants (Tt x Tt), what proportion is dwarf (tt)?", opts: ["100%", "75%", "50%", "25%"], ans: 3, exp: "1 out of 4 (25%) offspring is tt." },
      { q: "What cellular structure synthesizes proteins?", opts: ["Lysosome", "Ribosome", "Vacuole", "Centrosome"], ans: 1, exp: "Ribosomes translate RNA into polypeptide proteins." },
      { q: "Which gland is called the 'master gland' of the endocrine system?", opts: ["Thyroid", "Adrenal", "Pituitary gland", "Pancreas"], ans: 2, exp: "The pituitary gland regulates other endocrine glands." }
    ]
  },

  // 7. Advanced English Communication
  {
    slug: "advanced-english-communication",
    title: "Advanced English Communication",
    description: "Master structured debates, persuasive speaking, nuanced vocabulary, idioms, active listening, and group discussion tactics.",
    category: "English & Languages",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Construct persuasive arguments using claims, evidence, and rebuttals", "Participate effectively in structured group discussions (GD)", "Use natural idioms and phrasal verbs in context", "Practice active listening and diplomatic disagreement", "Deliver impromptu 1-minute speeches (JAM sessions)"],
    prerequisites: ["Basic English Communication"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The Anatomy of a Persuasive Argument", detail: "Claim + Evidence (Facts/Data) + Reasoning + Counter-argument refutation.", problem: "Why is an argument stronger with evidence?", solution: "Evidence provides factual backing and credibility to assertions." },
      { title: "Group Discussion (GD) Strategies", detail: "Initiating, summarizing, building on others' points, politely intervening ('May I add...').", problem: "How do you politely interrupt in a group discussion?", solution: "'Pardon me, if I may add a quick point here...'" },
      { title: "Mastering Idioms & Phrasal Verbs", detail: "'Bite the bullet', 'Break the ice', 'Burn the midnight oil', 'Hit the nail on the head'.", problem: "What does 'burn the midnight oil' mean?", solution: "To study or work late into the night." },
      { title: "Active Listening & Diplomatic Disagreement", detail: "'I see your point, however...', 'While I respect that perspective, have we considered...'", problem: "Diplomatic response to disagreeing?", solution: "'I understand your perspective, but looking at the data, another viewpoint is...'" },
      { title: "JAM (Just A Minute) Impromptu Speaking", detail: "The PREP method: Point, Reason, Example, Point. Speaking for 60 seconds without hesitation.", problem: "What does PREP stand for in public speaking?", solution: "Point, Reason, Example, Point." }
    ],
    questions: [
      { q: "What is the primary role of evidence in a persuasive argument?", opts: ["To confuse opponents", "To support the claim with verifiable facts and data", "To increase word count", "To change the topic"], ans: 1, exp: "Evidence validates and strengthens claims." },
      { q: "What does the idiom 'break the ice' mean?", opts: ["Freeze water", "Relieve tension and start a friendly conversation", "Break glass", "Give up"], ans: 1, exp: "Breaking the ice warms up a social atmosphere." },
      { q: "In a group discussion, what is an effective way to disagree politely?", opts: ["You are completely wrong!", "While I understand that view, we might also consider...", "Keep quiet!", "I hate that idea."], ans: 1, exp: "Diplomatic phrasing maintains constructive discourse." },
      { q: "What does 'burn the midnight oil' mean?", opts: ["Work or study late into the night", "Cause a fire", "Save electricity", "Go to sleep early"], ans: 0, exp: "It means working late at night." },
      { q: "In the PREP speech structure, what does the 'E' stand for?", opts: ["Emotion", "Example / Evidence", "Ending", "Evaluation"], ans: 1, exp: "PREP = Point, Reason, Example, Point." },
      { q: "What does 'hit the nail on the head' mean?", opts: ["Hurt a finger with a hammer", "Describe exactly what is causing a situation", "Build furniture", "Miss the point"], ans: 1, exp: "It means to be precisely accurate." },
      { q: "What behavior is valued most in a group discussion?", opts: ["Shouting the loudest", "Collaborative leadership, active listening, and clear points", "Remaining silent throughout", "Speaking continuously without letting others talk"], ans: 1, exp: "Collaborative engagement and active listening are key." },
      { q: "What does the phrasal verb 'call off' mean?", opts: ["Telephone someone", "Cancel an event", "Shout loud", "Postpone"], ans: 1, exp: "'Call off' means to cancel (e.g. call off the match)." },
      { q: "What is an impromptu speech?", opts: ["A speech memorized over 6 months", "A spontaneous speech delivered with minimal preparation", "A reading from a textbook", "A silent performance"], ans: 1, exp: "Impromptu speeches are delivered spontaneously on the spot." },
      { q: "Which transition introduces a contrasting counterpoint?", opts: ["Moreover", "Similarly", "On the other hand", "Furthermore"], ans: 2, exp: "'On the other hand' highlights contrast." }
    ]
  },

  // 8. Academic Writing and Public Speaking
  {
    slug: "academic-writing-public-speaking",
    title: "Academic Writing and Public Speaking",
    description: "Write structured academic essays, master thesis statements, avoid plagiarism, deliver confident speeches, and overcome stage anxiety.",
    category: "English & Languages",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Draft focused thesis statements", "Structure 5-paragraph academic essays", "Cite sources accurately and avoid plagiarism", "Apply vocal modulation, pacing, and eye contact", "Overcome public speaking nervousness with rehearsal frameworks"],
    prerequisites: ["Reading Comprehension and Writing"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The Thesis Statement & Essay Structure", detail: "Thesis statement: single sentence summarizing the central argument. Introduction -> 3 Body Paragraphs -> Conclusion.", problem: "Where does the thesis statement usually appear?", solution: "At the end of the introductory paragraph." },
      { title: "Academic Tone & Avoiding Plagiarism", detail: "Formal objective register. Paraphrasing, summarizing, using quotation marks, citing authors.", problem: "What is plagiarism?", solution: "Presenting someone else's work or words as your own without citation." },
      { title: "Body Language & Eye Contact on Stage", detail: "Open posture, purposeful movement, triangle eye contact technique across the room, smiling.", problem: "How should you maintain eye contact with a large audience?", solution: "Scan across the left, center, and right sections of the room." },
      { title: "Voice Modulation: Tone, Pace & Strategic Pauses", detail: "Varying volume, pitch, speed, and using dramatic pauses before crucial ideas.", problem: "Why are intentional pauses useful in a speech?", solution: "They let important ideas settle and give the audience time to reflect." },
      { title: "Overcoming Stage Fright & Confident Delivery", detail: "Cognitive reframing (excitement vs fear), 4-7-8 breathing technique, power of mock rehearsals.", problem: "How can deep breathing calm speech anxiety?", solution: "It slows heart rate and activates the relaxation nervous response." }
    ],
    questions: [
      { q: "What is the primary function of a thesis statement?", opts: ["To state the author's name", "To summarize the central claim or argument of an essay", "To list all bibliography links", "To ask a rhetorical question"], ans: 1, exp: "The thesis statement states the main argument." },
      { q: "What is plagiarism in academic writing?", opts: ["Reading books in the library", "Using someone else's work or ideas without proper attribution", "Writing in pen instead of pencil", "Formatting margins"], ans: 1, exp: "Plagiarism is academic dishonesty by claiming others' work as your own." },
      { q: "Why is voice modulation critical during a presentation?", opts: ["To confuse the listener", "To keep the audience engaged and emphasize key concepts", "To speak as quickly as possible", "To hide nervousness"], ans: 1, exp: "Modulation maintains dynamic interest and aids comprehension." },
      { q: "Where does the thesis statement typically belong in a formal essay?", opts: ["In the body paragraph 2", "At the end of the introductory paragraph", "Only in the bibliography", "In the title"], ans: 1, exp: "Standard essays place the thesis at the end of the introduction." },
      { q: "What is effective public speaking body language?", opts: ["Slouching and staring at feet", "Open posture, relaxed gestures, and wide eye contact", "Arms crossed tightly", "Pacing back and forth rapidly"], ans: 1, exp: "Open posture and eye contact convey authority and warmth." },
      { q: "What should an effective conclusion do?", opts: ["Introduce three new topics", "Synthesize the main points and reinforce the thesis without verbatim repetition", "Apologize for taking time", "End abruptly mid-thought"], ans: 1, exp: "Conclusions synthesize insights and offer a final takeaway." },
      { q: "What is the purpose of citing sources?", opts: ["To show you read nothing", "To give credit to original authors and establish academic credibility", "To make the essay longer", "To avoid writing original thoughts"], ans: 1, exp: "Citations validate research and respect intellectual property." },
      { q: "What is the benefit of a deliberate pause in public speaking?", opts: ["It shows you forgot your speech", "It creates anticipation and lets important points sink in", "It allows you to look at your phone", "It makes people laugh"], ans: 1, exp: "Pauses emphasize critical points and command attention." },
      { q: "Which register is appropriate for academic writing?", opts: ["Slang and internet texting shortcuts", "Formal, objective, and evidence-based register", "Aggressive shouting", "Casual conversational gossip"], ans: 1, exp: "Academic writing requires formal and objective tone." },
      { q: "How can one effectively combat stage anxiety before stepping on stage?", opts: ["Skip breakfast and drink energy drinks", "Controlled diaphragmatic breathing and thorough mock rehearsal", "Ignore the audience completely", "Run away"], ans: 1, exp: "Deep breathing and preparation build mental poise." }
    ]
  },

  // 9. Python Programming Fundamentals
  {
    slug: "python-programming-fundamentals",
    title: "Python Programming Fundamentals",
    description: "Write real Python code: variables, data types, if/elif/else conditions, for/while loops, functions, lists, and dictionaries.",
    category: "Coding & Technology",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Write Python scripts with correct syntax and indentation", "Work with strings, integers, floats, and booleans", "Implement conditional branches with if, elif, and else", "Automate repetition with for and while loops", "Define modular functions with parameters and return values"],
    prerequisites: ["Introduction to Coding with Scratch or basic computer skills"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Python Syntax, Variables & Data Types", detail: "print(), input(), int, float, str, bool. Python uses clean indentation rather than curly braces.", problem: "What is the output of print(type(3.14)) in Python?", solution: "<class 'float'>." },
      { title: "Conditionals: if, elif, and else", detail: "Comparison operators (==, !=, >, <, >=, <=) and logical operators (and, or, not).", problem: "Write code to check if age >= 18.", solution: "if age >= 18:\n    print('Adult')" },
      { title: "Loops: while and for with range()", detail: "for i in range(1, 6): prints 1 to 5. while loop runs while condition is true. break and continue.", problem: "What does list(range(2, 8, 2)) produce?", solution: "[2, 4, 6]." },
      { title: "Functions: def, Parameters & Return Values", detail: "def add(a, b): return a + b. Encapsulating code into reusable, testable blocks.", problem: "Define a function that squares a number.", solution: "def square(x):\n    return x * x" },
      { title: "Data Structures: Lists and Dictionaries", detail: "Lists are ordered, mutable ([1, 2, 3]). Dictionaries store key-value pairs ({'name': 'Arun', 'score': 95}).", problem: "How do you access value for key 'age' in student = {'age': 15}?", solution: "student['age'] (returns 15)." }
    ],
    questions: [
      { q: "What symbol is used for comments in Python?", opts: ["//", "/* */", "#", "--"], ans: 2, exp: "# marks a single-line comment in Python." },
      { q: "What data type is the value True in Python?", opts: ["str", "int", "bool", "float"], ans: 2, exp: "True and False belong to the bool (Boolean) type." },
      { q: "What does range(1, 5) produce in a for loop?", opts: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "2, 3, 4, 5"], ans: 1, exp: "range(start, stop) stops before the stop value: 1, 2, 3, 4." },
      { q: "Which keyword defines a function in Python?", opts: ["function", "func", "def", "define"], ans: 2, exp: "'def' defines functions in Python." },
      { q: "How is a code block delimited in Python?", opts: ["Curly brackets { }", "Indentation (whitespace)", "Parentheses ( )", "Semicolons ;"], ans: 1, exp: "Python uses consistent indentation for code blocks." },
      { q: "What is the output of: 10 // 3 in Python?", opts: ["3.333", "3", "1", "30"], ans: 1, exp: "// is integer floor division, returning 3." },
      { q: "Which of the following creates a list in Python?", opts: ["x = (1, 2, 3)", "x = [1, 2, 3]", "x = {1, 2, 3}", "x = <1, 2, 3>"], ans: 1, exp: "Square brackets [ ] define lists." },
      { q: "What does the .append() method do on a Python list?", opts: ["Sorts the list", "Adds an element to the end of the list", "Deletes the list", "Reverses the list"], ans: 1, exp: ".append(x) inserts x at the end of the list." },
      { q: "How do you check equality in a Python conditional statement?", opts: ["=", "==", "===", "is equal"], ans: 1, exp: "== checks equality; = is assignment." },
      { q: "What is the output of len('SmartLearn')?", opts: ["9", "10", "11", "8"], ans: 1, exp: "'SmartLearn' has 10 characters." }
    ]
  },

  // 10. Object-Oriented Programming
  {
    slug: "object-oriented-programming",
    title: "Object-Oriented Programming",
    description: "Master classes, objects, constructors, encapsulation, inheritance, polymorphism, and abstraction using Python.",
    category: "Coding & Technology",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Differentiate classes (blueprints) from objects (instances)", "Implement __init__ constructor methods and self references", "Apply encapsulation and private variables", "Build class hierarchies using inheritance", "Demonstrate polymorphism through method overriding"],
    prerequisites: ["Python Programming Fundamentals"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Classes and Objects: The Blueprint Model", detail: "Class Car: blueprint with attributes (color, speed) and methods (drive, brake). Car1 = Car() is an instance.", problem: "What is an object in relation to a class?", solution: "An instance of the class blueprint with concrete state." },
      { title: "Constructors & The 'self' Parameter", detail: "def __init__(self, name, age): self.name = name. 'self' represents the specific instance being created.", problem: "What is the role of __init__ in Python?", solution: "It initializes new object instances upon creation." },
      { title: "Encapsulation & Data Hiding", detail: "Bundling data and methods. Private attributes with double underscore (__balance). Getters and setters.", problem: "How do you make an attribute private in Python?", solution: "Prefix it with double underscores (e.g. self.__balance)." },
      { title: "Inheritance: Code Reuse & Specialization", detail: "class Animal -> class Dog(Animal). Child inherits parent methods. super().__init__() calls parent constructor.", problem: "What function calls the parent class constructor?", solution: "super().__init__()." },
      { title: "Polymorphism & Method Overriding", detail: "Same method name, different behavior across subclasses (dog.sound() vs cat.sound()).", problem: "What is method overriding?", solution: "A child class redefining a method inherited from its parent." }
    ],
    questions: [
      { q: "What is a 'Class' in Object-Oriented Programming?", opts: ["A running program", "A blueprint or template for creating objects", "A type of database", "A computer hardware chip"], ans: 1, exp: "Classes define attributes and behaviors for objects." },
      { q: "What is the constructor method in Python classes?", opts: ["__start__", "__init__", "__create__", "__construct__"], ans: 1, exp: "__init__ initializes new object instances." },
      { q: "What does the 'self' parameter represent inside class methods?", opts: ["The parent class", "The current instance of the class", "Global module", "Operating system"], ans: 1, exp: "self refers to the specific instance calling the method." },
      { q: "Which OOP principle bundles data and methods together while restricting direct access?", opts: ["Inheritance", "Encapsulation", "Polymorphism", "Recursion"], ans: 1, exp: "Encapsulation safeguards internal state." },
      { q: "What is inheritance?", opts: ["Copy-pasting files", "Mechanism where a child class acquires properties of a parent class", "Deleting old classes", "Printing output"], ans: 1, exp: "Inheritance facilitates hierarchical code reuse." },
      { q: "What is polymorphism?", opts: ["Ability of different classes to respond to the same method call in specialized ways", "Converting code to binary", "Hiding variables", "Running loops"], ans: 0, exp: "Polymorphism means 'many forms' for the same interface." },
      { q: "How do you call a parent class method from inside a child class?", opts: ["parent()", "super()", "base()", "root()"], ans: 1, exp: "super() accesses parent class methods." },
      { q: "What is an instance of a class called?", opts: ["Function", "Object", "Module", "Variable"], ans: 1, exp: "An object is a concrete instance of a class." },
      { q: "Which of the following exemplifies method overriding?", opts: ["Writing comments", "A child class providing its own implementation of a parent method", "Naming variables in capitals", "Importing a library"], ans: 1, exp: "Overriding redefines parent behavior in a child class." },
      { q: "Why is OOP favored in large software systems?", opts: ["It makes code slower", "It enables modularity, code reusability, and easier maintenance", "It eliminates testing", "It removes the need for memory"], ans: 1, exp: "OOP modularizes systems into manageable, reusable components." }
    ]
  },

  // 11. HTML, CSS and JavaScript
  {
    slug: "html-css-javascript",
    title: "HTML, CSS and JavaScript",
    description: "Learn the foundational languages of the World Wide Web: semantic HTML5 markup, modern CSS styling and flexbox, and interactive JavaScript.",
    category: "Web Development",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Structure web pages with semantic HTML5 elements", "Style layouts with CSS box model, flexbox, and colors", "Manipulate the Document Object Model (DOM) with JavaScript", "Handle user events like button clicks and form input", "Build a responsive personal portfolio web page"],
    prerequisites: ["Computer Fundamentals"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Semantic HTML5: Structure & Elements", detail: "<header>, <nav>, <main>, <section>, <article>, <footer>. Headings, paragraphs, links <a>, images <img>.", problem: "What HTML tag creates a hyperlink?", solution: "<a href='url'>Link text</a>." },
      { title: "CSS Fundamentals & The Box Model", detail: "Content, Padding, Border, Margin. Color, typography, units (px, rem, %).", problem: "Which CSS property adds space inside a border around content?", solution: "padding." },
      { title: "Modern CSS Layouts: Flexbox", detail: "display: flex; justify-content: center; align-items: center; flex-direction: row/column.", problem: "What CSS property centers flex children horizontally along the main axis?", solution: "justify-content: center." },
      { title: "JavaScript Basics & DOM Selection", detail: "document.getElementById(), document.querySelector(), element.textContent, element.style.", problem: "How do you select an element with id='btn' in JavaScript?", solution: "document.getElementById('btn') or document.querySelector('#btn')." },
      { title: "Event Listeners & Interactive UI", detail: "button.addEventListener('click', () => { ... }). Changing themes and updating content dynamically.", problem: "How do you attach a click handler in JavaScript?", solution: "element.addEventListener('click', function)." }
    ],
    questions: [
      { q: "What does HTML stand for?", opts: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Mode Language", "Home Tool Markup Language"], ans: 0, exp: "HTML is HyperText Markup Language." },
      { q: "What is the correct HTML element for the largest heading?", opts: ["<head>", "<h6>", "<h1>", "<heading>"], ans: 2, exp: "<h1> defines top-level headings." },
      { q: "Which CSS property changes text color?", opts: ["text-color", "color", "font-color", "bg-color"], ans: 1, exp: "'color' sets the foreground text color." },
      { q: "In the CSS Box Model, what is the space outside the border called?", opts: ["Padding", "Margin", "Content", "Outline"], ans: 1, exp: "Margin creates space outside the border." },
      { q: "How do you declare a Flexbox container in CSS?", opts: ["display: flex;", "position: flex;", "float: center;", "display: grid;"], ans: 0, exp: "display: flex activates Flexbox." },
      { q: "Which HTML tag links an external JavaScript file?", opts: ["<link src='app.js'>", "<script src='app.js'></script>", "<js src='app.js'>", "<code file='app.js'>"], ans: 1, exp: "<script src='...'> loads JavaScript." },
      { q: "What does DOM stand for in web development?", opts: ["Document Object Model", "Data Order Method", "Digital Object Mode", "Desktop Output Monitor"], ans: 0, exp: "DOM is Document Object Model." },
      { q: "How do you change the text content of a selected DOM element in JS?", opts: ["element.text = 'Hello'", "element.textContent = 'Hello'", "element.print('Hello')", "element.insert('Hello')"], ans: 1, exp: "element.textContent updates text safely." },
      { q: "Which method listens for user click events on a button?", opts: ["button.onClick()", "button.addEventListener('click', fn)", "button.listen('click')", "button.hook('click')"], ans: 1, exp: "addEventListener is standard." },
      { q: "Which HTML5 tag represents the main navigation menu?", opts: ["<menu>", "<nav>", "<links>", "<header>"], ans: 1, exp: "<nav> represents navigational link sections." }
    ]
  },

  // 12. Web Development Projects
  {
    slug: "web-development-projects",
    title: "Web Development Projects",
    description: "Build practical, portfolio-ready web projects: an interactive calculator, a rich to-do task tracker, a weather app, and form validation.",
    category: "Web Development",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Build an interactive calculator with math evaluation", "Create a task tracker with local storage persistence", "Build a quiz web application with real-time scoring", "Validate form inputs before submission", "Deploy a static web project to GitHub Pages"],
    prerequisites: ["HTML, CSS and JavaScript"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Project 1: Interactive Browser Calculator", detail: "Display screen, grid of buttons, handling number inputs, evaluating expressions.", problem: "How do you display clicked numbers on a calculator screen in JS?", solution: "Append button text to display.textContent." },
      { title: "Project 2: To-Do App with LocalStorage", detail: "Adding items, toggling completion, deleting items. localStorage.setItem() and getItem().", problem: "How do you persist tasks in the user's browser across page refresh?", solution: "localStorage.setItem('tasks', JSON.stringify(tasks))." },
      { title: "Project 3: Interactive Quiz Application", detail: "Array of question objects, tracking current question index, calculating percentage score, displaying results.", problem: "How do you advance to next question in a quiz app?", solution: "currentQuestionIndex++ and re-render question card." },
      { title: "Project 4: Form Validation & Error Messages", detail: "Checking email regex, password length, required fields, displaying helpful red error notices.", problem: "Why validate forms on the client side?", solution: "Gives immediate user feedback before sending data to server." },
      { title: "Deployment: Hosting on GitHub Pages", detail: "Git init, committing files, pushing to GitHub repository, enabling GitHub Pages hosting.", problem: "What branch does GitHub Pages typically serve by default?", solution: "main (or gh-pages)." }
    ],
    questions: [
      { q: "What browser API stores key-value pairs persistently across page reloads?", opts: ["sessionStorage", "localStorage", "cookieManager", "cacheStorage"], ans: 1, exp: "localStorage persists data across browser sessions." },
      { q: "How do you convert a JavaScript array into a string to store in localStorage?", opts: ["JSON.stringify(array)", "array.toString()", "JSON.parse(array)", "String.convert(array)"], ans: 0, exp: "JSON.stringify serializes arrays/objects into JSON strings." },
      { q: "How do you convert a stored JSON string back into a JavaScript array?", opts: ["JSON.stringify()", "JSON.parse()", "array.parse()", "eval()"], ans: 1, exp: "JSON.parse deserializes JSON strings into objects/arrays." },
      { q: "In a to-do app, what event fires when a user submits a form?", opts: ["click", "submit", "enter", "change"], ans: 1, exp: "Forms trigger 'submit' events." },
      { q: "What method prevents the browser from refreshing on form submit?", opts: ["e.stop()", "e.preventDefault()", "e.halt()", "e.freeze()"], ans: 1, exp: "e.preventDefault() suppresses default page reload." },
      { q: "Which CSS display property arranges calculator buttons into rows and columns?", opts: ["display: inline;", "display: grid;", "display: block;", "display: none;"], ans: 1, exp: "CSS Grid is ideal for 2D button matrices." },
      { q: "What is client-side form validation?", opts: ["Checking input errors in browser before network request", "Server database query", "Installing browser plugins", "Compiling code"], ans: 0, exp: "Client-side validation verifies inputs locally." },
      { q: "Which free platform allows hosting static HTML/CSS/JS websites directly from Git?", opts: ["GitHub Pages", "Google Drive", "YouTube", "Wikipedia"], ans: 0, exp: "GitHub Pages hosts static repositories for free." },
      { q: "How do you dynamically create a new <li> element in JavaScript?", opts: ["document.create('li')", "document.createElement('li')", "new Element('li')", "document.add('li')"], ans: 1, exp: "document.createElement('li') creates DOM nodes." },
      { q: "Which method appends a child node to an existing parent in DOM?", opts: ["parent.append()", "parent.appendChild()", "Both A and B are valid", "parent.attach()"], ans: 2, exp: "Both append() and appendChild() attach children to parents." }
    ]
  },

  // 13. Data Structures and Algorithmic Thinking
  {
    slug: "dsa-algorithmic-thinking",
    title: "Data Structures and Algorithmic Thinking",
    description: "Understand Big-O time complexity, arrays, linked lists, stacks (LIFO), queues (FIFO), linear/binary search, and sorting algorithms.",
    category: "Computer Science",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Analyze algorithm efficiency using Big-O notation", "Compare arrays with linked lists in memory", "Implement Stack (LIFO) and Queue (FIFO) structures", "Compare Linear Search O(n) vs Binary Search O(log n)", "Understand Bubble Sort, Selection Sort, and Insertion Sort"],
    prerequisites: ["Python Programming Fundamentals"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Introduction to Big-O Notation & Complexity", detail: "O(1) constant, O(log n) logarithmic, O(n) linear, O(n^2) quadratic. Measuring steps as input n scales.", problem: "What is the time complexity of accessing an array element by index?", solution: "O(1) constant time." },
      { title: "Arrays vs Linked Lists", detail: "Arrays: contiguous memory, fast O(1) index access, slow O(n) insert/delete. Linked lists: nodes with pointers, fast insertions, slow O(n) access.", problem: "Why are linked list insertions fast when position is known?", solution: "They only require pointer reassignment, no shifting." },
      { title: "Stacks (LIFO) and Queues (FIFO)", detail: "Stack: Last-In-First-Out (push, pop, peek). Used in Undo and Call Stack. Queue: First-In-First-Out (enqueue, dequeue). Used in print queues.", problem: "Which data structure models a browser back button?", solution: "Stack (LIFO)." },
      { title: "Searching: Linear Search vs Binary Search", detail: "Linear search checks every item O(n). Binary search divides sorted array in half O(log n).", problem: "How many maximum steps does binary search take for 1024 items?", solution: "10 steps (log2(1024) = 10)." },
      { title: "Sorting Algorithms: Bubble, Selection & Insertion", detail: "Bubble sort swaps adjacent elements. Selection sort finds minimum. Insertion sort builds sorted portion.", problem: "What is the worst-case time complexity of Bubble Sort?", solution: "O(n^2) quadratic time." }
    ],
    questions: [
      { q: "What is the principle of a Stack data structure?", opts: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "Random access", "Sorted access"], ans: 1, exp: "Stacks operate on Last-In First-Out." },
      { q: "What is the time complexity of Binary Search on a sorted array of size n?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], ans: 2, exp: "Binary search halves the search space each step: O(log n)." },
      { q: "What prerequisite is strictly required before performing Binary Search?", opts: ["Array must be reverse sorted", "Array must be sorted", "Array must contain only even numbers", "Array must have 100 elements"], ans: 1, exp: "Binary search requires sorted elements." },
      { q: "Which data structure operates on First-In-First-Out (FIFO) principle?", opts: ["Stack", "Queue", "Binary Tree", "Heap"], ans: 1, exp: "Queues operate on FIFO (e.g. printer queue)." },
      { q: "What is the best-case time complexity of accessing an element in an array by index?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], ans: 0, exp: "Array indexing takes O(1) constant time." },
      { q: "What does Big-O notation describe?", opts: ["Lines of code written", "Upper bound on time or space growth as input size n grows", "Computer CPU speed", "Network bandwidth"], ans: 1, exp: "Big-O characterizes asymptotic growth rate." },
      { q: "In a singly linked list, what does each node contain?", opts: ["Only data", "Data and a pointer/reference to the next node", "Two data fields", "The whole array"], ans: 1, exp: "A node stores data and a pointer to the next node." },
      { q: "What operation adds an element to the top of a stack?", opts: ["pop()", "push()", "enqueue()", "dequeue()"], ans: 1, exp: "push() puts items onto a stack." },
      { q: "What is the worst-case time complexity of Bubble Sort?", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], ans: 3, exp: "Nested comparisons make Bubble Sort O(n²)." },
      { q: "Which structure represents the browser history (back/forward)?", opts: ["Two stacks", "One queue", "Binary tree", "Hash set"], ans: 0, exp: "Browser history uses back and forward stacks." }
    ]
  },

  // 14. Advanced Logical Reasoning
  {
    slug: "advanced-logical-reasoning",
    title: "Advanced Logical Reasoning",
    description: "Master complex blood relations, circular and linear seating arrangements, direction sense, syllogisms, and critical reasoning.",
    category: "Aptitude & Logic",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Solve multi-generational blood relation family trees", "Model linear and circular seating arrangements", "Solve multi-stage direction sense routes", "Evaluate syllogisms using Venn diagram rules", "Identify underlying assumptions and logical fallacies"],
    prerequisites: ["Logical Reasoning and Problem Solving"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Complex Blood Relations & Family Trees", detail: "Generational notation (+1 parent, 0 sibling/spouse, -1 child). Maternal vs paternal relations.", problem: "A's mother is B's sister. How is A related to B?", solution: "A is B's nephew or niece." },
      { title: "Linear & Circular Seating Arrangements", detail: "Facing center vs facing outward. Left and right relative to person's heading.", problem: "5 people sit in a circle facing center. Who is to left of person at North?", solution: "The person at East (clockwise is left when facing center)." },
      { title: "Multi-Leg Direction & Distance Puzzles", detail: "Combining Pythagoras theorem with directional compass routes.", problem: "Walk 3 km East, then 4 km North. How far from starting point?", solution: "5 km (sqrt(3^2 + 4^2) = 5 km)." },
      { title: "Syllogisms & Deductive Logic", detail: "All A are B; Some B are C. Valid conclusions vs invalid assumptions.", problem: "All dogs are animals. All animals need food. Do all dogs need food?", solution: "Yes, definitely." },
      { title: "Critical Reasoning: Assumptions & Fallacies", detail: "Identifying stated facts vs unstated assumptions. Spotting false dilemma and post-hoc fallacies.", problem: "What is an unstated assumption?", solution: "A premise taken for granted without being explicitly spoken." }
    ],
    questions: [
      { q: "A man walks 6 km West, turns left and walks 8 km. How far is he from start?", opts: ["10 km", "14 km", "2 km", "48 km"], ans: 0, exp: "Pythagoras: sqrt(6^2 + 8^2) = sqrt(36 + 64) = 10 km." },
      { q: "Introducing a girl, Vipin said 'Her mother is the only daughter of my mother-in-law'. Who is Vipin to the girl?", opts: ["Father", "Brother", "Uncle", "Husband"], ans: 0, exp: "Only daughter of mother-in-law is Vipin's wife; her daughter is Vipin's daughter (he is Father)." },
      { q: "Six friends sit in a circle facing the center. A is opposite B. C is between A and D. Who sits opposite C?", opts: ["D", "E or F", "A", "B"], ans: 1, exp: "Opposite C is either E or F depending on orientation." },
      { q: "If South-East becomes North, and North-East becomes West, what does West become?", opts: ["South-East", "North-West", "East", "South"], ans: 0, exp: "Rotates 135° clockwise, making West become South-East." },
      { q: "Statements: All cars are vehicles. Some vehicles are electric. Conclusion: All cars are electric.", opts: ["Definitely true", "Definitely false / Does not follow", "Partially true", "Uncertain"], ans: 1, exp: "Does not follow: 'some vehicles' does not necessarily include cars." },
      { q: "Find missing number: 7, 14, 28, 56, ___?", opts: ["100", "112", "120", "84"], ans: 1, exp: "Each number is multiplied by 2: 56 * 2 = 112." },
      { q: "A clock shows 4:30. If the minute hand points East, where does the hour hand point?", opts: ["North-East", "South-East", "North", "South-West"], ans: 0, exp: "At 4:30 minute hand is at 6 (East); hour hand is between 4 and 5 (North-East)." },
      { q: "Pointing to a photograph, a woman says 'He is the son of the only son of my grandfather'. Who is he?", opts: ["Brother", "Uncle", "Cousin", "Father"], ans: 0, exp: "Only son of grandfather is father; his son is her brother." },
      { q: "Which number completes the pattern: 2, 3, 5, 8, 12, ___?", opts: ["15", "16", "17", "18"], ans: 2, exp: "Differences are +1, +2, +3, +4, +5: 12 + 5 = 17." },
      { q: "What is the logical fallacy of assuming that because Event B followed Event A, A caused B?", opts: ["Ad Hominem", "Post Hoc Ergo Propter Hoc", "Circular Reasoning", "Strawman"], ans: 1, exp: "Post Hoc fallacy confuses correlation/sequence with causation." }
    ]
  },

  // 15. Robotics and Electronics Fundamentals
  {
    slug: "robotics-electronics-fundamentals",
    title: "Robotics and Electronics Fundamentals",
    description: "Learn circuit basics, Ohm's Law (V = IR), breadboards, LEDs, resistors, sensors, and microcontroller programming with Arduino.",
    category: "STEM & Robotics",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Apply Ohm's Law to calculate Voltage, Current, and Resistance", "Build prototype circuits on solderless breadboards", "Use LEDs, current-limiting resistors, and switches safely", "Interface analog and digital sensors with Arduino microcontrollers", "Write Arduino C++ sketches for automated motor control"],
    prerequisites: ["Physics in Everyday Life"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Ohm's Law: Voltage, Current & Resistance", detail: "V = I * R. Voltage [Volts] = potential difference. Current [Amperes] = charge flow. Resistance [Ohms] = opposition to flow.", problem: "A 9V battery powers a circuit with 3 Ohms resistance. Find current.", solution: "3 Amperes (I = V / R = 9 / 3 = 3 A)." },
      { title: "Breadboards, LEDs & Current-Limiting Resistors", detail: "Breadboard internal rail connections. LED polarity (anode +, cathode -). Why LEDs burn out without series resistors.", problem: "What happens to an LED connected directly to 5V without a resistor?", solution: "It draws excessive current and burns out instantly." },
      { title: "Sensors: Digital vs Analog Inputs", detail: "Digital sensors (push button: 0 or 1, ultrasonic echo). Analog sensors (LDR light sensor, potentiometer: 0 to 1023).", problem: "What range of values does an Arduino analogRead() return?", solution: "0 to 1023 (10-bit ADC)." },
      { title: "Arduino Microcontrollers: setup() & loop()", detail: "Microcontroller architecture. pinMode(), digitalWrite(), delay(), digitalRead(). The core execution loop.", problem: "What does the loop() function do in Arduino?", solution: "It executes repeatedly forever as long as the board has power." },
      { title: "Actuators: DC Motors & Servos", detail: "H-Bridge motor drivers (L298N). Servo motors (controlling exact angle 0-180 degrees using PWM pulses).", problem: "How do you control the position of a servo motor in code?", solution: "Using the Servo library: myServo.write(angle)." }
    ],
    questions: [
      { q: "What is the formula for Ohm's Law?", opts: ["V = I / R", "V = I * R", "I = V * R", "R = V * I"], ans: 1, exp: "Voltage = Current * Resistance (V = IR)." },
      { q: "What is the longer leg of a Light Emitting Diode (LED)?", opts: ["Cathode (Negative)", "Anode (Positive)", "Ground", "Neutral"], ans: 1, exp: "The longer leg is the positive Anode." },
      { q: "Why must a resistor be placed in series with an LED?", opts: ["To make it brighter", "To limit current and protect the LED from burning out", "To store electricity", "To turn it on and off"], ans: 1, exp: "Resistors prevent overcurrent damage." },
      { q: "What is the unit of electrical resistance?", opts: ["Volt", "Ampere", "Ohm (Ω)", "Watt"], ans: 2, exp: "Resistance is measured in Ohms." },
      { q: "What are the two mandatory functions in every Arduino sketch?", opts: ["start() and stop()", "setup() and loop()", "init() and run()", "main() and exit()"], ans: 1, exp: "Arduino sketches require setup() and loop()." },
      { q: "What does an ultrasonic sensor measure in robotics?", opts: ["Temperature", "Distance to obstacles using sound waves", "Light levels", "Color"], ans: 1, exp: "Ultrasonic sensors time sound reflections to determine distance." },
      { q: "What motor rotates to a precise angle (0° to 180°)?", opts: ["DC Motor", "Stepper Motor", "Servo Motor", "Induction Motor"], ans: 2, exp: "Servo motors provide precise angular positioning." },
      { q: "What component is used to prototype circuits without soldering?", opts: ["Breadboard", "PCB", "Iron plate", "Copper pipe"], ans: 0, exp: "Breadboards enable solderless rapid prototyping." },
      { q: "What is the output voltage of a standard Arduino Uno digital HIGH pin?", opts: ["3.3 V", "5 V", "9 V", "12 V"], ans: 1, exp: "Arduino Uno digital HIGH outputs 5 Volts." },
      { q: "What light-sensitive component changes its resistance based on illumination?", opts: ["Capacitor", "Light Dependent Resistor (LDR)", "Diode", "Inductor"], ans: 1, exp: "LDRs decrease resistance when light intensity increases." }
    ]
  },

  // 16. Artificial Intelligence Fundamentals
  {
    slug: "ai-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    description: "Understand the core concepts of AI, machine learning, computer vision, natural language processing, ethics, bias, and the Turing test.",
    category: "AI & Data Science",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Differentiate Artificial Intelligence, Machine Learning, and Deep Learning", "Explain how computers recognize patterns in images and text", "Understand supervised learning with training data and labels", "Discuss AI ethics, algorithmic bias, and privacy", "Evaluate the Turing Test and AI agent decision-making"],
    prerequisites: ["Python Programming Fundamentals"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "What is AI? History & The Turing Test", detail: "Alan Turing (1950). Narrow AI (specific tasks like chess) vs General AI (human-level across domains).", problem: "Can current AI think and feel like a human?", solution: "No, current AI is Narrow AI performing statistical pattern matching." },
      { title: "How Machines Learn from Data", detail: "Traditional programming (Rules + Data = Answers) vs Machine Learning (Data + Answers = Rules).", problem: "What is the key difference between conventional software and machine learning?", solution: "ML learns rules automatically from examples rather than being hardcoded." },
      { title: "Computer Vision: How Machines See Images", detail: "Images as grids of pixels (numbers 0 to 255). Convolutional filters detecting edges, textures, and objects.", problem: "How does a computer represent a black-and-white picture?", solution: "As a 2D grid/matrix of brightness values (0=black, 255=white)." },
      { title: "Natural Language Processing (NLP) Basics", detail: "Teaching computers to comprehend human language: tokenization, sentiment analysis, word embeddings.", problem: "What is tokenization in language processing?", solution: "Breaking sentences down into individual words or subwords (tokens)." },
      { title: "AI Ethics, Bias & Responsible Innovation", detail: "Garbage in, garbage out: biased training data creates biased AI models. Deepfakes, copyright, and ethical safeguards.", problem: "Why can an AI system exhibit unfair bias?", solution: "Because it learns from historical human data that contained biases." }
    ],
    questions: [
      { q: "What is the Turing Test designed to evaluate?", opts: ["Computer processing speed", "Whether a machine can exhibit intelligent behavior indistinguishable from human", "Graphics card capability", "Battery endurance"], ans: 1, exp: "The Turing test checks for human-like conversational intelligence." },
      { q: "What is the relationship between AI, Machine Learning (ML), and Deep Learning (DL)?", opts: ["They are identical", "DL is a subset of ML, which is a subset of AI", "AI is a subset of ML", "None are related"], ans: 1, exp: "DL is within ML, which sits within the broad field of AI." },
      { q: "How does a computer represent an image?", opts: ["As a spoken word", "As a numerical grid of pixel values (e.g. RGB)", "As physical paint", "As an analog tape"], ans: 1, exp: "Images are stored as 2D/3D numerical arrays." },
      { q: "What is Narrow AI (Weak AI)?", opts: ["AI designed and trained for a specific defined task", "AI with human consciousness", "A broken robot", "AI that cannot use internet"], ans: 0, exp: "Narrow AI performs specific tasks like chess, translation, or vision." },
      { q: "What is algorithmic bias in AI systems?", opts: ["A computer virus", "Unfair prejudice in AI outputs caused by biased training data", "Fast calculation speed", "Low battery"], ans: 1, exp: "Biased training data leads to skewed predictions." },
      { q: "What is 'Supervised Learning'?", opts: ["Learning without any data", "Learning from labeled examples with inputs and correct outputs", "Students watching robots", "Reading only Wikipedia"], ans: 1, exp: "Supervised learning uses pairs of inputs and ground-truth labels." },
      { q: "What is tokenization in Natural Language Processing?", opts: ["Buying digital coins", "Splitting text into words, punctuation, or subwords", "Encrypting files", "Deleting text"], ans: 1, exp: "Tokenization breaks continuous text into discrete units." },
      { q: "Which of the following is an everyday application of AI?", opts: ["Facial recognition phone unlock", "Voice assistants like Siri and Alexa", "Spam email filters", "All of the above"], ans: 3, exp: "All listed technologies utilize AI models." },
      { q: "Why is high-quality, diverse data crucial for training AI?", opts: ["It makes file sizes smaller", "It prevents the model from learning distorted or inaccurate patterns", "It uses less electricity", "It prevents computers from overheating"], ans: 1, exp: "Diverse data ensures generalization and fairness." },
      { q: "What does 'hallucination' mean when referring to AI language models?", opts: ["The computer caught a virus", "Generating convincing-sounding information that is factually false", "Displaying 3D images", "Turning off automatically"], ans: 1, exp: "Hallucination refers to generating factually fabricated claims." }
    ]
  },

  // 17. Cybersecurity and Digital Safety
  {
    slug: "cybersecurity-digital-safety",
    title: "Cybersecurity and Digital Safety",
    description: "Learn the fundamentals of cybersecurity: CIA triad, symmetric/asymmetric encryption, malware types, social engineering, and network defenses.",
    category: "Cybersecurity",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Explain the CIA triad: Confidentiality, Integrity, and Availability", "Understand how encryption secures data in transit and at rest", "Identify malware types: viruses, worms, trojans, ransomware", "Recognize social engineering tactics and spear phishing", "Configure firewalls, VPNs, and secure WiFi routers"],
    prerequisites: ["Digital Literacy and Internet Safety"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The CIA Triad of Information Security", detail: "Confidentiality (privacy/encryption), Integrity (tamper-proofing/hashing), Availability (uptime/DDoS mitigation).", problem: "Which pillar of the CIA triad does encryption protect?", solution: "Confidentiality." },
      { title: "Encryption: Symmetric vs Asymmetric Keys", detail: "Symmetric: 1 shared key for encrypt/decrypt (AES). Asymmetric: Public key encrypts, private key decrypts (RSA).", problem: "Can someone decrypt your message using your public key?", solution: "No, only your matching private key can decrypt it." },
      { title: "Malware Analysis: Viruses, Trojans & Ransomware", detail: "Virus (attaches to host), Worm (self-replicating across networks), Trojan (disguised as useful software), Ransomware (encrypts files for extortion).", problem: "What type of malware demands payment to unlock files?", solution: "Ransomware." },
      { title: "Social Engineering & Spear Phishing", detail: "Pretexting, baiting, urgency manipulation. Why humans are often the weakest link in security defenses.", problem: "What makes spear phishing different from regular phishing?", solution: "It is personalized and targeted to a specific individual." },
      { title: "Network Defenses: Firewalls & Secure WiFi", detail: "Firewall packet filtering. WPA3 WiFi encryption. Dangers of open public WiFi (man-in-the-middle sniffing).", problem: "Why is entering banking details on open public airport WiFi risky?", solution: "Traffic can be intercepted by packet sniffers without encryption." }
    ],
    questions: [
      { q: "What does the 'C' stand for in the CIA triad?", opts: ["Connection", "Confidentiality", "Computation", "Control"], ans: 1, exp: "CIA = Confidentiality, Integrity, Availability." },
      { q: "What is ransomware?", opts: ["Free software", "Malicious software that encrypts user files and demands payment", "Antivirus program", "Browser update"], ans: 1, exp: "Ransomware holds victim files for ransom." },
      { q: "In asymmetric encryption, which key is kept strictly confidential?", opts: ["Public key", "Private key", "Both keys", "Neither key"], ans: 1, exp: "The private key must never be shared." },
      { q: "What is a Trojan Horse in computing?", opts: ["A wooden toy", "Malware disguised as legitimate or harmless software", "A strong password", "A network router"], ans: 1, exp: "Trojans conceal malicious payloads inside harmless-looking apps." },
      { q: "What does a network Firewall do?", opts: ["Cools down computers", "Monitors and filters incoming/outgoing network traffic based on security rules", "Speeds up internet downloads", "Generates passwords"], ans: 1, exp: "Firewalls block unauthorized traffic." },
      { q: "What is Social Engineering?", opts: ["Coding algorithms", "Manipulating individuals into voluntarily revealing confidential information", "Fixing computers", "Designing social media"], ans: 1, exp: "Social engineering exploits human psychology." },
      { q: "What protocol provides end-to-end encrypted web browsing?", opts: ["HTTP", "FTP", "HTTPS", "Telnet"], ans: 2, exp: "HTTPS uses SSL/TLS to encrypt web traffic." },
      { q: "What is a Denial of Service (DDoS) attack?", opts: ["Stealing passwords", "Flooding a server with traffic until it crashes and becomes unavailable", "Deleting a database", "Guessing PINs"], ans: 1, exp: "DDoS overwhelms services to destroy availability." },
      { q: "Why should you avoid using the same password on multiple websites?", opts: ["It is too easy to remember", "If one website suffers a data breach, all your accounts become compromised", "Computers don't allow it", "It slows down typing"], ans: 1, exp: "Credential stuffing exploits reused passwords." },
      { q: "What cryptographic tool verifies that a downloaded file was not modified or corrupted?", opts: ["Cryptographic Hash (SHA-256)", "Wallpaper", "Bookmark", "Shortcut"], ans: 0, exp: "Hash digests verify file integrity." }
    ]
  },

  // 18. Financial Mathematics and Data Interpretation
  {
    slug: "financial-math-data-interpretation",
    title: "Financial Mathematics and Data Interpretation",
    description: "Calculate compound interest, profit/loss percentages, GST taxes, and interpret complex bar charts, pie charts, and trend lines.",
    category: "Mathematics",
    learningGroup: "Standards 7–10",
    level: "Intermediate",
    objectives: ["Calculate compound interest annually and semi-annually: A = P(1 + r/n)^(nt)", "Calculate cost price, selling price, profit, loss, and margin percentages", "Compute Goods and Services Tax (GST) and discount combinations", "Extract insights from double-bar graphs, histograms, and pie charts", "Analyze real-world inflation and purchasing power trends"],
    prerequisites: ["Fractions, Decimals and Percentages"],
    duration: "14 hours",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Compound Interest: The Eighth Wonder", detail: "A = P(1 + r/100)^t. Compound Interest CI = A - P. Interest earns interest over time.", problem: "Calculate amount on Rs. 10,000 at 10% compounded annually for 2 years.", solution: "Rs. 12,100 (10000 * 1.1 * 1.1 = 12,100; CI = Rs. 2,100)." },
      { title: "Profit, Loss & Margin Percentages", detail: "Profit = SP - CP. Profit % = (Profit / CP) * 100. Loss % = (Loss / CP) * 100. Always computed on Cost Price.", problem: "Bought for Rs. 200, sold for Rs. 250. Find profit percentage.", solution: "25% ((50 / 200) * 100 = 25%)." },
      { title: "Goods and Services Tax (GST) & Markups", detail: "Marked Price (MP), Discount, Selling Price (SP), and adding GST (5%, 12%, 18%).", problem: "A laptop costs Rs. 40,000 before 18% GST. What is total invoice price?", solution: "Rs. 47,200 (40000 + 18% of 40000 = 40000 + 7200 = 47,200)." },
      { title: "Data Interpretation: Pie Charts & Degree Conversions", detail: "Full circle = 360 degrees = 100%. Angle for category = (Value / Total) * 360.", problem: "A category represents 25% of a budget. What is its angle on a pie chart?", solution: "90 degrees (0.25 * 360 = 90 degrees)." },
      { title: "Double Bar Graphs & Comparative Trends", detail: "Comparing two variables over time (e.g. boys vs girls enrollment, revenue vs costs).", problem: "How do you identify which year had the highest profit in a revenue/cost bar chart?", solution: "Find the bar pair with the largest gap where revenue exceeds cost." }
    ],
    questions: [
      { q: "What is the formula for the total Amount with compound interest compounded annually?", opts: ["P + (P*R*T)/100", "P * (1 + R/100)^T", "P * R * T", "P / (1 + R/100)"], ans: 1, exp: "A = P(1 + R/100)^T." },
      { q: "Profit or loss percentage is always calculated on which value?", opts: ["Selling Price (SP)", "Cost Price (CP)", "Marked Price (MP)", "Discount"], ans: 1, exp: "Profit and loss are based on the original Cost Price." },
      { q: "An item bought for Rs. 500 is sold for Rs. 400. What is the loss percentage?", opts: ["10%", "20%", "25%", "30%"], ans: 1, exp: "Loss = 100. (100 / 500) * 100% = 20% loss." },
      { q: "What angle represents 50% on a pie chart?", opts: ["90°", "180°", "270°", "360°"], ans: 1, exp: "50% of 360° is 180°." },
      { q: "If Rs. 5000 is invested at 10% per annum compound interest for 2 years, what is the final amount?", opts: ["Rs. 5500", "Rs. 6000", "Rs. 6050", "Rs. 6500"], ans: 2, exp: "5000 * 1.1 * 1.1 = Rs. 6050." },
      { q: "If an item with marked price Rs. 1000 has a 10% discount and 10% GST on discounted price, what is final price?", opts: ["Rs. 1000", "Rs. 990", "Rs. 900", "Rs. 1100"], ans: 1, exp: "Discounted = 900. GST = 90. Total = Rs. 990." },
      { q: "What does a steep upward slope on a line graph represent?", opts: ["Rapid decrease", "No change", "Rapid rate of increase", "Constant stagnation"], ans: 2, exp: "Steep positive slope shows fast growth." },
      { q: "In a pie chart, the sum of all central sector angles is always:", opts: ["100°", "180°", "360°", "720°"], ans: 2, exp: "A circle's complete rotation is 360°." },
      { q: "If the selling price is double the cost price, what is the profit percentage?", opts: ["50%", "100%", "200%", "150%"], ans: 1, exp: "Profit = 2CP - CP = CP. (CP / CP) * 100 = 100% profit." },
      { q: "What financial concept describes interest earned on previously accumulated interest?", opts: ["Simple Interest", "Compound Interest", "Depreciation", "Discount"], ans: 1, exp: "Compound interest compounds on prior gains." }
    ]
  }
];
