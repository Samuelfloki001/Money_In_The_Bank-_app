//// js/login.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

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
const provider = new GoogleAuthProvider();

const googleLoginBtn = document.getElementById('googleLogin');
const userBox = document.getElementById('userBox');
const okBtn = document.getElementById('okBtn');
const usernameInput = document.getElementById('usernameInput');

googleLoginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      googleLoginBtn.style.display = 'none';
      userBox.style.display = 'block';
    })
    .catch((error) => {
      alert('Login failed. Try again.');
      console.error(error);
    });
});

okBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert('Please enter a username.');
    return;
  }
  localStorage.setItem('username', username);
  window.location.href = 'homepage.html';
});
