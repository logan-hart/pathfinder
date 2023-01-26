function Legend(){
    this.nodes = [new Node("legendstart", [20, 20]), new Node("legendend", [20,60])];
    this.nodes[0].selected = "start" 
    this.nodes[1].selected = "end"
    this.nodes.forEach(function(node){
        node.draw(ctx2)
    })
}


module.exports = Legend;