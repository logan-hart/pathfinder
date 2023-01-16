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
  
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 970, 600);
 
    ani = new Algorithm
    ani.begin()


    function selectStart(){

    }

})


window.Node = Node;
window.Path = Path;
window.Graph = Graph;
window.Algorithm = Algorithm;