import { Request, Response } from "express";
import isGraphIdCorrect from "../middlewares/isGraphIdCorrect";
import { getSvg } from "../utils/global";


export default [
    //Middlewares
    ...isGraphIdCorrect,

    // Controller
    (request: Request, response: Response) => {
        const svg = getSvg(request.params.graphId);

        if (svg) {
            return response.status(200).json({chaine : svg}).end();
        } else {
            return response.status(500).end();
        }
    }
];