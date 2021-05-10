import { execSync } from "child_process";
import { Request, Response, text } from "express";
import fs from "fs";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { getPathToGv, loadGraphList, getPathToExample, createGraphId, saveGraphList } from "../utils/global";

export default [
    // Middlewares
    ...isGraphIdCorrect,
    text(),
    
    // Controller
    async (request: Request, response: Response) => {
        const { graphId } = request.params;
        const graphLabel = request.body

        var graphList = loadGraphList();
        graphList = graphList.map((item) => {
            if (item.id === graphId) {
                item.label = graphLabel;
            }
            return item;
        })
        saveGraphList(graphList);

        return response.status(201).json(graphList).end();
    }
];