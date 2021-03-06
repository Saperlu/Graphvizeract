import { Request, Response, text } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { renameDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";


export default [
    // Middlewares
    ...isGraphIdCorrect,
    
    // Controler
    (request: Request, response: Response) => {
        const { nodeId, graphId } = request.params;
        var graph = loadGraph(graphId);

        const nodeLineRegex = new RegExp(`\t\"${nodeId}\" .*//node`); 
        var nodeLineMatch = graph.match(nodeLineRegex); // Isolate nodeLine
        var nodeLine = "";
        if (nodeLineMatch) {
            nodeLine = nodeLineMatch[0];
        }

        var regex = new RegExp(`fillcolor="lightgreen"`);
        if (nodeLine.match(regex)) { // Make node purple
            nodeLine = nodeLine.replace(regex, 'fillcolor="#FEDCFA"');
        } else { // Make node lightgreen
            regex = new RegExp(`fillcolor="#FEDCFA"`);
            if (nodeLine.match(regex)) { // replace color
                nodeLine = nodeLine.replace(regex, 'fillcolor="lightgreen"');
            } else { // Put a new color tag
                nodeLine = nodeLine.replace("label=", 'fillcolor="lightgreen", label=');
            }
        }

        graph = graph.replace(nodeLineRegex, nodeLine);
        
        saveGraph(graph, graphId);
        response.status(201).end();
    }
];