function Graph(){
    this.nodes = []
    this.paths = []
    this.delay = 500
    // this.numNodes = numNodes
    this.nodeHitBoxes = {}
    this.placeNodes()
    this.placePaths()
    this.draw(ctx)
}

Graph.prototype.placeNodes = function (){
    const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let nodePositions = [
        [ 100, 250 ],
        [ 200, 400 ],
        [ 400, 75 ],
        [ 550, 475 ],
        [ 750, 325 ],
        [ 800, 100 ]
      ]
    for(let i = 0; i < nodePositions.length; i++){
        this.nodes.push(new Node(alpha[i], nodePositions[i]))
    }

    // functionality here for adding node boxes to array?   
    for(let i = 0; i < nodePositions.length; i++){
        this.nodeHitBoxes[alpha[i]] = [nodePositions[i][1] - 13, nodePositions[i][1] +13, nodePositions[i][0] -13, nodePositions[i][0] +13]
    }
}

Graph.prototype.placePaths = function (){
    console.log(this)
    let nodePaths =[
        [this.nodes[0], this.nodes[1], 'none'],
        [this.nodes[0], this.nodes[2], 'none'],
        [this.nodes[1], this.nodes[2], 'none'],
        [this.nodes[1], this.nodes[3], 'none'],
        [this.nodes[2], this.nodes[3], 'none'],
        [this.nodes[2], this.nodes[4], 'none'],
        [this.nodes[3], this.nodes[4], 'none'],
        [this.nodes[3], this.nodes[5], 'none'],
        [this.nodes[4], this.nodes[5], 'none']
    ]
    let that = this
    nodePaths.forEach( function(nodePair){
        that.paths.push(new Path(nodePair[0], nodePair[1]))
    })
}

Graph.prototype.annotate = function(ctx){
    // this.paths.
}

Graph.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, 970, 600)
    ctx.fillStyle = "#fbfbfb";
    ctx.fillRect(0, 0, 970, 600);
    this.paths.forEach(function (path){
        path.draw(ctx)
    })
    this.nodes.forEach(function(node){
        node.draw(ctx)
    })
}

Graph.prototype.clearSelected = function(){
    Object.keys(g.nodes).forEach (function(element){
      g.nodes[element].selected = null
    })
  }


// Graph.prototype.getRandomPositions = function(){
    // future implimentation for creating new 'maps' with 
    // minimum distance between other nodes and from border
// }


module.exports = Graph;

