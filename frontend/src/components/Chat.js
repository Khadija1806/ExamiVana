import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Form, Button, ListGroup } from 'react-bootstrap';

let socket; // Declare socket globally to avoid re-initialization

function Chat({ receiverId, examId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log('Chat component mounted. ReceiverId:', receiverId, 'ExamId:', examId);

    // Initialize socket only once
    if (!socket) {
      socket = io('http://localhost:5000', {
        transports: ['websocket', 'polling'],
        forceNew: true,
      });
    }

    socket.on('connect', () => {
      console.log('Socket connected!');
      setIsConnected(true);
      if (examId) {
        socket.emit('joinRoom', { examId, userId: localStorage.getItem('userId') });
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socket.on('receiveMessage', (data) => {
      console.log('Message received:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Don't disconnect here to allow reconnection
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('receiveMessage');
    };
  }, [examId, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && receiverId && examId) {
      const messageData = {
        senderId: localStorage.getItem('userId'),
        receiverId,
        message,
        examId,
        timestamp: new Date().toISOString(),
      };
      console.log('Sending message:', messageData);
      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    } else {
      console.error('Cannot send: Missing receiverId or examId');
    }
  };

  const connectManually = () => {
    console.log('Reconnect button clicked!');
    if (socket) {
      socket.connect();
    } else {
      console.error('Socket not initialized');
    }
  };

  return (
    <div className="chat-container">
    <h4>Chat with {receiverId ? 'Teacher' : 'Teacher'}</h4>
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
        <Button onClick={connectManually} size="sm" className="ms-2" disabled={false}>
          Reconnect
        </Button>
      </div>
      <div className="messages-list" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
              <strong>{msg.senderId === localStorage.getItem('userId') ? 'You' : 'Them'}:</strong> {msg.message}
              <small> ({new Date(msg.timestamp).toLocaleTimeString()})</small>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <Form onSubmit={sendMessage}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!isConnected}
          />
        </Form.Group>
        <Button type="submit" disabled={!isConnected || !message.trim()}>
          Send
        </Button>
      </Form>
    </div>
  );
}

export default Chat;