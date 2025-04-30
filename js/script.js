const matSel=document.getElementById('matSel');
const assSel=document.getElementById('assSel');
const card=document.getElementById('card');
const qSpan=document.getElementById('q');
const aSpan=document.getElementById('a');
const shuffleBtn=document.getElementById('shuffle');
const resetBtn=document.getElementById('reset');

let cards=[], order=[], idx=0;

fetch('flashcards/flashcards_classificados.json')
  .then(r=>r.json()).then(data=>{cards=data; preencherFiltros(); aplicarFiltros();});

function preencherFiltros(){
  const materias=[...new Set(cards.map(c=>c.materia))].sort();
  materias.forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=m;matSel.appendChild(o);});
  matSel.onchange=()=>aplicarFiltros();
  assSel.onchange=()=>aplicarFiltros();
}

function aplicarFiltros(){
  const mat=matSel.value;
  const assuntos=[...new Set(cards.filter(c=>mat==='TODOS'||c.materia===mat).map(c=>c.assunto||'-'))].sort();
  assSel.innerHTML='<option value="TODOS">Todos os assuntos</option>';
  assuntos.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;assSel.appendChild(o);});
  filtrar();
}

function filtrar(){
  const mat=matSel.value, ass=assSel.value;
  order=cards.map((c,i)=>({c,i}))
             .filter(o=>(mat==='TODOS'||o.c.materia===mat)&&(ass==='TODOS'||(o.c.assunto||'-')===ass))
             .map(o=>o.i);
  if(order.length===0){qSpan.innerText='Nenhum cartão';aSpan.innerText='';return;}
  idx=0; mostrar();
}

function mostrar(){
  const c=cards[order[idx]]; qSpan.innerHTML=c.pergunta; aSpan.innerHTML=c.resposta; card.classList.remove('flip');
}

card.onclick=()=>card.classList.toggle('flip');
document.onkeydown=e=>{if(e.key==='ArrowRight') prox(); if(e.key==='ArrowLeft') ant(); if(e.key===' ') card.click();};
function prox(){if(idx<order.length-1){idx++; mostrar();}}
function ant(){if(idx>0){idx--; mostrar();}}
shuffleBtn.onclick=()=>{order.sort(()=>Math.random()-0.5); idx=0; mostrar();};
resetBtn.onclick=()=>aplicarFiltros();
