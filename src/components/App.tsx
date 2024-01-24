import React, { useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { CreateUserForm } from './CreateUserForm';
import { CreatePostForm } from './CreatePostForm';
import { CreateFolderForm } from './CreateFolderForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <Router initialEntries={['/login']}>
      <Routes>
        <Route
          path="login"
          element={
            <LoginForm
              setLoggedIn={setIsLoggedIn}
              setToken={setToken}
              setError={setError}
              error={error}
            />
          }
        />
        <Route path="new-user" element={<CreateUserForm />} />
        <Route path="post" element={<CreatePostForm />} />
        <Route path="folder" element={<CreateFolderForm />} />
      </Routes>
    </Router>
  );
};

export default App;
