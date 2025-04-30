fetch('flashcards/flashcards.json')
  .then(r=>r.json())
  .then(d=>{document.getElementById('app').textContent=`Total de flashcards: ${d.length}`})
  .catch(()=>{document.getElementById('app').textContent='Erro ao carregar'});