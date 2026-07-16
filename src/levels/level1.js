// ── Level 1: Ocean Lab — Plastic cleanup ─────────────────────────────────────

export default {
  id: 1,
  world: 'ocean',
  title: 'Plastic cleanup',
  organismLabel: 'Your microbe',
  slots: 3,
  growLabel: 'Grow!',

  genes: ['detect', 'eat', 'stop', 'swim', 'multiply', 'glow'],

  zoeIntro: 'The ocean is full of plastic! Our microbe needs 3 gene parts to do its job — but choose carefully. Some combos cause problems!',
  zoeWin:   'Amazing work, scientist! You designed a microbe that cleans the ocean safely!',
  zoeFail:  'Uh oh! The microbe caused problems. Think about what each gene does and try again.',
  zoeWarn:  'So close! Read the hint and give it another go.',

  grid: {
    label: 'Ocean cleanup zone',
    cols: 12, rows: 4, cellHeight: 18,
    defaultColor: '#B5D4F4',
    legend: [
      { color: '#B5D4F4', label: 'ocean water' },
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
        if (result.verdict === 'win') {
          cell.style.background = '#1D9E75';
        } else if (result.verdict === 'fail') {
          cell.style.background = col > 7 ? '#E24B4A' : '#1D9E75';
        } else {
          cell.style.background = col < 8 ? '#1D9E75' : '#B5D4F4';
        }
      }, i * 10);
    }
  },

  buildOrganism(genes) {
    const hasMult = genes.includes('multiply');
    const hasGlow = genes.includes('glow');
    const hasEat  = genes.includes('eat');
    const mouth = hasEat ? 'M42 54 Q50 60 58 54' : 'M44 54 Q50 57 56 54';
    const glowR = hasGlow ? '30' : '0';
    const bodyCount = hasMult ? [0,1,2] : [0];
    const offsets = [[0,0], [-20,-10], [18,8]];
    const cells = bodyCount.map(i => {
      const [ox, oy] = offsets[i];
      return `<g transform="translate(${ox},${oy})" opacity="${i > 0 ? 0.5 : 1}">
        <ellipse cx="50" cy="50" rx="28" ry="22" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="1.5"/>
        <circle cx="42" cy="46" r="4" fill="#9FE1CB"/>
        <circle cx="54" cy="46" r="4" fill="#9FE1CB"/>
        <path d="${mouth}" stroke="#085041" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </g>`;
    }).join('');
    return `<svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${glowR}" fill="#ED93B1" opacity="0.3"/>
      ${cells}
      <text x="50" y="90" text-anchor="middle" font-size="10" fill="#0F6E56" font-weight="500">${genes.length}/3 genes</text>
    </svg>`;
  },

  stats: ['yield', 'health', 'side'],

  outcomes: {
    'detect,eat,stop': {
      verdict: 'win', msg: 'Perfect combo! The microbe finds plastic, eats it, then stops before eating anything else. The ocean is getting cleaner!',
      stats: {
        yield:  { label: 'plastic cleaned', display: '92%', pct: 92, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '88%', pct: 88, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'none', pct: 5,  color: '#E24B4A' },
      },
    },
    'detect,eat,swim': {
      verdict: 'warn', msg: 'Great cleanup, but without a stop signal the microbe ate fishing nets too! Try adding a stop signal instead of swim.',
      stats: {
        yield:  { label: 'plastic cleaned', display: '95%', pct: 95, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '72%', pct: 72, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'nets!', pct: 42, color: '#E24B4A' },
      },
    },
    'detect,eat,multiply': {
      verdict: 'fail', msg: 'The microbe multiplied so fast it started eating coral reefs! Multiplying without a stop signal is dangerous. Can you fix it?',
      stats: {
        yield:  { label: 'plastic cleaned', display: '99%', pct: 99, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '40%', pct: 40, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'coral!', pct: 88, color: '#E24B4A' },
      },
    },
    'eat,stop,swim': {
      verdict: 'warn', msg: 'The microbe is safe but it can\'t find the plastic! It needs a "detect plastic" gene to know where to go.',
      stats: {
        yield:  { label: 'plastic cleaned', display: '45%', pct: 45, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '90%', pct: 90, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'none', pct: 0, color: '#E24B4A' },
      },
    },
    'detect,stop,swim': {
      verdict: 'warn', msg: 'The microbe found the plastic and swam to it — but it can\'t eat it! It needs a "break down plastic" gene.',
      stats: {
        yield:  { label: 'plastic cleaned', display: '20%', pct: 20, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '95%', pct: 95, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'none', pct: 0, color: '#E24B4A' },
      },
    },
    'detect,eat,glow': {
      verdict: 'warn', msg: 'Nice idea with the glow — you\'d be able to see when it\'s full! But without a stop signal it kept eating. What could you add?',
      stats: {
        yield:  { label: 'plastic cleaned', display: '78%', pct: 78, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '80%', pct: 80, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'nets!', pct: 35, color: '#E24B4A' },
      },
    },
    'eat,multiply,glow': {
      verdict: 'fail', msg: 'Without a detect gene the microbe ate randomly — including ship hulls! Multiplying made it worse. Detection is essential.',
      stats: {
        yield:  { label: 'plastic cleaned', display: '60%', pct: 60, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '55%', pct: 55, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'ships!', pct: 70, color: '#E24B4A' },
      },
    },
  },

  defaultOutcome(genes) {
    return {
      verdict: 'warn', msg: 'Interesting combo! The microbe tried its best but results were mixed. Try: detect plastic + break down plastic + stop signal.',
      stats: {
        yield:  { label: 'plastic cleaned', display: '30%', pct: 30, color: '#1D9E75' },
        health: { label: 'microbe health',  display: '60%', pct: 60, color: '#378ADD' },
        side:   { label: 'side effects',    display: 'mild', pct: 20, color: '#E24B4A' },
      },
    };
  },
};
