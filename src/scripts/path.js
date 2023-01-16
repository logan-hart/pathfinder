const Node = require("./node.js")

function Path (parentNode, childNode, ){
    this.parentNode = parentNode
    this.childNode = childNode
    this.startPos = parentNode.pos
    this.endPos = childNode.pos
    this.distance = Math.sqrt(Math.pow((this.startPos[0] - this. endPos[0]),2) + Math.pow((this. startPos[1] + this.endPos[1]),2))
    this.status = 'unvisited'
    this.weight = this.distance // * some factor
    this.associations()
}

Path.prototype.draw = function(ctx, color){
    ctx.beginPath();
    ctx.strokeStyle = `${color}`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.stroke();
}


Path.prototype.associations = function (){
    let childNode = this.childNode;
    let parentNode = this.parentNode;
    let weight = this.weight;
    // debugger
    parentNode.neighbors = Object.assign({}, childNode, {childNode: weight });
    childNode.neighbors = Object.assign({}, parentNode, {parentNode: weight });
}

module.exports = Path



