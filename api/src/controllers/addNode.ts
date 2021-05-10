import { Request, Response } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import fs from "fs";
import { addDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";



export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    async (request: Request, response: Response) => {
        const { nodeName, graphId } = request.params;
        const nodeId = await addDoc(nodeName);

        var graph = loadGraph(graphId);    
        graph = graph.replace('//END nodes', `\t"${nodeId}" [label="${nodeName}",];//node\n//END nodes`)
        
        // Sauvegarder
        saveGraph(graph, graphId);
        return response.status(201).end();
        
    }
];