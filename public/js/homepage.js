document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (!username) return (window.location.href='login.html');
  document.getElementById('usernameDisplay').textContent = username;
  document.getElementById('earnBtn').addEventListener('click', () => {
    window.location.href = 'earn.html';
  });
});
