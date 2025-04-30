const card   = document.getElementById('card');
const qSpan  = document.getElementById('q');
const aSpan  = document.getElementById('a');
const shuffleBtn = document.getElementById('shuffle');
const resetBtn   = document.getElementById('reset');
const selMateria = document.getElementById('filtroMateria');

let cards = [], order = [], idx = 0;

fetch('flashcards/flashcards_classificados.json')
  .then(r => r.json())
  .then(data => {
    cards = data;
    preencherDropdown();
    resetar();
  });

function preencherDropdown() {
  const materias = [...new Set(cards.map(c => c.materia))].sort();
  materias.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    selMateria.appendChild(opt);
  });
}

function resetar() {
  filtrar(selMateria.value);
}

function filtrar(mat) {
  order = cards
    .map((c, i) => ({ c, i }))
    .filter(o => mat === 'TODAS' || o.c.materia === mat)
    .map(o => o.i);

  if (order.length === 0) {
    qSpan.textContent = 'Sem cartões para essa matéria';
    aSpan.textContent = '';
    return;
  }
  idx = 0;
  mostrar();
}

selMateria.onchange = () => filtrar(selMateria.value);

function mostrar() {
  const c = cards[order[idx]];
  qSpan.textContent = c.pergunta;
  aSpan.textContent = c.resposta;
  card.classList.remove('flip');
}

card.addEventListener('click', () => card.classList.toggle('flip'));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') proximo();
  if (e.key === 'ArrowLeft') anterior();
  if (e.key === ' ') card.click();
});

function proximo() { if (idx < order.length - 1) { idx++; mostrar(); }}
function anterior() { if (idx > 0) { idx--; mostrar(); }}

shuffleBtn.onclick = () => { order.sort(() => Math.random() - 0.5); idx = 0; mostrar(); };
resetBtn.onclick = () => resetar();
