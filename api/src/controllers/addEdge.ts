import { Request, Response } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { loadGraph, saveGraph } from "../utils/global";


export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    (request: Request, response: Response) => {
        const { graphId } = request.params;
        var graph = loadGraph(graphId);
        graph = graph.replace("//END edges", `\t"${request.params.startEdge}"->"${request.params.endEdge}";//edge\n//END edges`);
        
        saveGraph(graph, graphId);
        response.status(201).end();
    }
];