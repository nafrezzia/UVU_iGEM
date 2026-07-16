# BioBuilder Academy 🧬

A browser-based puzzle game that teaches elementary students (ages 6–11) synthetic biology through hands-on gene engineering challenges.

Students drag-and-drop gene parts onto organisms, run simulations, and see the consequences of their designs — learning real concepts like apoptosis, cross-species gene transfer, and containment thinking along the way.

## Play it

Open `index.html` in any modern browser — no build step, no dependencies, no server required.

```bash
git clone https://github.com/your-org/biobuilder-academy
cd biobuilder-academy
open index.html
```

Or serve it locally:
```bash
npx serve .
# → http://localhost:3000
```

---

## Game worlds & levels

Levels are numbered in the order students play them: all of Ocean Lab, then FarmBot Fields, then Body Defenders, then BioCity.

### 🌊 Ocean Lab (Grades K–2)
| Level | Title | Core concept |
|-------|-------|-------------|
| 1 | Plastic cleanup | Genes as instructions, stop signals |
| 2 | Runaway Microbe | Apoptosis, redundant safety systems |
| 3 | Deep sea cleanup | Multi-gene editing, pressure adaptation |

### 🌾 FarmBot Fields (Grades 2–3)
| Level | Title | Core concept |
|-------|-------|-------------|
| 4 | The drought | Cross-species gene transfer, GMO basics |
| 5 | Pollen patrol | Horizontal gene transfer, ecosystem risk |
| 6 | Nitrogen factory | Symbiosis, gene circuits |

### 🫀 Body Defenders (Grades 3–4)
| Level | Title | Core concept |
|-------|-------|-------------|
| 7 | The virus | Cell signaling, receptor design |
| 8 | Overzealous defender | Autoimmunity, feedback loops |
| 9 | Tiny surgeons | Drug delivery, precision medicine |

### 🏙️ BioCity (Grades 4–5)
| Level | Title | Core concept |
|-------|-------|-------------|
| 10 | Glowing trees | Bioluminescence, gene expression |
| 11 | Brighter city | Gene circuits, biological logic gates |
| 12 | Final mission — design your own | Open-ended engineering, ethics |

---

## NGSS alignment

| Standard | Levels |
|----------|--------|
| LS1.A — Structure and function | 1, 3, 7, 8, 10, 11 |
| LS1.B — Growth and development | 2 |
| LS1.C — Organization for matter and energy | 7, 9 |
| LS3.A — Inheritance of traits | 1, 10 |
| LS3.B — Variation of traits | 4, 6 |
| LS4.B — Natural selection | 4 |
| LS4.C — Adaptation | 3 |
| LS4.D — Biodiversity and humans | 5 |
| LS2.A — Interdependent relationships | 6 |
| ETS1.A — Defining engineering problems | 12 |
| ETS1.B — Developing possible solutions | 2, 8, 9, 11, 12 |
| ETS1.C — Optimizing the solution | 5, 12 |

---

## Project structure

```
biobuilder-academy/
├── index.html              # Entry point, world/level selector & play-through flow
├── assets/
│   └── styles.css          # Global styles & design tokens
├── src/
│   ├── engine.js           # Core game engine, UI builders & level registry
│   ├── levels/
│   │   ├── level1.js       # Ocean Lab — Plastic cleanup (id 1)
│   │   ├── level2.js       # Ocean Lab — Runaway Microbe (id 2)
│   │   ├── level3.js       # FarmBot Fields — The drought (id 4)
│   │   └── levels4-12.js   # Bundled configs for the remaining levels
│   └── data/
│       ├── outcomes.js     # Gene library (GENES), world & level manifest
│       └── progress.js     # Student progress (localStorage)
└── docs/
    └── CONTRIBUTING.md     # How to add new levels
```

> Levels load by their `id`, not by filename — the registry in `engine.js` is the
> source of truth. That's why `level3.js` holds level id 4, and Deep sea cleanup
> (id 3) lives in `levels4-12.js`. The in-game advisor is **Assistant Jon**.

---

## Adding a new level

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md). The short version:

```js
// src/levels/levelN.js
export default {
  id: 13,
  world: 'ocean',
  title: 'My new level',
  grade: '3–4',
  genes: ['detect', 'eat', 'stop', 'myNewGene'],
  slots: 3,
  outcomes: {
    'detect,eat,stop': { score: 90, side: 5, verdict: 'win', msg: '...' },
  },
  zoeIntro: 'Your intro message here...',
  ngss: ['LS1.A'],
};
```

Then register the config so the engine can find it: import it in `src/engine.js`
and include it in the `LEVELS` registry (keyed by `id`), and add a matching entry
to the `levels` manifest in `src/data/outcomes.js`.

---

## Vocabulary taught

`gene` · `organism` · `microbe` · `enzyme` · `stop signal` · `apoptosis` · `containment` · `unintended consequences` · `redundancy` · `cross-species transfer` · `GMO` · `pollination` · `bioluminescence` · `gene expression` · `logic gate` · `symbiosis` · `drug delivery` · `autoimmunity`

---

## Contributing

Pull requests welcome! New levels, translations, accessibility improvements, and teacher guides are especially appreciated. See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## License

MIT — free for classroom, personal, and educational research use.
