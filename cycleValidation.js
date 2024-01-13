// Storage 2D Matrix (basic need)
let collectedGraphComponent = [];

let graphComponentMatrix = [];

/*for (i = 0; i < rows; i++) {
  let row = [];
  for (j = 0; j < cols; j++) {
    //Why to use array? Because more than 1 child relation(dependency)
    row.push([]);
  }
  graphComponentMatrix.push(row);
}*/

// True  -> cycle, False -> not cyclic
function isGraphCyclic(graphComponentMatrix) {
  //Dependency on -> visited, dfsvisisted (2D array)
  let visited = []; //Node visit trace
  let dfsVisited = []; //stack trace

  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (j = 0; j < cols; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        let response = dfsCycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        if (response == true) return [i, j]; //Cycle detected
      }
    }
  }
  return null;
}

// Start with making -> visited marked true and dfsVisited marked true
//End with marking DFSvisited to false
// If vis[i][j] -> true then it is an already explored path, retrace. No need visiting visited nodes
//Cycle detection condition -> if vis[i][j] ==true && dfsvis[i][j]== true, it is a cycle
// returns -> boolean value true or false
function dfsCycleDetection(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  // A1 -> [ [0.1], [1.0], .....]
  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
    if (visited[nbrr][nbrc] === false) {
      let response = dfsCycleDetection(
        graphComponentMatrix,
        nbrr,
        nbrc,
        visited,
        dfsVisited
      );
      if (response == true) return true; //cycle found, return, no need exploring rest of the graph
    } else if (
      visited[nbrr][nbrc] === true &&
      dfsVisited[nbrr][nbrc] === true
    ) {
      return true;
    }
  }

  dfsVisited[srcr][srcc] = false;
  return false;
}
