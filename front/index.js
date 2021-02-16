function makeNodesClickable() {
    nodes = Array.from(document.getElementsByClassName("node"));
    nodes.forEach((node) => {
        node.onclick = () => {
            const title = node.childNodes[1].textContent
            console.log(title);
        }

        
    });
}

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
        makeNodesClickable();
    }
}