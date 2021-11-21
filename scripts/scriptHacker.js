var reqId;

var s1=0;
var s2=1;
var temp=0;
var change=0, flipVar=0;

var totTime=0,check=0,speed=4.5;

var x=0,y=Math.floor(Math.random()*2),up=0,t2=0,randB=Math.floor(Math.random()*2.1+1);

var t=0,rand=0;
var array=[], nex=[], arrayPos=0;

var x1=0,randC=Math.floor(Math.random()*2),collect=0,t3=0,speedTemp=4.5,speedReset=0;

var ctx=document.getElementById("canvas").getContext('2d');


//CLICK
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

//Object Flipper
function flip() {
  ctx.fillStyle = 'red';

  ctx.translate(100,-s2*25/3*flipVar+125*s2+225);
  ctx.translate(25,25);
  ctx.rotate((Math.PI/180)*6*flipVar);
  ctx.translate(-25,-25);
  ctx.beginPath();
  ctx.moveTo(0, 25*s2+25);
  ctx.lineTo(50, 25*s2+25);
  ctx.lineTo(15*s2+25, -26*s2+25);
  ctx.fill();
  
  flipVar++;
  if(flipVar==30) {
    change=0;
    s1=temp;
    s1=s1+s2*1;
    s2*=-1;
    flipVar=0;
  }
}






//HOLES
function create() {
  array[arrayPos]=0;
  nex[arrayPos]=Math.floor(Math.random()*2);

  ctx.fillStyle = '#F4EAE6';
  ctx.fillRect(1000-array[arrayPos], 400*nex[arrayPos], 100, 100);
  arrayPos++;

  if(speed<10&&speed>=6)
    rand=1;
  else if(speed>=10)
    rand=0.5;  
  else
    rand=Math.floor(Math.random()*2.1+1);
  t=0;
}

function manage() {
  ctx.fillStyle = '#F4EAE6';
  for(i=0;i<array.length;i++) {

    ctx.fillRect(1000-array[i], 400*nex[i], 100, 100);
    array[i]+=speed;

    if((Math.abs(nex[i]-1)==s1&&1000-array[i]>0&&1000-array[i]<150)&&collect!=2)
      check++;

    if(array[i]>=1110) {
      array.splice(i,1);
      nex.splice(i,1);
      i--;
      arrayPos--;
    }
  }
}

//ball
function createBall() {
  
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(1000-x, -250*y+375, 15, 0, 2 * Math.PI, false);
  ctx.fill();

  x+=speed;
  if(up==0)
    y+=0.025;
  else
    y-=0.025;

  if(y>=1)
    up=1;
  if(y<=0)
    up=0;

  if(x>1110) {
    x=0;
    t2=0;
    if(speed<10&&speed>=6)
      randB=1;
    else if(speed>=10)
      randB=0.5;  
    else
      randB=Math.floor(Math.random()*2.1+1);
  }
  if(collect!=2) {
    if((1000-x>100&&1000-x<150)&&s1==0&&-250*y+375>=335)
      check++;
    if((1000-x>100&&1000-x<150)&&s1==1&&-250*y+375<=165)
      check++;
    if((1000-x>100&&1000-x<150)&&s1==0.5&&Math.abs((-250*y+375)-(-s2*25/3*flipVar+125*s2+250))<=30)
      check+=2;
  }
}

//powerUps
function johnCena() {
  ctx.fillStyle = 'rgba(74, 241, 242, 0.4)';
  ctx.beginPath();
  ctx.arc(1000-x1, 360, 25, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.font = "35px VT323";
  ctx.fillText("I", 992-x1, 369);

  x1+=speed;

  if(x1>1110) {
    x1=0;
    randC=Math.floor(Math.random()*2);
  }

  if(((1000-x1>100&&1000-x1<150)&&s1==0)||((1000-x1>100&&1000-x1<150)&&s1==0.5&&Math.abs(360-(-s2*25/3*flipVar+125*s2+250))<=40))
    collect+=2;
}

function slow() {
  ctx.fillStyle = 'rgba(121, 254, 12, 0.4)';
  ctx.beginPath();
  ctx.arc(1000-x1, 360, 25, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.font = "35px VT323";
  ctx.fillText("S", 992-x1, 369);

  x1+=speed;

  if(x1>1110) {
    x1=0;
    randC=Math.floor(Math.random()*2);
  }

  if(((1000-x1>100&&1000-x1<150)&&s1==0)||((1000-x1>100&&1000-x1<150)&&s1==0.5&&Math.abs(360-(-s2*25/3*flipVar+125*s2+250))<=40))
  collect++;
}



//name SUBMIT
function submit() {
  var el=document.getElementById("name");
  localStorage.setItem("highscoreH", Math.round(totTime/60*100)/100);
  localStorage.setItem("nameH", el.value);
  el.disabled=true;
}

//leaderBoard
function highscore() {
  document.getElementById("scoreboard").style.display="block";
  document.getElementById("text").innerHTML="NAME: "+localStorage.getItem("nameH")+"| TIME: "+localStorage.getItem("highscoreH");
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








//da ANIMATION
function draw() {
  ctx.clearRect(0, 0, 800, 500);
  
  ctx.fillStyle = '	#343434';
  ctx.fillRect(0, 0, 800, 100);
  ctx.fillRect(0, 400, 800, 100);
  
  ctx.save();

  if(change==0) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(100, -300*s1+400);
    ctx.lineTo(150, -300*s1+400);
    ctx.lineTo(-30*s1+140, -200*s1+349);
    ctx.fill();
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

  if(t2/60==randB||(x<=1110&&x>0)) {
      createBall();
  }

  if((totTime%600==0&&totTime>0||(x1<=1110&&x1>0))&&t3==0) {
    if(randC==0)
      johnCena();
    else
      slow();
  }

  t++;
  t2++;
  if(collect!=0) {
    t3++;
    x1=0;
    randC=Math.floor(Math.random()*2);
  }
  totTime++;
  
  //speedup
  if((totTime%150==0&&speed<=12)&&collect==0) {
    speed*=1.05;
    speedReset=speed;
  }

  if(collect==1) {
    speed=speedTemp;
    if(t3/60==3) {
      speed=speedReset;
    }
  }

  if(t3/60==3) {
    collect=0;
    t3=0;
  }
  
  ctx.save();

  if(t3!=0) {
    ctx.fillStyle = "rgba(169, 169, 169, 0.5)";
    ctx.font = "100px VT323";
    ctx.fillText(Math.round((180-t3)/60*100)/100, 320, 275);
  }

  ctx.restore;

  reqId=window.requestAnimationFrame(draw);
  
  if(check==1||check==4) {
    window.cancelAnimationFrame(reqId);

    if(localStorage.getItem("highscoreH")==null) {
      document.getElementById("resultH").innerHTML="Survived for "+Math.round(totTime/60*100)/100+" seconds";
      document.getElementById("highscore").style.display="block";
      fadeIn(document.getElementById("highscore"), 0.25);
    }
    else if(Math.round(totTime/60*100)/100>localStorage.getItem("highscoreH")) {
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



