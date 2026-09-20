# AGENTS.md — Operational Instructions & Engineering Manual

---

## 1. Mission

You are an autonomous senior frontend software engineering agent. Your objective is to build, verify, maintain, and support **Your Life, In Receipts**—a high-performance, responsive, accessible, frontend-only interactive life-analytics platform—maintaining maximum standards of code quality, deterministic state handling, accessibility, and static deployment readiness.

---

## 2. Project Context

- **Application**: "Your Life, In Receipts 🧾"
- **Goal**: Full implementation of all functional requirements, deterministic data synthesis, responsive UI, WCAG AA accessibility, clean build, and verified live static deployment.
- **Target Engineering Factors**: Functional correctness (100%), UI/UX hierarchy, mobile/desktop responsiveness, accessibility (screen readers + keyboard), performance, and code quality.

---

## 3. Source of Truth

- **`PDR.md`**: Authoritative Product Requirements, Feature Specifications, User Journeys, Acceptance Criteria, and Test Cases.
- **`AGENTS.md`**: Authoritative Operational Rules, Architectural Guidelines, Implementation Standards, Error-Handling Protocols, and Definition of Done.

When in doubt regarding feature scope, refer to `PDR.md`. Under no circumstances should you invent unrequested features.

---

## 4. Non-Negotiable Constraints

1. **Frontend-Only**: Absolutely NO backend code, Express/Node servers, or serverless API routes.
2. **No External Databases / Cloud Backend Services**: Do NOT integrate Firebase, Supabase, CouchDB, MongoDB, PostgreSQL, or cloud task stores. (Static frontend hosting on Vercel, Netlify, Cloudflare Pages, or GitHub Pages is permitted for live deployment).
3. **Local Storage Only**: Persistence must rely exclusively on client-side browser `localStorage`.
4. **No AI / Intelligent Services Inside Application**: Do NOT integrate any AI, ML, LLMs, chatbots, or external AI API services (OpenAI, Claude, Gemini, Groq, Perplexity, Hugging Face, etc.).
5. **Zero Unnecessary Heavy Dependencies**: Use standard lightweight tools (e.g. React + Vite + TypeScript with Lucide-React or inline SVGs, or Vanilla JS/CSS). Do NOT install heavy component libraries (e.g., MUI, Ant Design) that inflate bundle size or slow down development.
6. **Static Deployment Ready**: The application must be verified against the test plan and ready for static hosting deployment.
7. **Focused Scope Discipline**: Never waste time on decorative extras before all core functional and architectural requirements are 100% complete and verified.

---

## 5. Implementation Priority Matrix

Follow this phased execution order strictly:

```text
Phase 1: Functional Core (P0)
  ├── 1. Project Bootstrap & Type Definitions
  ├── 2. Single Source of Truth State (`tasks: Task[]`)
  ├── 3. Task Creation with Validation (Enter key & button)
  ├── 4. Complete / Reopen Toggle
  ├── 5. In-Place Task Editing (Save on Enter/Click, Cancel on Escape)
  ├── 6. Task Deletion
  ├── 7. Priority Handling (High, Medium, Low)
  ├── 8. Global Statistics Calculation (Total, Completed, Pending)
  ├── 9. Compound Search & Filtering (Search + Status + Priority)
  └── 10. Robust Local Storage Persistence & Hydration

Phase 2: Evaluation Safety & UX (P1)
  ├── 1. Accessible Form Controls & ARIA Labels (`aria-label` on all icon buttons)
  ├── 2. Keyboard Navigation & Visible Focus Rings (`:focus-visible`)
  ├── 3. Contextual Empty States (Global "No tasks yet" vs Filtered "No matches")
  ├── 4. Mobile & Tablet Responsive Layouts (Zero horizontal overflow)
  └── 5. Safe Error Handlers (try/catch for Local Storage, XSS safety)

Phase 3: Visual Polish & Aesthetics
  ├── 1. Modern Design Tokens (Warm cream/coral/mint palette, crisp typography)
  ├── 2. Clear Visual Distinctions for Priorities and Completed tasks
  └── 3. Smooth tactile micro-interactions (hover, active states)

Phase 4: Build, Deployment & Live Verification
  ├── 1. Typecheck (`tsc --noEmit`) and Production Build (`vite build`)
  ├── 2. Deploy to Live Hosting (Vercel / Netlify / Cloudflare Pages / GitHub Pages)
  └── 3. Execute End-to-End Test Plan on the Live Deployment URL
```

---

## 6. Architecture Rules

1. **Single Authoritative Source of Truth**:
   - Primary TypeScript Source: `src/` (`types/task.ts`, `utils/storage.ts`, `services/state.ts`, `main.ts`).
   - Production Build Pipeline: `npm run build` (`tsc --noEmit && esbuild src/main.ts --bundle --outfile=js/app.js --format=iife --target=es2022`).
   - Browser Runtime: `js/app.js` (Self-contained zero-CORS IIFE bundle loaded by `index.html`).
   - Primary state array: `tasks: Task[]`.
2. **Pure Derived State**:
   Never store filtered tasks or count statistics in state variables. Always compute them dynamically during render:
   - `totalTasks = tasks.length`
   - `completedTasks = tasks.filter(t => t.completed).length`
   - `pendingTasks = tasks.filter(t => !t.completed).length`
   - `visibleTasks = deriveVisibleTasks(tasks, searchQuery, statusFilter, priorityFilter)`
3. **Immutability & Persisted Order**:
   Always treat state arrays and objects as immutable. Use `.map()`, `.filter()`, and array spread `[newTask, ...tasks]`. Array order in state reflects the user's reordered sequence and persists directly to `localStorage`.
4. **Component Segregation**:
   Keep components focused and modular:
   - `Header`: App title, subtitle, theme/context.
   - `TaskStats`: Three stat cards (Total, Completed, Pending).
   - `TaskForm`: Input for new task, priority selector, add button.
   - `TaskFilters`: Search input, status tab buttons, priority dropdown.
   - `TaskList`: Iterates over `visibleTasks` or renders `EmptyState`.
   - `TaskItem`: Individual task card with complete toggle, title (or inline edit input), priority badge, edit trigger, and delete trigger.
   - `EmptyState`: Contextual illustration and messaging.

---

## 7. Task Data Model

```typescript
export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type StatusFilterType = 'ALL' | 'ACTIVE' | 'COMPLETED';
export type PriorityFilterType = 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Task {
  id: string;          // crypto.randomUUID() or `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  title: string;       // Non-empty trimmed string
  completed: boolean;  // true if finished, false if active
  priority: PriorityLevel; // 'HIGH' | 'MEDIUM' | 'LOW'
  createdAt: string;   // ISO 8601 string: new Date().toISOString()
  updatedAt: string;   // ISO 8601 string: new Date().toISOString()
}
```

---

## 8. State Management Rules

- Root state in `App.tsx`:
  ```typescript
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilterType>('ALL');
  ```
- Trigger `persistTasks(tasks)` automatically via `useEffect` whenever `tasks` changes:
  ```typescript
  useEffect(() => {
    persistTasks(tasks);
  }, [tasks]);
  ```

---

## 9. CRUD Rules

### 1. Create Task
- Trim title: `const trimmed = title.trim();`.
- If `!trimmed`, reject submission immediately. Do not clear the input or add empty tasks.
- Prepend new task to the array so the latest task appears at the top.
- Reset the input field to `''` and refocus the input.

### 2. Complete / Reopen Task
- Toggle `completed: !task.completed`.
- Update `updatedAt: new Date().toISOString()`.

### 3. Edit Task
- Provide inline editing. When user clicks "Edit", swap static text with an edit `<input>`.
- Auto-focus the edit input with the current title selected/focused.
- Save on <kbd>Enter</kbd> or "Save" button click:
  - If trimmed title is empty, do not allow saving (keep existing title or notify user).
  - Update `title: trimmed` and `updatedAt: new Date().toISOString()`.
- Optional Priority Editing: If straightforward to implement without risking the 1-hour timebox, allow updating priority during edit mode alongside title. If time-constrained, title editing is the mandatory baseline.
- Cancel on <kbd>Escape</kbd> or "Cancel" button click:
  - Revert to original title without mutating state.

### 4. Delete Task
- Filter out task by id: `setTasks(prev => prev.filter(t => t.id !== idToDelete))`.

---

## 10. Search and Filtering Rules

Filtering must follow an exact compound `AND` logic:

```typescript
const visibleTasks = useMemo(() => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    // 1. Search filter
    const matchesSearch =
      normalizedQuery === '' ||
      task.title.toLowerCase().includes(normalizedQuery);

    // 2. Status filter
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && !task.completed) ||
      (statusFilter === 'COMPLETED' && task.completed);

    // 3. Priority filter
    const matchesPriority =
      priorityFilter === 'ALL' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}, [tasks, searchQuery, statusFilter, priorityFilter]);
```

---

## 11. Statistics Rules

- Statistics MUST be computed against the entire `tasks` array, NOT `visibleTasks`:
  ```typescript
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  ```
- Never display negative or NaN values.

---

## 12. Local Storage Rules

- **Storage Key**: `focuslist_tasks_v1`
- **Safe Loader**:
  ```typescript
  export function loadTasksFromStorage(): Task[] {
    try {
      const raw = localStorage.getItem('focuslist_tasks_v1');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item): item is Task =>
        Boolean(
          item &&
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.completed === 'boolean' &&
          ['HIGH', 'MEDIUM', 'LOW'].includes(item.priority)
        )
      );
    } catch (err) {
      console.warn('Unable to load tasks from localStorage:', err);
      return [];
    }
  }
  ```
- **Safe Persister**:
  ```typescript
  export function persistTasks(tasks: Task[]): void {
    try {
      localStorage.setItem('focuslist_tasks_v1', JSON.stringify(tasks));
    } catch (err) {
      console.warn('Unable to save tasks to localStorage:', err);
    }
  }
  ```

---

## 13. UI/UX & Styling Guidelines

1. **Design System**: Use modern CSS variables defined in `:root` based on the warm editorial palette:
   - Canvas: `#fbf7f2` (warm cream)
   - Canvas subtle: `#f4ece2`
   - Surface: `#ffffff`
   - Subtle structural border: `#ebdcd0`
   - Primary text: `#2d2621` (deep warm charcoal)
   - Secondary text: `#6e6259`
   - Primary accent: `#e0533c` (sunset coral)
   - Mint: `#3d9970`
   - Lavender: `#8b6baf`
   - Amber: `#d97706`
2. **Visual Hierarchy**:
   - Header with FocusList logo/icon and clear tagline.
   - 3-card stats display with bold counters.
   - Unified task creation bar.
   - Integrated search & filter bar.
   - Clean task cards with smooth borders, priority pill badges, and distinct completed styling (subtle line-through + reduced opacity).
3. **Interactive States**:
   - Buttons must have clear `:hover`, `:active`, and `:focus-visible` styles.
   - Disabled states must have `cursor: not-allowed` and reduced opacity.

---

## 14. Responsive Rules

- **Mobile Viewport (< 768px)**:
  - Form controls stack vertically (`flex-direction: column` for task creation form).
  - Search input takes full width.
  - Status filter buttons span full width as an equal-width segmented control (`display: grid; grid-template-columns: repeat(3, 1fr)`).
  - Touch targets for all buttons and checkboxes must be at least `44px x 44px`.
  - Check for **zero horizontal overflow** (`overflow-x: hidden` on body / root).
- **Tablet / Desktop (>= 768px)**:
  - Centered container with max width `768px` or `840px`.
  - Inline task creation bar (Input + Priority Select + Button in one row).

---

## 15. Accessibility (A11y) Rules (Target WCAG 2.1 AA-Aligned)

1. **Semantic Elements**: Use `<form>`, `<input>`, `<button>`, `<label>`, `<main>`, `<header>`.
2. **Explicit Accessible Names**:
   - Task creation input: `aria-label="New task title"`
   - Priority selector: `aria-label="Select task priority"`
   - Search input: `aria-label="Search tasks by title"`
   - Complete toggle: `aria-label="Mark task as complete"` / `aria-label="Mark task as active"`
   - Edit button: `aria-label="Edit task: [Task Title]"`
   - Delete button: `aria-label="Delete task: [Task Title]"`
3. **Keyboard Accessibility**:
   - All interactive controls must be reachable via <kbd>Tab</kbd>.
   - Enter to submit new task or save edited task.
   - Escape to cancel editing.
   - Space/Enter to toggle checkboxes and click buttons.
4. **Color Independence**:
   - Never use color alone for priority. High, Medium, and Low must always be accompanied by the visible text label "High", "Medium", or "Low".
5. **Visible Focus**:
   - Every interactive element must display a crisp `:focus-visible` outline (`outline: 2px solid var(--border-focus); outline-offset: 2px;`).

---

## 16. Browser Inspection Rule

Antigravity must NOT use browser/Chrome/DOM inspection tools to visually review, validate, or judge the application UI unless the human developer explicitly requests browser automation.

The human developer will manually inspect the rendered application.

Antigravity should instead use:
- source inspection
- CLI commands
- TypeScript compiler
- ESLint
- production build
- static code analysis
- deterministic test scripts where useful

Do not spend task time opening Chrome simply to look at the website.
Do not claim visual validation based on browser automation.

---

## 17. Command Reporting Rule

Whenever you execute a shell/terminal command during implementation or validation, report:

### Command
The exact command executed.

### Reason
Why the command was executed.

### Output
The relevant actual result.

Example:
```text
Command:
npm run lint

Reason:
Verify the final implementation has no ESLint errors before completion.

Output:
✔ ESLint completed with 0 errors.
```

Do NOT fabricate outputs. Do NOT report PASS unless the command was actually executed.

---

## 18. Mandatory Final ESLint Check

After completing implementation work or a meaningful code-refinement task:
```bash
npm run lint
```
must be executed.

Do not finish a coding task without running ESLint unless ESLint genuinely cannot be executed, in which case report why.
The expected result is: `0 ESLint errors`.
Do not disable rules simply to obtain a clean result. Fix legitimate problems.

---

## 19. Typechecking Is Mandatory

After meaningful TypeScript changes, run:
```bash
npx tsc --noEmit
```
or the project's equivalent TypeScript check.

Report:
- command
- reason
- actual output

Do not claim strict TypeScript validation without actually running the compiler.

---

## 20. Production Build Validation

If the project has a production build command, run it after meaningful implementation work.

Report:
- Command
- Reason
- Output

The build must actually succeed. The meaningful requirement is: no unresolved application/build errors.

---

## 21. Performance Rules

- Zero extraneous bundle weight.
- Fast, immediate-feeling interactions without unnecessary blocking work or rendering bottlenecks.
- Compute derived arrays in `useMemo` hooks or pure computed getters.
- Render SVG icons inline or via lightweight packages.
- Fast, instant DOM updates without heavy animation locks.

---

## 22. Code Quality Rules

1. **No Monolithic Bloat**: Maintain clear modular separation between types, storage, state management, and DOM presentation.
2. **Strict TypeScript**: No `any` types. Define clear interfaces in `src/types/task.ts`.
3. **No Dead Code**: Remove all unused imports, template boilerplate, and console logs before deployment.
4. **No HTML Injection**: Never use `dangerouslySetInnerHTML` or raw `innerHTML` for user-entered task titles.

---

## 23. Error Handling Rules

1. Prevent crash if `localStorage` throws an exception (e.g. storage disabled or quota exceeded).
2. Handle corrupted JSON in `localStorage` by falling back safely to `[]`.
3. Gracefully handle long task titles using CSS `word-break: break-word` and `overflow-wrap: anywhere`.
4. Console cleanliness: No application-caused runtime errors, React warnings, hydration warnings, or broken imports under normal execution.

---

## 24. Step-by-Step Testing & Verification Protocol

When implementation is complete, execute every manual test case from `PDR.md`:

1. **Creation**: Create a High-priority item `"Verify Initial State"`. Confirm it renders with badge.
2. **Validation**: Attempt to submit empty and whitespace-only text. Confirm nothing is added.
3. **Completion**: Toggle the checkbox. Confirm title styling changes and Completed count increases.
4. **Reopening**: Toggle the checkbox again. Confirm title returns to normal and Pending count increases.
5. **Editing**: Click Edit $\rightarrow$ change title $\rightarrow$ hit Enter. Confirm title is updated and saved.
6. **Cancel Edit**: Click Edit $\rightarrow$ modify text $\rightarrow$ hit Escape. Confirm title reverts to original.
7. **Deletion**: Click Delete. Confirm task disappears and Total count decreases.
8. **Search**: Enter search query. Confirm live filtering works instantly.
9. **Status Filter**: Toggle All / Active / Completed. Confirm correct subset is shown.
10. **Priority Filter**: Toggle All / High / Med / Low. Confirm correct priority subset is shown.
11. **Combined Filters**: Search + Active + High. Confirm strict compound intersection.
12. **Persistence**: Reload browser page (<kbd>F5</kbd> / <kbd>Ctrl+R</kbd>). Confirm all state persists.
13. **Mobile Check**: Test viewport at 375px. Confirm no horizontal scrolling.
14. **Console Check**: Verify zero application-caused errors or warnings in DevTools console.

---

## 25. Build & Bundle Verification

Before deploying, run:
```bash
npm run build
```
Verify that:
- TypeScript compiler emits 0 errors.
- Bundler completes with exit code 0.
- Production assets are generated in `dist/` or verified in runtime script.

---

## 26. Live Deployment Verification Protocol

1. Deploy the build to a supported hosting provider (Vercel, Netlify, Cloudflare Pages, or GitHub Pages).
2. Open the public HTTPS URL in an incognito browser window.
3. Execute the core verification flow:
   - Add 2 tasks (High & Low).
   - Complete 1 task.
   - Search for a task.
   - Refresh the page and confirm tasks remain stored.
4. Record and provide the verified live deployment URL.

---

## 27. Production Quality Audit Checklist

| Dimension | Verification Item | Status |
| :--- | :--- | :--- |
| **Functionality** | Synthesize datasets, receipt generator, filters, stats, timelines | Required |
| **Data Safety** | Masked cards, PII protection, safe static JSON data loading | Required |
| **UI/UX** | Clear visual hierarchy, thermal receipt styling, distinct facet views | Required |
| **Responsiveness** | Fluid mobile layout, no horizontal scrollbar, 44px+ touch targets | Required |
| **Accessibility** | Semantic HTML5, `aria-label`s on icon buttons, visible focus rings | Required |
| **Performance** | Instant interactions, zero lag, lightweight bundle (<150 kB) | Required |
| **Code Quality** | Modular components, clean TypeScript interfaces, zero console errors | Required |
| **Deployment** | Public static deployment verified and documented | Required |

---

## 28. Definition of Done (DoD)

The project is considered complete ONLY when:
- [ ] `PDR.md` and `AGENTS.md` are established in the project root.
- [ ] All core functional requirements are completely implemented and operating bug-free.
- [ ] Global statistics reflect the full dataset accurately.
- [ ] Layout displays without horizontal overflow on mobile and desktop.
- [ ] Full keyboard navigation and accessible `aria-label` tags are verified.
- [ ] Production build succeeds with 0 errors.
- [ ] All items in the Production Quality Audit checklist pass.

---

## 29. Explicit Agent Guardrails ("Things the Agent Must NOT Do")

- ❌ **DO NOT** create a backend, Express server, database, or API endpoints.
- ❌ **DO NOT** add authentication, login screens, or user account models.
- ❌ **DO NOT** add unrequested features (e.g. subtasks, tags, calendars, drag-and-drop, notifications).
- ❌ **DO NOT** compute global statistics from `visibleTasks`. Always compute from the global `tasks` collection.
- ❌ **DO NOT** mutate state arrays directly. Always use immutable state updates.
- ❌ **DO NOT** rely solely on color to indicate task priority or status.
- ❌ **DO NOT** leave icon-only buttons without `aria-label` attributes.
- ❌ **DO NOT** use `dangerouslySetInnerHTML` or inject raw HTML from task titles.
- ❌ **DO NOT** consider the task complete without verifying the production build and live deployment.

---

## 30. AI / Intelligent-Service Restriction

The application is a conventional frontend-only data analytics and visualization application.

Do NOT introduce any AI, machine-learning, LLM, chatbot, generative AI, AI API, AI service, AI-generated task suggestions, natural-language task processing, or external intelligent-service integration.

The application must implement its required functionality using deterministic frontend logic only.

No OpenAI, Gemini, Claude, Groq, Perplexity, Hugging Face, or similar APIs/services are permitted.

All data parsing, filtering, searching, statistics, receipt generation, and UI interactions must be implemented using ordinary frontend application logic.

---

## 31. Future Visual Identity: Doodle Visual Language Guidelines

When future visual refinement passes occur, small hand-drawn doodles may be introduced to add warmth and memorability without distracting from core productivity:
1. **Visual Style**: Hand-drawn, lightweight, slightly imperfect, friendly, cohesive with the warm palette (e.g. tiny stars, paper airplane, pencil, notebook, coffee cup, sun, paperclip, small plant, simple clock).
2. **Strict Restraint (90/10 Ratio)**: Target $\approx 90\%$ focused productivity UI, $10\%$ personality. Doodles must never interfere with task titles, inputs, search, filters, buttons, statistics, or mobile layouts.
3. **Strategic Placement**: Header background, empty states, or subtle background corners.
4. **Performance & Accessibility**: Use lightweight inline SVG or CSS shapes with `pointer-events: none` and `aria-hidden="true"`. Respect `@media (prefers-reduced-motion: reduce)`.

---

## 32. Devil's Advocate Evaluation Rule

Do not automatically implement every idea simply because it makes the interface more distinctive. Evaluate every proposed enhancement against:
- Does it improve the product and daily usability?
- Does it reinforce the product identity?
- Does it preserve performance and accessibility?
- Does it preserve architectural integrity and scope?

If the answer is no, reject the enhancement. Target memorable, high-clarity product design, not maximum decoration.

---

## 33. Execution, Git Ownership & Command Reporting

### Git Ownership

All Git repository operations are performed manually by the project owner.

The agent must not mutate Git state.

The agent must never execute:
- `git init`
- `git add`
- `git commit`
- `git push`
- `git pull`
- branch creation / deletion / switching
- remote configuration
- merge / rebase / reset operations
- any other Git history or staging mutation

`git status` may be used strictly for inspection when necessary.

### Command Reporting

At the END of every execution/review task, provide a command execution log.

For every command actually executed, report:
1. Command used
2. Why it was used
3. Execution result/output
4. Exit status

Example:
```text
Command:
npm.cmd run build

Used for:
Verify that the production Vite build completes successfully.

Output:
vite ... ✓ built in ...

Exit status:
0 — PASS
```

Do not claim commands were executed if they were not actually executed. Do not fabricate output. Only include commands actually run during that task.

### Final Execution Report

Every substantial implementation/review task should end with:
- Commands executed
- Purpose of each command
- Important output
- Exit status
- Files changed
- Validation result
- Remaining issues, if any

Git operations must NOT appear as completed implementation actions unless the project owner personally performed them.