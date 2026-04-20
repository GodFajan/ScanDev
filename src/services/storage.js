const APP_STORAGE_KEY = "scandev_app_state";
const SESSION_STORAGE_KEY = "scandev_session";

const initialState = {
  users: [],
  scans: [],
};

export function readAppState() {
  const raw = localStorage.getItem(APP_STORAGE_KEY);
  return raw ? JSON.parse(raw) : initialState;
}

export function writeAppState(state) {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
}

export function readSession() {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function writeSession(user) {
  if (!user) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}
