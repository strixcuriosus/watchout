// start slingin' some d3 here.
var boardWidth = 1000;
var boardHeight = 1000;
var radius = 20;
var maxX = boardWidth - radius;
var maxY = boardHeight - radius;
var enemyCount = 3;

var enemySpawningPool = [];
for (var i = 0; i < enemyCount; i++){
  enemySpawningPool.push({"x": Math.max( boardWidth * 0.9, Math.random() * maxX),
    "y": Math.max( boardHeight * 0.9, Math.random() * maxY)});
}

var gameBoard = d3.select("body")
  .append("svg")
  .attr("width", boardWidth)
  .attr("height", boardHeight)
  .append('g')
  .selectAll('circle')
  .data(enemySpawningPool)
  .enter().append("circle").attr("class", "enemy");

var svg = d3.select("svg");



// var updatedCircles = svg.selectAll("circle").data(enemySpawningPool)
//   .enter().append("circle").attr("class", "enemy");

var player = svg.selectAll('.player')
  .data([{x:500, y:500}])
  .enter()
  .append("circle")
  .attr("r", radius * 2)
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y})
  .attr("class", "player")
  .on('click', function(d, i) {
      console.log("hellllooooo");
      return
  });

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  console.log('dragged');
  // var x = d3.event.x;
  // var y = d3.event.y;
  // d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}


d3.selectAll('circle').call(drag);


var moveDots = function() {
  d3.selectAll('g').selectAll('circle')
  // .attr("cx", function(d){return d.x * Math.random()})
  // .attr("cy", function(d){return d.y * Math.random()})
  .transition().duration(1500)
  .attr("cx", function(d){return Math.max(radius, d.x * Math.random())})
  .attr("cy", function(d){return Math.max(radius, d.y * Math.random())})
  ;
};

setInterval(moveDots, 1000);
setTimeout(function(){d3.selectAll('g circle').attr("r", radius)}, 1000);

// var drag = d3.behavior.drag()
//     .origin(function(d) { return d; })
//     .on("dragstart", dragstarted)
//     .on("drag", dragged)
//     .on("dragend", dragended);

// svg.selectAll(".player").on("drag", function(){alert ("drag!!!")});
//






