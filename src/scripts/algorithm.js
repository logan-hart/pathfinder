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
    let map = this.buildMap()

    // const map = {
    //     a: { b: 5, c: 2 },
    //     b: { a: 5, c: 7, d: 8 },
    //     c: { a: 2, b: 7, d: 4, e: 8 },
    //     d: { b: 8, c: 4, e: 6, f: 4 },
    //     e: { c: 8, d: 6, f: 3 },
    //     f: { e: 3, d: 4 },
    //   };
    
    let currentNode = this.startNode.name
    let unvisitedNodes = Object.keys(map)
    let shortestDist = {}
    let path = {}
    Object.keys(map).forEach(function(el){
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
    Object.keys(map[currentNode]).forEach(function(el){
        if (shortestDist[el] > map[currentNode][el] ){
            shortestDist[el] = map[currentNode][el]
        }
        if (path[JSON.parse(el)].length === 0){
            path[JSON.parse(el)] = [map[currentNode][JSON.parse(el)], currentNode]
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
        Object.keys(map[currentNode]).forEach(function(el){
            if (shortestDist[el] > map[currentNode][el] + distToCurrent){
                shortestDist[el] = map[currentNode][el] + distToCurrent
            }
            if (path[JSON.parse(el)].length === 0){
                path[JSON.parse(el)] = [(map[currentNode][JSON.parse(el)] + distToCurrent), currentNode]
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

Algorithm.prototype.buildMap = function(){
    let map = {}
    
    for (let i = 0; i <this.nodes.length; i++){   
        if (!map[this.nodes[i].name]){
            map[this.nodes[i].name] = this.nodes[i].neighbors
        }
    }
    return map
}


module.exports = Algorithm;