function Graph(){
    this.nodes = []
    // this.numNodes = numNodes
    this.nodeHitBoxes = {}
    this.startingNodes = [
        [ 700, 100 ],
        [ 600, 175 ],
        [ 500, 250 ],
        [ 400, 325 ],
        [ 500, 400 ],
        [ 600, 475 ],
        [ 700, 550 ],
        [ 800, 475 ],
        [ 900, 400 ],
        [ 1000, 325 ],
        [ 900, 250 ],
        [ 800, 175 ]]
    this.paths = []
    this.pathHitBoxes = []
    this.delay = 500
    this.placeNodes()
    this.placePaths()
    this.buildHitBoxes()
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
    let nodePaths =[
        [this.nodes[0], this.nodes[4], 'none'],
        [this.nodes[0], this.nodes[8], 'none'],
        [this.nodes[1], this.nodes[5], 'none'],
        [this.nodes[1], this.nodes[9], 'none'],
        [this.nodes[2], this.nodes[10], 'none'],
        [this.nodes[3], this.nodes[7], 'none'],
        [this.nodes[3], this.nodes[11], 'none'],
        [this.nodes[4], this.nodes[8], 'none'],
        [this.nodes[4], this.nodes[0], 'none'],
        [this.nodes[5], this.nodes[9], 'none'],
        [this.nodes[5], this.nodes[1], 'none'],
        [this.nodes[6], this.nodes[10], 'none'],
        [this.nodes[6], this.nodes[2], 'none'],
        [this.nodes[7], this.nodes[11], 'none'],
        [this.nodes[7], this.nodes[3], 'none'],
        [this.nodes[8], this.nodes[0], 'none'],
        [this.nodes[8], this.nodes[4], 'none'],
        [this.nodes[9], this.nodes[1], 'none'],
        [this.nodes[1], this.nodes[7], 'none'],
        [this.nodes[5], this.nodes[11], 'none'],
        // [this.nodes[1], this.nodes[7], 'none'],
        // [this.nodes[5], this.nodes[11], 'none'],
        [this.nodes[3], this.nodes[8], 'none'],
        [this.nodes[3], this.nodes[10], 'none'],
        [this.nodes[9], this.nodes[2], 'none'],
        [this.nodes[9], this.nodes[4], 'none'],
        
    ]
    let that = this
    nodePaths.forEach( function(nodePair){
        that.paths.push(new Path(nodePair[0], nodePair[1]))
    })
}

Graph.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, 1250, 750)
    ctx.fillStyle = "rgba(225,225,225, 0.2)";
    ctx.fillRect(0, 0, 1250, 750);
    this.placePathHBs()
    this.paths.forEach(function (path){
        path.draw(ctx)
    })
    for (let i = 0; i < this.nodes.length; i++){
        this.nodes[i].draw(ctx)
    }
    this.nodes.forEach(function(node){
        node.draw(ctx)
    })

    this.annotate(ctx)
}


Graph.prototype.placePathHBs = function(){
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    for (let i = 0; i < this.paths.length; i++){
        this.pathHitBoxes.push(pathBox(alpha[i], i))
    }
}

function pathBox (name, i){
    name = new Path2D()
    name.moveTo(g.paths[i].startPos[0], g.paths[i].startPos[1])
    name.lineTo(g.paths[i].endPos[0], g.paths[i].endPos[1])
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(0,0,0,0)"
    ctx.stroke(name);
    return name
}

Graph.prototype.annotate = function (ctx){
    this.nodes.forEach( function(node){
        ctx.lineWidth = 1.5
        ctx.font = "20px"
        ctx.strokeStyle = "white"
        ctx.strokeText(`${node.name}`, node.pos[0] + 15, node.pos[1] + 25);
    })
}

Graph.prototype.clearSelected = function(){
    Object.keys(g.nodes).forEach (function(element){
      g.nodes[element].selected = null
    })
    
}


module.exports = Graph;

