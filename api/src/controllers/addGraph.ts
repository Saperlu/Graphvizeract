import { execSync } from "child_process";
import { Request, Response, text } from "express";
import fs from "fs";
import { getPathToGv, loadGraphList, getPathToExample, createGraphId, saveGraphList } from "../utils/global";

export default [
    // Middlewares
    text(),
    
    // Controller
    async (request: Request, response: Response) => {
        const graphLabel = request.body
        const graphId = createGraphId();

        const path = getPathToGv(graphId);
        const pathToExample = getPathToExample();

        fs.readFile(pathToExample, undefined, (err, data) => {
            if(err) {
                console.log(err);
                return;
            } else {
                fs.writeFile(path, data, null, (err) => {
                    if(err) {
                        console.log(err);
                    }
                });

            }
        })

        const graphList = loadGraphList();
        graphList.push({
            "id": graphId,
            "label": graphLabel
        });
        saveGraphList(graphList);

        return response.status(201).json(graphList).end();
    }
];