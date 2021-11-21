var reqId;

var s1=0;
var s2=1;
var temp=0;

var change=0, flipVar=0;
var check=0;

var totTime=0,t=0,rand=0;
var array=[], nex=[], arrayPos=0;

var ctx=document.getElementById("canvas").getContext('2d');

function init() {
  document.getElementById("canvas").addEventListener("mousedown", click);
  document.addEventListener('keyup', function(e){
    if(e.keyCode==32&&change==0){
      temp=s1;
      s1=0.5;
      change++;
    }
  });
}

function click(event) {
  if(event.button==0&&change==0) {
    temp=s1;
    s1=0.5;
    change++;
  }
}

function flip() {
  ctx.fillStyle = 'red';

  ctx.translate(100,-s2*25/3*flipVar+125*s2+225);
  ctx.translate(25,25);
  ctx.rotate((Math.PI/180)*6*flipVar);
  ctx.translate(-25,-25);
  ctx.fillRect(0,0,50,50);
  
  flipVar++;
  if(flipVar==30) {
    change=0;
    s1=temp;
    s1=s1+s2*1;
    s2*=-1;
    flipVar=0;
  }
}

function create() {
  array[arrayPos]=0;
  nex[arrayPos]=Math.floor(Math.random()*2);

  ctx.fillStyle = '#F4EAE6';
  ctx.fillRect(1000-array[arrayPos], 400*nex[arrayPos], 100, 100);
  arrayPos++;
  
  rand=Math.floor(Math.random()*2.1+1);
  t=0;
}

function manage() {
  ctx.fillStyle = '#F4EAE6';
  for(i=0;i<array.length;i++) {

    ctx.fillRect(1000-array[i], 400*nex[i], 100, 100);
    array[i]+=4.5;

    if(Math.abs(nex[i]-1)==s1&&1000-array[i]>0&&1000-array[i]<150)
      check++;

    if(array[i]>=1110) {
      array.splice(i,1);
      nex.splice(i,1);
      i--;
      arrayPos--;
    }
  }
}

//name SUBMIT
function submit() {
  var el=document.getElementById("name");
  localStorage.setItem("highscore", Math.round(totTime/60*100)/100);
  localStorage.setItem("name", el.value);
  el.disabled=true;
}

//leaderBoard
function highscore() {
  document.getElementById("scoreboard").style.display="block";
  document.getElementById("text").innerHTML="NAME: "+localStorage.getItem("name")+"| TIME: "+localStorage.getItem("highscore");
}

document.getElementById("scoreboard").onclick=function() {
  document.getElementById("scoreboard").style.display="none";
}

//PAGE RELOAD
function reset() {
  location.reload();
}

//COVER FADE IN
function fadeIn(element,Mult) {
  var op = 0.01;
  var time=0.8; 
  var timer = setInterval(function () {
      if(time<=0.1) {
          clearInterval(timer);
      }
      element.style.opacity=op;
      op+=op*Mult;
      time-=time*0.1;
  }, 32);
}

function draw() {
  ctx.clearRect(0, 0, 800, 500);
  
  ctx.fillStyle = '	#343434';
  ctx.fillRect(0, 0, 800, 100);
  ctx.fillRect(0, 400, 800, 100);
  
  ctx.save();

  if(change==0) {
    ctx.fillStyle = 'red';
    ctx.fillRect(100, -250*s1+350, 50, 50);
  }

  else
    flip();

  ctx.restore();

  if(t/60==rand) {
    create();
  }

  if(array.length>0) {
    manage();
  }

  t++;
  totTime++;

  reqId=window.requestAnimationFrame(draw);
  
  if(check!=0) {
    window.cancelAnimationFrame(reqId);
    
    if(localStorage.getItem("highscore")==null) {
      document.getElementById("resultH").innerHTML="Survived for "+Math.round(totTime/60*100)/100+" seconds";
      document.getElementById("highscore").style.display="block";
      fadeIn(document.getElementById("highscore"), 0.25);
    }
    else if(Math.round(totTime/60*100)/100>localStorage.getItem("highscore")) {
      document.getElementById("resultH").innerHTML="Survived for "+Math.round(totTime/60*100)/100+" seconds";
      document.getElementById("highscore").style.display="block";
      fadeIn(document.getElementById("highscore"), 0.25);
    }
    else {
      document.getElementById("result").innerHTML="Survived for "+Math.round(totTime/60*100)/100+" seconds";
      document.getElementById("cover").style.display="block";
      fadeIn(document.getElementById("cover"), 0.25);
    }
  }
}

reqId=window.requestAnimationFrame(draw);