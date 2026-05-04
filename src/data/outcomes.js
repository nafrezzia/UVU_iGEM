// ── Gene library ─────────────────────────────────────────────────────────────
// Each gene has a display label, color theming, and an icon (inline SVG path).

export const GENES = {
  // Ocean Lab genes
  detect:   { label: 'Detect plastic',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  eat:      { label: 'Break down plastic',  bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  stop:     { label: 'Stop signal',         bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  swim:     { label: 'Swim toward plastic', bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  multiply: { label: 'Multiply fast',       bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  glow:     { label: 'Glow when full',      bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  timer:    { label: '24-hour timer',       bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  counter:  { label: 'Meal counter',        bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  signal:   { label: 'Friend signal',       bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  coldtol:  { label: 'Cold tolerance',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  armor:    { label: 'Tough armor',         bg: '#F1EFE8', color: '#444441', border: '#D3D1C7' },
  boost:    { label: 'Speed boost',         bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },

  // FarmBot genes
  store:    { label: 'Store water',         bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  waxy:     { label: 'Waxy leaf coat',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  spine:    { label: 'Grow spines',         bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  deep:     { label: 'Deep roots',          bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  stomata:  { label: 'Close stomata',       bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  smooth:   { label: 'Smooth flowers',      bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  night:    { label: 'Night breathing',     bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  pollblock:{ label: 'Pollen blocker',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  fragrance:{ label: 'Sweet fragrance',     bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },

  // Body Defenders genes
  recognize:{ label: 'Recognize virus',     bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  attack:   { label: 'Attack command',      bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  selftag:  { label: 'Self-recognition',    bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  brakes:   { label: 'Safety brakes',       bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  memory:   { label: 'Memory gene',         bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  address:  { label: 'Address protein',     bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  payload:  { label: 'Medicine payload',    bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  dissolve: { label: 'Self-dissolve',       bg: '#FAEEDA', color: '#633806', border: '#FAC775' },

  // BioCity genes
  lucifer:  { label: 'Luciferase (glow)',   bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  darksense:{ label: 'Darkness sensor',     bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  release:  { label: 'Timed release',       bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  healthsense:{ label: 'Health sensor',     bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  andgate:  { label: 'AND logic gate',      bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
};


// ── Worlds ────────────────────────────────────────────────────────────────────

export const worlds = {
  ocean: { label: 'Ocean Lab',       icon: '🌊', grade: 'Grades K–2',  color: '#185FA5', bg: '#E6F1FB' },
  farm:  { label: 'FarmBot Fields',  icon: '🌾', grade: 'Grades 2–3',  color: '#3B6D11', bg: '#EAF3DE' },
  body:  { label: 'Body Defenders',  icon: '🫀', grade: 'Grades 3–4',  color: '#993C1D', bg: '#FAECE7' },
  city:  { label: 'BioCity',         icon: '🏙️', grade: 'Grades 4–5',  color: '#854F0B', bg: '#FAEEDA' },
};


// ── Level manifest ────────────────────────────────────────────────────────────
// Lightweight metadata only — full configs live in src/levels/levelN.js

export const levels = [
  {
    id: 1, world: 'ocean', grade: 'K–1',
    title: 'Plastic cleanup',
    tagline: 'Engineer a microbe to eat ocean plastic',
    concepts: ['genes as instructions', 'stop signals', 'design–build–test'],
    ngss: ['LS1.A', 'LS3.A'],
  },
  {
    id: 2, world: 'ocean', grade: '1–2',
    title: 'Runaway Microbe',
    tagline: 'Add a self-destruct timer to stop the spread',
    concepts: ['apoptosis', 'redundant safety', 'containment'],
    ngss: ['LS1.B', 'ETS1.B'],
  },
  {
    id: 3, world: 'farm', grade: '2–3',
    title: 'The drought',
    tagline: 'Give wheat cactus genes to survive dry summers',
    concepts: ['cross-species transfer', 'GMO basics', 'pollination'],
    ngss: ['LS3.B', 'LS4.B'],
  },
  {
    id: 4, world: 'farm', grade: '2–3',
    title: 'Pollen patrol',
    tagline: 'Keep modified genes on the farm',
    concepts: ['horizontal gene transfer', 'ecosystem risk', 'containment'],
    ngss: ['LS4.D', 'ETS1.C'],
  },
  {
    id: 5, world: 'body', grade: '3–4',
    title: 'The virus',
    tagline: 'Program immune cells to recognize a new pathogen',
    concepts: ['cell signaling', 'receptor design', 'immune response'],
    ngss: ['LS1.A', 'LS1.C'],
  },
  {
    id: 6, world: 'body', grade: '3–4',
    title: 'Overzealous defender',
    tagline: 'Stop immune cells attacking healthy tissue',
    concepts: ['autoimmunity', 'target specificity', 'feedback loops'],
    ngss: ['LS1.A', 'ETS1.B'],
  },
  {
    id: 7, world: 'city', grade: '4',
    title: 'Glowing trees',
    tagline: 'Light city streets with firefly bioluminescence',
    concepts: ['bioluminescence', 'gene expression', 'cross-species transfer'],
    ngss: ['LS1.A', 'LS3.A'],
  },
  {
    id: 8, world: 'city', grade: '4',
    title: 'Brighter city',
    tagline: 'Chain two genes together as a logic gate',
    concepts: ['gene circuits', 'logic gates', 'multi-gene design'],
    ngss: ['LS1.A', 'ETS1.B'],
  },
  {
    id: 9, world: 'ocean', grade: '4–5',
    title: 'Deep sea cleanup',
    tagline: 'Redesign the microbe for cold, high-pressure depths',
    concepts: ['protein folding', 'environmental adaptation', 'multi-gene'],
    ngss: ['LS4.C', 'LS1.A'],
  },
  {
    id: 10, world: 'body', grade: '4–5',
    title: 'Tiny surgeons',
    tagline: 'Guide a cell to deliver medicine to one exact spot',
    concepts: ['drug delivery', 'address proteins', 'precision medicine'],
    ngss: ['LS1.C', 'ETS1.B'],
  },
  {
    id: 11, world: 'farm', grade: '5',
    title: 'Nitrogen factory',
    tagline: 'Engineer a root bacterium to feed crops naturally',
    concepts: ['symbiosis', 'nitrogen fixation', 'gene circuits'],
    ngss: ['LS2.A', 'LS3.B'],
  },
  {
    id: 12, world: 'city', grade: '5',
    title: 'Final mission — design your own',
    tagline: 'Identify a problem and build a solution from scratch',
    concepts: ['open-ended design', 'ethics', 'full engineering loop'],
    ngss: ['ETS1.A', 'ETS1.B', 'ETS1.C'],
  },
];
