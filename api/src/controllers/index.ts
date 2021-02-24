import  { Router } from "express";
import addNode from "./addNode";
import deleteNode from "./deleteNode";
import getGraph from "./getGraph";


const routes = (): Router => {
    const router = Router();

    router.get("//", getGraph);
    router.post("/addNode/:nodeName", addNode);
    router.delete("/node/:nodeId", deleteNode);

    return router;
};

export default routes;