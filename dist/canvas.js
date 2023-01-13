document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("node-graph");
    canvas.width = 970;
    canvas.height = 600;
  
    const ctx = canvas.getContext("2d");
  
      window.ctx = ctx;
  
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 0, 970, 600);
 

  });