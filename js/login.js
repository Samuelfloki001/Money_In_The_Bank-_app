import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// --- Firebase configuration for Money In The Bank ---
const firebaseConfig = {
  apiKey: "AIzaSyDi2_nhoZ0WY0Jwv4BkD9HL6_ZOS8bG0so",
  authDomain: "money-in-the-bank-f0c53.firebaseapp.com",
  projectId: "money-in-the-bank-f0c53",
  storageBucket: "money-in-the-bank-f0c53.appspot.com",
  messagingSenderId: "429059379127",
  appId: "1:429059379127:web:defaultAppId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- Elements ---
const googleLoginBtn = document.getElementById('googleLogin');
const userBox = document.getElementById('userBox');
const okBtn = document.getElementById('okBtn');
const usernameInput = document.getElementById('usernameInput');

// --- Google Login ---
googleLoginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("✅ Logged in as:", user.email);
      googleLoginBtn.style.display = "none";
      userBox.style.display = "block";
    })
    .catch((error) => {
      console.error("❌ Login error:", error.message);
      alert("Login failed. Try again.");
    });
});

// --- Username Entry + Redirect ---
okBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  localStorage.setItem("username", username);
  window.location.href = "homepage.html";
});
