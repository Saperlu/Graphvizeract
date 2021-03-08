import { Request, Response } from "express";
import { deleteAll } from "../utils/drive";



export default (request: Request, response: Response) => {
    const obj = deleteAll();
    return response.status(200).json(obj).end()
}