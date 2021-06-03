// Below is a code that we need for google authentication.
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA78YeMR2DNt5hz6pnB8Z_UyXvJvVHXQQM",
    authDomain: "crawn-db-10173.firebaseapp.com",
    databaseURL: "https://crawn-db-10173-default-rtdb.firebaseio.com",
    projectId: "crawn-db-10173",
    storageBucket: "crawn-db-10173.appspot.com",
    messagingSenderId: "1015852155472",
    appId: "1:1015852155472:web:7d05bbba97613cf0550755",
    measurementId: "G-GT405GBS40"
  };


export const createUserProfileDocument = async(userAuth, additionalData)=>{
  if(! userAuth) return;



  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot= await userRef.get();
  console.log(snapShot);
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message); 
    }
  }
  return userRef;
  

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  console.log("outside foreEachloop");
  objectsToAdd.forEach(obj=>{
    console.log("Inside foreEachloop firebase.utils");
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });



  return await batch.commit();
}

export const convertCollectionsSnapshotToMap=(collections)=>{
  const transformedCollection = collections.docs.map(doc=>{
    const {title, items} = doc.data();
    return{
      routeName: encodeURI(title.toLowerCase()),
      
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()]= collection;
    return accumulator;
  }, {})

  
}

export const getCurrentUser=()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
