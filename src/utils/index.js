import { circlepack } from "graphology-layout"
import Graph from 'graphology';
import { assignLayout } from 'graphology-layout/utils';

export const dataToSerialNodes = (jsonData, nodeScale, edgeScale) => {

    const nodes = jsonData.nodes.map(d => {
        return {
            key: d.id,
            attributes: {
                key: d.id,
                label: d.name,
                id: d.id,
                cluster: d.category,
                x: d.x,
                y: d.y,
                size: nodeScale(d.symbolSize),
                value: d.value
            }
        }
    })

    const edges = jsonData.edges.map((d, index) => {
        return {
            key: "edges" + index,
            source: d.source,
            target: d.target,
            attributes: {
                size: edgeScale(d.size),
            },
        }
    })

    return {
        nodes,
        edges,
    }

}

export const circlePackLayoutData = (graphData,type) => {
    const graph = new Graph();
    graph.import(graphData);
    const positions = circlepack(graph, {
        hierarchyAttributes: [type]
    });
    assignLayout(graph, positions);
    return graph.export();
}