import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Alert variant={timeLeft < 300 ? 'danger' : 'info'}>
      Time Left: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </Alert>
  );
}

export default Timer;