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




moveDots = function() {
  enemies.attr("r", radius)
  .transition().duration(500)
  .attr("cx", function(d){d.x = Math.max(radius, boardWidth * 0.95 * Math.random()); return d.x;})
  .attr("cy", function(d){d.y = Math.max(radius, boardHeight * 0.95 * Math.random()); return d.y;})
  ;
};


checkCollisions = function() {
  var start = Date.now();
  var playerPosition = player.data()[0];
  // console.log('player position: ' + playerPosition.x + ', ' + playerPosition.y);
  var enemyPositionArray = enemies.data();
  for (var i = 0; i < enemyPositionArray.length; i++){
    if (Math.sqrt(Math.pow(playerPosition.x - enemyPositionArray[i].x, 2)
    + Math.pow(playerPosition.y - enemyPositionArray[i].y, 2)) < radius + playerRadius){
      console.log("you did not survive. sorry, victim. the spawn wins.");
      if (currentScore > highScore) {
        highScore = currentScore;
      }
      currentScore = 0;
      collisionCount++;
      d3.select('.high span').text(parseInt(highScore));
      d3.select('.collisions span').text(collisionCount);
      return;
    }
  }
  currentScore += 0.01;
  d3.select('.current span').text(parseInt(currentScore));
};


moveDots();
setInterval(checkCollisions, 500);
// setTimeout(function(){
//   setInterval(checkCollisions, 50);
// }, 1000);
setInterval(moveDots, 500);




