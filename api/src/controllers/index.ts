import  { Router } from "express";
import getGraph from "./getGraph";


const routes = (): Router => {
    const router = Router();

    router.get("//", getGraph);


    return router;
};

export default routes;