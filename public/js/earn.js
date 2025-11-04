const splash=document.getElementById('splashEarn');
const container=document.querySelector('.earn-container');
const rewardMsg=document.getElementById('rewardMsg');

function loadAd(){
  rewardMsg.textContent='Ad loading...';
  setTimeout(()=>{
    rewardMsg.textContent='🎉 Reward granted! Reloading ad...';
    setTimeout(loadAd,3000);
  },2000);
}

window.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    splash.classList.add('hidden');
    container.classList.remove('hidden');
    loadAd();
  },2000);
});
