# SPEC-001: Notes Content Architecture

## 1. Context

> **The Bet:** Migrating manual content to the Astro 5 Content Layer removes the constraint of "Hardcoded Fragility." By formalizing "Notes" as a typed data collection, we enable scalable writing without touching the codebase.
> **Root Value:** **The Archive.** This mechanism serves as the persistent memory of the Notes writing system.

## 2. The Language

> **The Problem:** Currently, the "Notes" exist only as static links or hypothetical concepts. There is no pipeline to ingest raw thoughts (Markdown) and transform them into structured System artifacts.
> **The New Reality:** The System acts as a **Digital Printing Press**. I deposit a raw "Note" file into the ingest folder, and the System automatically validates, indexes, and renders it as a navigable page. If a Note is marked `draft`, it remains invisible to the public.

## 3. The Physics (Nouns & Types)

> We define the Schema as the Law. Content that does not adhere to this shape will be rejected by the compiler.

```typescript
import { z } from 'astro:content';

// 1. The Schema (The Shape of Truth)
// This defines the "Frontmatter" contract for every Note.
export const NoteSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(), // Enforces standard Date objects
  draft: z.boolean().default(false), // Defaults to visible if unspecified
});

// 2. The Type (The Inferred Contract)
// The Agent does not need to manually write this interface; 
// Astro infers it, but we define it here for mental clarity.
export type NoteEntry = z.infer<typeof NoteSchema>;

// 3. The File Structure (The Physical Storage)
// src/content.config.ts  <-- The Registry
// src/content/notes/*.md <-- The Raw Data
```

## 4. The Build Plan

> **Target Environment:** Astro 5 (Content Layer API)
> **Genesis Sequence:** Kernel  Engine  Mirror

### Step 1: The Kernel (Configuration)

**File:** `src/content.config.ts` (Note: Astro 5 specific)

* **Action:** Import `glob` loader and `defineCollection`.
* **Logic:** Register the `notes` collection using the `NoteSchema`.
* **Constraint:** Use the `glob` loader pattern: `pattern: "**/*.{md,mdx}"`.

### Step 2: The Engine (Data Ingest)

**File:** `src/content/notes/hello-world.md`

* **Action:** Create a seed file to initialize the collection.
* **Logic:** Must contain valid frontmatter matching the Schema.

### Step 3: The Mirror (The Index View)

**File:** `src/pages/notes/index.astro`

* **Action:** Query the collection using `getCollection`.
* **Logic (Filter):** If `import.meta.env.PROD` is true, filter out `data.draft === true`.
* **Logic (Sort):** Sort by `publishedAt` (Descending/Newest First).
* **UI:** Render the list of notes as cards (reuse the mobile card styling defined in `index.astro`).

### Step 4: The Mirror (The Detail View)

**File:** `src/pages/notes/[...slug].astro`

* **Action:** Use `getStaticPaths` to generate routes for every note.
* **Action:** Use `render(note)` to retrieve the `<Content />` component.
* **UI:** Render the Prose content. Ensure a "Back" link exists to return to the Index.

## 5. The Truth Test

> Verification of the Constraint Removal.

**Test A: The Strictness Check**

1. **Input:** Create a note `fail.md` inside `src/content/notes/` **without** a `publishedAt` date.
2. **Output:** The Build MUST fail with a Zod validation error.

**Test B: The Visibility Check**

1. **Input:** Create a note `secret.md` with `draft: true`.
2. **Input:** Run `npm run build` (Production Mode).
3. **Output:** The file `dist/notes/secret/index.html` MUST NOT exist.

**Test C: The Rendering Check**

1. **Input:** Navigate to `/notes`.
2. **Output:** Click on "Hello World". The URL changes to `/notes/hello-world`, and the Markdown content is visible.
