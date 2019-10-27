var nodes = [];

// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.

var links = [];
var maxone = 15;
var maxtwo = 8;
var maxthree = 7;
var startNode1 = 15;
var startNode2 = 0;
var startNode3 = 0;
var destNode1 = 5;
var destNode2 = 5;
var destNode3 = 5;
var myArr = createArray(15, 8, 7);

function draw_rect(ctx, stroke,fill, x, y)
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(x, y, 10, 10);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}
function drawLine(ctx, stroke, x1, y1, x2,y2){
    stroke = stroke || 'blue';
    ctx.save( );
    ctx.beginPath();
    ctx.strokeStyle = stroke;
    ctx.moveTo(x1, y1);
    ctx.lineTo(-x2, -y2);
    ctx.stroke();
    ctx.restore();
}
function drawSomething(){
  var height = 600;
  links.forEach(function(link){
    links.source = nodes[link.source] ||
    (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] ||
    (nodes[link.target] = {name: link.target});
  });
  var svg = d3.select('body').append('svg')
  .attr('width', height).attr('height', height);
  var force = d3.layout.force()
  .size([height, height])
  .nodes(d3.values(nodes))
  .links(links)
  .on("tick", tick)
  .linkDistance(400)
  .start();
  var link = svg.selectAll('.link')
  .data(links)
  .enter().append('line')
  .attr('class','link');
  var node = svg.selectAll('.node')
  .data(force.nodes())
  .enter().append('circle')
  .attr('class', 'node')
  .attr("color", "red")
  .attr('r', height*.01);
  function tick(e){
    node.attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .call(force.drag);
    link.attr('x1', function(d){return d.source.x;})
    .attr('y1', function(d){return d.source.y;})
    .attr('x2', function(d){return d.target.x;})
    .attr('y2', function(d){return d.target.y;})
  }
}
function updateGraph(){
  svg.selectAll("circle")
  .data(data)
  .join(
    enter => enter.append("circle").attr("fill", "green"),
    update => update.attr("fill", "red")
  )
    .attr("stroke", "#8B0000");
}
function blackArray(){
  for (var i = 0; i < 15; i++){
    for (var j = 0; j < 8; j++){
      for (var k = 0; k < 7; k++){
        myArr[i][j][k] = "black"
      }
    }
  }
}
function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}
function fillArray(){
  for (var i = 0; i < 15; i++){
    for (var j = 0; j < 8; j++){
      for (var k = 0; k < 7; k++){
        nodes.push({x:i*30+10*k+10, y:j*30+10*k+10});
      }
    }
  }
}
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
function sumFunc(one, two, three){
  var sum = one + two + three;
  return sum;
}
console.log("Starting search");
var lowresi = 15, lowresj = 0, lowresk = 0, res;
var lowres = Math.abs(lowresi - lowresj) + Math.abs(lowresj - lowresk) + Math.abs(lowresk - lowresi);
var residues;
var previ, prevj, prevk;
var curr = 0;
function colorNodes(one, two, three){
  if (one == previ && two == prevj && three == prevk){
    console.log("Cannot move closer to 5,5,5");
    return;
  }
  previ = one, prevj = two, prevk = three;
  if (one == 5 && two == 5 && three == 5){
    console.log("We made it to the middle!");
    return;
  }
  var sum = one + two + three;
  for (var i = 0; i < 15; i++){
    for (var j = 0; j < 8; j++){
      for (var k = 0; k < 7; k++){
        var sum = one + two + three;
        if (one <= 15 || two <= 8 || three <= 7 && one != i && two != j && three != k){
          if (sumFunc(i, j, k) == sum){
            if (i == one && k != three && j != two || i != one && k == three && j != two || i != one && k != three && j == two){
              if (i != maxone && i != 0){
                if (i!=one){
                  myArr[i][j][k] = "Candidate";
                  console.log("(" + i + ", " + j + ", " + k + ") " + myArr[i][j][k]);
                  res = Math.abs(i - j) + Math.abs(j - k) + Math.abs(k - i);
                  console.log("RESIDUE: " + res);
                  if (res < lowres){
                    lowres = res;
                    console.log("New lowest residue: " + lowres + " at room (" + i + ", " + j + ", " + k + ")");
                    lowresi = i;
                    lowresj = j;
                    lowresk = k;
                    console.log("Moving to "+ "(" + lowresi + ", " + lowresj + ", " + lowresk + ")");
                    nodes.push({x:i*10+10*k+10, y:j*10+10*k+10});
                    links.push({ source: curr, target: curr+1 });
                    myArr[i][j][k] = "red";
                    draw_rect(context, 'darkred', 'red', i*30+10*k+10, j*30+10*k+10);
                    curr++;
                    //wait(500);
                    colorNodes(lowresi, lowresj, lowresk);
                  }
                }
              }
              else if(j != maxtwo && j != 0){
                if (i!=two){
                  myArr[i][j][k] = "Candidate";
                  console.log("(" + i + ", " + j + ", " + k + ") " + myArr[i][j][k]);
                  res = Math.abs(i - j) + Math.abs(j - k) + Math.abs(k - i);
                  console.log("RESIDUE: " + res);
                  if (res < lowres){
                    lowres = res;
                    console.log("New lowest residue: " + lowres + " at room (" + i + ", " + j + ", " + k + ")");
                    lowresi = i;
                    lowresj = j;
                    lowresk = k;
                    console.log("Moving to "+ "(" + lowresi + ", " + lowresj + ", " + lowresk + ")");
                    nodes.push({x:i*10+10*k+10, y:j*10+10*k+10});
                    links.push({ source: curr, target: curr+1 });
                    myArr[i][j][k] = "red";
                    draw_rect(context, 'darkred', 'red', i*30+10*k+10, j*30+10*k+10);
                    curr++;
                    //wait(500);
                    colorNodes(lowresi, lowresj, lowresk);
                  }
                }
              }
              else if(k != maxthree && k != 0){
                if (k!=three){
                  myArr[i][j][k] = "Candidate";
                  console.log("(" + i + ", " + j + ", " + k + ") " + myArr[i][j][k]);
                  res = Math.abs(i - j) + Math.abs(j - k) + Math.abs(k - i);
                  console.log("RESIDUE: " + res);
                  if (res < lowres){
                    lowres = res;
                    console.log("New lowest residue: " + lowres + " at room (" + i + ", " + j + ", " + k + ")");
                    lowresi = i;
                    lowresj = j;
                    lowresk = k;
                    console.log("Moving to "+ "(" + lowresi + ", " + lowresj + ", " + lowresk + ")");
                    nodes.push({x:i*10+10*k+10, y:j*10+10*k+10});
                    links.push({ source: curr, target: curr+1 });
                    myArr[i][j][k] = "red";
                    draw_rect(context, 'darkred', 'red', i*30+10*k+10, j*30+10*k+10);
                    curr++;
                    //wait(500);
                    colorNodes(lowresi, lowresj, lowresk);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function myGraph(){

  for (var i = 0; i < 15; i++){
    for (var j = 0; j < 8; j++){
      for (var k = 0; k < 7; k++){
        if (myArr[i][j][k] == "Candidate"){
          draw_rect(context, i*10+10*k, j*10+10*k);
          drawLine(context, i*10+10*k, j*10+10*k, i*10+10*k-5, j*10+10*k-5);
        }
        else if (myArr[i][j][k]=="red"){
          draw_rect(context, 'darkred', 'red', i*10+10*k, j*10+10*k);
          drawLine(context,'red', i*10+10*k, j*10+10*k, i*10+10*k-5, j*10+10*k-5);
        }
      }
    }
  }
}
