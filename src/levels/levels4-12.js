// ── Levels 4–12: Stub configs ─────────────────────────────────────────────────
//
// These are design-complete stubs ready for full implementation.
// Each exports a valid level config that loads and runs in the engine,
// but with simplified outcomes. Expand the `outcomes` table to add
// the full set of win/warn/fail combinations.
//
// See docs/CONTRIBUTING.md for the full authoring guide.

// ── Level 4: Pollen Patrol ────────────────────────────────────────────────────
export const level4 = {
  id: 4, world: 'farm', title: 'Pollen patrol',
  organismLabel: 'Your drought-resistant wheat',
  slots: 2, growLabel: 'Release pollen!',
  genes: ['pollblock', 'smooth', 'fragrance', 'stop', 'timer'],
  lockedGenes: ['store', 'stomata', 'smooth'],
  zoeIntro: 'Your drought-resistant wheat worked great! But bees are carrying the new gene to wild plants nearby. Add 2 genes to keep modified pollen on the farm.',
  zoeWin:   'You just solved one of the hardest problems in GMO science — keeping engineered genes in one place!',
  zoeFail:  'The modified gene spread to wild plants. That could disrupt the whole ecosystem! Try again.',
  zoeWarn:  'Almost! Some pollen still escaped. Think about what stops pollen from traveling.',
  stats: ['yield', 'spread', 'side'],
  outcomes: {
    'pollblock,timer': {
      verdict: 'win',
      msg: 'The pollen blocker stops the gene from being carried, and the timer ensures the blocker itself degrades harmlessly. No spread!',
      stats: {
        yield:  { label: 'crop yield',     display: '84%', pct: 84, color: '#639922' },
        spread: { label: 'gene spread',    display: '2%',  pct: 2,  color: '#378ADD' },
        side:   { label: 'side effects',   display: 'none', pct: 3, color: '#E24B4A' },
      },
    },
  },
  defaultOutcome: (genes) => ({
    verdict: 'warn',
    msg: 'Some pollen still escaped. The key is a pollen blocker combined with a timer so the blocker degrades naturally after the season.',
    stats: {
      yield:  { label: 'crop yield',   display: '70%', pct: 70, color: '#639922' },
      spread: { label: 'gene spread',  display: '30%', pct: 30, color: '#378ADD' },
      side:   { label: 'side effects', display: 'mild', pct: 25, color: '#E24B4A' },
    },
  }),
  grid: { label: 'Farm & surrounding wild plants', cols: 14, rows: 4, cellHeight: 18, defaultColor: '#C0DD97',
    legend: [
      { color: '#C0DD97', label: 'farm crop' },
      { color: '#EAF3DE', label: 'wild plants (safe)' },
      { color: '#E24B4A', label: 'gene escaped' },
    ]},
  animateGrid(result) {
    for (let i = 0; i < 14 * 4; i++) {
      const col = i % 14;
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => {
        if (col < 9) cell.style.background = '#C0DD97';
        else cell.style.background = result.verdict === 'win' ? '#EAF3DE' : '#E24B4A';
      }, i * 10);
    }
  },
  buildOrganism: (genes) => `<svg width="100" height="90" viewBox="0 0 100 90">
    <rect x="10" y="30" width="80" height="50" rx="8" fill="#EAF3DE" stroke="#C0DD97" stroke-width="1.5"/>
    <text x="50" y="60" text-anchor="middle" font-size="12" fill="#27500A" font-weight="500">Wheat plant</text>
    <text x="50" y="78" text-anchor="middle" font-size="10" fill="#3B6D11">${genes.length}/2 new genes</text>
  </svg>`,
};


// ── Level 5: The Virus ────────────────────────────────────────────────────────
export const level5 = {
  id: 5, world: 'body', title: 'The virus',
  organismLabel: 'Your immune cell',
  slots: 3, growLabel: 'Deploy!',
  genes: ['recognize', 'attack', 'selftag', 'memory', 'brakes'],
  zoeIntro: 'A new virus is spreading through Celltown! The immune system can\'t recognize it. Design an immune cell that can find and destroy the virus safely.',
  zoeWin:   'You designed a cell that works like real CAR-T cell therapy — one of the most exciting treatments in medicine today!',
  zoeFail:  'The cell attacked healthy tissue! That\'s called an autoimmune reaction. Make sure it can recognize "self" vs "enemy".',
  zoeWarn:  'The cell found the virus but something went wrong. Read the hint carefully.',
  stats: ['viruses', 'health', 'side'],
  outcomes: {
    'attack,recognize,selftag': {
      verdict: 'win',
      msg: 'Perfect — the cell recognizes the virus, attacks it, and leaves healthy cells alone because of the self-recognition tag. Celltown is saved!',
      stats: {
        viruses: { label: 'viruses destroyed', display: '94%', pct: 94, color: '#993C1D' },
        health:  { label: 'healthy cells safe', display: '96%', pct: 96, color: '#1D9E75' },
        side:    { label: 'side effects',       display: 'none', pct: 3, color: '#E24B4A' },
      },
    },
    'attack,recognize,memory': {
      verdict: 'win',
      msg: 'Great! The memory gene means if this virus ever comes back, the immune system will be ready 10x faster. That\'s how vaccines work!',
      stats: {
        viruses: { label: 'viruses destroyed', display: '91%', pct: 91, color: '#993C1D' },
        health:  { label: 'healthy cells safe', display: '88%', pct: 88, color: '#1D9E75' },
        side:    { label: 'side effects',       display: 'tiny', pct: 8, color: '#E24B4A' },
      },
    },
  },
  defaultOutcome: (genes) => ({
    verdict: genes.includes('attack') && !genes.includes('recognize')
      ? 'fail'
      : 'warn',
    msg: genes.includes('attack') && !genes.includes('recognize')
      ? 'The cell attacked randomly — including healthy tissue! Without a recognize gene, it can\'t tell friend from foe.'
      : 'This combo needs some work. The cell needs to recognize the virus AND attack it. Add a self-recognition tag to protect healthy cells.',
    stats: {
      viruses: { label: 'viruses destroyed', display: '50%', pct: 50, color: '#993C1D' },
      health:  { label: 'healthy cells safe', display: '55%', pct: 55, color: '#1D9E75' },
      side:    { label: 'side effects',       display: 'mild', pct: 40, color: '#E24B4A' },
    },
  }),
  grid: {
    label: 'Celltown — infection spread',
    cols: 12, rows: 4, cellHeight: 18, defaultColor: '#F5C4B3',
    legend: [
      { color: '#F5C4B3', label: 'infected cells' },
      { color: '#E1F5EE', label: 'healthy cells' },
      { color: '#E24B4A', label: 'autoimmune damage' },
    ],
  },
  animateGrid(result) {
    for (let i = 0; i < 48; i++) {
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => {
        cell.style.background = result.verdict === 'win' ? '#E1F5EE'
          : result.verdict === 'fail' ? '#E24B4A' : '#9FE1CB';
      }, i * 12);
    }
  },
  buildOrganism: (genes) => `<svg width="100" height="100" viewBox="0 0 100 100">
    <ellipse cx="50" cy="50" rx="36" ry="30" fill="#FAECE7" stroke="#F5C4B3" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="10" fill="#F0997B"/>
    <text x="50" y="88" text-anchor="middle" font-size="10" fill="#712B13" font-weight="500">${genes.length}/3 genes</text>
  </svg>`,
};


// ── Level 6: Overzealous Defender ─────────────────────────────────────────────
export const level6 = {
  id: 6, world: 'body', title: 'Overzealous defender',
  organismLabel: 'Your upgraded immune cell',
  slots: 2, growLabel: 'Deploy!',
  genes: ['selftag', 'brakes', 'memory', 'stop', 'signal'],
  lockedGenes: ['recognize', 'attack'],
  zoeIntro: 'Your immune cell is too powerful — it\'s attacking healthy tissue too! Add 2 genes to make it safer without losing its power.',
  zoeWin:   'You just learned about autoimmunity and how the body uses multiple checkpoints to protect itself!',
  zoeFail:  'The cell is still attacking healthy tissue. Real autoimmune diseases work exactly this way. Safety brakes and self-recognition together are the answer.',
  zoeWarn:  'Better, but not fully safe yet. The cell still occasionally attacks the wrong target.',
  stats: ['viruses', 'healthy', 'autoimmune'],
  outcomes: {
    'brakes,selftag': {
      verdict: 'win',
      msg: 'Two safety systems working together — self-recognition tells the cell what NOT to attack, and safety brakes stop it mid-action if it starts to go wrong.',
      stats: {
        viruses:    { label: 'viruses stopped',   display: '89%', pct: 89, color: '#993C1D' },
        healthy:    { label: 'healthy protected', display: '97%', pct: 97, color: '#1D9E75' },
        autoimmune: { label: 'autoimmune risk',   display: '3%',  pct: 3,  color: '#E24B4A' },
      },
    },
  },
  defaultOutcome: () => ({
    verdict: 'warn',
    msg: 'The cell is safer but still occasionally misidentifies healthy cells. Try combining self-recognition with safety brakes for full protection.',
    stats: {
      viruses:    { label: 'viruses stopped',   display: '80%', pct: 80, color: '#993C1D' },
      healthy:    { label: 'healthy protected', display: '75%', pct: 75, color: '#1D9E75' },
      autoimmune: { label: 'autoimmune risk',   display: '25%', pct: 25, color: '#E24B4A' },
    },
  }),
  grid: { label: 'Body scan — cell damage', cols: 12, rows: 4, cellHeight: 18, defaultColor: '#F5C4B3',
    legend: [
      { color: '#E1F5EE', label: 'healthy' },
      { color: '#F5C4B3', label: 'virus cells' },
      { color: '#E24B4A', label: 'autoimmune damage' },
    ]},
  animateGrid(result) {
    for (let i = 0; i < 48; i++) {
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => { cell.style.background = result.verdict === 'win' ? '#E1F5EE' : '#E24B4A'; }, i * 12);
    }
  },
  buildOrganism: (genes) => `<svg width="100" height="100" viewBox="0 0 100 100">
    <ellipse cx="50" cy="50" rx="36" ry="30" fill="#FAECE7" stroke="#F5C4B3" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="10" fill="#D85A30"/>
    <text x="50" y="88" text-anchor="middle" font-size="10" fill="#712B13" font-weight="500">${genes.length}/2 new genes</text>
  </svg>`,
};


// ── Level 7: Glowing Trees ────────────────────────────────────────────────────
export const level7 = {
  id: 7, world: 'city', title: 'Glowing trees',
  organismLabel: 'Your city tree',
  slots: 3, growLabel: 'Plant it!',
  genes: ['lucifer', 'darksense', 'release', 'deep', 'stop'],
  zoeIntro: 'BioCity\'s power grid is failing! Can you engineer a tree whose leaves glow at night? Pick 3 genes — but the glow needs to last all night, not just 2 hours!',
  zoeWin:   'Bioluminescence is real — scientists have already made glowing plants! The luciferase gene comes from fireflies.',
  zoeFail:  'The tree glows, but caused unexpected problems for the city. Think about when and how it should glow.',
  zoeWarn:  'The tree glows but not all night. It needs a timed release to keep the chemical reaction going.',
  stats: ['brightness', 'duration', 'side'],
  outcomes: {
    'darksense,lucifer,release': {
      verdict: 'win',
      msg: 'The darkness sensor turns the glow on at sunset, luciferase produces the light, and timed release keeps the chemicals flowing all night. The streets are lit!',
      stats: {
        brightness: { label: 'brightness',    display: '88%', pct: 88, color: '#BA7517' },
        duration:   { label: 'lasts all night',display: '94%', pct: 94, color: '#EF9F27' },
        side:       { label: 'side effects',   display: 'none', pct: 4, color: '#E24B4A' },
      },
    },
  },
  defaultOutcome: () => ({
    verdict: 'warn',
    msg: 'The tree glows but not reliably all night. You need: luciferase to produce the glow, a darkness sensor to turn it on, and a timed release to keep it going.',
    stats: {
      brightness: { label: 'brightness',     display: '60%', pct: 60, color: '#BA7517' },
      duration:   { label: 'lasts all night', display: '40%', pct: 40, color: '#EF9F27' },
      side:       { label: 'side effects',    display: 'mild', pct: 20, color: '#E24B4A' },
    },
  }),
  grid: { label: 'City block — light coverage at night', cols: 14, rows: 3, cellHeight: 20, defaultColor: '#2C2C2A',
    legend: [
      { color: '#FAC775', label: 'lit street' },
      { color: '#2C2C2A', label: 'dark street' },
    ]},
  animateGrid(result) {
    for (let i = 0; i < 14 * 3; i++) {
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => { cell.style.background = result.verdict === 'win' ? '#FAC775' : (i % 3 === 0 ? '#FAC775' : '#2C2C2A'); }, i * 15);
    }
  },
  buildOrganism: (genes) => `<svg width="100" height="110" viewBox="0 0 100 110">
    <rect x="44" y="70" width="12" height="35" rx="4" fill="#97C459"/>
    <ellipse cx="50" cy="55" rx="28" ry="32" fill="${genes.includes('lucifer') ? '#FAC775' : '#EAF3DE'}" stroke="#C0DD97" stroke-width="1.5"/>
    <text x="50" y="58" text-anchor="middle" font-size="10" fill="#27500A" font-weight="500">${genes.length}/3 genes</text>
  </svg>`,
};


// ── Level 8: Brighter City ────────────────────────────────────────────────────
export const level8 = {
  id: 8, world: 'city', title: 'Brighter city',
  organismLabel: 'Your logic-gated tree',
  slots: 2, growLabel: 'Wire it up!',
  genes: ['darksense', 'healthsense', 'andgate', 'stop', 'release'],
  lockedGenes: ['lucifer', 'release'],
  zoeIntro: 'The trees glow — but they glow even when sick, which wastes energy and spreads disease. Can you wire two sensors together so the tree only glows when it\'s dark AND healthy?',
  zoeWin:   'You just built a biological AND gate — a logic circuit made from genes! Real scientists call this a genetic toggle switch.',
  zoeFail:  'The tree glowed at the wrong times. An AND gate needs BOTH conditions true before the output fires.',
  zoeWarn:  'Getting closer! The AND logic gate needs both sensors to feed into it.',
  stats: ['efficiency', 'coverage', 'side'],
  outcomes: {
    'andgate,healthsense': {
      verdict: 'win',
      msg: 'The AND gate wires the darkness sensor AND health sensor together — the tree only glows when both are true. A real biological logic circuit!',
      stats: {
        efficiency: { label: 'energy efficiency', display: '95%', pct: 95, color: '#BA7517' },
        coverage:   { label: 'street coverage',   display: '90%', pct: 90, color: '#EF9F27' },
        side:       { label: 'side effects',      display: 'none', pct: 2, color: '#E24B4A' },
      },
    },
  },
  defaultOutcome: () => ({
    verdict: 'warn',
    msg: 'The logic isn\'t quite right. An AND gate needs both the darkness sensor AND health sensor to feed into it before the glow gene fires.',
    stats: {
      efficiency: { label: 'energy efficiency', display: '55%', pct: 55, color: '#BA7517' },
      coverage:   { label: 'street coverage',   display: '70%', pct: 70, color: '#EF9F27' },
      side:       { label: 'side effects',      display: 'mild', pct: 30, color: '#E24B4A' },
    },
  }),
  grid: { label: 'City block — smart lighting', cols: 14, rows: 3, cellHeight: 20, defaultColor: '#2C2C2A',
    legend: [
      { color: '#FAC775', label: 'smart-lit street' },
      { color: '#EF9F27', label: 'dim / inconsistent' },
      { color: '#2C2C2A', label: 'dark' },
    ]},
  animateGrid(result) {
    for (let i = 0; i < 42; i++) {
      const cell = document.getElementById('gc-' + i);
      if (!cell) continue;
      setTimeout(() => { cell.style.background = result.verdict === 'win' ? '#FAC775' : '#EF9F27'; }, i * 15);
    }
  },
  buildOrganism: (genes) => `<svg width="100" height="110" viewBox="0 0 100 110">
    <rect x="44" y="70" width="12" height="35" rx="4" fill="#97C459"/>
    <ellipse cx="50" cy="55" rx="28" ry="32" fill="${genes.includes('andgate') ? '#FAC775' : '#EAF3DE'}" stroke="#C0DD97" stroke-width="1.5"/>
    <text x="50" y="55" text-anchor="middle" font-size="9" fill="#633806">${genes.includes('andgate') ? 'AND gate active' : ''}</text>
    <text x="50" y="98" text-anchor="middle" font-size="10" fill="#633806" font-weight="500">${genes.length}/2 new genes</text>
  </svg>`,
};


// ── Levels 9–12 are similarly structured; implementation follows the same
// pattern as levels 1–8. See docs/CONTRIBUTING.md for authoring guidance.

export const level9  = { id: 9,  world: 'ocean', title: 'Deep sea cleanup',     slots: 4, genes: ['detect','eat','stop','coldtol','armor','timer','counter'], lockedGenes: [], zoeIntro: 'The ocean floor is cold and high-pressure — your Level 1 microbe dies down there. Add 4 genes to redesign it for the deep sea!', zoeWin: 'Multi-gene engineering complete! Real deep-sea organisms use these exact adaptations.', zoeFail: 'The microbe couldn\'t survive the pressure and cold. Try cold tolerance and armor together.', zoeWarn: 'Surviving but not thriving. You need cold tolerance AND pressure protection AND a way to keep working.', stats: ['yield','health','side'], outcomes: { 'coldtol,detect,eat,stop': { verdict:'win', msg:'Cold tolerance + detection + breakdown + stop signal. All four working together!', stats:{ yield:{label:'plastic cleaned',display:'80%',pct:80,color:'#1D9E75'}, health:{label:'microbe survival',display:'85%',pct:85,color:'#378ADD'}, side:{label:'side effects',display:'none',pct:5,color:'#E24B4A'} } } }, defaultOutcome:()=>({ verdict:'warn', msg:'The deep sea requires cold tolerance AND pressure protection. Try cold tolerance, detect, eat, and stop.', stats:{ yield:{label:'plastic cleaned',display:'40%',pct:40,color:'#1D9E75'}, health:{label:'microbe survival',display:'35%',pct:35,color:'#378ADD'}, side:{label:'side effects',display:'mild',pct:25,color:'#E24B4A'} } }), grid:{label:'Deep ocean cleanup zone',cols:12,rows:4,cellHeight:18,defaultColor:'#0C447C',legend:[{color:'#0C447C',label:'deep water'},{color:'#1D9E75',label:'cleaned'},{color:'#B4B2A9',label:'microbe died'}]}, animateGrid(r){for(let i=0;i<48;i++){const c=document.getElementById('gc-'+i);if(!c)return;setTimeout(()=>{c.style.background=r.verdict==='win'?'#1D9E75':'#B4B2A9';},i*10);}}, buildOrganism:(g)=>`<svg width="100" height="100" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="32" ry="26" fill="${g.includes('coldtol')?'#E6F1FB':'#E1F5EE'}" stroke="#5DCAA5" stroke-width="1.5"/><text x="50" y="53" text-anchor="middle" font-size="10" fill="#085041" font-weight="500">${g.length}/4 genes</text></svg>` };

export const level10 = { id: 10, world: 'body',  title: 'Tiny surgeons',         slots: 3, genes: ['address','payload','dissolve','selftag','brakes'], lockedGenes: ['recognize'], zoeIntro: 'A patient has a tumor. Design a cell that finds it, delivers medicine, then disappears safely!', zoeWin: 'You just designed a drug delivery system like real nanoparticle medicine!', zoeFail: 'The medicine was delivered to the wrong place! The address gene is essential.', zoeWarn: 'Almost! Make sure the cell can find the tumor, deliver the medicine, then dissolve.', stats: ['accuracy','delivery','side'], outcomes: { 'address,dissolve,payload': { verdict:'win', msg:'Address finds the tumor, payload delivers medicine, dissolve removes the cell safely. Precision medicine!', stats:{ accuracy:{label:'targeting accuracy',display:'96%',pct:96,color:'#993C1D'}, delivery:{label:'medicine delivered',display:'91%',pct:91,color:'#1D9E75'}, side:{label:'side effects',display:'none',pct:3,color:'#E24B4A'} } } }, defaultOutcome:()=>({ verdict:'warn', msg:'The cell needs three things: an address to find the tumor, a payload to deliver medicine, and a dissolve gene to clean up after.', stats:{ accuracy:{label:'targeting accuracy',display:'50%',pct:50,color:'#993C1D'}, delivery:{label:'medicine delivered',display:'45%',pct:45,color:'#1D9E75'}, side:{label:'side effects',display:'mild',pct:35,color:'#E24B4A'} } }), grid:{label:'Body scan — tumor targeting',cols:12,rows:4,cellHeight:18,defaultColor:'#FAECE7',legend:[{color:'#FAECE7',label:'body tissue'},{color:'#1D9E75',label:'tumor treated'},{color:'#E24B4A',label:'wrong tissue hit'}]}, animateGrid(r){for(let i=0;i<48;i++){const c=document.getElementById('gc-'+i);if(!c)return;setTimeout(()=>{c.style.background=r.verdict==='win'?'#E1F5EE':'#E24B4A';},i*12);}}, buildOrganism:(g)=>`<svg width="100" height="100" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="36" ry="30" fill="#FAECE7" stroke="#F5C4B3" stroke-width="1.5"/><text x="50" y="53" text-anchor="middle" font-size="10" fill="#712B13" font-weight="500">${g.length}/3 genes</text></svg>` };

export const level11 = { id: 11, world: 'farm',  title: 'Nitrogen factory',      slots: 3, genes: ['signal','stop','andgate','timer','deep'], lockedGenes: ['store','smooth'], zoeIntro: 'Crops need fertilizer but it pollutes rivers. Can you engineer a soil bacterium to make nitrogen naturally — only when it\'s near crop roots?', zoeWin: 'Real symbiotic bacteria called rhizobia do exactly this! You just re-created one of nature\'s cleverest partnerships.', zoeFail: 'The bacterium made nitrogen in the wrong places, polluting the river. It needs to sense the crop roots first.', zoeWarn: 'Getting close! The bacterium needs to detect the roots AND only make nitrogen near them.', stats: ['yield','pollution','efficiency'], outcomes: { 'andgate,signal,stop': { verdict:'win', msg:'The signal gene detects root chemicals, the AND gate ensures both conditions are met, and stop prevents over-production. Symbiosis achieved!', stats:{ yield:{label:'crop yield',display:'88%',pct:88,color:'#639922'}, pollution:{label:'river pollution',display:'3%',pct:3,color:'#E24B4A'}, efficiency:{label:'efficiency',display:'94%',pct:94,color:'#1D9E75'} } } }, defaultOutcome:()=>({ verdict:'warn', msg:'The bacterium is producing nitrogen but not targeting it well. Use a signal gene to detect roots and an AND gate to ensure it only acts near crops.', stats:{ yield:{label:'crop yield',display:'60%',pct:60,color:'#639922'}, pollution:{label:'river pollution',display:'45%',pct:45,color:'#E24B4A'}, efficiency:{label:'efficiency',display:'55%',pct:55,color:'#1D9E75'} } }), grid:{label:'Farm soil — nitrogen distribution',cols:14,rows:4,cellHeight:18,defaultColor:'#D3D1C7',legend:[{color:'#EAF3DE',label:'healthy soil'},{color:'#D3D1C7',label:'dry soil'},{color:'#378ADD',label:'river (watch pollution)'}]}, animateGrid(r){for(let i=0;i<56;i++){const c=document.getElementById('gc-'+i);if(!c)return;setTimeout(()=>{c.style.background=r.verdict==='win'?'#EAF3DE':'#D3D1C7';},i*10);}}, buildOrganism:(g)=>`<svg width="100" height="90" viewBox="0 0 100 90"><ellipse cx="50" cy="45" rx="28" ry="20" fill="#EAF3DE" stroke="#C0DD97" stroke-width="1.5"/><text x="50" y="48" text-anchor="middle" font-size="10" fill="#27500A" font-weight="500">${g.length}/3 genes</text></svg>` };

export const level12 = { id: 12, world: 'city',  title: 'Final mission — design your own', slots: 4, genes: ['detect','eat','stop','lucifer','recognize','address','payload','dissolve','andgate','timer','counter','signal'], lockedGenes: [], zoeIntro: 'You\'ve learned so much! Now it\'s your turn to choose a problem and design your own solution. Pick any 4 genes — your peer ethics committee will review your design!', zoeWin: 'Congratulations, scientist! You completed BioBuilder Academy. Your design has been sent to the ethics committee for review!', zoeFail: 'The design had unintended consequences. Think about what stop conditions and containment you need.', zoeWarn: 'Interesting design! The ethics committee has some questions. Think about what could go wrong.', stats: ['impact','safety','ethics'], outcomes: {}, defaultOutcome:(genes)=>({ verdict: genes.includes('stop') || genes.includes('timer') || genes.includes('counter') ? 'win' : 'warn', msg: genes.includes('stop') || genes.includes('timer') || genes.includes('counter') ? 'Your design includes a safety mechanism — the ethics committee approves! Well done, you graduated BioBuilder Academy.' : 'Your design is creative, but the ethics committee notes it has no off-switch or containment. Real scientists always include safety systems. Can you add one?', stats:{ impact: {label:'real-world impact',display: genes.length >= 3 ? 'high' : 'medium', pct: genes.length * 20, color:'#1D9E75'}, safety: {label:'safety rating',    display: genes.includes('stop') ? 'safe' : 'risky', pct: genes.includes('stop') ? 90 : 30, color:'#378ADD'}, ethics: {label:'ethics score',    display: genes.includes('stop') ? 'pass' : 'review', pct: genes.includes('stop') ? 85 : 40, color:'#BA7517'} } }), grid:{label:'World map — problem zones',cols:14,rows:4,cellHeight:18,defaultColor:'#B5D4F4',legend:[{color:'#1D9E75',label:'problem solved'},{color:'#B5D4F4',label:'still affected'},{color:'#EF9F27',label:'needs review'}]}, animateGrid(r){for(let i=0;i<56;i++){const c=document.getElementById('gc-'+i);if(!c)return;setTimeout(()=>{c.style.background=r.verdict==='win'?'#1D9E75':'#EF9F27';},i*12);}}, buildOrganism:(g)=>`<svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#EEEDFE" stroke="#CECBF6" stroke-width="1.5"/><text x="50" y="46" text-anchor="middle" font-size="10" fill="#3C3489" font-weight="500">my organism</text><text x="50" y="62" text-anchor="middle" font-size="10" fill="#534AB7">${g.length}/4 genes</text></svg>` };

// Re-export all as named exports for dynamic import routing in engine.js
export default { level4, level5, level6, level7, level8, level9, level10, level11, level12 };
