import { Request, Response } from "express";
import { parse, Graph, OutputCallback, graph } from "graphviz";



export default (request: Request, response: Response) => {
    
    console.log("Hello");
    // var graphDocContent = fs.readFileSync("ressources/graphs/graph.gv").toString();
    var svg: OutputCallback; 
    var gra: Graph;
    parse("ressources/graphs/graph.gv", (graph) => {
        graph.render("svg", (data) => {
            data = data.toString();
            data = data.slice(data.search("<svg"));
            const obj = { chaine: data };
            return response.status(200).json(obj).end();

        });
        console.log(graph.nodeCount());
        gra =  graph;
    }, (graph) => {
        console.log("Erreur parsing graph");
        return response.status(500).end();
    });

}