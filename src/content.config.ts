import { defineCollection, z } from 'astro:content';

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

// 3. The Collection Registry
export const collections = {
  notes: defineCollection({
    type: 'content',
    schema: NoteSchema,
  }),
};