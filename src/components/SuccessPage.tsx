import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const handleCreate = useCallback(() => {
    navigate('post');
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <p>Post successfully created</p>
      <Button variant="outline" onClick={handleCreate}>
        Create Another Post
      </Button>
    </div>
  );
};

export default Index;
