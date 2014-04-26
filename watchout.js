// start slingin' some d3 here.
var enemies, drag, player, moveDots, checkCollisions;
var boardWidth = 1000;
var boardHeight = 500;
var radius = 20;
var playerRadius = 30;
var enemyCount = 5;
var currentScore  = 0;
var collisionCount = 0;
var highScore = 0;
var enemySpawningPool = [];

for (var i = 0; i < enemyCount; i++){
  enemySpawningPool.push({"x": 400, "y": 350});
}

d3.select("body")
  .append("svg")
  .attr("width", boardWidth)
  .attr("height", boardHeight)
  .append('g')
  .selectAll('circle')
  .data(enemySpawningPool)
  .enter().append("circle").attr("class", "enemy");

enemies = d3.selectAll('g .enemy');

function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = d3.event.x)
      .attr("cy", d.y = d3.event.y);
};

drag = d3.behavior.drag()
    .on("drag", dragmove);

player = d3.selectAll("svg").selectAll('.player')
  .data([{x:50, y:50}])
  .enter()
  .append("circle")
  .attr("r", playerRadius)
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y})
  .attr("class", "player")
  .on('click', function(d, i) {
      console.log("hellllooooo");
  }).call(drag);

// d3.selectAll('svg').append('image')
// .data([{x:50, y:50}])
// .attr('xlink:href', 'asteroid.png')
// .attr('x', 50).attr('y', 45)
// .attr('width', 50).attr('height', 50);


moveDots = function(dots) {
  dots.attr("r", radius)
  .transition().duration(function() {return Math.max(1000, Math.random()*3000);})
  .attr("cx", function(d){d.x = Math.max(radius, boardWidth * 0.95 * Math.random()); return d.x;})
  .attr("cy", function(d){d.y = Math.max(radius, boardHeight * 0.95 * Math.random()); return d.y;})
  .each('end', function(){moveDots(d3.select(this))});

  // d3.selectAll('image').transition().duration(500)
  // .attr('x', function(d){ d.x = Math.max(radius, boardWidth * 0.95 * Math.random(); return d.x;})
  // .attr('y', function(d){ d.y = Math.max(radius, boardWidth * 0.95 * Math.random(); return d.y;});
};


var tweenWithCollisionDetection = function(endData) {
  var endPos, enemy, startPos;
  enemy = d3.select(this);
  startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };
  endPos = {
    x: axes.x(endData.x),
    y: axes.y(endData.y)
  };
  return function(t) {
    var enemyNextPos;
    checkCollisions();
    enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    };
    return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
  };
};

var prevCollisionState = false;

checkCollisions = function() {
  var collision = false;

  // var start = Date.now();
  // var playerPosition = player.data()[0];
  // console.log('player position: ' + playerPosition.x + ', ' + playerPosition.y);
  // var enemyPositionArray = enemies.data();
  // for (var i = 0; i < enemyPositionArray.length; i++){
  //   if (Math.sqrt(Math.pow(playerPosition.x - enemyPositionArray[i].x, 2)
  //   + Math.pow(playerPosition.y - enemyPositionArray[i].y, 2)) < radius + playerRadius){
  for (var i = 0; i < enemies[0].length; i++){

    if (Math.sqrt( Math.pow( Number(player[0][0].getAttribute('cx')) - Number(enemies[0][i].getAttribute('cx')), 2)
    + Math.pow( Number(player[0][0].getAttribute('cy')) - Number(enemies[0][i].getAttribute('cy')), 2) ) < radius + playerRadius) {
      collision = true;
      break;
    }
  }
  if (collision && !prevCollisionState){
    prevCollisionState = true;
      console.log("you did not survive. sorry, victim. the dashing dots win.");
      if (currentScore > highScore) {
        highScore = currentScore;
      }
      collisionCount++;
      d3.select('.high span').text(parseInt(highScore));
      d3.select('.collisions span').text(collisionCount);
  }

  else if (!collision && prevCollisionState) {
    prevCollisionState = false;
  }

  if (collision) {
    currentScore = 0;
    d3.select('.current span').text(parseInt(currentScore));
  }

  else {
    currentScore += 0.1;
    d3.select('.current span').text(parseInt(currentScore));
  }

};


moveDots(enemies);
d3.timer(checkCollisions);
// setTimeout(function(){
//   setInterval(checkCollisions, 50);
// }, 1000);
// setInterval(moveDots, 500);




