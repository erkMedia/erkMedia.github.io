// new p5();

// var canvas = document.createElement("canvas"),
//     c = canvas.getContext("2d");
// var w = canvas.width = window.innerWidth,
//     h = canvas.height = window.innerHeight;

// document.body.appendChild(canvas);

// c.fillStyle = "rgba(30,30,30,1)";
// c.fillRect(0, 0, w, h);

function genFF(cols,rows,res,scl,t,detail1,detail2){
  this.data = new Array(cols);
  for(var i = 0; i < cols; i++){
    this.data[i] = new Array(rows);
    for(var j = 0; j < rows; j++){
      noiseDetail(detail1, detail2);
    this.data[i][j] = noise(scl*i/res,scl*j/res,t)*5*Math.PI;
    }
  }
  return this.data;
}

function showFF(FF,res,c,f){
  for(var x = 0; x < FF.length; x++){
    for(var y = 0; y < FF[x].length; y++){
      c.beginPath();
      c.lineTo(res*x+res/2,res*y+res/2);
      c.lineTo(res*x+res/2+f*Math.cos(FF[x][y]),res*y+res/2+f*Math.sin(FF[x][y]));
      c.strokeStyle="white";
      c.lineWidth="0.5";
      c.stroke();
    }
  }
}

// showFF(genFF(Math.floor(w/10),
//              Math.floor(h/10),
//              10,
//              0.2,
//              0),10);