// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  orderBy,
  serverTimestamp,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  getDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBX7geAVYkpg6-kpPYruUBJSQne7z83Tso",
  authDomain: "fir-project-ddbe6.firebaseapp.com",
  projectId: "fir-project-ddbe6",
  storageBucket: "fir-project-ddbe6.appspot.com",
  messagingSenderId: "879001329445",
  appId: "1:879001329445:web:3fe1d49e9ebb644a2d04cc",
  measurementId: "G-2CGHY2TCLB",
};

//   initialize firebase app
initializeApp(firebaseConfig);

//   init Services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, "Books");

// query

const q = query(colRef, orderBy("createdAt"));

// get collection data

onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});
// add documents

const addForm = document.querySelector(".add");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addForm.title.value,
    author: addForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addForm.reset();
  });
});

const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docref = doc(db, "Books", deleteForm.id.value);
  deleteDoc(docref).then(() => {
    deleteForm.reset();
  });
});

const docRef = doc(db, "Books", "X8ndxOb8pgT28U9zdCyT");
getDoc(docRef).then((doc) => {
  console.log(doc.data(), doc.id);
});
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docref = doc(db, "Books", updateForm.id.value);

  updateDoc(docref, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      console.log("user sign out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email,password)
  .then((cred) =>{
      console.log('user logged in', cred.user);
  })
  .catch((err) =>{
      console.log(err.message);
  })
});
