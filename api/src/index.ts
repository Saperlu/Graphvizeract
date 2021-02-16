import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";


const app = express();
const PORT = 3000;

app.use(cors());

app.get('/' , (request: Request, response: Response) => {
    console.log("Hello");
    const svg = fs.readFileSync("ressources/graphs/x.svg").toString();
    svg.slice(svg.search("s"));
    console.log(svg);
    
    
    const obj = { chaine: svg };

    response.status(200).json(obj).end();
    
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    
});
