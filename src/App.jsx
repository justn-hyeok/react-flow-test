// App.js
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 커스텀 노드 컴포넌트
import RoadmapNode from './RoadmapNode';

// 노드 타입 정의
const nodeTypes = {
  roadmap: RoadmapNode,
};

// 초기 노드 데이터
const initialNodes = [
  {
    id: '1',
    type: 'roadmap',
    position: { x: 250, y: 0 },
    data: { 
      label: '인터넷', 
      description: '인터넷의 작동 방식',
      items: ['HTTP', 'DNS', 'Browsers', 'Hosting'],
      status: 'recommended',
    },
  },
  {
    id: '2',
    type: 'roadmap',
    position: { x: 100, y: 150 },
    data: { 
      label: 'HTML', 
      description: '웹의 기초',
      items: ['Semantic HTML', 'Forms', 'Conventions'],
      status: 'required',
    },
  },
  {
    id: '3',
    type: 'roadmap',
    position: { x: 400, y: 150 },
    data: { 
      label: 'CSS', 
      description: '스타일링',
      items: ['Selectors', 'Positioning', 'Box Model', 'Flexbox'],
      status: 'required',
    },
  },
  {
    id: '4',
    type: 'roadmap',
    position: { x: 250, y: 300 },
    data: { 
      label: 'JavaScript', 
      description: '프로그래밍 언어',
      items: ['Syntax', 'DOM', 'Fetch API', 'ES6+'],
      status: 'required',
    },
  },
  {
    id: '5',
    type: 'roadmap',
    position: { x: 250, y: 450 },
    data: { 
      label: 'React', 
      description: 'UI 라이브러리',
      items: ['Components', 'JSX', 'State', 'Hooks'],
      status: 'recommended',
    },
  },
  {
    id: '6',
    type: 'roadmap',
    position: { x: 100, y: 600 },
    data: { 
      label: 'Next.js', 
      description: 'React 프레임워크',
      items: ['SSR', 'Routing', 'API Routes'],
      status: 'optional',
    },
  },
  {
    id: '7',
    type: 'roadmap',
    position: { x: 400, y: 600 },
    data: { 
      label: 'TypeScript', 
      description: '타입 시스템',
      items: ['Types', 'Interfaces', 'Generics'],
      status: 'optional',
    },
  },
];

// 초기 엣지 데이터
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e5-7', source: '5', target: '7' },
];

function RoadmapFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [memo, setMemo] = useState({});

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const handleMemoChange = (nodeId, value) => {
    setMemo(prev => ({
      ...prev,
      [nodeId]: value
    }));
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div style={{ flex: '1', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap nodeStrokeColor="#aaa" nodeColor="#fff" nodeBorderRadius={8} />
          <Background variant="dots" gap={24} size={1} />
        </ReactFlow>
      </div>

      {selectedNode && (
        <div className="memo-panel">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '20px',
            gap: '12px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: selectedNode.data.status === 'required' ? '#ff4f56' :
                         selectedNode.data.status === 'recommended' ? '#36a3ff' : '#25c2a0'
            }} />
            <h3 style={{ 
              margin: 0,
              color: '#1a1a1a',
              fontSize: '20px',
              fontWeight: '600'
            }}>
              {selectedNode.data.label}
            </h3>
          </div>

          <div style={{
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <p style={{ 
              margin: '0 0 12px 0',
              color: '#666',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {selectedNode.data.description}
            </p>
            <div style={{ 
              fontSize: '12px',
              textTransform: 'uppercase',
              color: selectedNode.data.status === 'required' ? '#ff4f56' :
                     selectedNode.data.status === 'recommended' ? '#36a3ff' : '#25c2a0',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              {selectedNode.data.status}
            </div>
          </div>

          <h4 style={{ 
            margin: '0 0 12px 0',
            color: '#1a1a1a',
            fontSize: '16px'
          }}>
            학습 메모
          </h4>
          <textarea
            value={memo[selectedNode.id] || ''}
            onChange={(e) => handleMemoChange(selectedNode.id, e.target.value)}
            placeholder="학습 내용을 메모해보세요..."
          />

          <div style={{ 
            marginTop: '24px',
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '12px'
          }}>
            <h4 style={{ 
              margin: '0 0 12px 0',
              color: '#1a1a1a',
              fontSize: '16px'
            }}>
              학습 항목
            </h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '20px',
              color: '#666',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {selectedNode.data.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoadmapFlow;