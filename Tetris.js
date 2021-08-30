class Tetris{

    constructor(ctx){

        this.rows = 30
        this.columns = 10
        this.size = 20

        //Set all valuse to zero
        this.matrix = []
        for(let y=0; y<this.rows; y++){
            this.matrix[y] = []
            for(let x=0; x<this.columns; x++){
                this.matrix[y][x] = 0
            }
        }

        this.score = 0
        this.fallingPiece = null
        this.playerMove = null
        this.canvas = ctx
        this.colorScheme = {
            0: '#f2f2f2',
            1: '#800080',
            2: '0033cc',
            3: '00802b',
            4: 'e62e00'
        }

    }


    rotate(){

        const orientation = this.fallingPiece.orient
        const shape = this.fallingPiece.shape
        const y = this.fallingPiece.row
        const x = this.fallingPiece.column

        if( shape == 1){
            if ( orientation != 3){
                this.fallingPiece.orient++
                if (this.pieceOverlap()){
                    this.fallingPiece.orient--
                }
            }
            else {
                this.fallingPiece.orient = 0
                if (this.pieceOverlap()){
                    this.fallingPiece.orient = 3
                }
            }
        }
        else if(shape == 2){
            if ( orientation != 3){
                this.fallingPiece.orient++
                if (this.pieceOverlap()){
                    this.fallingPiece.orient--
                }
            }
            else {
                this.fallingPiece.orient = 0
                if (this.pieceOverlap()){
                    this.fallingPiece.orient = 3
                }
            }
        }
        
        this.playerMove = null

    }

    moveSideways(){

        const x = this.fallingPiece.column
        const direction = this.playerMove
        const orientation = this.fallingPiece.orient
        const shape = this.fallingPiece.shape
        let shapeSizeRight, shapeSizeLeft

        if (shape == 1) {

            if (direction == 'r'){ 
                this.fallingPiece.column++
                if (this.pieceOverlap()) this.fallingPiece.column--
            }
            else if (direction == 'l'){
                this.fallingPiece.column--
                if (this.pieceOverlap()) this.fallingPiece.column++
            }
            
        }
        else if(shape == 2){

            switch(orientation){
                case 0:
                    shapeSizeRight = 2
                    shapeSizeLeft = 0
                    break
                case 1:
                    shapeSizeRight = 1
                    shapeSizeLeft = 0
                    break
                case 2:
                    shapeSizeRight = 0
                    shapeSizeLeft = 2
                    break
                case 3:
                    shapeSizeRight = 0
                    shapeSizeLeft = 1
                    break
                default:
                    break;
            }
    
            //Check if it's out of boundary
            if (direction == 'r'){ 
                this.fallingPiece.column++
                if (this.pieceOverlap()) this.fallingPiece.column--
            }
            else if (direction == 'l'){
                this.fallingPiece.column--
                if (this.pieceOverlap()) this.fallingPiece.column++
            }

        }
        
        this.playerMove = null

    }

    pieceOverlap(){

        const shape = this.fallingPiece.shape
        const orientation = this.fallingPiece.orient
        const x = this.fallingPiece.column
        const y = this.fallingPiece.row

        if(shape == 1){
            switch(orientation){
                case 0:
                    return (y >= 30 || x > 8 || x < 0 || this.matrix[y][x] != 0 || this.matrix[y][x+1] != 0)
                case 1:
                    return (y >= 29 || x > 9 || x < 0 || this.matrix[y][x] != 0 || this.matrix[y+1][x] != 0)
                case 2:
                    return (y >= 30 || x > 9 || x < 1 || this.matrix[y][x] != 0 || this.matrix[y][x-1] != 0)
                case 3:
                    return (y >= 30 || x > 9 || x < 0 || this.matrix[y][x] != 0 || this.matrix[y-1][x] != 0)
                default:
                    break;
            }
        }
        else if(shape == 2){
            switch(orientation){
                case 0:
                    return (y >= 29 || x > 7 || x < 0 || this.matrix[y][x] != 0 || this.matrix[y+1][x] != 0 || this.matrix[y+1][x+1] != 0 || this.matrix[y+1][x+2] != 0)
                case 1:
                    return (y >= 30 || x > 8 || x < 0 || this.matrix[y][x] != 0 || this.matrix[y][x+1] != 0 || this.matrix[y-1][x+1] != 0 || this.matrix[y-2][x+1] != 0)
                case 2:
                    return (y >= 30 || x > 9 || x < 2 || this.matrix[y][x] != 0 || this.matrix[y-1][x] != 0 || this.matrix[y-1][x-1] != 0 || this.matrix[y-1][x-2] != 0)
                case 3:
                    return (y >= 28 || x > 9 || x < 1 || this.matrix[y][x] != 0 || this.matrix[y][x-1] != 0 || this.matrix[y+1][x-1] != 0 || this.matrix[y+2][x-1] != 0)
                default:
                    break;
            }
        }
    }

    attachPiece(){

        const shape = this.fallingPiece.shape
        const orientation = this.fallingPiece.orient
        const x = this.fallingPiece.column
        const y = this.fallingPiece.row
        
        if (shape == 1){
            switch(orientation){
                case 0:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y-1][x+1] = this.fallingPiece.color
                    break
                case 1:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y][x] = this.fallingPiece.color
                    break
                case 2:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y-1][x-1] = this.fallingPiece.color
                    break
                case 3:
                    this.matrix[y-2][x] = this.fallingPiece.color
                    this.matrix[y-1][x] = this.fallingPiece.color
                    break
                default:
                    break;
            }
        }
        else{

            switch(orientation){
                case 0:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y][x] = this.fallingPiece.color
                    this.matrix[y][x+1] = this.fallingPiece.color
                    this.matrix[y][x+2] = this.fallingPiece.color
                    break
                case 1:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y-1][x+1] = this.fallingPiece.color
                    this.matrix[y-2][x+1] = this.fallingPiece.color
                    this.matrix[y-3][x+1] = this.fallingPiece.color
                    break
                case 2:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y-2][x] = this.fallingPiece.color
                    this.matrix[y-2][x-1] = this.fallingPiece.color
                    this.matrix[y-2][x-2] = this.fallingPiece.color
                    break
                case 3:
                    this.matrix[y-1][x] = this.fallingPiece.color
                    this.matrix[y-1][x-1] = this.fallingPiece.color
                    this.matrix[y][x-1] = this.fallingPiece.color
                    this.matrix[y+1][x-1] = this.fallingPiece.color
                    break
                default:
                    break;
            }

        }
    }

    moveDown(i){

        let currentRow

        for (let row = i; row >= 0; row--){
            for( let column = 0; column < this.columns; column++){
                currentRow = row
                while (currentRow + 1 < this.rows && this.matrix[currentRow + 1][column] == 0){
                    this.matrix[currentRow + 1][column] = this.matrix[currentRow][column]
                    this.matrix[currentRow][column] = 0
                    currentRow++
                }
            }
        }
    }

    updateScore(){
        const score = document.getElementById('score')
        score.innerHTML = `Score: ${this.score}`
    }

    deleteRows(){

        for (let row = 0; row < this.rows; row++) {

            let full = true
            this.matrix[row].forEach(cell => { if(cell == 0) full = false })

            if (full){ 

                //Delete the row and Move the Pieces
                this.matrix[row] = [0,0,0,0,0,0,0,0,0,0] 
                this.moveDown(row)

                //Change the Score
                this.score += 100
                this.updateScore()

            }
            
        }

    }

    movePiece(){

        if(this.playerMove == 'r' || this.playerMove == 'l') this.moveSideways()
        else if(this.playerMove == 'o') this.rotate()

        this.fallingPiece.row++ 
        if (this.pieceOverlap()) {
            this.attachPiece()
            this.generatePiece()
        }
        
    }

    generatePiece(){

        let pieceColor = Math.floor(Math.random()*4) + 1 // Purple(1) Blue(2) Green(3) Red(4)
        let pieceShape = Math.floor(Math.random()*2) + 1 // There are two shapes: 2x1(1) and L(2)

        this.fallingPiece = {
            'color': pieceColor,
            'shape': pieceShape,
            'row': 0,
            'column':  5,
            'orient': 0
        }
       
    }

    draw(){

        //Make the Canvas White
        this.canvas.fillStyle = '#f2f2f2'
        this.canvas.fillRect(0,0,200,600)
 
        //Paint the Blocks
        for(let row=0; row<this.rows; row++){
            for(let column=0; column<this.columns; column++){

                let x = column*this.size
                let y = row*this.size

                //FIX THIS
                let cellColor = this.matrix[row][column]
                this.canvas.fillStyle = this.colorScheme[cellColor]
                this.canvas.fillRect(x, y, this.size, this.size)
                /*
                switch(this.matrix[row][column]){
                    
                    case 1:
                        //Purple
                        this.canvas.fillStyle = '#800080'
                        this.canvas.fillRect(x, y, this.size, this.size)
                        break;
                    
                    case 2:
                        //Blue
                        this.canvas.fillStyle = '#0033cc'
                        this.canvas.fillRect(x, y, this.size, this.size)
                        break;
                    
                    case 3:
                        //Green
                        this.canvas.fillStyle = '#00802b'
                        this.canvas.fillRect(x, y, this.size, this.size)
                        break;
                    
                    case 4:
                        //Red
                        this.canvas.fillStyle = '#e62e00'
                        this.canvas.fillRect(x, y, this.size, this.size)
                        break;

                    default:
                        break;

                }
                */

            }
        }

        //Render the falling Block
        if (this.fallingPiece){

            const x = this.fallingPiece['column']*this.size
            const y = this.fallingPiece['row']*this.size
            const shape = this.fallingPiece.shape
            const orientation = this.fallingPiece.orient

            this.canvas.fillStyle = this.colorScheme[this.fallingPiece.color]

            if (shape == 1){
                switch(orientation){
                    case 0:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x+20, y, this.size, this.size)
                        break
                    case 1:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x, y+20, this.size, this.size)
                        break
                    case 2:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x-20, y, this.size, this.size)
                        break
                    case 3:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x, y-20, this.size, this.size)
                        break
                    default:
                        break;
                }
            }
            else{

                switch(orientation){
                    case 0:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x, y + 20, this.size, this.size)
                        this.canvas.fillRect(x + 20, y + 20, this.size, this.size)
                        this.canvas.fillRect(x + 40, y + 20, this.size, this.size)
                        break
                    case 1:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x + 20, y, this.size, this.size)
                        this.canvas.fillRect(x + 20, y - 20, this.size, this.size)
                        this.canvas.fillRect(x + 20, y - 40, this.size, this.size)
                        break
                    case 2:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x, y - 20, this.size, this.size)
                        this.canvas.fillRect(x - 20, y - 20, this.size, this.size)
                        this.canvas.fillRect(x - 40, y - 20, this.size, this.size)
                        break
                    case 3:
                        this.canvas.fillRect(x, y, this.size, this.size)
                        this.canvas.fillRect(x - 20, y, this.size, this.size)
                        this.canvas.fillRect(x - 20, y + 20, this.size, this.size)
                        this.canvas.fillRect(x - 20, y + 40, this.size, this.size)
                        break
                    default:
                        break;
                }
        
            }
            
        }
    }

    lost(){
        for (let column = 0; column < this.columns; column++) {
            if (this.matrix[0][column] != 0) return true
        }
        return false
    }

    play(){
        this.deleteRows()
        this.movePiece()
        this.draw()
    }

}