# =============================================================
# 💰 MONEY IN THE BANK – FIXED STABLE BUILD (v14)
# =============================================================
$ErrorActionPreference = "Stop"

$projectPath = "C:\Users\Admin\OneDrive\Documents\Money_In_The_Bank-app"
$githubUser  = "Samuelfloki001"
$repoName    = "Money_In_The_Bank-_app"
$branch      = "main"
$splashName  = "WIN_20251001_15_59_16_Pro.png"

$firebaseConfig = @{
  apiKey = "AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA"
  authDomain = "money-in-the-bank-app.firebaseapp.com"
  projectId = "money-in-the-bank-app"
  storageBucket = "money-in-the-bank-app.appspot.com"
  messagingSenderId = "690852849677"
  appId = "1:690852849677:web:7bd6a3d3f70ee03dbb4d44"
  measurementId = "G-W8P5268HS4"
}

$dirs = @("$projectPath", "$projectPath\css", "$projectPath\js", "$projectPath\images")
foreach ($d in $dirs) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d | Out-Null } }

# HTML
$indexHtml = @"
<!doctype html>
<html lang='en'>
<head>
<meta charset='utf-8' />
<meta name='viewport' content='width=device-width,initial-scale=1' />
<title>Money In The Bank</title>
<link rel='stylesheet' href='css/style.css' />
</head>
<body>
<div id='splash' class='screen'>
  <img src='images/$splashName' alt='Splash' />
  <h1>💰 Money In The Bank</h1>
</div>

<div id='auth' class='screen hidden'>
  <h2>Sign in with Google</h2>
  <button id='googleBtn' class='googleBtn'>🔑 Sign in with Google</button>
  <div id='loading' class='hidden'>Verifying your account...</div>
</div>

<div id='home' class='screen hidden'>
  <h1>Welcome!</h1>
  <p id='welcomeMsg'></p>
  <button id='signOutBtn'>Sign Out</button>
</div>

<script type='module' src='js/app.js'></script>
</body>
</html>
"@
Set-Content "$projectPath\index.html" $indexHtml -Encoding UTF8

# CSS
$css = @"
:root { --bg:#003d00; --accent:#00b26a; --white:#fff; }
body,html { margin:0; height:100%; font-family:Arial,Helvetica,sans-serif; }
.screen { display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh;
  background:linear-gradient(135deg,var(--bg),var(--accent)); color:var(--white); text-align:center; }
.hidden { display:none; }
.googleBtn { padding:12px 20px; border:none; border-radius:8px; background:var(--white); color:var(--bg);
  font-weight:600; cursor:pointer; }
img { max-width:70%; border-radius:12px; box-shadow:0 4px 14px rgba(0,0,0,0.4); margin-bottom:12px; }
"@
Set-Content "$projectPath\css\style.css" $css -Encoding UTF8

# JS
$firebaseJson = ($firebaseConfig | ConvertTo-Json -Compress)
$js = @"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

const config = $firebaseJson;
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
"@
Set-Content "$projectPath\js\app.js" $js -Encoding UTF8

# Splash image
$splashPath = "$projectPath\images\$splashName"
if (-not (Test-Path $splashPath)) {
  $svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='512'><rect width='100%' height='100%' fill='#0b7a3a'/><text x='50%' y='50%' font-size='48' fill='white' text-anchor='middle' dominant-baseline='middle'>Money In The Bank</text></svg>"
  [IO.File]::WriteAllBytes($splashPath, [Text.Encoding]::UTF8.GetBytes($svg))
}

# GitHub push
Set-Location $projectPath
if (-not (Test-Path ".git")) { git init }
git remote remove origin -ErrorAction SilentlyContinue
git remote add origin "https://github.com/Samuelfloki001/Money_In_The_Bank-_app.git"
git add --all
git commit -m "Stable Build v14" -ErrorAction SilentlyContinue
git branch -M main
git push -u origin main --force
git checkout -B gh-pages
git push -u origin gh-pages --force
git checkout main

Write-Host "`n✅ BUILD SUCCESS! Deploy complete." -ForegroundColor Green
Write-Host "🌐 Visit: https://Samuelfloki001.github.io/Money_In_The_Bank-_app"
Write-Host "➡  Splash screen will show for 3 seconds, then redirect to Google login."
