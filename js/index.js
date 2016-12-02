/*
*    MAIN CONTROLLER
*/

$(document).ready(function() {
    $('select').material_select();
  });

/* Set-up */

//Components for switches
var switches = []
switches[0] = document.getElementById("aSwitch");
switches[1] = document.getElementById("bSwitch");
switches[2] = document.getElementById("cSwitch");
switches[3] = document.getElementById("dSwitch");
switches[4] = document.getElementById("eSwitch");
switches[5] = document.getElementById("fSwitch");
switches[6] = document.getElementById("gSwitch");
switches[7] = document.getElementById("hSwitch");

//Components for x positions
var xPos = [];
xPos[0] = document.getElementById("aXPos");
xPos[1] = document.getElementById("bXPos");
xPos[2] = document.getElementById("cXPos");
xPos[3] = document.getElementById("dXPos");
xPos[4] = document.getElementById("eXPos");
xPos[5] = document.getElementById("fXPos");
xPos[6] = document.getElementById("gXPos");
xPos[7] = document.getElementById("hXPos");

//Components for y positions
var yPos = [];
yPos[0] = document.getElementById("aYPos");
yPos[1] = document.getElementById("bYPos");
yPos[2] = document.getElementById("cYPos");
yPos[3] = document.getElementById("dYPos");
yPos[4] = document.getElementById("eYPos");
yPos[5] = document.getElementById("fYPos");
yPos[6] = document.getElementById("gYPos");
yPos[7] = document.getElementById("hYPos");

//Components for connected vertices
var vertices = [];
vertices[0] = document.getElementById("aPoints");
vertices[1] = document.getElementById("bPoints");
vertices[2] = document.getElementById("cPoints");
vertices[3] = document.getElementById("dPoints");
vertices[4] = document.getElementById("ePoints");
vertices[5] = document.getElementById("fPoints");
vertices[6] = document.getElementById("gPoints");
vertices[7] = document.getElementById("hPoints");

var names = [];
names[0] = 'A';
names[1] = 'B';
names[2] = 'C';
names[3] = 'D';
names[4] = 'E';
names[5] = 'F';
names[6] = 'G';
names[7] = 'H';

var matrixVals = [];
matrixVals[0] = document.getElementById("mA");
matrixVals[1] = document.getElementById("mB");
matrixVals[2] = document.getElementById("mC");
matrixVals[3] = document.getElementById("mD");

var rotationMatrix = [];

var scale = document.getElementById("scale");
var rotation = document.getElementById("rotate");

scale.value = 1;
rotation.value = 0;

var element = document.getElementById('canvas'),
    style = window.getComputedStyle(element),
    w = style.getPropertyValue('width'),
    h = style.getPropertyValue('height');

//Sets global variables
let canvasWidth = parseFloat(w);
let canvasHeight = parseFloat(h);
let step = parseFloat(25);

/* SET UP ENVIRONMENT */

//Creates Two.js canvas
var ob = document.getElementById("canvas");
var params = { width: w, height: h };
var two = new Two(params);
two.appendTo(ob);

//Calculates midpoint for width and height
var midWidth = (canvasWidth / 2);
var midHeight = (canvasHeight / 2);

//Creates origin
var origin = new Origin();

environmentSetUp();

/* Sets defualt */
setDefaultGraph();

readVals();

//Renders image
update();