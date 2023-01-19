function Path (parentNode, childNode, traffic){
    this.parentNode = parentNode
    this.childNode = childNode
    this.startPos = this.getStartPos()
    this.endPos = this.getEndPos()
    this.delta = [Math.abs(this.startPos[0] - this.endPos[0]), Math.abs(this.startPos[1] - this.endPos[1])]
    this.distance = this.calculateDistance()
    this.traffic = 'none'
    this.weight = this.calculateWeight()
    this.status = 'none'
    this.associations()
}

Path.prototype.getStartPos = function(){
    return this.parentNode.pos
}

Path.prototype.getEndPos = function(){
    return this.childNode.pos
}

Path.prototype.calculateDistance = function(){
    return Math.sqrt(Math.pow((this.startPos[0] - this. endPos[0]),2) + Math.pow((this. startPos[1] + this.endPos[1]),2))
}

Path.prototype.calculateWeight = function (){
    if (this.traffic === 'light'){
        return Math.floor(this.distance * 1.2 )
    }else if (this.traffic === 'medium'){
        return Math.floor(this.distance * 1.2 )
    }else if (this.traffic === 'heavy'){
        return Math.floor(this.distance * 1.8 )
    }else {
        return Math.floor(this.distance)
    }
}

Path.prototype.draw = function(ctx){
    ctx.beginPath();
    if (this.traffic === 'light'){
        ctx.strokeStyle = 'yellow'
        ctx.lineWidth = 4
    }else if (this.traffic === 'medium'){
        ctx.strokeStyle = 'orange'
        ctx.lineWidth = 4
    } else if (this.traffic === 'heavy'){
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 4
    }  else if (this.status === 'shortest'){
        ctx.strokeStyle = '#0288d1'
        ctx.lineWidth = 8
    } else { 
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
    }
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.stroke();
}

Path.prototype.associations = function (){
    this.parentNode.neighbors[this.childNode.name] = this.weight
    this.childNode.neighbors[this.parentNode.name] = this.weight
}

module.exports = Path