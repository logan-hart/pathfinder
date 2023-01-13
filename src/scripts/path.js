const Node = require("./node.js")

function Path (parentNode, childNode){
    this.parentNode = parentNode
    this.childNode = childNode
    this.startPos = parentNode.pos
    this.endPos = childNode.pos
    this.associations()
    this.distance = Math.sqrt(Math.pow((this.startPos[0] - this. endPos[0]),2) + Math.pow((this. startPos[1] + this.endPos[1]),2))
    this.status = null
    this.weight = this.distance * this.status
}

Path.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.stroke();
}

Path.prototype.associations = function (){
    this.parentNode.neighbors.push(this.childNode)
    this.childNode.neighbors.push(this.parentNode)
}

module.exports = Path



