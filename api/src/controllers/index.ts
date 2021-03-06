import  { Router } from "express";
import addEdge from "./addEdge";
import addNode from "./addNode";
import debug from "./debug";
import deleteNode from "./deleteNode";
import getGraph from "./getGraph";
import removeEdge from "./removeEdge";




const routes = (): Router => {
    const router = Router();

    router.get("//", getGraph);
    router.post("/addNode/:nodeName", addNode);
    router.delete("/node/:nodeId", deleteNode);
    router.post("/edge/:startEdge/:endEdge", addEdge);
    router.delete("/edge/:startEdge/:endEdge", removeEdge)

    router.get("/debug", debug);

    return router;
};

export default routes;