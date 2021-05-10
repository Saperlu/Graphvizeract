import { Request, Response } from "express";
import { loadGraphList } from "../utils/global";

export default (request: Request, response: Response) => {
    const graphList =  loadGraphList();

    if (graphList) {
        return response.status(200).json(graphList).end();
    } else {
        return response.status(500).end();
    }

}