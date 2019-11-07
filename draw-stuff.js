// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.
var maxx = 15;
var maxy = 8;
var maxz = 7;
var sx = 15;
var sy = 0;
var sz = 0;
var dx = 5;
var dy = 5;
var dz = 5;
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
function inNodes(x,y,z){
  var id = makeID(x,y,z);
  for (var i = 0; i<ntd.length; i++){
    if (id == ntd[i].id){
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////////////
var ntd = [];
var cand = [];
ntd.push({x:sx,y:sy,z:sz,status:'start',fromx:sx,fromy:sy, fromz:sz, id:makeID(sx,sy,sz)});
console.log(ntd);
var nextnode;
var lastx,lasty,lastz;
var countz = 0;
/////////////////////////////////////////////////////////////////////////////////
function Pathfinder(x, y, z){
  countz++;
  if(countz > 100) return;
  var thisStatus = getStatus(x,y,z);
  if(thisStatus == 'explored'){
    ntd.push({x:x,y:y,z:z,status:'final',fromx:x,fromy:y, fromz:z, id:makeID(x,y,z)});
    return;
  }
  getCandidates(x,y,z);
  nextnode = LowestResidue();
  Pathfinder(nextnode.x, nextnode.y, nextnode.z);
}
/////////////////////////////////////////////////////////////////////////////////
function getCandidates(x,y,z){
  lastx = x,lasty = y,lastz = z;
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
        if (IDLimit(i,j,k) && ZeroMax(x,y,z,i,j,k) && SingleSame(i,j,k,x,y,z) && SumRule(i,j,k,x,y,z)){
          ntd.push({x:i,y:j,z:k,status:'candidate',fromx:x,fromy:y, fromz:z, id:makeID(i,j,k)});
        }
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////
//finds the lowest residue of all the candidates and returns the node
function LowestResidue(){
  //console.log(ntd.length);
  var r = 100;
  var lowindex = 0;
  for (var i = 0; i < ntd.length; i++){
    if (ntd[i].status == 'candidate' && ntd[i].status != 'explored'){
      if (getResidue(ntd[i].x,ntd[i].y,ntd[i].z) < r){
        r = getResidue(ntd[i].x,ntd[i].y,ntd[i].z);
        lowindex = i;
      }
      ntd[i].status = 'explored';
    }
  }
  ntd[lowindex].status = 'red';
  //console.log("Lowest Residue Node is ");
  //console.log(ntd[lowindex]);
  return ntd[lowindex];
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
//checks if node passes zero-max rule
function ZeroMax(x,y,z,i,j,k){
  if((x == 0 || x == maxx) && x!=i)return true;
  else if((y == 0 || y == maxy) && y!=j)return true;
  else if((z == 0 || z == maxz) && z!=k)return true;
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
  if (x <= maxx && y <= maxy && z <= maxz) return true;
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
