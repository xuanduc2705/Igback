import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyANV6rDt49GXTo4jneVGNu_w1Qsk8G6fuM",
  authDomain: "insta-cee90.firebaseapp.com",
  projectId: "insta-cee90",
  storageBucket: "insta-cee90.appspot.com",
  messagingSenderId: "828888752375",
  appId: "1:828888752375:web:91312ef6360fbfdda373f2",
  measurementId: "G-TSVL2YVHQ7",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
