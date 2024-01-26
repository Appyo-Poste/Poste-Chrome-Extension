import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { redirect } from 'react-router-dom';

const Index = () => {
  const handleLogin = useCallback(() => {
    redirect('/login');
  }, []);

  const handleCreateAccount = useCallback(() => {
    redirect('new-user');
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Button variant="outline" onClick={handleLogin}>
        Login
      </Button>
      <Button variant="outline" onClick={handleCreateAccount}>
        Create Account
      </Button>
    </div>
  );
};

export default Index;
