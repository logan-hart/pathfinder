# Background:

The algorithm on this page dynamically determines the shortest distance between all nodes on the graph and highlights the shortest path between the starting and ending node. It was developed from the ground up by referencing the psuedo-code for Dijkstra's shortest path algorithm. 

Functionally Dijkstra's algorithm is useful for mapping efficiency and shortest pathing between nodes.

This visualization allows a user to select a starting and ending node, and animate each iteration of the algorithm (by highlighting each node) as it determines the shortest distance pathing between all nodes on the graph. It then highlights the optimal path.

Nodes may be dragged/dropped to a new location on the graph and the distance dynamically updates. The slider at the bottom increases/decreases the animation time. 

Planned future functionality includes. ‘Traffic simulation’ allowing the user to increasing the ‘travel time’ between the nodes on-click.

 Multiple nodes of transportation each with its own associated ‘travel time’ — walking vs. subway vs. driving. Toggling between pathing options such as 'distance' ‘fastest’, ‘fewest transfers’, ‘lowest price.’ Actual map overlay . 

# Functionality & MVPs:

With the Path Optimizer visualization, users will be able to:

Select a starting and ending node.
Through drag/drop functionality, interactively move nodes to new locations on the graph.
Play an animation visualizing the process of Dijkstra's Algorithm.

In addition, this project will include:
An active slider to increase/decrease the animation speed. 
An instructional legend and modal readme.

# Basic Layout:

![](./images/wireframe.png)

- Navigation Bar
- Node Graph displaying the nodes and paths between the nodes on the graph.
- A button to begin/pause/stop the animation
- A slider to increase/decrease animation speed
- Links to github and Linked in

# This project will be implemented with the following technologies:

1. Canvas will be used to render the graph
2. Webpack to bundle the source JavaScript code Bable for interpolation
3. npm to manage project dependencies

# Implementation Timeline:

Thursday Afternoon: Begin project skeleton and complete project proposal. Create Node, Path, Graph classes. Implement Canvas and add draw functionality to each class. 

Friday Afternoon & Weekend: Implement Dijkstra's algorithm with a predetermined start/end to iterate through nodes/paths. Add in a variable timeout delay to account for animation. Add animation to algorithm iterations to highlight active nodes/paths. 

Monday: Ensure the algorithm and animation are working properly. Develop event listener/handler for the user to select start/ending nodes. Construct new graph on load of page. Instantiate event handling with a start button and slider to and slow the animation. 

Tuesday: Continue event handling. Develop logic for the user to drag/drop nodes, include recalculation of pathing between nodes. Add 'traffic' option to increase travel times between nodes. CSS styling.

Wednesday: Finish implementing of any outlying features. Look into adding functionality for map over/lay and differing modes of transportation. 

Thursday Morning: Deploy to GitHub pages. 