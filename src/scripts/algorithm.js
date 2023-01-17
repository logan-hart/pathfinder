const Node = require("./node.js");
const Path = require("./path.js");
const Graph = require("./graph.js");

function Algorithm(){
    this.graph = new Graph
    this.nodes = this.graph.nodes
    this.paths = this.graph.paths
    this.startNode = this.nodes[0]
    this.endNode = this.nodes[this.nodes.length-1] //this.graph.nodes[this.graph.nodes.length-1] 
    this.visitedNodes = []
    // this.associations = buildAssociations(this.graph)
}

Algorithm.prototype.determinePath = function(){
    const hardCodedExample = {
        a: { b: 5, c: 2 },
        b: { a: 5, c: 7, d: 8 },
        c: { a: 2, b: 7, d: 4, e: 8 },
        d: { b: 8, c: 4, e: 6, f: 4 },
        e: { c: 8, d: 6, f: 3 },
        f: { e: 3, d: 4 },
      };
    
    let currentNode = this.startNode.name
    let unvisitedNodes = Object.keys(hardCodedExample)
    let shortestDist = {}
    let path = {}
    Object.keys(hardCodedExample).forEach(function(el){
        path[el] = []
    })

    this.nodes.forEach( function(node){
        shortestDist[node.name] = Infinity
    })

    shortestDist[currentNode] = 0    
    path[currentNode] = [0, currentNode]
    this.visitedNodes.push(currentNode)

    unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
    
    // updates shortest distances obj
    Object.keys(hardCodedExample[currentNode]).forEach(function(el){
        if (shortestDist[el] > hardCodedExample[currentNode][el] ){
            shortestDist[el] = hardCodedExample[currentNode][el]
        }
        if (path[el].length === 0){
            path[el] = [hardCodedExample[currentNode][el], currentNode]
        }
    })
    
    //******* WE NOW BEGIN THE ITERATION FOR THE REMAINING NODES

    while (unvisitedNodes.length > 0){

        // update currentNode with closest neighboring node
        currentNode = Object.entries(shortestDist)
            .filter(([key]) => unvisitedNodes.includes(key))
            .sort((a, b) => a[1] - b[1])[0][0];
        
        this.visitedNodes.push(currentNode)
        unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)

        //update shortest distances
        let distToCurrent = shortestDist[currentNode]
        Object.keys(hardCodedExample[currentNode]).forEach(function(el){
            if (shortestDist[el] > hardCodedExample[currentNode][el] + distToCurrent){
                shortestDist[el] = hardCodedExample[currentNode][el] + distToCurrent
            }
            if (path[el].length === 0){
                path[el] = [(hardCodedExample[currentNode][el] + distToCurrent), currentNode]
            }
        })
    }
    this.path = path
    //can refactor to combine path & shortestDist OR remove shortest Dist
}


Algorithm.prototype.animate = function(ctx){
  let that = this
    setInterval(animateNodes, this.graph.delay)

    function animateNodes(){    
        if (that.visitedNodes.length > 0){
            let first = that.visitedNodes.shift()

            that.nodes.find(node => node.name === first).status = 'visited'
            that.graph.draw(ctx)
        }
    }
}


Algorithm.prototype.buildAssociations = function(graph){
    let associations = {}
    debugger
    
    let neighbors =this.nodes.neighbors
    for (let i = 0; i <this.nodes.length; i++){   
        for (let j = 0; j <this.nodes.neighbors.length; j++){
            association.nodes[i] = Objext.assign({}, neighbors[j], {})
        for (let j = 0; j <this.nodes.neighbors.length; j++){ // itteration over every neighbor
            (associations[nodes[i][neighbors[i][0]]] =this.nodes.neighbors[0][j][1])}
        }
    }
    return associations
}


module.exports = Algorithm;