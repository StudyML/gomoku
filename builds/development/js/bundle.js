(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  var win = [[1, 1, 1, 1, 1]];
  var unCovered4 = [[0, 1, 1, 1, 1, 0]];
  var unCovered3 = [
    [0, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 0], [0, 1, 1, 0, 1, 0]
  ];
  var unCovered2 = [
    [0, 0, 1, 1, 0, 0], [0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0], [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0], [0, 1, 0, 0, 1, 0]
  ];
  var covered4 = [
    [-1, 1, 0, 1, 1, 1], [-1, 1, 1, 0, 1, 1],
    [-1, 1, 1, 1, 0, 1], [-1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, -1], [1, 0, 1, 1, 1, -1],
    [1, 1, 0, 1, 1, -1], [1, 1, 1, 0, 1, -1]
  ];
  var covered3 = [
    [-1, 1, 1, 1, 0, 0], [-1, 1, 1, 0, 1, 0],
    [-1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, -1],
    [0, 1, 0, 1, 1, -1], [0, 1, 1, 0, 1, -1],
    [-1, 1, 0, 1, 0, 1, -1], [-1, 0, 1, 1, 1, 0, -1],
    [-1, 1, 1, 0, 0, 1, -1], [-1, 1, 0, 0, 1, 1, -1]
  ];

  (function() { //add same combinations for another player
    var allCombos = [win, unCovered4, unCovered3, unCovered2, covered4, covered3];
    for (var k = 0; k < allCombos.length; k++) {
      var temp = [];
      for (var j = 0; j < allCombos[k].length; j++) {
        var tmp = [];
        for (var i = 0; i < allCombos[k][j].length; i++)
          tmp[i] = -allCombos[k][j][i];
        temp.push(tmp);
      }
      for (var m = 0; m < temp.length; m++) {
        allCombos[k].push(temp[m]);
      }
    }
  }());

  var valueCombo = function(w, u2, u3, u4, c3, c4) {
    if (w > 0)            return 1000000000;
    if (u4 > 0)           return 100000000;
    if (c4 > 1)           return 10000000;
    if (u3 > 0 && c4 > 0) return 1000000;
    if (u3 > 1)           return 100000;

    if (u3 == 1) {
      if (u2 == 3)        return 40000;
      if (u2 == 2)        return 38000;
      if (u2 == 1)        return 35000;
      return 3450;
    }

    if (c4 == 1) {
      if (u2 == 3)        return 4500;
      if (u2 == 2)        return 4200;
      if (u2 == 1)        return 4100;
      return 4050;
    }

    if (c3 == 1) {
      if (u2 == 3)        return 3400;
      if (u2 == 2)        return 3300;
      if (u2 == 1)        return 3100;
    }

    if (c3 == 2) {
      if (u2 == 2)        return 3000;
      if (u2 == 1)        return 2900;
    }

    if (c3 == 3) {
      if (u2 == 1)        return 2800;
    }

    if (u2 == 4)          return 2700;
    if (u2 == 3)          return 2500;
    if (u2 == 2)          return 2000;
    if (u2 == 1)          return 1000;
    return 0;
  };

  var findArray = function(arr, inArr){
    var fCount = arr.length;
    var sCount = inArr.length;
    var k;
    for (var i = 0; i <= fCount - sCount; i++)
    {
      k = 0;
      for (var j = 0; j < sCount; j++)
      {
        if (arr[i + j] == inArr[j]) k++;
        else break;
      }
      if (k == sCount) return true;
    }
    return false;
  };

  var isAnyInArrays = function(combos, arr){
    for (var i = 0; i < combos.length; i++) {
      if (findArray(arr, combos[i])) return true;
    }
    return false;
  };

  var combinations = {};
  combinations.winValue = 1000000000;
  combinations.valuePosition = function(arr1,  arr2,  arr3,  arr4){ // 4 directions
    var w = 0, u2 = 0, u3 = 0, u4 = 0, c3 = 0, c4 = 0;
    var allArr = [arr1,  arr2,  arr3,  arr4];
    for (var i = 0; i < allArr.length; i++) {
      if (isAnyInArrays(win, allArr[i])) {
        w++;
        continue;
      }
      if (isAnyInArrays(covered4, allArr[i])) {
        c4++;
        continue;
      }
      if (isAnyInArrays(covered3, allArr[i])) {
        c3++;
        continue;
      }
      if (isAnyInArrays(unCovered4, allArr[i])) {
        u4++;
        continue;
      }
      if (isAnyInArrays(unCovered3, allArr[i])) {
        u3++;
        continue;
      }
      if (isAnyInArrays(unCovered2, allArr[i])) {
        u2++;
      }
    }
    return valueCombo(w, u2, u3, u4, c3, c4);
  };
  return combinations;
};
},{}],2:[function(require,module,exports){
Array.matrix = function(m,n,initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i++) {
    a = [];
    for (j = 0; j < n; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

var initCombinations = require('./combinations');

module.exports = function(player) {
  var gameSize = 5; // 5 in line
  var ring = 1; // ring size around current cells
  var win = false;
  var cellsCount = 15;
  var curState = Array.matrix(15, 15, 0);
  var complexity = 1;
  var maxPlayer = player || -1; // X = 1, O = -1
  var combinations = initCombinations();
  if (maxPlayer === -1) curState[7][7] = 1;

  var checkWin = function() {
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (curState[i][j] == 0) continue;
        var playerVal = combinations.valuePosition(
          getCombo(curState, curState[i][j], i, j, 1, 0),
          getCombo(curState, curState[i][j], i, j, 0, 1),
          getCombo(curState, curState[i][j], i, j, 1, 1),
          getCombo(curState, curState[i][j], i, j, 1, -1)
        );
        if (playerVal === combinations.winValue) {
          win = true;
        }
      }
    }
  };

  var miniMax = function minimax(node, depth, player, parent) {
    if (depth == 0) return heuristic(node, parent);
    var alpha = Number.MIN_VALUE;
    var childs = getChilds(node, player);
    for (var i = 0; i < childs.length; i++) {
      alpha = Math.max(alpha, -minimax(childs[i], depth - 1, -player, node));
    }
    return alpha;
  };

  var isAllSatisfy = function (candidates, pointX, pointY) {
    var counter = 0;
    for (var i = 0; i < candidates.length; i++) {
      if (pointX != candidates[i][0] || pointY != candidates[i][1]) counter++;
    }
    return counter == candidates.length;
  };

  var getChilds = function(parent, player) {
    var children = [];
    var candidates = [];
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (parent[i][j] != 0) {
          for (var k = i - ring; k <= i + ring; k++) {
            for (var l = j - ring; l <= j + ring; l++) {
              if (k >= 0 && l >= 0 && k < cellsCount && l < cellsCount) {
                if (parent[k][l] == 0) {
                  var curPoint = [k, l];
                  var flag = isAllSatisfy(candidates, curPoint[0], curPoint[1]);
                  if (flag) candidates.push(curPoint);
                }
              }
            }
          }
        }
      }
    }
    for (var f = 0; f < candidates.length; f++) {
      var tmp = Array.matrix(cellsCount, cellsCount, 0);
      for (var m = 0; m < cellsCount; m++) {
        for (var n = 0; n < cellsCount; n++) {
          tmp[m][n] = parent[m][n];
        }
      }
      tmp[candidates[f][0]][candidates[f][1]] = -player;
      children.push(tmp);
    }
    return children;
  };

  var getCombo = function(node, curPlayer, i, j, dx, dy) {
    var combo = [curPlayer];
    for (var m = 1; m < gameSize; m++) {
      var nextX1 = i - dx * m;
      var nextY1 = j - dy * m;
      if (nextX1 >= cellsCount || nextY1 >= cellsCount || nextX1 < 0 || nextY1 < 0) break;
      var next1 = node[nextX1][nextY1];
      if (node[nextX1][nextY1] == -curPlayer) {
        combo.unshift(next1);
        break;
      }
      combo.unshift(next1);
    }
    for (var k = 1; k < gameSize; k++) {
      var nextX = i + dx * k;
      var nextY = j + dy * k;
      if (nextX >= cellsCount || nextY >= cellsCount || nextX < 0 || nextY < 0) break;
      var next = node[nextX][nextY];
      if (next == -curPlayer) {
        combo.push(next);
        break;
      }
      combo.push(next);
    }
    return combo;
  };

  var heuristic = function(newNode, oldNode) {
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (newNode[i][j] != oldNode[i][j]) {
          var curCell = newNode[i][j];
          var playerVal = combinations.valuePosition(
            getCombo(newNode, curCell, i, j, 1, 0),
            getCombo(newNode, curCell, i, j, 0, 1),
            getCombo(newNode, curCell, i, j, 1, 1),
            getCombo(newNode, curCell, i, j, 1, -1)
          );
          newNode[i][j] = -curCell;
          var oppositeVal = combinations.valuePosition(
            getCombo(newNode, -curCell, i, j, 1, 0),
            getCombo(newNode, -curCell, i, j, 0, 1),
            getCombo(newNode, -curCell, i, j, 1, 1),
            getCombo(newNode, -curCell, i, j, 1, -1)
          );
          newNode[i][j] = -curCell;
          return 2 * playerVal + oppositeVal;
        }
      }
    }
    return 0;
  };

  var getLogic = {};
  getLogic.winState = "";
  getLogic.makeAnswer = function(x, y) {
    var that = this;
    curState[x][y] = maxPlayer;
    checkWin();
    if (win){
      that.winState = "you win";
      return "";
    }
    var answ = [-1, -1];
    var c = getChilds(curState, maxPlayer);
    var maxChild = -1;
    var maxValue = Number.MIN_VALUE;
    for (var k = 0; k < c.length; k++) {
      var curValue = miniMax(c[k], 0, -maxPlayer, curState);
      if (complexity > 1) {
        //var curValue2 = miniMax(c[k], complexity - 1, -maxPlayer, curState);
        //use it for more complex game!
      }
      if (maxValue < curValue) {
        maxValue = curValue;
        maxChild = k;
      }
    }
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (c[maxChild][i][j] != curState[i][j]) {
          answ[0] = i;
          answ[1] = j;
          curState[answ[0]][answ[1]] = -maxPlayer;
          checkWin();
          if (win) {
            that.winState = "you lost";
          }
          return answ;
        }
      }
    }
    return answ;
  };
  return getLogic;
};
},{"./combinations":1}],3:[function(require,module,exports){
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

},{"./gomoku/logic":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ29tb2t1L2NvbWJpbmF0aW9ucy5qcyIsInNyYy9qcy9nb21va3UvbG9naWMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHdpbiA9IFtbMSwgMSwgMSwgMSwgMV1dO1xuICB2YXIgdW5Db3ZlcmVkNCA9IFtbMCwgMSwgMSwgMSwgMSwgMF1dO1xuICB2YXIgdW5Db3ZlcmVkMyA9IFtcbiAgICBbMCwgMSwgMSwgMSwgMCwgMF0sIFswLCAwLCAxLCAxLCAxLCAwXSxcbiAgICBbMCwgMSwgMCwgMSwgMSwgMF0sIFswLCAxLCAxLCAwLCAxLCAwXVxuICBdO1xuICB2YXIgdW5Db3ZlcmVkMiA9IFtcbiAgICBbMCwgMCwgMSwgMSwgMCwgMF0sIFswLCAxLCAwLCAxLCAwLCAwXSxcbiAgICBbMCwgMCwgMSwgMCwgMSwgMF0sIFswLCAxLCAxLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMSwgMSwgMF0sIFswLCAxLCAwLCAwLCAxLCAwXVxuICBdO1xuICB2YXIgY292ZXJlZDQgPSBbXG4gICAgWy0xLCAxLCAwLCAxLCAxLCAxXSwgWy0xLCAxLCAxLCAwLCAxLCAxXSxcbiAgICBbLTEsIDEsIDEsIDEsIDAsIDFdLCBbLTEsIDEsIDEsIDEsIDEsIDBdLFxuICAgIFswLCAxLCAxLCAxLCAxLCAtMV0sIFsxLCAwLCAxLCAxLCAxLCAtMV0sXG4gICAgWzEsIDEsIDAsIDEsIDEsIC0xXSwgWzEsIDEsIDEsIDAsIDEsIC0xXVxuICBdO1xuICB2YXIgY292ZXJlZDMgPSBbXG4gICAgWy0xLCAxLCAxLCAxLCAwLCAwXSwgWy0xLCAxLCAxLCAwLCAxLCAwXSxcbiAgICBbLTEsIDEsIDAsIDEsIDEsIDBdLCBbMCwgMCwgMSwgMSwgMSwgLTFdLFxuICAgIFswLCAxLCAwLCAxLCAxLCAtMV0sIFswLCAxLCAxLCAwLCAxLCAtMV0sXG4gICAgWy0xLCAxLCAwLCAxLCAwLCAxLCAtMV0sIFstMSwgMCwgMSwgMSwgMSwgMCwgLTFdLFxuICAgIFstMSwgMSwgMSwgMCwgMCwgMSwgLTFdLCBbLTEsIDEsIDAsIDAsIDEsIDEsIC0xXVxuICBdO1xuXG4gIChmdW5jdGlvbigpIHsgLy9hZGQgc2FtZSBjb21iaW5hdGlvbnMgZm9yIGFub3RoZXIgcGxheWVyXG4gICAgdmFyIGFsbENvbWJvcyA9IFt3aW4sIHVuQ292ZXJlZDQsIHVuQ292ZXJlZDMsIHVuQ292ZXJlZDIsIGNvdmVyZWQ0LCBjb3ZlcmVkM107XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBhbGxDb21ib3MubGVuZ3RoOyBrKyspIHtcbiAgICAgIHZhciB0ZW1wID0gW107XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFsbENvbWJvc1trXS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgdG1wID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ29tYm9zW2tdW2pdLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIHRtcFtpXSA9IC1hbGxDb21ib3Nba11bal1baV07XG4gICAgICAgIHRlbXAucHVzaCh0bXApO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCB0ZW1wLmxlbmd0aDsgbSsrKSB7XG4gICAgICAgIGFsbENvbWJvc1trXS5wdXNoKHRlbXBbbV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSgpKTtcblxuICB2YXIgdmFsdWVDb21ibyA9IGZ1bmN0aW9uKHcsIHUyLCB1MywgdTQsIGMzLCBjNCkge1xuICAgIGlmICh3ID4gMCkgICAgICAgICAgICByZXR1cm4gMTAwMDAwMDAwMDtcbiAgICBpZiAodTQgPiAwKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDAwMDtcbiAgICBpZiAoYzQgPiAxKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDAwO1xuICAgIGlmICh1MyA+IDAgJiYgYzQgPiAwKSByZXR1cm4gMTAwMDAwMDtcbiAgICBpZiAodTMgPiAxKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDtcblxuICAgIGlmICh1MyA9PSAxKSB7XG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiA0MDAwMDtcbiAgICAgIGlmICh1MiA9PSAyKSAgICAgICAgcmV0dXJuIDM4MDAwO1xuICAgICAgaWYgKHUyID09IDEpICAgICAgICByZXR1cm4gMzUwMDA7XG4gICAgICByZXR1cm4gMzQ1MDtcbiAgICB9XG5cbiAgICBpZiAoYzQgPT0gMSkge1xuICAgICAgaWYgKHUyID09IDMpICAgICAgICByZXR1cm4gNDUwMDtcbiAgICAgIGlmICh1MiA9PSAyKSAgICAgICAgcmV0dXJuIDQyMDA7XG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiA0MTAwO1xuICAgICAgcmV0dXJuIDQwNTA7XG4gICAgfVxuXG4gICAgaWYgKGMzID09IDEpIHtcbiAgICAgIGlmICh1MiA9PSAzKSAgICAgICAgcmV0dXJuIDM0MDA7XG4gICAgICBpZiAodTIgPT0gMikgICAgICAgIHJldHVybiAzMzAwO1xuICAgICAgaWYgKHUyID09IDEpICAgICAgICByZXR1cm4gMzEwMDtcbiAgICB9XG5cbiAgICBpZiAoYzMgPT0gMikge1xuICAgICAgaWYgKHUyID09IDIpICAgICAgICByZXR1cm4gMzAwMDtcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDI5MDA7XG4gICAgfVxuXG4gICAgaWYgKGMzID09IDMpIHtcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDI4MDA7XG4gICAgfVxuXG4gICAgaWYgKHUyID09IDQpICAgICAgICAgIHJldHVybiAyNzAwO1xuICAgIGlmICh1MiA9PSAzKSAgICAgICAgICByZXR1cm4gMjUwMDtcbiAgICBpZiAodTIgPT0gMikgICAgICAgICAgcmV0dXJuIDIwMDA7XG4gICAgaWYgKHUyID09IDEpICAgICAgICAgIHJldHVybiAxMDAwO1xuICAgIHJldHVybiAwO1xuICB9O1xuXG4gIHZhciBmaW5kQXJyYXkgPSBmdW5jdGlvbihhcnIsIGluQXJyKXtcbiAgICB2YXIgZkNvdW50ID0gYXJyLmxlbmd0aDtcbiAgICB2YXIgc0NvdW50ID0gaW5BcnIubGVuZ3RoO1xuICAgIHZhciBrO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGZDb3VudCAtIHNDb3VudDsgaSsrKVxuICAgIHtcbiAgICAgIGsgPSAwO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzQ291bnQ7IGorKylcbiAgICAgIHtcbiAgICAgICAgaWYgKGFycltpICsgal0gPT0gaW5BcnJbal0pIGsrKztcbiAgICAgICAgZWxzZSBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChrID09IHNDb3VudCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB2YXIgaXNBbnlJbkFycmF5cyA9IGZ1bmN0aW9uKGNvbWJvcywgYXJyKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbWJvcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGZpbmRBcnJheShhcnIsIGNvbWJvc1tpXSkpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdmFyIGNvbWJpbmF0aW9ucyA9IHt9O1xuICBjb21iaW5hdGlvbnMud2luVmFsdWUgPSAxMDAwMDAwMDAwO1xuICBjb21iaW5hdGlvbnMudmFsdWVQb3NpdGlvbiA9IGZ1bmN0aW9uKGFycjEsICBhcnIyLCAgYXJyMywgIGFycjQpeyAvLyA0IGRpcmVjdGlvbnNcbiAgICB2YXIgdyA9IDAsIHUyID0gMCwgdTMgPSAwLCB1NCA9IDAsIGMzID0gMCwgYzQgPSAwO1xuICAgIHZhciBhbGxBcnIgPSBbYXJyMSwgIGFycjIsICBhcnIzLCAgYXJyNF07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc0FueUluQXJyYXlzKHdpbiwgYWxsQXJyW2ldKSkge1xuICAgICAgICB3Kys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzQW55SW5BcnJheXMoY292ZXJlZDQsIGFsbEFycltpXSkpIHtcbiAgICAgICAgYzQrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyhjb3ZlcmVkMywgYWxsQXJyW2ldKSkge1xuICAgICAgICBjMysrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FueUluQXJyYXlzKHVuQ292ZXJlZDQsIGFsbEFycltpXSkpIHtcbiAgICAgICAgdTQrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQzLCBhbGxBcnJbaV0pKSB7XG4gICAgICAgIHUzKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzQW55SW5BcnJheXModW5Db3ZlcmVkMiwgYWxsQXJyW2ldKSkge1xuICAgICAgICB1MisrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVDb21ibyh3LCB1MiwgdTMsIHU0LCBjMywgYzQpO1xuICB9O1xuICByZXR1cm4gY29tYmluYXRpb25zO1xufTsiLCJBcnJheS5tYXRyaXggPSBmdW5jdGlvbihtLG4saW5pdGlhbCkge1xuICB2YXIgYSwgaSwgaiwgbWF0ID0gW107XG4gIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICBhID0gW107XG4gICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgYVtqXSA9IGluaXRpYWw7XG4gICAgfVxuICAgIG1hdFtpXSA9IGE7XG4gIH1cbiAgcmV0dXJuIG1hdDtcbn07XG5cbnZhciBpbml0Q29tYmluYXRpb25zID0gcmVxdWlyZSgnLi9jb21iaW5hdGlvbnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgdmFyIGdhbWVTaXplID0gNTsgLy8gNSBpbiBsaW5lXG4gIHZhciByaW5nID0gMTsgLy8gcmluZyBzaXplIGFyb3VuZCBjdXJyZW50IGNlbGxzXG4gIHZhciB3aW4gPSBmYWxzZTtcbiAgdmFyIGNlbGxzQ291bnQgPSAxNTtcbiAgdmFyIGN1clN0YXRlID0gQXJyYXkubWF0cml4KDE1LCAxNSwgMCk7XG4gIHZhciBjb21wbGV4aXR5ID0gMTtcbiAgdmFyIG1heFBsYXllciA9IHBsYXllciB8fCAtMTsgLy8gWCA9IDEsIE8gPSAtMVxuICB2YXIgY29tYmluYXRpb25zID0gaW5pdENvbWJpbmF0aW9ucygpO1xuICBpZiAobWF4UGxheWVyID09PSAtMSkgY3VyU3RhdGVbN11bN10gPSAxO1xuXG4gIHZhciBjaGVja1dpbiA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xuICAgICAgICBpZiAoY3VyU3RhdGVbaV1bal0gPT0gMCkgY29udGludWU7XG4gICAgICAgIHZhciBwbGF5ZXJWYWwgPSBjb21iaW5hdGlvbnMudmFsdWVQb3NpdGlvbihcbiAgICAgICAgICBnZXRDb21ibyhjdXJTdGF0ZSwgY3VyU3RhdGVbaV1bal0sIGksIGosIDEsIDApLFxuICAgICAgICAgIGdldENvbWJvKGN1clN0YXRlLCBjdXJTdGF0ZVtpXVtqXSwgaSwgaiwgMCwgMSksXG4gICAgICAgICAgZ2V0Q29tYm8oY3VyU3RhdGUsIGN1clN0YXRlW2ldW2pdLCBpLCBqLCAxLCAxKSxcbiAgICAgICAgICBnZXRDb21ibyhjdXJTdGF0ZSwgY3VyU3RhdGVbaV1bal0sIGksIGosIDEsIC0xKVxuICAgICAgICApO1xuICAgICAgICBpZiAocGxheWVyVmFsID09PSBjb21iaW5hdGlvbnMud2luVmFsdWUpIHtcbiAgICAgICAgICB3aW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBtaW5pTWF4ID0gZnVuY3Rpb24gbWluaW1heChub2RlLCBkZXB0aCwgcGxheWVyLCBwYXJlbnQpIHtcbiAgICBpZiAoZGVwdGggPT0gMCkgcmV0dXJuIGhldXJpc3RpYyhub2RlLCBwYXJlbnQpO1xuICAgIHZhciBhbHBoYSA9IE51bWJlci5NSU5fVkFMVUU7XG4gICAgdmFyIGNoaWxkcyA9IGdldENoaWxkcyhub2RlLCBwbGF5ZXIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhbHBoYSA9IE1hdGgubWF4KGFscGhhLCAtbWluaW1heChjaGlsZHNbaV0sIGRlcHRoIC0gMSwgLXBsYXllciwgbm9kZSkpO1xuICAgIH1cbiAgICByZXR1cm4gYWxwaGE7XG4gIH07XG5cbiAgdmFyIGlzQWxsU2F0aXNmeSA9IGZ1bmN0aW9uIChjYW5kaWRhdGVzLCBwb2ludFgsIHBvaW50WSkge1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwb2ludFggIT0gY2FuZGlkYXRlc1tpXVswXSB8fCBwb2ludFkgIT0gY2FuZGlkYXRlc1tpXVsxXSkgY291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gY291bnRlciA9PSBjYW5kaWRhdGVzLmxlbmd0aDtcbiAgfTtcblxuICB2YXIgZ2V0Q2hpbGRzID0gZnVuY3Rpb24ocGFyZW50LCBwbGF5ZXIpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgY2FuZGlkYXRlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xuICAgICAgICBpZiAocGFyZW50W2ldW2pdICE9IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBrID0gaSAtIHJpbmc7IGsgPD0gaSArIHJpbmc7IGsrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgbCA9IGogLSByaW5nOyBsIDw9IGogKyByaW5nOyBsKyspIHtcbiAgICAgICAgICAgICAgaWYgKGsgPj0gMCAmJiBsID49IDAgJiYgayA8IGNlbGxzQ291bnQgJiYgbCA8IGNlbGxzQ291bnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50W2tdW2xdID09IDApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjdXJQb2ludCA9IFtrLCBsXTtcbiAgICAgICAgICAgICAgICAgIHZhciBmbGFnID0gaXNBbGxTYXRpc2Z5KGNhbmRpZGF0ZXMsIGN1clBvaW50WzBdLCBjdXJQb2ludFsxXSk7XG4gICAgICAgICAgICAgICAgICBpZiAoZmxhZykgY2FuZGlkYXRlcy5wdXNoKGN1clBvaW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgZiA9IDA7IGYgPCBjYW5kaWRhdGVzLmxlbmd0aDsgZisrKSB7XG4gICAgICB2YXIgdG1wID0gQXJyYXkubWF0cml4KGNlbGxzQ291bnQsIGNlbGxzQ291bnQsIDApO1xuICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCBjZWxsc0NvdW50OyBtKyspIHtcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBjZWxsc0NvdW50OyBuKyspIHtcbiAgICAgICAgICB0bXBbbV1bbl0gPSBwYXJlbnRbbV1bbl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRtcFtjYW5kaWRhdGVzW2ZdWzBdXVtjYW5kaWRhdGVzW2ZdWzFdXSA9IC1wbGF5ZXI7XG4gICAgICBjaGlsZHJlbi5wdXNoKHRtcCk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfTtcblxuICB2YXIgZ2V0Q29tYm8gPSBmdW5jdGlvbihub2RlLCBjdXJQbGF5ZXIsIGksIGosIGR4LCBkeSkge1xuICAgIHZhciBjb21ibyA9IFtjdXJQbGF5ZXJdO1xuICAgIGZvciAodmFyIG0gPSAxOyBtIDwgZ2FtZVNpemU7IG0rKykge1xuICAgICAgdmFyIG5leHRYMSA9IGkgLSBkeCAqIG07XG4gICAgICB2YXIgbmV4dFkxID0gaiAtIGR5ICogbTtcbiAgICAgIGlmIChuZXh0WDEgPj0gY2VsbHNDb3VudCB8fCBuZXh0WTEgPj0gY2VsbHNDb3VudCB8fCBuZXh0WDEgPCAwIHx8IG5leHRZMSA8IDApIGJyZWFrO1xuICAgICAgdmFyIG5leHQxID0gbm9kZVtuZXh0WDFdW25leHRZMV07XG4gICAgICBpZiAobm9kZVtuZXh0WDFdW25leHRZMV0gPT0gLWN1clBsYXllcikge1xuICAgICAgICBjb21iby51bnNoaWZ0KG5leHQxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb21iby51bnNoaWZ0KG5leHQxKTtcbiAgICB9XG4gICAgZm9yICh2YXIgayA9IDE7IGsgPCBnYW1lU2l6ZTsgaysrKSB7XG4gICAgICB2YXIgbmV4dFggPSBpICsgZHggKiBrO1xuICAgICAgdmFyIG5leHRZID0gaiArIGR5ICogaztcbiAgICAgIGlmIChuZXh0WCA+PSBjZWxsc0NvdW50IHx8IG5leHRZID49IGNlbGxzQ291bnQgfHwgbmV4dFggPCAwIHx8IG5leHRZIDwgMCkgYnJlYWs7XG4gICAgICB2YXIgbmV4dCA9IG5vZGVbbmV4dFhdW25leHRZXTtcbiAgICAgIGlmIChuZXh0ID09IC1jdXJQbGF5ZXIpIHtcbiAgICAgICAgY29tYm8ucHVzaChuZXh0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb21iby5wdXNoKG5leHQpO1xuICAgIH1cbiAgICByZXR1cm4gY29tYm87XG4gIH07XG5cbiAgdmFyIGhldXJpc3RpYyA9IGZ1bmN0aW9uKG5ld05vZGUsIG9sZE5vZGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjZWxsc0NvdW50OyBqKyspIHtcbiAgICAgICAgaWYgKG5ld05vZGVbaV1bal0gIT0gb2xkTm9kZVtpXVtqXSkge1xuICAgICAgICAgIHZhciBjdXJDZWxsID0gbmV3Tm9kZVtpXVtqXTtcbiAgICAgICAgICB2YXIgcGxheWVyVmFsID0gY29tYmluYXRpb25zLnZhbHVlUG9zaXRpb24oXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCBjdXJDZWxsLCBpLCBqLCAxLCAwKSxcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIGN1ckNlbGwsIGksIGosIDAsIDEpLFxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgY3VyQ2VsbCwgaSwgaiwgMSwgMSksXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCBjdXJDZWxsLCBpLCBqLCAxLCAtMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG5ld05vZGVbaV1bal0gPSAtY3VyQ2VsbDtcbiAgICAgICAgICB2YXIgb3Bwb3NpdGVWYWwgPSBjb21iaW5hdGlvbnMudmFsdWVQb3NpdGlvbihcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAxLCAwKSxcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAwLCAxKSxcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAxLCAxKSxcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAxLCAtMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG5ld05vZGVbaV1bal0gPSAtY3VyQ2VsbDtcbiAgICAgICAgICByZXR1cm4gMiAqIHBsYXllclZhbCArIG9wcG9zaXRlVmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xuXG4gIHZhciBnZXRMb2dpYyA9IHt9O1xuICBnZXRMb2dpYy53aW5TdGF0ZSA9IFwiXCI7XG4gIGdldExvZ2ljLm1ha2VBbnN3ZXIgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGN1clN0YXRlW3hdW3ldID0gbWF4UGxheWVyO1xuICAgIGNoZWNrV2luKCk7XG4gICAgaWYgKHdpbil7XG4gICAgICB0aGF0LndpblN0YXRlID0gXCJ5b3Ugd2luXCI7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgdmFyIGFuc3cgPSBbLTEsIC0xXTtcbiAgICB2YXIgYyA9IGdldENoaWxkcyhjdXJTdGF0ZSwgbWF4UGxheWVyKTtcbiAgICB2YXIgbWF4Q2hpbGQgPSAtMTtcbiAgICB2YXIgbWF4VmFsdWUgPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYy5sZW5ndGg7IGsrKykge1xuICAgICAgdmFyIGN1clZhbHVlID0gbWluaU1heChjW2tdLCAwLCAtbWF4UGxheWVyLCBjdXJTdGF0ZSk7XG4gICAgICBpZiAoY29tcGxleGl0eSA+IDEpIHtcbiAgICAgICAgLy92YXIgY3VyVmFsdWUyID0gbWluaU1heChjW2tdLCBjb21wbGV4aXR5IC0gMSwgLW1heFBsYXllciwgY3VyU3RhdGUpO1xuICAgICAgICAvL3VzZSBpdCBmb3IgbW9yZSBjb21wbGV4IGdhbWUhXG4gICAgICB9XG4gICAgICBpZiAobWF4VmFsdWUgPCBjdXJWYWx1ZSkge1xuICAgICAgICBtYXhWYWx1ZSA9IGN1clZhbHVlO1xuICAgICAgICBtYXhDaGlsZCA9IGs7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xuICAgICAgICBpZiAoY1ttYXhDaGlsZF1baV1bal0gIT0gY3VyU3RhdGVbaV1bal0pIHtcbiAgICAgICAgICBhbnN3WzBdID0gaTtcbiAgICAgICAgICBhbnN3WzFdID0gajtcbiAgICAgICAgICBjdXJTdGF0ZVthbnN3WzBdXVthbnN3WzFdXSA9IC1tYXhQbGF5ZXI7XG4gICAgICAgICAgY2hlY2tXaW4oKTtcbiAgICAgICAgICBpZiAod2luKSB7XG4gICAgICAgICAgICB0aGF0LndpblN0YXRlID0gXCJ5b3UgbG9zdFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYW5zdztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYW5zdztcbiAgfTtcbiAgcmV0dXJuIGdldExvZ2ljO1xufTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICB2YXIgaW5pdExvZ2ljID0gcmVxdWlyZSgnLi9nb21va3UvbG9naWMnKTtcbiAgdmFyIGxvZ2ljID0gaW5pdExvZ2ljKCk7XG5cbiAgdmFyIGRhdGFiYXNlID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcbiAgdmFyIHN0YXRlID0gW107XG4gIHZhciB0ZW1wID0ge307XG5cbiAgZnVuY3Rpb24gaW5pdFN0YXRlKCkge1xuICAgIGZvcih2YXIgaT0wOyBpPDIyNTsgaSsrKXtcbiAgICAgIHN0YXRlLnB1c2goMCk7XG4gICAgfVxuICAgIHN0YXRlWzExMl0gPSAxO1xuICB9XG5cbiAgJChcIiM3LTdcIikuYWRkQ2xhc3MoXCJib2FyZENlbGxDcm9zc1wiKTtcbiAgdmFyIGN1cnJWYWx1ZSA9IC0xOyAvLyBwbGF5ZXIgLSBPLCBjb21wdXRlciAtIFhcbiAgdmFyIGdhbWVPdmVyID0gZmFsc2U7XG5cbiAgJCgnZGl2LmJvYXJkQ29sJykubW91c2Vkb3duKGhhbmRsZU1vdXNlRG93bik7XG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihlKXtcbiAgICBpZihnYW1lT3ZlcikgcmV0dXJuIFwiXCI7XG4gICAgdmFyIGNlbGwgPSAkKHRoaXMpO1xuICAgIGlmIChjZWxsLmNoaWxkcmVuKCkuaGFzQ2xhc3MoXCJib2FyZENlbGxDaXJjbGVcIikpIHJldHVybiBcIlwiO1xuICAgIGlmIChjZWxsLmNoaWxkcmVuKCkuaGFzQ2xhc3MoXCJib2FyZENlbGxDcm9zc1wiKSkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIGluZGV4ZXMgPSAoY2VsbC5jaGlsZHJlbigpLmF0dHIoJ2lkJykpLnNwbGl0KCctJyk7XG4gICAgdmFyIGlkID0gTnVtYmVyKGluZGV4ZXNbMF0pKjE1K051bWJlcihpbmRleGVzWzFdKTtcblxuICAgIC8vdXNlIGZpcmViYXNlIGRhdGFiYXNlXG4gICAgdGVtcC5zdGF0ZSA9IHN0YXRlO1xuICAgIHRlbXAuYWN0aW9uID0gaWQ7XG4gICAgdmFyIG5ld1Bvc3RLZXkgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpLmNoaWxkKCdnb21va3VfZGF0YScpLnB1c2goKS5rZXk7XG4gICAgdmFyIHVwZGF0ZXMgPSB7fTtcbiAgICB1cGRhdGVzWycvZ29tb2t1X2RhdGEvJyArIG5ld1Bvc3RLZXldID0gdGVtcDtcbiAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpLnVwZGF0ZSh1cGRhdGVzKTtcbiAgICBzdGF0ZVtpZF0gPSAxO1xuICAgIHRlbXAgPSB7fTtcblxuICAgIHZhciBhbnN3ZXIgPSBsb2dpYy5tYWtlQW5zd2VyKGluZGV4ZXNbMF0saW5kZXhlc1sxXSk7XG4gICAgaWYoYW5zd2VyICE9PSBcIlwiKXtcbiAgICAgIHZhciBnZXRlZElkID0gJyMnICthbnN3ZXJbMF0gKyAnLScgKyBhbnN3ZXJbMV07XG4gICAgICAkKGdldGVkSWQpLmFkZENsYXNzKGRlc2VydmUoKSk7XG4gICAgfSBlbHNlIGN1cnJWYWx1ZSAqPSAtMTtcbiAgICBjZWxsLmNoaWxkcmVuKCkuYWRkQ2xhc3MoZGVzZXJ2ZSgpKTtcbiAgICBmdW5jdGlvbiBkZXNlcnZlKCl7XG4gICAgICBjdXJyVmFsdWUgKj0gLTE7XG4gICAgICBpZiAoY3VyclZhbHVlID09PSAxKSB7XG4gICAgICAgIHJldHVybiBcImJvYXJkQ2VsbENyb3NzXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJib2FyZENlbGxDaXJjbGVcIjtcbiAgICB9XG4gICAgaWYgKGxvZ2ljLndpblN0YXRlICE9PSBcIlwiKXtcbiAgICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpO1xuICAgICAgbWVzc2FnZS50ZXh0KGxvZ2ljLndpblN0YXRlKTtcbiAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2UucmVtb3ZlQ2xhc3MoXCJsb29zZVN0YXRlXCIpO1xuICAgICAgaWYgKGxvZ2ljLndpblN0YXRlID09PSBcInlvdSBsb3N0XCIpe1xuICAgICAgICBtZXNzYWdlLmFkZENsYXNzKFwibG9vc2VTdGF0ZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAkKFwiI3NjYWxlLVVwXCIpLmNsaWNrKGhhbmRsZVNjYWxlKTtcbiAgJChcIiNzY2FsZS1Eb3duXCIpLmNsaWNrKGhhbmRsZVNjYWxlKTtcbiAgZnVuY3Rpb24gaGFuZGxlU2NhbGUoZSl7XG4gICAgdmFyIHZhbHVlID0gMTAwO1xuICAgIHZhciBtaW5WYWx1ZSA9IDMwMDtcbiAgICB2YXIgZGVsdGEgPSAgJCh0aGlzKS5hdHRyKCdpZCcpLnNwbGl0KFwiLVwiKVsxXTtcbiAgICB2YXIgYm9hcmQgPSAkKFwiLmJvYXJkXCIpO1xuICAgIHZhciBjb250cm9scyA9ICQoXCIuY29udHJvbHNcIik7XG4gICAgaWYgKGRlbHRhID09PSBcIlVwXCIpe1xuICAgICAgYm9hcmQud2lkdGgoYm9hcmQud2lkdGgoKSArIHZhbHVlKTtcbiAgICAgIGJvYXJkLmhlaWdodChib2FyZC5oZWlnaHQoKSArIHZhbHVlKTtcbiAgICAgIGNvbnRyb2xzLndpZHRoKGNvbnRyb2xzLndpZHRoKCkgKyB2YWx1ZSk7XG4gICAgICBjb250cm9scy5oZWlnaHQoY29udHJvbHMuaGVpZ2h0KCkgKyB2YWx1ZS8xNSk7XG4gICAgfVxuICAgIGlmIChkZWx0YSA9PT0gXCJEb3duXCIgJiYgYm9hcmQud2lkdGgoKSA+IG1pblZhbHVlKXtcbiAgICAgIGJvYXJkLndpZHRoKGJvYXJkLndpZHRoKCkgLSB2YWx1ZSk7XG4gICAgICBib2FyZC5oZWlnaHQoYm9hcmQuaGVpZ2h0KCkgLSB2YWx1ZSk7XG4gICAgICBjb250cm9scy53aWR0aChjb250cm9scy53aWR0aCgpIC0gdmFsdWUpO1xuICAgICAgY29udHJvbHMuaGVpZ2h0KGNvbnRyb2xzLmhlaWdodCgpIC0gdmFsdWUvMTUpO1xuICAgIH1cbiAgfVxuXG4gICQoXCIjbmV3LU9cIikucGFyZW50KCkuY2xpY2soaGFuZGxlTmV3R2FtZSk7XG4gICQoXCIjbmV3LVhcIikucGFyZW50KCkuY2xpY2soaGFuZGxlTmV3R2FtZSk7XG4gIGZ1bmN0aW9uIGhhbmRsZU5ld0dhbWUoZSl7XG4gICAgaW5pdFN0YXRlKCk7XG4gICAgdmFyIGluZGV4ID0gKCQodGhpcykuY2hpbGRyZW4oKS5hdHRyKCdpZCcpKS5zcGxpdChcIi1cIilbMV07XG4gICAgJChcIi5ib2FyZENlbGxcIikucmVtb3ZlQ2xhc3MoXCJib2FyZENlbGxDcm9zcyBib2FyZENlbGxDaXJjbGVcIik7XG4gICAgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAkKFwiI21lc3NhZ2VcIikudGV4dChcIlwiKTtcbiAgICBpZiAoaW5kZXggPT09IFwiT1wiKXtcbiAgICAgIGxvZ2ljID0gaW5pdExvZ2ljKCk7XG4gICAgICAkKFwiIzctN1wiKS5hZGRDbGFzcyhcImJvYXJkQ2VsbENyb3NzXCIpO1xuICAgICAgY3VyclZhbHVlID0gLTE7XG4gICAgfVxuICAgIGlmIChpbmRleCA9PT0gXCJYXCIpe1xuICAgICAgbG9naWMgPSBpbml0TG9naWMoMSk7XG4gICAgICBjdXJyVmFsdWUgPSAxO1xuICAgIH1cbiAgICAkKFwiI2NoZWNrXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gIH1cblxufSk7XG4iXX0=
