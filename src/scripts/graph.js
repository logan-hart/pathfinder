const Node = require("./node.js");
const Path = require("./path.js");

function Graph(){
    // this.numNodes = numNodes
    this.nodes = []
    this.paths = []
    this.placeNodes()
    this.placePaths()
    this.draw(ctx)
}

Graph.prototype.placeNodes = function (){
    let nodePositions = [
        [ 100, 250 ],
        [ 200, 400 ],
        [ 400, 75 ],
        [ 550, 475 ],
        [ 750, 325 ],
        [ 800, 100 ]
      ]
    for(let i = 0; i < nodePositions.length; i++){
        this.nodes.push(new Node(`${i}`, nodePositions[i]))
    }
}

Graph.prototype.placePaths = function (){
    console.log(this)
    let nodePaths =[
        [this.nodes[0], this.nodes[1]],
        [this.nodes[0], this.nodes[2]],
        [this.nodes[1], this.nodes[2]],
        [this.nodes[1], this.nodes[3]],
        [this.nodes[1], this.nodes[4]],
        [this.nodes[2], this.nodes[3]],
        [this.nodes[2], this.nodes[4]],
        [this.nodes[2], this.nodes[5]],
        [this.nodes[3], this.nodes[4]],
        [this.nodes[4], this.nodes[5]]
    ]
    let that = this
    nodePaths.forEach( function(nodePair){
        that.paths.push(new Path(nodePair[0], nodePair[1]))
    })
}

Graph.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, 970, 600)
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 0, 970, 600);
    this.paths.forEach(function (path){
        path.draw(ctx)
    })
    this.nodes.forEach(function(node){
        node.draw(ctx)
    })
}

Graph.prototype.buildAssociations = function (){
    let associations = {}
    for (let i = 0; i < this.nodes.length; i++){
        if (!associations[i]) associations[i] = {}
    }
    console.log(associations)
}



// Graph.prototype.getRandomPositions = function(){
    // future implimentation for creating new 'maps' with 
    // minimum distance between other nodes and from border
// }

module.exports = Graph;

