const c = document.getElementById('myCanvas')
const ctx = c.getContext('2d')

const tetris = new Tetris(ctx)

tetris.matrix[29][5] = 1
tetris.matrix[29][4] = 1
tetris.matrix[29][3] = 1
tetris.matrix[28][3] = 1

tetris.matrix[28][5] = 2
tetris.matrix[28][4] = 2

tetris.matrix[27][1] = 2
tetris.matrix[27][2] = 2
tetris.matrix[27][3] = 2
tetris.matrix[26][3] = 2

tetris.matrix[27][4] = 2
tetris.matrix[27][5] = 2
tetris.matrix[27][6] = 2
tetris.matrix[26][6] = 2

tetris.matrix[27][7] = 3
tetris.matrix[27][8] = 3

tetris.matrix[27][9] = 3
tetris.matrix[26][9] = 3

tetris.matrix[27][0] = 4
tetris.matrix[26][0] = 4
tetris.matrix[25][0] = 4

tetris.generatePiece()
tetris.draw()

document.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'ArrowRight':
            tetris.playerMove = 'r'
            break;
        case 'ArrowLeft':
            tetris.playerMove = 'l'
            break;
        case 'r':
            tetris.playerMove = 'o'
            break;
        default:
            break;
    }
});

let loop = setInterval( () => {
    tetris.play()
    if (tetris.lost()) clearInterval(loop)
}, 300);


