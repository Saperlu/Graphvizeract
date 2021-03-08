import { Request, Response } from "express";
import { loadGraph, saveGraph } from "../utils/global";


export default (request: Request, response: Response) => {
    var graph = loadGraph();
    const startEdge = request.params.startEdge;
    const endEdge = request.params.endEdge;

    const regex = new RegExp(`\t\"${startEdge}\"->\"${endEdge}\".*;//edge\n`);
    graph = graph.replace(regex, "")
    
    saveGraph(graph);
    response.status(202).end();
}