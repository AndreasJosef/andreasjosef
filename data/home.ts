// Version 1: "Explorations" (Base)
const v1 = {
  greeting: {
    start: "Hi,",
    name: "I’m Andreas." 
  },
  intro: "Welcome to my attempt at making sense of things.",
  headline: "Explorations in software, systems, and ideas.",
  studio: {
    label: "Studio",
    description: "I build software systems to solve problems over",
    highlight: "@Field Logic." 
  },
  notes: {
    label: "Notes",
    description: "Here I publish reflections on living and learning."
  },
  footer: "One person's effort"
};

// Version 2: "Digital Home" (Current)
const v2 = {
  ...v1, 
  intro: "Welcome to my digital home.",
  headline: "A personal collection of software, systems, and ideas.", 
};

// --- Export Configuration ---
export const content = v2;