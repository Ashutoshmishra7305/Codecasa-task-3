// script.js

document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const resetButton = document.getElementById('reset-button');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function handleSquareClick(index) {
    if (gameBoard[index] === '' && gameActive) {
      gameBoard[index] = currentPlayer;
      updateBoard();
      checkWinner();
      switchPlayer();
    }
  }

  function updateBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
      const square = document.createElement('div');
      square.classList.add('square');
      square.textContent = value;
      square.addEventListener('click', () => handleSquareClick(index));
      board.appendChild(square);
    });
    updateStatus();
  }

  function updateStatus() {
    status.textContent = Player ${currentPlayer}'s turn;
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        gameActive = false;
        status.textContent = Player ${currentPlayer} wins!;
      }
    }

    if (!gameBoard.includes('') && gameActive) {
      gameActive = false;
      status.textContent = 'It\'s a draw!';
    }
  }

  function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    updateBoard();
  }

  resetButton.addEventListener('click', resetGame);

  // Initial board setup
  updateBoard();
});
