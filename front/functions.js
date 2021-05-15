const API_URL = "http://dev-isi.utt.fr:3005";

//-------------------------------
// Graph

function getGraphList() {
    var req = new XMLHttpRequest();
    req.open("GET", API_URL);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
            const graphList = JSON.parse(req.response);
            updateGraphList(graphList);
        }
    }
}

function cleanGraphMenu() {
    graphMenu = document.getElementById("graphMenu");
    while (graphMenu.childElementCount > 1) {
        graphMenu.removeChild(graphMenu.firstChild);
    }
}

function getGraph() {
    var req = new XMLHttpRequest();
    req.open("GET", `${API_URL}/graph/${selectedGraph.id}/`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status == 200) {
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

function addGraph() {
    const graphId = prompt("Entrez le nouveau nom du graph sélectionné.", "Nouveau Graph");
    if (graphId) {
        var req = new XMLHttpRequest();
        req.open("POST", `${API_URL}`);
        req.setRequestHeader("Content-type", "text/plain");
        req.send(graphId);
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 201) {
                getGraphList();
            }
        }
    }
}

function deleteGraph(graphId) {
    if (confirm("Etes-vous sûr de vouoir supprimer l graph ?")) {   
        var req = new XMLHttpRequest();
        req.open("DELETE", `${API_URL}/graph/${graphId}`);
        req.send();
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 202) {
                getGraphList();
                var graphBox = document.getElementById('graphBox');
                while (graphBox.lastChild) {
                    graphBox.removeChild(graphBox.lastChild);
                }
            }
        }
    }
}

function renameGraph() {
    const graphName = prompt("Entrez le nouveau nom du graph sélectionné.", selectedGraph.label);
    if (graphName) {
        
        
        var req = new XMLHttpRequest();
        req.open("POST", `${API_URL}/graph/${selectedGraph.id}/rename`);
        req.setRequestHeader("Content-type", "text/plain");
        req.send(graphName);
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 201) {
                getGraphList();
                getGraph();
            }
        }
    }
}

function moveGraphLeft() {
    var req = new XMLHttpRequest();
    req.open("POST", `${API_URL}/graph/${selectedGraph.id}/move/left`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 201) {
            const graphList = JSON.parse(req.response);
            updateGraphList(graphList);
        }
    }
}

function moveGraphRight() {
    var req = new XMLHttpRequest();
    req.open("POST", `${API_URL}/graph/${selectedGraph.id}/move/right`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 201) {
            const graphList = JSON.parse(req.response);
            updateGraphList(graphList);
        }
    }
}

function selectGraph(div) {
    unselectGraph();
    div.className = "menuItem selected";
    selectedGraph = {
        id: div.id,
        label: div.textContent,
        prefix: div.textContent[0],
        div
    };
    console.log(selectedGraph);
    
}

function unselectGraph() {
    if (selectedGraph) {
        selectedGraph.div.className = "menuItem";
        selectedGraph = undefined;
    }
}

function setupGraph(div) {
    div.onclick = () => {
        selectGraph(div);
        getGraph();
    }
    div.oncontextmenu = () => {
        deleteGraph(div.id);
    }
}

function updateGraphList(graphList) {
    var graphMenu = document.getElementById("graphMenu");
    cleanGraphMenu();
    graphList.forEach(graphItem => {
        var div = document.createElement("div");
        if (selectedGraph && selectedGraph.id === graphItem.id) {
            div.className = "menuItem selected";
            selectedGraph.div = div;
        } else {
            div.className = "menuItem";
        }
        div.textContent = graphItem.label;
        div.id = graphItem.id;

        setupGraph(div);

        // Insert each element after the previous one but before the + button
        graphMenu.insertBefore(div, graphMenu.children[graphMenu.children.length - 1]);                
    }); 
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
    const linkToDoc = getGDocLink(node);
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

    req.open("POST", `${API_URL}/graph/${selectedGraph.id}/addNode/${nodeName}`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status == 201) {
            getGraph()
        }
    }
}

function removeNode(node) {  
    if (confirm("Etes-vous sûr de vouoir supprimer le noeud ?")) {   
        unselectNode();
        
        var req = new XMLHttpRequest();
        const nodeId = getNodeId(node);
        
        req.open("DELETE", `${API_URL}/graph/${selectedGraph.id}/node/${nodeId}`);
        req.send();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                getGraph()
            }
        }
    }
}

function renameNode() {
    const nodeName = prompt("Entrez le nouveau nom du noeud sélectionné.", getNodeName(selectedNode));
    if (nodeName) {
        
        const nodeId = getNodeId(selectedNode);
        
        var req = new XMLHttpRequest();
        req.open("POST", `${API_URL}/graph/${selectedGraph.id}/node/name/${nodeId}`);
        req.setRequestHeader("Content-type", "text/plain");
        req.send(nodeName);
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                getGraph();
            }
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
        req.open("POST", `${API_URL}/graph/${selectedGraph.id}/edge/${selectedNodeId}/${nodeId}`);
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
        req.open("DELETE", `${API_URL}/graph/${selectedGraph.id}/edge/${startEdge}/${endEdge}`);
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


// Others
function openGDoc() {
    window.open(getGDocLink(selectedNode), '_blank');
}

function getGDocLink(node) {
    return `https://docs.google.com/document/d/${getNodeId(node)}/edit?usp=sharing`;
}

function copyNodeFileName() {
    var chaine = "p" + selectedGraph.prefix + "n_" + formatNodeToFileName();
    prompt("Nom formaté : ", chaine);
}

const alphabet = [
    {
        "regex": new RegExp("é","g"),
        "betterSymbol": "e"
    },
    {
        "regex": new RegExp("è","g"),
        "betterSymbol": "e"
    },
    {
        "regex": new RegExp("à","g"),
        "betterSymbol": "a"
    },
    {
        "regex": new RegExp("ç","g"),
        "betterSymbol": "c"
    },
    {
        "regex": new RegExp("\\?","g"),
        "betterSymbol": ""
    },
    {
        "regex": new RegExp("\\.","g"),
        "betterSymbol": ""
    },
    {
        "regex": new RegExp("!","g"),
        "betterSymbol": ""
    },
    {
        "regex": new RegExp(" ","g"),
        "betterSymbol": "-"
    }
];
    

function formatNodeToFileName() {
    var chaine = getNodeName(selectedNode);
    chaine = chaine.toLowerCase();
    alphabet.forEach((elem) => {
        chaine = chaine.replace(elem.regex, elem.betterSymbol);
    });
    return chaine;
}