import  { Router } from "express";
import addEdge from "./addEdge";
import addNode from "./addNode";
import debug from "./debug";
import deleteNode from "./removeNode";
import getGraph from "./getGraph";
import removeEdge from "./removeEdge";
import renameNode from "./renameNode";




const routes = (): Router => {
    const router = Router();

    router.get("//", getGraph);
    router.post("/addNode/:nodeName", addNode);
    router.delete("/node/:nodeId", deleteNode);
    router.post("/node/name/:nodeId/:nodeName", renameNode)
    router.post("/edge/:startEdge/:endEdge", addEdge);
    router.delete("/edge/:startEdge/:endEdge", removeEdge)

    router.get("/debug", debug);

    return router;
};

export default routes;