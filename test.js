const graph = {
    a: { b: 5, c: 2 },
    b: { a: 5, c: 7, d: 8 },
    c: { a: 2, b: 7, d: 4, e: 8 },
    d: { b: 8, c: 4, e: 6, f: 4 },
    e: { c: 8, d: 6, f: 3 },
    f: { e: 3, d: 4 },
  };
  
  const printTable = (table) => {
    return Object.keys(table)
      .map((vertex) => {
        var { vertex: from, cost } = table[vertex];
        return `${vertex}: ${cost} via ${from}`;
      })
      .join("\n");
  };
  
  const tracePath = (table, start, end) => {
    var path = [];
    var next = end;
    while (true) {
      path.unshift(next);
      if (next === start) {
        break;
      }
      next = table[next].vertex;
    }
  
    return path;
  };
  
  const formatGraph = (g) => {
    const tmp = {};
    Object.keys(g).forEach((k) => {
      const obj = g[k];
      const arr = [];
      Object.keys(obj).forEach((v) => arr.push({ vertex: v, cost: obj[v] }));
      tmp[k] = arr;
    });
    return tmp;
  };
  
  const dijkstra = (graph, start, end) => {
    var map = formatGraph(graph);
  
    var visited = [];
    var unvisited = [start];
    var shortestDistances = { [start]: { vertex: start, cost: 0 } };
  
    var vertex;
    while ((vertex = unvisited.shift())) {
      // Explore unvisited neighbors
      var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));
  
      // Add neighbors to the unvisited list
      unvisited.push(...neighbors.map((n) => n.vertex));
  
      var costToVertex = shortestDistances[vertex].cost;
  
      for (let { vertex: to, cost } of neighbors) {
        var currCostToNeighbor =
          shortestDistances[to] && shortestDistances[to].cost;
        var newCostToNeighbor = costToVertex + cost;
        if (
          currCostToNeighbor == undefined ||
          newCostToNeighbor < currCostToNeighbor
        ) {
          // Update the table
          shortestDistances[to] = { vertex, cost: newCostToNeighbor };
        }
      }
  
      visited.push(vertex);
    }
  
    console.log("Table of costs:");
    console.log(printTable(shortestDistances));
  
    const path = tracePath(shortestDistances, start, end);
  
    console.log(
      "Shortest path is: ",
      path.join(" -> "),
      " with weight ",
      shortestDistances[end].cost
    );
  };
  
  dijkstra(graph, "a", "f");
  