import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'; 
import { getAuth, GoogleAuthProvider, signInWithPopup } from 
'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'; 
import { getFirestore, doc, setDoc, getDoc } from 
'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'; 
// Firebase config 
const firebaseConfig = { 
apiKey: 'AIzaSyAdF68GHvwBMWlz_CpvJC3skKVpKx1sYMI', 
authDomain: 'money-in-the-bank-app.firebaseapp.com', 
projectId: 'money-in-the-bank-app', 
storageBucket: 'money-in-the-bank-app.appspot.com', 
messagingSenderId: '690852849677', 
appId: '1:690852849677:web:7bd6a3d3f70ee03dbb4d44', 
measurementId: 'G-W8P5268HS4' 
}; 
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 
const db = getFirestore(app); 
const provider = new GoogleAuthProvider(); 
// DOM elements 
const googleBtn = document.getElementById('googleBtn'); 
const usernameBox = document.getElementById('usernameBox'); 
const username = document.getElementById('username'); 
const saveBtn = document.getElementById('saveBtn'); 
const msg = document.getElementById('msg'); 
const progress = document.getElementById('loginProgress'); 
 
// Google login 
googleBtn.onclick = async () => { 
    try { 
        progress.style.width = '20%'; 
        const res = await signInWithPopup(auth, provider); 
        localStorage.setItem('email', res.user.email); 
        googleBtn.classList.add('hidden'); 
        usernameBox.classList.remove('hidden'); 
        progress.style.width = '50%'; 
        msg.textContent = 'Choose a username'; 
    } catch(e) { 
        console.error(e); 
        msg.textContent = 'Login failed. Check Firebase config & Authorized Domains'; 
    } 
}; 
 
// Save username 
saveBtn.onclick = async () => { 
    const uname = username.value.trim().toLowerCase(); 
    if(!uname){ msg.textContent='Enter a username'; return; } 
    const ref = doc(db,'users',uname); 
    const snap = await getDoc(ref); 
if(snap.exists()){ msg.textContent='Username already taken'; return; } 
await setDoc(ref,{email:localStorage.getItem('email'),createdAt:new 
Date().toISOString()}); 
localStorage.setItem('username', uname); 
progress.style.width = '100%'; 
setTimeout(()=> location.href='index.html', 500); 
}; 
