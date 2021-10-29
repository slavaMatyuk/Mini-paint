import { auth, db } from '../../configs/firebase';

export async function getAuthDataFromEmailSignIn(payload: {email: string, password: string}) {
  const res = await auth.signInWithEmailAndPassword(payload.email, payload.password);
  return res;
}

export async function getAuthDataFromEmailSignUp(payload: {email: string, password: string}) {
  const res = await auth.createUserWithEmailAndPassword(payload.email, payload.password).then((userCredential) => {
    db.collection('users').doc(userCredential.user?.uid).set({
      userID: userCredential.user?.uid,
      userName: userCredential.user?.email,
      images: [],
    });
  });
  return res;
}

export async function signOut() {
  const res = await auth.signOut();
  return res;
}
