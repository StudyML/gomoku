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

  $("#7-7").addClass("boardCellCross");
  var currValue = -1; // player - O, computer - X
  var gameOver = false;

  $('div.boardCol').mousedown(handleMouseDown);
  function handleMouseDown(e){
    if(gameOver) return "";
    var cell = $(this);
    if (cell.children().hasClass("boardCellCircle")) return "";
    if (cell.children().hasClass("boardCellCross")) return "";
    var indexes = (cell.children().attr('id')).split("-");
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ29tb2t1L2NvbWJpbmF0aW9ucy5qcyIsInNyYy9qcy9nb21va3UvbG9naWMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd2luID0gW1sxLCAxLCAxLCAxLCAxXV07XG4gIHZhciB1bkNvdmVyZWQ0ID0gW1swLCAxLCAxLCAxLCAxLCAwXV07XG4gIHZhciB1bkNvdmVyZWQzID0gW1xuICAgIFswLCAxLCAxLCAxLCAwLCAwXSwgWzAsIDAsIDEsIDEsIDEsIDBdLFxuICAgIFswLCAxLCAwLCAxLCAxLCAwXSwgWzAsIDEsIDEsIDAsIDEsIDBdXG4gIF07XG4gIHZhciB1bkNvdmVyZWQyID0gW1xuICAgIFswLCAwLCAxLCAxLCAwLCAwXSwgWzAsIDEsIDAsIDEsIDAsIDBdLFxuICAgIFswLCAwLCAxLCAwLCAxLCAwXSwgWzAsIDEsIDEsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAxLCAxLCAwXSwgWzAsIDEsIDAsIDAsIDEsIDBdXG4gIF07XG4gIHZhciBjb3ZlcmVkNCA9IFtcbiAgICBbLTEsIDEsIDAsIDEsIDEsIDFdLCBbLTEsIDEsIDEsIDAsIDEsIDFdLFxuICAgIFstMSwgMSwgMSwgMSwgMCwgMV0sIFstMSwgMSwgMSwgMSwgMSwgMF0sXG4gICAgWzAsIDEsIDEsIDEsIDEsIC0xXSwgWzEsIDAsIDEsIDEsIDEsIC0xXSxcbiAgICBbMSwgMSwgMCwgMSwgMSwgLTFdLCBbMSwgMSwgMSwgMCwgMSwgLTFdXG4gIF07XG4gIHZhciBjb3ZlcmVkMyA9IFtcbiAgICBbLTEsIDEsIDEsIDEsIDAsIDBdLCBbLTEsIDEsIDEsIDAsIDEsIDBdLFxuICAgIFstMSwgMSwgMCwgMSwgMSwgMF0sIFswLCAwLCAxLCAxLCAxLCAtMV0sXG4gICAgWzAsIDEsIDAsIDEsIDEsIC0xXSwgWzAsIDEsIDEsIDAsIDEsIC0xXSxcbiAgICBbLTEsIDEsIDAsIDEsIDAsIDEsIC0xXSwgWy0xLCAwLCAxLCAxLCAxLCAwLCAtMV0sXG4gICAgWy0xLCAxLCAxLCAwLCAwLCAxLCAtMV0sIFstMSwgMSwgMCwgMCwgMSwgMSwgLTFdXG4gIF07XG5cbiAgKGZ1bmN0aW9uKCkgeyAvL2FkZCBzYW1lIGNvbWJpbmF0aW9ucyBmb3IgYW5vdGhlciBwbGF5ZXJcbiAgICB2YXIgYWxsQ29tYm9zID0gW3dpbiwgdW5Db3ZlcmVkNCwgdW5Db3ZlcmVkMywgdW5Db3ZlcmVkMiwgY292ZXJlZDQsIGNvdmVyZWQzXTtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IGFsbENvbWJvcy5sZW5ndGg7IGsrKykge1xuICAgICAgdmFyIHRlbXAgPSBbXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYWxsQ29tYm9zW2tdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciB0bXAgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxDb21ib3Nba11bal0ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgdG1wW2ldID0gLWFsbENvbWJvc1trXVtqXVtpXTtcbiAgICAgICAgdGVtcC5wdXNoKHRtcCk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRlbXAubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgYWxsQ29tYm9zW2tdLnB1c2godGVtcFttXSk7XG4gICAgICB9XG4gICAgfVxuICB9KCkpO1xuXG4gIHZhciB2YWx1ZUNvbWJvID0gZnVuY3Rpb24odywgdTIsIHUzLCB1NCwgYzMsIGM0KSB7XG4gICAgaWYgKHcgPiAwKSAgICAgICAgICAgIHJldHVybiAxMDAwMDAwMDAwO1xuICAgIGlmICh1NCA+IDApICAgICAgICAgICByZXR1cm4gMTAwMDAwMDAwO1xuICAgIGlmIChjNCA+IDEpICAgICAgICAgICByZXR1cm4gMTAwMDAwMDA7XG4gICAgaWYgKHUzID4gMCAmJiBjNCA+IDApIHJldHVybiAxMDAwMDAwO1xuICAgIGlmICh1MyA+IDEpICAgICAgICAgICByZXR1cm4gMTAwMDAwO1xuXG4gICAgaWYgKHUzID09IDEpIHtcbiAgICAgIGlmICh1MiA9PSAzKSAgICAgICAgcmV0dXJuIDQwMDAwO1xuICAgICAgaWYgKHUyID09IDIpICAgICAgICByZXR1cm4gMzgwMDA7XG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiAzNTAwMDtcbiAgICAgIHJldHVybiAzNDUwO1xuICAgIH1cblxuICAgIGlmIChjNCA9PSAxKSB7XG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiA0NTAwO1xuICAgICAgaWYgKHUyID09IDIpICAgICAgICByZXR1cm4gNDIwMDtcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDQxMDA7XG4gICAgICByZXR1cm4gNDA1MDtcbiAgICB9XG5cbiAgICBpZiAoYzMgPT0gMSkge1xuICAgICAgaWYgKHUyID09IDMpICAgICAgICByZXR1cm4gMzQwMDtcbiAgICAgIGlmICh1MiA9PSAyKSAgICAgICAgcmV0dXJuIDMzMDA7XG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiAzMTAwO1xuICAgIH1cblxuICAgIGlmIChjMyA9PSAyKSB7XG4gICAgICBpZiAodTIgPT0gMikgICAgICAgIHJldHVybiAzMDAwO1xuICAgICAgaWYgKHUyID09IDEpICAgICAgICByZXR1cm4gMjkwMDtcbiAgICB9XG5cbiAgICBpZiAoYzMgPT0gMykge1xuICAgICAgaWYgKHUyID09IDEpICAgICAgICByZXR1cm4gMjgwMDtcbiAgICB9XG5cbiAgICBpZiAodTIgPT0gNCkgICAgICAgICAgcmV0dXJuIDI3MDA7XG4gICAgaWYgKHUyID09IDMpICAgICAgICAgIHJldHVybiAyNTAwO1xuICAgIGlmICh1MiA9PSAyKSAgICAgICAgICByZXR1cm4gMjAwMDtcbiAgICBpZiAodTIgPT0gMSkgICAgICAgICAgcmV0dXJuIDEwMDA7XG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgdmFyIGZpbmRBcnJheSA9IGZ1bmN0aW9uKGFyciwgaW5BcnIpe1xuICAgIHZhciBmQ291bnQgPSBhcnIubGVuZ3RoO1xuICAgIHZhciBzQ291bnQgPSBpbkFyci5sZW5ndGg7XG4gICAgdmFyIGs7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZkNvdW50IC0gc0NvdW50OyBpKyspXG4gICAge1xuICAgICAgayA9IDA7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNDb3VudDsgaisrKVxuICAgICAge1xuICAgICAgICBpZiAoYXJyW2kgKyBqXSA9PSBpbkFycltqXSkgaysrO1xuICAgICAgICBlbHNlIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGsgPT0gc0NvdW50KSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHZhciBpc0FueUluQXJyYXlzID0gZnVuY3Rpb24oY29tYm9zLCBhcnIpe1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tYm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZmluZEFycmF5KGFyciwgY29tYm9zW2ldKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB2YXIgY29tYmluYXRpb25zID0ge307XG4gIGNvbWJpbmF0aW9ucy53aW5WYWx1ZSA9IDEwMDAwMDAwMDA7XG4gIGNvbWJpbmF0aW9ucy52YWx1ZVBvc2l0aW9uID0gZnVuY3Rpb24oYXJyMSwgIGFycjIsICBhcnIzLCAgYXJyNCl7IC8vIDQgZGlyZWN0aW9uc1xuICAgIHZhciB3ID0gMCwgdTIgPSAwLCB1MyA9IDAsIHU0ID0gMCwgYzMgPSAwLCBjNCA9IDA7XG4gICAgdmFyIGFsbEFyciA9IFthcnIxLCAgYXJyMiwgIGFycjMsICBhcnI0XTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbEFyci5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzQW55SW5BcnJheXMod2luLCBhbGxBcnJbaV0pKSB7XG4gICAgICAgIHcrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyhjb3ZlcmVkNCwgYWxsQXJyW2ldKSkge1xuICAgICAgICBjNCsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FueUluQXJyYXlzKGNvdmVyZWQzLCBhbGxBcnJbaV0pKSB7XG4gICAgICAgIGMzKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzQW55SW5BcnJheXModW5Db3ZlcmVkNCwgYWxsQXJyW2ldKSkge1xuICAgICAgICB1NCsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FueUluQXJyYXlzKHVuQ292ZXJlZDMsIGFsbEFycltpXSkpIHtcbiAgICAgICAgdTMrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQyLCBhbGxBcnJbaV0pKSB7XG4gICAgICAgIHUyKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZUNvbWJvKHcsIHUyLCB1MywgdTQsIGMzLCBjNCk7XG4gIH07XG4gIHJldHVybiBjb21iaW5hdGlvbnM7XG59OyIsIkFycmF5Lm1hdHJpeCA9IGZ1bmN0aW9uKG0sbixpbml0aWFsKSB7XG4gIHZhciBhLCBpLCBqLCBtYXQgPSBbXTtcbiAgZm9yIChpID0gMDsgaSA8IG07IGkrKykge1xuICAgIGEgPSBbXTtcbiAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICBhW2pdID0gaW5pdGlhbDtcbiAgICB9XG4gICAgbWF0W2ldID0gYTtcbiAgfVxuICByZXR1cm4gbWF0O1xufTtcblxudmFyIGluaXRDb21iaW5hdGlvbnMgPSByZXF1aXJlKCcuL2NvbWJpbmF0aW9ucycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBsYXllcikge1xuICB2YXIgZ2FtZVNpemUgPSA1OyAvLyA1IGluIGxpbmVcbiAgdmFyIHJpbmcgPSAxOyAvLyByaW5nIHNpemUgYXJvdW5kIGN1cnJlbnQgY2VsbHNcbiAgdmFyIHdpbiA9IGZhbHNlO1xuICB2YXIgY2VsbHNDb3VudCA9IDE1O1xuICB2YXIgY3VyU3RhdGUgPSBBcnJheS5tYXRyaXgoMTUsIDE1LCAwKTtcbiAgdmFyIGNvbXBsZXhpdHkgPSAxO1xuICB2YXIgbWF4UGxheWVyID0gcGxheWVyIHx8IC0xOyAvLyBYID0gMSwgTyA9IC0xXG4gIHZhciBjb21iaW5hdGlvbnMgPSBpbml0Q29tYmluYXRpb25zKCk7XG4gIGlmIChtYXhQbGF5ZXIgPT09IC0xKSBjdXJTdGF0ZVs3XVs3XSA9IDE7XG5cbiAgdmFyIGNoZWNrV2luID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2VsbHNDb3VudDsgaisrKSB7XG4gICAgICAgIGlmIChjdXJTdGF0ZVtpXVtqXSA9PSAwKSBjb250aW51ZTtcbiAgICAgICAgdmFyIHBsYXllclZhbCA9IGNvbWJpbmF0aW9ucy52YWx1ZVBvc2l0aW9uKFxuICAgICAgICAgIGdldENvbWJvKGN1clN0YXRlLCBjdXJTdGF0ZVtpXVtqXSwgaSwgaiwgMSwgMCksXG4gICAgICAgICAgZ2V0Q29tYm8oY3VyU3RhdGUsIGN1clN0YXRlW2ldW2pdLCBpLCBqLCAwLCAxKSxcbiAgICAgICAgICBnZXRDb21ibyhjdXJTdGF0ZSwgY3VyU3RhdGVbaV1bal0sIGksIGosIDEsIDEpLFxuICAgICAgICAgIGdldENvbWJvKGN1clN0YXRlLCBjdXJTdGF0ZVtpXVtqXSwgaSwgaiwgMSwgLTEpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwbGF5ZXJWYWwgPT09IGNvbWJpbmF0aW9ucy53aW5WYWx1ZSkge1xuICAgICAgICAgIHdpbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIG1pbmlNYXggPSBmdW5jdGlvbiBtaW5pbWF4KG5vZGUsIGRlcHRoLCBwbGF5ZXIsIHBhcmVudCkge1xuICAgIGlmIChkZXB0aCA9PSAwKSByZXR1cm4gaGV1cmlzdGljKG5vZGUsIHBhcmVudCk7XG4gICAgdmFyIGFscGhhID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICB2YXIgY2hpbGRzID0gZ2V0Q2hpbGRzKG5vZGUsIHBsYXllcik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFscGhhID0gTWF0aC5tYXgoYWxwaGEsIC1taW5pbWF4KGNoaWxkc1tpXSwgZGVwdGggLSAxLCAtcGxheWVyLCBub2RlKSk7XG4gICAgfVxuICAgIHJldHVybiBhbHBoYTtcbiAgfTtcblxuICB2YXIgaXNBbGxTYXRpc2Z5ID0gZnVuY3Rpb24gKGNhbmRpZGF0ZXMsIHBvaW50WCwgcG9pbnRZKSB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBvaW50WCAhPSBjYW5kaWRhdGVzW2ldWzBdIHx8IHBvaW50WSAhPSBjYW5kaWRhdGVzW2ldWzFdKSBjb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBjb3VudGVyID09IGNhbmRpZGF0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIHZhciBnZXRDaGlsZHMgPSBmdW5jdGlvbihwYXJlbnQsIHBsYXllcikge1xuICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgIHZhciBjYW5kaWRhdGVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2VsbHNDb3VudDsgaisrKSB7XG4gICAgICAgIGlmIChwYXJlbnRbaV1bal0gIT0gMCkge1xuICAgICAgICAgIGZvciAodmFyIGsgPSBpIC0gcmluZzsgayA8PSBpICsgcmluZzsgaysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsID0gaiAtIHJpbmc7IGwgPD0gaiArIHJpbmc7IGwrKykge1xuICAgICAgICAgICAgICBpZiAoayA+PSAwICYmIGwgPj0gMCAmJiBrIDwgY2VsbHNDb3VudCAmJiBsIDwgY2VsbHNDb3VudCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRba11bbF0gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGN1clBvaW50ID0gW2ssIGxdO1xuICAgICAgICAgICAgICAgICAgdmFyIGZsYWcgPSBpc0FsbFNhdGlzZnkoY2FuZGlkYXRlcywgY3VyUG9pbnRbMF0sIGN1clBvaW50WzFdKTtcbiAgICAgICAgICAgICAgICAgIGlmIChmbGFnKSBjYW5kaWRhdGVzLnB1c2goY3VyUG9pbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBmID0gMDsgZiA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBmKyspIHtcbiAgICAgIHZhciB0bXAgPSBBcnJheS5tYXRyaXgoY2VsbHNDb3VudCwgY2VsbHNDb3VudCwgMCk7XG4gICAgICBmb3IgKHZhciBtID0gMDsgbSA8IGNlbGxzQ291bnQ7IG0rKykge1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNlbGxzQ291bnQ7IG4rKykge1xuICAgICAgICAgIHRtcFttXVtuXSA9IHBhcmVudFttXVtuXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdG1wW2NhbmRpZGF0ZXNbZl1bMF1dW2NhbmRpZGF0ZXNbZl1bMV1dID0gLXBsYXllcjtcbiAgICAgIGNoaWxkcmVuLnB1c2godG1wKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9O1xuXG4gIHZhciBnZXRDb21ibyA9IGZ1bmN0aW9uKG5vZGUsIGN1clBsYXllciwgaSwgaiwgZHgsIGR5KSB7XG4gICAgdmFyIGNvbWJvID0gW2N1clBsYXllcl07XG4gICAgZm9yICh2YXIgbSA9IDE7IG0gPCBnYW1lU2l6ZTsgbSsrKSB7XG4gICAgICB2YXIgbmV4dFgxID0gaSAtIGR4ICogbTtcbiAgICAgIHZhciBuZXh0WTEgPSBqIC0gZHkgKiBtO1xuICAgICAgaWYgKG5leHRYMSA+PSBjZWxsc0NvdW50IHx8IG5leHRZMSA+PSBjZWxsc0NvdW50IHx8IG5leHRYMSA8IDAgfHwgbmV4dFkxIDwgMCkgYnJlYWs7XG4gICAgICB2YXIgbmV4dDEgPSBub2RlW25leHRYMV1bbmV4dFkxXTtcbiAgICAgIGlmIChub2RlW25leHRYMV1bbmV4dFkxXSA9PSAtY3VyUGxheWVyKSB7XG4gICAgICAgIGNvbWJvLnVuc2hpZnQobmV4dDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbWJvLnVuc2hpZnQobmV4dDEpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrID0gMTsgayA8IGdhbWVTaXplOyBrKyspIHtcbiAgICAgIHZhciBuZXh0WCA9IGkgKyBkeCAqIGs7XG4gICAgICB2YXIgbmV4dFkgPSBqICsgZHkgKiBrO1xuICAgICAgaWYgKG5leHRYID49IGNlbGxzQ291bnQgfHwgbmV4dFkgPj0gY2VsbHNDb3VudCB8fCBuZXh0WCA8IDAgfHwgbmV4dFkgPCAwKSBicmVhaztcbiAgICAgIHZhciBuZXh0ID0gbm9kZVtuZXh0WF1bbmV4dFldO1xuICAgICAgaWYgKG5leHQgPT0gLWN1clBsYXllcikge1xuICAgICAgICBjb21iby5wdXNoKG5leHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbWJvLnB1c2gobmV4dCk7XG4gICAgfVxuICAgIHJldHVybiBjb21ibztcbiAgfTtcblxuICB2YXIgaGV1cmlzdGljID0gZnVuY3Rpb24obmV3Tm9kZSwgb2xkTm9kZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xuICAgICAgICBpZiAobmV3Tm9kZVtpXVtqXSAhPSBvbGROb2RlW2ldW2pdKSB7XG4gICAgICAgICAgdmFyIGN1ckNlbGwgPSBuZXdOb2RlW2ldW2pdO1xuICAgICAgICAgIHZhciBwbGF5ZXJWYWwgPSBjb21iaW5hdGlvbnMudmFsdWVQb3NpdGlvbihcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIGN1ckNlbGwsIGksIGosIDEsIDApLFxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgY3VyQ2VsbCwgaSwgaiwgMCwgMSksXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCBjdXJDZWxsLCBpLCBqLCAxLCAxKSxcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIGN1ckNlbGwsIGksIGosIDEsIC0xKVxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3Tm9kZVtpXVtqXSA9IC1jdXJDZWxsO1xuICAgICAgICAgIHZhciBvcHBvc2l0ZVZhbCA9IGNvbWJpbmF0aW9ucy52YWx1ZVBvc2l0aW9uKFxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgLWN1ckNlbGwsIGksIGosIDEsIDApLFxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgLWN1ckNlbGwsIGksIGosIDAsIDEpLFxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgLWN1ckNlbGwsIGksIGosIDEsIDEpLFxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgLWN1ckNlbGwsIGksIGosIDEsIC0xKVxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3Tm9kZVtpXVtqXSA9IC1jdXJDZWxsO1xuICAgICAgICAgIHJldHVybiAyICogcGxheWVyVmFsICsgb3Bwb3NpdGVWYWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgdmFyIGdldExvZ2ljID0ge307XG4gIGdldExvZ2ljLndpblN0YXRlID0gXCJcIjtcbiAgZ2V0TG9naWMubWFrZUFuc3dlciA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgY3VyU3RhdGVbeF1beV0gPSBtYXhQbGF5ZXI7XG4gICAgY2hlY2tXaW4oKTtcbiAgICBpZiAod2luKXtcbiAgICAgIHRoYXQud2luU3RhdGUgPSBcInlvdSB3aW5cIjtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICB2YXIgYW5zdyA9IFstMSwgLTFdO1xuICAgIHZhciBjID0gZ2V0Q2hpbGRzKGN1clN0YXRlLCBtYXhQbGF5ZXIpO1xuICAgIHZhciBtYXhDaGlsZCA9IC0xO1xuICAgIHZhciBtYXhWYWx1ZSA9IE51bWJlci5NSU5fVkFMVUU7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBjLmxlbmd0aDsgaysrKSB7XG4gICAgICB2YXIgY3VyVmFsdWUgPSBtaW5pTWF4KGNba10sIDAsIC1tYXhQbGF5ZXIsIGN1clN0YXRlKTtcbiAgICAgIGlmIChjb21wbGV4aXR5ID4gMSkge1xuICAgICAgICAvL3ZhciBjdXJWYWx1ZTIgPSBtaW5pTWF4KGNba10sIGNvbXBsZXhpdHkgLSAxLCAtbWF4UGxheWVyLCBjdXJTdGF0ZSk7XG4gICAgICAgIC8vdXNlIGl0IGZvciBtb3JlIGNvbXBsZXggZ2FtZSFcbiAgICAgIH1cbiAgICAgIGlmIChtYXhWYWx1ZSA8IGN1clZhbHVlKSB7XG4gICAgICAgIG1heFZhbHVlID0gY3VyVmFsdWU7XG4gICAgICAgIG1heENoaWxkID0gaztcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2VsbHNDb3VudDsgaisrKSB7XG4gICAgICAgIGlmIChjW21heENoaWxkXVtpXVtqXSAhPSBjdXJTdGF0ZVtpXVtqXSkge1xuICAgICAgICAgIGFuc3dbMF0gPSBpO1xuICAgICAgICAgIGFuc3dbMV0gPSBqO1xuICAgICAgICAgIGN1clN0YXRlW2Fuc3dbMF1dW2Fuc3dbMV1dID0gLW1heFBsYXllcjtcbiAgICAgICAgICBjaGVja1dpbigpO1xuICAgICAgICAgIGlmICh3aW4pIHtcbiAgICAgICAgICAgIHRoYXQud2luU3RhdGUgPSBcInlvdSBsb3N0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhbnN3O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhbnN3O1xuICB9O1xuICByZXR1cm4gZ2V0TG9naWM7XG59OyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIHZhciBpbml0TG9naWMgPSByZXF1aXJlKCcuL2dvbW9rdS9sb2dpYycpO1xuICB2YXIgbG9naWMgPSBpbml0TG9naWMoKTtcblxuICAkKFwiIzctN1wiKS5hZGRDbGFzcyhcImJvYXJkQ2VsbENyb3NzXCIpO1xuICB2YXIgY3VyclZhbHVlID0gLTE7IC8vIHBsYXllciAtIE8sIGNvbXB1dGVyIC0gWFxuICB2YXIgZ2FtZU92ZXIgPSBmYWxzZTtcblxuICAkKCdkaXYuYm9hcmRDb2wnKS5tb3VzZWRvd24oaGFuZGxlTW91c2VEb3duKTtcbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGUpe1xuICAgIGlmKGdhbWVPdmVyKSByZXR1cm4gXCJcIjtcbiAgICB2YXIgY2VsbCA9ICQodGhpcyk7XG4gICAgaWYgKGNlbGwuY2hpbGRyZW4oKS5oYXNDbGFzcyhcImJvYXJkQ2VsbENpcmNsZVwiKSkgcmV0dXJuIFwiXCI7XG4gICAgaWYgKGNlbGwuY2hpbGRyZW4oKS5oYXNDbGFzcyhcImJvYXJkQ2VsbENyb3NzXCIpKSByZXR1cm4gXCJcIjtcbiAgICB2YXIgaW5kZXhlcyA9IChjZWxsLmNoaWxkcmVuKCkuYXR0cignaWQnKSkuc3BsaXQoXCItXCIpO1xuICAgIHZhciBhbnN3ZXIgPSBsb2dpYy5tYWtlQW5zd2VyKGluZGV4ZXNbMF0saW5kZXhlc1sxXSk7XG4gICAgaWYoYW5zd2VyICE9PSBcIlwiKXtcbiAgICAgIHZhciBnZXRlZElkID0gJyMnICthbnN3ZXJbMF0gKyAnLScgKyBhbnN3ZXJbMV07XG4gICAgICAkKGdldGVkSWQpLmFkZENsYXNzKGRlc2VydmUoKSk7XG4gICAgfSBlbHNlIGN1cnJWYWx1ZSAqPSAtMTtcbiAgICBjZWxsLmNoaWxkcmVuKCkuYWRkQ2xhc3MoZGVzZXJ2ZSgpKTtcbiAgICBmdW5jdGlvbiBkZXNlcnZlKCl7XG4gICAgICBjdXJyVmFsdWUgKj0gLTE7XG4gICAgICBpZiAoY3VyclZhbHVlID09PSAxKSB7XG4gICAgICAgIHJldHVybiBcImJvYXJkQ2VsbENyb3NzXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJib2FyZENlbGxDaXJjbGVcIjtcbiAgICB9XG4gICAgaWYgKGxvZ2ljLndpblN0YXRlICE9PSBcIlwiKXtcbiAgICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpO1xuICAgICAgbWVzc2FnZS50ZXh0KGxvZ2ljLndpblN0YXRlKTtcbiAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2UucmVtb3ZlQ2xhc3MoXCJsb29zZVN0YXRlXCIpO1xuICAgICAgaWYgKGxvZ2ljLndpblN0YXRlID09PSBcInlvdSBsb3N0XCIpe1xuICAgICAgICBtZXNzYWdlLmFkZENsYXNzKFwibG9vc2VTdGF0ZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAkKFwiI3NjYWxlLVVwXCIpLmNsaWNrKGhhbmRsZVNjYWxlKTtcbiAgJChcIiNzY2FsZS1Eb3duXCIpLmNsaWNrKGhhbmRsZVNjYWxlKTtcbiAgZnVuY3Rpb24gaGFuZGxlU2NhbGUoZSl7XG4gICAgdmFyIHZhbHVlID0gMTAwO1xuICAgIHZhciBtaW5WYWx1ZSA9IDMwMDtcbiAgICB2YXIgZGVsdGEgPSAgJCh0aGlzKS5hdHRyKCdpZCcpLnNwbGl0KFwiLVwiKVsxXTtcbiAgICB2YXIgYm9hcmQgPSAkKFwiLmJvYXJkXCIpO1xuICAgIHZhciBjb250cm9scyA9ICQoXCIuY29udHJvbHNcIik7XG4gICAgaWYgKGRlbHRhID09PSBcIlVwXCIpe1xuICAgICAgYm9hcmQud2lkdGgoYm9hcmQud2lkdGgoKSArIHZhbHVlKTtcbiAgICAgIGJvYXJkLmhlaWdodChib2FyZC5oZWlnaHQoKSArIHZhbHVlKTtcbiAgICAgIGNvbnRyb2xzLndpZHRoKGNvbnRyb2xzLndpZHRoKCkgKyB2YWx1ZSk7XG4gICAgICBjb250cm9scy5oZWlnaHQoY29udHJvbHMuaGVpZ2h0KCkgKyB2YWx1ZS8xNSk7XG4gICAgfVxuICAgIGlmIChkZWx0YSA9PT0gXCJEb3duXCIgJiYgYm9hcmQud2lkdGgoKSA+IG1pblZhbHVlKXtcbiAgICAgIGJvYXJkLndpZHRoKGJvYXJkLndpZHRoKCkgLSB2YWx1ZSk7XG4gICAgICBib2FyZC5oZWlnaHQoYm9hcmQuaGVpZ2h0KCkgLSB2YWx1ZSk7XG4gICAgICBjb250cm9scy53aWR0aChjb250cm9scy53aWR0aCgpIC0gdmFsdWUpO1xuICAgICAgY29udHJvbHMuaGVpZ2h0KGNvbnRyb2xzLmhlaWdodCgpIC0gdmFsdWUvMTUpO1xuICAgIH1cbiAgfVxuXG4gICQoXCIjbmV3LU9cIikucGFyZW50KCkuY2xpY2soaGFuZGxlTmV3R2FtZSk7XG4gICQoXCIjbmV3LVhcIikucGFyZW50KCkuY2xpY2soaGFuZGxlTmV3R2FtZSk7XG4gIGZ1bmN0aW9uIGhhbmRsZU5ld0dhbWUoZSl7XG4gICAgdmFyIGluZGV4ID0gKCQodGhpcykuY2hpbGRyZW4oKS5hdHRyKCdpZCcpKS5zcGxpdChcIi1cIilbMV07XG4gICAgJChcIi5ib2FyZENlbGxcIikucmVtb3ZlQ2xhc3MoXCJib2FyZENlbGxDcm9zcyBib2FyZENlbGxDaXJjbGVcIik7XG4gICAgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAkKFwiI21lc3NhZ2VcIikudGV4dChcIlwiKTtcbiAgICBpZiAoaW5kZXggPT09IFwiT1wiKXtcbiAgICAgIGxvZ2ljID0gaW5pdExvZ2ljKCk7XG4gICAgICAkKFwiIzctN1wiKS5hZGRDbGFzcyhcImJvYXJkQ2VsbENyb3NzXCIpO1xuICAgICAgY3VyclZhbHVlID0gLTE7XG4gICAgfVxuICAgIGlmIChpbmRleCA9PT0gXCJYXCIpe1xuICAgICAgbG9naWMgPSBpbml0TG9naWMoMSk7XG4gICAgICBjdXJyVmFsdWUgPSAxO1xuICAgIH1cbiAgICAkKFwiI2NoZWNrXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gIH1cbn0pOyJdfQ==
