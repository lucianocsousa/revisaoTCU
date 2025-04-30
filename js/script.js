const card = document.getElementById('card'); const qSpan=document.getElementById('q'); const aSpan=document.getElementById('a');
const shuffleBtn=document.getElementById('shuffle'); const resetBtn=document.getElementById('reset'); const favBtn=document.getElementById('fav');
let cards=[], order=[], idx=0, fav=new Set(JSON.parse(localStorage.getItem('fav')||'[]'));
fetch('flashcards/flashcards.json').then(r=>r.json()).then(d=>{cards=d; reset();});
function reset(){order=[...Array(cards.length).keys()]; idx=0; show();}
function show(){if(!cards.length)return; const c=cards[order[idx]]; qSpan.textContent=c.pergunta; aSpan.textContent=c.resposta; card.classList.remove('flip');}
card.addEventListener('click',()=>card.classList.toggle('flip'));
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); if(e.key===' ') card.click();});
function next(){if(idx<order.length-1){idx++; show();}}
function prev(){if(idx>0){idx--; show();}}
shuffleBtn.onclick=()=>{order.sort(()=>Math.random()-0.5); idx=0; show();}
resetBtn.onclick=reset; favBtn.onclick=()=>{const id=order[idx]; fav.has(id)?fav.delete(id):fav.add(id); localStorage.setItem('fav',JSON.stringify([...fav])); alert(`Favoritos: ${fav.size}`);}
