const adStatus = document.getElementById('adStatus');
const loadAdBtn = document.getElementById('loadAdBtn');

function loadRewardAd() {
    adStatus.innerText = 'Loading ad...';
    
    // Simulate AdMob rewarded ad
    setTimeout(() => {
        adStatus.innerText = 'Ad loaded! Reward granted!';
        
        // Automatically reload after 3 seconds
        setTimeout(() => {
            adStatus.innerText = '';
            loadRewardAd();
        }, 3000);
        
    }, 2000);
}

loadAdBtn.addEventListener('click', loadRewardAd);
