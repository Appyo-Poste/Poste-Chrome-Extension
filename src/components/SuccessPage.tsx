import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { redirect } from 'react-router-dom';

const Index = () => {
  const handleCreate = useCallback(() => {
    redirect('post');
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
