import { execSync } from "child_process";
import fs from "fs";
import { customAlphabet } from "nanoid";
import { GraphItem } from "../interfaces";

export const loadGraphList = (): GraphItem[] => {
    const graphList = JSON.parse(fs.readFileSync("ressources/graphList.json").toString());
    return graphList;
}

export const saveGraphList = (graphList: Object): void => {
    JSON.parse(fs.readFileSync("ressources/graphList.json").toString());
    fs.writeFileSync("ressources/graphList.json", JSON.stringify(graphList));
}

export const loadGraph = (graphId: string): string => {
    var graph = fs.readFileSync(getPathToGv(graphId)).toString();
    return graph;
}

export const saveGraph = (graph: string, graphId: string) => {
    fs.writeFileSync(getPathToGv(graphId), graph);
}

export const getSvg = (graphId: string): string => {
    const code = execSync(`dot -Tsvg -oressources/graphs/${graphId}.svg ressources/graphs/${graphId}.gv`);
    var svg = fs.readFileSync(`ressources/graphs/${graphId}.svg`).toString();
    svg = svg.slice(svg.search("<svg"));
    return svg;
}

export const getPathToGv = (graphId: string) => {
    return `ressources/graphs/${graphId}.gv`;
}

export const getPathToSvg = (graphId: string) => {
    return `ressources/graphs/${graphId}.svg`;
}

export const getPathToExample = () => {
    return `ressources/example.gv`;
}

export const createGraphId = ():string => {
    const nanoid = customAlphabet("azertyuiopqsdfghjklmwxcvbn0987654321", 10);
    return nanoid();
}

export const isGraphIdCorrect = (graphId: string):boolean => {
    if (graphId.match(/^[a-z0-9]{10}$/)) {
        return true;
    }
    return false;
}


// Maybe useless

// export const getStartNodeIndex = (graph: string) => {
//     return graph.search("//START nodes") + 14;
// }

// export const extractNodeSection = (graph: string): string => {
//     const nodeSection = graph.slice(
//         graph.search("//START nodes") + 14,
//         graph.search("//END nodes")            
//     )
//     return nodeSection;
// }

// export const insertNodeSection = (nodeSection: string, graph: string): string => {
//     const regex = new RegExp(`//START nodes(.|\n|\r)*//END nodes`)
//     graph = graph.replace(regex, "//START nodes\n" + nodeSection + "//END nodes");
//     return graph;
// }

// export const extractEdgeSection = (graph: string): string => {
//     const edgeSection = graph.slice(
//         graph.search("//START edges") + 14,
//         graph.search("//END edges")            
//     )
//     return edgeSection;
// }

// export const insertEdgeSection = (edgeSection: string, graph: string): string => {
//     const regex = new RegExp(`//START edges(.|\n|\r)*//END edges`)
//     graph = graph.replace(regex, "//START edges\n" + edgeSection + "//END edges");
//     return graph;
// }

// export const getNodeNumber = (nodeSection: string): number => {
//     var nodeNumber = nodeSection.match(/\n/g)?.length;
//     if (nodeNumber) {
//         return nodeNumber;
//     }
//     return 0;
// }


