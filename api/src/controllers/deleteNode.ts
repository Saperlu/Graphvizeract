import { Request, Response } from "express";
import { extractNodeSection, loadGraph, getNodeNumber, insertNodeSection, saveGraph, extractEdgeSection, insertEdgeSection } from "../utils/global";


export default (request: Request, response: Response) => {
    var graph = loadGraph();
    const nodeId = Number.parseInt(request.params.nodeId);
    
    // retirer noeud
    // const startLineToCut =  graph.search(`\t${nodeId} `);
    // const endLineToCut =  graph.slice(startLineToCut).search("\n") + startLineToCut + 1;
    // graph = graph.slice(0, startLineToCut) + graph.slice(endLineToCut);
    
    var regex = new RegExp(`\t${nodeId} .*\/\/node\n`, "g");
    graph = graph.replace(regex, "");
    
    var nodeSection = extractNodeSection(graph);
    const nodeNumber = getNodeNumber(nodeSection);
    for (let index = nodeId; index <= nodeNumber; index++) {
        regex = new RegExp(`\t${index + 1} `);
        nodeSection = nodeSection.replace(regex, `\t${index} `);
    }
    graph = insertNodeSection(nodeSection, graph);
    
    
    //retirer flèches 
    var edgeSection = extractEdgeSection(graph);
    regex = new RegExp(`\t${nodeId}->.*\n`, "g");
    edgeSection = edgeSection.replace(regex, "");
    regex = new RegExp(`\t.*->${nodeId}.*\n`, "g");
    edgeSection = edgeSection.replace(regex, "");
    
    for (let index = nodeId; index <= nodeNumber; index++) {
        regex = new RegExp(`${index+1}->`, "g");
        edgeSection = edgeSection.replace(regex,`${index}->`);
        regex = new RegExp(`->${index+1}`, "g");
        edgeSection = edgeSection.replace(regex,`->${index}`);
    }
    graph = insertEdgeSection(edgeSection, graph);
    
    //écrire
    saveGraph(graph);
    return response.status(202).end();
}