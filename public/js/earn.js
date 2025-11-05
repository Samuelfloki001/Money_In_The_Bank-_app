window.addEventListener('DOMContentLoaded',()=>{
  const status = document.getElementById('status');
  const toast = document.getElementById('toast');
  const amt = document.getElementById('amt');
  function showReward(){
    const a = Math.floor(Math.random()*5)+1;
    amt.textContent = a;
    toast.classList.remove('hidden');
    status.textContent = 'Rewarded +' + a + ' coins';
    setTimeout(()=> toast.classList.add('hidden'), 2500);
  }
  // attempt to render ads if AdSense script ready
  try{ (adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
  // simulate ad loading then reward then reload
  function loop(){
    status.textContent = 'Ad loading...';
    setTimeout(()=>{
      showReward();
      setTimeout(loop, 3000);
    }, 4000);
  }
  loop();
});
