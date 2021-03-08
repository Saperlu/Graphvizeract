import { Request, Response } from "express";
import fs from "fs";
import { addDoc, generateNewDocId } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";



export default async (request: Request, response: Response) => {
    const nodeName = request.params.nodeName;
    const nodeId = await addDoc(nodeName);

    var graph = loadGraph();    
    graph = graph.replace('//END nodes', `\t"${nodeId}" [label="${nodeName}",];//node\n//END nodes`)
    
    // Sauvegarder
    saveGraph(graph);
    return response.status(201).end();
    
}