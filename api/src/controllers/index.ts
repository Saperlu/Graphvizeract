import  { Router } from "express";
import addNode from "./addNode";
import getGraph from "./getGraph";


const routes = (): Router => {
    const router = Router();

    router.get("//", getGraph);
    router.post("/addNode/:nodeName", addNode);


    return router;
};

export default routes;