import { User } from '../../interfaces';
import { auth, db } from './index';

export async function getAuthDataFromEmailSignIn(email: string, password: string) {
  const res = await auth.signInWithEmailAndPassword(email, password);
  return res;
}

export async function getAuthDataFromEmailSignUp(email: string, password: string) {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  return res;
}

export async function signOut() {
  const res = await auth.signOut();
  return res;
}

export async function createNewUserInDB(user: User) {
  const newUserRef = db.collection('users').doc(`${user!.uid}`);
  const res = await newUserRef.set({
    userId: user!.uid,
    email: user!.email,
    photo: user!.photo,
  });
  return res;
}
