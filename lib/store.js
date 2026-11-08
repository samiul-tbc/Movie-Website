// Client-side local stores (no account / database needed):
//  - Continue Watching progress: hcm_progress_v1
//  - My List bookmarks:          hcm_mylist_v1
//  - Drama requests:             hcm_requests_v1
// All helpers are SSR-safe (they no-op on the server).

const PROGRESS_KEY = 'hcm_progress_v1';
const MYLIST_KEY = 'hcm_mylist_v1';
const REQUESTS_KEY = 'hcm_requests_v1';

function read(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / private mode — ignore
  }
}

/* ---------- Continue Watching ---------- */

export function getProgress() {
  const list = read(PROGRESS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveProgress({ slug, ep, q }) {
  if (!slug || !ep) return;
  const rest = getProgress().filter((p) => p.slug !== slug);
  const next = [{ slug, ep, q: q === '1080' ? '1080' : '720', ts: Date.now() }, ...rest];
  write(PROGRESS_KEY, next.slice(0, 12));
}

export function removeProgress(slug) {
  write(PROGRESS_KEY, getProgress().filter((p) => p.slug !== slug));
}

/* ---------- My List ---------- */

export function getMyList() {
  const list = read(MYLIST_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function isInMyList(slug) {
  return getMyList().includes(slug);
}

export function toggleMyList(slug) {
  const list = getMyList();
  const next = list.includes(slug)
    ? list.filter((s) => s !== slug)
    : [slug, ...list];
  write(MYLIST_KEY, next);
  return next.includes(slug);
}

/* ---------- Drama requests ---------- */

export function getRequests() {
  const list = read(REQUESTS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function addRequest(req) {
  const next = [{ id: Date.now(), ...req }, ...getRequests()];
  write(REQUESTS_KEY, next.slice(0, 20));
  return next;
}

export function removeRequest(id) {
  write(REQUESTS_KEY, getRequests().filter((r) => r.id !== id));
}
