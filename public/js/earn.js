document.addEventListener('DOMContentLoaded', ()=>{
  try{ (adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
  const status = document.getElementById('status');
  const toast = document.getElementById('toast');
  const amt = document.getElementById('amt');
  setTimeout(()=>{
    const a = Math.floor(Math.random()*5)+1;
    amt.textContent = a;
    toast.classList.remove('hidden');
    status.textContent = 'Rewarded +' + a + ' coins';        
    setTimeout(()=> toast.classList.add('hidden'), 2500);    
  }, 6000);
});
