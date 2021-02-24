import { Request, Response } from "express";
import fs from "fs";
import { loadGraph, saveGraph } from "../utils/global";



export default (request: Request, response: Response) => {
    //Construire chaine
    const nodeName = request.params.nodeName;
    
    // console.log(nodeName);
    //Aller à //END nodes
    var graph = loadGraph();
    const insertIndex = graph.search('//END nodes');
   
    const startNodeIndex = graph.search("//START node");
    const endNodeIndex = graph.search("//END node");
    var nodeId: number|RegExpMatchArray|null;
    nodeId = graph.substring(startNodeIndex, endNodeIndex).match(/\n/g);
    if (nodeId)
         nodeId = nodeId.length;
    
    // Insérer
    graph = graph.slice(0, insertIndex) + `\t${nodeId} [label="${nodeName}",];//node\n` + graph.slice(insertIndex);
    
    // Sauvegarder
    saveGraph(graph);

    return response.status(201).end();
    
}