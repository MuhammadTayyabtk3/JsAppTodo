import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, remove, update, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyALJF_Zb7tD4qJb_ilfLNY4gDkYyUxXrTE",
    authDomain: "todoapp-bd61c.firebaseapp.com",
    databaseURL: "https://todoapp-bd61c-default-rtdb.firebaseio.com", // Corrected URL
    projectId: "todoapp-bd61c",
    storageBucket: "todoapp-bd61c.appspot.com",
    messagingSenderId: "61263658944",
    appId: "1:61263658944:web:169a59218c907839e35225",
    measurementId: "G-3LJ9CKZ6VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Export Firebase Functions
export { ref, push, remove, update, onValue };
