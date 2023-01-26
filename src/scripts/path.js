function Path (parentNode, childNode, traffic){
    this.parentNode = parentNode
    this.childNode = childNode
    this.startPos = this.getStartPos()
    this.endPos = this.getEndPos()
    this.delta = [Math.abs(this.startPos[0] - this.endPos[0]), Math.abs(this.startPos[1] - this.endPos[1])]
    this.distance = this.calculateDistance()
    const trafficStatus = ['none', 'light', 'medium', 'heavy']
    this.traffic = trafficStatus[0]
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
    let a = this.startPos[0] - this.endPos[0]
    let b = this.startPos[1] - this.endPos[1]
    let c = Math.sqrt(Math.pow((a),2) + Math.pow((b),2))
    return c/96
}

Path.prototype.calculateWeight = function (){
    if (this.traffic === 'light'){
        return this.distance * 1.5 
    }else if (this.traffic === 'medium'){
        return this.distance * 2.0 
    }else if (this.traffic === 'heavy'){
        return this.distance * 2.5
    }else {
        return this.distance
    }
}

Path.prototype.draw = function(ctx){
    if(this.status === 'shortest'){
        ctx.beginPath();
        ctx.strokeStyle = '#00ACDF'
        ctx.lineWidth = 12
        ctx.moveTo(this.startPos[0], this.startPos[1]);
        ctx.lineTo(this.endPos[0], this.endPos[1]);
        ctx.stroke();
    } 

    ctx.beginPath();
    if (this.traffic === 'light'){
        ctx.strokeStyle = 'yellow'
        ctx.lineWidth = 6
    }else if (this.traffic === 'medium'){
        ctx.strokeStyle = 'orange'
        ctx.lineWidth = 6
    } else if (this.traffic === 'heavy'){
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 6
    }  else if(this.status === 'shortest'){
        ctx.strokeStyle = 'lightblue'
        ctx.lineWidth = 6
    } 

    ctx.beginPath();
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.stroke();

}

Path.prototype.associations = function (){
    this.parentNode.neighbors[this.childNode.name] = this.weight
    this.childNode.neighbors[this.parentNode.name] = this.weight
}

module.exports = Path