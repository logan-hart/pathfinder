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
    const hardCodedExample = {
        a: { b: 5, c: 2 },
        b: { a: 5, c: 7, d: 8 },
        c: { a: 2, b: 7, d: 4, e: 8 },
        d: { b: 8, c: 4, e: 6, f: 4 },
        e: { c: 8, d: 6, f: 3 },
        f: { e: 3, d: 4 },
      };
    
    let currentNode = 'a'
    let visitedNodes = []
    let unvisitedNodes = Object.keys(hardCodedExample)
    let shortestDist = {}
    this.nodes.forEach( function(node){
        shortestDist[node.name] = Infinity
    })

    //firstnode, mark node as visited, updated unvisitedNodes
    shortestDist[currentNode] = 0    
    visitedNodes.push(this.startNode.name)
    this.startNode.status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    this.graph.draw(ctx)
    
    // updates shortest distances obj
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] ){
            shortestDist[el] = hardCodedExample[currentNode][el]
        }
    })
    
    //******* WE NOW BEGIN THE NEXT ITERATION for C

    // update currentNode with closest neighboring node
    currentNode = Object.entries(shortestDist)
        .filter(([key]) => unvisitedNodes.includes(key))
        .sort((a, b) => a[1] - b[1])[0][0];
    
    //change status of currentNode to visited, updated unvisitedNodes
    visitedNodes.push(currentNode)
    this.nodes.find(node => node.name === currentNode).status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)

    setTimeout(this.graph.draw(ctx), 100) //setTimeout not functioning as intended
    //update shortest distances
    let distToCurrent = shortestDist[currentNode]
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] + distToCurrent){
            shortestDist[el] = hardCodedExample[currentNode][el] + distToCurrent
        }
    })

    //******* WE NOW BEGIN THE NEXT ITERATION for B

    currentNode = Object.entries(shortestDist)
        .filter(([key]) => unvisitedNodes.includes(key))
        .sort((a, b) => a[1] - b[1])[0][0];
     
    //change status of currentNode to visited, updated unvisitedNodes
    visitedNodes.push(currentNode)
    this.nodes.find(node => node.name === currentNode).status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    
    setTimeout(this.graph.draw(ctx), 100) //setTimeout not functioning as intended
        
    //update shortest distances
    distToCurrent = shortestDist[currentNode]
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] + distToCurrent){
            shortestDist[el] = hardCodedExample[currentNode][el] + distToCurrent
        }
    })
        
    
    //******* WE NOW BEGIN THE ITERATION for D

    currentNode = Object.entries(shortestDist)
    .filter(([key]) => unvisitedNodes.includes(key))
    .sort((a, b) => a[1] - b[1])[0][0];
    
    //change status of currentNode to visited, updated unvisitedNodes
    visitedNodes.push(currentNode)
    this.nodes.find(node => node.name === currentNode).status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    
    setTimeout(this.graph.draw(ctx), 100) //setTimeout not functioning as intended
    
    //update shortest distances
    distToCurrent = shortestDist[currentNode]
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] + distToCurrent){
            shortestDist[el] = hardCodedExample[currentNode][el] + distToCurrent
        }
    })
    
    //******* WE NOW BEGIN THE ITERATION for E

    currentNode = Object.entries(shortestDist)
    .filter(([key]) => unvisitedNodes.includes(key))
    .sort((a, b) => a[1] - b[1])[0][0];
    
    //change status of currentNode to visited, updated unvisitedNodes
    visitedNodes.push(currentNode)
    this.nodes.find(node => node.name === currentNode).status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    
    setTimeout(this.graph.draw(ctx), 100) //setTimeout not functioning as intended
    
    //update shortest distances
    distToCurrent = shortestDist[currentNode]
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] + distToCurrent){
            shortestDist[el] = hardCodedExample[currentNode][el] + distToCurrent
        }
    })
    
    //******* WE NOW BEGIN THE ITERATION for F

    currentNode = Object.entries(shortestDist)
    .filter(([key]) => unvisitedNodes.includes(key))
    .sort((a, b) => a[1] - b[1])[0][0];
    
    //change status of currentNode to visited, updated unvisitedNodes
    visitedNodes.push(currentNode)
    this.nodes.find(node => node.name === currentNode).status = 'visited'
    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    
    setTimeout(this.graph.draw(ctx), 100) //setTimeout not functioning as intended
    
    //update shortest distances
    distToCurrent = shortestDist[currentNode]
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] + distToCurrent){
            shortestDist[el] = hardCodedExample[currentNode][el] + distToCurrent
        }
    })
    /////ABOVE THIS LINE ALL CODE IS FUNCTIONS AS INTENDED Except animation
    
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