function Graph(){
    this.nodes = []
    // this.numNodes = numNodes
    this.nodeHitBoxes = {}
    this.startingNodes = [
        [ 100, 175 ],
        [ 200, 400 ],
        [ 400, 75 ],
        [ 550, 475 ],
        [ 750, 100 ],
        [ 850, 400 ]
    ]
    this.paths = []
    this.pathHitBoxes = []
    this.delay = 500
    this.placeNodes()
    this.placePaths()
    this.buildHitBoxes()
    this.draw(ctx)
}

Graph.prototype.placeNodes = function (){
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    
    for(let i = 0; i < this.startingNodes.length; i++){
        this.nodes.push(new Node(alpha[i], this.startingNodes[i]))
    }
}

Graph.prototype.buildHitBoxes = function(){
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    for(let i = 0; i < this.startingNodes.length; i++){
        this.nodeHitBoxes[alpha[i]] = [this.startingNodes[i][1] - 13, this.startingNodes[i][1] +13, this.startingNodes[i][0] -13, this.startingNodes[i][0] +13]
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

Graph.prototype.pathHitBoxes = function(){

    // for (let i = 0; i < this.nodes.length; i++){
    //     let line = new Path2D()
    //     debugger
    //         line.moveTo(this.paths[i].startPos[0], this.paths[i].startPos[1])
    //         line.lineTo()
    // }

}

Graph.prototype.getDeltas = function(){
    let deltas = []
    debugger
    this.nodes.forEach (function(node){
        deltas.push([(486 -node.pos[0])/100, (301 -node.pos[1])/100])
    })
    return deltas
}

Graph.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, 970, 600)
    ctx.fillStyle = "#fbfbfb";
    ctx.fillRect(0, 0, 970, 600);
    this.paths.forEach(function (path){
        path.draw(ctx)
    })

    // let deltas = this.getDeltas()
    for (let i = 0; i < this.nodes.length; i++){
        this.nodes[i].draw(ctx)
    }
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

