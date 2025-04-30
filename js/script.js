const card   = document.getElementById('card');
const qSpan  = document.getElementById('q');
const aSpan  = document.getElementById('a');
const shuffleBtn=document.getElementById('shuffle');
const resetBtn  =document.getElementById('reset');
const favBtn    =document.getElementById('fav');
const reviewBtn =document.getElementById('review');

let cards=[], idx=0, order=[], favoritos=new Set(), erradas=new Set(), reviewMode=false;

fetch('flashcards/flashcards.json').then(r=>r.json()).then(data=>{
  cards=data;
  ordemOriginal();
  mostrar();
});

function ordemOriginal(){ order=[...Array(cards.length).keys()]; idx=0;}
function mostrar(){
  const cardData=cards[order[idx]];
  qSpan.textContent=cardData.pergunta;
  aSpan.textContent=cardData.resposta;
  card.classList.remove('flip');
}
card.addEventListener('click',()=>card.classList.toggle('flip'));

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight') prox();
  if(e.key==='ArrowLeft') ant();
  if(e.key===' ') card.click();
});
function prox(){ if(idx<order.length-1) idx++; mostrar();}
function ant(){ if(idx>0) idx--; mostrar();}

shuffleBtn.onclick=()=>{
  order.sort(()=>Math.random()-0.5); idx=0; mostrar();
}
resetBtn.onclick=()=>{ reviewMode=false; ordemOriginal(); mostrar(); }

favBtn.onclick=()=>{
  const id=order[idx];
  favoritos.has(id)?favoritos.delete(id):favoritos.add(id);
  alert(`Favoritos: ${favoritos.size}`);
}
reviewBtn.onclick=()=>{
  reviewMode=!reviewMode;
  if(reviewMode){
    order=[...erradas];
    if(order.length===0){alert('Nenhum erro marcado'); reviewMode=false; return;}
  }else{ ordemOriginal();}
  idx=0; mostrar();
}
