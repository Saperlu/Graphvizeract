var selectedNode;

function getGraph() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/");
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            const graphBox = document.getElementById("graphBox");
            if (graphBox.firstChild) graphBox.removeChild(graphBox.firstChild);
            // const graph = document.createElement("div");
            graphBox.innerHTML =  JSON.parse(req.responseText).chaine;
            // graphBox.appendChild(graph);
            setupNodes();
        }
    }
}


function selectNode(node) {
    unselectNode();
    selectedNode = node;
    selectedNode.getElementsByTagName("ellipse")[0]
        .style.fill = "red";
    const removeNodeButton = document.getElementById("removeNodeButton");
    removeNodeButton.onclick = removeNode.bind(removeNodeButton, node);
}

function unselectNode() {
    if (selectedNode) {
        selectedNode.getElementsByTagName("ellipse")[0].
            style.fill = "#FEDCFA";
    }
}

function removeNode(node) {
    var req = new XMLHttpRequest();
    const nodeId = node.id.slice(4);

    req.open("DELETE", `http://localhost:3000/node/${nodeId}`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            getGraph()
        }
    }
}

function addEdge(node) {
    console.log(node);
    if (selectedNode && selectedNode != node) {
        nodeName = getNodeName(node);
        selectedNodeName = getNodeName(selectedNode);
        console.log(selectedNodeName + ' --> ' + nodeName);



        nodeId = getNodeId(node);
        selectedNodeId = getNodeId(selectedNode);
        req = new XMLHttpRequest;
        req.open("POST", `http://localhost:3000/edge/${selectedNodeId}/${nodeId}`);
        console.log(`http://localhost:3000/edge/${selectedNodeId}/${nodeId}`);
        req.send();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                getGraph()
            }
        }
    }
    return false;
}

function setupNodes() {
    nodes = Array.from(document.getElementsByClassName("node"));
    nodes.forEach((node) => {
        node.onclick = () => {
            selectNode(node);
            openNav(node);
        }

        node.oncontextmenu = addEdge.bind(node, node)
    });
}

function openNav(node) {
    const nodeName = getNodeName(node)
    const nav = document.getElementById("sidePane");
    nav.children[0].textContent = nodeName;
    nav.style.width = "160px";
    document.getElementById("graphBox").style.marginRight = "160px";
    
}

function closeNav(node) {
    const nav = document.getElementById("sidePane");
    nav.style.width = "0"
    document.getElementById("graphBox").style.marginRight = "0px";
    unselectNode();
}

function getNodeName(node) {
    const nodeName = node.getElementsByTagName("text")[0].textContent;
    return nodeName;
}

function getNodeId(node) {
    return node.id.slice(4);
}



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

document.getElementById("addButton").onclick = (e) => {
    var req = new XMLHttpRequest();
    var nodeName = Math.random() * 100;
    nodeName = nodeName.toFixed(0).toString();

    req.open("POST", `http://localhost:3000/addNode/${nodeName}`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status == 201) {
            getGraph()
        }
    }
}

getGraph();


