function loadAd() {
  const adBox = document.getElementById('adBox');
  const rewardMsg = document.getElementById('rewardMsg');
  adBox.textContent = 'Ad Playing...';
  rewardMsg.textContent = '';
  setTimeout(()=>{
    adBox.textContent = 'Ad Finished';
    rewardMsg.textContent = '🎉 You earned 10 coins!';
    setTimeout(loadAd, 2000); // reload ad automatically
  }, 5000); // simulate 5s ad
}

document.addEventListener('DOMContentLoaded', loadAd);
