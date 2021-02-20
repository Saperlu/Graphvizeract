import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./controllers";


const app = express();
const PORT = 3000;

app.use(cors());

app.use(routes());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    
});
