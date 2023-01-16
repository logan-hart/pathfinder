const Node = require("./node.js");
const Path = require("./path.js");
const Graph = require("./graph.js");

function Algorithm(){
    this.graph = new Graph
    this.nodes = this.graph.nodes
    this.startNode = this.graph.nodes[0]
    this.endNode = 'd'   //this.graph.nodes[this.graph.nodes.length-1] 

   
    // this.associations = buildAssociations(this.graph)
}

Algorithm.prototype.begin = function(){
    // const associations = {
    //     a: { b: 5, c: 2 },
    //     b: { a: 5, c: 7, d: 8, e: 5 },
    //     c: { a: 2, b: 7, d: 4, e: 8, f: 4},
    //     d: { b: 8, c: 4, e: 6},
    //     e: { b: 5, c: 8, d: 6, f: 3 },
    //     f: { e: 3, c: 4 },
    // };

    const simpleExample = {
        a: { b: 5, c: 2 },
        b: { a: 5, c: 7, d: 8 },
        c: { a: 2, b: 7, d: 4, e: 8 },
        d: { b: 8, c: 4, e: 6, f: 4 },
        e: { c: 8, d: 6, f: 3 },
        f: { e: 3, d: 4 },
      };
    
    let currentNode = 'a'
    let visitedNodes = []
    let unvisitedNodes = Object.keys(simpleExample)
    let shortestDist = {}
    this.nodes.forEach( function(node){
        shortestDist[node.name] = Infinity
    })

    //update shortestDist, mark nodes as visited, updated unvisitedNodes
    shortestDist[currentNode] = 0    
    visitedNodes.push(this.startNode.name)
    this.startNode.status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    this.graph.draw(ctx)
    
    // updates shortest distances obj
    Object.keys(simpleExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > simpleExample[currentNode][el]){
            shortestDist[el] = simpleExample[currentNode][el]
        }
    })
    
    // select the node with the shortest distance and make it nextNode
    let nextNode = simpleExample[Object.keys(simpleExample[currentNode]).reduce((a, b) => simpleExample[currentNode][a] < simpleExample[currentNode][b] ? a : b)];
    nextNode = Object.keys(simpleExample).filter (el => simpleExample[el] === nextNode)
    
    
    //change status of nextNode to visited, updated unvisitedNodes
    visitedNodes.push(nextNode[0])
    this.nodes.find(node => node.name === nextNode[0]).status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    currentNode = nextNode

    setTimeout(this.graph.draw(ctx), 100) //setTimeout not functioning as intended
    
    //******* WE NOW BEGIN THE NEXT ITERATION
    let distToCurrent = shortestDist[currentNode]

    //update shortest distances
    Object.keys(simpleExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > simpleExample[currentNode][el]){
            shortestDist[el] = simpleExample[currentNode][el] + distToCurrent
        }
    })

    /////ABOVE THIS CODE ALL FUNCTIONS AS INTENDED

    debugger
    
    /// PROBLEM we're returning to 'a' because it hasn't been removed from simpleExample
        // how should i filter out the visted nodes
    nextNode = simpleExample[Object.keys(simpleExample[currentNode]).reduce((a, b) => 

            simpleExample[currentNode][a] < simpleExample[currentNode][b]  ? a : b)];
    nextNode = Object.keys(simpleExample).filter (el => simpleExample[el] === nextNode)
    visitedNodes.push(nextNode[0])
    
    console.log("test")

  
}



Algorithm.prototype.buildAssociations = function(graph){
    // let associations = {}
    // let nodes = this.graph.nodes
    // let neighbors = nodes.neighbors
    // for (let i = 0; i < nodes.length; i++){   
    //     for (let j = 0; j < nodes.neighbors.length; j++){
    //         association.nodes[i] = Objext.assign({}, neighbors[j], {})
    //     for (let j = 0; j < nodes.neighbors.length; j++){ // itteration over every neighbor
    //     (associations[nodes[i][neighbors[i][0]]] = nodes.neighbors[0][j][1])}
    // }
    // return associations
}


module.exports = Algorithm;