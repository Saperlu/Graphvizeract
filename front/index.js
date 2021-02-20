var selectedNode;

function selectNode(node) {
    unselectNode();
    selectedNode = node;
    selectedNode.getElementsByTagName("ellipse")[0]
        .style.fill = "red";
}

function unselectNode() {
    if (selectedNode) {
        selectedNode.getElementsByTagName("ellipse")[0].
            style.fill = "#FEDCFA";
    }
}

function setupNodes() {
    nodes = Array.from(document.getElementsByClassName("node"));
    nodes.forEach((node) => {
        node.onclick = () => {
            selectNode(node);
            openNav(node);
        }

        node.oncontextmenu = () => {
            if (selectedNode && selectedNode != node) {
                nodeTitle = node.getElementsByTagName("title")[0].textContent;
                selectedNodeTitle = selectedNode.getElementsByTagName("title")[0].textContent;
                console.log(selectedNodeTitle + ' --> ' + nodeTitle);
            }
            return false;
        }
    });
}

function openNav(node) {
    const title = node.childNodes[1].textContent;
    const nav = document.getElementById("sidePane");
    nav.children[0].textContent = title;
    nav.style.width = "160px";
    document.getElementById("graphBox").style.marginRight = "160px";
    
}

function closeNav(node) {
    const nav = document.getElementById("sidePane");
    nav.style.width = "0"
    document.getElementById("graphBox").style.marginRight = "0px";
    unselectNode();
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
