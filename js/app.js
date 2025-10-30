import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

// Firebase config embedded from PowerShell
const firebaseConfig = {"storageBucket":"money-in-the-bank-app.appspot.com","apiKey":"AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA","messagingSenderId":"690852849677","authDomain":"money-in-the-bank-app.firebaseapp.com","projectId":"money-in-the-bank-app","appId":"1:690852849677:web:7bd6a3d3f70ee03dbb4d44","measurementId":"G-W8P5268HS4"};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// elements
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

function show(el){ if (el) el.classList.remove('hidden'); }
function hide(el){ if (el) el.classList.add('hidden'); }

// 1) Splash -> auth after 3s
window.addEventListener('load', () => {
  setTimeout(() => {
    hide(splash);
    show(authDiv);
    // set focus to Google button so keyboard users can press enter
    const b = document.getElementById('googleBtn');
    if (b) b.focus();
  }, 3000);
});

// 2) Google sign-in flow
googleBtn.addEventListener('click', async () => {
  try {
    hide(googleBtn);
    show(loading);

    if (!navigator.onLine) {
      alert('You are offline. Connect to the internet and try again.');
      show(googleBtn);
      hide(loading);
      return;
    }

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email;

    // check Firestore for existing user document (keyed by email)
    const ref = doc(db, 'users', email);
    const snapshot = await getDoc(ref);

    hide(loading);

    if (snapshot.exists()) {
      // existing user -> home
      hide(authDiv);
      show(home);
      const uname = snapshot.data().username || user.displayName || email;
      welcomeMsg.textContent = 'Welcome back, ' + uname + '!';
      userInfo.textContent = email;
    } else {
      // new user -> request username
      window._mib_pendingEmail = email;
      show(usernameSection);
      usernameInput.focus();
    }
  } catch (err) {
    console.error('Sign-in error', err);
    alert('Sign-in failed: ' + (err && err.message ? err.message : err));
    show(googleBtn);
    hide(loading);
  }
});

// 3) Save username for new users
saveUsername.addEventListener('click', async () => {
  const username = (usernameInput.value || '').trim();
  if (!username) { alert('Please enter a username'); usernameInput.focus(); return; }

  const emailKey = window._mib_pendingEmail;
  if (!emailKey) { alert('Session expired — please sign in again'); return; }

  // write simple user record keyed by email
  await setDoc(doc(db, 'users', emailKey), {
    username: username,
    email: emailKey,
    createdAt: new Date().toISOString()
  });

  hide(authDiv);
  show(home);
  welcomeMsg.textContent = 'Welcome, ' + username + '!';
  userInfo.textContent = emailKey;
});

// 4) Sign-out
signOutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (e) { console.warn('signOut error', e); }
  hide(home);
  show(authDiv);
  show(googleBtn);
  hide(usernameSection);
  usernameInput.value = '';
  window._mib_pendingEmail = null;
});
