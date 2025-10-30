import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

const firebaseConfig = {"storageBucket":"money-in-the-bank-app.appspot.com","apiKey":"AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA","messagingSenderId":"690852849677","authDomain":"money-in-the-bank-app.firebaseapp.com","projectId":"money-in-the-bank-app","appId":"1:690852849677:web:7bd6a3d3f70ee03dbb4d44","measurementId":"G-W8P5268HS4"};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const splash = document.getElementById('splash');
const authDiv = document.getElementById('auth');
const home = document.getElementById('home');
const googleBtn = document.getElementById('googleBtn');
const loading = document.getElementById('loading');
const usernameSection = document.getElementById('usernameSection');
const usernameInput = document.getElementById('usernameInput');
const saveUsername = document.getElementById('saveUsername');
const welcomeMsg = document.getElementById('welcomeMsg');
const userInfo = document.getElementById('userInfo');
const signOutBtn = document.getElementById('signOutBtn');

const show = el => el.classList.remove('hidden');
const hide = el => el.classList.add('hidden');

// Splash → Auth after 3 seconds
window.addEventListener('load', () => {
  setTimeout(() => {
    hide(splash);
    show(authDiv);
  }, 3000);
});

// Google Sign-in
googleBtn.addEventListener('click', async () => {
  try {
    hide(googleBtn);
    show(loading);
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const ref = doc(db, 'users', user.email);
    const snap = await getDoc(ref);
    hide(loading);

    if (snap.exists()) {
      hide(authDiv);
      show(home);
      welcomeMsg.textContent = 'Welcome back, ' + (snap.data().username || user.displayName || user.email) + '!';
      userInfo.textContent = user.email;
    } else {
      window._newEmail = user.email;
      show(usernameSection);
    }
  } catch (err) {
    alert('Sign-in failed: ' + err.message);
    show(googleBtn);
    hide(loading);
  }
});

// Save Username
saveUsername.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  if (!username) return alert('Enter a username first!');
  await setDoc(doc(db, 'users', window._newEmail), {
    username,
    email: window._newEmail,
    createdAt: new Date().toISOString()
  });
  hide(authDiv);
  show(home);
  welcomeMsg.textContent = 'Welcome, ' + username + '!';
  userInfo.textContent = window._newEmail;
});

// Sign Out
signOutBtn.addEventListener('click', async () => {
  await signOut(auth);
  hide(home);
  show(authDiv);
  show(googleBtn);
});
