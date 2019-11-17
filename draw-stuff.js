// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.
var maxx = 15;
var maxy = 8;
var maxz = 7;
var sx = 15;
var sy = 0;
var sz = 0;
var nodes = createArray(16, 9, 8);
function draw_text( ctx, rtext, x, y )
{
    ctx.save( );
    context.fillStyle = 'white'
    context.font = "10px Arial"
    context.fillText( rtext, x, y);
    ctx.restore( );
}
function drawTxt(ctx,x,y,z){
  var xtxt = makeID(x,y,z);
  ctx.save( );
  context.fillStyle = 'white';
  ctx.fillText( xtxt, x*40+20+z*40, y*40+20+z*40-4);
  ctx.restore( );
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
async function draw_room(ctx, stroke,fill, x, y, z)
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(x*40+20+z*40, y*40+20+z*40, 5, 5);
    ctx.fillRect(x*40+20+z*40, y*40+20+z*40, 5, 5);
    ctx.restore( );
}
function drawLine(ctx, stroke, x1, y1,z1, x2,y2,z2){
    stroke = stroke || 'blue';
    ctx.save( );
    ctx.beginPath();
    ctx.strokeStyle = stroke;
    ctx.moveTo(x1*40+20+z1*40+2, y1*40+20+z1*40+2);
    ctx.lineTo(x2*40+20+z2*40+2, y2*40+20+z2*40+2);
    ctx.stroke();
    ctx.restore();
}
/////////////////////////////////////////////////////////////////////////////////
for(var i = 0; i<=15;i++){
  for(var j = 0; j<=8;j++){
    for(var k = 0; k<=7;k++){
      nodes[i][j][k] = {fx:0,fy:0,fz:0,status:"unvisited",residue:100, candidates:0, id:makeID(i,j,k)};
    }
  }
}
var path = [];
var lnode = 0;
var test = 0;
var printnodes = [];
async function makePath2(incomingnode){

  console.log("Path "+test+' '+incomingnode.id)
  var nextnode = nodes[incomingnode.fx][incomingnode.fy][incomingnode.fz];
  path.push(nextnode);
  if(incomingnode.id == "F00")return;
  test++;
  makePath2(nextnode);
}
function makePath(x,y,z){
  lowestRes(x,y,z);
  var incomingnode = lnode;
  makePath2(incomingnode)
}
/////////////////////////////////////////////////////////////////////////////////
async function lowestRes(x,y,z){
  Pathfinder(x,y,z);
  var lr = 100;
  var lx = 0;
  var ly = 0;
  var lz = 0;
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
        if(nodes[i][j][k].residue < lr){
          lnode = nodes[i][j][k];
          lx = i
          ly = j
          lz = k
          lr = nodes[i][j][k].residue;
          console.log("Lower Residue at "+i +''+j+''+k)
        }
      }
    }
  }
  console.log("Center Most Node: " + lx +''+ly+''+lz)
  path.push(lnode);
}
async function Pathfinder(x,y,z){
  nodes[x][y][z].status == "visited";
  //printnodes.push({fx:0,fy:0,fz:0,status:"visited",residue:getResidue(15,0,0), id:makeID(15,0,0),x:15,y:0,z:0})
  getCandidates(x,y,z);
}

async function getCandidates(x,y,z){
  console.log("Get cands from: "+x+''+y+''+z);
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
        if (IDLimit(i,j,k) && ZeroMax(x,y,z,i,j,k) && SingleSame(i,j,k,x,y,z) && SumRule(i,j,k,x,y,z)){
          if(nodes[i][j][k].status!="visited" && nodes[i][j][k].status!="cand"){
            nodes[i][j][k] = {fx:x,fy:y,fz:z,status:"cand",residue:getResidue(i,j,k), id:makeID(i,j,k),x:i,y:j,z:k};
            printnodes.push({fx:x,fy:y,fz:z,status:"cand",residue:getResidue(i,j,k), id:makeID(i,j,k),x:i,y:j,z:k})
            console.log("Node: " + nodes[i][j][k].id + " status: " + nodes[i][j][k].status + " From: " +makeID(x,y,z));
            Pathfinder(i,j,k);
          }
        }
      }
    }
  }
}
function printNodes(){
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
        console.log("Node: " + nodes[i][j][k].id + " status: " + nodes[i][j][k].status + " From: " )
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////
//finds the lowest residue of all the candidates and returns the node
function LowestResidue(){
  console.log("From node: " + cand[0].fromx + cand[0].fromy + cand[0].fromz);
  var r = 100;
  var low;
  var tester;
  while(cand.length > 0){
    tester = cand.pop();
    console.log(tester);
    if (tester.residue < r){
      r = tester.residue;
      low = tester;
    }
  }

  console.log("To node: " + low.x + low.y + low.z);
  return low;
}
/////////////////////////////////////////////////////////////////////////////////
function getStatus(x,y,z){
  for (var i = 0; i < ntd.length; i++){
    if(ntd[i].x == x && ntd[i].y == y && ntd[i].z == z)
    return ntd[i].status;
  }
}
/////////////////////////////////////////////////////////////////////////////////
function getResidue(x,y,z){
  var r = Math.abs(x - y) + Math.abs(y - z) + Math.abs(z - x);
  return r;
}
/////////////////////////////////////////////////////////////////////////////////
//makes a 3 part id for the rooms
function makeID(x,y,z){
  var xtxt;
  switch(x){
    case 0:
    xtxt='0';
    break;
    case 1:
    xtxt='1';
    break;
    case 2:
    xtxt='2';
    break;
    case 3:
    xtxt='3';
    break;
    case 4:
    xtxt='4';
    break;
    case 5:
    xtxt='5';
    break;
    case 6:
    xtxt='6';
    break;
    case 7:
    xtxt='7';
    break;
    case 8:
    xtxt='8';
    break;
    case 9:
    xtxt='9';
    break;
    case 10:
    xtxt='A';
    break;
    case 11:
    xtxt='B';
    break;
    case 12:
    xtxt='C';
    break;
    case 13:
    xtxt='D';
    break;
    case 14:
    xtxt='E';
    break;
    case 15:
    xtxt='F';
    break;
  }
  return xtxt + y + z;
}
/////////////////////////////////////////////////////////////////////////////////
//checks if node 0passes zero-max rule
function ZeroMax(x,y,z,i,j,k){
  if(((i == 0 || i == maxx) && x!=i) || ((j == 0 || j == maxy) && j!=y) || ((k == 0 || k == maxz) && z!=k))return true;
  else return false;
}
//Checks if node being checked passes the sum rule
function SumRule(x,y,z,x1,y1,z1){
  var s1 = x1 + y1 + z1;
  var s2 = x + y + z;
  if (s1 == s2)return true;
  else return false;
}
//Checks if nodes being checked passes Single Same Rule
function SingleSame(x,y,z,x1,y1,z1){
  if(x == x1 || y == y1 || z == z1) return true;
  else return false;
}
//checks if room is within the cave system
function IDLimit(x,y,z){
  if (x <= maxx && y <= maxy && z <= maxz && z>=0 && x>=0 && y>=0) return true;
  else return false;
}
//draws grey "unknown" cave rooms within the cave system.
function myGraph(){
  drawTxt(context, 15, 0,0);
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
          draw_room(context, 'gray', 'gray', i, j, k);
      }
    }
  }
}
