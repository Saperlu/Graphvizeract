import { execSync } from "child_process";
import { Request, Response } from "express";
import fs from "fs";


// TODO
// export const getGraph = (): string => {
//     return 
//     graph;
// }

export const getSvg = (): string => {
    const code = execSync("dot -Tsvg -oressources/graphs/graph.svg ressources/graphs/graph.gv")
    var svg = fs.readFileSync("ressources/graphs/graph.svg").toString();
    svg = svg.slice(svg.search("<svg"));
    return svg;
}