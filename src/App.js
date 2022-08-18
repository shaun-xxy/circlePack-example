
import { useData } from './utils/useData';
import { dataToSerialNodes, circlePackLayoutData } from './utils';
import { scaleSqrt, scaleLinear, extent } from 'd3';
import ReactECharts from 'echarts-for-react';

const nodeSize = (d) => d.symbolSize;
const edgeSize = (d) => d.size;

function App() {
  const dataset = useData();

  if (!dataset) {
    return <pre>loading...</pre>
  }


  const nodeScale = scaleSqrt().domain(extent(dataset.nodes, nodeSize)).range([3, 25]).nice().clamp(true);
  const edgeScale = scaleLinear().domain(extent(dataset.edges, edgeSize)).range([1, 20]).nice().clamp(true);

  const graphLayoutData = circlePackLayoutData(dataToSerialNodes(dataset, nodeScale, edgeScale),'cluster');

  const graphData = {
    nodes:graphLayoutData.nodes,
    edges:graphLayoutData.edges,
    categories:dataset.categories
  }
  const option = {
    tooltip: {},
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend: {
      data: graphData.categories.map(d=>d.name)
    },
    series: [
      {
        // name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: graphData.nodes.map(d => ({
          id:d.attributes.id,
          name: d.attributes.label,
          x: d.attributes.x,
          y: d.attributes.y,
          category: +d.attributes.cluster,
          value: +d.attributes.value,
          symbolSize: +d.attributes.size,
        })),
        links: graphData.edges.map(d => ({
          source: d.source,
          target: d.target,
          lineStyle: {
            width: d.attributes.size,
            curveness: 0.3,
            // opacity:0,
            // color: 'source',
          }
        })),
        categories: graphData.categories,
        roam: true,
        label: {
          show: false,
          position: 'right',
          formatter: '{b}',
        },
        labelLayout: {
          hideOverlap: true,
        },
      }
    ]
  };

  return (
      <ReactECharts option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: '100vh' }}
      />
  );
}

export default App;
