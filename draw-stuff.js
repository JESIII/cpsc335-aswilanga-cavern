// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.
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
    //ctx.stroke();
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
var nodestodraw = [];
console.log("Starting search");
var lowresi = 15, lowresj = 0, lowresk = 0, res;
nodestodraw.push({x:lowresi,y:lowresj,z:lowresk,status:'start'});
var lowres = Math.abs(lowresi - lowresj) + Math.abs(lowresj - lowresk) + Math.abs(lowresk - lowresi);
var residues;
var previ, prevj, prevk;
//var curr = 0;
function colorNodes(one, two, three){
  if (one == 5 && two == 5 && three == 5)return;
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
                  if (myArr[i][j][k]!="red"){
                    myArr[i][j][k] = "Candidate";
                    nodestodraw.push({x:i,y:j,z:k,status:'candidate',fromx:previ,fromy:prevj, fromz:prevk});
                  }
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
                    myArr[i][j][k] = "red";
                    nodestodraw.push({x:i,y:j,z:k,status:'red',fromx:previ,fromy:prevj, fromz:prevk});
                    if (previ != 5 && prevj != 5 && prevk != 5){
                      colorNodes(lowresi, lowresj, lowresk);
                    }
                    return;
                  }
                }
              }
              else if(j != maxtwo && j != 0){
                if (i!=two){
                  if (myArr[i][j][k]!="red"){
                    myArr[i][j][k] = "Candidate";
                    nodestodraw.push({x:i,y:j,z:k,status:'candidate',fromx:previ,fromy:prevj, fromz:prevk});
                  }
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
                    myArr[i][j][k] = "red";
                    nodestodraw.push({x:i,y:j,z:k,status:'red',fromx:previ,fromy:prevj, fromz:prevk});
                    if (previ != 5 && prevj != 5 && prevk != 5){
                      colorNodes(lowresi, lowresj, lowresk);
                    }
                    return;
                  }
                }
              }
              else if(k != maxthree && k != 0){
                if (k!=three){
                  if (myArr[i][j][k]!="red"){
                    myArr[i][j][k] = "Candidate";
                    nodestodraw.push({x:i,y:j,z:k,status:'candidate',fromx:previ,fromy:prevj, fromz:prevk});
                  }
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
                    myArr[i][j][k] = "red";
                    nodestodraw.push({x:i,y:j,z:k,status:'red',fromx:previ,fromy:prevj, fromz:prevk});
                    if (previ != 5 && prevj != 5 && prevk != 5){
                      colorNodes(lowresi, lowresj, lowresk);
                    }
                    return;
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
  drawTxt(context, 15, 0,0);
  for (var i = 0; i <= 15; i++){
    for (var j = 0; j <= 8; j++){
      for (var k = 0; k <= 7; k++){
          draw_room(context, 'gray', 'gray', i, j, k);
      }
    }
  }
}
