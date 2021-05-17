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

        var regex = new RegExp(`color="black"`);
        if (nodeLine.match(regex)) { // Make node contour white
            nodeLine = nodeLine.replace(regex, 'color="white"');
        } else { // Make node contour black
            regex = new RegExp(`color="white"`);
            if (nodeLine.match(regex)) { // replace color
                nodeLine = nodeLine.replace(regex, 'color="black"');
            } else { // Put a new color tag
                nodeLine = nodeLine.replace(",]", ', color="black",]');
            }
        }

        graph = graph.replace(nodeLineRegex, nodeLine);
        
        saveGraph(graph, graphId);
        response.status(201).end();
    }
];