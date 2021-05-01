function getGraph() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://dev-isi.utt.fr:3000");
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            const graphBox = document.getElementById("graphBox");
            if (graphBox.firstChild) graphBox.removeChild(graphBox.firstChild);
            graphBox.innerHTML =  JSON.parse(req.responseText).chaine;
            setupNodes();
            setupEdges();

            // Keeps node selected after refreshing of graph
            if (selectedNode) {
                selectNode(document.getElementById(selectedNode.id));
            }
        }
    }
}


//-------------------------------
// node selection

function selectNode(node) {
    unselectNode();
    selectedNode = node;
    selectedNode.getElementsByTagName("path")[0]
        .style.fill = "#DD7CC6";
    const removeNodeButton = document.getElementById("removeNodeButton");
    removeNodeButton.onclick = removeNode.bind(removeNodeButton, node);
}

function unselectNode() {
    if (selectedNode) {
        selectedNode.getElementsByTagName("path")[0].
            style.fill = "#FEDCFA";
        selectedNode = undefined;
    }
}

//-------------------------------
// Nav

function openNav(node) {
    const nodeName = getNodeName(node)
    const nav = document.getElementById("sidePane");
    nav.children[0].textContent = nodeName; // Set title of pane to nodeName

    const nodeId = getNodeId(node);
    const linkToDoc = `https://docs.google.com/document/d/${nodeId}/edit?usp=sharing`;
    document.getElementById("docLink").href = linkToDoc;

    nav.style.width = "160px"; // Opens the pane
    document.getElementById("graphBox").style.marginRight = "160px";
    
}

function closeNav(node) {
    const nav = document.getElementById("sidePane");
    nav.style.width = "0"
    document.getElementById("graphBox").style.marginRight = "0px";
    unselectNode();
}

//-------------------------------
// Nodes

function getNodeName(node) {
    const nodeName = node.getElementsByTagName("text")[0].textContent;
    return nodeName;
}

function getNodeId(node) {
    return node.getElementsByTagName("title")[0].textContent;
}

function addNode() {
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

function removeNode(node) {
    unselectNode();

    var req = new XMLHttpRequest();
    const nodeId = getNodeId(node);
    
    req.open("DELETE", `http://localhost:3000/node/${nodeId}`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            getGraph()
        }
    }
}

function renameNode() {
    const nodeName = prompt("Entrez le nouveau nom du noeud sélectionné.", "Un joli nom");
    const nodeId = getNodeId(selectedNode);
    
    var req = new XMLHttpRequest();
    req.open("POST", `http://localhost:3000/node/name/${nodeId}/${nodeName}`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            getGraph()
        }
    }
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

//-------------------------------
// Edges

function addEdge(node) {
    if (selectedNode) {
        nodeName = getNodeName(node);
        selectedNodeName = getNodeName(selectedNode);

        nodeId = getNodeId(node);
        selectedNodeId = getNodeId(selectedNode);

        req = new XMLHttpRequest;
        req.open("POST", `http://localhost:3000/edge/${selectedNodeId}/${nodeId}`);
        req.send();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                getGraph()
            }
        }
    }
    return false;
}

function removeEdge(edge) {
    title = edge.getElementsByTagName("title")[0].textContent;
    console.log(title);
    startEdge = title.replace(/->.*/, "");
    endEdge = title.replace(/.*->/, "");
    
    req = new XMLHttpRequest;
        req.open("DELETE", `http://localhost:3000/edge/${startEdge}/${endEdge}`);
        req.send();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                getGraph()
            }
        }

}

function setupEdges() {
    edges = Array.from(document.getElementsByClassName("edge"));
    edges.forEach((edge) => {
        edge.oncontextmenu = removeEdge.bind(edge, edge);
        return false;
    });
}