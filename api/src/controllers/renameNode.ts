import { Request, Response, text } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { renameDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";


export default [
    // Middlewares
    ...isGraphIdCorrect,
    text(),
    
    // Controler
    (request: Request, response: Response) => {
        const { nodeId, graphId } = request.params;
        const nodeName = request.body;
        var graph = loadGraph(graphId);
        

        const nodeLineRegex = new RegExp(`\t\"${nodeId}\" .*//node`);
        var nodeLineMatch = graph.match(nodeLineRegex);
        var nodeLine = "";
        if (nodeLineMatch) {
            nodeLine = nodeLineMatch[0];
        }

        const regex = new RegExp(`label=".*"`);
        nodeLine = nodeLine.replace(regex, `label="${nodeName}"`);

        graph = graph.replace(nodeLineRegex, nodeLine);
        
        saveGraph(graph, graphId);

        renameDoc(nodeId, nodeName);
        response.status(201).end();
    }
];