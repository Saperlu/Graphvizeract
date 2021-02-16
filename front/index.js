var req = new XMLHttpRequest();
req.open("GET", "http://localhost:3000/");
req.send();
req.onreadystatechange = () => {
    if (req.readyState === 4) {
        const graphBox = document.getElementById("graphBox");
        if (graphBox.firstChild) graphBox.removeChild(graphBox.firstChild);
        const graph = document.createTextNode(JSON.parse(req.responseText).chaine);
        graphBox.appendChild(graph);
    }
}