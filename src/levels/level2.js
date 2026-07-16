// ── Level 2: Runaway Microbe ──────────────────────────────────────────────────

export default {
  id: 2,
  world: 'ocean',
  title: 'Runaway Microbe',
  organismLabel: 'Upgrade your microbe',
  slots: 2,
  growLabel: 'Test it!',

  genes: ['timer', 'counter', 'signal', 'coldtol', 'armor', 'boost'],

  lockedGenes: ['detect', 'eat', 'stop'],

  zoeIntro: 'Great work last time! But your microbes are spreading to places they shouldn\'t be. Add 2 new genes to contain them — but be careful what you pick!',
  zoeWin:   'You did it! You just learned what real scientists call apoptosis — programmed cell death. It\'s one of the most important safety tools in synthetic biology!',
  zoeFail:  'The microbes escaped everywhere! Think about what could make them stop completely.',
  zoeWarn:  'Getting closer! You need TWO different kinds of stopping — one for time, one for quantity.',

  grid: {
    label: 'Ocean map — microbe spread (24 hours)',
    cols: 12, rows: 4, cellHeight: 18,
    defaultColor: '#B5D4F4',
    legend: [
      { color: '#B5D4F4', label: 'clean ocean' },
      { color: '#1D9E75', label: 'plastic cleaned' },
      { color: '#E24B4A', label: 'microbe escaped' },
    ],
  },

  animateGrid(result) {
    const total = 12 * 4;
    for (let i = 0; i < total; i++) {
      const col = i % 12;
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => {
        if (result.spread === 'contained') {
          cell.style.background = col < 8 ? '#1D9E75' : '#B5D4F4';
        } else if (result.spread === 'full') {
          cell.style.background = col < 7 ? '#1D9E75' : '#E24B4A';
        } else {
          cell.style.background = col < 8 ? '#1D9E75' : (col < 10 ? '#E24B4A' : '#B5D4F4');
        }
      }, i * 10);
    }
  },

  buildOrganism(genes) {
    const hasTimer = genes.includes('timer');
    const hasArmor = genes.includes('armor');
    const fill = hasArmor ? '#D3D1C7' : '#E1F5EE';
    const stroke = hasArmor ? '#888780' : '#5DCAA5';
    const clockHand = hasTimer
      ? '<path d="M50 44 L50 50 L54 53" stroke="#854F0B" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="50" cy="50" r="7" fill="none" stroke="#FAC775" stroke-width="1.2"/>'
      : '';
    return `<svg width="100" height="100" viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="32" ry="26" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
      <circle cx="42" cy="46" r="4" fill="${hasArmor ? '#B4B2A9' : '#9FE1CB'}"/>
      <circle cx="55" cy="46" r="4" fill="${hasArmor ? '#B4B2A9' : '#9FE1CB'}"/>
      ${clockHand}
      <path d="M44 56 Q50 59 56 56" stroke="#085041" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <text x="50" y="90" text-anchor="middle" font-size="10" fill="#0F6E56" font-weight="500">${genes.length}/2 new genes</text>
    </svg>`;
  },

  stats: ['cleaned', 'contained', 'escaped'],

  outcomes: {
    'counter,timer': {
      verdict: 'win', spread: 'contained',
      msg: 'Brilliant! The timer tells the microbe when to shut down, and the meal counter stops it once it\'s eaten enough. The ocean stays clean and the microbes stay where they belong!',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '88%', pct: 88, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '97%', pct: 97, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '2',   pct: 2,  color: '#E24B4A' },
      },
    },
    'signal,timer': {
      verdict: 'warn', spread: 'partial',
      msg: 'The friend signal slows them near each other, but doesn\'t stop them completely. Some still wandered off. Try a meal counter instead of the friend signal.',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '80%', pct: 80, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '85%', pct: 85, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '12',  pct: 30, color: '#E24B4A' },
      },
    },
    'boost,timer': {
      verdict: 'warn', spread: 'full',
      msg: 'The timer worked, but speed boost made them spread so far in 24 hours the damage was already done! Try swapping boost for a meal counter.',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '95%', pct: 95, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '55%', pct: 55, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '38',  pct: 70, color: '#E24B4A' },
      },
    },
    'armor,timer': {
      verdict: 'warn', spread: 'partial',
      msg: 'Tough armor makes it harder for the microbe to break down after the timer goes off! Some survived too long. What could limit how much they eat?',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '82%', pct: 82, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '70%', pct: 70, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '25',  pct: 50, color: '#E24B4A' },
      },
    },
    'coldtol,timer': {
      verdict: 'warn', spread: 'partial',
      msg: 'Cold tolerance let the microbes drift into deep cold water where the timer didn\'t stop them! They need a meal counter too.',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '84%', pct: 84, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '72%', pct: 72, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '22',  pct: 44, color: '#E24B4A' },
      },
    },
    'counter,signal': {
      verdict: 'warn', spread: 'partial',
      msg: 'The meal counter helps, but without a timer they keep going after eating — just more slowly. Add a 24-hour timer to fully shut them down!',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '80%', pct: 80, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '65%', pct: 65, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '30',  pct: 55, color: '#E24B4A' },
      },
    },
    'boost,counter': {
      verdict: 'fail', spread: 'full',
      msg: 'The speed boost let them race across the ocean before the meal counter kicked in! They need a time limit. Try replacing boost with a timer.',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '90%', pct: 90, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '30%', pct: 30, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '60+', pct: 90, color: '#E24B4A' },
      },
    },
  },

  defaultOutcome(genes) {
    const hasTimer   = genes.includes('timer');
    const hasCounter = genes.includes('counter');
    if (!hasTimer && !hasCounter) {
      return {
        verdict: 'fail', spread: 'full',
        msg: 'Without any timer or counter, the microbes just kept going forever! You need at least a 24-hour timer.',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '55%', pct: 55, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '20%', pct: 20, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '75+', pct: 90, color: '#E24B4A' },
        },
      };
    }
    return {
      verdict: 'warn', spread: 'partial',
      msg: 'Interesting combo! The key insight is combining a time limit AND a meal limit. Try a 24-hour timer and a meal counter together.',
      stats: {
        cleaned:   { label: 'plastic cleaned',    display: '60%', pct: 60, color: '#1D9E75' },
        contained: { label: 'microbes contained', display: '50%', pct: 50, color: '#378ADD' },
        escaped:   { label: 'escaped zones',      display: '40',  pct: 60, color: '#E24B4A' },
      },
    };
  },
};
