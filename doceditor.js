// DocumentEditor.js

import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const DocumentEditor = ({ docId }) => {
  const [content, setContent] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      socket.send(JSON.stringify({ type: 'join', docId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'document' && data.id === docId) {
        setContent(data.content);
      }
    };

    setWs(socket);

    return () => {
      if (socket) {
        socket.close();
        console.log('Disconnected from WebSocket server');
      }
    };
  }, [docId]);

  const handleEdit = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'edit', docId, content: newContent }));
    }
  };

  return (
    <textarea value={content} onChange={handleEdit} />
  );
};

export default DocumentEditor;
