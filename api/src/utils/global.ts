import { Request, Response } from "express";
import { parse, Graph, OutputCallback, graph } from "graphviz";


export const getGraph = ():string => {

    var gra: Graph;
    return "aaa";
}

export const getSvgFromGraph = (graph: Graph):string | undefined => {
    var retour: string | undefined;
    graph.render("svg", (data) => {
        data = data.toString();
        data = data.slice(data.search("<svg"));
        retour = data
        return data;
    }, () => {
        console.log("CA MARCHE PAS");
        retour = undefined;
        return undefined;
    });

    return retour;


}