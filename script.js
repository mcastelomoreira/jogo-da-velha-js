const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = Array(9).fill(null);
let current = 'X';
let gameOver = false;

const wins = [
  [0,1,2],[3,4,5],[6,7,8], // linhas
  [0,3,6],[1,4,7],[2,5,8], // colunas
  [0,4,8],[2,4,6]          // diagonais
];

function setStatus(text){ statusEl.textContent = text; }

function handleClick(e){
  const i = +e.target.dataset.index;
  if(gameOver || board[i]) return;
  board[i] = current;
  e.target.textContent = current;

  const winner = getWinner();
  if (winner){
    gameOver = true;
    setStatus(`Vitória de: ${winner} 🏆`);
    cells.forEach(c => c.disabled = true);
    return;
  }

  if (board.every(v => v !== null)){
    gameOver = true;
    setStatus('Deu velha! 🤝');
    return;
  }

  current = current === 'X' ? 'O' : 'X';
  setStatus(`Vez de: ${current}`);
}

function getWinner(){
  for(const [a,b,c] of wins){
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      highlight([a,b,c]);
      return board[a];
    }
  }
  return null;
}

function highlight(idxs){
  idxs.forEach(i => cells[i].style.background = '#1b2b46');
}

function reset(){
  board = Array(9).fill(null);
  current = 'X';
  gameOver = false;
  cells.forEach(c => { c.textContent = ''; c.disabled = false; c.style.background = '#141925'; });
  setStatus('Vez de: X');
}

cells.forEach(btn => btn.addEventListener('click', handleClick));
resetBtn.addEventListener('click', reset);
setStatus('Vez de: X');
