import { initializeApp } from 'firebase';

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyD2H7NEIWw65fnV4zYUCIzRnpe_KFRm9NM",
  authDomain: "todo-list-3baa5.firebaseapp.com",
  databaseURL: "https://todo-list-3baa5.firebaseio.com",
  projectId: "todo-list-3baa5",
  storageBucket: "todo-list-3baa5.appspot.com",
  messagingSenderId: "204201119855"
})

export const db = app.database();
export const namesRef = db.ref('todo-list');
