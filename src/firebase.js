// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHHUwS8znLcZkJsY5-K-c0RooO0nd95ec",
  authDomain: "genshinteambuilderdata2.firebaseapp.com",
  databaseURL: "https://genshinteambuilderdata2-default-rtdb.firebaseio.com",
  projectId: "genshinteambuilderdata2",
  storageBucket: "genshinteambuilderdata2.appspot.com",
  messagingSenderId: "634570114910",
  appId: "1:634570114910:web:a72ed6aaeaca7a6e88f1cf",
  measurementId: "G-NHPM80W4SW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
