import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';  
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';        

const firebaseConfig = {
  apiKey:'AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA',
  authDomain:'money-in-the-bank-app.firebaseapp.com',
  projectId:'money-in-the-bank-app',
  storageBucket:'money-in-the-bank-app.firebasestorage.app',
  messagingSenderId:'690852849677',
  appId:'1:690852849677:web:7bd6a3d3f70ee03dbb4d44',
  measurementId:'G-W8P5268HS4'
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

googleBtn.onclick = async () => {
  try {
    const res = await signInWithPopup(auth, provider);       
    localStorage.setItem('email', res.user.email);
    googleBtn.classList.add('hidden');
    usernameBox.classList.remove('hidden');
    msg.textContent = 'Choose a username';
  } catch(e) { msg.textContent = 'Login failed'; }
};

saveBtn.onclick = async () => {
  const uname = username.value.trim().toLowerCase();
  if(!uname){ msg.textContent='Enter a username'; return; }  
  const ref = doc(db,'users',uname);
  const snap = await getDoc(ref);
  if(snap.exists()){ msg.textContent='Username taken'; return; }
  await setDoc(ref,{email:localStorage.getItem('email'),createdAt:new Date().toISOString()});
  localStorage.setItem('username', uname);
  location.href='homepage.html';
};
