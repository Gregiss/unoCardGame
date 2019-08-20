var myCards = [];

var enemyCards = [];

var cardX = -240;

var cardY = -360;

var bolinho = [];

var vez = 0;

var more4 = "-3119px -4322px";

var timer = [
  {"timer" : 100},
  {"timer" : 100}
];

$("a").click(function(){
  return false;
});

const changeColorHtml = '<div class="changeColor"> <h1>Escolha uma nova cor</h1> <div class="newcolor red" data-id="0"></div> <div class="newcolor orange" data-id="1"></div> <div class="newcolor green" data-id="2"></div> <div class="newcolor blue" data-id="3"></div> </div>';

const winHtml = '<div class="txt"><h1>Você ganhou parabéns :D</h1><br> <h2>Deseja jogar novamente?</h2> <button id="playagain">Sim</button> <button id="menu">Não</button></div>';

const EnemywinHtml = '<div class="txt"><h1>Você perdeu :/</h1><br> <h2>Deseja jogar novamente?</h2> <button id="playagain">Sim</button> <button id="menu">Não</button></div>';

const newGameHtml = '<div class="myhands"><div class="comprar"><p>Comprar carta</p></div> <div class="avatar"><div class="time"><div class="progress"></div></div></div> <div class="before"></div> </div> <div class="enemyhands"> <div class="avatar"><div class="time"><div class="progress"></div></div></div> <div class="before"></div> </div> <div class="bolinho">';

function newCard(number, color, who){
  var newC = {number: number, color: color};
  var whereX = number * cardX;
  var whereY = color * cardY;
  if(who == "me"){
    myCards.push(newC);
  }
  else{
 enemyCards.push(newC);
  }
}

function generateCard(who){
  if(who == "me"){
    var randomCard = Math.floor(Math.random() * 16);
    var randomColor = Math.floor(Math.random() * 4);
    newCard(randomCard, randomColor, "me");
    changeMyHand();
  } else{
    var randomCard = Math.floor(Math.random() * 10);
    var randomColor = Math.floor(Math.random() * 4);
    newCard(randomCard, randomColor, "enemy");
    botCardChange();
  }
}

hands();

function generateMyHands(){
 for(var i = 0; i < 7; i++){
   generateCard("me");
 } 
}

function generateEnemyHands(){
  for(var i = 0; i < 7; i++){
   generateCard("enemy");
 }
}

function hands(){
  $(".myhands").mouseover(function(){
    $(this).addClass("activeHands");
  });
  
  $(".myhands").mouseout(function(){
    $(this).removeClass("activeHands");
  });
}

function showCard(){
  $(".card").mouseover(function(){
    $(this).addClass("cardHover");
  });
  
  $(".card").mouseover(function(){
    $(this).removeClass("cardHover");
  });
}

function newBolinho(number, color){
  bolinho = {number: number, color: color};
  var whereX = number * cardX;
  var whereY = color * cardY;
  $(".bolinho").html("<div class='card' style='background-position: "+whereX+"px "+whereY+"px;'></div>");
  console.log(number, color);
  var colorText;
  if(color == 0){
    colorText = "var(--red)";
  } else if(color == 1){
    colorText = "var(--orange)";
  } else if(color == 2){
    colorText = "var(--green)";
  } else if(color == 3){
    colorText = "var(--blue)";
  }
  $(".bolinho").css("background", colorText);
}

function generateBolinho(){
  var randomCard = Math.floor(Math.random() * 10);
  var randomColor = Math.floor(Math.random() * 4);
  newBolinho(randomCard, randomColor);
}

function jogar(){
  timer[0].timer = 100;
  $(".myhands .card").click(function(){
    if(vez == 0){
    var myCardId = $(this).data("cardid");
    var myCardColor = $(this).data("cardcolor");
    var posid = $(this).data("id");
    if(myCardId == 13){
      cardsEspeciais(13);
      vez = 1;
      myCards.splice(posid, 1);
    } else if(myCardId == 15){
      cardsEspeciais(15);
      vez = 0;
      myCards.splice(posid, 1);
    }
    if(bolinho.number == myCardId || bolinho.color == myCardColor || bolinho.number == 13){
      newBolinho(myCardId, myCardColor);
      if(myCardColor == -1){
        return false; 
      } else{
        myCards.splice(posid, 1);
      }
      if(myCardId == 10){
      vez = 0;
      pulouVez();
      }
      else if(myCardId == 11){
        vez = 0;
        pulouVez();
      } else if(myCardId == 12){
        vez = 0;
        botCompraTwo();
      } else{
        vez = 1;
      }
    botPlay();
    }
      changeMyHand();
    }
  });
}

var possoTrocaCor = false;

function cardsEspeciais(cardId){
  if(cardId == 13){
    possoTrocaCor = true;
    changeColor(cardId);
  } else if(cardId == 15){
    possoTrocaCor = true;
    changeColor(cardId);
  }
}

function changeColor(cardId){
  if(possoTrocaCor){
  if(cardId == 13 ){
    showModal("changeColor");
  } else if(cardId == 15){
    showModal("changeColor4");
  }
  }
}

function pulouVez(){
  if(vez == 0){
    showModal("skip");
  }
}

function bolinhoChangeColor(color){
  newBolinho(-1, color);
}

function bolinhoChangeColor4(color){
  newBolinho(15, color);
  $(".bolinho").html("<div class='card' style='background-position: "+more4+";'></div>");
}

function showModal(what){
  $(".modal").addClass("modalActive");
  if(what == "changeColor"){
    $(".modal").html(changeColorHtml);
    trocarColor();
  } else if(what == "changeColor4"){
    $(".modal").html(changeColorHtml);
    trocarColor4();
    more4ToBot();
  }else if(what == "skip"){
    $(".modal").html('<div class="txt"> <h1>Você pulou a vez do Bot , é novamente sua vez :D</h1> </div>');
    setTimeout(function(){ closeModal(); }, 3000);
  } else if(what == "win"){
    $(".modal").html(winHtml);
    buttonsMsgModal();
  } else if(what == "enemywin"){
    $(".modal").html(EnemywinHtml);
    buttonsMsgModal();
  }
}

function buttonsMsgModal(){
  $("#playagain").click(function(){
    ganhou = false;
    $(".myhands").html('<div class="comprar"><p>Comprar carta</p></div><div class="avatar"><div class="time"><div class="progress"></div></div></div> <div class="before"></div>');
    $(".enemyhands").html('<div class="avatar"><div class="time"><div class="progress"></div></div></div> <div class="before"></div>');
    closeModal();
    newGame();
  });
  $("#menu").click(function(){
    $(".menu").removeClass("hidden");
  })
}

function closeModal(){
  $(".modal").removeClass("modalActive");
  $(".modal").html('');
}

function trocarColor(){
  $(".changeColor .newcolor").click(function(){
    var color = $(this).data("id");
    bolinhoChangeColor(color);
    $(".modal").removeClass("modalActive");
    $(".modal").html("");
    possoTrocaCor = false;
   setInterval(function(){
    botPlay();
   }, 1000);
  });
}

function trocarColor4(){
  $(".changeColor .newcolor").click(function(){
    var color = $(this).data("id");
    bolinhoChangeColor4(color);
    $(".modal").removeClass("modalActive");
    $(".modal").html("");
    possoTrocaCor = false;
   setInterval(function(){
    botPlay();
   }, 1000);
  });
}

function menu(){
  
}

var ganhou = false;

function verificarSeGanhou(){
  setInterval(function(){
  if(ganhou == false){
  if(myCards.length == 0){
    ganhou = true;
    showModal("win");
  } else if(enemyCards.length == 0){
    ganhou = true;
    showModal("enemywin");
  }
  }
  }, 300);
}

function botPlay(){
  timer[1].timer = 100;
  setTimeout(function(){
  var jogou = false;
  if(vez == 1){
    for(var i = 0; i < enemyCards.length; i++){
      if(bolinho.number == enemyCards[i].number || bolinho.color == enemyCards[i].color){
        newBolinho(enemyCards[i].number, enemyCards[i].color);
        enemyCards.splice(i, 1);
        jogou = true;
        break;
      }
    }
    console.log(jogou);
    if(jogou == false){
      botComprar();
      console.log("Bot comprou");
    }
    vez = 0;
    botCardChange();
  }
    }, 4500);
  timer[1].timer = 100;
}

function botComprar(){
  var randomCard = Math.floor(Math.random() * 10);
  var randomColor = Math.floor(Math.random() * 4);
   var newC = {number: randomCard, color: randomColor};
   enemyCards.push(newC);
   botCardChange();
}

function changeMyHand(){
  $(".myhands").html("<div class='comprar'><p>Comprar carta</p></div><div class='avatar'><div class='time'><div class='progress'></div></div></div><div class='before'></div>");
  for(var i = 0; i < myCards.length; i++){
    var whereX = myCards[i].number * cardX;
    var whereY = myCards[i].color * cardY;
     if(myCards[i].number == 13){
      $(".myhands .before").before("<div class='card' data-id='"+i+"' data-cardid='"+myCards[i].number+"' data-cardcolor='-1'  style='background-position: "+whereX+"px "+whereY+"px;'></div>");
    } else if(myCards[i].number >= 15 && myCards[i].number <= 17){
      $(".myhands .before").before("<div class='card' data-id='"+i+"' data-cardid='"+myCards[i].number+"' data-cardcolor='-1'  style='background-position: "+more4+";'></div>");
    }  else{
      $(".myhands .before").before("<div class='card' data-id='"+i+"' data-cardid='"+myCards[i].number+"' data-cardcolor='"+myCards[i].color+"'  style='background-position: "+whereX+"px "+whereY+"px;'></div>");
    }
  }
  jogar();
  comprar();
}

function botCompraTwo(){
  for(var i = 0; i < 2; i++){
    var randomCard = Math.floor(Math.random() * 10);
    var randomColor = Math.floor(Math.random() * 4);
    var newC = {number: randomCard, color: randomColor};
    enemyCards.push(newC);
  }
   botCardChange();
}

function more4ToBot(){
  for(var i = 0; i < 4; i++){
    var randomCard = Math.floor(Math.random() * 10);
    var randomColor = Math.floor(Math.random() * 4);
    var newC = {number: randomCard, color: randomColor};
    enemyCards.push(newC);
  }
   botCardChange();
}

function time(){
  setInterval(function(){
    if(vez == 0){
      if(timer[0].timer >= 0){
        timer[0].timer--;
      } else{
        vez = 1;
        timer[0].timer = 100;
        botPlay();
      }
    } else if(vez == 1){
      if(timer[1].timer >= 0){
        timer[1].timer--;
      } else{
        vez = 0;
        timer[1].timer = 100;
      }
    }
    changeTime();
  }, 300);
}

function changeTime(){
  if(ganhou == false){
    $(".enemyhands .avatar .time .progress").css("height", timer[1].timer + "%");
    $(".myhands .avatar .time .progress").css("height", timer[0].timer + "%");
  }
}

function botCardChange(){
  $(".enemyhands").html("<div class='avatar'><div class='time'><div class='progress'></div></div></div><div class='before'></div>");
  for(var i = 0; i < enemyCards.length; i++){
    $(".enemyhands .before").before("<div class='card'></div>");
  }
}

var possoComprar = true;

function comprar(){
  $(".comprar").click(function(){
    if(possoComprar == true){
    possoComprar = false;
    generateCard("me");
    jogar();
    } else{
      timeOutComprar();
    }
  })
}

function timeOutComprar(){
  setInterval(function(){
    possoComprar = true;
  }, 100);
}

function newGame(){
  generateMyHands();
  generateEnemyHands();
  showCard();
  generateBolinho();
  jogar();
  comprar();
  verificarSeGanhou();
  time();
}

function main(){
  $(".newGame").click(function(){
    $(".menu").addClass("hidden");
    $(".cards").html(newGameHtml);
    newGame();
  });
}

main();
