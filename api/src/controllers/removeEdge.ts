import { Request, Response } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { loadGraph, saveGraph } from "../utils/global";

export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    (request: Request, response: Response) => {
        const { startEdge, endEdge, graphId } = request.params;
        var graph = loadGraph(graphId);

        const regex = new RegExp(`\t\"${startEdge}\"->\"${endEdge}\".*;//edge\n`);
        graph = graph.replace(regex, "")
        
        saveGraph(graph, graphId);
        response.status(202).end();
    }
];