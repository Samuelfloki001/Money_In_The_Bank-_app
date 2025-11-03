import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDi2_nhoZ0WY0Jwv4BkD9HL6_ZOS8bG0so',
  authDomain: 'money-in-the-bank-f0c53.firebaseapp.com',
  projectId: 'money-in-the-bank-f0c53',
  storageBucket: 'money-in-the-bank-f0c53.appspot.com',
  messagingSenderId: '429059379127',
  appId: '1:429059379127:web:defaultAppId'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById('googleLoginBtn');
const btnText = document.getElementById('btnText') || null;
const status = document.getElementById('status');
const userBox = document.getElementById('userBox');
const usernameInput = document.getElementById('username');
const saveBtn = document.getElementById('saveBtn');

function setStatus(t){ if(status) status.textContent = t; }

googleBtn.addEventListener('click', async () => {
  googleBtn.disabled = true;
  if(btnText) btnText.textContent = 'Opening Google…';
  setStatus('Opening Google sign-in popup...');
  try{
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Signed in:', user.email);
    setStatus('Signed in: ' + (user.email || 'unknown'));
    userBox.style.display = 'flex';
    usernameInput.value = user.displayName || localStorage.getItem('username') || '';
    if(btnText) btnText.textContent = 'Continue with Google';
    googleBtn.style.display = 'none';
  }catch(err){
    console.error('Sign-in failed', err);
    alert('Sign-in failed: ' + (err.message || err));
    setStatus('Sign-in failed. Try again.');
    googleBtn.disabled = false;
    if(btnText) btnText.textContent = 'Continue with Google';
  }
});

saveBtn.addEventListener('click', async () => {
  const val = (usernameInput.value || '').trim();
  if(!val){ alert('Enter a username'); return; }
  localStorage.setItem('username', val);
  localStorage.setItem('displayName', val);
  window.location.href = 'homepage.html';
});

window.firebaseSignOut = async function(){
  try{
    await fbSignOut(auth);
    localStorage.removeItem('username');
    localStorage.removeItem('displayName');
  }catch(e){
    console.warn('SignOut failed', e);
  }
};
