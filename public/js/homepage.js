const splash=document.getElementById('splashHome');
const container=document.querySelector('.home-container');
window.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    splash.classList.add('hidden');
    container.classList.remove('hidden');
    const uname=localStorage.getItem('username')||'Guest';
    document.getElementById('displayUsername').textContent=uname;
  },2000);
});
