// RoadmapNode.js
import React, { memo, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

// 상태별 스타일 설정
const STATUS_STYLES = {
  required: {
    backgroundColor: '#ffe5e5',
    borderColor: '#ff4f56',
    color: '#cc2f35',
  },
  recommended: {
    backgroundColor: '#e5f3ff',
    borderColor: '#36a3ff',
    color: '#0077e6',
  },
  optional: {
    backgroundColor: '#e5f6f3',
    borderColor: '#25c2a0',
    color: '#1a8971',
  },
  default: {
    backgroundColor: '#f5f5f5',
    borderColor: '#666',
    color: '#444',
  }
};

// 공통 스타일 상수
const STYLES = {
  node: {
    borderRadius: '16px',
    padding: '20px',
    minWidth: '220px',
    position: 'relative',
    overflow: 'hidden'
  },
  badge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    fontSize: '11px',
    textTransform: 'uppercase',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  handle: {
    width: '10px',
    height: '10px',
    background: 'white',
  },
  title: {
    fontWeight: '600',
    fontSize: '18px',
    marginBottom: '12px',
    color: '#1a1a1a',
    marginTop: '8px'
  },
  description: {
    color: '#555',
    marginBottom: '16px',
    fontSize: '13px',
    lineHeight: '1.5'
  },
  itemsContainer: {
    background: 'white',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  itemsList: {
    margin: 0,
    paddingLeft: '20px',
    color: '#666',
    fontSize: '13px',
    lineHeight: '1.6'
  },
  selectionBorder: {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    pointerEvents: 'none',
    zIndex: 1
  }
};

const RoadmapNode = memo(({ data, selected }) => {
  // 상태 스타일 계산
  const statusStyle = useMemo(() => 
    STATUS_STYLES[data.status] || STATUS_STYLES.default,
  [data.status]);

  // 핸들 스타일
  const handleStyle = useMemo(() => ({
    ...STYLES.handle,
    border: `2px solid ${statusStyle.borderColor}`
  }), [statusStyle.borderColor]);

  // 노드 스타일
  const nodeStyle = useMemo(() => ({
    ...STYLES.node,
    background: `linear-gradient(to bottom right, ${statusStyle.backgroundColor}, white)`,
    border: `2px solid ${statusStyle.borderColor}`
  }), [statusStyle]);

  return (
    <div style={nodeStyle}>
      {/* 상태 배지 */}
      <div style={{
        ...STYLES.badge,
        background: statusStyle.backgroundColor,
        color: statusStyle.color
      }}>
        {data.status}
      </div>

      {/* 연결 핸들 */}
      <Handle 
        type="target" 
        position={Position.Top}
        style={handleStyle}
      />
      
      {/* 제목 */}
      <div style={STYLES.title}>
        {data.label}
      </div>
      
      {/* 설명 */}
      {data.description && (
        <div style={STYLES.description}>
          {data.description}
        </div>
      )}
      
      {/* 학습 항목 */}
      {data.items?.length > 0 && (
        <div style={STYLES.itemsContainer}>
          <ul style={STYLES.itemsList}>
            {data.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 하단 연결 핸들 */}
      <Handle 
        type="source" 
        position={Position.Bottom}
        style={handleStyle}
      />

      {/* 선택 효과 */}
      {selected && (
        <div style={{
          ...STYLES.selectionBorder,
          border: `2px solid ${statusStyle.borderColor}`,
          borderRadius: STYLES.node.borderRadius
        }} />
      )}
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

export default RoadmapNode;