const splashHome = document.getElementById('splashHome') || null;
const container = document.querySelector('.home-container') || document.querySelector('.mainCard');
window.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    if(splashHome) splashHome.classList && splashHome.classList.add('hidden');
    container && container.classList && container.classList.remove('hidden');
    const uname = localStorage.getItem('username') || 'Guest';
    const el = document.getElementById('displayName');
    if(el) el.textContent = uname;
    const go = document.getElementById('goEarn');
    if(go) go.onclick = ()=> location.href = 'earn.html';
    const logout = document.getElementById('logout');
    if(logout) logout.onclick = ()=> { localStorage.clear(); location.href='index.html'; };
  }, 800);
});
