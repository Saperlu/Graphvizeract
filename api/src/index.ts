import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";


const app = express();
const PORT = 3000;

app.use(cors());

app.get('/' , (request: Request, response: Response) => {
    console.log("Hello");
    var svg = fs.readFileSync("ressources/graphs/x.svg").toString();
    var width = svg.slice()
    svg = svg.slice(svg.search("<svg"));


    const obj = { chaine: svg };

    response.status(200).json(obj).end();
    
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    
});
