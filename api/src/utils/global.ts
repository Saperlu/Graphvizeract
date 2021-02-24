import { execSync } from "child_process";
import { Request, Response } from "express";
import fs from "fs";


export const loadGraph = (): string => {
    var graph = fs.readFileSync("ressources/graphs/graph.gv").toString();
    return graph;
}

export const saveGraph = (graph: string) => {
    fs.writeFileSync(getPathToGv(), graph);
}

// Maybe useless
export const getStartNodeIndex = (graph: string) => {
    return graph.search("//START nodes") + 14;
}

export const extractNodeSection = (graph: string): string => {
    const nodeSection = graph.slice(
        graph.search("//START nodes") + 14,
        graph.search("//END nodes")            
    )
    return nodeSection;
}

export const insertNodeSection = (nodeSection: string, graph: string): string => {
    const regex = new RegExp(`//START nodes(.|\n|\r)*//END nodes`)
    graph = graph.replace(regex, "//START nodes\n" + nodeSection + "//END nodes");
    return graph;
}

export const extractEdgeSection = (graph: string): string => {
    const edgeSection = graph.slice(
        graph.search("//START edges") + 14,
        graph.search("//END edges")            
    )
    return edgeSection;
}

export const insertEdgeSection = (edgeSection: string, graph: string): string => {
    const regex = new RegExp(`//START edges(.|\n|\r)*//END edges`)
    graph = graph.replace(regex, "//START edges\n" + edgeSection + "//END edges");
    return graph;
}

export const getNodeNumber = (nodeSection: string): number => {
    var nodeNumber = nodeSection.match(/\n/g)?.length;
    if (nodeNumber) {
        return nodeNumber;
    }
    return 0;
}


export const getSvg = (): string => {
    const code = execSync("dot -Tsvg -oressources/graphs/graph.svg ressources/graphs/graph.gv")
    var svg = fs.readFileSync("ressources/graphs/graph.svg").toString();
    svg = svg.slice(svg.search("<svg"));
    return svg;
}

export const getPathToGv = () => {
    return "ressources/graphs/graph.gv";
}