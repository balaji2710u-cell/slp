/**
 * Blueprints for GROUP C (Part 1 - Courses 1 to 12): After Standard 12 and Above
 * Professional engineering and computer science curriculum.
 */

export const blueprintsC_part1 = [
  // 1. Python for Professional Programming
  {
    slug: "python-professional-programming",
    title: "Python for Professional Programming",
    description: "Write production-ready Python: list comprehensions, generators, decorators, context managers, regex, virtual environments, and unit testing.",
    category: "Software Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Leverage idiomatic Pythonic patterns and comprehensions", "Implement custom generators with yield and memory-efficient iterators", "Author function and method decorators", "Manage files and resources with custom context managers", "Configure venv, pip requirements, and pytest"],
    prerequisites: ["Python Programming Fundamentals"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Comprehensions & Advanced Iterables", detail: "List, dict, and set comprehensions: [x**2 for x in nums if x % 2 == 0]. zip(), enumerate(), any(), all().", problem: "Write a comprehension to extract uppercase words from a list of strings.", solution: "[w for w in words if w.isupper()]." },
      { title: "Generators & Memory Efficiency (yield)", detail: "Generators produce items on demand without loading whole datasets into RAM. def gen(): yield x.", problem: "Why prefer a generator over a list when processing 10 million log lines?", solution: "Generators stream items one at a time with O(1) memory footprint." },
      { title: "Decorators & Higher-Order Functions", detail: "Functions as first-class citizens. Writing @timer and @authenticate wrappers with *args, **kwargs and functools.wraps.", problem: "What does @decorator syntax do to a function def my_func()?", solution: "It rebinds my_func = decorator(my_func)." },
      { title: "Context Managers & The 'with' Statement", detail: "__enter__() and __exit__(). Ensuring sockets, DB connections, and files close safely even on exceptions.", problem: "What methods must a class implement to be used in a 'with' block?", solution: "__enter__() and __exit__()." },
      { title: "Virtual Environments, Packaging & PyTest", detail: "python -m venv .venv, requirements.txt, writing test_*.py with assertions and fixtures in pytest.", problem: "How do you freeze installed packages to a file?", solution: "pip freeze > requirements.txt." }
    ],
    questions: [
      { q: "What keyword is used to create a generator function in Python?", opts: ["return", "yield", "generate", "produce"], ans: 1, exp: "yield pauses execution and produces a value lazily." },
      { q: "What does the @decorator syntax do in Python?", opts: ["Compiles code to C", "Wraps another function to extend its behavior without modifying it", "Deletes the function", "Encrypts the code"], ans: 1, exp: "Decorators wrap functions to add cross-cutting behavior." },
      { q: "What is the memory advantage of a generator expression over a list comprehension?", opts: ["Generators use O(1) constant memory", "Generators store everything on disk", "List comprehensions are always faster", "There is no difference"], ans: 0, exp: "Generators compute items lazily, requiring constant memory." },
      { q: "Which dunder methods are required for a custom Context Manager?", opts: ["__init__ and __del__", "__enter__ and __exit__", "__open__ and __close__", "__start__ and __stop__"], ans: 1, exp: "__enter__ and __exit__ define context manager protocol." },
      { q: "What does *args allow in a Python function definition?", opts: ["Pass an arbitrary number of positional arguments", "Pass only keyword arguments", "Force strict typing", "Require integer arguments"], ans: 0, exp: "*args gathers positional parameters into a tuple." },
      { q: "What does **kwargs gather in a function call?", opts: ["A list of floats", "A dictionary of keyword arguments", "A string of errors", "A binary buffer"], ans: 1, exp: "**kwargs gathers named arguments into a dictionary." },
      { q: "What is the purpose of virtual environments (venv)?", opts: ["To simulate 3D graphics", "To isolate project-specific dependencies and prevent version conflicts", "To overclock the CPU", "To run Windows on Mac"], ans: 1, exp: "Virtual environments isolate package dependencies per project." },
      { q: "How do you handle multiple exception types in a single except block?", opts: ["except (ValueError, TypeError) as e:", "except ValueError or TypeError:", "except [ValueError, TypeError]:", "catch ValueError, TypeError:"], ans: 0, exp: "Tuple syntax (ErrorA, ErrorB) handles multiple errors." },
      { q: "What tool is standard for automated testing in modern Python?", opts: ["pytest", "pyrun", "python_test", "check.exe"], ans: 0, exp: "pytest is the standard testing framework." },
      { q: "What does the functools.wraps decorator preserve when writing custom decorators?", opts: ["Original function name, docstring, and metadata", "Variable values", "File paths", "Memory allocation"], ans: 0, exp: "@wraps copies original docstring, name, and attributes." }
    ]
  },

  // 2. Java Programming and Object-Oriented Design
  {
    slug: "java-oop-design",
    title: "Java Programming and Object-Oriented Design",
    description: "Master enterprise Java: JVM architecture, memory management (heap vs stack), interfaces, abstract classes, collections, and SOLID design principles.",
    category: "Software Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Explain JVM bytecode compilation, ClassLoader, and Garbage Collection", "Architect class models using interfaces and abstract classes", "Leverage Java Collections (List, Set, Map) with generics", "Handle checked and unchecked exceptions gracefully", "Apply SOLID object-oriented design principles"],
    prerequisites: ["Object-Oriented Programming basics"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "JVM Architecture & Memory: Stack vs Heap", detail: "Bytecode, JIT compiler, garbage collector. Stack (primitive variables, frame calls) vs Heap (dynamically allocated objects).", problem: "Where are Java object instances stored in memory?", solution: "On the Heap (references are stored on the Stack)." },
      { title: "Interfaces vs Abstract Classes in Java", detail: "Multiple interface implementation vs single class inheritance. default methods and contracts.", problem: "Can a Java class implement multiple interfaces?", solution: "Yes, Java supports multiple interface implementation." },
      { title: "Java Collections Framework & Generics", detail: "List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap). Type safety with <T>.", problem: "Which collection guarantees unique, unordered elements in O(1) time?", solution: "HashSet." },
      { title: "Exception Handling: Checked vs Unchecked", detail: "try-catch-finally, try-with-resources. Checked (IOException) vs Unchecked (NullPointerException, RuntimeException).", problem: "Are subclasses of RuntimeException checked or unchecked?", solution: "Unchecked." },
      { title: "SOLID Principles of Object-Oriented Design", detail: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.", problem: "What does the Open/Closed Principle state?", solution: "Software entities should be open for extension, but closed for modification." }
    ],
    questions: [
      { q: "What enables Java's 'Write Once, Run Anywhere' capability?", opts: ["Machine code compilation", "Java Virtual Machine (JVM) executing bytecode (.class)", "Operating system hooks", "Direct assembly"], ans: 1, exp: "JVM executes portable compiled bytecode across platforms." },
      { q: "Where are object instances allocated in Java memory?", opts: ["CPU registers", "Stack memory", "Heap memory", "Hard disk"], ans: 2, exp: "Objects are dynamically allocated on the Heap." },
      { q: "Can a Java class inherit from multiple classes directly?", opts: ["Yes, unlimited", "No, Java supports single class inheritance only", "Only if both are abstract", "Yes, up to 3"], ans: 1, exp: "Java prevents multiple class inheritance to avoid ambiguity." },
      { q: "Which collection stores unique elements with no duplicates?", opts: ["ArrayList", "Vector", "HashSet", "LinkedList"], ans: 2, exp: "Set implementations prohibit duplicate elements." },
      { q: "What does the 'final' keyword on a variable signify?", opts: ["It can only be assigned once (constant)", "It can be modified by anyone", "It deletes automatically", "It is private"], ans: 0, exp: "final variables cannot be reassigned once initialized." },
      { q: "What is an unchecked exception in Java?", opts: ["IOException", "SQLException", "Subclasses of RuntimeException (e.g. NullPointerException)", "ClassNotFoundException"], ans: 2, exp: "RuntimeExceptions are unchecked by the compiler." },
      { q: "What is the average time complexity to get a value from a HashMap by key?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], ans: 0, exp: "HashMaps provide O(1) average lookup time." },
      { q: "What does the 'S' in SOLID design principles stand for?", opts: ["System Security", "Single Responsibility Principle", "Static Memory", "Shared State"], ans: 1, exp: "Single Responsibility: a class should have one reason to change." },
      { q: "What does the try-with-resources statement guarantee?", opts: ["Higher execution speed", "Automatic closing of AutoCloseable resources", "Disables all errors", "Bypasses catch blocks"], ans: 1, exp: "AutoCloseable resources close automatically upon block exit." },
      { q: "What does the Garbage Collector do in Java?", opts: ["Reorganizes disk files", "Automatically reclaims heap memory occupied by unreferenced objects", "Deletes old code", "Restarts the server"], ans: 1, exp: "GC frees memory of unreachable objects." }
    ]
  },

  // 3. Data Structures and Algorithms
  {
    slug: "data-structures-algorithms",
    title: "Data Structures and Algorithms",
    description: "Master computer science core: Hash tables, Binary Search Trees, Heaps, Graph algorithms (BFS/DFS), and asymptotic Big-O analysis.",
    category: "Computer Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Analyze asymptotic time and space complexity with Big-O", "Implement Hash Tables with collision resolution (chaining vs open addressing)", "Construct and traverse Binary Search Trees (In-order, Pre-order, Post-order)", "Implement Priority Queues with Binary Min/Max Heaps", "Traverse graphs using Breadth-First Search (BFS) and Depth-First Search (DFS)"],
    prerequisites: ["Data Structures and Algorithmic Thinking"],
    duration: "24 hours",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Asymptotic Analysis & Big-O Master Theorem", detail: "Worst, average, and best-case analysis. Solving recurrence relations (T(n) = 2T(n/2) + O(n) -> Merge Sort O(n log n)).", problem: "What is the time complexity of Merge Sort in all cases?", solution: "O(n log n)." },
      { title: "Hash Tables & Collision Resolution", detail: "Hash functions, load factor, separate chaining (linked list buckets) vs open addressing (linear probing).", problem: "What causes a hash collision?", solution: "When two distinct keys produce the same hash code/index." },
      { title: "Binary Search Trees (BST) & Balanced Trees (AVL)", detail: "BST property: Left < Root < Right. In-order traversal gives sorted order. Tree rotations in AVL/Red-Black trees to maintain O(log n).", problem: "Which traversal of a BST visits nodes in strictly ascending sorted order?", solution: "In-order traversal (Left, Root, Right)." },
      { title: "Heaps & Priority Queues", detail: "Complete binary trees stored as arrays. Min-Heap (parent <= children), Max-Heap. Heapify operation in O(n), push/pop in O(log n).", problem: "If a binary heap node is at array index i, where is its left child?", solution: "2*i + 1 (0-indexed)." },
      { title: "Graph Representations & Traversals (BFS / DFS)", detail: "Adjacency matrix vs Adjacency list. BFS using Queue (shortest path in unweighted graphs); DFS using Stack/Recursion.", problem: "Which graph traversal finds the shortest path in an unweighted graph?", solution: "Breadth-First Search (BFS)." }
    ],
    questions: [
      { q: "What is the average time complexity for searching in a balanced BST?", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], ans: 1, exp: "Balanced binary search trees search in O(log n) time." },
      { q: "Which tree traversal visits a BST in ascending numerical order?", opts: ["Pre-order", "In-order", "Post-order", "Level-order"], ans: 1, exp: "In-order traversal visits Left, Root, Right (sorted order)." },
      { q: "What data structure is used to implement Breadth-First Search (BFS)?", opts: ["Stack", "Queue", "Priority Queue", "Hash Map"], ans: 1, exp: "BFS uses a Queue to process nodes level by level." },
      { q: "What is the worst-case time complexity of QuickSort?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], ans: 2, exp: "Worst-case QuickSort is O(n²) when pivot selection is poor." },
      { q: "What data structure backs an efficient Priority Queue?", opts: ["Linked list", "Binary Heap", "Unsorted array", "Queue"], ans: 1, exp: "Binary heaps provide O(log n) insertions and extractions." },
      { q: "What is the space complexity of an Adjacency List for a graph with V vertices and E edges?", opts: ["O(V²)", "O(V + E)", "O(E²)", "O(V * E)"], ans: 1, exp: "Adjacency list stores V lists containing E total edges: O(V + E)." },
      { q: "How do you resolve collisions using Separate Chaining in Hash Tables?", opts: ["Overwriting old data", "Storing colliding entries in a linked list at that bucket index", "Doubling array size immediately", "Dropping the key"], ans: 1, exp: "Separate chaining chains colliding items in a bucket list." },
      { q: "What is the time complexity of inserting into a Max-Heap of size n?", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], ans: 1, exp: "Heap insertion takes O(log n) to bubble up." },
      { q: "Which algorithm finds the shortest path in a weighted graph with non-negative edge weights?", opts: ["DFS", "Dijkstra's Algorithm", "Binary Search", "Kruskal's Algorithm"], ans: 1, exp: "Dijkstra's algorithm finds shortest paths in weighted graphs." },
      { q: "What is a graph with no cycles called?", opts: ["Complete graph", "Acyclic graph (Tree / DAG)", "Bipartite graph", "Dense graph"], ans: 1, exp: "Acyclic graphs contain no closed circular loops." }
    ]
  },

  // 4. Advanced Problem Solving and Coding Interviews
  {
    slug: "advanced-problem-solving-interviews",
    title: "Advanced Problem Solving and Coding Interviews",
    description: "Crack technical coding interviews: Two-Pointer technique, Sliding Window, Dynamic Programming, Backtracking, and LeetCode strategies.",
    category: "Software Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Master the Two-Pointer and Fast-Slow Pointer patterns", "Solve subarray optimization problems using Sliding Window", "Identify overlapping subproblems and apply Dynamic Programming (memoization vs tabulation)", "Implement backtracking for permutations and combinations", "Communicate trade-offs and complexity to interviewers effectively"],
    prerequisites: ["Data Structures and Algorithms"],
    duration: "24 hours",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Two-Pointer & Fast/Slow Pointer Patterns", detail: "Left and right pointers closing in (e.g. 2-Sum sorted). Floyd's Cycle Detection algorithm (tortoise and hare).", problem: "How does Floyd's cycle detection detect a cycle in a linked list?", solution: "If fast moves 2 steps and slow moves 1 step, they will meet if a cycle exists." },
      { title: "The Sliding Window Pattern", detail: "Fixed vs dynamic window size. Tracking max sum subarray of size k in O(n) instead of nested loops O(n*k).", problem: "What is the time complexity of sliding window on an array of length n?", solution: "O(n) linear time." },
      { title: "Dynamic Programming: Memoization vs Tabulation", detail: "Overlapping subproblems + optimal substructure. Top-down with cache (memoization) vs bottom-up iterative (tabulation).", problem: "Solve Fibonacci in O(n) using dynamic programming.", solution: "dp[i] = dp[i-1] + dp[i-2] with dp[0]=0, dp[1]=1." },
      { title: "Backtracking & State Space Trees", detail: "Explore, choose, un-choose (backtrack). N-Queens, Sudoku solver, generating power sets.", problem: "What must you do after recursively exploring a branch in backtracking?", solution: "Undo the choice (restore state to backtrack)." },
      { title: "Interview Communication & Trade-Off Analysis", detail: "The UMPIRE framework: Understand, Match, Plan, Implement, Review, Evaluate. Clarifying constraints, asking about edge cases.", problem: "What should you do before writing any code in a technical interview?", solution: "Clarify inputs, constraints, edge cases, and discuss approach/complexity." }
    ],
    questions: [
      { q: "What pattern solves the 'Longest Substring Without Repeating Characters' problem in O(n)?", opts: ["Two-pointer with Sliding Window", "Binary search", "Bubble sort", "DFS"], ans: 0, exp: "Dynamic sliding window with a character index map runs in O(n)." },
      { q: "What two properties must a problem have to be solvable via Dynamic Programming?", opts: ["Sorted data and binary choices", "Optimal substructure and overlapping subproblems", "Infinite memory and recursion", "Trees and graphs"], ans: 1, exp: "DP requires optimal substructure and overlapping subproblems." },
      { q: "What is the time complexity of the classic 0/1 Knapsack problem with n items and capacity W?", opts: ["O(n)", "O(W)", "O(n * W)", "O(2^n)"], ans: 2, exp: "DP 0/1 Knapsack solves in pseudo-polynomial O(n * W) time." },
      { q: "In Floyd's Cycle Detection algorithm, how fast do the pointers move?", opts: ["Both move 1 step", "Slow moves 1 step; fast moves 2 steps", "Slow moves 2 steps; fast moves 5 steps", "Pointers move backwards"], ans: 1, exp: "Slow advances by 1 node, fast advances by 2 nodes." },
      { q: "What is 'memoization' in dynamic programming?", opts: ["Writing notes in comments", "Caching the results of expensive function calls based on input arguments", "Memorizing code", "Compiling to binary"], ans: 1, exp: "Memoization caches top-down recursive return values." },
      { q: "What is the time complexity of finding a pair in a sorted array that sums to target using two pointers?", opts: ["O(1)", "O(n)", "O(n²)", "O(n log n)"], ans: 1, exp: "Pointers at both ends converge in single O(n) pass." },
      { q: "When should you use Backtracking over Dynamic Programming?", opts: ["When calculating a single maximum value", "When you need to find all valid configurations / paths (e.g. N-Queens)", "When sorting an array", "When searching a hash map"], ans: 1, exp: "Backtracking enumerates all possible combinatorial states." },
      { q: "What should an interviewee do when finding a brute force solution during an interview?", opts: ["Stay silent", "State the brute force, analyze its complexity, and explain how to optimize it", "Give up", "Argue with interviewer"], ans: 1, exp: "Stating brute force establishes baseline before optimizing." },
      { q: "What is the time complexity of generating all subsets (power set) of a set of size n?", opts: ["O(n)", "O(n²)", "O(2^n)", "O(n!)"], ans: 2, exp: "A set of size n has 2^n total subsets." },
      { q: "How can you detect an integer overflow edge case in programming?", opts: ["Check if sum exceeds Integer.MAX_VALUE before adding", "Ignore it", "Use floats always", "Turn off compiler"], ans: 0, exp: "Check boundary limits before executing arithmetic operations." }
    ]
  },

  // 5. Full-Stack Web Development
  {
    slug: "fullstack-web-development",
    title: "Full-Stack Web Development",
    description: "Build complete end-to-end full-stack applications: client-server architecture, REST APIs, database integration, authentication, and deployment.",
    category: "Full-Stack Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Design client-server architecture with separation of concerns", "Build stateless RESTful APIs returning structured JSON", "Connect frontend UI with backend endpoints using fetch and async/await", "Implement JWT-based authentication and secure session handling", "Deploy full-stack applications to cloud platforms"],
    prerequisites: ["HTML, CSS and JavaScript", "Python or JavaScript fundamentals"],
    duration: "24 hours",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Client-Server Architecture & HTTP Methods", detail: "Stateless HTTP protocol. Methods: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove). Status codes (200, 201, 400, 401, 403, 404, 500).", problem: "Which HTTP status code signifies an unauthorized request?", solution: "401 Unauthorized." },
      { title: "RESTful API Design & Structured JSON", detail: "Resource-based URL naming: /api/courses, /api/courses/:id. Request headers, JSON body payloads, standardized error responses.", problem: "What is the standard HTTP method to create a new resource at /api/courses?", solution: "POST." },
      { title: "Full-Stack Data Flow & State Management", detail: "User action -> Frontend validation -> API request -> Route handler -> Middleware -> Database -> Response -> UI state update.", problem: "Why must input data be validated on both frontend and backend?", solution: "Frontend gives instant user feedback; backend guarantees security against bypasses." },
      { title: "Authentication: JWT Tokens & bcrypt Hashing", detail: "Hashing passwords with bcrypt before saving. Signing JWTs with secret. Bearer token in Authorization header.", problem: "Where should passwords never be stored in plain text?", solution: "In the database, logs, or memory buffers." },
      { title: "Full-Stack Deployment & CORS Configuration", detail: "Cross-Origin Resource Sharing (CORS). Environment variables (.env). Deploying backend to cloud (Render, Railway) and frontend to Vercel/Netlify.", problem: "What causes a CORS error in a browser?", solution: "Frontend making requests to a different origin/domain without backend CORS permission." }
    ],
    questions: [
      { q: "What HTTP method is idempotent and used to replace an entire existing resource?", opts: ["POST", "PUT", "PATCH", "DELETE"], ans: 1, exp: "PUT replaces a resource and is idempotent." },
      { q: "What does status code 201 Created signify?", opts: ["Request failed", "Request succeeded and a new resource was created", "Redirecting", "Server crashed"], ans: 1, exp: "201 Created indicates successful resource creation." },
      { q: "What does JWT stand for in web security?", opts: ["Java Web Tool", "JSON Web Token", "JavaScript Wire Transfer", "Joint Web Technology"], ans: 1, exp: "JWT stands for JSON Web Token." },
      { q: "Why should passwords be hashed using bcrypt rather than MD5 or SHA-256?", opts: ["bcrypt is shorter", "bcrypt includes automatic salting and configurable computational work factor", "bcrypt is plain text", "MD5 is too slow"], ans: 1, exp: "bcrypt is slow by design to thwart brute force attacks." },
      { q: "What HTTP header typically transports a JWT authentication token?", opts: ["Cookie-Token", "Authorization: Bearer <token>", "Content-Type", "User-Agent"], ans: 1, exp: "Authorization: Bearer <token> is the standard pattern." },
      { q: "What does CORS stand for?", opts: ["Cross-Origin Resource Sharing", "Central Object Relay System", "Computer Output Remote Server", "Custom Operating Rules Standard"], ans: 0, exp: "CORS is Cross-Origin Resource Sharing." },
      { q: "What HTTP status code denotes Forbidden (caller authenticated but lacks required role)?", opts: ["400", "401", "403", "404"], ans: 2, exp: "403 Forbidden indicates insufficient permissions." },
      { q: "Where should sensitive credentials like database connection strings and JWT secrets be stored?", opts: ["Hardcoded in Git repository", "In environment variables (.env)", "Inside HTML script tags", "In client localStorage"], ans: 1, exp: "Environment variables keep secrets out of source code." },
      { q: "What is the purpose of a reverse proxy in web architecture?", opts: ["To write CSS", "To forward client requests to internal services, handle SSL, and balance load", "To delete databases", "To format images"], ans: 1, exp: "Reverse proxies manage routing, SSL, and security." },
      { q: "What is an advantage of stateless REST APIs?", opts: ["Server does not store session state, enabling horizontal scalability", "They don't use databases", "They require no internet", "They only work on mobile"], ans: 0, exp: "Stateless APIs scale horizontally across server instances." }
    ]
  },

  // 6. React Frontend Development
  {
    slug: "react-frontend-development",
    title: "React Frontend Development",
    description: "Build modern, reactive user interfaces with React: JSX, functional components, hooks (useState, useEffect, useContext), and routing.",
    category: "Full-Stack Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Master JSX syntax and component-based UI architecture", "Manage local and asynchronous state with useState and useEffect", "Implement global state sharing with React Context API", "Build single-page app navigation with React Router", "Optimize performance with useMemo, useCallback, and React.memo"],
    prerequisites: ["HTML, CSS and JavaScript"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "JSX & Functional Component Architecture", detail: "Virtual DOM reconciliation. Component props, fragments, conditional rendering, rendering lists with unique keys.", problem: "Why must list items in React have a unique 'key' prop?", solution: "Keys help React's Virtual DOM identify which items changed, added, or removed." },
      { title: "State Management with useState", detail: "State triggers re-renders. Immutable updates: setItems(prev => [...prev, newItem]). Lifting state up.", problem: "How do you update state based on previous state in React?", solution: "Pass an updater function: setCount(prev => prev + 1)." },
      { title: "Side Effects & Lifecycles with useEffect", detail: "Mount, update, unmount. Dependency array: [] (runs once on mount), [dep] (runs when dep changes). Cleanup functions for timers/subscriptions.", problem: "When does useEffect(() => {}, []) run?", solution: "Only once when the component mounts." },
      { title: "Global State Management with Context API", detail: "createContext, Context.Provider, useContext. Eliminating prop drilling across deeply nested components.", problem: "What problem does React Context solve?", solution: "Prop drilling (passing props through multiple intermediary components)." },
      { title: "Routing with React Router (SPA)", detail: "<BrowserRouter>, <Routes>, <Route path='' element={}>, <Link to=''>, useNavigate, useParams.", problem: "How do you access URL route parameters like /course/:id in React Router?", solution: "Using the useParams() hook." }
    ],
    questions: [
      { q: "What is JSX in React?", opts: ["A database query language", "A syntax extension allowing HTML-like markup inside JavaScript", "A CSS preprocessor", "A testing framework"], ans: 1, exp: "JSX lets developers write declarative UI markup in JS." },
      { q: "What hook manages local state in a functional React component?", opts: ["useEffect", "useState", "useRef", "useReducer"], ans: 1, exp: "useState declares state variables and setters." },
      { q: "When does a useEffect with an empty dependency array [] execute?", opts: ["On every single render", "Only once after initial mount", "When state changes", "Never"], ans: 1, exp: "Empty dependency array runs once on mount." },
      { q: "What is 'prop drilling' in React?", opts: ["Deleting props", "Passing props down through multiple layers of components that do not need them directly", "Validating prop types", "Rendering tables"], ans: 1, exp: "Prop drilling passes data through unused intermediate components." },
      { q: "What hook accesses React Context values?", opts: ["useContext", "useProvider", "useGlobal", "useStore"], ans: 0, exp: "useContext consumes context values directly." },
      { q: "Why must state never be mutated directly in React (e.g. state.push(x))?", opts: ["React cannot detect the mutation and will not re-render the UI", "It causes syntax errors", "JavaScript crashes", "It deletes data"], ans: 0, exp: "React relies on immutable reference changes to trigger re-renders." },
      { q: "What does the Virtual DOM do in React?", opts: ["Replaces the browser window", "Maintains an in-memory representation of the UI to calculate minimal real DOM updates", "Stores user passwords", "Loads images"], ans: 1, exp: "Virtual DOM reconciliation minimizes expensive real DOM manipulation." },
      { q: "Which hook memoizes expensive calculation results across renders?", opts: ["useCallback", "useMemo", "useRef", "useEffect"], ans: 1, exp: "useMemo caches computational return values." },
      { q: "How do you navigate programmatically in React Router v6?", opts: ["window.location = url", "useNavigate() hook", "useHistory.push()", "Router.goto()"], ans: 1, exp: "const navigate = useNavigate(); navigate('/path')." },
      { q: "What does a cleanup function returned from useEffect handle?", opts: ["Deletes the database", "Cancels timers, network subscriptions, or event listeners when unmounting", "Cleans CSS files", "Saves files"], ans: 1, exp: "Returned functions clean up resources before unmounting." }
    ]
  },

  // 7. Node.js and Backend API Development
  {
    slug: "nodejs-backend-api",
    title: "Node.js and Backend API Development",
    description: "Build high-throughput backend services with Node.js and Express: event loop, async/await, middleware pipeline, JWT auth, and centralized error handling.",
    category: "Full-Stack Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Explain the Node.js single-threaded event loop and non-blocking I/O", "Construct modular Express.js servers with routers and middleware", "Implement authentication and role-based authorization middleware", "Validate request payloads using Zod or Joi schemas", "Build robust centralized error-handling pipelines"],
    prerequisites: ["Full-Stack Web Development"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The Node.js Runtime & The Event Loop", detail: "V8 engine, libuv, single-threaded execution, event queue, microtasks vs macrotasks. Non-blocking asynchronous I/O.", problem: "How does Node.js handle thousands of concurrent connections on a single thread?", solution: "Through non-blocking asynchronous I/O and the libuv event loop." },
      { title: "Express.js Architecture & Routing", detail: "express(), app.use(), express.Router(). Organizing routes into feature modules (courses.js, auth.js, quizzes.js).", problem: "How do you group related routes under a common path prefix like /api/courses?", solution: "app.use('/api/courses', courseRouter)." },
      { title: "The Middleware Pipeline Pattern", detail: "app.use((req, res, next) => { ... next(); }). Request body parsing, CORS, logging, authentication guards.", problem: "What happens if a middleware function forgets to call next() or send a response?", solution: "The request hangs indefinitely and eventually times out." },
      { title: "Request Validation & Security Middleware", detail: "Zod schemas validating body, params, and query. Helmet security headers, rate limiting to prevent brute-force attacks.", problem: "Why use rate limiting on /api/auth/login?", solution: "To block brute-force password guessing attacks." },
      { title: "Centralized Error Handling Architecture", detail: "4-parameter error middleware: (err, req, res, next). Mapping database errors, Zod errors, and hiding stack traces in production.", problem: "How does Express distinguish error-handling middleware from regular middleware?", solution: "Error middleware takes exactly 4 arguments: (err, req, res, next)." }
    ],
    questions: [
      { q: "What C++ library provides the cross-platform asynchronous event loop in Node.js?", opts: ["libuv", "V8", "boost", "OpenSSL"], ans: 0, exp: "libuv provides Node's asynchronous I/O engine." },
      { q: "How many parameters must an Express centralized error-handling middleware function have?", opts: ["2 (req, res)", "3 (req, res, next)", "4 (err, req, res, next)", "1 (err)"], ans: 2, exp: "Express detects error handlers by their 4 arguments." },
      { q: "What does calling next() inside an Express middleware function do?", opts: ["Ends the server", "Passes control to the next middleware in the execution pipeline", "Sends HTTP 200", "Reruns the function"], ans: 1, exp: "next() advances execution to the next middleware." },
      { q: "What middleware parses incoming JSON request bodies in modern Express?", opts: ["express.json()", "bodyParser.xml()", "express.raw()", "express.text()"], ans: 0, exp: "express.json() is built-in to parse JSON bodies." },
      { q: "Why should error stack traces be hidden in production environments?", opts: ["To save screen space", "To prevent exposing sensitive server paths and code structure to attackers", "Because computers cannot print stacks", "It uses too much memory"], ans: 1, exp: "Stack traces reveal internal implementation details to attackers." },
      { q: "Which core Node.js module handles file system operations?", opts: ["http", "fs / fs/promises", "path", "os"], ans: 1, exp: "fs provides file system read/write capabilities." },
      { q: "What is non-blocking I/O?", opts: ["Code that never finishes", "Operations that execute in background without halting the main thread", "Blocking the CPU", "Preventing user input"], ans: 1, exp: "Non-blocking calls allow the event loop to continue processing." },
      { q: "How do you load environment variables from a .env file in Node.js?", opts: ["dotenv package / process.loadEnv()", "require('env')", "import 'variables'", "Node does this automatically without tools"], ans: 0, exp: "dotenv loads key-value pairs into process.env." },
      { q: "What does res.status(404).json(...) do?", opts: ["Sends a 404 Not Found HTTP status with JSON payload", "Crashes the server", "Redirects to Google", "Deletes the route"], ans: 0, exp: "Sets HTTP status 404 and serializes JSON response." },
      { q: "What is the purpose of CORS middleware in an Express API?", opts: ["Encrypt the database", "Allow or restrict cross-origin requests from browsers at different domains", "Speed up CPU", "Format HTML"], ans: 1, exp: "CORS controls cross-domain browser access." }
    ]
  },

  // 8. Database Design with SQL
  {
    slug: "database-design-sql",
    title: "Database Design with SQL",
    description: "Design robust relational databases: ER modeling, 3NF normalization, DDL/DML, complex JOINs, subqueries, indexes, and ACID transactions.",
    category: "Databases & Systems",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Create Entity-Relationship (ER) diagrams with primary and foreign keys", "Normalize relational schemas up to Third Normal Form (3NF)", "Write complex queries using INNER, LEFT, and RIGHT JOINs", "Optimize query performance using B-Tree indexes", "Enforce ACID transaction properties (Atomicity, Consistency, Isolation, Durability)"],
    prerequisites: ["Computer Fundamentals"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Relational Modeling & Keys (PK / FK)", detail: "Tables, rows, columns. Primary Keys (uniquely identifying records). Foreign Keys (referential integrity between tables).", problem: "What does a Foreign Key in a child table reference?", solution: "The Primary Key of the parent table." },
      { title: "Database Normalization (1NF, 2NF, 3NF)", detail: "Eliminating data redundancy and update anomalies. 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies).", problem: "What is 1st Normal Form (1NF)?", solution: "All table column values must be atomic (no arrays or repeating groups)." },
      { title: "SQL Queries: Aggregations & Grouping", detail: "SELECT, WHERE, GROUP BY, HAVING, ORDER BY. COUNT(), SUM(), AVG(), MIN(), MAX(). Difference between WHERE and HAVING.", problem: "When do you use HAVING instead of WHERE in SQL?", solution: "HAVING filters aggregated grouped results; WHERE filters raw rows." },
      { title: "Mastering JOINs & Subqueries", detail: "INNER JOIN (matching rows), LEFT JOIN (all left + matched right), RIGHT JOIN, FULL OUTER JOIN. Correlated subqueries.", problem: "Which JOIN returns all records from table A even if table B has no match?", solution: "LEFT JOIN (or LEFT OUTER JOIN)." },
      { title: "Indexes & ACID Transactions", detail: "B-Tree indexes for O(log n) lookups. Transactions: BEGIN, COMMIT, ROLLBACK. ACID: Atomicity, Consistency, Isolation, Durability.", problem: "What does Atomicity in ACID mean?", solution: "All operations in a transaction succeed completely, or all are rolled back." }
    ],
    questions: [
      { q: "What does SQL stand for?", opts: ["Structured Query Language", "Simple Question Language", "System Query Link", "Standard Queue Level"], ans: 0, exp: "SQL is Structured Query Language." },
      { q: "Which key uniquely identifies each record in a database table?", opts: ["Foreign Key", "Primary Key", "Index Key", "Candidate Key"], ans: 1, exp: "Primary keys enforce unique row identification." },
      { q: "Which JOIN returns only rows that have matching values in both tables?", opts: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"], ans: 2, exp: "INNER JOIN matches records existing in both tables." },
      { q: "What does the 'A' in ACID transaction properties represent?", opts: ["Accuracy", "Atomicity", "Availability", "Authentication"], ans: 1, exp: "Atomicity ensures all-or-nothing execution." },
      { q: "What SQL clause filters grouped records after aggregation?", opts: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], ans: 1, exp: "HAVING filters aggregate values." },
      { q: "What is the primary goal of Database Normalization?", opts: ["Make queries slower", "Eliminate redundant data and prevent update anomalies", "Encrypt tables", "Increase file size"], ans: 1, exp: "Normalization reduces data redundancy." },
      { q: "What data structure is standard for database indexing?", opts: ["Array", "Linked List", "B-Tree / B+ Tree", "Stack"], ans: 2, exp: "B-Trees facilitate fast logarithmic range and key lookups." },
      { q: "Which command undoes all changes in an uncommitted transaction?", opts: ["COMMIT", "ROLLBACK", "RESET", "CANCEL"], ans: 1, exp: "ROLLBACK reverts uncommitted changes." },
      { q: "What does 3rd Normal Form (3NF) eliminate?", opts: ["Primary keys", "Transitive dependencies (non-key attributes depending on non-key attributes)", "Foreign keys", "Tables"], ans: 1, exp: "3NF removes transitive functional dependencies." },
      { q: "Which SQL constraint prevents null values from being inserted into a column?", opts: ["UNIQUE", "NOT NULL", "CHECK", "DEFAULT"], ans: 1, exp: "NOT NULL requires a concrete value." }
    ]
  },

  // 9. MongoDB and NoSQL Development
  {
    slug: "mongodb-nosql-development",
    title: "MongoDB and NoSQL Development",
    description: "Master document-oriented NoSQL databases with MongoDB and Mongoose: BSON modeling, embedding vs referencing, aggregation pipelines, and indexing.",
    category: "Databases & Systems",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Understand NoSQL document paradigms vs relational tables", "Model one-to-one, one-to-many, and many-to-many relationships in BSON", "Build advanced aggregation pipelines with $match, $group, $lookup", "Define Mongoose schemas, virtuals, and hooks", "Index fields for query optimization and analyze with explain()"],
    prerequisites: ["Full-Stack Web Development"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "NoSQL Paradigms & Document Store Architecture", detail: "JSON vs BSON. Collections, documents, and dynamic schemas. Comparison with SQL tables.", problem: "What binary format does MongoDB use to store documents?", solution: "BSON (Binary JSON)." },
      { title: "Schema Design: Embedding vs Referencing", detail: "When to embed subdocuments (1:few, atomic reads) vs when to reference ObjectIds (1:many, independent updates).", problem: "When is embedding preferred over referencing in MongoDB?", solution: "When data is accessed together and does not grow unboundedly." },
      { title: "Mongoose ODM: Schemas, Models & Middleware", detail: "Schema definitions, type casting, validation, pre/post hooks, virtuals, populate().", problem: "What does Mongoose's populate() method do?", solution: "It replaces referenced ObjectIds with the actual documents from another collection." },
      { title: "The Aggregation Pipeline: $match, $group, $lookup", detail: "Multi-stage data transformation pipelines: $match (filter), $project (shape), $group (aggregate), $sort, $lookup (join).", problem: "Which aggregation stage acts like a SQL LEFT JOIN in MongoDB?", solution: "$lookup." },
      { title: "Indexing, Performance & Replica Sets", detail: "Single field, compound, and multikey indexes. explain('executionStats'), COLLSCAN vs IXSCAN. High availability via Replica Sets.", problem: "What does 'COLLSCAN' indicate in a MongoDB query explain plan?", solution: "A slow collection scan examining every document because no index was used." }
    ],
    questions: [
      { q: "What format does MongoDB use internally to store documents?", opts: ["XML", "BSON (Binary JSON)", "YAML", "CSV"], ans: 1, exp: "MongoDB stores data in BSON for efficiency and typed support." },
      { q: "What is an ObjectId in MongoDB?", opts: ["An integer counter", "A 12-byte unique identifier incorporating timestamp, machine ID, process ID, and counter", "A random string", "A memory address"], ans: 1, exp: "ObjectIds are 12-byte globally unique keys." },
      { q: "What Mongoose method loads referenced documents from another collection?", opts: ["join()", "populate()", "attach()", "link()"], ans: 1, exp: "populate() replaces ObjectIds with populated documents." },
      { q: "Which aggregation pipeline stage filters documents matching criteria?", opts: ["$filter", "$match", "$where", "$select"], ans: 1, exp: "$match filters documents like a query." },
      { q: "What is the equivalent of a SQL Table in MongoDB?", opts: ["Database", "Collection", "Document", "Index"], ans: 1, exp: "Collections store groups of documents." },
      { q: "Why is an IXSCAN preferred over a COLLSCAN in query execution?", opts: ["COLLSCAN is faster", "IXSCAN uses an index to locate matching documents in O(log n) time without scanning all documents", "IXSCAN uses no memory", "They are identical"], ans: 1, exp: "IXSCAN scans the index rather than the entire collection." },
      { q: "What does the $group aggregation stage do?", opts: ["Groups documents by a specified key and calculates aggregate values", "Deletes documents", "Sorts documents", "Sends an email"], ans: 0, exp: "$group aggregates documents like SQL GROUP BY." },
      { q: "What provides high availability and automatic failover in MongoDB?", opts: ["Single node server", "Replica Sets", "Text files", "CSV backups"], ans: 1, exp: "Replica Sets provide automatic failover and redundancy." },
      { q: "In Mongoose, what is a 'pre' hook used for?", opts: ["Executing middleware logic before an event like 'save' (e.g. hashing passwords)", "Styling CSS", "Closing server", "Restarting DB"], ans: 0, exp: "Pre hooks run middleware before actions occur." },
      { q: "Which index type allows unique value enforcement in a MongoDB collection?", opts: ["Text index", "Unique index (unique: true)", "Sparse index only", "TTL index"], ans: 1, exp: "Unique indexes reject duplicate field values." }
    ]
  },

  // 10. Git, GitHub and Collaborative Development
  {
    slug: "git-github-collaboration",
    title: "Git, GitHub and Collaborative Development",
    description: "Master distributed version control: commits, branching strategies, resolving merge conflicts, pull requests, rebase, and GitHub workflows.",
    category: "DevOps & Tooling",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Initialize Git repositories and manage the three-tree architecture", "Create, merge, and rebase branches safely", "Resolve complex merge conflicts systematically", "Open, review, and collaborate on GitHub Pull Requests", "Use Git stash, cherry-pick, and interactive rebase"],
    prerequisites: ["Computer Fundamentals"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "Git Three-Tree Architecture & Commits", detail: "Working Directory -> Staging Area (git add) -> Commit History (git commit). Atomic commits with informative commit messages.", problem: "What command moves changes from working directory to staging area?", solution: "git add <file>." },
      { title: "Branching Strategies & Fast-Forward Merges", detail: "git branch, git checkout -b feature-branch, git merge. Feature branching model and main branch protection.", problem: "What command creates and switches to a new branch called 'feature'?", solution: "git checkout -b feature (or git switch -c feature)." },
      { title: "Resolving Merge Conflicts Systematically", detail: "When two branches modify the same line. <<<<<<< HEAD, =======, >>>>>>> branch. Selecting correct code, staging, and committing.", problem: "What markers does Git insert into a file during a merge conflict?", solution: "<<<<<<< HEAD, =======, and >>>>>>>." },
      { title: "GitHub Collaboration: Forking & Pull Requests", detail: "Remotes (origin, upstream), pushing branches, opening PRs, code reviews, approving changes, squashing commits.", problem: "What is a Pull Request (PR)?", solution: "A proposed set of changes submitted for code review before merging." },
      { title: "Advanced Git: Stash, Cherry-Pick & Rebase", detail: "git stash saves uncommitted work. git cherry-pick copies a specific commit. git rebase linearizes project history.", problem: "How do you temporarily shelf uncommitted changes without committing?", solution: "git stash." }
    ],
    questions: [
      { q: "What command initializes a new Git repository in the current folder?", opts: ["git start", "git init", "git new", "git create"], ans: 1, exp: "git init creates a new Git repository." },
      { q: "What is the purpose of the Git Staging Area (Index)?", opts: ["To run code", "To prepare and curate exact snapshots before committing", "To upload to GitHub", "To delete files"], ans: 1, exp: "The staging area selects specific changes for the next commit." },
      { q: "What does 'git clone <url>' do?", opts: ["Copies an existing remote repository onto your local computer", "Deletes a repository", "Creates a new branch", "Merges two branches"], ans: 0, exp: "git clone downloads a remote repo locally." },
      { q: "What occurs during a Git merge conflict?", opts: ["Computer loses internet", "Two branches modified the same lines in a file, requiring human decision", "Git deletes the file", "Code is scrambled"], ans: 1, exp: "Conflicting edits on identical lines require manual resolution." },
      { q: "What is the difference between 'git pull' and 'git fetch'?", opts: ["They are identical", "git fetch downloads remote changes without merging; git pull fetches and merges", "git pull only fetches tags", "git fetch deletes files"], ans: 1, exp: "git pull = git fetch + git merge." },
      { q: "What does 'git stash' do?", opts: ["Permanently deletes working files", "Temporarily shelves uncommitted modifications so you can switch branches", "Commits files to main", "Clones a repository"], ans: 1, exp: "git stash saves uncommitted changes temporarily." },
      { q: "What is the main benefit of a Git Pull Request (PR)?", opts: ["It automatically merges without inspection", "It allows peer review, automated testing, and discussion before merging", "It renames branches", "It shuts down the server"], ans: 1, exp: "Pull requests facilitate thorough code reviews." },
      { q: "What command shows commit history chronologically?", opts: ["git status", "git log", "git history", "git show"], ans: 1, exp: "git log displays commit logs." },
      { q: "What is 'git cherry-pick <commit-hash>' used for?", opts: ["Pick flowers", "Apply the changes from a specific single commit onto your current branch", "Delete a branch", "Create a tag"], ans: 1, exp: "Cherry-pick ports an individual commit across branches." },
      { q: "What file tells Git which files or directories to ignore and never track?", opts: [".gitconfig", ".gitignore", "README.md", "LICENSE"], ans: 1, exp: ".gitignore excludes unwanted files (e.g. node_modules, .env)." }
    ]
  },

  // 11. Software Engineering and Testing
  {
    slug: "software-engineering-testing",
    title: "Software Engineering and Testing",
    description: "Learn professional engineering: Agile/Scrum, Test-Driven Development (TDD), unit/integration testing, CI/CD pipelines, and design patterns.",
    category: "Software Engineering",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Implement Test-Driven Development: Red-Green-Refactor cycle", "Write unit, integration, and end-to-end tests with mocks", "Participate in Agile sprints, user story sizing, and standups", "Apply Creational, Structural, and Behavioral Design Patterns", "Automate linting and continuous integration checks"],
    prerequisites: ["Full-Stack Web Development"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The Testing Pyramid & Unit Testing", detail: "Unit tests (fast, isolated) -> Integration tests (components together) -> E2E tests (full browser). Writing assertions.", problem: "What level of the testing pyramid should be most numerous?", solution: "Unit tests (fast, reliable, and isolated)." },
      { title: "Test-Driven Development (TDD): Red-Green-Refactor", detail: "1) Red: Write a failing test for new behavior. 2) Green: Write minimal code to pass test. 3) Refactor: Clean up code without breaking tests.", problem: "What is the first step in the TDD cycle?", solution: "Write a test that fails (Red)." },
      { title: "Test Doubles: Mocks, Stubs & Spies", detail: "Isolating code from external dependencies. Mocking database calls and HTTP APIs in tests.", problem: "Why mock database calls in unit tests?", solution: "To ensure unit tests run fast and isolated from network/database state." },
      { title: "Agile, Scrum & Continuous Integration", detail: "User stories, story points, sprint planning, daily standup, sprint review, retrospective. GitHub Actions CI runners.", problem: "What is the purpose of a sprint retrospective in Scrum?", solution: "To reflect on the past sprint and identify process improvements." },
      { title: "Software Design Patterns (Factory, Observer, Singleton)", detail: "Creational (Factory, Singleton), Structural (Adapter, Facade), Behavioral (Observer, Strategy).", problem: "Which pattern ensures a class has only one global instance?", solution: "The Singleton Pattern." }
    ],
    questions: [
      { q: "What is the standard cycle of Test-Driven Development (TDD)?", opts: ["Plan-Code-Test", "Red - Green - Refactor", "Write-Deploy-Fix", "Debug-Test-Repeat"], ans: 1, exp: "TDD follows Red (fail) -> Green (pass) -> Refactor." },
      { q: "Which testing layer occupies the broad base of the Testing Pyramid?", opts: ["End-to-End tests", "Manual exploratory tests", "Unit tests", "Performance tests"], ans: 2, exp: "Unit tests form the broad foundation." },
      { q: "What is a 'Mock' in automated testing?", opts: ["A test that laughs at code", "A simulated object that mimics behavior of real dependencies for isolation", "A syntax error", "A slow computer"], ans: 1, exp: "Mocks simulate external systems like databases and APIs." },
      { q: "What is the purpose of Continuous Integration (CI)?", opts: ["To write code automatically", "To automatically build and test code whenever changes are committed", "To deploy without testing", "To replace developers"], ans: 1, exp: "CI verifies build and test passes on every push." },
      { q: "Which design pattern ensures only one instance of a class exists across an application?", opts: ["Factory Pattern", "Singleton Pattern", "Observer Pattern", "Strategy Pattern"], ans: 1, exp: "Singleton restricts instantiation to a single object." },
      { q: "What design pattern defines a one-to-many dependency so when one object changes, all dependents are notified?", opts: ["Observer Pattern", "Singleton Pattern", "Adapter Pattern", "Proxy Pattern"], ans: 0, exp: "The Observer pattern broadcasts state changes." },
      { q: "In Agile Scrum, what is the role of a Daily Standup?", opts: ["A 3-hour long lecture", "A brief 15-minute sync on yesterday's work, today's plan, and blockers", "A coding test", "A coffee break"], ans: 1, exp: "Daily standup provides quick team alignment on progress and blockers." },
      { q: "What is the difference between Unit testing and Integration testing?", opts: ["Unit tests test individual functions in isolation; integration tests verify modules working together", "Unit tests are for frontend only", "They are identical", "Integration tests run faster"], ans: 0, exp: "Unit tests isolate units; integration verifies component interactions." },
      { q: "What is code refactoring?", opts: ["Adding 10 new features", "Restructuring existing code to improve internal quality without changing external behavior", "Deleting all tests", "Renaming files"], ans: 1, exp: "Refactoring cleans code without altering functionality." },
      { q: "What does code coverage measure in automated testing?", opts: ["How fast code runs", "The percentage of lines or branches of source code executed during tests", "File size", "Number of comments"], ans: 1, exp: "Coverage measures code execution during test suites." }
    ]
  },

  // 12. Computer Networks and Internet Architecture
  {
    slug: "computer-networks-architecture",
    title: "Computer Networks and Internet Architecture",
    description: "Understand network engineering: OSI 7-layer model, TCP/IP, IP addressing (IPv4/IPv6), subnetting, DNS, routing, HTTP/HTTPS, and SSL/TLS handshakes.",
    category: "Computer Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: ["Map network protocols across the OSI 7-layer model", "Explain TCP 3-way handshakes, sequence numbers, and UDP differences", "Calculate IPv4 subnets using CIDR notation (/24, /16)", "Trace DNS resolution from root servers to authoritative records", "Explain the asymmetric/symmetric cryptography of TLS handshakes"],
    prerequisites: ["Computer Fundamentals"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    lessons: [
      { title: "The OSI 7-Layer & TCP/IP Network Models", detail: "Application, Presentation, Session, Transport, Network, Data Link, Physical. Encapsulation and decapsulation.", problem: "Which OSI layer does the IP protocol operate on?", solution: "Layer 3 (Network Layer)." },
      { title: "Transport Protocols: TCP vs UDP", detail: "TCP: connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK), reliable, flow control. UDP: connectionless, fast, no guarantees (video/gaming).", problem: "Why do video games and live streaming often use UDP instead of TCP?", solution: "UDP prioritizes low latency and speed over guaranteed retransmission." },
      { title: "IP Addressing & CIDR Subnetting", detail: "IPv4 (32-bit: 192.168.1.1) vs IPv6 (128-bit hex). Network portion vs Host portion. CIDR /24 = 256 addresses (254 usable hosts).", problem: "How many total IP addresses are in a /24 subnet?", solution: "256 (2^(32-24) = 2^8 = 256)." },
      { title: "DNS (Domain Name System) Resolution Pipeline", detail: "Recursive resolver -> Root server (.) -> TLD server (.com) -> Authoritative nameserver. A, CNAME, MX, TXT records.", problem: "What does an 'A Record' in DNS map?", solution: "A domain name to an IPv4 address." },
      { title: "HTTP, HTTPS & The TLS 1.3 Handshake", detail: "HTTP plain text on port 80. HTTPS on port 443 with TLS. Key exchange using Diffie-Hellman, certificate verification.", problem: "What port does HTTPS use by default?", solution: "Port 443." }
    ],
    questions: [
      { q: "How many layers are in the OSI model?", opts: ["4", "5", "7", "9"], ans: 2, exp: "The OSI reference model has exactly 7 layers." },
      { q: "What is the TCP 3-way handshake sequence?", opts: ["HELLO - ACCEPT - READY", "SYN - SYN-ACK - ACK", "PING - PONG - OK", "CONNECT - VERIFY - SEND"], ans: 1, exp: "TCP handshake: SYN -> SYN-ACK -> ACK." },
      { q: "On which OSI layer do routers primarily operate?", opts: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"], ans: 2, exp: "Routers operate at Layer 3 (Network Layer) routing IP packets." },
      { q: "What is the primary difference between TCP and UDP?", opts: ["TCP is reliable with retransmission; UDP is connectionless and low-latency", "UDP is encrypted; TCP is not", "TCP only works on mobile", "UDP is slower"], ans: 0, exp: "TCP guarantees delivery; UDP favors speed." },
      { q: "How many bits are in an IPv4 address?", opts: ["16 bits", "32 bits", "64 bits", "128 bits"], ans: 1, exp: "IPv4 uses 32-bit addresses." },
      { q: "What does DNS do?", opts: ["Translates domain names (e.g. google.com) into IP addresses", "Compresses images", "Stores user files", "Speeds up CPU"], ans: 0, exp: "DNS resolves human-readable names to IP addresses." },
      { q: "What DNS record type maps an alias domain to another canonical domain?", opts: ["A record", "CNAME record", "MX record", "TXT record"], ans: 1, exp: "CNAME records provide domain aliases." },
      { q: "What default port is used for unencrypted HTTP web traffic?", opts: ["21", "22", "80", "443"], ans: 2, exp: "HTTP defaults to port 80." },
      { q: "What does NAT (Network Address Translation) allow?", opts: ["Multiple private local IP devices to share a single public IP address", "Computers to run without electricity", "Deleting domain names", "Bypassing passwords"], ans: 0, exp: "NAT maps private local addresses to a public router IP." },
      { q: "What does the TTL (Time to Live) field in an IP packet prevent?", opts: ["Data corruption", "Packets from circulating endlessly in network routing loops", "Virus infection", "Slow downloads"], ans: 1, exp: "TTL decrements at each hop, dropping at 0 to kill loops." }
    ]
  }
];
