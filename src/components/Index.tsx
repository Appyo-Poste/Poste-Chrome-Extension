import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PosteLogo from '../assets/PosteName.png';
import { LoginForm } from './LoginForm';

interface IndexPageProps {
  setLoggedIn: (isLoggedIn: boolean) => void;
  setToken: (token: string) => void;
  error?: string;
  setError: (error?: string) => void;
}

const Index = ({ setLoggedIn, setToken, error, setError }: IndexPageProps) => {
  const navigate = useNavigate();

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
        height: '100vh',
        margin: 'auto',
      }}
    >
      <img
        src={PosteLogo}
        alt="Poste Logo"
        style={{
          marginBottom: '16px',
          width: '155px',
        }}
      />
      <h1
        style={{
          fontSize: '16px',
          lineHeight: '20px',
          color: '#000000',
          marginBottom: '60px',
        }}
      >
        Find, retrieve, and save. Simple as that.
      </h1>
      <LoginForm
        setLoggedIn={setLoggedIn}
        setToken={setToken}
        setError={setError}
        error={error}
      />
      <p>
        {`Don't have an account? `}
        <span
          onClick={handleCreateAccount}
          style={{ cursor: 'pointer', color: '#357497' }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Index;
