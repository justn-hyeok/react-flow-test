// RoadmapNode.js
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// 상태에 따른 스타일 설정
const getStatusStyle = (status) => {
  switch (status) {
    case 'required':
      return {
        backgroundColor: '#ffe5e5',
        borderColor: '#ff4f56',
        color: '#cc2f35',
        gradientColor: 'rgba(255, 79, 86, 0.1)'
      };
    case 'recommended':
      return {
        backgroundColor: '#e5f3ff',
        borderColor: '#36a3ff',
        color: '#0077e6',
        gradientColor: 'rgba(54, 163, 255, 0.1)'
      };
    case 'optional':
      return {
        backgroundColor: '#e5f6f3',
        borderColor: '#25c2a0',
        color: '#1a8971',
        gradientColor: 'rgba(37, 194, 160, 0.1)'
      };
    default:
      return {
        backgroundColor: '#f5f5f5',
        borderColor: '#666',
        color: '#444',
        gradientColor: 'rgba(100, 100, 100, 0.1)'
      };
  }
};

const RoadmapNode = ({ data, selected }) => {
  const statusStyle = getStatusStyle(data.status);
  
  return (
    <div
      style={{
        background: `linear-gradient(to bottom right, ${statusStyle.backgroundColor}, white)`,
        border: `2px solid ${statusStyle.borderColor}`,
        borderRadius: '16px',
        padding: '20px',
        minWidth: '220px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 상태 배지 */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        fontSize: '11px',
        textTransform: 'uppercase',
        padding: '4px 8px',
        borderRadius: '12px',
        background: statusStyle.backgroundColor,
        color: statusStyle.color,
        fontWeight: '600',
        letterSpacing: '0.5px',
      }}>
        {data.status}
      </div>

      {/* 연결 핸들 */}
      <Handle 
        type="target" 
        position={Position.Top}
        style={{
          background: 'white',
          border: `2px solid ${statusStyle.borderColor}`,
          width: '10px',
          height: '10px'
        }}
      />
      
      {/* 제목 */}
      <div style={{ 
        fontWeight: '600', 
        fontSize: '18px', 
        marginBottom: '12px',
        color: '#1a1a1a',
        marginTop: '8px'
      }}>
        {data.label}
      </div>
      
      {/* 설명 */}
      {data.description && (
        <div style={{ 
          color: '#555', 
          marginBottom: '16px',
          fontSize: '13px',
          lineHeight: '1.5'
        }}>
          {data.description}
        </div>
      )}
      
      {/* 학습 항목 */}
      {data.items && data.items.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <ul style={{ 
            margin: 0,
            paddingLeft: '20px',
            color: '#666',
            fontSize: '13px',
            lineHeight: '1.6'
          }}>
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
        style={{
          background: 'white',
          border: `2px solid ${statusStyle.borderColor}`,
          width: '10px',
          height: '10px'
        }}
      />

      {/* 선택 효과 */}
      {selected && (
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          border: `2px solid ${statusStyle.borderColor}`,
          borderRadius: '16px',
          pointerEvents: 'none',
          zIndex: 1
        }} />
      )}
    </div>
  );
};

export default memo(RoadmapNode);