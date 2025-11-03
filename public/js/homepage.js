const uname = localStorage.getItem('username'); 
if(!uname) location.href='login.html'; 
document.getElementById('displayName').textContent = uname; 
document.getElementById('goEarn').onclick = () => location.href='earn.html'; 
document.getElementById('logout').onclick = () => { localStorage.clear(); 
location.href='login.html'; }; 
