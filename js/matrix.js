/*
* GLOBAL VARIABLES
*/

var points = []; //Point objects
var pointMarkers = []; //Two.Circle objects representing 'points'
var edges = []; //String values of edges
var lines = []; //Two.Line objects representing 'edges'

/*
* POINT CLASS
*
* Creates a point relative to the origin with a 50px step
*/
class Point{
    /*
    * Constructor
    */
    constructor(x, y, name, connectedVertices){
        this.x = x * step + origin.x;
        this.y = -1 * (y * step) + origin.y;
        this.name = name;
        this.connectedVertices = connectedVertices;
    }
    
    /*
    * Returns a true if an edge between two vertices exists
    */
    static edgeExists(n1, n2){
        
        if(edges.length == 0){
            return false;
        }else if(n1.localeCompare(n2) < 0){ //If p1 < p2
            for(var i = 0; i < edges.length; i++){
                if(String(edges[i]).localeCompare(n1 + n2) == 0){
                    return true;   
                }
                return false;
            }
        }else if(n1.localeCompare(n2)){ //If p1 > p2
            for(var i = 0; i < edges.length; i++){
                if(String(edges[i]).localeCompare(n2 + n1) == 0){
                    return true;   
                }
                return false;
            }
        }
        
        return true;
    }
    
    /*
    * Clears all Two.Lines in 'lines' and erases values in 'edges'
    */
    static clearLines(){
        lines = [];
        edges = [];
    }
    
    /*
    * Finds and returns a point whose name that matches 'label'
    */
    static findPoint(label){
        for(var i = 0; i < points.length; i++){
            if(String(label).localeCompare(String(points[i].name)) == 0){
                return points[i];
            }
        }

        return null;
    }
    
    /*
    * Clears points from canvas
    */
    static clearPoints(){
        pointMarkers = [];
    }
    
    /*
    * Draws point-markers for all Points
    */
    static addPoints(){
        Point.clearPoints();
        
        for(var i = 0; i < points.length; i++){
            pointMarkers[i] = two.makeCircle(points[i].x, points[i].y, 6);
            pointMarkers[i].noStroke();

            //Colors of points
            switch(points[i].name){
                case 'A':
                    pointMarkers[i].fill = 'red'; //Red
                    break;
                case 'B':
                    pointMarkers[i].fill = '#0058ff'; //Blue
                    break;
                case 'C':
                    pointMarkers[i].fill = '#03ff0d'; //Green
                    break;
                case 'D':
                    pointMarkers[i].fill = '#ffab2f'; //Orange
                    break;
                case 'E':
                    pointMarkers[i].fill = '#f1c40f'; //Yellow
                    break;
                case 'F':
                    pointMarkers[i].fill = '#8e44ad'; //Purple
                    break;
                case 'G':
                    pointMarkers[i].fill = '#bdc3c7'; //Silver
                    break;
                case 'H':
                    pointMarkers[i].fill = '#000000'; //Black
                    break;
                default:
                    pointMarkers[i].fill = 'black';
            }
        }
    }
    
    /*
    * Draw lines between Point's connected vertices
    */
    static createLines(){
        Point.clearLines();
        
        
        
        //For each line, create a line between the two vertices
        for(var i = 0; i < points.length; i++){ //For every point
            for(var j = 0; j < points[i].connectedVertices.length; j++){ //For every connected vertex of the point
                var vert = Point.findPoint(String(points[i].connectedVertices[j])); //Point object of vertex
                
                if(!Point.edgeExists(points[i].name, vert.name)){ //If the edge between the two does not exist
                    if(String(points[i].name).localeCompare(String(vert.name)) < 0){ //If p1 < p2
                        edges[edges.length] = String(points[i].name) + String(vert.name);
                        
                    }else if(String(points[i].name).localeCompare(String(vert.name))){ //If p1 > p2
                        edges[edges.length] = String(vert.name) + String(points[i].name);
                    }
                    
                    //Create the line between the two
                    lines[lines.length] = two.makeLine(points[i].x, points[i].y, vert.x, vert.y);
                    lines[lines.length-1].stroke = '#2196F3';
                    lines[lines.length-1].linewidth = 5;
                }
            }
        }
    }
    
    static toString(){
        return String("Point " + this.name + ": " +this.x + ", " + this.y);
    }
    
}


/*
*    FUNCTIONS
*/

/*
* Updates Two.js window
*/
function update(){
    
    two.remove(lines);
    two.remove(pointMarkers);
    
    Point.createLines();
    Point.addPoints();
    
    two.update();
}

/*
* Creates border, x and y axes, and gridLines
*/
function environmentSetUp(){
    
    //Draws background
    var bkg = two.makeRectangle(origin.x, origin.y, canvasWidth, canvasHeight);
    bkg.fill = 'rgba(0, 20, 255, 0.07)';

    
    //Draws grid lines
    createGrid();

    
    //Draws x and y axes
    var xAxis = two.makeLine(0, midHeight, canvasWidth, midHeight);
    var yAxis = two.makeLine(midWidth, 0, midWidth, canvasHeight);
    
    
    //Draws borders
    var topBorder = two.makeLine(0, 0, canvasWidth, 0);
    topBorder.stroke = '#1976D2'
    topBorder.linewidth = 5;
    
    var rightBorder = two.makeLine(canvasWidth, 0, canvasWidth, canvasHeight);
    rightBorder.stroke = '#1976D2';
    rightBorder.linewidth = 5;
    
    var bottomBorder = two.makeLine(0, canvasHeight, canvasWidth, canvasHeight);
    bottomBorder.stroke = '#1976D2';
    bottomBorder.linewidth = 5;
    
    var leftBorder = two.makeLine(0, 0, 0, canvasHeight);
    leftBorder.stroke = '#1976D2';
    leftBorder.linewidth = 5;
}

/*
* Creates a point containg the (x, y) coordinates for the origin
*/
function Origin(){
    this.x = midWidth;
    this.y = midHeight;
}

/*
* Creates the grid relative to the origin
*/
function createGrid(){
    var color = '#BDBDBD';
    
    //Creates vertical grid
    for(var i = origin.x; i < canvasWidth; i += step){ //Populates right of the origin
        var line = two.makeLine(i, 0, i, canvasHeight);
        line.linewidth = 1;
        line.stroke = color;
    }
    for(var i = origin.x; i > 0; i -= step){ //Populates left of the origin
        var line = two.makeLine(i, 0, i, canvasHeight);
        line.linewidth = 1;
        line.stroke = color;
    }
    
    
    //Creates horizontal grid
    for(var i = origin.y; i < canvasHeight; i += step){ //Populates above the origin
        var line = two.makeLine(0, i, canvasWidth, i);
        line.linewidth = 1;
        line.stroke = color;
    }
    for(var i = origin.y; i > 0; i -= step){ //Populates below the origin
        var line = two.makeLine(0, i, canvasWidth, i);
        line.linewidth = 1;
        line.stroke = color;
    }
}

/*
* Sets default values for points
*/
function setDefaultGraph(){
    
    /* Switches */
    
    //Points A-D
    for(var i = 0; i < 4; i++){
        switches[i].checked = true;
    }
    
    //Points E-H
    for(var i = 4; i < switches.length; i++){
        switches[i].checked = false;
    }
    
    
    /* Sets values */
    
    //Point A
    xPos[0].value = -1;
    yPos[0].value = 1;
    
    //Point B
    xPos[1].value = 1;
    yPos[1].value = 1;
    
    //Point C
    xPos[2].value = 1;
    yPos[2].value = -1;
    
    //Point D
    xPos[3].value = -1;
    yPos[3].value = -1;
    
    //Points E-H
    for(var i = 4; i < switches.length; i++){
        xPos[i].value = null;
        yPos[i].value = null;
    }
    
    
    /* Sets vertices*/
    
    //Point A -> B
    for(var i = 1; i < vertices[0].options.length; i++){
        if(i == 1 || i == 2){
            vertices[0].options[i].selected = true;
        }else{
            vertices[0].options[i].selected = false;
        }
    }
    
    //Point B -> C
    for(var i = 1; i < vertices[1].options.length; i++){
        if(i == 2){
            vertices[1].options[i].selected = true;
        }else{
            vertices[1].options[i].selected = false;
        }
    }
    
    //Point C -> D
    for(var i = 1; i < vertices[2].options.length; i++){
        if(i == 3){
            vertices[2].options[i].selected = true;
        }else{
            vertices[2].options[i].selected = false;
        }
    }
    
    //Point D -> A
    for(var i = 1; i < vertices[3].options.length; i++){
        if(i == 1){
            vertices[3].options[i].selected = true;
        }else{
            vertices[3].options[i].selected = false;
        }
    }
    
    //Point E -> null
    for(var i = 1; i < vertices[4].options.length; i++){
        vertices[4].options[i].selected = false;
    }
    
    //Point F -> null
    for(var i = 1; i < vertices[5].options.length; i++){
        vertices[5].options[i].selected = false;
    }
    
    //Point G -> null
    for(var i = 1; i < vertices[6].options.length; i++){
        vertices[6].options[i].selected = false;
    }
    
    //Point H -> null
    for(var i = 1; i < vertices[7].options.length; i++){
        vertices[7].options[i].selected = false;
    }
}

/*
* Reads values for points and updates components
*/
function readVals(){
    points = [];
    for(var i = 0; i < 8; i++){
        var verts = [];
        
        //Make array containing connected vertices
        for(var j = 1; j < vertices[i].options.length; j++){
            if(vertices[i].options[j].selected == true && switches[getIndex(vertices[i].options[j].text)].checked == true){
                verts[verts.length] = vertices[i].options[j].text;
            }
        }
        
        //If switch is on, create point
        if(switches[i].checked == true){
            //Applies transformation matrix
            var x = xPos[i].value * matrixVals[0].value + yPos[i].value * matrixVals[1].value;
            var y = xPos[i].value * matrixVals[2].value + yPos[i].value * matrixVals[3].value;
            
            rotate(rotation.value);
            scaleValue = scale.value;
            
            
            var newX, newY;
            newX = (x * rotationMatrix[0] + y * rotationMatrix[1]) * scaleValue;
            newY = (x * rotationMatrix[2] + y * rotationMatrix[3]) * scaleValue;
                        
            //Adds point
            points[points.length] = new Point(newX, newY, names[i], verts);
        }
    }
    
}

function rotate(angle){
    
    
    rotationMatrix[0] = Math.cos(angle);
    rotationMatrix[1] = -1 * Math.sin(angle);
    rotationMatrix[2] = Math.sin(angle);
    rotationMatrix[3] = Math.cos(angle);
}
 
/*
* Returns the index relative to the document arrays of name
*/
function getIndex(name){
    name = String(name);
    switch (name){
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        case 'E':
            return 4;
        case 'F':
            return 5;
        case 'G':
            return 6;
        case 'H':
            return 7;
        default:
            return -1;
    }
    
    return -1;
    
}


/*
* Go button function
*/
function go(){
    for(var i = 0; i < matrixVals.length; i++){
        matrixVals[i].value = parseFloat(matrixVals[i].value).toFixed(1);
    }
    
    readVals();
    update();
}

function identity(){
    matrixVals[0].value = 1;
    matrixVals[1].value = 0;
    matrixVals[2].value = 0;
    matrixVals[3].value = 1;
}

/*
* Default Button function
*/
function defaultButton(){
    setDefaultGraph();
    readVals();
    update();
}