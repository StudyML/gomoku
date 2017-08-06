$(document).ready(function(){
  var initLogic = require('./gomoku/logic');
  var logic = initLogic();

  var database = firebase.database();
  var state = [];
  var temp = {};

  function initState() {
    for(var i=0; i<225; i++){
      state.push(0);
    }
    state[112] = 1;
  }

  $("#7-7").addClass("boardCellCross");
  var currValue = -1; // player - O, computer - X
  var gameOver = false;

  $('div.boardCol').mousedown(handleMouseDown);
  function handleMouseDown(e){
    if(gameOver) return "";
    var cell = $(this);
    if (cell.children().hasClass("boardCellCircle")) return "";
    if (cell.children().hasClass("boardCellCross")) return "";
    var indexes = (cell.children().attr('id')).split('-');
    var id = Number(indexes[0])*15+Number(indexes[1]);

    //use firebase database
    temp.state = state;
    temp.action = id;
    var newPostKey = firebase.database().ref().child('gomoku_data').push().key;
    var updates = {};
    updates['/gomoku_data/' + newPostKey] = temp;
    firebase.database().ref().update(updates);
    state[id] = 1;
    temp = {};

    var answer = logic.makeAnswer(indexes[0],indexes[1]);
    if(answer !== ""){
      var getedId = '#' +answer[0] + '-' + answer[1];
      $(getedId).addClass(deserve());
    } else currValue *= -1;
    cell.children().addClass(deserve());
    function deserve(){
      currValue *= -1;
      if (currValue === 1) {
        return "boardCellCross";
      }
      return "boardCellCircle";
    }
    if (logic.winState !== ""){
      var message = $("#message");
      message.text(logic.winState);
      gameOver = true;
      message.removeClass("looseState");
      if (logic.winState === "you lost"){
        message.addClass("looseState");
      }
    }
  }

  $("#scale-Up").click(handleScale);
  $("#scale-Down").click(handleScale);
  function handleScale(e){
    var value = 100;
    var minValue = 300;
    var delta =  $(this).attr('id').split("-")[1];
    var board = $(".board");
    var controls = $(".controls");
    if (delta === "Up"){
      board.width(board.width() + value);
      board.height(board.height() + value);
      controls.width(controls.width() + value);
      controls.height(controls.height() + value/15);
    }
    if (delta === "Down" && board.width() > minValue){
      board.width(board.width() - value);
      board.height(board.height() - value);
      controls.width(controls.width() - value);
      controls.height(controls.height() - value/15);
    }
  }

  $("#new-O").parent().click(handleNewGame);
  $("#new-X").parent().click(handleNewGame);
  function handleNewGame(e){
    initState();
    var index = ($(this).children().attr('id')).split("-")[1];
    $(".boardCell").removeClass("boardCellCross boardCellCircle");
    gameOver = false;
    $("#message").text("");
    if (index === "O"){
      logic = initLogic();
      $("#7-7").addClass("boardCellCross");
      currValue = -1;
    }
    if (index === "X"){
      logic = initLogic(1);
      currValue = 1;
    }
    $("#check").prop('checked', false);
  }

});
