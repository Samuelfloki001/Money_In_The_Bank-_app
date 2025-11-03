document.addEventListener('DOMContentLoaded', () => {
  (adsbygoogle = window.adsbygoogle || []).push({});
  const rewardMsg = document.getElementById('rewardMessage');
  setTimeout(() => {
    rewardMsg.textContent = '🎉 Reward granted! New ad will load shortly...';
    setTimeout(() => location.reload(), 6000);
  }, 8000);
});
