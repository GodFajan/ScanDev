import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth, hasFirebase } from "./firebaseClient";
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

export function subscribeToAuthChanges(callback) {
  if (!hasFirebase || !firebaseAuth) {
    callback(readSession());
    return () => {};
  }

  return onAuthStateChanged(firebaseAuth, (firebaseUser) => {
    if (!firebaseUser) {
      writeSession(null);
      callback(null);
      return;
    }

    const sessionUser = sanitizeUser({
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "ScanDev User",
      email: firebaseUser.email,
      role: "Product Engineer",
    });
    writeSession(sessionUser);
    callback(sessionUser);
  });
}

export async function signupUser({ name, email, password }) {
  if (hasFirebase && firebaseAuth) {
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await updateProfile(credential.user, { displayName: name });

    const user = sanitizeUser({
      id: credential.user.uid,
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
  if (hasFirebase && firebaseAuth) {
    const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);

    const sessionUser = sanitizeUser({
      id: credential.user.uid,
      name: credential.user.displayName || "ScanDev User",
      email: credential.user.email,
      role: "Product Engineer",
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
  if (hasFirebase && firebaseAuth) {
    await signOut(firebaseAuth);
  }

  writeSession(null);
}
