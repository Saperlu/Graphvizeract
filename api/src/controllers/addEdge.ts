import { Request, Response } from "express";
import { loadGraph, saveGraph } from "../utils/global";


export default (request: Request, response: Response) => {
    var graph = loadGraph();
    graph = graph.replace("//END edges", `\t${request.params.startEdge}->${request.params.endEdge};//edge\n//END edges`);
    
    console.log(graph);
    console.log(request.params.startEdge);
    console.log(request.params.endEdge);
    
    
    saveGraph(graph);
    response.status(201).end();
}