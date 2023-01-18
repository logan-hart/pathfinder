const Node = require("./node.js")

function Path (parentNode, childNode, ){
    this.parentNode = parentNode
    this.childNode = childNode
    this.startPos = parentNode.pos
    this.endPos = childNode.pos
    this.delta = [Math.abs(this.startPos[0] - this.endPos[0]), Math.abs(this.startPos[1] - this.endPos[1])]
    this.distance = Math.sqrt(Math.pow((this.startPos[0] - this. endPos[0]),2) + Math.pow((this. startPos[1] + this.endPos[1]),2))
    this.traffic = 0
    this.weight = this.distance // * some factor
    this.status = 'none'
    this.associations()
}

Path.prototype.draw = function(ctx, color, size){
    ctx.beginPath();
    ctx.strokeStyle = `${color}`;
    ctx.lineWidth = size;
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.stroke();
}

Path.prototype.associations = function (){
    this.parentNode.neighbors[JSON.stringify(this.childNode.name)] = this.weight
    this.childNode.neighbors[JSON.stringify(this.parentNode.name)] = this.weight
}

module.exports = Path



