import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  ////authDomain: 'ecommerce-academlo-d94c3.firebaseapp.com', -> No usaremos esto debido a que no tendremos un dominio
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE, // Usar el storageBucked para almacenar las imágenes
  ////messagingSenderId: '303980766820', -> Para trabajar en mensajes en tiempo real
  appId: process.env.FIREBASE_API_ID,
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export const storage: FirebaseStorage = getStorage(firebaseApp);

// UTIL: Download files from a firebase app path: https://firebase.google.com/docs/storage/web/download-files?hl=es&authuser=0
type GetUrlFn = (path: string) => Promise<string>;
export const getUrlFromFirebasePath: GetUrlFn = async fireabsePath => {
  // 1. Create a reference
  const pathReference = ref(storage, fireabsePath);
  // 2. Download data through the URL
  return await getDownloadURL(pathReference);
};
