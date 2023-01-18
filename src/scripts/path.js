function Path (parentNode, childNode, traffic){
    this.parentNode = parentNode
    this.childNode = childNode
    this.startPos = parentNode.pos
    this.endPos = childNode.pos
    this.delta = [Math.abs(this.startPos[0] - this.endPos[0]), Math.abs(this.startPos[1] - this.endPos[1])]
    this.distance = Math.sqrt(Math.pow((this.startPos[0] - this. endPos[0]),2) + Math.pow((this. startPos[1] + this.endPos[1]),2))
    this.traffic = traffic
    this.weight = this.distance //* this.traffic
    this.status = 'none'
    this.associations()
}

Path.prototype.draw = function(ctx){
    ctx.beginPath();
    if (this.status === 'none'){
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
    } else if (this.status === 'shortest'){
        ctx.strokeStyle = '#0288d1'
        ctx.lineWidth = 8
    } 
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.stroke();
}

Path.prototype.associations = function (){
    this.parentNode.neighbors[JSON.stringify(this.childNode.name)] = this.weight
    this.childNode.neighbors[JSON.stringify(this.parentNode.name)] = this.weight
}

module.exports = Path