// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvQeJDDGm0M53h1F184OP6DfgKKkh8tlA",
    authDomain: "smartparking-5ba93.firebaseapp.com",
    projectId: "smartparking-5ba93",
    storageBucket: "smartparking-5ba93.firebasestorage.app",
    messagingSenderId: "267430264226",
    appId: "1:267430264226:web:6ef89e51c4ec2c24a1c6fb",
    measurementId: "G-J1L0NKZE0H"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics(app);

// Initialize Functions
const functions = firebase.functions(); 