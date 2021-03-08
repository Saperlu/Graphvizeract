import { Request, Response } from "express";
import { removeDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";


export default (request: Request, response: Response) => {
    var graph = loadGraph();
    const nodeId = request.params.nodeId;
    
    // retirer noeud
    var regex = new RegExp(`\t\"${nodeId}\" .*;\/\/node\n`, "g");
    graph = graph.replace(regex, "");
    
    //retirer flèches 
    regex = new RegExp(`\t\"${nodeId}\"->.*;\/\/edge\n`, "g");
    graph = graph.replace(regex, "");
    regex = new RegExp(`\t.*->\"${nodeId}\".*;\/\/edge\n`, "g");
    graph = graph.replace(regex, "");
    
    //écrire
    saveGraph(graph);

    // remove Google Doc
    removeDoc(nodeId);

    return response.status(202).end();
}