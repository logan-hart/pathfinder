function Node(name, pos){   
    this.name = name
    this.pos = pos
    this.radius = 11
    this.neighbors = {}
    this.status = 'unvisited'
    this.selected = null
    // this.size = size             used for creating a larger graph
}

Node.prototype.draw = function(ctx){

    ctx.beginPath();
    ctx.arc(this.pos[0], this. pos[1], this.radius, 0, Math.PI * 2, true);
    if (this.selected === null){
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
    } else if (this.selected === 'start'){
        ctx.strokeStyle = "#8ffe09";
        ctx.lineWidth = 7;
    } else if (this.selected === 'end'){
        ctx.strokeStyle = "#9900FF";
        ctx.lineWidth = 7;
    } 
    if (this.status !== 'visited'){
        ctx.fillStyle = '#8ab0da'
    } else {
        ctx.fillStyle = '#65b00b'
    }

    ctx.stroke();
    ctx.fill()
    
}


module.exports = Node;