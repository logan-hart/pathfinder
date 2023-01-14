const Node = require("./node.js");
const Path = require("./path.js");
const Graph = require("./graph.js");

function Algorithm(graph){
    this.graph = graph
    // this.associations = buildAssociations(this.graph)
}

Algorithm.prototype.buildAssociations = function(graph){
    // let associations = {}
    // let nodes = this.graph.nodes
    // let neighbors = nodes.neighbors     //an array of node/distance
    // // let smallNode = neighbors[0][0] let distance = neighbors[0][1]
    // for (let i = 0; i < nodes.length; i++){             //iteration over every node
    //     for (let j = 0; j < nodes.neighbors.length; j++){ // itteration over every neighbor
    //     (associations[nodes[i][neighbors[i][0]]] = nodes.neighbors[0][j][1])}
    // }
    // return associations
}

Algorithm.prototype.runAlgo = function(graph, start, end){
//     let map = Algorithm.buildAssociations(graph)
//     let unvisitedNodes = []
//     let vistedNodes = [start]
//     let closestNeighbor = {node: start, weight: 0 }
//     let node
//     while (node = unvisited.shift())
//       var neighbors = map[node].filter((n) => !visited.includes(n.node));

//       // Add neighbors to the unvisited list
//       unvisited.push(...neighbors.map((n) => n.vertex));
  
//       var costToVertex = shortestDistances[vertex].cost;
  
//       for (let { vertex: to, cost } of neighbors) {
//         var currCostToNeighbor =
//           shortestDistances[to] && shortestDistances[to].cost;
//         var newCostToNeighbor = costToVertex + cost;
//         if (
//           currCostToNeighbor == undefined ||
//           newCostToNeighbor < currCostToNeighbor
//         ) {
//           // Update the table
//           shortestDistances[to] = { vertex, cost: newCostToNeighbor };
//         }
//       }
  
//       visited.push(vertex);
//     }
//   }
}
    

module.exports = Algorithm;

