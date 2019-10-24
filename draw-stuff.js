
function drawStuff(){
var vis = d3.select("#graph")
            .append("svg")
.attr("width", 800).attr("height", 800);

var nodes = [
    {x: 10, y: 80, z:60},
    {x: 10, y: 10, z:40},
    {x: 140, y: 50, z:80}
  ]

vis.selectAll("circle.nodes")
   .data(nodes)
   .enter()
   .append("svg:circle")
   .attr("cx", function(d) { return d.x; })
   .attr("cy", function(d) { return d.y; })
   .attr("cz", function(d) { return d.z; })
   .attr("r", "8px")
   .attr("fill", "red")
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
for (var i = 0; i < 15; i++){
  for (var j = 0; j < 8; j++){
    for (var k = 0; k < 7; k++){
      myArr[i][j][k] = "black"
    }
  }
}
myArr[5][5][5] = "red";
function sumFunc(one, two, three){
  var sum = one + two + three;
  return sum;
}
console.log("here");
function colorNodes(one, two, three){
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
                  myArr[i][j][k] = "red";
                  console.log("(" + i + ", " + j + ", " + k + ") " + myArr[i][j][k]);
                }
              }
              else if(j != maxtwo && j != 0){
                if (i!=two){
                  myArr[i][j][k] = "red";
                  console.log("(" + i + ", " + j + ", " + k + ") " + myArr[i][j][k]);
                }
              }
              else if(k != maxthree && k != 0){
                if (k!=three){
                  myArr[i][j][k] = "red";
                  console.log("(" + i + ", " + j + ", " + k + ") " + myArr[i][j][k]);
                }
              }
            }
          }
        }
      }
    }
  }
}
//make function to move to the next location with the lowest residue
function residue(){
  
}
