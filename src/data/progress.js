// ── Student progress ──────────────────────────────────────────────────────────
// Persists completed level IDs in localStorage so progress survives page refresh.

const KEY = 'biobuilder_progress';

/**
 * Returns an object mapping levelId → true for every completed level.
 * @returns {Record<number, boolean>}
 */
export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

/**
 * Marks a level as complete and persists it.
 * @param {number} levelId
 */
export function markComplete(levelId) {
  const prog = getProgress();
  prog[levelId] = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(prog));
  } catch {
    // storage unavailable — progress won't persist this session
  }
}

/**
 * Resets all progress (useful for teacher demo / reset button).
 */
export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/**
 * Returns true if the given level has been completed.
 * @param {number} levelId
 * @returns {boolean}
 */
export function isComplete(levelId) {
  return !!getProgress()[levelId];
}
