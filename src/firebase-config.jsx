// Firebase config file

// -------
// Imports
// -------
// - firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// This file represent all the data we need in order
// to connect to our firebase project, database, etc.

// Web app Firebase configuration

// ! NOTE :
// As an option for hidding sensitive info you can use
// enviroment variables (for mini-projects), but, in
// production code only hide sensitive information
// into backend (This option below is not secure for
// production.)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// ------------------------------------------------

// Here we're connecting our firebase with the app.
const app = initializeApp(firebaseConfig);

// ------------------------------------------------
// Connect to our firebase database,
// and export the variable, cause we're
// going to use it in another file
export const db = getFirestore(app);
