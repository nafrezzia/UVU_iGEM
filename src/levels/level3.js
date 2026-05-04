// ── Level 3: FarmBot Fields — The drought ────────────────────────────────────

export default {
  id: 3,
  world: 'farm',
  title: 'The drought',
  organismLabel: 'Your wheat plant',
  slots: 3,
  growLabel: 'Grow!',

  genes: ['store', 'waxy', 'spine', 'deep', 'stomata', 'smooth', 'night'],

  zoeIntro: 'The village is running out of water and the wheat is dying! A cactus survives the desert — can we borrow some of its genes? Pick 3, but watch out: cactus genes can have surprising side effects!',
  zoeWin:   'Amazing! You just did what real agricultural scientists do — borrow genes from wild plants to make crops tougher. That\'s called genetic engineering!',
  zoeFail:  'Oh no — the village is still hungry. Read the hint and try a different combo!',
  zoeWarn:  'Getting warmer! Think carefully about what the bees need to do their job.',

  grid: {
    label: 'Farm field — crop health',
    cols: 16, rows: 4, cellHeight: 18,
    defaultColor: '#EF9F27',
    legend: [
      { color: '#C0DD97', label: 'healthy' },
      { color: '#EF9F27', label: 'drought stressed' },
      { color: '#E24B4A', label: 'no bees / failed' },
      { color: '#B4B2A9', label: 'wilted / dead' },
    ],
  },

  animateGrid(result) {
    const total = 16 * 4;
    const hasSpine = result._spines;
    for (let i = 0; i < total; i++) {
      const col = i % 16;
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => {
        if (result.verdict === 'win') {
          cell.style.background = '#C0DD97';
        } else if (result.verdict === 'fail') {
          cell.style.background = '#B4B2A9';
        } else if (hasSpine) {
          cell.style.background = col < 10 ? '#E24B4A' : '#EF9F27';
        } else {
          cell.style.background = col < 8 ? '#C0DD97' : '#EF9F27';
        }
      }, 80 + i * 8);
    }
  },

  buildOrganism(genes) {
    const hasSpine   = genes.includes('spine');
    const hasStore   = genes.includes('store');
    const hasDeep    = genes.includes('deep');
    const hasSmooth  = genes.includes('smooth');
    const hasNight   = genes.includes('night');
    const sw = hasSpine ? '2' : '0';
    const headFill = hasNight ? '#CECBF6' : '#C0DD97';
    return `<svg width="110" height="130" viewBox="0 0 110 130">
      <rect x="30" y="100" width="50" height="14" rx="3" fill="#C0DD97"/>
      <rect x="52" y="28" width="6" height="74" rx="3" fill="#97C459"/>
      <path d="M52 70 Q30 55 34 40 Q44 52 52 60Z" fill="#97C459"/>
      <path d="M58 60 Q80 48 78 32 Q68 44 58 52Z" fill="#97C459"/>
      ${hasStore ? '<ellipse cx="55" cy="82" rx="10" ry="8" fill="#B5D4F4" opacity="0.6"/>' : ''}
      <path d="M52 48 L38 42" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
      <path d="M58 48 L72 42" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
      <path d="M52 60 L36 56" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
      <path d="M58 60 L74 56" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
      ${hasDeep ? '<path d="M55 114 L55 128" stroke="#97C459" stroke-width="3" stroke-linecap="round"/>' : ''}
      <ellipse cx="55" cy="22" rx="8" ry="14" fill="${headFill}" stroke="#97C459" stroke-width="1"/>
      ${hasSmooth ? '<circle cx="55" cy="10" r="6" fill="#F4C0D1"/>' : ''}
      <text x="55" y="126" text-anchor="middle" font-size="10" fill="#27500A" font-weight="500">${genes.length}/3 genes</text>
    </svg>`;
  },

  stats: ['yield', 'bees', 'side'],

  outcomes: {
    'smooth,spine,store': {
      verdict: 'win', _spines: false,
      msg: 'Perfect! The wheat stores water from the cactus, and smooth-flowers stops the spines growing on the flowers — so bees can still land and pollinate. The village has food!',
      stats: {
        yield: { label: 'crop yield',  display: '88%', pct: 88, color: '#639922' },
        bees:  { label: 'bee visits',  display: '92%', pct: 92, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'tiny', pct: 8,  color: '#E24B4A' },
      },
    },
    'smooth,stomata,store': {
      verdict: 'win', _spines: false,
      msg: 'Excellent! Storing water and closing stomata during the day gives great drought resistance, and smooth flowers keep the bees happy.',
      stats: {
        yield: { label: 'crop yield',  display: '91%', pct: 91, color: '#639922' },
        bees:  { label: 'bee visits',  display: '90%', pct: 90, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'none', pct: 5, color: '#E24B4A' },
      },
    },
    'deep,smooth,store': {
      verdict: 'win', _spines: false,
      msg: 'Great thinking! Deep roots find water underground, storing water keeps reserves, and smooth flowers let the bees in. The village is fed!',
      stats: {
        yield: { label: 'crop yield',  display: '85%', pct: 85, color: '#639922' },
        bees:  { label: 'bee visits',  display: '88%', pct: 88, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'tiny', pct: 8, color: '#E24B4A' },
      },
    },
    'night,smooth,store': {
      verdict: 'win', _spines: false,
      msg: 'Clever science! Night breathing keeps the plant hydrated, stored water provides reserves, and smooth flowers invite the bees. Real plants like pineapples use this exact strategy — it\'s called CAM photosynthesis!',
      stats: {
        yield: { label: 'crop yield',  display: '90%', pct: 90, color: '#639922' },
        bees:  { label: 'bee visits',  display: '92%', pct: 92, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'none', pct: 5, color: '#E24B4A' },
      },
    },
    'spine,store,waxy': {
      verdict: 'warn', _spines: true,
      msg: 'The plant holds water — but spines grew on the flowers too! Bees can\'t land to pollinate, so most crops failed. You need something to keep the flowers smooth.',
      stats: {
        yield: { label: 'crop yield',  display: '72%', pct: 72, color: '#639922' },
        bees:  { label: 'bee visits',  display: '18%', pct: 18, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'spines!', pct: 65, color: '#E24B4A' },
      },
    },
    'spine,deep,store': {
      verdict: 'warn', _spines: true,
      msg: 'The plant survives the drought — but spines on the flowers are blocking pollinators. What gene could keep the flowers clear?',
      stats: {
        yield: { label: 'crop yield',  display: '65%', pct: 65, color: '#639922' },
        bees:  { label: 'bee visits',  display: '14%', pct: 14, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'spines!', pct: 75, color: '#E24B4A' },
      },
    },
    'spine,deep,waxy': {
      verdict: 'fail', _spines: true,
      msg: 'The cactus genes took over! The plant is now more cactus than wheat — covered in spines, no bees, waxy coat made the leaves too stiff to grow grain. Try fewer cactus genes, and make sure bees can reach the flowers.',
      stats: {
        yield: { label: 'crop yield',  display: '35%', pct: 35, color: '#639922' },
        bees:  { label: 'bee visits',  display: '5%',  pct: 5,  color: '#EF9F27' },
        side:  { label: 'side effects',display: 'spines!', pct: 90, color: '#E24B4A' },
      },
    },
    'store,waxy,stomata': {
      verdict: 'warn', _spines: false,
      msg: 'Really good! But combining two water-sealing genes made the leaves too closed — the plant couldn\'t breathe well. Try "store water" with just one other drought gene.',
      stats: {
        yield: { label: 'crop yield',  display: '80%', pct: 80, color: '#639922' },
        bees:  { label: 'bee visits',  display: '88%', pct: 88, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'mild', pct: 10, color: '#E24B4A' },
      },
    },
  },

  defaultOutcome(genes) {
    const hasSpine  = genes.includes('spine');
    const hasSmooth = genes.includes('smooth');
    const hasWater  = ['store','deep','night','stomata','waxy'].some(g => genes.includes(g));
    if (hasSpine && !hasSmooth) {
      return {
        verdict: 'warn', _spines: true,
        msg: 'The spines are blocking the bees! Without a smooth-flowers gene, pollinators can\'t reach the wheat. Try replacing "grow spines" or adding "smooth flowers".',
        stats: {
          yield: { label: 'crop yield',  display: '50%', pct: 50, color: '#639922' },
          bees:  { label: 'bee visits',  display: '20%', pct: 20, color: '#EF9F27' },
          side:  { label: 'side effects',display: 'spines!', pct: 70, color: '#E24B4A' },
        },
      };
    }
    if (!hasWater) {
      return {
        verdict: 'fail', _spines: false,
        msg: 'The bees are happy, but the plant still wilted in the drought! It needs at least one water-saving gene — "store water", "deep roots", "close stomata", or "night breathing".',
        stats: {
          yield: { label: 'crop yield',  display: '22%', pct: 22, color: '#639922' },
          bees:  { label: 'bee visits',  display: '70%', pct: 70, color: '#EF9F27' },
          side:  { label: 'side effects',display: 'none', pct: 5, color: '#E24B4A' },
        },
      };
    }
    return {
      verdict: 'warn', _spines: false,
      msg: 'The plant survived but didn\'t thrive. Key combo: one or two drought-survival genes plus something to protect the flowers for the bees.',
      stats: {
        yield: { label: 'crop yield',  display: '60%', pct: 60, color: '#639922' },
        bees:  { label: 'bee visits',  display: '65%', pct: 65, color: '#EF9F27' },
        side:  { label: 'side effects',display: 'mild', pct: 30, color: '#E24B4A' },
      },
    };
  },
};
