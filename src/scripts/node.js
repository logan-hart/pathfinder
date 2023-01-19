function Node(name, pos){   
    this.name = name
    this.pos = pos
    this.radius = 10
    this.neighbors = {}
    this.status = 'unvisited'
    this.selected = null
    // this.size = size             used for creating a larger graph
}

Node.prototype.draw = function(ctx){
    const a = 2 * Math.PI / 6;
    const r = 13;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(this.pos[0] + r * Math.cos(a * i), this.pos[1] + r * Math.sin(a * i));
    }
    if (this.selected === null){
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
    } else if (this.selected === 'start'){
        ctx.strokeStyle = "green";
        ctx.lineWidth = 7;
    } else if (this.selected === 'end'){
        ctx.strokeStyle = "red";
        ctx.lineWidth = 7;
    } 
    if (this.status !== 'visited'){
        ctx.fillStyle = 'white'
    } else {
        ctx.fillStyle = '#0288d1'
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill()
    
}


module.exports = Node;