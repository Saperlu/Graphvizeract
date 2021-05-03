import { Request, Response, text } from "express";
import { renameDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";


export default [
    // Middlewares
    text(),
    
    // Controler
    (request: Request, response: Response) => {
        const nodeId = request.params.nodeId;
        const nodeName = request.body;
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
];