import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./controllers";


const app = express();
const PORT = 3000;

app.use(cors());

app.use((request: Request, response: Response, next: NextFunction) => {
    console.log(request.originalUrl);
    return next();
})

app.use(routes());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    
});
