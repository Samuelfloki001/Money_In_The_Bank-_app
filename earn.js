const adStatus = document.getElementById('adStatus');
const backBtn = document.getElementById('backBtn');

// Simulate rewarded ad cycle
function loadRewardAd() {
    adStatus.innerText = 'Ad loading...';

    setTimeout(() => {
        adStatus.innerText = 'Ad playing...';

        setTimeout(() => {
            adStatus.innerText = 'Reward granted! Loading next ad...';
            
            setTimeout(loadRewardAd, 2000);
        }, 5000); // Ad duration 5 sec
    }, 2000); // Load delay 2 sec
}

// Start ad loop automatically
loadRewardAd();

// Back button
backBtn.addEventListener('click', () => {
    window.location.href = 'homepage.html';
});
