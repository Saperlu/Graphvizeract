import { Request, Response, text } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import fs from "fs";
import { getPathToGv, loadGraphList, saveGraphList, getPathToSvg } from "../utils/global";

export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    (request: Request, response: Response) => {
        const { graphId } = request.params;

        fs.unlink(getPathToGv(graphId), undefined=>undefined);
        fs.unlink(getPathToSvg(graphId), undefined=>undefined);

        var graphList = loadGraphList();
        graphList = graphList.filter(elem => {
            if (elem.id === graphId) {
                return false;
            }
            return true;
        })
        saveGraphList(graphList);

        return response.status(202).json(graphList).end();
    }
];