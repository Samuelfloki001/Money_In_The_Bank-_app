import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAdF68GHvwBMWlz_CpvJC3skKVpKx1sYMI',
  authDomain: 'money-in-the-bank-app.firebaseapp.com',
  projectId: 'money-in-the-bank-app',
  storageBucket: 'money-in-the-bank-app.firebasestorage.app',
  messagingSenderId: '690852849677',
  appId: '1:690852849677:web:7bd6a3d3f70ee03dbb4d44',
  measurementId: 'G-W8P5268HS4'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById('googleBtn');
const usernameBox = document.getElementById('usernameBox');
const username = document.getElementById('username');
const saveBtn = document.getElementById('saveBtn');
const msg = document.getElementById('msg');
const progressBar = document.getElementById('progressBar');
const splash = document.getElementById('splash');
const loginContainer = document.querySelector('.loginContainer');

window.addEventListener('DOMContentLoaded',()=>{
  // show splash then login
  let v=0;
  const t=setInterval(()=>{
    v += 20;
    if(v>100) v=100;
    progressBar.style.width = v + '%';
    if(v===100){ clearInterval(t); splash.classList.add('hidden'); loginContainer.classList.remove('hidden'); }
  },300);
});

googleBtn.onclick = async () => {
  try {
    progressBar.style.width = '20%';
    const res = await signInWithPopup(auth, provider);
    localStorage.setItem('email', res.user.email);
    googleBtn.classList.add('hidden');
    usernameBox.classList.remove('hidden');
    progressBar.style.width = '50%';
    msg.textContent = 'Choose a username';
  } catch(e) {
    console.error(e);
    msg.textContent = 'Login failed. Check Firebase config & Authorized Domains';
  }
};

saveBtn.onclick = async () => {
  const uname = username.value.trim().toLowerCase();
  if(!uname){ msg.textContent = 'Enter a username'; return; }
  const ref = doc(db, 'users', uname);
  const snap = await getDoc(ref);
  if(snap.exists()){ msg.textContent = 'Username taken'; return; }
  await setDoc(ref, { email: localStorage.getItem('email') || null, createdAt: new Date().toISOString() });
  localStorage.setItem('username', uname);
  progressBar.style.width = '100%';
  setTimeout(()=> location.href = 'homepage.html', 500);
};
