import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCWbbz9SlQb5zpsN63ubHX_CeqZX2rMIb4",
    authDomain: "coodesh-store-list-app.firebaseapp.com",
    projectId: "coodesh-store-list-app",
    storageBucket: "coodesh-store-list-app.appspot.com",
    messagingSenderId: "893568188474",
    appId: "1:893568188474:web:63f63e944c359e749eb503"
  };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app)