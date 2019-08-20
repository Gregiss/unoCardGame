var myCards = [];

var enemyCards = [];

var cardX = -240;

var cardY = -360;

var bolinho = [];

var vez = 0;

$("a").click(function(){
  return false;
});

const changeColorHtml = '<div class="changeColor"> <h1>Escolha uma nova cor</h1> <div class="newcolor red" data-id="0"></div> <div class="newcolor orange" data-id="1"></div> <div class="newcolor green" data-id="2"></div> <div class="newcolor blue" data-id="3"></div> </div>';

const winHtml = '<div class="txt"><h1>Você ganhou parabéns :D</h1><br> <h2>Deseja jogar novamente?</h2> <button id="playagain">Sim</button> <button id="menu">Não</button></div>';

const EnemywinHtml = '<div class="txt"><h1>Você perdeu :/</h1><br> <h2>Deseja jogar novamente?</h2> <button id="playagain">Sim</button> <button id="menu">Não</button></div>';

const newGameHtml = '<div class="myhands"><div class="comprar"><p>Comprar carta</p></div> <div class="avatar"></div> <div class="before"></div> </div> <div class="enemyhands"> <div class="avatar"></div> <div class="before"></div> </div> <div class="bolinho">';

function newCard(number, color, i, who){
  var newC = {number: number, color: color};
  var whereX = number * cardX;
  var whereY = color * cardY;
  if(who == "me"){
    myCards.push(newC);
    if(number == 13){
      $(".myhands .before").before("<div class='card' data-id='"+i+"' data-cardid='"+number+"' data-cardcolor='-1'  style='background-position: "+whereX+"px "+whereY+"px;'></div>");
    } else{
      $(".myhands .before").before("<div class='card' data-id='"+i+"' data-cardid='"+number+"' data-cardcolor='"+color+"'  style='background-position: "+whereX+"px "+whereY+"px;'></div>");
    }
  } else{
    enemyCards.push(newC);
     $(".enemyhands .before").before("<div class='card'></div>");
  }
}

function generateCard(i, who){
  if(who == "me"){
    var randomCard = Math.floor(Math.random() * 14);
    var randomColor = Math.floor(Math.random() * 4);
    newCard(randomCard, randomColor, i, "me");
  } else{
    var randomCard = Math.floor(Math.random() * 10);
    var randomColor = Math.floor(Math.random() * 4);
    newCard(randomCard, randomColor, i, "enemy");
  }
}

hands();

function generateMyHands(){
 for(var i = 0; i < 7; i++){
   generateCard(i, "me");
 } 
}

function generateEnemyHands(){
  for(var i = 0; i < 7; i++){
   generateCard(i, "enemy");
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
  $(".myhands .card").click(function(){
    if(vez == 0){
    var myCardId = $(this).data("cardid");
    var myCardColor = $(this).data("cardcolor");
    var posid = $(this).data("id");
    if(myCardId == 13){
      cardsEspeciais(13);
      vez = 1;
      myCards.splice(posid, 1);
    }
    if(bolinho.number == myCardId || bolinho.color == myCardColor || bolinho.number == 13){
      newBolinho(myCardId, myCardColor);
      if(myCardColor == -1){
        return false; 
      } else{
        myCards.splice(posid, 1);
      }
      console.log("Pode jogar");
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
    } else{
      console.log("Não pode jogar " + myCardId + "|" + myCardColor);
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
  }
}

function changeColor(cardId){
  if(possoTrocaCor){
  if(cardId == 13){
    showModal("changeColor");
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

function showModal(what){
  $(".modal").addClass("modalActive");
  if(what == "changeColor"){
    $(".modal").html(changeColorHtml);
    trocarColor();
  } else if(what == "skip"){
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
    $(".myhands").html('<div class="avatar"></div> <div class="before"></div>');
    $(".enemyhands").html('<div class="avatar"></div> <div class="before"></div>');
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
}

function botComprar(){
  var randomCard = Math.floor(Math.random() * 10);
  var randomColor = Math.floor(Math.random() * 4);
   var newC = {number: randomCard, color: randomColor};
   enemyCards.push(newC);
   botCardChange();
}

function changeMyHand(){
  $(".myhands").html("<div class='comprar'><p>Comprar carta</p></div><div class='avatar'></div><div class='before'></div>");
  for(var i = 0; i < myCards.length; i++){
    var whereX = myCards[i].number * cardX;
    var whereY = myCards[i].color * cardY;
     if(myCards[i].number == 13){
      $(".myhands .before").before("<div class='card' data-id='"+i+"' data-cardid='"+myCards[i].number+"' data-cardcolor='-1'  style='background-position: "+whereX+"px "+whereY+"px;'></div>");
    } else{
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

function botCardChange(){
  $(".enemyhands").html("<div class='avatar'></div><div class='before'></div>");
  for(var i = 0; i < enemyCards.length; i++){
    $(".enemyhands .before").before("<div class='card'></div>");
  }
}

var possoComprar = true;

function comprar(){
  $(".comprar").click(function(){
    if(possoComprar == true){
    possoComprar = false;
    generateCard(myCards.length, "me");
    jogar();
    } else{
      timeOutComprar();
    }
  })
}

function timeOutComprar(){
  setInterval(function(){
    possoComprar = true;
  }, 400);
}

function newGame(){
  generateMyHands();
  generateEnemyHands();
  showCard();
  generateBolinho();
  jogar();
  comprar();
  verificarSeGanhou();
}

function main(){
  $(".newGame").click(function(){
    $(".menu").addClass("hidden");
    $(".cards").html(newGameHtml);
    newGame();
  });
}

main();
