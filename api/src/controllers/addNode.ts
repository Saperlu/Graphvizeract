import { Request, Response } from "express";
import fs from "fs";
import { getGraph, getPathToGv } from "../utils/global";



export default (request: Request, response: Response) => {
    //Construire chaine
    const nodeName = request.params.nodeName;
    
    // console.log(nodeName);
    //Aller à //END nodes
    var graph = getGraph();
    const insertIndex = graph.search('//END nodes');
   
    // Insérer
    graph = graph.slice(0, insertIndex) + '\t"' + nodeName + '"\n' + graph.slice(insertIndex);
    
    // Sauvegarder
    fs.writeFileSync(getPathToGv(), graph);


    return response.status(201).end();
    
}