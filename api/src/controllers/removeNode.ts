import { Request, Response } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { removeDoc } from "../utils/drive";
import { loadGraph, saveGraph } from "../utils/global";


export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    (request: Request, response: Response) => {
        const { nodeId, graphId } = request.params;
        var graph = loadGraph(graphId);
        
        // retirer noeud
        var regex = new RegExp(`\t\"${nodeId}\" .*;\/\/node\n`, "g");
        graph = graph.replace(regex, "");
        
        //retirer flèches 
        regex = new RegExp(`\t\"${nodeId}\"->.*;\/\/edge\n`, "g");
        graph = graph.replace(regex, "");
        regex = new RegExp(`\t.*->\"${nodeId}\".*;\/\/edge\n`, "g");
        graph = graph.replace(regex, "");
        
        //écrire
        saveGraph(graph, graphId);

        // remove Google Doc
        removeDoc(nodeId);

        return response.status(202).end();
    }
];