import { User } from '../../interfaces';
import { auth, db } from '../../configs/firebase';

export async function getAuthDataFromEmailSignIn(payload: {email: string, password: string}) {
  const res = await auth.signInWithEmailAndPassword(payload.email, payload.password);
  return res;
}

export async function getAuthDataFromEmailSignUp(payload: {email: string, password: string}) {
  const res = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
  return res;
}

export async function signOut() {
  const res = await auth.signOut();
  return res;
}

export async function createNewUserInDB(user: User) {
  const newUserRef = db.collection('users').doc(`${user?.uid}`);
  const res = await newUserRef.set({
    userId: user?.uid,
    email: user?.email,
    photo: user?.photo,
  });
  return res;
}
