function Algorithm(){
    this.graph = g
    this.nodes = this.graph.nodes
    this.paths = this.graph.paths
    this.startNode = this.nodes.find(node => node.selected === 'start')
    if (!this.startNode) {
        this.startNode = this.nodes[0]
        this.nodes[0].selected = 'start'
    }
    this.endNode = this.nodes.find(node => node.selected === 'end')
    if (!this.endNode) {
        this.endNode = this.nodes[this.nodes.length-1]
        this.nodes[this.nodes.length-1].selected = 'end'
    }
    this.visitedNodes = []
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
        currentNode = Object.entries(shortestDist)
        .filter(([key]) => unvisitedNodes.includes(key))
        .sort((a, b) => a[1] - b[1])[0][0];
        this.visitedNodes.push(currentNode)
        unvisitedNodes = unvisitedNodes.filter(el => el !== currentNode)
        
        let distToCurrent = shortestDist[currentNode]
        Object.keys(map[currentNode]).forEach(function(el){
            if (shortestDist[el] > map[currentNode][el] + distToCurrent){
                shortestDist[el] = map[currentNode][el] + distToCurrent
            }
            if (path[el].length === 0){
                path[el] = [(map[currentNode][el] + distToCurrent), currentNode]
            }
        })
    }
    this.path = path
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
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let currentNode = this.endNode.name
    let shortest = []
    while (currentNode !== this.startNode.name){
        shortest.push(currentNode)
        currentNode = this.path[currentNode][1]
    }

    if (alpha.indexOf(this.startNode.name) > alpha.indexOf(this.endNode.name)){
        return shortest.concat(this.startNode.name)
    } else {
        return (shortest.concat(this.startNode.name)).reverse()   
    }
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

module.exports = Algorithm;