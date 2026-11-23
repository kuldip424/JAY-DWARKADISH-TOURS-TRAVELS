// Saves the logged-in user and admin sessions in localStorage,
// so they survive a page refresh. Used by the auth store and useAuth hook.
// Every storage call is guarded: if the browser blocks storage,
// the session simply lasts until the page is refreshed.
const USER_KEY = 'user';
const ADMIN_KEY = 'admin_user';

const read = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value?.token ? value : null; // a session without a token is not a login
  } catch {
    return null;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage blocked
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // storage blocked
  }
};

export const session = {
  getUser: () => read(USER_KEY),
  setUser: (user) => save(USER_KEY, user),
  clearUser: () => remove(USER_KEY),

  getAdmin: () => read(ADMIN_KEY),
  setAdmin: (admin) => save(ADMIN_KEY, admin),
  clearAdmin: () => remove(ADMIN_KEY),
};
