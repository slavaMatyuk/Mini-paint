import { auth, db } from '../../configs/firebase';

export async function getAuthDataFromEmailSignIn(payload: {email: string, password: string}) {
  const res = await auth.signInWithEmailAndPassword(payload.email, payload.password);
  return res;
}

export async function getAuthDataFromEmailSignUp(payload: {email: string, password: string}) {
  const res: any = await auth.createUserWithEmailAndPassword(payload.email, payload.password).then((userCredential) => {
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

// export async function createNewUserInDB(user: DBcreateUserResponse) {
//   const newUserRef = db.collection('users').doc(`${user.userID}`);
//   const res = await newUserRef.set({
//     userID: user.userID,
//     userName: user.userName,
//     images: user.images,
//   });
//   return res;
// }
