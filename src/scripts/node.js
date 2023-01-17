function Node(name, pos){   
    this.name = name
    this.pos = pos
    this.radius = 10
    this.neighbors = {}
    this.status = 'unvisited'
    // this.size = size             used for creating a larger graph
}

Node.prototype.draw = function(ctx, color){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = `${color}`;
    ctx.fill();
}

// Node.prototype.move = function (pos){
//     this.position = (pos)
//     this.draw

// }

module.exports = Node;