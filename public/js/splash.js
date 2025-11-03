// splash.js - progress then navigate to login
const progress = document.getElementById('progress');
let p = 0;
const timer = setInterval(()=>{
  p += Math.floor(Math.random()*10)+6;
  if(p>100) p=100;
  progress.style.width = p + '%';
  if(p>=100){
    clearInterval(timer);
    // small delay then go to login
    setTimeout(()=> location.href = 'login.html', 600);
  }
}, 350);
