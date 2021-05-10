import { Request, Response } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { getSvg, loadGraphList, saveGraphList } from "../utils/global";


export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    (request: Request, response: Response) => {
        const graphId = request.params.graphId;
        const graphList = loadGraphList();
        const length = graphList.length;
        var graphInd = length;

        graphList.forEach((elem, indice) => {
            if (elem.id === graphId) {
                graphInd = indice;     
            }
        })

        if (graphInd < length - 1) {
            // Permut
            const tmp = graphList[graphInd];
            graphList[graphInd] = graphList[graphInd+1];
            graphList[graphInd + 1] = tmp;

            saveGraphList(graphList);
        }

        return response.status(201).json(graphList).end();
    }
];