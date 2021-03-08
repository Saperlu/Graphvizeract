var selectedNode;

// Removes right click menu
document.oncontextmenu = () => {
    return false;
}

// addNode button
document.getElementById("addButton").onclick = addNode;

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

    
    if (selectedNode && (e.key === "d")) { // KEY: d ===> Remove selectedNode
        removeNode(selectedNode);
    } else if (selectedNode && e.key === "r") {
        renameNode()
    } else if (e.key === "a") { // KEY: a  ===> Add node
        addNode();
    }
}

// render the graph
getGraph();


