var sideSize = 7;
var x = 99;
var isComplex = true;
var colors = [100, 156, 255];

//Sliders
var sizeSlider;
var sideSizeSlider;
var checkboxesColor = [];
var slideColor = [];
var checkboxComplex;

var count = 0;
var tileCountX = 10;
var tileCountY = 10;
var tileWidth = 0;
var tileHeight = 0;

var colorStep = 15;

var circleCount = 0;
var endSize = 0;
var endSizeX = 0;
var endOffset = 0;

var actRandomSeed = 0;




function rdm(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup(){
  //Canvas
  //window.canvas = createCanvas(x*sideSize, x*sideSize)/*.position(windowWidth/2-canvas.width/2, 20)*/;
  window.canvas = createCanvas(800, 800);
  window.canvas.parent('drawCanvas');
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  noFill();
  stroke(0, 128);


  //Sliders
  sizeSlider = createSlider(1, 999, x, 2);
  sizeSlider.parent('sizeSlider');

  sideSizeSlider = createSlider(1, 50, sideSize);
  sideSizeSlider.parent('sideSizeSlider');

  //Checkboxes
  for(let x=0;x<3;x++){
    checkboxesColor.push(createCheckbox('Map', false));
    slideColor.push(createSlider(0,255,colors[x]));
    checkboxesColor[x].parent('checkColor'+x);
    slideColor[x].parent('sliderColor'+x);
  }

  checkboxComplex = createCheckbox('isComplex', isComplex);
  checkboxComplex.parent('checkboxComplex')

}

function draw(){
  //Load global parameters
  x=sizeSlider.value();
  document.getElementById('sizeDisplay').innerHTML = sizeSlider.value();
  sideSize=sideSizeSlider.value();
	document.getElementById('sideSizeDisplay').innerHTML = sideSizeSlider.value();
  document.getElementById('step').innerHTML = "Circles : ";
  document.getElementById('reload').innerHTML = "Regenerate!";
  
  isComplex = checkboxComplex.checked();
  //Load colors parameters
  for(let x=0;x<3;x++){
    if(checkboxesColor[x].checked()){
  
    }else{
 
    }
    document.getElementById('displayColor'+x).innerHTML = slideColor[x].value();
  }

// draw the circles

background(255);
randomSeed(actRandomSeed);

translate(tileWidth / 2, tileHeight / 2);

//circleCount =  mouseX / 30 + 1;
endSize = map(mouseX, 0, max(width, mouseX), tileWidth / 2, 0);
endOffset = map(mouseY, 0, max(height, mouseY), 0, (tileWidth - endSize) / 2);

document.getElementById('step').innerHTML = "Circles : "+mouseX;


for (var gridY = 0; gridY <= tileCountY; gridY++) {
  for (var gridX = 0; gridX <= tileCountX; gridX++) {

    //random circle count for each tile
    circleCount = rdm(-28,28);
    
    endSizeX = rdm(0,800);
    endSize = map(endSizeX, 0, max(width, endSizeX), tileWidth / 2, 0);

    push();
    translate(tileWidth * gridX, tileHeight * gridY);
    scale(1, tileHeight / tileWidth);

/*
      var toggle = int(random(0, 4));
      if (toggle == 0) rotate(-HALF_PI);
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);
*/   

    // draw module
    for (var i = 0; i < circleCount; i++) {
      var diameter = map(i, 0, circleCount, tileWidth, endSize);
      var offset = 0; // map(i, 0, circleCount, 0, endOffset);
      ellipse(offset, 0, diameter, diameter);
    }
    pop();
  }
}

}

function redraw()
{
 
}

function regen()
{
  
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyPressed(){
  if(key === 'r'){ regen();}
  //if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 's' || key == 'S')  { save(); }
}

  function keyReleased() {
    if (key == 's' || key == 'S')  {  save(); }
  }

  function save()
  {

    saveCanvas(gd.timestamp(), 'png');
  }

