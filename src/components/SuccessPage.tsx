import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const handleCreate = useCallback(() => {
    navigate('/post');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1 style={{ fontSize: '18px', lineHeight: '22px', marginBottom: '8px' }}>
        Post Successfully Created
      </h1>
      <Button
        variant="outline"
        style={{
          width: '170px',
          background: '#84D6EF',
          color: '#000000',
          borderRadius: '15px',
        }}
        onClick={handleCreate}
      >
        Create Another Post
      </Button>
    </div>
  );
};

export default Index;
