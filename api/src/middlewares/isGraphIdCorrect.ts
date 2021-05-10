import { Request, Response, NextFunction, request } from "express";
import { isGraphIdCorrect } from "../utils/global";

export default [
    (request: Request, response: Response, next: NextFunction) => {
        if (!isGraphIdCorrect(request.params.graphId)) {
            return response.status(400).json({"error": "Bad graphId"}).end();
        }
        return next();
    }
]