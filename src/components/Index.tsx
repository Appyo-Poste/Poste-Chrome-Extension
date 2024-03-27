import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import PosteLogo from '../assets/PosteLogo.svg';

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, []);

  const handleCreateAccount = useCallback(() => {
    navigate('new-user');
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
