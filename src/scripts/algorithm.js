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

Algorithm.prototype.determinePathing = function(){
    // let map = this.buildMap()

    const map = {
        a: { b: 5, c: 2 },
        b: { a: 5, c: 7, d: 8 },
        c: { a: 2, b: 7, d: 4, e: 8 },
        d: { b: 8, c: 4, e: 6, f: 4 },
        e: { c: 8, d: 6, f: 3 },
        f: { e: 3, d: 4 },
    };
    
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
            if (path[el].length === 0){
                path[el] = [(map[currentNode][el] + distToCurrent), currentNode]
            }
        })
    }
    this.path = path
    //can refactor to combine path & shortestDist OR remove shortest Dist
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

Algorithm.prototype.shortestPath = function(){
    let currentNode = this.endNode.name
    let shortest = []
    while (currentNode !== this.startNode.name){
        shortest.push(currentNode)
        currentNode = this.path[currentNode][1]
    }
    return (shortest.concat(this.startNode.name)).reverse()
}

Algorithm.prototype.animateNodes = function(ctx){
  let that = this
    setInterval(_animateNodes, this.graph.delay)

    function _animateNodes(){    
        if (that.visitedNodes.length > 0){
            let first = that.visitedNodes.shift()
            that.nodes.find(node => node.name === first).status = 'visited'
            that.graph.draw(ctx)
        }
    }
}

Algorithm.prototype.animatePath = function(ctx){
    setInterval(_animatePath, this.graph.delay)

    let that = this
    function _animatePath(){
        let shortest = that.shortestPath()
        for (let i = 0; i < shortest.length -1; i++){
            current = that.paths.find(path => path.parentNode.name === shortest[i] && path.childNode.name === shortest[i+1])
            current.status = 'shortest'
            that.graph.draw(ctx)
        }
    }
}

module.exports = Algorithm;