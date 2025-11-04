const splash=document.getElementById('splashEarn');
const container=document.querySelector('.earn-container');
const rewardMsg=document.getElementById('rewardMsg');

function loadAd(){
    rewardMsg.textContent='Ad loading...';
    (adsbygoogle = window.adsbygoogle || []).push({});
    setTimeout(()=>{
        rewardMsg.textContent='🎉 Reward granted! Reloading ad...';
        setTimeout(loadAd, 5000);
    }, 3000);
}

window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        splash.classList.add('hidden');
        container.classList.remove('hidden');
        loadAd();
    },2000);
});
