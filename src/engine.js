// ── BioBuilder Academy — Game Engine ─────────────────────────────────────────
//
// runLevel(id, container, onComplete) dynamically imports the level config,
// builds the UI from shared components, and wires up the simulation loop.

import { GENES } from './data/outcomes.js';

/**
 * Load and run a level inside `container`.
 * Calls onComplete(levelId) when the student wins.
 *
 * @param {number} id
 * @param {HTMLElement} container
 * @param {(id: number) => void} onComplete
 */
export async function runLevel(id, container, onComplete) {
  // Dynamically import the level config
  let config;
  if (id >= 4) {
    // Levels 4-12 are exported as named exports from levels4-12.js
    const mod = await import(`./levels/levels4-12.js`);
    config = mod[`level${id}`];
  } else {
    // Levels 1-3 are default exports from individual files
    const mod = await import(`./levels/level${id}.js`);
    config = mod.default;
  }

  container.innerHTML = '';

  // ── Dr. Zoe hint box ──────────────────────────────────────────────────────
  const zoeBox = document.createElement('div');
  zoeBox.className = 'zoe-box';
  zoeBox.innerHTML = `
    <div class="zoe-avatar">🔬</div>
    <div>
      <div class="zoe-name">Dr. Zoe says:</div>
      <div class="zoe-text" id="zoe-text">${config.zoeIntro}</div>
    </div>
  `;
  container.appendChild(zoeBox);

  const setZoe = (msg) => { document.getElementById('zoe-text').textContent = msg; };

  // ── Field/results grid ────────────────────────────────────────────────────
  if (config.grid) {
    const gridSection = buildGrid(config.grid);
    container.appendChild(gridSection);
  }

  // ── Two-column layout: library | plant ────────────────────────────────────
  const twoCol = document.createElement('div');
  twoCol.className = 'two-col';
  twoCol.style.marginBottom = '1.5rem';

  // Gene library column
  const libCol = document.createElement('div');
  const libLabel = document.createElement('div');
  libLabel.className = 'section-label';
  libLabel.textContent = 'Gene library';
  libCol.appendChild(libLabel);
  const library = document.createElement('div');
  library.className = 'gene-library';
  config.genes.forEach(geneId => {
    library.appendChild(buildGeneChip(geneId, () => selectGene(geneId)));
  });
  libCol.appendChild(library);
  twoCol.appendChild(libCol);

  // Organism / slots column
  const orgCol = document.createElement('div');
  const orgLabel = document.createElement('div');
  orgLabel.className = 'section-label';
  orgLabel.textContent = config.organismLabel || 'Your organism';
  orgCol.appendChild(orgLabel);

  // Organism illustration (if provided)
  if (config.buildOrganism) {
    const artWrap = document.createElement('div');
    artWrap.style.cssText = 'display:flex;justify-content:center;margin-bottom:14px;';
    artWrap.id = 'organism-art-wrap';
    orgCol.appendChild(artWrap);
  }

  // Locked genes from previous levels (shown read-only)
  if (config.lockedGenes && config.lockedGenes.length) {
    const lockLabel = document.createElement('div');
    lockLabel.style.cssText = 'font-size:12px;color:var(--text-tertiary);margin-bottom:6px;';
    lockLabel.textContent = 'Genes from last level';
    const lockRow = document.createElement('div');
    lockRow.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;background:var(--bg);border-radius:8px;padding:8px;';
    config.lockedGenes.forEach(gid => {
      const g = GENES[gid];
      if (!g) return;
      const chip = document.createElement('span');
      chip.style.cssText = `font-size:12px;background:${g.bg};color:${g.color};border-radius:14px;padding:4px 10px;border:1px solid ${g.border};`;
      chip.textContent = g.label;
      lockRow.appendChild(chip);
    });
    orgCol.appendChild(lockLabel);
    orgCol.appendChild(lockRow);
  }

  // Slot count label
  const slotLabel = document.createElement('div');
  slotLabel.style.cssText = 'font-size:12px;color:var(--text-tertiary);margin-bottom:8px;';
  slotLabel.textContent = `Gene slots (pick ${config.slots})`;
  orgCol.appendChild(slotLabel);

  // Slots
  const slotsWrap = document.createElement('div');
  slotsWrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-bottom:14px;';
  const slotEls = [];
  for (let i = 0; i < config.slots; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.textContent = '+ add gene';
    slot.addEventListener('click', () => openSlot(i));
    slotsWrap.appendChild(slot);
    slotEls.push(slot);
  }
  orgCol.appendChild(slotsWrap);

  // Action buttons
  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';
  const growBtn = document.createElement('button');
  growBtn.className = 'btn btn-primary';
  growBtn.textContent = config.growLabel || 'Grow!';
  growBtn.disabled = true;
  growBtn.addEventListener('click', runSim);
  const resetBtn = document.createElement('button');
  resetBtn.className = 'btn';
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', resetAll);
  btnRow.appendChild(growBtn);
  btnRow.appendChild(resetBtn);
  orgCol.appendChild(btnRow);
  twoCol.appendChild(orgCol);
  container.appendChild(twoCol);

  // ── Simulation results section (hidden until Grow!) ───────────────────────
  const simSection = document.createElement('div');
  simSection.id = 'sim-section';
  simSection.style.display = 'none';
  container.appendChild(simSection);

  // ── State ─────────────────────────────────────────────────────────────────
  let chosen = new Array(config.slots).fill(null);
  let activeSlot = null;

  function openSlot(i) {
    if (chosen[i]) { removeGene(i); return; }
    activeSlot = i;
    slotEls.forEach((s, idx) => s.classList.toggle('highlight', idx === i));
    setZoe('Now click a gene from the library to put it here!');
  }

  function selectGene(geneId) {
    if (chosen.includes(geneId)) return;
    const targetSlot = activeSlot !== null ? activeSlot : chosen.indexOf(null);
    if (targetSlot === -1) return;
    placeGene(targetSlot, geneId);
    activeSlot = null;
    slotEls.forEach(s => s.classList.remove('highlight'));
  }

  function placeGene(idx, geneId) {
    chosen[idx] = geneId;
    const g = GENES[geneId];
    const el = slotEls[idx];
    el.textContent = g.label;
    el.classList.add('filled');
    el.style.cssText += `background:${g.bg};color:${g.color};border-color:${g.border};`;
    // Mark chip as used
    const chip = document.getElementById('chip-' + geneId);
    if (chip) chip.classList.add('used');

    const remaining = chosen.filter(x => !x).length;
    growBtn.disabled = remaining > 0;

    if (config.buildOrganism) {
      const wrap = document.getElementById('organism-art-wrap');
      if (wrap) wrap.innerHTML = config.buildOrganism(chosen.filter(Boolean));
    }
    setZoe(remaining > 0
      ? `Good choice! ${remaining} more gene${remaining > 1 ? 's' : ''} to add.`
      : `All ${config.slots} genes added — hit "${config.growLabel || 'Grow!'}" to see what happens!`
    );
    simSection.style.display = 'none';
  }

  function removeGene(i) {
    const old = chosen[i];
    if (!old) return;
    chosen[i] = null;
    const el = slotEls[i];
    el.textContent = '+ add gene';
    el.classList.remove('filled');
    el.style.background = el.style.color = el.style.borderColor = '';
    const chip = document.getElementById('chip-' + old);
    if (chip) chip.classList.remove('used');
    growBtn.disabled = true;
    simSection.style.display = 'none';
    if (config.buildOrganism) {
      const wrap = document.getElementById('organism-art-wrap');
      if (wrap) wrap.innerHTML = config.buildOrganism(chosen.filter(Boolean));
    }
    setZoe(config.zoeIntro);
  }

  function runSim() {
    const key = chosen.slice().sort().join(',');
    const result = config.outcomes[key] || config.defaultOutcome(chosen.filter(Boolean));
    simSection.style.display = 'block';

    // Animate grid if present
    if (config.grid && config.animateGrid) {
      config.animateGrid(result);
    }

    // Build stats
    simSection.innerHTML = buildSimHTML(result, config);

    // Wire "next level" button
    const nextBtn = document.getElementById('next-level-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => onComplete(config.id));
    }

    if (result.verdict === 'win') {
      setZoe(config.zoeWin || 'Amazing work, scientist!');
    } else if (result.verdict === 'fail') {
      setZoe(config.zoeFail || 'Hmm, that didn\'t work. Read the hint and try again!');
    } else {
      setZoe(config.zoeWarn || 'Getting closer! Read the hint carefully.');
    }
  }

  function resetAll() {
    chosen = new Array(config.slots).fill(null);
    activeSlot = null;
    slotEls.forEach(el => {
      el.textContent = '+ add gene';
      el.classList.remove('filled', 'highlight');
      el.style.background = el.style.color = el.style.borderColor = '';
    });
    config.genes.forEach(gid => {
      const chip = document.getElementById('chip-' + gid);
      if (chip) chip.classList.remove('used');
    });
    growBtn.disabled = true;
    simSection.style.display = 'none';
    if (config.buildOrganism) {
      const wrap = document.getElementById('organism-art-wrap');
      if (wrap) wrap.innerHTML = config.buildOrganism([]);
    }
    setZoe(config.zoeIntro);
  }

  // Init organism art
  if (config.buildOrganism) {
    const wrap = document.getElementById('organism-art-wrap');
    if (wrap) wrap.innerHTML = config.buildOrganism([]);
  }
}


// ── Shared component builders ─────────────────────────────────────────────────

function buildGeneChip(geneId, onClick) {
  const g = GENES[geneId];
  if (!g) return document.createElement('div');
  const chip = document.createElement('div');
  chip.className = 'gene-chip';
  chip.id = 'chip-' + geneId;
  chip.style.cssText = `background:${g.bg};color:${g.color};border-color:${g.border};`;
  chip.textContent = g.label;
  chip.addEventListener('click', onClick);
  return chip;
}

function buildGrid(gridConfig) {
  const section = document.createElement('div');
  section.className = 'card';
  section.style.marginBottom = '1.25rem';
  const label = document.createElement('div');
  label.className = 'section-label';
  label.textContent = gridConfig.label;
  section.appendChild(label);
  const grid = document.createElement('div');
  grid.className = 'field-grid';
  grid.id = 'result-grid';
  grid.style.gridTemplateColumns = `repeat(${gridConfig.cols}, 1fr)`;
  for (let i = 0; i < gridConfig.cols * gridConfig.rows; i++) {
    const cell = document.createElement('div');
    cell.className = 'field-cell';
    cell.id = `gc-${i}`;
    cell.style.cssText = `height:${gridConfig.cellHeight || 18}px;background:${gridConfig.defaultColor};`;
    grid.appendChild(cell);
  }
  section.appendChild(grid);
  if (gridConfig.legend) {
    const leg = document.createElement('div');
    leg.className = 'grid-legend';
    gridConfig.legend.forEach(item => {
      leg.innerHTML += `<span><span class="legend-dot" style="background:${item.color}"></span>${item.label}</span>`;
    });
    section.appendChild(leg);
  }
  return section;
}

function buildSimHTML(result, config) {
  const statsHTML = (config.stats || ['score', 'health', 'side']).map(statKey => {
    const stat = result.stats?.[statKey] || {};
    return `
      <div class="stat-card">
        <div class="stat-label">${stat.label || statKey}</div>
        <div class="stat-value">${stat.display || '—'}</div>
        <div class="bar-wrap">
          <div class="bar-fill" style="width:${stat.pct || 0}%;background:${stat.color || '#1D9E75'};"></div>
        </div>
      </div>`;
  }).join('');

  const winBtn = result.verdict === 'win'
    ? `<button id="next-level-btn" class="btn btn-primary">Continue ↗</button>`
    : `<button onclick="document.getElementById('sim-section').style.display='none'" class="btn">Try again</button>`;

  return `
    <div class="section-label">Results</div>
    <div class="sim-grid">${statsHTML}</div>
    <div class="feedback ${result.verdict}">
      <strong>${result.verdict === 'win' ? 'Mission complete!' : result.verdict === 'fail' ? 'Oops!' : 'Almost!'}</strong>
      ${result.msg}
    </div>
    <div class="btn-row">${winBtn}</div>
  `;
}
