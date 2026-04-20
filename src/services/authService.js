import { hasSupabase, supabase } from "./supabaseClient";
import { readAppState, readSession, writeAppState, writeSession } from "./storage";

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "Product Engineer",
  };
}

export function getCurrentUser() {
  return readSession();
}

export async function signupUser({ name, email, password }) {
  if (hasSupabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: "Product Engineer",
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    const user = sanitizeUser({
      id: data.user.id,
      name,
      email,
      role: "Product Engineer",
    });
    writeSession(user);
    return user;
  }

  const state = readAppState();
  const existing = state.users.find((user) => user.email === email);

  if (existing) {
    throw new Error("An account already exists for this email.");
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role: "Product Engineer",
  };

  writeAppState({
    ...state,
    users: [user, ...state.users],
  });

  const sessionUser = sanitizeUser(user);
  writeSession(sessionUser);
  return sessionUser;
}

export async function loginUser({ email, password }) {
  if (hasSupabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const sessionUser = sanitizeUser({
      id: data.user.id,
      name: data.user.user_metadata.name || "ScanDev User",
      email: data.user.email,
      role: data.user.user_metadata.role || "Product Engineer",
    });
    writeSession(sessionUser);
    return sessionUser;
  }

  const state = readAppState();
  const existing = state.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!existing) {
    throw new Error("Invalid email or password.");
  }

  const sessionUser = sanitizeUser(existing);
  writeSession(sessionUser);
  return sessionUser;
}

export async function logoutUser() {
  if (hasSupabase) {
    await supabase.auth.signOut();
  }

  writeSession(null);
}
