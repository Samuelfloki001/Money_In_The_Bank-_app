document.addEventListener('DOMContentLoaded', ()=>{
  const uname = localStorage.getItem('username') || 'Guest';
  document.getElementById('usernameDisplay').textContent = uname;
});
