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

### 🌊 Ocean Lab (Grades K–2)
| Level | Title | Core concept |
|-------|-------|-------------|
| 1 | Plastic cleanup | Genes as instructions, stop signals |
| 2 | Runaway Microbe | Apoptosis, redundant safety systems |
| 9 | Deep sea cleanup | Multi-gene editing, pressure adaptation |

### 🌾 FarmBot Fields (Grades 2–3)
| Level | Title | Core concept |
|-------|-------|-------------|
| 3 | The drought | Cross-species gene transfer, GMO basics |
| 4 | Pollen patrol | Horizontal gene transfer, ecosystem risk |
| 11 | Nitrogen factory | Symbiosis, gene circuits |

### 🫀 Body Defenders (Grades 3–4)
| Level | Title | Core concept |
|-------|-------|-------------|
| 5 | The virus | Cell signaling, receptor design |
| 6 | Overzealous defender | Autoimmunity, feedback loops |
| 10 | Tiny surgeons | Drug delivery, precision medicine |

### 🏙️ BioCity (Grades 4–5)
| Level | Title | Core concept |
|-------|-------|-------------|
| 7 | Glowing trees | Bioluminescence, gene expression |
| 8 | Brighter city | Gene circuits, biological logic gates |
| 12 | Final mission — design your own | Open-ended engineering, ethics |

---

## NGSS alignment

| Standard | Levels |
|----------|--------|
| LS1.A — Structure and function | 1, 2, 5, 7, 8 |
| LS1.B — Growth and development | 2 |
| LS1.C — Organization for matter and energy | 5, 10 |
| LS3.A — Inheritance of traits | 1 |
| LS3.B — Variation of traits | 3, 11 |
| LS4.B — Natural selection | 3 |
| LS4.C — Adaptation | 9 |
| LS4.D — Biodiversity and humans | 4 |
| LS2.A — Interdependent relationships | 11 |
| ETS1.A — Defining engineering problems | 12 |
| ETS1.B — Developing possible solutions | 2, 6, 8, 10, 12 |
| ETS1.C — Optimizing the solution | 4, 12 |

---

## Project structure

```
biobuilder-academy/
├── index.html              # Entry point & world selector
├── assets/
│   └── styles.css          # Global styles & design tokens
├── src/
│   ├── engine.js           # Core game engine
│   ├── components/
│   │   ├── GeneChip.js     # Gene chip UI component
│   │   ├── SlotBoard.js    # Gene slot board
│   │   ├── FieldGrid.js    # Animated results grid
│   │   └── ZoeAdvisor.js   # Dr. Zoe hint system
│   ├── levels/
│   │   ├── level1.js       # Ocean Lab — plastic cleanup
│   │   ├── level2.js       # Runaway Microbe
│   │   ├── level3.js       # FarmBot Fields — the drought
│   │   └── levels4-12.js   # Stub configs for remaining levels
│   └── data/
│       ├── genes.js        # Gene library definitions
│       ├── outcomes.js     # Outcome lookup tables
│       └── progress.js     # Student progress (localStorage)
└── docs/
    ├── CONTRIBUTING.md     # How to add new levels
    ├── PEDAGOGY.md         # Design rationale & learning theory
    └── TEACHER_GUIDE.md    # Classroom usage & discussion prompts
```

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

---

## Vocabulary taught

`gene` · `organism` · `microbe` · `enzyme` · `stop signal` · `apoptosis` · `containment` · `unintended consequences` · `redundancy` · `cross-species transfer` · `GMO` · `pollination` · `bioluminescence` · `gene expression` · `logic gate` · `symbiosis` · `drug delivery` · `autoimmunity`

---

## Contributing

Pull requests welcome! New levels, translations, accessibility improvements, and teacher guides are especially appreciated. See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## License

MIT — free for classroom, personal, and educational research use.
