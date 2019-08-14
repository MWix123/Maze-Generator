/*types:
    1: left wall
    2: top wall
    3: right wall
    4: bottom wall
*/

function generateMaze(){
    //create element that sets size (small, medium, large, extra large)
    var mazeSize = document.getElementById("maze-size").value;

    size = 32;

    switch(mazeSize){
        case "small":
            size = 16;
            break;
        case "medium":
            size = 32;
            break;
        case "large":
            size = 64;//15
            break;
        case "extra-large":
            size = 128;
            break;
        default:
            size = 32;
            break;
    }
    //console.log("Size: " + size);
    var maze = [];
    for(var i = 0; i < size; i++){
        temp = [];
        //console.log(i);
        for(var j = 0; j < size; j++){
            //console.log("j: " + j);
            /*if(i == 0 && j == 0){
                temp.push(5);
            }else if(i == 0 && j == size){
                temp.push(6);
            }else if(i == size && j == size){
                temp.push(7);
            }else if(i == size && j == 0){
                temp.push(8);
            }else if(i == 0){
                temp.push(2);
            }else if(i == size){
                temp.push(4);
            }else if(j == 0){
                temp.push(1);
            }else if(j == size){
                temp.push(3);
            }else{*/
                temp.push(0);
            //}
        }
        maze.push(temp);
    }
    //want: number between 1 and size - 2
    //var startPoint = [Math.round(Math.random()*(size-3))+1, Math.round(Math.random()*(size-3))+1];
    //var startPoint = [Math.round(Math.random()*(5))+1, Math.round(Math.random()*(5))+1];
    //console.log("Start point: " + startPoint[0] + ", "+ startPoint[1]);
    //maze[startPoint[0]][startPoint[1]] = -1;

    divide(maze, 0, 0, maze.length, maze.length);
    /*var path = generatePath(maze, startPoint);
    for(var i = 0; i < path.length; i++){
        for(var j = 0; j < path.length; j++){
            if(path[i][j] != 0 && path[i][j] != 2){
                //maze[i][j] = path[i][j];
                maze[i][j] = -1;
            }
        }
    }*/

    /*for(var i = 0; i < maze.length; i++){
        maze[0][i] = 4;
        maze[i][0] = 1;
        maze[maze.length-1][i] = 2;
        maze[i][maze.length-1] = 3;
    }*/
    //maze[0][0] = 5;
    //maze[0][maze.length-1] = 6;
    //maze[maze.length-1][maze.length-1] = 7;
    //maze[maze.length-1][0] = 8;


    //need to add in cell around
    newMaze = [];
    //newMaze.append(temp);
    //console.log("Real size: " + maze.length);
    for(var i = 0; i < maze.length+2; i++){
        temp = [];
        for(var j = 0; j < maze.length + 2; j++){
            if((i == 0 && j == 0) || (i == 0 && j == maze.length+1)
                || (i == maze.length+1 && j == 0) || (i == maze.length+1 && j == maze.length+1)){
                temp.push(0);
            }else if(i == 0){
                temp.push(4);
            }else if(j == 0){
                temp.push(3);
            }else if(i == maze.length+1){
                temp.push(2);
            }else if(j == maze.length+1){
                temp.push(1);
            }else{  
                //console.log("i: " + (i-1) + ", j: " + (j-1));
                temp.push(maze[i-1][j-1]);
            }
        }
        newMaze.push(temp);
    }

    //left wall: j == 0
    //top wall: i == 0
    //right wall: j == length - 1
    //bottom wall: i == length - 1

    var startWall = 0;
    var endWall = 1;
    //generate 2 random positions along the walls
    var randomPosition1 = 1+Math.round(Math.random()*(newMaze.length-3));
    var randomPosition2 = 1+Math.round(Math.random()*(newMaze.length-3));
    
    var randomWall1 = Math.round(Math.random()*3);
    //var wallPosition1 = 0;
    switch(randomWall1){
        case 0: //start left wall
            newMaze[randomPosition1][0] = -1;
            newMaze[randomPosition2][newMaze.length-1] = -7;
            break;
        case 1: //start top wall
            newMaze[0][randomPosition1] = -2;
            newMaze[newMaze.length-1][randomPosition2] = -8;
            break;
        case 2: //start right wall
            newMaze[randomPosition1][newMaze.length-1] = -3;
            newMaze[randomPosition2][0] = -5;
            break;
        case 3: //start bottom wall
            newMaze[newMaze.length-1][randomPosition1] = -4;
            newMaze[0][randomPosition2] = -6;
            break;
        default:
            break;
    }

    //need way to get wall that is NOT previuosly picked wall
    /*var randomWall2 = Math.round(Math.random()*3);
    switch(Math.abs(randomWall1-randomWall2)){
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }*/

    //printArray(maze);
    displayMaze(newMaze);
}

//NOTE: first issue when width is 6. Heihgt should be 3 but is 1 for some reasons
//BIG NOTE: maybe replace styling with actual characters?
function divide(maze, xStart, yStart, width, height){

    //console.log("x: " + xStart + ", y: " + yStart + ", width: " + width + ", height: " + +height);

    var halfWidth = Math.floor(width/2);
    var halfHeight = Math.floor(height/2);

    //console.log("half width: " + halfWidth + ", half height: " + halfHeight);
    if(width < 2 || height < 2){
        //console.log("Reached the end");
        return;
    }

	if(width > height){
        //console.log("horizontal wall: " + yStart + " to " + (yStart + height));
		//horizontal wall
		for(var i = yStart; i < (yStart + height); i++){
            //console.log(xStart + halfWidth);
            if(maze[xStart + halfWidth][i] == 1){
                maze[xStart + halfWidth][i] = 5;
            }else{
                maze[xStart + halfWidth][i] = 2;
            }
			//maze[i][halfWidth] = 1;
		}
        randomPosition = yStart + Math.round(Math.random()*(height-1));
        //console.log("Random position: " + randomPosition);
        //console.log("Before change: " + maze[(xStart + halfWidth)][randomPosition]);
		maze[(xStart + halfWidth)][randomPosition] = (maze[(xStart + halfWidth)][randomPosition] != 2) ? 1 : 0;
        //halfWidth = Math.floor(halfWidth / 2);
        //NOT half height of original but half height of new subdivision
        //var prevWidth = halfWidth;
        //var prevHeight = height;    
        //console.log("Before: " + prevWidth + ", " + prevHeight);
    //console.log("width coordinates: (" + (xStart + halfWidth) + ", " + randomPosition + ")");

    
        divide(maze, xStart, yStart, halfWidth, height);

        //console.log("Other half width bigger ---------------------------- : " + halfWidth + ", " + height);
        //console.log("Prev: " + prevWidth + ", " + prevHeight);
        //halfWidth = prevWidth;
        //halfHeight = prevHeight;
        divide(maze, xStart + halfWidth, yStart, halfWidth, height);
	}else{
        //console.log("vertical wall: " + xStart + " to " + (xStart + width));
		//horizontal wall
		for(var i = xStart; i < (xStart + width); i++){
            //console.log(yStart + halfHeight);
            if(maze[i][yStart + halfHeight] == 2){
                maze[i][yStart + halfHeight] = 5;
            }else{
			    maze[i][yStart + halfHeight] = 1;
            }
            //maze[halfHeight][i] = 2;
		}
		randomPosition = xStart + Math.round(Math.random()*(width-1));
        //console.log("ransom position:" + randomPosition);
        //console.log("Random position width: " + randomPosition);
        //console.log("yStart + halfHeight: " + (yStart + halfHeight));
        maze[randomPosition][(yStart + halfHeight)] = (maze[randomPosition][(yStart + halfHeight)] != 1) ? 2 : 0;
        //halfHeight = Math.floor(halfHeight / 2);
        //NOT half height of original but half height of new subdivision
        //var prevWidth = width;
        //var prevHeight = halfHeight;    
        //console.log("Before: " + prevWidth + ", " + prevHeight);
    
    //console.log("height coordinates: (" + randomPosition + ", " + (yStart + halfHeight) + ")");


        divide(maze, xStart, yStart, width, halfHeight);

        //console.log("Other half --------------------------------------- : " + width + ", " + halfHeight);
        //console.log("Prev: " + prevWidth + ", " + prevHeight);
        //halfWidth = prevWidth;
        //halfHeight = prevHeight;
        divide(maze, xStart, yStart + halfHeight, width, halfHeight);
        //printArray(maze);
	}

    
}


function generatePath(maze, startPosition){
    solution = false;
    visitedCells = [];
    for(var i = 0; i < maze.length; i++){
        temp = [];
        for(var j = 0; j < maze[0].length; j++){
            if(i == 0 || j == 0 || i == maze.length - 1 
                || j == maze.length - 1){
                    temp.push(2);
            }else{
                temp.push(0);
            }
        }
        visitedCells.push(temp);
    }
    var x = startPosition[0];
    var y = startPosition[1];
    console.log("Starting x and y: " + x + ", " + y);
    while(!solution){
        direction = Math.round(Math.random()*3);
        if(direction == 0){ //move left
            x--;
            if(visitedCells[x][y] == 1){
                x++;               
            }else if(visitedCells[x][y] == 2){
                solution = true;
                visitedCells[x][y] = -1;
            }else{
                visitedCells[x][y] = 1;
            }
        }else if(direction == 1){ //move up
            y--;
            if(visitedCells[x][y] == 1){
                y++;               
            }else if(visitedCells[x][y] == 2){
                solution = true;
                visitedCells[x][y] = -1;
            }else{
                visitedCells[x][y] = 1;
            }
        }else if(direction == 2){ //move right
            x++;
            if(visitedCells[x][y] == 1){
                x--;               
            }else if(visitedCells[x][y] == 2){
                solution = true;
                visitedCells[x][y] = -1;
            }else{
                visitedCells[x][y] = 1;
            }
        }else{ //move down
            y++;
            if(visitedCells[x][y] == 1){
                y--;               
            }else if(visitedCells[x][y] == 2){
                solution = true;
                visitedCells[x][y] = -1;
            }else{
                visitedCells[x][y] = 1;
            }
        }
    }
    console.log("out");
    printArray(visitedCells);

    return visitedCells;
}

/*function updateMazePath(maze, visitedCells, operation){
    if(operation == "x++"){

    }else if(operation == "x--"){

    }else if(operation == "y++"){

    }else if(operation == "y--"){

    }
}*/

function displayMaze(maze){
    var display = document.getElementById("maze");
    display.innerHTML = "";
    //console.log();
    for(var i = 0; i < maze.length; i++){
        var rowNode = document.createElement("tr");
        rowNode.className = "row";
        for(var j = 0; j < maze[0].length; j++){
            var columnNode = document.createElement("td");
            columnNode.className = getCellType(maze[i][j]);
            columnNode.innerHTML = "&nbsp;";
            rowNode.appendChild(columnNode);
        }
        display.appendChild(rowNode);
    }
}

function getCellType(cell){

    var type = "";

    switch(cell){
        case -1:
            type = "start-cell left-open";
            break;        
        case -2:
            type = "start-cell top-open";
            break;
        case -3:
            type = "start-cell right-open";
            break;
        case -4:
            type = "start-cell bottom-open";
            break;
        case -5:
            type = "end-cell left-open";
            break;        
        case -6:
            type = "end-cell top-open";
            break;
        case -7:
            type = "end-cell right-open";
            break;
        case -8:
            type = "end-cell bottom-open";
            break;
        case 1: //left wall
            type = "left-cell";
            break;
        case 2: //top wall
            type = "top-cell";
            break;
        case 3: //right wall
            type = "right-cell";
            break;
        case 4: //bottom wall
            type = "bottom-cell";
            break;
        case 5: //top-left wall
            type = "top-cell left-cell";
            break;
        case 6: //top-right wall
            type = "top-cell right-cell";
            break;
        case 7: //bottom-right wall
            type = "bottom-cell right-cell";
            break;
        case 8: //bottom-left wall
            type = "bottom-cell left-cell";
            break;
        default:
            type = "";
            break;
    }

    return type;
}

function printArray(maze){
    console.log("Begin printing..");
    var output = "";
    for(var i = 0; i < maze.length; i++){
        temp = "";
        rowSeperator = "";
        for(var j = 0; j < maze.length; j++){
            temp += maze[i][j] + ", "
            //rowSeperator += "---";
        }
        output += temp + "\n";
        //console.log(rowSeperator);
    }
    console.log(output);
}

function printMazeToPDF(){
    window.print();
}