/**
 * Blueprints for GROUP C (Part 2 - Courses 13 to 24): After Standard 12 and Above
 * Advanced computer science, systems engineering, artificial intelligence, cloud, and security.
 */

export const blueprintsC_part2 = [
  // 13. Operating Systems Fundamentals
  {
    slug: "operating-systems-fundamentals",
    title: "Operating Systems Fundamentals",
    description: "Master modern OS internals: processes, threads, CPU scheduling algorithms, virtual memory, paging, deadlocks, and POSIX file systems.",
    category: "Computer Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Contrast processes and threads with PCB and TCB structures",
      "Evaluate CPU scheduling: Round Robin, SJF, Priority, and Multi-level feedback queues",
      "Explain virtual memory, page tables, TLBs, and page replacement policies (LRU)",
      "Analyze the 4 Coffman deadlock conditions and apply Banker's Algorithm",
      "Understand kernel vs user mode transitions and system call handling"
    ],
    prerequisites: ["Computer Fundamentals", "Data Structures"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Processes, Threads & Concurrency Models",
        detail: "Process Control Block (PCB: PID, state, registers, memory limits). User-level vs Kernel-level threads. Context switching overhead and register saving.",
        problem: "Why is context switching between threads in the same process faster than between processes?",
        solution: "Threads share the same virtual address space, open files, and page tables; no TLB flush is required."
      },
      {
        title: "CPU Scheduling Algorithms",
        detail: "Preemptive vs Non-preemptive scheduling. First-Come First-Served (FCFS, convoy effect), Shortest Job First (SJF), Round Robin (time quantum tuning), and Multi-Level Feedback Queues.",
        problem: "In Round Robin, what happens if the time quantum is set excessively large?",
        solution: "It degrades into FCFS (First-Come First-Served), increasing turnaround and response times for interactive jobs."
      },
      {
        title: "Process Synchronization & Race Conditions",
        detail: "Critical section problem: Mutual Exclusion, Progress, Bounded Waiting. Peterson's algorithm, Test-and-Set hardware primitives, Mutexes, and counting Semaphores.",
        problem: "What is a race condition in concurrent programming?",
        solution: "A bug where the final outcome depends on the non-deterministic execution order or timing of competing threads."
      },
      {
        title: "Virtual Memory, Paging & Page Replacement",
        detail: "Logical vs Physical addresses. Page tables, Translation Lookaside Buffer (TLB), Page Faults, Thrashing. Replacement algorithms: FIFO, Optimal (Belady), and Least Recently Used (LRU).",
        problem: "What is Belady's Anomaly?",
        solution: "The phenomenon where increasing the number of page frames results in an increase in page faults under FIFO replacement."
      },
      {
        title: "Deadlocks: Coffman Conditions & Resolution",
        detail: "4 necessary conditions: Mutual exclusion, Hold and wait, No preemption, Circular wait. Resource Allocation Graphs, Banker's avoidance algorithm, and recovery strategies.",
        problem: "How can an operating system break the Circular Wait condition to prevent deadlocks?",
        solution: "Impose a strict global numerical ordering on all resources and require processes to request resources in strictly ascending order."
      }
    ],
    questions: [
      { q: "Which CPU scheduling algorithm gives the theoretical minimum average waiting time?", opts: ["Round Robin", "First-Come First-Served", "Shortest Job First (SJF)", "Priority Scheduling"], ans: 2, exp: "SJF is provably optimal for minimizing average waiting time." },
      { q: "What hardware component accelerates virtual address translation by caching recent page table entries?", opts: ["ALU", "TLB (Translation Lookaside Buffer)", "L3 Cache", "DMA Controller"], ans: 1, exp: "The TLB caches recent virtual-to-physical address mappings." },
      { q: "Which of the following is NOT one of the 4 Coffman deadlock conditions?", opts: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"], ans: 2, exp: "No preemption is the necessary condition; allowing preemption prevents deadlocks." },
      { q: "What is 'thrashing' in an operating system?", opts: ["CPU overheating", "The OS spending more time swapping pages in/out of disk than executing processes", "A file deletion error", "Network packet loss"], ans: 1, exp: "Thrashing occurs when active working sets exceed physical memory, causing continuous page faults." },
      { q: "What system call is used in Unix-like OS to create a new child process?", opts: ["fork()", "spawn()", "create()", "clone()"], ans: 0, exp: "fork() duplicates the calling process to create a child." },
      { q: "What does a counting semaphore with an initial value of 1 behave as?", opts: ["A monitor", "A binary semaphore (mutex)", "A thread pool", "A condition variable"], ans: 1, exp: "A counting semaphore initialized to 1 provides binary mutual exclusion." },
      { q: "What triggers a transition from user mode to kernel mode?", opts: ["Compiling source code", "System calls, hardware interrupts, or CPU exceptions", "Closing a web browser", "Moving the mouse"], ans: 1, exp: "System calls and hardware interrupts trigger a trap to kernel mode." },
      { q: "In the Round Robin scheduling algorithm, what defines the time slice allocated to each process?", opts: ["Quantum", "Clock period", "Epoch", "Burst"], ans: 0, exp: "The time quantum determines how long each process runs before being preempted." },
      { q: "What problem does Peterson's Algorithm solve?", opts: ["Two-process critical section mutual exclusion", "Disk scheduling", "Memory fragmentation", "Network packet routing"], ans: 0, exp: "Peterson's algorithm provides software mutual exclusion for two concurrent processes." },
      { q: "Which page replacement policy replaces the page that has not been used for the longest period of time?", opts: ["FIFO", "Optimal", "Least Recently Used (LRU)", "MRU"], ans: 2, exp: "LRU evicts the page unreferenced for the longest past interval." }
    ]
  },

  // 14. Artificial Intelligence: Concepts and Applications
  {
    slug: "artificial-intelligence-concepts",
    title: "Artificial Intelligence: Concepts and Applications",
    description: "Explore core AI foundations: intelligent agents, search algorithms (A*, Minimax), knowledge representation, expert systems, and computer vision.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Formulate problem states, goal states, and heuristic search graphs",
      "Implement the A* search algorithm with admissible and consistent heuristics",
      "Apply Minimax search with Alpha-Beta pruning for adversarial 2-player games",
      "Represent knowledge using propositional and first-order predicate logic",
      "Explain the ethical implications, biases, and regulatory landscapes of AI systems"
    ],
    prerequisites: ["Data Structures and Algorithms", "Python Programming"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Intelligent Agents & Problem Formulation",
        detail: "PEAS framework (Performance measure, Environment, Actuators, Sensors). Environment types: fully vs partially observable, deterministic vs stochastic, discrete vs continuous, single vs multi-agent.",
        problem: "Define the PEAS environment for an autonomous self-driving car.",
        solution: "P: Safety, speed, comfort; E: Roads, pedestrians, weather; A: Steering, brakes, accelerator; S: Cameras, LIDAR, radar, GPS."
      },
      {
        title: "Informed Search & The A* Algorithm",
        detail: "Evaluation function f(n) = g(n) + h(n). Path cost g(n) + heuristic estimate h(n). Admissibility (never overestimates true cost) and consistency guarantees optimality.",
        problem: "If a heuristic h(n) is admissible, is A* search guaranteed to find the optimal path in a tree search?",
        solution: "Yes, admissibility guarantees optimal solutions because it never overestimates remaining distance."
      },
      {
        title: "Adversarial Search: Minimax & Alpha-Beta Pruning",
        detail: "Game trees for zero-sum games (Chess, Tic-Tac-Toe). Maximizing player chooses max value; minimizing player chooses min value. Alpha (best max choice) and Beta (best min choice) prune unneeded branches.",
        problem: "What is the worst-case time complexity reduction achieved by optimal Alpha-Beta pruning over standard Minimax?",
        solution: "It reduces effective branching factor from b to sqrt(b), doubling search depth reachable in the same time: O(b^(d/2))."
      },
      {
        title: "Knowledge Representation & Logical Inference",
        detail: "Propositional logic, truth tables, inference rules (Modus Ponens, Resolution). First-Order Logic (FOL): quantifiers (Universal forall, Existential exists), predicates, and unification.",
        problem: "Express in First-Order Logic: 'Every student who studies passes the exam.'",
        solution: "forall x (Student(x) and Studies(x) -> PassesExam(x))."
      },
      {
        title: "Ethics, Fairness & Explainable AI (XAI)",
        detail: "Algorithmic bias from historical datasets, disparate impact, transparency vs black-box neural models. SHAP and LIME interpretability techniques. AI safety alignment.",
        problem: "Why can an AI model display discriminatory behavior even when sensitive attributes like gender or race are removed?",
        solution: "Proxy features (e.g. zip codes, school names, browsing history) can correlate strongly with protected attributes."
      }
    ],
    questions: [
      { q: "In the A* search algorithm, what does the evaluation function f(n) = g(n) + h(n) represent?", opts: ["Total execution time", "Cost from start to n plus estimated cost from n to goal", "Heuristic divided by node depth", "Memory footprint"], ans: 1, exp: "g(n) is exact cost from start; h(n) is estimated cost to goal." },
      { q: "What property must a heuristic h(n) have to guarantee A* tree search optimality?", opts: ["Monotonicity", "Admissibility (never overestimates)", "Linearity", "Strict positivity"], ans: 1, exp: "Admissible heuristics never overestimate the true remaining cost." },
      { q: "What does Alpha-Beta pruning accomplish in Minimax game trees?", opts: ["Finds deeper paths by pruning branches that cannot influence the final decision", "Compresses the game board", "Guarantees a win", "Eliminates opponent turns"], ans: 0, exp: "Alpha-beta skips subtrees that provably cannot affect the root outcome." },
      { q: "What test did Alan Turing propose to determine whether a machine exhibits human intelligence?", opts: ["The Stanford-Binet Test", "The Turing Test (Imitation Game)", "The SAT test", "The CAPTCHA challenge"], ans: 1, exp: "The Turing Test evaluates if an evaluator can distinguish machine responses from human ones." },
      { q: "What is the primary role of an 'Actuator' in the PEAS agent model?", opts: ["To perceive environment signals", "To store historical memory", "To take actions and interact with the environment", "To calculate loss gradients"], ans: 2, exp: "Actuators enact decisions upon the physical or software environment." },
      { q: "What rule of inference states that if P and (P -> Q) are true, then Q must be true?", opts: ["Modus Tollens", "Modus Ponens", "Resolution", "De Morgan's Law"], ans: 1, exp: "Modus Ponens is the classic affirmation rule." },
      { q: "In a zero-sum two-player game, what does one player's gain equal?", opts: ["Zero always", "The exact loss of the opponent", "Double the score", "Random points"], ans: 1, exp: "In zero-sum games, utility won by Player 1 equals utility lost by Player 2." },
      { q: "What technique generates local explanations for individual predictions of complex black-box machine learning models?", opts: ["LIME / SHAP", "Gradient descent", "Random search", "Grid search"], ans: 0, exp: "LIME and SHAP explain individual black-box model decisions." },
      { q: "Which logic framework introduces universal (forall) and existential (exists) quantifiers?", opts: ["Propositional Logic", "First-Order Logic (FOL)", "Boolean Algebra", "Fuzzy Logic"], ans: 1, exp: "First-Order Logic uses quantifiers over domain variables." },
      { q: "What is algorithmic bias in AI systems?", opts: ["A bug that stops compilation", "Systematic, unfair discrimination against certain groups produced by training on biased historical data", "Fast convergence", "GPU memory leaks"], ans: 1, exp: "Bias reflects historical inequities or non-representative training data." }
    ]
  },

  // 15. Generative AI and Large Language Models
  {
    slug: "generative-ai-llms",
    title: "Generative AI and Large Language Models",
    description: "Understand Transformer architectures, self-attention mechanisms, pretraining, fine-tuning (LoRA), hallucinations, retrieval-augmented generation (RAG), and evaluation.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Explain the Transformer architecture: Scaled Dot-Product Attention, Multi-Head Attention, and positional encodings",
      "Trace the pre-training (next-token prediction), supervised fine-tuning (SFT), and RLHF alignment phases",
      "Implement Retrieval-Augmented Generation (RAG) with vector databases and semantic search",
      "Diagnose and mitigate LLM hallucinations and grounding issues",
      "Apply Parameter-Efficient Fine-Tuning (PEFT) using Low-Rank Adaptation (LoRA)"
    ],
    prerequisites: ["Deep Learning Foundations", "Python Programming"],
    duration: "22 hours",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "The Transformer Revolution & Self-Attention",
        detail: "Attention Is All You Need (Vaswani et al.). Query (Q), Key (K), Value (V) matrices. Attention(Q,K,V) = softmax(Q K^T / sqrt(d_k)) V. Multi-Head Attention and Positional Encodings.",
        problem: "Why is division by sqrt(d_k) necessary in scaled dot-product attention?",
        solution: "For large dimensions, dot products grow large in magnitude, pushing the softmax function into regions with vanishingly small gradients."
      },
      {
        title: "Pretraining, SFT & RLHF Alignment Pipeline",
        detail: "Phase 1: Self-supervised pretraining on trillions of tokens (causal language modeling). Phase 2: Supervised Fine-Tuning (SFT) on instructional pairs. Phase 3: Reinforcement Learning from Human Feedback (RLHF) with reward models and PPO/DPO.",
        problem: "What is the objective of RLHF in modern LLMs like Claude or GPT-4?",
        solution: "To align the model's outputs with human intent: making it helpful, honest, harmless, and resistant to jailbreaks."
      },
      {
        title: "Retrieval-Augmented Generation (RAG) Systems",
        detail: "Overcoming LLM knowledge cutoffs and private domain gaps. Chunking documents, generating text embeddings, storing vectors in Milvus/Pinecone/Chroma, similarity search (cosine similarity), and context augmentation in prompt.",
        problem: "What is the primary advantage of RAG over model retraining when proprietary company documentation updates daily?",
        solution: "RAG updates the searchable vector index instantly without requiring expensive and slow model re-training or fine-tuning."
      },
      {
        title: "Hallucinations, Jailbreaks & Safety Guardrails",
        detail: "Why LLMs hallucinate: probabilistic token sampling without ground-truth verification. Prompt injections, guardrail frameworks (NeMo Guardrails, Llama Guard), and citation grounding.",
        problem: "What is a 'prompt injection' attack in LLM applications?",
        solution: "Malicious user input engineered to override system instructions and force the model to execute unauthorized actions."
      },
      {
        title: "Parameter-Efficient Fine-Tuning (PEFT & LoRA)",
        detail: "Why full fine-tuning is impractical for 70B+ parameters. Low-Rank Adaptation (LoRA): freezing base weights W and decomposing updates Delta W = B * A where rank r << d. QLoRA (4-bit quantization).",
        problem: "How does LoRA dramatically reduce GPU VRAM requirements during model adaptation?",
        solution: "It freezes the billions of base model weights and trains only two tiny low-rank matrices (A and B), reducing trainable parameters by 99%."
      }
    ],
    questions: [
      { q: "What is the core mathematical formula for Scaled Dot-Product Attention?", opts: ["softmax(Q + K + V)", "softmax((Q * K^T) / sqrt(d_k)) * V", "sigmoid(W * X + b)", "tanh(Q * K) / V"], ans: 1, exp: "Attention is defined as softmax((Q K^T) / sqrt(d_k)) V." },
      { q: "What component gives Transformers information about word sequence and token order?", opts: ["Recurrent hidden states", "Positional Encodings", "LSTM gates", "Convolutional filters"], ans: 1, exp: "Positional encodings inject positional order into input embeddings." },
      { q: "What does 'RAG' stand for in Generative AI systems?", opts: ["Random Access Generation", "Retrieval-Augmented Generation", "Recursive Auto-regression", "Robust Adversarial Gradients"], ans: 1, exp: "RAG stands for Retrieval-Augmented Generation." },
      { q: "What is an LLM 'hallucination'?", opts: ["A colorful image generated by the model", "The model generating factually false, ungrounded assertions with high confidence", "An out-of-memory crash", "High temperature settings"], ans: 1, exp: "Hallucinations are plausible-sounding but completely fabricated responses." },
      { q: "What does LoRA (Low-Rank Adaptation) do during model fine-tuning?", opts: ["Deletes 90% of model layers", "Freezes base weights and trains two low-rank matrices representing weight updates", "Quantizes weights to 1-bit", "Re-trains from scratch"], ans: 1, exp: "LoRA decomposes updates Delta W into low-rank matrices A and B." },
      { q: "In the pre-training stage of Causal Language Models, what is the training objective?", opts: ["Predicting the next token in the sequence", "Classifying positive vs negative reviews", "Translating French to English", "Generating images"], ans: 0, exp: "Autoregressive LLMs minimize cross-entropy loss predicting the next token." },
      { q: "What does RLHF stand for in LLM alignment?", opts: ["Real-time Low Latency Host Framework", "Reinforcement Learning from Human Feedback", "Recursive Layer Handling Function", "Random Linear Heuristic Filter"], ans: 1, exp: "RLHF is Reinforcement Learning from Human Feedback." },
      { q: "What mathematical metric is most commonly used to measure embedding vector similarity in RAG?", opts: ["Euclidean Distance only", "Cosine Similarity", "Manhattan distance", "Hamming distance"], ans: 1, exp: "Cosine similarity measures the angle between normalized semantic embedding vectors." },
      { q: "What does the 'Temperature' parameter control during token sampling?", opts: ["CPU cooling speed", "The randomness and entropy of token probability distributions", "The prompt length", "The context window size"], ans: 1, exp: "Lower temperature yields more deterministic output; higher temperature increases randomness." },
      { q: "What is the primary vulnerability of naive RAG applications to malicious documents?", opts: ["Indirect prompt injection embedded in retrieved passages", "GPU overheating", "Vector database index corruption", "Loss of embeddings"], ans: 0, exp: "Retrieved texts containing prompt injections can manipulate model behavior." }
    ]
  },

  // 16. Prompt Engineering and AI Productivity
  {
    slug: "prompt-engineering-productivity",
    title: "Prompt Engineering and AI Productivity",
    description: "Master systematic prompting techniques: few-shot in-context learning, Chain-of-Thought (CoT), ReAct framework, structured outputs (JSON), and AI agents.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Craft zero-shot, few-shot, and system persona prompts with clear constraints",
      "Implement Chain-of-Thought (CoT) and Least-to-Most decomposition prompting",
      "Apply the ReAct (Reasoning + Acting) loop for autonomous tool-using agents",
      "Enforce schema-compliant JSON outputs using function calling and Pydantic",
      "Automate real-world productivity workflows using coding assistants and AI pipelines"
    ],
    prerequisites: ["Generative AI basics"],
    duration: "16 hours",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Prompt Anatomy & Core In-Context Learning",
        detail: "The 5 components of high-precision prompts: Role/Persona, Task Context, Specific Constraints, Input Data, Output Format/Schema. Zero-shot vs Few-shot exemplar selection.",
        problem: "Why are few-shot exemplars with clear input-output pairings superior to long descriptive instructions for complex classifications?",
        solution: "Exemplars establish pattern matching directly in the model's activation space, eliminating ambiguous semantic interpretations."
      },
      {
        title: "Chain-of-Thought (CoT) & Step-by-Step Reasoning",
        detail: "'Let's think step by step' (Zero-shot CoT). Few-shot CoT with intermediate reasoning derivations. Tree of Thoughts (ToT) for multi-branch exploration with backtracking.",
        problem: "Why does Chain-of-Thought prompting improve arithmetic and multi-step logic problem accuracy?",
        solution: "It forces the model to generate intermediate tokens, using external computational scratchpad capacity rather than predicting the final answer in one hop."
      },
      {
        title: "Enforcing Structured JSON & Tool Function Calling",
        detail: "Guaranteeing valid JSON schemas for downstream APIs. System prompts with JSON Schema specifications. OpenAI/Anthropic native function and tool calling protocols.",
        problem: "How does function calling allow an LLM to interact with live database records or external weather APIs?",
        solution: "The model outputs structured JSON with function name and arguments; the host executes the API and feeds the result back to the model."
      },
      {
        title: "The ReAct Framework: Reasoning + Action",
        detail: "ReAct loop: Thought -> Action (Tool Call) -> Observation (Environment Return) -> Thought -> Final Answer. LangChain and LlamaIndex agent loops.",
        problem: "What is the difference between an LLM acting purely as a chatbot vs acting as an autonomous ReAct agent?",
        solution: "A chatbot only generates text responses; a ReAct agent can invoke tools, inspect observations, and iteratively refine its actions to achieve a goal."
      },
      {
        title: "Developer Workflows & AI Coding Productivity",
        detail: "Pair programming with AI: generating unit tests, architectural refactoring, documentation extraction, debugging stack traces, and continuous prompting hygiene.",
        problem: "What is prompt drift and how can engineering teams maintain reproducible LLM outputs in production?",
        solution: "Version control prompts in Git, pin model snapshots, write regression evals, and enforce low temperatures."
      }
    ],
    questions: [
      { q: "What phrase famously triggers Zero-Shot Chain-of-Thought reasoning in LLMs?", opts: ["Answer immediately", "'Let's think step by step'", "Be extremely brief", "Do not write code"], ans: 1, exp: "'Let's think step by step' instructs the model to produce intermediate reasoning tokens." },
      { q: "What is 'Few-Shot' prompting?", opts: ["Prompting using few words", "Providing a few concrete input-output examples in the prompt before the query", "Running the model a few times", "Using small models"], ans: 1, exp: "Few-shot prompting provides exemplars demonstrating the desired input-to-output mapping." },
      { q: "What does the ReAct framework combine in LLM agents?", opts: ["Recursion and Activation", "Reasoning traces and Action execution (tool calling)", "React.js and TypeScript", "Retrieval and Accuracy"], ans: 1, exp: "ReAct combines Reasoning steps with Action execution in an iterative loop." },
      { q: "What is the primary benefit of native 'Function Calling' over raw string prompting?", opts: ["It is cheaper", "The model returns deterministic, schema-validated JSON arguments guaranteed to match your schema", "It bypasses all safety filters", "It runs locally"], ans: 1, exp: "Function calling constrains model generation to conform strictly to defined schemas." },
      { q: "What is the 'System Prompt' typically used for in chat completions?", opts: ["To write user queries", "To set foundational behavioral rules, role persona, and security constraints", "To display errors", "To shut down the model"], ans: 1, exp: "The system message defines the model's global role, guidelines, and constraints." },
      { q: "What technique explores multiple reasoning paths simultaneously with evaluation and backtracking?", opts: ["Tree of Thoughts (ToT)", "Greedy search", "Zero-shot prompting", "Temperature tuning"], ans: 0, exp: "Tree of Thoughts branches into multiple potential solutions and evaluates each." },
      { q: "When should you set model Temperature close to 0.0?", opts: ["When writing creative poetry", "When performing tasks requiring deterministic accuracy, code generation, or structured JSON extraction", "When translating slang", "Always"], ans: 1, exp: "Zero temperature selects the most probable tokens, maximizing reproducibility." },
      { q: "What is 'in-context learning' in modern LLMs?", opts: ["Updating model weights via backpropagation", "The model adapting its behavior based entirely on information provided in the prompt without parameter updates", "Reading from RAM", "Training a new checkpoint"], ans: 1, exp: "In-context learning happens purely in inference through prompt context." },
      { q: "What is 'Jailbreaking' in prompt engineering?", opts: ["Rooting a mobile phone", "Crafting adversarial prompts designed to bypass model safety and ethical alignment rules", "Accelerating inference speed", "Compiling models to C++"], ans: 1, exp: "Jailbreaks exploit prompt loopholes to induce forbidden or harmful behavior." },
      { q: "How do evaluation frameworks (like RAGAS or Promptfoo) ensure prompt changes don't cause regressions?", opts: ["By running automated test suites against a golden dataset with assertions on accuracy and formatting", "By guessing", "By asking users", "By increasing RAM"], ans: 0, exp: "Automated evals score prompts across standardized benchmark test cases." }
    ]
  },

  // 17. Machine Learning Fundamentals
  {
    slug: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Master foundational ML: supervised vs unsupervised algorithms, loss functions, gradient descent, bias-variance tradeoff, cross-validation, and Scikit-Learn.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Distinguish regression, classification, clustering, and dimensionality reduction",
      "Derive Mean Squared Error (MSE) and Cross-Entropy loss functions",
      "Optimize models using Batch, Mini-batch, and Stochastic Gradient Descent (SGD)",
      "Diagnose overfitting vs underfitting using the Bias-Variance tradeoff",
      "Build complete Scikit-Learn pipelines with feature scaling, imputation, and grid search"
    ],
    prerequisites: ["Python Data Analysis", "Linear Algebra and Calculus basics"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "The Machine Learning Paradigm & Problem Taxonomy",
        detail: "Traditional programming (Rules + Data = Answers) vs Machine Learning (Data + Answers = Rules). Supervised (labels), Unsupervised (unlabeled patterns), Reinforcement Learning (reward signals).",
        problem: "Is predicting whether an incoming email is Spam or Ham a regression or classification problem?",
        solution: "Classification (discrete categorical output)."
      },
      {
        title: "Linear & Logistic Regression Under the Hood",
        detail: "Linear regression: y_hat = W^T x + b, MSE loss. Normal equation vs iterative gradient descent. Logistic regression: sigmoid activation sigma(z) = 1 / (1 + e^-z), Binary Cross-Entropy loss.",
        problem: "Why can't we use standard Mean Squared Error (MSE) loss for logistic regression?",
        solution: "Combining MSE with the non-linear sigmoid function produces a non-convex loss surface with many local minima, hindering gradient descent."
      },
      {
        title: "Gradient Descent Optimization & Learning Rates",
        detail: "Gradient vector nabla J(W). Weight update W := W - alpha * nabla J. Learning rate tuning: too small (slow convergence), too large (divergence). SGD vs Mini-batch vs Momentum.",
        problem: "What happens during gradient descent if the learning rate alpha is set too large?",
        solution: "The updates overshoot the minimum, causing the loss to oscillate or diverge to infinity."
      },
      {
        title: "The Bias-Variance Tradeoff & Regularization",
        detail: "High Bias (Underfitting: model too simple). High Variance (Overfitting: model memorizes training noise). L1 Lasso (promotes sparsity) and L2 Ridge (shrinks weights) regularization.",
        problem: "How does L1 Lasso regularization differ from L2 Ridge regularization in feature selection?",
        solution: "L1 Lasso drives non-essential feature weights strictly to zero, performing automated feature selection; L2 shrinks weights close to zero but keeps them non-zero."
      },
      {
        title: "Model Evaluation, ROC-AUC & Scikit-Learn Pipelines",
        detail: "Confusion matrix: Precision, Recall, F1-Score. ROC curve and Area Under Curve (AUC). K-Fold cross validation. Building leak-free Scikit-Learn Pipeline objects with StandardScaler.",
        problem: "Why is Accuracy a dangerously misleading metric for evaluating fraud detection models where only 0.1% of transactions are fraudulent?",
        solution: "A naive model that predicts 'Not Fraud' 100% of the time achieves 99.9% accuracy while catching zero fraudulent transactions."
      }
    ],
    questions: [
      { q: "What is the primary characteristic of Supervised Learning?", opts: ["The algorithm receives unlabelled data", "The training dataset includes input features along with target ground-truth labels", "The model learns solely from environmental rewards", "No data is required"], ans: 1, exp: "Supervised learning maps inputs to known target labels." },
      { q: "What happens when a model suffers from High Variance?", opts: ["It is underfitting and cannot learn the pattern", "It overfits the training data, performing excellently on training but poorly on unseen test data", "It trains instantaneously", "It has zero parameters"], ans: 1, exp: "High variance indicates overfitting to training sample noise." },
      { q: "What activation function maps real numbers to probabilities in range (0, 1) in Logistic Regression?", opts: ["ReLU", "Sigmoid", "Softmax", "LeakyReLU"], ans: 1, exp: "The Sigmoid function sigma(z) = 1/(1+e^-z) maps values to (0, 1)." },
      { q: "What is the effect of L1 (Lasso) regularization on model weights?", opts: ["Drives less important feature weights strictly to zero (sparsity)", "Increases all weights exponentially", "Multiplies weights by 2", "Prevents learning entirely"], ans: 0, exp: "L1 penalty creates sparse models by setting coefficients to zero." },
      { q: "Which metric is the harmonic mean of Precision and Recall?", opts: ["ROC-AUC", "F1-Score", "Mean Squared Error", "Accuracy"], ans: 1, exp: "F1 = 2 * (Precision * Recall) / (Precision + Recall)." },
      { q: "What does K-Fold Cross Validation prevent?", opts: ["Memory leaks", "Evaluation bias from a single lucky or unlucky train/test split", "Compiler warnings", "Code duplication"], ans: 1, exp: "K-Fold evaluates model performance across K distinct partitions for robustness." },
      { q: "In Gradient Descent, what determines the step size taken towards the minimum?", opts: ["The momentum parameter", "The learning rate (alpha)", "The batch size", "The number of CPU cores"], ans: 1, exp: "The learning rate scales the gradient step magnitude." },
      { q: "Which algorithm is an example of Unsupervised Clustering?", opts: ["Linear Regression", "K-Means", "Logistic Regression", "Random Forest Classifier"], ans: 1, exp: "K-Means groups unlabeled data into K geometric clusters." },
      { q: "What does the Area Under the ROC Curve (ROC-AUC) measure?", opts: ["The training speed", "The model's ability to discriminate between positive and negative classes across all classification thresholds", "The memory usage", "The number of trees in a forest"], ans: 1, exp: "ROC-AUC quantifies classification ranking separation across thresholds." },
      { q: "Why should data scaling (e.g. StandardScaler) be fit ONLY on training data, never test data?", opts: ["To prevent data leakage from test data into the model training pipeline", "Because test data is in binary", "To save hard drive space", "It doesn't matter"], ans: 0, exp: "Fitting transformers on test data causes data leakage, artificially inflating validation metrics." }
    ]
  },

  // 18. Deep Learning and Neural Networks
  {
    slug: "deep-learning-neural-networks",
    title: "Deep Learning and Neural Networks",
    description: "Explore neural networks: Perceptrons, Multi-Layer Perceptrons, Backpropagation, CNNs for computer vision, RNNs/LSTMs, and PyTorch tensors.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Implement Multi-Layer Perceptrons (MLPs) using PyTorch tensors and autograd",
      "Derive the Backpropagation algorithm using the calculus chain rule",
      "Apply activation functions: ReLU, Leaky ReLU, Sigmoid, and Softmax",
      "Architect Convolutional Neural Networks (CNNs) with Conv2D, Pooling, and BatchNorm",
      "Understand vanishing gradients and implement Dropout and Residual Connections (ResNet)"
    ],
    prerequisites: ["Machine Learning Fundamentals", "Calculus and Linear Algebra"],
    duration: "22 hours",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Perceptrons & The Multi-Layer Architecture",
        detail: "Biological neuron analogy. Perceptron limitations (XOR problem). Universal Approximation Theorem: a feedforward network with one hidden layer can approximate any continuous function given non-linear activations.",
        problem: "Why couldn't a single-layer perceptron solve the XOR classification problem?",
        solution: "XOR is not linearly separable; it requires at least one hidden layer with non-linear activation to carve non-linear decision boundaries."
      },
      {
        title: "Backpropagation & Computational Graphs",
        detail: "Forward pass -> Loss computation -> Backward pass. Calculating dL/dW using calculus chain rule. PyTorch autograd engine, computational graphs, and loss.backward().",
        problem: "In PyTorch, why must you call optimizer.zero_grad() before each backward() pass?",
        solution: "PyTorch accumulates gradients in .grad buffers by default; failure to zero them causes gradients to sum across training batches."
      },
      {
        title: "Vanishing Gradients & Modern Activations",
        detail: "Why Sigmoid/Tanh cause vanishing gradients in deep networks (derivatives close to zero for large inputs). Rectified Linear Unit (ReLU: f(x) = max(0, x)) and Leaky ReLU. He/Xavier weight initialization.",
        problem: "What is the 'dying ReLU' problem?",
        solution: "When inputs become negative, ReLU's gradient is 0; if a neuron gets stuck outputting negative values, it can never update its weights and permanently dies."
      },
      {
        title: "Convolutional Neural Networks (CNNs)",
        detail: "Local receptive fields, parameter sharing, translation invariance. 2D Convolutions, Kernel filters, Strides, Padding (valid vs same). Max Pooling and Batch Normalization layers.",
        problem: "What is the primary advantage of parameter sharing in CNNs over Fully Connected layers for images?",
        solution: "It drastically reduces parameter count and allows the same visual feature detector (e.g. edge or corner) to be detected anywhere in the image."
      },
      {
        title: "Deep Architectures: ResNet & Skip Connections",
        detail: "Degradation problem in ultra-deep networks (50+ layers). Residual learning: F(x) + x. Skip connections allow gradients to flow directly backwards without attenuation, enabling 100+ layer training.",
        problem: "How do residual skip connections solve the vanishing gradient problem in very deep networks?",
        solution: "They provide an identity shortcut path, so the gradient has an uninterrupted highway (d/dx (F(x) + x) = dF/dx + 1) to propagate back to early layers."
      }
    ],
    questions: [
      { q: "What mathematical rule is the foundation of the Backpropagation algorithm?", opts: ["The Calculus Chain Rule", "Bayes' Theorem", "L'Hopital's Rule", "Pythagoras' Theorem"], ans: 0, exp: "Backpropagation recursively applies the chain rule to compute partial derivatives." },
      { q: "What activation function is defined as f(x) = max(0, x)?", opts: ["Sigmoid", "Tanh", "ReLU (Rectified Linear Unit)", "Softmax"], ans: 2, exp: "ReLU outputs x if positive and 0 otherwise." },
      { q: "What problem do Skip Connections in ResNet architectures solve?", opts: ["Out of memory errors", "The degradation and vanishing gradient problem in deep networks", "Slow internet connections", "Image resizing"], ans: 1, exp: "Skip connections allow identity gradient flow, training networks hundreds of layers deep." },
      { q: "In PyTorch, which method computes gradients of the loss with respect to all model parameters?", opts: ["loss.forward()", "loss.backward()", "optimizer.step()", "model.train()"], ans: 1, exp: "loss.backward() calculates gradients using reverse-mode autodiff." },
      { q: "What layer in a CNN downsamples spatial feature maps while retaining dominant features?", opts: ["Conv2D", "BatchNormalization", "MaxPooling2D", "Dense"], ans: 2, exp: "Pooling downsamples spatial dimensions, providing spatial invariance and reducing parameters." },
      { q: "What regularization technique randomly sets a fraction of neuron activations to zero during training?", opts: ["Batch Normalization", "Dropout", "Gradient Clipping", "Weight Decay"], ans: 1, exp: "Dropout prevents co-adaptation of neurons by zeroing activations randomly during training." },
      { q: "Why is Softmax typically used as the final layer activation in multi-class classification?", opts: ["It accelerates convergence", "It normalizes raw output logits into a valid probability distribution summing to 1.0", "It prevents dead neurons", "It computes cross-entropy"], ans: 1, exp: "Softmax exponentiates and normalizes outputs to sum to 1." },
      { q: "What is the primary benefit of Batch Normalization?", opts: ["It encrypts weights", "It stabilizes and accelerates training by normalizing layer inputs across the mini-batch", "It eliminates the need for activation functions", "It increases model size"], ans: 1, exp: "BatchNorm reduces internal covariate shift and allows higher learning rates." },
      { q: "What optimizer adapts individual learning rates for each parameter using running averages of first and second gradient moments?", opts: ["SGD", "Momentum", "Adam", "Adagrad"], ans: 2, exp: "Adam combines momentum and RMSprop with adaptive per-parameter learning rates." },
      { q: "What type of neural network layer is specifically designed to process sequential data with memory?", opts: ["Linear Layer", "Recurrent / LSTM Layer", "MaxPooling", "Conv2D"], ans: 1, exp: "Recurrent neural networks and LSTMs process sequences with internal hidden state vectors." }
    ]
  },

  // 19. Data Analysis with Python
  {
    slug: "data-analysis-python",
    title: "Data Analysis with Python",
    description: "Master real-world data analysis: Pandas dataframes, NumPy vectorization, data cleaning, datetime manipulations, aggregation, merging, and exploratory data analysis (EDA).",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Perform high-performance vector calculations with NumPy arrays and broadcasting",
      "Manipulate multi-index DataFrames and Series in Pandas",
      "Clean missing data (NaN), deduplicate records, and handle anomalies",
      "Execute groupby aggregations, pivot tables, and relational merges/joins",
      "Perform structured Exploratory Data Analysis (EDA) on messy real-world datasets"
    ],
    prerequisites: ["Python Programming Fundamentals"],
    duration: "18 hours",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "NumPy Vectorization & Memory Layouts",
        detail: "1D, 2D, and ND ndarrays. Data types (dtypes), striding, views vs copies, and broadcasting rules. Boolean masking and fancy indexing.",
        problem: "Why are vectorized NumPy operations 50x-100x faster than standard Python for loops?",
        solution: "NumPy executes operations in compiled C/Fortran code over contiguous memory buffers without Python interpreter overhead."
      },
      {
        title: "Pandas DataFrames: Indexing, Slicing & Filtering",
        detail: "Series vs DataFrames. .loc[] (label-based) vs .iloc[] (integer-position based). Boolean filtering: df[(df['age'] > 18) & (df['city'] == 'Chennai')].",
        problem: "What is the difference between df.loc[0] and df.iloc[0] after sorting a DataFrame?",
        solution: "df.loc[0] retrieves the row with the index label 0; df.iloc[0] retrieves the first row in physical sorted order."
      },
      {
        title: "Data Cleaning, Missing Values & String Methods",
        detail: "Detecting missing values: isna(), dropna(thresh=...), fillna(method='ffill', value=median). Handling text with .str accessor: .str.lower(), .str.extract(regex).",
        problem: "When should you impute missing numerical values with the median rather than the mean?",
        solution: "When the distribution is skewed or contains extreme outliers that would distort the mean."
      },
      {
        title: "Groupby Aggregations, Pivot Tables & Merging",
        detail: "Split-Apply-Combine pattern: df.groupby('category')['sales'].agg(['mean', 'count']). pivot_table(). pd.merge(df1, df2, on='id', how='inner'|'left'|'outer').",
        problem: "In Pandas, what SQL operation corresponds to pd.merge(df1, df2, on='user_id', how='left')?",
        solution: "A LEFT OUTER JOIN on the user_id column."
      },
      {
        title: "Time Series Analysis & Datetime Processing",
        detail: "pd.to_datetime(), setting datetime indexes. Resampling (daily to monthly: df.resample('ME').sum()), rolling window calculations (.rolling(window=7).mean()), and lag shifts.",
        problem: "How do you calculate a 7-day moving average of daily sales in Pandas?",
        solution: "df['sales'].rolling(window=7).mean()."
      }
    ],
    questions: [
      { q: "In Pandas, what method selects rows and columns by integer-location indices?", opts: [".loc[]", ".iloc[]", ".select()", ".index[]"], ans: 1, exp: ".iloc[] uses pure 0-indexed integer positions." },
      { q: "Which function converts a string column into proper datetime objects in Pandas?", opts: ["pd.to_date()", "pd.to_datetime()", "pd.parse_time()", "df.as_date()"], ans: 1, exp: "pd.to_datetime() parses strings into timestamp representations." },
      { q: "What does df.dropna() do by default?", opts: ["Drops all columns", "Drops rows containing any NaN (missing) values", "Fills missing values with 0", "Deletes the dataframe"], ans: 1, exp: "dropna() defaults to dropping any row that contains at least one null value." },
      { q: "What design pattern does the Pandas .groupby() operation implement?", opts: ["Map-Reduce", "Split-Apply-Combine", "Factory pattern", "Observer pattern"], ans: 1, exp: "Groupby splits data into groups, applies aggregation functions, and combines results." },
      { q: "In Pandas, what parameter in pd.merge specifies an outer join?", opts: ["join='full'", "how='outer'", "type='all'", "method='cross'"], ans: 1, exp: "how='outer' keeps all rows from both left and right dataframes." },
      { q: "What NumPy feature allows operations between arrays of different shapes?", opts: ["Dynamic typing", "Broadcasting", "Reshaping", "Interpolation"], ans: 1, exp: "Broadcasting automatically expands compatible dimension sizes." },
      { q: "How do you check for duplicate rows in a Pandas DataFrame?", opts: ["df.is_repeated()", "df.duplicated()", "df.find_copies()", "df.unique()"], ans: 1, exp: "df.duplicated() returns a boolean series identifying duplicate rows." },
      { q: "What does the method df.describe() provide?", opts: ["A written essay", "Summary statistics (count, mean, std, min, percentiles, max) for numeric columns", "Data types only", "A list of column names"], ans: 1, exp: "describe() outputs descriptive summary statistics for numerical series." },
      { q: "What method computes rolling statistics (like 30-day moving averages)?", opts: ["df.moving()", "df.rolling()", "df.sliding()", "df.window()"], ans: 1, exp: "df.rolling(window) creates sliding calculation windows." },
      { q: "Which Pandas accessor provides vectorized string operations on text columns?", opts: [".text", ".str", ".char", ".string"], ans: 1, exp: "The .str accessor exposes string manipulation methods across series elements." }
    ]
  },

  // 20. Data Science and Visualization
  {
    slug: "data-science-visualization",
    title: "Data Science and Visualization",
    description: "Turn data into actionable insights: statistical analysis, hypothesis testing (p-values, t-tests), visual storytelling with Matplotlib/Seaborn, and interactive dashboards.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Formulate null/alternative hypotheses and interpret p-values and confidence intervals",
      "Execute two-sample t-tests, ANOVA, and Chi-Square contingency tests",
      "Create publication-quality charts using Matplotlib object-oriented APIs",
      "Build statistical distribution visualizations using Seaborn (heatmaps, pairplots)",
      "Design effective narrative data stories avoiding misleading visual distortions"
    ],
    prerequisites: ["Data Analysis with Python"],
    duration: "18 hours",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Statistical Foundations: Distributions & Central Limit Theorem",
        detail: "Normal (Gaussian) distribution, standard deviation, empirical rule (68-95-99.7). Central Limit Theorem (CLT): sample means approach normal distribution regardless of population shape given n >= 30.",
        problem: "Why is the Central Limit Theorem critical for parametric statistical testing in data science?",
        solution: "It allows us to use normal-distribution inference tests on sample means even when the underlying data is non-normal."
      },
      {
        title: "Hypothesis Testing: T-Tests, ANOVA & p-Values",
        detail: "Null hypothesis (H0) vs Alternative (H1). Type I error (false positive, alpha) vs Type II error (beta). p-value interpretation (p < 0.05). Independent t-test and One-way ANOVA.",
        problem: "What does a p-value of 0.03 mean in an A/B test?",
        solution: "There is a 3% probability of observing a difference at least this extreme purely by random chance if the null hypothesis were true."
      },
      {
        title: "Matplotlib: The Object-Oriented Interface",
        detail: "Figure vs Axes. fig, ax = plt.subplots(figsize=(10, 6)). Customizing titles, legends, tick formatters, dual y-axes, subplots grids, and exporting vector SVG/PDFs.",
        problem: "Why is Matplotlib's object-oriented interface (fig, ax) preferred over stateful pyplot (plt.plot) in production applications?",
        solution: "It allows explicit, programmatic control over individual axes, subplots, and layouts without relying on global state."
      },
      {
        title: "Advanced Statistical Visualizations with Seaborn",
        detail: "Distribution plots (kdeplot, histplot), categorical plots (boxplot, violinplot), correlation heatmaps with annotated r values, and pairplot grids for multivariate analysis.",
        problem: "What insight does a violin plot provide that a standard box plot obscures?",
        solution: "A violin plot displays the full kernel density distribution, revealing bimodal or multimodal clusters hidden inside standard box plot quartiles."
      },
      {
        title: "Data Storytelling & Avoiding Visual Distortions",
        detail: "Visual ethics: never truncate bar chart y-axes to zero, choose colorblind-accessible palettes (Viridis, ColorBrewer), and reduce chartjunk (Tufte's data-ink ratio).",
        problem: "Why is truncating the y-axis on a bar chart considered a misleading visual distortion?",
        solution: "Bar height visually encodes magnitude; starting above zero exaggerates small differences into seemingly huge changes."
      }
    ],
    questions: [
      { q: "What does the Central Limit Theorem state about sample means for sample size n >= 30?", opts: ["They become uniform", "Their distribution approaches a normal distribution regardless of the population distribution", "They equal zero", "They double in size"], ans: 1, exp: "CLT guarantees normal distribution of sample means for sufficiently large n." },
      { q: "What does a p-value less than alpha (typically 0.05) indicate in hypothesis testing?", opts: ["The test failed to run", "Statistically significant evidence to reject the Null Hypothesis", "The alternative hypothesis is proven 100% false", "Zero error"], ans: 1, exp: "p < 0.05 indicates the observed difference is unlikely due to random chance." },
      { q: "What statistical chart combines a box plot with a kernel density estimate?", opts: ["Scatter plot", "Violin plot", "Bar chart", "Pie chart"], ans: 1, exp: "Violin plots show both summary quartiles and probability density shapes." },
      { q: "In Matplotlib's object-oriented API, what object represents an individual plot area?", opts: ["Figure", "Axes", "Canvas", "Screen"], ans: 1, exp: "The Axes object represents the actual subplot area containing plotted data." },
      { q: "What Seaborn plot shows pairwise bivariate distributions across all numerical columns?", opts: ["heatmap()", "pairplot()", "countplot()", "regplot()"], ans: 1, exp: "pairplot() generates a matrix of scatter plots and histograms for all column pairs." },
      { q: "What is a Type I error in statistical hypothesis testing?", opts: ["A calculation mistake", "False Positive: rejecting a true null hypothesis", "False Negative: failing to reject a false null", "A missing data error"], ans: 1, exp: "Type I error occurs when a true null hypothesis is incorrectly rejected." },
      { q: "Which statistical test compares means across three or more independent groups?", opts: ["Two-sample t-test", "One-way ANOVA (Analysis of Variance)", "Chi-Square goodness of fit", "Simple linear regression"], ans: 1, exp: "ANOVA evaluates whether any group mean differs significantly from the others." },
      { q: "What does Edward Tufte's 'Data-Ink Ratio' recommend?", opts: ["Maximizing non-essential background grid lines", "Maximizing the proportion of ink used to present actual data vs decorative clutter", "Using 3D charts for all data", "Adding colorful logos"], ans: 1, exp: "The data-ink ratio advocates eliminating redundant visual clutter." },
      { q: "What statistical measure quantifies linear correlation between two continuous variables on scale -1 to +1?", opts: ["Standard error", "Pearson Correlation Coefficient (r)", "Median Absolute Deviation", "Variance"], ans: 1, exp: "Pearson's r measures linear relationship strength and direction from -1 to +1." },
      { q: "Why should pie charts generally be avoided when comparing more than 3-4 categories?", opts: ["They don't use colors", "Humans judge linear length (bars) far more accurately than angles and slice areas", "They crash web browsers", "They only accept integers"], ans: 1, exp: "Human perception is notoriously inaccurate at comparing angles and area slices compared to bar lengths." }
    ]
  },

  // 21. Cloud Computing with AWS Fundamentals
  {
    slug: "cloud-computing-aws",
    title: "Cloud Computing with AWS Fundamentals",
    description: "Master enterprise cloud: AWS global infrastructure, IAM permissions, EC2 computing, VPC networking, S3 storage, serverless Lambda, and cost optimization.",
    category: "Cloud & DevOps",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Architect secure AWS Identity and Access Management (IAM) policies with least privilege",
      "Deploy scalable virtual compute instances with Amazon EC2 and Auto Scaling Groups",
      "Design isolated Virtual Private Clouds (VPCs) with public/private subnets and NAT Gateways",
      "Configure S3 bucket policies, versioning, lifecycles, and CloudFront CDN distribution",
      "Build event-driven serverless backends using AWS Lambda and API Gateway"
    ],
    prerequisites: ["Computer Networks and Linux Fundamentals"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "AWS Global Infrastructure & IAM Security",
        detail: "Regions vs Availability Zones (AZs) vs Edge Locations. IAM Users, Groups, Roles, Policies (JSON format). Least Privilege Principle and Multi-Factor Authentication (MFA).",
        problem: "Why should you never use the AWS Root user account for daily administration tasks?",
        solution: "The root user has unrestricted access across billing and infrastructure; compromised root credentials cannot be constrained by IAM policies."
      },
      {
        title: "Amazon EC2 & Elastic Block Store (EBS)",
        detail: "EC2 instance families (compute, memory, storage optimized). Purchasing options: On-Demand, Spot (up to 90% savings), Savings Plans. EBS block storage volumes and snapshots.",
        problem: "What EC2 purchasing model is best suited for fault-tolerant background batch data processing?",
        solution: "Spot Instances, which offer massive discounts with the tradeoff that AWS can reclaim instances with 2-minute warnings."
      },
      {
        title: "Virtual Private Cloud (VPC) Networking Architecture",
        detail: "CIDR blocks (/16), Public vs Private subnets. Route Tables, Internet Gateways (IGW), and NAT Gateways. Security Groups (stateful) vs Network ACLs (stateless).",
        problem: "In which subnet should backend database servers reside, and how do they receive OS security updates?",
        solution: "In a Private Subnet with no public IP, routing outbound internet traffic through a NAT Gateway in the Public Subnet."
      },
      {
        title: "Amazon S3 Storage & CloudFront CDN",
        detail: "Object storage architecture (Buckets, Keys, Metadata). Storage tiers: S3 Standard, S3 Infrequent Access (IA), S3 Glacier. Bucket policies, CORS, and CloudFront edge caching.",
        problem: "How does CloudFront improve website load times for international users?",
        solution: "It caches static assets at Edge Locations globally closest to end users, reducing latency and offloading S3 traffic."
      },
      {
        title: "Serverless Architecture: AWS Lambda & API Gateway",
        detail: "Serverless execution model: pay strictly per execution millisecond, zero server provisioning. Event sources (S3 upload, API Gateway HTTP, DynamoDB stream). Cold starts and concurrency limits.",
        problem: "What is an AWS Lambda cold start?",
        solution: "The latency delay incurred when Lambda provisions a fresh microVM container and initializes runtime code for an idle function."
      }
    ],
    questions: [
      { q: "What is the primary difference between an AWS Region and an Availability Zone (AZ)?", opts: ["Regions are in space", "A Region is a geographic area containing two or more isolated, physically separated Availability Zones connected by low-latency fiber", "They are identical", "AZs are for billing only"], ans: 1, exp: "Regions consist of multiple isolated Availability Zones for high availability." },
      { q: "Which AWS service controls authentication and fine-grained authorization permissions?", opts: ["Amazon EC2", "AWS IAM (Identity and Access Management)", "Amazon S3", "AWS CloudTrail"], ans: 1, exp: "IAM manages identities, roles, and JSON permission policies." },
      { q: "What is the key functional difference between Security Groups and Network ACLs in AWS VPC?", opts: ["Security Groups are stateful; Network ACLs are stateless", "Security Groups are for storage", "NACLs only work with Linux", "There is no difference"], ans: 0, exp: "Security Groups track connection state automatically; NACLs evaluate rules statelessly in both directions." },
      { q: "What device allows instances in a private subnet to connect to the internet while preventing inbound connections?", opts: ["Internet Gateway (IGW)", "NAT Gateway", "Virtual Private Gateway", "Direct Connect"], ans: 1, exp: "A NAT Gateway allows outbound connectivity for private subnet instances while blocking inbound probes." },
      { q: "Which S3 storage class provides the lowest cost for archival data accessed once or twice a year?", opts: ["S3 Standard", "S3 Express", "S3 Glacier / Glacier Deep Archive", "S3 One Zone-IA"], ans: 2, exp: "S3 Glacier Deep Archive offers ultra-low cost storage for long-term data retention." },
      { q: "What pricing model is used for AWS Lambda serverless execution?", opts: ["Fixed monthly rate", "Pay per request count and exact millisecond duration of compute used", "Hourly VM pricing", "Free for everyone"], ans: 1, exp: "Lambda charges per invocation count and execution duration in milliseconds." },
      { q: "What global AWS service caches content at Edge Locations worldwide to accelerate web delivery?", opts: ["Amazon CloudFront", "Amazon Route 53", "AWS Transit Gateway", "AWS Global Accelerator"], ans: 0, exp: "CloudFront is the AWS content delivery network (CDN)." },
      { q: "What security principle recommends granting only the minimum permissions necessary to perform a job?", opts: ["Principle of Defense in Depth", "Principle of Least Privilege", "Separation of Concerns", "Zero Trust Architecture"], ans: 1, exp: "Least privilege ensures entities receive only the minimal authorizations required." },
      { q: "What AWS service automatically adjusts EC2 instance fleet capacity to match fluctuating traffic demands?", opts: ["Auto Scaling Groups", "Elastic Beanstalk", "Elastic Load Balancing", "CloudWatch Alarms"], ans: 0, exp: "Auto Scaling Groups launch or terminate instances according to scaling policies." },
      { q: "What does Amazon Route 53 provide?", opts: ["File storage", "A highly available and scalable Cloud Domain Name System (DNS) web service", "Docker registry", "Email notifications"], ans: 1, exp: "Route 53 is the authoritative AWS managed DNS and domain registration service." }
    ]
  },

  // 22. DevOps, Docker and CI/CD
  {
    slug: "devops-docker-cicd",
    title: "DevOps, Docker and CI/CD",
    description: "Master modern software delivery: Docker containerization, multi-stage builds, docker-compose, GitHub Actions CI/CD pipelines, and Infrastructure as Code.",
    category: "Cloud & DevOps",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Containerize full-stack applications with production multi-stage Dockerfiles",
      "Orchestrate multi-service environments (app, db, redis) using docker-compose",
      "Author GitHub Actions CI/CD workflows with automated linting, testing, and Docker image pushing",
      "Implement zero-downtime deployment strategies (Blue/Green, Rolling, Canary)",
      "Manage environment variables, secrets, and container security vulnerability scanning"
    ],
    prerequisites: ["Full-Stack Web Development", "Git and GitHub"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Docker Architecture & Container Fundamentals",
        detail: "Containers vs Virtual Machines (kernel sharing vs hypervisor). Docker daemon, images, registries, and container runtime (containerd/runc). Layer caching mechanics.",
        problem: "Why are Docker containers significantly faster to start up than traditional Virtual Machines?",
        solution: "Containers do not boot a full guest OS kernel; they are isolated user-space processes sharing the existing host kernel."
      },
      {
        title: "Authoring Optimized Multi-Stage Dockerfiles",
        detail: "Base images (Alpine vs Debian slim). Layer minimization. Multi-stage builds: compile stage with build tools -> lean runtime stage with only production artifacts and node --production.",
        problem: "Why use a multi-stage Dockerfile when building a React or TypeScript application?",
        solution: "It discards heavy build tools, compilers, and node_modules from the final image, producing a tiny, secure production container image."
      },
      {
        title: "Multi-Container Orchestration with Docker Compose",
        detail: "docker-compose.yml specifications: services, networks (bridge isolation), volumes (persistent database data), environment variables, and depends_on health checks.",
        problem: "What happens to data inside a container when the container is deleted if no Docker volume was mounted?",
        solution: "The data is permanently lost because the container's writable storage layer is ephemeral."
      },
      {
        title: "Automated CI/CD with GitHub Actions",
        detail: "Workflows, triggers (on: push, pull_request), runners, jobs, steps. Matrix testing across Node versions. Actions secrets management and automated container registry publishing.",
        problem: "Why should API keys and database credentials never be hardcoded into a GitHub Actions YAML file?",
        solution: "Anyone with repository access can inspect the credentials; use encrypted GitHub Actions Secrets referenced as ${{ secrets.MY_SECRET }}."
      },
      {
        title: "Deployment Strategies: Blue/Green & Canary",
        detail: "Zero-downtime deployment patterns. Rolling updates (gradual replacement). Blue/Green (two identical environments, router switches traffic instantly). Canary releases (routing 5% traffic to test new build before full rollout).",
        problem: "What is the primary advantage of a Blue/Green deployment strategy?",
        solution: "Instant cutover and near-instant rollback to the idle environment if unexpected bugs occur in the new release."
      }
    ],
    questions: [
      { q: "What is the fundamental difference between a Docker image and a Docker container?", opts: ["A container is an image running in a browser", "An image is an immutable template; a container is a live, running instance of an image", "They are identical", "Images run on Windows; containers run on Linux"], ans: 1, exp: "Images are static read-only definitions; containers are dynamic runtime instances." },
      { q: "What is the purpose of multi-stage Docker builds?", opts: ["To run multiple operating systems", "To separate the build environment from the final runtime image, drastically reducing image size and security surface", "To slow down builds", "To compile Python to Java"], ans: 1, exp: "Multi-stage builds leave compilation tools out of the final runtime image." },
      { q: "What Docker instruction defines the default command to execute when a container starts?", opts: ["RUN", "CMD / ENTRYPOINT", "BUILD", "START"], ans: 1, exp: "CMD and ENTRYPOINT configure the default executable command." },
      { q: "In docker-compose.yml, what block defines persistent disk storage that survives container restarts?", opts: ["ports", "volumes", "networks", "secrets"], ans: 1, exp: "Volumes provide persistent host-backed storage decoupled from container lifecycles." },
      { q: "What is Continuous Integration (CI)?", opts: ["Writing documentation", "The automated practice of integrating code changes into a shared repository, verified by automated builds and tests", "Manual server upgrades", "Deleting old git branches"], ans: 1, exp: "CI automatically builds and tests code on every commit to catch bugs early." },
      { q: "In GitHub Actions, where should sensitive API keys and deployment credentials be stored?", opts: ["In the public README.md", "In encrypted GitHub Repository Secrets", "Directly inside the workflow .yml file", "In git commit messages"], ans: 1, exp: "Secrets must be encrypted in repository settings and injected as environment variables." },
      { q: "Which deployment strategy directs a small fraction (e.g. 5%) of live user traffic to a new version to test stability before full rollout?", opts: ["Big Bang", "Canary Deployment", "Recreate", "Manual Deployment"], ans: 1, exp: "Canary deployments expose a small subset of users to test new versions safely." },
      { q: "What does the .dockerignore file accomplish?", opts: ["Stops Docker daemon", "Prevents unwanted files (like node_modules, .git, local .env) from being copied into the build context", "Ignores errors", "Deletes containers"], ans: 1, exp: ".dockerignore excludes unnecessary files from the build context." },
      { q: "What is the difference between the Docker RUN and CMD instructions?", opts: ["RUN executes during image build time creating a layer; CMD executes when the container is launched", "RUN is deprecated", "They are synonyms", "CMD builds images"], ans: 0, exp: "RUN builds the image; CMD defines the runtime entry point." },
      { q: "What tool is commonly used to scan Docker container images for known security vulnerabilities (CVEs)?", opts: ["Trivy / Snyk", "grep", "ping", "npm start"], ans: 0, exp: "Vulnerability scanners like Trivy and Snyk analyze container layers for unpatched CVEs." }
    ]
  },

  // 23. Cybersecurity and Ethical Hacking Fundamentals
  {
    slug: "cybersecurity-ethical-hacking",
    title: "Cybersecurity and Ethical Hacking Fundamentals",
    description: "Understand defensive cybersecurity: CIA triad, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF), penetration testing, cryptography, and network security.",
    category: "Cybersecurity",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Analyze threats using the CIA Triad (Confidentiality, Integrity, Availability)",
      "Identify, exploit, and remediate OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR)",
      "Explain modern cryptography: symmetric (AES), asymmetric (RSA/ECC), and hashing (SHA-256, bcrypt)",
      "Understand network scanning, firewalls, and intrusion detection systems (IDS)",
      "Formulate responsible disclosure and ethical penetration testing scopes"
    ],
    prerequisites: ["Computer Networks and Internet Architecture", "Web Development"],
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "The Security Mindset & The CIA Triad",
        detail: "Confidentiality (encryption, access control), Integrity (digital signatures, checksums), Availability (DDoS mitigation, redundancy). Defense-in-depth and principle of least privilege.",
        problem: "A ransomware attacker encrypts a hospital database so doctors cannot access patient files. Which pillar of the CIA triad is violated?",
        solution: "Availability (authorized users cannot access critical services) and Confidentiality/Integrity."
      },
      {
        title: "OWASP Top 10: SQL Injection & Mitigation",
        detail: "How SQL Injection occurs: string concatenation in SQL queries (SELECT * FROM users WHERE name = '' OR '1'='1'). Remediation: Parameterized queries / Prepared Statements, ORMs, and input validation.",
        problem: "Why are parameterized queries immune to SQL Injection attacks?",
        solution: "Parameters are treated purely as literal data values by the database query engine, never compiled or executed as SQL code."
      },
      {
        title: "Cross-Site Scripting (XSS) & CSRF Attacks",
        detail: "Stored XSS, Reflected XSS, DOM XSS. Stealing session tokens via document.cookie. Defense: Context-aware HTML escaping, Content Security Policy (CSP), and HttpOnly cookies. Cross-Site Request Forgery (CSRF) tokens.",
        problem: "How does setting the 'HttpOnly' flag on a session cookie protect users against XSS attacks?",
        solution: "It prevents client-side JavaScript (including injected malicious scripts) from reading document.cookie."
      },
      {
        title: "Cryptography: Symmetric, Asymmetric & Hashing",
        detail: "Symmetric encryption (AES-256, fast, shared key) vs Asymmetric encryption (RSA, ECC, public/private key pairs). Cryptographic hash functions (SHA-256) vs Password hashing functions (bcrypt, Argon2 with salt).",
        problem: "Why is plain SHA-256 unsuitable for storing user passwords compared to bcrypt or Argon2?",
        solution: "SHA-256 is designed to be extremely fast on GPUs, making it susceptible to brute-force and rainbow table attacks; bcrypt is intentionally slow and salted."
      },
      {
        title: "Ethical Hacking Methodology & Penetration Testing",
        detail: "Reconnaissance (OSINT) -> Scanning (Nmap, Wireshark) -> Exploitation -> Post-exploitation -> Reporting. Legal boundaries: authorization letters, scope of engagement, and responsible disclosure.",
        problem: "What is the crucial legal distinction between an ethical penetration tester and a malicious hacker?",
        solution: "Explicit written authorization and defined legal scope from the system owner prior to testing."
      }
    ],
    questions: [
      { q: "What does the 'CIA Triad' stand for in information security?", opts: ["Central Intelligence Agency", "Confidentiality, Integrity, and Availability", "Control, Isolation, and Authentication", "Certificate, Identification, and Access"], ans: 1, exp: "The three pillars of information security are Confidentiality, Integrity, and Availability." },
      { q: "What is the primary technical defense against SQL Injection vulnerabilities?", opts: ["Client-side regex checking", "Parameterized queries (Prepared Statements)", "Hiding input forms", "Encrypting database hard drives"], ans: 1, exp: "Prepared statements guarantee user input is treated as literal data, never executed SQL code." },
      { q: "What security cookie attribute blocks client-side JavaScript from accessing session tokens?", opts: ["Secure", "HttpOnly", "SameSite", "Path"], ans: 1, exp: "HttpOnly prevents JavaScript from reading the cookie, mitigating credential theft via XSS." },
      { q: "What type of attack injects malicious scripts into web pages viewed by other users?", opts: ["SQL Injection", "Cross-Site Scripting (XSS)", "Denial of Service", "Man-in-the-Middle"], ans: 1, exp: "XSS executes attacker-controlled scripts in a victim's browser session." },
      { q: "Why should passwords be hashed with bcrypt or Argon2 instead of plain SHA-256?", opts: ["They use less memory", "They incorporate salt and configurable computational work factors to resist GPU brute-force attacks", "They are reversible", "They require no database storage"], ans: 1, exp: "Password hashing algorithms are intentionally slow and salted to resist cracking." },
      { q: "In asymmetric public-key cryptography, what key is used to decrypt data encrypted with a public key?", opts: ["The sender's public key", "The recipient's private key", "A symmetric shared key", "Any key"], ans: 1, exp: "Data encrypted with a public key can only be decrypted by the corresponding private key." },
      { q: "What HTTP header restricts which external scripts, images, and fonts a browser is allowed to load?", opts: ["Strict-Transport-Security", "Content-Security-Policy (CSP)", "X-Frame-Options", "Access-Control-Allow-Origin"], ans: 1, exp: "CSP dictates trusted content domains, mitigating XSS and data exfiltration." },
      { q: "What network tool is standard for port scanning and network vulnerability discovery?", opts: ["Nmap", "Wireshark", "Ping", "Traceroute"], ans: 0, exp: "Nmap is the industry-standard network mapping and port scanning utility." },
      { q: "What is an IDOR (Insecure Direct Object Reference) vulnerability?", opts: ["When a server allows a user to access another user's private data simply by altering an ID parameter in the URL or request body", "A database timeout", "An unencrypted hard drive", "A weak password"], ans: 0, exp: "IDOR occurs when an application exposes a reference to an internal object without access control checks." },
      { q: "What is the purpose of 'Salting' a password before hashing?", opts: ["To speed up hashing", "To ensure identical passwords generate completely unique hash digests, defeating precomputed rainbow tables", "To make passwords shorter", "To store plain text"], ans: 1, exp: "Salt ensures identical passwords yield different hashes, neutralizing rainbow tables." }
    ]
  },

  // 24. Building AI-Powered Applications
  {
    slug: "building-ai-applications",
    title: "Building AI-Powered Applications",
    description: "Architect end-to-end AI products: integrating LLM APIs (OpenAI, Anthropic), streaming responses (SSE), vector search, agentic tools, and production deployment.",
    category: "AI & Data Science",
    learningGroup: "After Standard 12 and Above",
    level: "Advanced",
    objectives: [
      "Design production AI architectures connecting React frontends with Express/FastAPI backends",
      "Implement real-time streaming LLM responses using Server-Sent Events (SSE)",
      "Build production RAG pipelines integrating embeddings and vector databases",
      "Develop multi-tool autonomous AI agents with error recovery and guardrails",
      "Deploy scalable, rate-limited, cost-monitored AI services to the cloud"
    ],
    prerequisites: ["Generative AI and LLMs", "Full-Stack Web Development"],
    duration: "24 hours",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    lessons: [
      {
        title: "Full-Stack AI Application Architecture",
        detail: "Client-server division of responsibilities. Never expose LLM API keys on the frontend. Node.js Express backend acting as an authenticated, rate-limited proxy to AI model providers.",
        problem: "Why must API calls to providers like OpenAI or Anthropic be routed through a backend server rather than called directly from React?",
        solution: "Calling AI providers directly from the browser exposes private API keys to anyone inspecting network traffic, enabling unauthorized billing."
      },
      {
        title: "Streaming Responses with Server-Sent Events (SSE)",
        detail: "Why waiting 15 seconds for complete generation creates terrible UX. Server-Sent Events (Content-Type: text/event-stream). ReadableStream API on client to render tokens in real time.",
        problem: "How does token streaming using Server-Sent Events (SSE) reduce Time to First Token (TTFT) for users?",
        solution: "Users see the first token appear in under 500ms and read along as tokens generate, rather than staring at a loading spinner for 10-20 seconds."
      },
      {
        title: "Building an End-to-End RAG Knowledge Assistant",
        detail: "Document ingestion pipeline: PDF/Markdown parsing -> Recursive character text chunking (500 tokens with 50-token overlap) -> Embedding generation -> Vector indexing -> Similarity search query.",
        problem: "Why is chunk overlap (e.g. 50-100 tokens) essential when splitting long documents into passages for vector embeddings?",
        solution: "Chunk overlap preserves sentence context and semantic meaning that would otherwise be severed across arbitrary chunk boundaries."
      },
      {
        title: "Autonomous Agents with Live Tool Execution",
        detail: "Designing agent schemas: Calculator, Database query, Web search, and Email sender tools. Parsing function call requests, executing local code, and feeding observations back into the conversation history.",
        problem: "What prevents an autonomous AI agent from getting stuck in an infinite loop when a tool fails?",
        solution: "A hard maximum iteration cap (e.g. max_steps = 10) and robust error handling that prompts the model to reassess or report a graceful failure."
      },
      {
        title: "Production Monitoring, Cost Control & Token Budgets",
        detail: "Tracking token consumption ($/token economics). Semantic response caching (Redis/GPTCache) to serve identical queries instantly for $0. Rate limiting per user and automated latency alerts.",
        problem: "How does semantic caching dramatically lower operating costs for enterprise AI applications?",
        solution: "It caches frequent query embeddings; when a user asks a semantically similar question, it returns the cached response instantly without incurring LLM API costs."
      }
    ],
    questions: [
      { q: "Why should LLM API provider keys NEVER be placed in client-side React code?", opts: ["React cannot run JavaScript", "Client code is publicly inspectable in the browser, exposing keys to theft and massive unauthorized charges", "They make the website slow", "Vite rejects them"], ans: 1, exp: "Frontend bundles expose secrets to anyone opening browser DevTools." },
      { q: "What protocol and content-type is standard for streaming LLM tokens in real time to web frontends?", opts: ["FTP", "Server-Sent Events (SSE) with 'text/event-stream'", "SMTP", "WebRTC audio only"], ans: 1, exp: "Server-Sent Events with text/event-stream delivers unidirectional token chunks." },
      { q: "What is 'Time to First Token' (TTFT) in generative AI UX?", opts: ["The time it takes to sign up", "The latency elapsed from when the user clicks submit until the very first word appears on screen", "The total training time", "The token cost"], ans: 1, exp: "TTFT measures perceived responsiveness before token streaming begins." },
      { q: "Why is chunk overlap important when preparing documents for vector retrieval (RAG)?", opts: ["To make files bigger", "To ensure critical context and sentences aren't cleanly cut in half across chunk boundaries", "To delete duplicates", "To encrypt text"], ans: 1, exp: "Overlap maintains contextual continuity across chunk splits." },
      { q: "What technique caches and reuses answers to semantically equivalent questions to save LLM API costs?", opts: ["Browser cookies", "Semantic Caching (using vector similarity)", "Hard drive defragmentation", "Code minification"], ans: 1, exp: "Semantic caching stores query embeddings and returns matching previous answers." },
      { q: "What is an AI 'Agent' in modern software engineering?", opts: ["A human sales representative", "An autonomous LLM system equipped with tools and a control loop to take sequential actions toward a goal", "A chatbot that cannot run code", "A CSS stylesheet"], ans: 1, exp: "Agents use LLM reasoning to select and execute tools iteratively." },
      { q: "What safety mechanism must be placed on agent tool-execution loops to prevent runaway costs?", opts: ["A maximum iteration limit (e.g. max_steps = 10)", "Faster GPUs", "Deleting the code", "Larger context windows"], ans: 0, exp: "Maximum step caps ensure loops terminate if tools return unexpected results." },
      { q: "How can an AI app prevent malicious users from draining API budgets through rapid automated requests?", opts: ["By disabling the website", "By implementing IP/User-based Rate Limiting (e.g. express-rate-limit or token buckets)", "By increasing prices", "By using longer prompts"], ans: 1, exp: "Rate limiters cap requests per minute/hour per authenticated user or IP." },
      { q: "What is the role of Vector Databases (e.g. Pinecone, Milvus, Chroma) in AI apps?", opts: ["Storing user passwords", "Indexing and performing fast approximate nearest neighbor (ANN) search over high-dimensional embedding vectors", "Rendering HTML", "Running Node.js servers"], ans: 1, exp: "Vector DBs index and retrieve high-dimensional vectors via nearest-neighbor search." },
      { q: "What does temperature = 0.0 achieve when querying LLMs for code or JSON generation?", opts: ["Zero execution cost", "Maximum deterministic output by greedily selecting the highest probability token at each step", "Random generation", "Faster internet speed"], ans: 1, exp: "Zero temperature makes model generation as deterministic as possible." }
    ]
  }
];
