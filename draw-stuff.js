// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.
var maxx = 15;
var maxy = 8;
var maxz = 7;
var sx = 15;
var sy = 0;
var sz = 0;
var myArr = createArray(15, 8, 7);
function draw_text( ctx, rtext, x, y )
{
    ctx.save( );
    context.fillStyle = 'lightgrey'
    context.font = "10px Arial"
    context.fillText( rtext, x, y);
    ctx.restore( );
}
function drawTxt(ctx,x,y,z){
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
    default:
    xtxt = '-';
    break;
  }
  ctx.save( );
  context.fillStyle = 'white';
  ctx.fillText( xtxt + y + z, x*40+20+z*40, y*40+20+z*40-4);
  ctx.restore( );
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
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
var nodes=[];
var cand=[];
var g = 0;

var prevx='-', prevy='-', prevz='-';
function Pathfinder(x,y,z){
  for(var k = 0; k<nodes.length; k++){
    if(makeID(x,y,z) == nodes[k].id){
      if(g<nodes.length-1){
        g++;
        Pathfinder(nodes[g].x,nodes[g].y,nodes[g].z)
      }
      return;
    }
  }

  nodes.push({x:x,y:y,z:z,fx:prevx,fy:prevy,fz:prevz,residue:getResidue(x,y,z),candidates:getCandidates(x,y,z), status: "candidate", id:makeID(x,y,z)});
  prevx = x, prevy = y, prevz = z;
  var node = nodes[g];
  for (var j = 0; j<node.candidates.length; j++){
    for(var k = 0; k<nodes.length; k++){
      if(makeID(node.candidates[j].x,node.candidates[j].y,node.candidates[j].z) == nodes[k].id){
        trust = false;
      }
      else{
        trust = true;
      }
    }
    if (trust){
      nodes.push({x:node.candidates[j].x,y:node.candidates[j].y,z:node.candidates[j].z,fx:node.x,fy:node.y,fz:node.z,residue:getResidue(node.candidates[j].x,node.candidates[j].y,node.candidates[j].z),candidates:getCandidates(node.candidates[j].x,node.candidates[j].y,node.candidates[j].z), status: "explored",id:makeID(x,y,z)});
    }
  }
  g++;
  Pathfinder(nodes[g].x,nodes[g].y,nodes[g].z)
}
function Final(){
  var lowres = 100;
  var lownode = 0;
  for (var k = 0; k<nodes.length; k++){
    if (nodes[k].residue<lowres){
      lowres = nodes[k].residue;
      lownode = nodes[k];
    }
  }
  lownode.status = "final";
  nodes.push(lownode);
}
function numba2(){
  var size = nodes.length;
  for (var i = 0; i<size; i++){
    for (var j = 0; j<nodes[i].candidates.length; j++){
      var xx = nodes[i].candidates[j].x, yy = nodes[i].candidates[j].y, zz = nodes[i].candidates[j].z;
      if (!dirty(makeID(xx,yy,zz))){
        nodes.push({x:xx,y:yy,z:zz,residue:getResidue(xx,yy,zz),candidates:getCandidates(xx,yy,zz), dirty: 0});
        console.log("" + xx + " " + yy + " " + zz + " is candidate" );
        Pathfinder(xx,yy,zz);
      }
    }
  }
}
function makedirty(id){
  for (var i = 0; i<nodes.length; i++){
    if (nodes[i].id == id){
      nodes[i].dirty == 1;
    }
  }
}
function dirty(id){
  for (var i = 0; i<nodes.length; i++){
    if (nodes[i].id == id && nodes[i].dirty == 1){
      return true;
    }
  }
  return false;
}
function getCandidates(x,y,z){
  cand = [];
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
        if (IDLimit(i,j,k) && ZeroMax(x,y,z,i,j,k) && SingleSame(i,j,k,x,y,z) && SumRule(i,j,k,x,y,z)){
          cand.push({x:i,y:j,z:k,fx:x,fy:y,fz:z,residue:getResidue(i,j,k)});
        }
      }
    }
  }
  return cand;
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
