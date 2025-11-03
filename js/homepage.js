//// js/homepage.js
document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (username) document.getElementById('usernameDisplay').textContent = username;
  else window.location.href = 'login.html';
  document.getElementById('earnBtn').addEventListener('click', () => {
    window.location.href = 'earn.html';
  });
});
