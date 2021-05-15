import  { Router } from "express";
import addEdge from "./addEdge";
import addNode from "./addNode";
import debug from "./debug";
import deleteNode from "./removeNode";
import getGraph from "./getGraph";
import removeEdge from "./removeEdge";
import renameNode from "./renameNode";
import getGraphList from "./getGraphList";
import addGraph from "./addGraph";
import removeGraph from "./removeGraph";
import renameGraph from "./renameGraph";
import moveGraphLeft from "./moveGraphLeft";
import moveGraphRight from "./moveGraphRight";
import changeColorNode from "./changeColorNode";




const graphRoutes = (): Router => {
    const router = Router();

    // Middlewares
    
    return router;
};

const routes = (): Router => {
    const router = Router();
    
    router.get("//", getGraphList);
    router.post("//", addGraph);

    
    
    router.get("/graph/:graphId", getGraph);
    router.post("/graph/:graphId/move/left", moveGraphLeft);
    router.post("/graph/:graphId/move/right", moveGraphRight);
    router.post("/graph/:graphId/rename", renameGraph);
    router.delete("/graph/:graphId", removeGraph);
    router.post("/graph/:graphId/addNode/:nodeName", addNode);
    router.delete("/graph/:graphId/node/:nodeId", deleteNode);
    router.post("/graph/:graphId/node/name/:nodeId", renameNode);
    router.post("/graph/:graphId/node/changeColor/:nodeId", changeColorNode);
    router.post("/graph/:graphId/edge/:startEdge/:endEdge", addEdge);
    router.delete("/graph/:graphId/edge/:startEdge/:endEdge", removeEdge)
    
    router.get("/debug", debug);


    return router;
}

export default routes;