import type { Workflow } from "@/types/workflow";

export const sampleWorkflows: Workflow[] = [
  {
    id: "wf-study-guide-messy-notes",
    title: "Turn messy class notes into a structured study guide",
    slug: "turn-messy-class-notes-into-study-guide",
    description:
      "Organize rough lecture notes into a clean study guide with key concepts, definitions, likely exam topics, and practice questions.",
    problemSolved:
      "Students often have incomplete or scattered notes and need a reliable way to study without letting AI invent missing course content.",
    category: "Study",
    audience: "student",
    platformTestedOn: "ChatGPT",
    difficulty: "beginner",
    categoryRisk: "low",
    contextSetup:
      "Gather your raw class notes, the course/topic name, any professor-provided learning objectives, and the upcoming quiz or exam format. Tell the AI to preserve uncertainty and mark anything that is unclear instead of filling gaps with guesses.",
    exampleInput:
      "Course: Intro Psychology. Topic: Memory. Notes: sensory memory short, working memory 7-ish items, encoding storage retrieval, Ebbinghaus forgetting curve, mnemonics, chunking, long-term memory maybe explicit implicit, hippocampus mentioned, exam has short answer and multiple choice.",
    exampleOutput:
      "Study Guide: Memory. Key terms: encoding, storage, retrieval, sensory memory, working memory, long-term memory, explicit memory, implicit memory, hippocampus, chunking, mnemonic. Main ideas: memory is commonly described as a process of encoding information, storing it, and retrieving it later. Areas to clarify from class materials: exact working-memory capacity your instructor expects and the role of the hippocampus in your lecture. Practice questions: 1. Explain encoding, storage, and retrieval in your own words. 2. Give one example of chunking. 3. Why does the forgetting curve matter for study planning?",
    learningSafeMode: "learning-safe",
    freshnessStatus: "current",
    lastVerifiedAt: "2026-06-21",
    isVerified: true,
    status: "approved",
    steps: [
      {
        id: "study-guide-step-1",
        stepNumber: 1,
        title: "Organize the raw notes",
        goal: "Turn scattered notes into a topic outline without adding unsupported facts.",
        promptText:
          "You are helping me study from my own class notes. Organize the notes below into a structured outline. Keep the original meaning, group related ideas, and add a section called 'Unclear or Missing' for anything that seems incomplete. Do not invent facts that are not supported by the notes.\n\nCourse/topic:\n[course and topic]\n\nRaw notes:\n[paste notes]",
        exampleOutput:
          "1. Memory process: encoding, storage, retrieval. 2. Memory systems: sensory memory, working memory, long-term memory. Unclear or Missing: exact working-memory capacity expected by the instructor.",
      },
      {
        id: "study-guide-step-2",
        stepNumber: 2,
        title: "Create the study guide",
        goal: "Convert the outline into study material the student can review.",
        promptText:
          "Using the outline below, create a study guide with these sections: key terms, main ideas, examples from the notes, likely quiz questions, and what I should verify in my textbook or slides. Keep it concise and mark uncertain items clearly.\n\nOutline:\n[paste organized outline]",
        exampleOutput:
          "Key terms: encoding, storage, retrieval, chunking. Likely quiz questions: define working memory; explain how mnemonics support retrieval. Verify: exact capacity of working memory from slides.",
      },
      {
        id: "study-guide-step-3",
        stepNumber: 3,
        title: "Generate practice questions",
        goal: "Add active recall without asking AI to complete graded work.",
        promptText:
          "Create 8 practice questions from this study guide: 4 short-answer, 3 multiple-choice, and 1 compare-and-contrast question. Put answers after the questions in a separate answer key. Base everything only on the guide.\n\nStudy guide:\n[paste study guide]",
        exampleOutput:
          "Short answer: What are the three basic memory processes? Answer: encoding, storage, and retrieval.",
      },
    ],
    qualityChecklist: [
      "Keeps unsupported or unclear information in a separate uncertainty section.",
      "Uses the student's own notes as the source material.",
      "Includes active-recall questions with an answer key.",
      "Avoids writing or completing graded assignments for the student.",
    ],
  },
  {
    id: "wf-strengthen-essay-argument",
    title: "Strengthen a weak essay argument without rewriting it",
    slug: "strengthen-weak-essay-argument-without-rewriting",
    description:
      "Get targeted feedback on thesis clarity, reasoning, evidence, and counterarguments while keeping the student's own writing intact.",
    problemSolved:
      "Students need help improving an essay's argument without having AI rewrite the essay or replace their voice.",
    category: "Writing",
    audience: "student",
    platformTestedOn: "ChatGPT",
    difficulty: "intermediate",
    categoryRisk: "medium",
    contextSetup:
      "Prepare your assignment prompt, current thesis, one body paragraph or outline, grading rubric if available, and the kind of feedback you want. Tell the AI not to rewrite sentences for submission and to focus on questions, diagnosis, and revision options.",
    exampleInput:
      "Assignment: argue whether school uniforms should be required. Thesis: uniforms are good because they make school better. Body point: students will not compare clothes. Evidence: my school had spirit wear days and people cared less about brands. Rubric values clear claim and evidence.",
    exampleOutput:
      "Argument diagnosis: The thesis has a clear position but is too broad. Stronger direction: specify the reason and scope, such as reducing visible status competition. Evidence gap: the spirit wear example is useful but needs explanation of how it supports the claim. Revision options: 1. Narrow the thesis around social comparison. 2. Add a sentence explaining why reduced brand comparison improves the learning environment. 3. Consider a counterargument about student expression.",
    learningSafeMode: "needs-caution",
    freshnessStatus: "current",
    lastVerifiedAt: "2026-06-21",
    isVerified: true,
    status: "approved",
    steps: [
      {
        id: "essay-argument-step-1",
        stepNumber: 1,
        title: "Diagnose the argument",
        goal: "Identify what is weak without rewriting the essay.",
        promptText:
          "Act as a writing tutor. Review my essay argument for clarity, reasoning, and evidence, but do not rewrite my essay or provide submission-ready paragraphs. Give feedback as diagnosis, questions, and revision options.\n\nAssignment prompt:\n[paste prompt]\n\nRubric or teacher expectations:\n[paste rubric]\n\nCurrent thesis and outline or paragraph:\n[paste draft]",
        exampleOutput:
          "Diagnosis: Your claim is understandable but too general. Question to answer: What specific effect of uniforms matters most: cost, focus, belonging, or social pressure?",
      },
      {
        id: "essay-argument-step-2",
        stepNumber: 2,
        title: "Pressure-test the evidence",
        goal: "Check whether each example actually supports the claim.",
        promptText:
          "Make a two-column table. In column one, list each claim or reason from my draft. In column two, explain whether my evidence supports it, partially supports it, or does not support it yet. For weak evidence, suggest what kind of source, example, or explanation I should look for. Do not invent citations.\n\nDraft material:\n[paste draft material]",
        exampleOutput:
          "Claim: uniforms reduce social comparison. Evidence fit: partially supports it. Why: the spirit wear example is personal and relevant, but it needs a clearer link to everyday uniform rules.",
      },
      {
        id: "essay-argument-step-3",
        stepNumber: 3,
        title: "Plan the revision",
        goal: "Create a revision checklist the student can apply in their own words.",
        promptText:
          "Create a revision checklist for improving this argument. Phrase each item as an action I can take myself. Include thesis, topic sentences, evidence, reasoning, counterargument, and rubric alignment. Do not write the revised essay for me.\n\nFeedback so far:\n[paste feedback]",
        exampleOutput:
          "Revision checklist: 1. Make the thesis name the specific benefit you will defend. 2. Add one sentence after each example explaining how it proves the claim. 3. Add a counterargument about self-expression.",
      },
    ],
    qualityChecklist: [
      "Provides tutoring-style feedback rather than rewritten essay text.",
      "Flags missing evidence and avoids fake citations.",
      "Keeps the student's voice and responsibility for revision intact.",
      "Connects recommendations to the assignment prompt or rubric.",
    ],
  },
  {
    id: "wf-app-idea-build-plan",
    title: "Turn a vague app idea into a concrete build plan",
    slug: "turn-vague-app-idea-into-build-plan",
    description:
      "Clarify an early app idea into users, core problem, MVP scope, data needs, screens, milestones, and open risks.",
    problemSolved:
      "Builders often jump from a loose idea into coding before defining the smallest useful product and the decisions that matter first.",
    category: "Building",
    audience: "builder",
    platformTestedOn: "ChatGPT",
    difficulty: "intermediate",
    categoryRisk: "high",
    contextSetup:
      "Write a short description of the idea, target users, what the first version should accomplish, available time, technical constraints, and anything explicitly out of scope. Ask the AI to separate MVP requirements from later ideas and to call out assumptions.",
    exampleInput:
      "Idea: an app that helps college clubs coordinate events. Users: club officers. Problem: details are scattered across chats and docs. First version should help plan an event checklist and assign owners. Time: two weekends. Tech: Next.js. Out of scope: payments, campus-wide discovery, mobile app.",
    exampleOutput:
      "Build Plan: User: club officer planning a single event. MVP problem: keep event tasks, owners, and due dates in one place. Core screens: event list, event detail, task editor. Data objects: Event, Task, Member. Two-weekend milestone: Weekend 1 build local CRUD and seed sample data; Weekend 2 add polish, empty states, and deploy. Later: notifications, calendar sync, public event pages. Risks: owner assignment may need auth; postpone or fake with typed names for MVP.",
    learningSafeMode: "learning-safe",
    freshnessStatus: "current",
    lastVerifiedAt: "2026-06-21",
    isVerified: true,
    status: "approved",
    steps: [
      {
        id: "build-plan-step-1",
        stepNumber: 1,
        title: "Clarify the product shape",
        goal: "Convert a vague idea into a concrete problem, user, and MVP boundary.",
        promptText:
          "Act as a practical product planning partner. Turn my app idea into a clear product brief. Separate confirmed details from assumptions. Include target user, problem, job-to-be-done, MVP outcome, non-goals, and open questions.\n\nIdea:\n[paste idea]\n\nConstraints:\n[paste time, tools, skills, or scope limits]",
        exampleOutput:
          "Target user: club officer. MVP outcome: create one event plan with tasks and owners. Non-goals: payments, discovery, mobile app.",
      },
      {
        id: "build-plan-step-2",
        stepNumber: 2,
        title: "Define features and data",
        goal: "List the minimum screens, objects, and actions needed for a first build.",
        promptText:
          "Using the product brief, create an MVP build plan with: core user stories, screens, data objects, key fields, and actions. Label each item as must-have, should-have, or later. Keep the first version small enough for the constraints.\n\nProduct brief:\n[paste brief]",
        exampleOutput:
          "Must-have screen: event detail. Must-have object: Task with title, ownerName, dueDate, status. Later: calendar sync.",
      },
      {
        id: "build-plan-step-3",
        stepNumber: 3,
        title: "Create the implementation sequence",
        goal: "Turn the plan into ordered development milestones.",
        promptText:
          "Turn this MVP plan into an implementation sequence. Include milestones, first files or modules to create, test/demo checkpoints, risks, and decisions to postpone. Do not add features outside the MVP.\n\nMVP build plan:\n[paste plan]",
        exampleOutput:
          "Milestone 1: define mock data and types. Milestone 2: build event list and detail views. Checkpoint: demo creating and completing a task with sample data.",
      },
    ],
    qualityChecklist: [
      "Separates MVP must-haves from later ideas.",
      "Calls out assumptions and unresolved product decisions.",
      "Includes concrete screens, data objects, and implementation milestones.",
      "Avoids adding auth, payments, notifications, or integrations unless explicitly in scope.",
    ],
  },
];
