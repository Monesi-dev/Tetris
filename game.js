const c = document.getElementById('myCanvas')
const ctx = c.getContext('2d')
const timeBetweenFrames = 300
const tetris = new Tetris(ctx)

function handlePlayerInput(event) {
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
}

tetris.generatePiece()
tetris.draw()
document.addEventListener('keydown', (event) => { handlePlayerInput(event) }) 
let loop = setInterval( () => {
    tetris.play()
    if (tetris.lost()) clearInterval(loop)
}, timeBetweenFrames);


