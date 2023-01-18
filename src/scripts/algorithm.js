const Node = require("./node.js");
const Path = require("./path.js");
const Graph = require("./graph.js");

function Algorithm(){
    this.graph = new Graph
    this.nodes = this.graph.nodes
    this.paths = this.graph.paths
    this.startNode = this.nodes[0]
    this.endNode = this.nodes[this.nodes.length-1] //this.graph.nodes[this.graph.nodes.length-1] 
    this.visitedNodes = []
    // this.associations = buildAssociations(this.graph)
}

Algorithm.prototype.determinePathing = function(){
    let map = this.buildMap()
    
    let currentNode = this.startNode.name
    let unvisitedNodes = Object.keys(map)
    let shortestDist = {}
    let path = {}
    Object.keys(map).forEach(function(el){
      path[el] = []
    })

    this.nodes.forEach( function(node){
        shortestDist[node.name] = Infinity
    })

    shortestDist[currentNode] = 0    
    path[currentNode] = [0, currentNode]

    while (unvisitedNodes.length > 0){
        // update currentNode with closest neighboring node
        currentNode = Object.entries(shortestDist)
            .filter(([key]) => unvisitedNodes.includes(key))
            .sort((a, b) => a[1] - b[1])[0][0];
        this.visitedNodes.push(currentNode)
        unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)

        //update shortest distances
        let distToCurrent = shortestDist[currentNode]
        Object.keys(map[currentNode]).forEach(function(el){
            let ele = JSON.parse(el)
            if (shortestDist[ele] > map[currentNode][el] + distToCurrent){
                shortestDist[ele] = map[currentNode][el] + distToCurrent
            }
            if (path[ele].length === 0){
                path[ele] = [(map[currentNode][el] + distToCurrent), currentNode]
            }
        })
    }
    this.path = path
    //can refactor to combine path & shortestDist OR remove shortest Dist
}

Algorithm.prototype.buildMap = function(){
    let map = {}
    
    for (let i = 0; i <this.nodes.length; i++){   
        if (!map[this.nodes[i].name]){
            map[this.nodes[i].name] = this.nodes[i].neighbors
        }
    }
    return map
}

Algorithm.prototype.shortestPath = function(){
    let currentNode = this.endNode.name
    let shortest = []
    while (currentNode !== this.startNode.name){
        shortest.push(currentNode)
        currentNode = this.path[currentNode][1]
    }
    return (shortest.concat(this.startNode.name)).reverse()
}


Algorithm.prototype.animateNodes = function(ctx){
    let visitedNodes = this.visitedNodes.slice(0)
    let that = this
    return new Promise((resolve) => {
      setInterval(_animateNodes, this.graph.delay)
  
      function _animateNodes(){    
          if (visitedNodes.length > 0){
              let first = visitedNodes.shift()
              that.nodes.find(node => node.name === first).status = 'visited'
              that.graph.draw(ctx)
          } else {
              resolve()
          }
      }
    })
  }
  
  Algorithm.prototype.animatePath = async function(ctx){
      await this.animateNodes(ctx)

  
      let that = this
          let shortest = that.shortestPath()
          for (let i = 0; i < shortest.length -1; i++){
              current = that.paths.find(path => path.parentNode.name === shortest[i] && path.childNode.name === shortest[i+1])
              current.status = 'shortest'
              that.graph.draw(ctx)
          }
      
  }

// function drawLine(x1,y1,x2,y2,ctx,ratio) {
//     ctx.fillRect(0,0,970,600);
//     ctx.moveTo(x1,y1);
//     x2 = x1 + ratio * (x2-x1);
//     y2 = y1 + ratio * (y2-y1);
//     ctx.lineTo(x2,y2);
//     ctx.stroke();
//   }
  
//   function animate(ratio) {
//     ratio = ratio || 0;
//     drawLine(0,0,300,300,ratio);
//     if(ratio<1) {
//       requestAnimationFrame(function() {
//         animate(ratio + 0.01);
//       });
//     }
//   }
  


  

//     this.pos[0] += this.vel[0]
// this.pos[1] += this.vel[1]

module.exports = Algorithm;