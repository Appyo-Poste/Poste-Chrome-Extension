import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { redirect } from 'react-router-dom';
import PosteLogo from '../assets/PosteLogo.svg';

const Index = () => {
  const handleLogin = useCallback(() => {
    redirect('/login');
  }, []);

  const handleCreateAccount = useCallback(() => {
    redirect('new-user');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={PosteLogo}
        alt="Poste Logo"
        style={{ width: '75px', marginBottom: '16px' }}
      />
      <div style={{ display: 'flex' }}>
        <Button
          variant="outline"
          onClick={handleLogin}
          style={{ marginRight: '16px' }}
        >
          Login
        </Button>
        <Button variant="outline" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default Index;
