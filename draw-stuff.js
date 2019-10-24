
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
function color(one, two, three){
  var sum = one + two + three;
  if (one <= 15 || two <= 8 || three <= 7){
    myArr[one][two][three] = "red";
  }
}
function idLimit(one, two, three){
  var overlimit = true;
}
function singleSame(one, two, three){
  
}
function pathFinder(startNode, destNode){

}
var myArr = createArray(15, 8, 7);
for (var i = 0; i < 15; i++){
  for (var j = 0; j < 8; j++){
    for (var k = 0; k < 7; k++){
      myArr[i][j][k] =
    }
  }
}
for (var i = 0; i < 15; i++){
  for (var j = 0; j < 8; j++){
    for (var k = 0; k < 7; k++){
      console.log(myArr[i][j][k]);
    }
  }
}
var startNode = "F00";
var destNode = "555";
