function Legend(){
    this.nodes = [new Node("legendstart", [100, 250]), new Node("legendend", [100, 350])];

}

Legend.prototype.draw = function (ctx2){
    this.nodes[0].selected = 'start'
    let that = this
    this.nodes.forEach (function(node){
        const a = 2 * Math.PI / 6;
        const r = 13;
        ctx2.beginPath();
        for (var i = 0; i < 2; i++) {
            ctx2.lineTo(that.nodes[0].pos[0] + r * Math.cos(a * i), that.nodes[0].pos[1] + r * Math.sin(a * i));
        }
         if (that.selected === 'start'){
            ctx2.strokeStyle = "green";
            ctx2.lineWidth = 7;
        } else if (that.selected === 'end'){
            ctx2.strokeStyle = "red";
            ctx2.lineWidth = 7;
        } 
        if (that.status !== 'visited'){
            ctx2.fillStyle = 'white'
        }
        ctx2.closePath();
        ctx2.stroke();
    })
}


module.exports = Legend;