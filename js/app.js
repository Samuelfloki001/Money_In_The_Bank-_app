import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

const config = {"storageBucket":"money-in-the-bank-app.appspot.com","apiKey":"AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA","messagingSenderId":"690852849677","authDomain":"money-in-the-bank-app.firebaseapp.com","projectId":"money-in-the-bank-app","appId":"1:690852849677:web:7bd6a3d3f70ee03dbb4d44","measurementId":"G-W8P5268HS4"};
const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const splash = document.getElementById('splash');
const authDiv = document.getElementById('auth');
const googleBtn = document.getElementById('googleBtn');
const loading = document.getElementById('loading');
const home = document.getElementById('home');
const welcomeMsg = document.getElementById('welcomeMsg');
const signOutBtn = document.getElementById('signOutBtn');

// splash → login after 3s
window.addEventListener('load', () => {
  setTimeout(() => {
    splash.classList.add('hidden');
    authDiv.classList.remove('hidden');
  }, 3000);
});

// Google sign-in
googleBtn.addEventListener('click', async () => {
  googleBtn.classList.add('hidden');
  loading.classList.remove('hidden');
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    authDiv.classList.add('hidden');
    home.classList.remove('hidden');
    welcomeMsg.textContent = 'Welcome ' + (user.displayName || user.email);
  } catch (e) {
    alert('Authentication failed: ' + e.message);
    googleBtn.classList.remove('hidden');
    loading.classList.add('hidden');
  }
});

// Sign-out
signOutBtn.addEventListener('click', async () => {
  await signOut(auth);
  home.classList.add('hidden');
  authDiv.classList.remove('hidden');
});
