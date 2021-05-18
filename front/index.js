var selectedNode;
var isSelectedNodeGreen;
var selectedGraph = undefined;

// Removes right click menu
document.oncontextmenu = () => {
    return false;
}

document.getElementById("addGraphButton").onclick = addGraph;



// addNode button
// document.getElementById("addButton").onclick = addNode;

// unselect Node
document.getElementById("graphBox").onclick = (e) => {
    var target = e.target;
    while (target != document) {
        if (target.classList.contains("node")) {
            return;
        }
        target = target.parentNode;
    }
    closeNav();
};

document.onkeypress = (e) => {

    
    if (selectedGraph && selectedNode && (e.key === "d")) { // KEY: d ===> Remove selectedNode
        removeNode(selectedNode);
    } else if (selectedGraph && selectedNode && e.key === "r") {
        renameNode()
    } else if (selectedGraph && e.key === "a") { // KEY: a  ===> Add node
        addNode();
    } else if (selectedGraph && selectedNode && e.key === "g") { // KEY: a  ===> Add node
        openGDoc();
    } else if (selectedGraph && selectedNode && e.key === "v") { // KEY: v ===> Change color
        changeColor();
    } else if (selectedGraph && selectedNode && e.key === "V") { // KEY: V ===> Change color contour
        changeColorContour();
    } else if (e.key === "A") { // KEY: A  ===> Add graph
        addGraph();
    } else if (selectedGraph && e.key === "D") { // KEY: D  ===> Delete graph
        deleteGraph(selectedGraph.id);
    } else if (selectedGraph && e.key === "R") { // KEY: R  ===> Rename graph
        renameGraph();
    } else if (selectedGraph && e.key === "q") { // KEY: <--  ===> Move graph left
        moveGraphLeft();
    } else if (selectedGraph && e.key === "m") { // KEY: -->  ===> Move graph right
        moveGraphRight();
    } else if (selectedGraph && selectedNode && e.key === "c") { // KEY: c ===> Copy formated name in clipboard
        copyNodeFileName();
    } else if (selectedGraph && selectedNode && e.key === "x") { // KEY: x ===> Get json
        printJson();
    }
}

// Get the graph list, then render a graph
getGraphList();


