const Node = require("./scripts/node.js");
const Path = require("./scripts/path.js");
const Graph = require("./scripts/graph.js")
const Algorithm = require("./scripts/algorithm.js")

document.addEventListener("DOMContentLoaded", function () {
    new Graph()
})


window.Node = Node;
window.Path = Path;
window.Graph = Graph;
window.Algorithm = Algorithm;