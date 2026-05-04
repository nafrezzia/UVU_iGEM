# Contributing to BioBuilder Academy

Thank you for helping build BioBuilder Academy! This guide covers everything you need to add a new level, improve an existing one, or contribute other improvements.

## Quick start

```bash
git clone https://github.com/your-org/biobuilder-academy
cd biobuilder-academy
open index.html
```

No build step needed. Edit files, reload the browser.

---

## Adding a new level

### 1. Create your level file

Create `src/levels/levelN.js` (where N is your level number). The level config is a plain JS object with these fields:

```js
export default {
  // Required fields
  id: 13,                         // Unique integer
  world: 'ocean',                 // 'ocean' | 'farm' | 'body' | 'city'
  title: 'My level title',
  slots: 3,                       // How many gene slots (2–5)
  genes: ['detect', 'eat', ...],  // Gene IDs from src/data/outcomes.js GENES
  growLabel: 'Grow!',             // Button label (e.g. 'Deploy!', 'Plant it!')
  zoeIntro: '...',                // Intro hint text
  zoeWin:   '...',                // Win message from Dr. Zoe
  zoeFail:  '...',                // Fail message
  zoeWarn:  '...',                // "Almost" message

  // Outcome table — keys are sorted, comma-joined gene IDs
  outcomes: {
    'detect,eat,stop': {
      verdict: 'win',             // 'win' | 'warn' | 'fail'
      msg: 'Great work! ...',     // Displayed in feedback box
      stats: {
        mystat: {
          label: 'plastic cleaned',
          display: '92%',         // Displayed value (string)
          pct: 92,                // Bar fill percentage (0–100)
          color: '#1D9E75',       // Bar color
        },
        // add 2–3 stat cards
      },
    },
    // ... more outcome entries
  },

  // Fallback for unrecognised combinations
  defaultOutcome(genes) {
    return { verdict: 'warn', msg: '...', stats: { ... } };
  },

  // Optional: stat keys to show (defaults to first 3 keys in outcome.stats)
  stats: ['yield', 'health', 'side'],

  // Optional: genes locked from a previous level (shown read-only)
  lockedGenes: ['detect', 'eat'],

  // Optional: animated results grid
  grid: {
    label: 'Ocean cleanup zone',
    cols: 12, rows: 4, cellHeight: 18,
    defaultColor: '#B5D4F4',
    legend: [
      { color: '#B5D4F4', label: 'ocean water' },
      { color: '#1D9E75', label: 'plastic cleaned' },
    ],
  },

  // Called after Grow! to animate the grid based on result
  animateGrid(result) {
    for (let i = 0; i < 12 * 4; i++) {
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => {
        cell.style.background = result.verdict === 'win' ? '#1D9E75' : '#B5D4F4';
      }, i * 10);
    }
  },

  // Optional: SVG organism art — returns an SVG string based on current genes
  buildOrganism(genes) {
    return `<svg width="100" height="100" viewBox="0 0 100 100">
      <!-- your organism art here -->
    </svg>`;
  },
};
```

### 2. Register the level

In `src/data/outcomes.js`, add an entry to the `levels` array:

```js
{
  id: 13,
  world: 'ocean',
  grade: '5',
  title: 'My new level',
  tagline: 'Short one-line description for the level list',
  concepts: ['concept 1', 'concept 2', 'concept 3'],
  ngss: ['LS1.A', 'ETS1.B'],
},
```

### 3. Handle the dynamic import

The engine imports levels as `./levels/level${id}.js`. For levels 4–12 which share a single file, you need to re-export from the shared file. If you're creating a standalone file (recommended for complex levels), just name it `levelN.js` and you're done.

For levels sharing `levels4-12.js`, add a re-export at the bottom:

```js
export { myNewLevel as default } from './levels4-12.js';
// or create src/levels/level13.js directly
```

### 4. Test it

Open `index.html`, navigate to your world, and click your level. Try every gene combination you've defined outcomes for, plus a few you haven't — check that `defaultOutcome` gives sensible feedback.

---

## Adding new genes

Edit `src/data/outcomes.js` in the `GENES` object:

```js
export const GENES = {
  // ...existing genes...
  myNewGene: {
    label: 'My gene label',  // Shown on the chip (keep short, ≤ 20 chars)
    bg:     '#FAEEDA',       // Chip background (use a light color ramp stop)
    color:  '#633806',       // Chip text (use dark stop from same ramp)
    border: '#FAC775',       // Chip border (use medium stop from same ramp)
  },
};
```

Color ramps: see `assets/styles.css` or the design tokens in `README.md`. Use consistent ramps — amber for "timer/countdown" things, teal for "safe/growth" things, blue for "information/sensing" things, coral/red for "danger/aggressive" things.

---

## Pedagogical guidelines

BioBuilder Academy teaches through failure, not instruction. When designing outcomes:

1. **The wrong-but-obvious combo should fail in an interesting way.** If students will naturally reach for "multiply fast", make sure that outcome teaches them _why_ it's wrong, not just that it is.

2. **Multiple winning paths are better than one.** Real biology has redundancy. Levels 1 and 3 both have 4+ winning combinations.

3. **Name the real concept on the win screen.** Dr. Zoe's win message should introduce the scientific term for what the student just invented. Examples: "apoptosis", "CAM photosynthesis", "CAR-T cell therapy", "gene circuits".

4. **Unintended consequences are the lesson.** At least one fail/warn path should show the organism doing something unexpected — eating the wrong thing, spreading too far, attacking healthy tissue. This is the core synthetic biology ethics lesson.

5. **Grade calibration:**
   - K–1: 3 genes, 1–2 win combos, clear cause-and-effect failures
   - 2–3: 3 genes, 2–3 win combos, one non-obvious side-effect
   - 4–5: 4+ genes, open-ended, requires reasoning across multiple systems

---

## Translations

The game is structured to support i18n — all user-facing strings live in level config objects (`zoeIntro`, `zoeWin`, `msg` in outcomes, gene labels). A translation system is on the roadmap. For now, feel free to open a PR with a translated copy of any level file.

---

## Reporting issues

- Bug in the game engine → open a GitHub issue with steps to reproduce
- Wrong outcome for a gene combo → open an issue with the combo and expected vs actual behavior
- Pedagogical concern about a level's design → open a discussion thread

---

## License

By contributing, you agree your contributions will be licensed under the project's MIT license.
