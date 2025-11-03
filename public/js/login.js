import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAdF68GHvwBMWlz_CpvJC3skKVpKx1sYMI',
  authDomain: 'money-in-the-bank-app.firebaseapp.com',
  projectId: 'money-in-the-bank-app',
  storageBucket: 'money-in-the-bank-app.appspot.com',
  messagingSenderId: '690852849677',
  appId: '1:690852849677:web:defaultAppId'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const googleLoginBtn = document.getElementById('googleLogin');
const userBox = document.getElementById('userBox');
const okBtn = document.getElementById('okBtn');
const usernameInput = document.getElementById('usernameInput');

googleLoginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem('userEmail', result.user.email);
      googleLoginBtn.style.display = 'none';
      userBox.style.display = 'block';
    })
    .catch(err => alert('Login failed: ' + err.message));
});

okBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  if (!username) return alert('Please enter a username.');
  const userEmail = localStorage.getItem('userEmail');

  const userRef = doc(db, 'users', username);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    alert('Username already taken. Try another.');
    return;
  }

  await setDoc(userRef, { email: userEmail, created: new Date().toISOString() });
  localStorage.setItem('username', username);
  window.location.href = 'homepage.html';
});
