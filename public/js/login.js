import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA',
  authDomain: 'money-in-the-bank-app.firebaseapp.com',
  projectId: 'money-in-the-bank-app',
  storageBucket: 'money-in-the-bank-app.firebasestorage.app',
  messagingSenderId: '690852849677',
  appId: '1:690852849677:web:7bd6a3d3f70ee03dbb4d44',
  measurementId: 'G-W8P5268HS4'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById('googleBtn');
const msg = document.getElementById('msg');

googleBtn.onclick = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const name = res.user.displayName;
    localStorage.setItem('username', name);
    location.href = 'homepage.html';
  } catch(e) {
    msg.textContent = 'Login failed';
  }
};
