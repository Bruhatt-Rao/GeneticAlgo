var lr = 0.0001;
var points = gen();
var lines = [];

function init() {
  lines.push(new line());
}

function update() {
  for (var i = points.length - 1; i >= 0; i--) {
    if (points[i][2] == 1) {
      color("#778da9");
    } else {
      color("#1b263b");
    }
    ellipse(points[i][0], points[i][1], 5);
  }

  for (var i = lines.length - 1; i >= 0; i--) {
    lines[i].draw()
  }
  document.getElementById("p").innerText = "Error rate: " + error().toFixed(3) + "%";
  document.getElementById("p2").innerText = "y = "+m.toFixed(4)+"x + " + b;
}

function error() {
  var w = 0;
  for (var i = points.length - 1; i >= 0; i--) {
    if (lines[0].side(points[i]) != points[i][2]) {
      w += 1
    }
  }
  return (w/points.length)*100
}

function reset() {
  m = rand();
  b = randint(0,500);
  points = gen();
}

// Function to generate data
function gen() {
  let l = new line(); // Choosing a randomized "target" line to classify the data
  points_buf = [];
  var amount = document.getElementById("amount").value;
  for (var i = amount; i >= 0; i--) {
    var p = [randint(0,500), randint(0,500)];
    p.push(l.side(p));
    points_buf.push(p);
  }
  return points_buf;
}

function line() {
  this.m = rand();
  this.b = randint(0,500);

  this.f = function(x) {
    return (this.m*x)+this.b
  }

  this.side = function(point) {
    if (this.f(point[0]) < point[1]) {
      return 2;
    } else {
      return 1;
    }
  }

  this.draw = function() {
    stroke("#0d1b2a");
    line(0, this.f(0), 500, this.f(500));
    console.log(0, this.f(0), 500, this.f(500))
  }
}

loop();