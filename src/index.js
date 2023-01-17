const Node = require("./scripts/node.js");
const Path = require("./scripts/path.js");
const Graph = require("./scripts/graph.js")
const Algorithm = require("./scripts/algorithm.js")


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  canvas.width = 970;
  canvas.height = 600;

  const ctx = canvas.getContext("2d");

    window.ctx = ctx;

  ctx.fillStyle = "#F5FCFF";
  ctx.fillRect(0, 0, 970, 600);

      algo = new Algorithm
      algo.determinePathing()

  const button = document.getElementById('startbutton')

  button.addEventListener('click', e => {
    e.preventDefault()
    algo.animateNodes(ctx)
    algo.animatePath(ctx)
  })



  // canvas.addEventListener('click', (event) => {
  //   const isPointInPath = ctx.isPointInPath(node, event.offsetX, event.offsetY)
  //   isPointInPath ? console.log("WAHOO") : console.log("no dice")})
    // ctx.fillStyle = isPointInPath ? 'green' : 'red'


  // function selectStart(){

  // }

})

window.Node = Node;
window.Path = Path;
window.Graph = Graph;
window.Algorithm = Algorithm;