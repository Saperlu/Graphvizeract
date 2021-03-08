import { Request, Response } from "express";
import { renameDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";


export default (request: Request, response: Response) => {
    const nodeId = request.params.nodeId;
    const nodeName = request.params.nodeName;
    
    var graph = loadGraph();


    const nodeLineRegex = new RegExp(`\t\"${nodeId}\" .*//node`);
    var nodeLineMatch = graph.match(nodeLineRegex);
    var nodeLine = "";
    if (nodeLineMatch) {
        nodeLine = nodeLineMatch[0];
    }

    const regex = new RegExp(`label=".*"`);
    nodeLine = nodeLine.replace(regex, `label="${nodeName}"`);

    graph = graph.replace(nodeLineRegex, nodeLine);
    
    saveGraph(graph);

    renameDoc(nodeId, nodeName);
    response.status(201).end();
}