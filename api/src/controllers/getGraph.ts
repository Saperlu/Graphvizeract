import { Request, Response } from "express";
import { getSvg } from "../utils/global";


export default (request: Request, response: Response) => {
    console.log("Hello");
    const svg = getSvg();

    if (svg) {
        return response.status(200).json({chaine : svg}).end();
    } else {
        return response.status(500).end();
    }

}