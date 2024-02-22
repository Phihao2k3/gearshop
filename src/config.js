const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref: storageRef,
  getDownloadURL,
  listAll,
  uploadBytes,
} = require("firebase/storage");
const {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
  push,
  limitToFirst,
  limitToLast,
  startAt,
  startAfter,
  endAt,
  endBefore,
  equalTo,
  query,
  orderByChild 
} = require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyBGs3XcdD9B9LJRlZfx4FPjXoTeUtZ9t7Y",
  authDomain: "poly-shop-fe14f.firebaseapp.com",
  databaseURL: "https://poly-shop-fe14f-default-rtdb.firebaseio.com",
  projectId: "poly-shop-fe14f",
  storageBucket: "poly-shop-fe14f.appspot.com",
  messagingSenderId: "514849430505",
  appId: "1:514849430505:web:2232b780a465fe01198978",
  measurementId: "G-020LRDXKGR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lấy đường dẫn URL để tải hình ảnh

module.exports = {
  db,
  ref,
  set,
  get,
  child,
  onValue,
  getStorage,
  storageRef,
  getDownloadURL,
  listAll,
  uploadBytes,
  push,
  limitToFirst,
  limitToLast,
  startAt,
  startAfter,
  endAt,
  endBefore,
  equalTo,
  query,
  orderByChild,
};
