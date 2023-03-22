const Node = require("./scripts/node.js");
const Path = require("./scripts/path.js");
const Graph = require("./scripts/graph.js")
const Algorithm = require("./scripts/algorithm.js")
const Legend = require("./scripts/legend.js")


document.addEventListener("DOMContentLoaded", function () {
  const graphcanvas = document.getElementById("graphcanvas");
  const legendcanvas = document.getElementById("legendcanvas")
  const ctx = graphcanvas.getContext("2d");
  const ctx2 = legendcanvas.getContext("2d");
  const startButton = document.getElementById('startbutton')
  const resetButton = document.getElementById('resetbutton')
  
  window.ctx = ctx;
  window.ctx2 = ctx2
  window.Node = Node;
  window.Path = Path;
  // window.Graph = Graph;
  // window.Algorithm = Algorithm;
  // window.Legend = Legend;

  graphcanvas.width = 1250;
  graphcanvas.height = 750;
  legendcanvas.width = 100;


  ctx.fillRect(0, 0, 1250, 750);
  ctx.font = "20px helvetica"
  
  ctx2.fillStyle = "rgba(0,0,0, 0)";
  ctx2.fillRect(0, 0, 40, 80);

  g = new Graph
  g.draw(ctx)
  l = new Legend

  startButton.addEventListener('click', e => {
    e.preventDefault()
    algo = new Algorithm
    algo.paths.forEach(function(el){
      el.status = 'none'
    })
    algo.determinePathing()
    algo.animateNodes(ctx)
    algo.animatePath(ctx)
    startButton.disabled = true;
      setTimeout(function(){startButton.disabled = false;}, g.delay *8)
    resetButton.disabled = true;
      setTimeout(function(){resetButton.disabled = false;}, g.delay *8)
  })
  
  resetButton.addEventListener('click', e => {
    e.preventDefault()
    algo.nodes.forEach (function(el){
      el.status = "unvisited"
    })
    algo.paths.forEach(function(el){
      el.traffic = 'none'
      el.status = 'none'
    })
    algo.graph.draw(ctx)
  })
  
  function getMousePosition(graphcanvas, event) {
    let rect = graphcanvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x,y]
  }
  
  graphcanvas.addEventListener("click", (e) => {
    let pos = getMousePosition(graphcanvas, e);
    let trafficStatus = ['none', 'light', 'medium', 'heavy' ]
    let inNode
    Object.keys(g.nodeHitBoxes).forEach (function (el){
      let hitbox = g.nodeHitBoxes[el]
      if (pos[0] > hitbox[2] && pos[0] < hitbox[3] && pos[1] > hitbox[0] && pos[1] < hitbox[1]) inNode = true
    })
    g.pathHitBoxes.forEach (function(path){
      if (this.ctx.isPointInStroke(path, e.offsetX, e.offsetY) && !inNode){
        let currentPath = g.paths[g.pathHitBoxes.indexOf(path)]
        let currentTraffic = trafficStatus.indexOf(currentPath.traffic)
        currentPath.traffic = trafficStatus[currentTraffic+1]
        currentPath.calculateWeight()
        g.draw(ctx)
      } 
    })
  })

  let is_dragging = false
  let startX
  let startY
  let dragNode
  let downPos

  graphcanvas.addEventListener('mousedown', function(e){
    [startX, startY] = getMousePosition(graphcanvas, e)
    downPos = Array.from(getMousePosition(graphcanvas, e))
    Object.keys(g.nodeHitBoxes).forEach (function (el){
      let hitbox = g.nodeHitBoxes[el]
      if (startX > hitbox[2] && startX < hitbox[3] && startY > hitbox[0] && startY < hitbox[1]){
        dragNode = g.nodes.find(node => node.name === el)
        is_dragging = true
        return
      }
    })
  })

  let mouse_up = function(e){
    e.preventDefault();
    let [currentX, currentY] = getMousePosition(graphcanvas, e)
    let distance = Math.sqrt(Math.pow(currentX- downPos[0], 2) + Math.pow(currentY - startY, 2));
    if (distance < 1){
      Object.keys(g.nodeHitBoxes).forEach (function (el){
        let hitbox = g.nodeHitBoxes[el]
        if (startX > hitbox[2] && startX < hitbox[3] && startY > hitbox[0] && startY < hitbox[1]){
          let found = g.nodes.find(node => node.name === el)
          let result = selectedSpaceship()
          if (result === -1){
            found.selected = 'start'
          } else if (result === 0 && found.selected !== 'start'){
            found.selected = 'end'
          } else if (found.selected === 'end'){
            found.selected = 'none'
          } else{
            g.clearSelected()
          }
          g.draw(ctx)
        }
      })
    } 
    if (!is_dragging){
      return;
    }
    is_dragging = false
  }

  function selectedSpaceship(){
    let start = 0
    let end = 0
    Object.keys(g.nodes).forEach (function(element){
      let node = g.nodes[element]
      if (node.selected === 'start'){
        start +=1
      } else if (node.selected === 'end'){
        end +=1
      }
    })
    return start === 0 && end === 0 ? -1: start === 1 && end === 0 ? 0 : 1 
  }

  let mouse_out = function(e){
    e.preventDefault();
    if (!is_dragging){
      return;
    }
    is_dragging = false
  }

  let mouse_move = function (e){
    if (!is_dragging){
      return
    } else {
      e.preventDefault()
      let dragPos = getMousePosition(graphcanvas, e)

      let dx = dragPos[0] - startX
      let dy = dragPos[1] - startY
      dragNode.pos[0] += dx
      dragNode.pos[1] += dy

      g.draw(ctx)
      
      startX = dragPos[0]
      startY = dragPos[1]

      g.paths.forEach(function (ele){
        ele.distance = ele.calculateDistance()
        ele.weight = ele.calculateWeight()
        ele.associations()
      })

      g.buildHitBoxes()
    }
  }

  graphcanvas.onmouseup = mouse_up;
  graphcanvas.onmouseout = mouse_out;
  graphcanvas.onmousemove = mouse_move;

  const slider = document.getElementById("myRange")
  slider.oninput = function() {
    g.delay = 1000 - this.value 
  }

  const openModalButtons = document.querySelectorAll('[data-modal-target]')
  const closeModalButtons = document.querySelectorAll('[data-close-button]')
  const overlay = document.getElementById('overlay')

  overlay.addEventListener('click', () =>{
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal()
    })

  })

  openModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)

    })
  })

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })

  function openModal(modal){
    if (modal == null) return 
    modal.classList.add('active')
    overlay.classList.add('active')
  }

  function closeModal(modal){
    if (modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active')
  }



})

