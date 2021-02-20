import  { Router } from "express";
import getGraph from "./getGraph";
import addNode from "./addNode";

const routes = (): Router => {
    const router = Router();

    router.get("//", getGraph);
    router.post("/addNode/:nodeName", addNode);

    return router;
};

export default routes;