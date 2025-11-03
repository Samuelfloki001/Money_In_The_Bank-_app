//// js/earn.js
document.addEventListener('DOMContentLoaded', () => {
  const adContainer = document.getElementById('adContainer');
  // Simulated reward ad flow with your AdMob ID
  const adUnitId = 'ca-app-pub-6394894143909202/9244546846';
  console.log('Loading AdMob ad:', adUnitId);
  adContainer.innerHTML = '<p>⏳ Loading ad...</p>';
  setTimeout(() => {
    adContainer.innerHTML = '<p>✅ Reward granted! Reloading next ad...</p>';
    setTimeout(() => location.reload(), 3000);
  }, 5000);
});
