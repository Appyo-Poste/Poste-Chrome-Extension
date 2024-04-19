import React, { useContext, useState, useEffect } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { CreateUserForm } from './CreateUserForm';
import { CreatePostForm } from './CreatePostForm';
import { CreateFolderForm } from './CreateFolderForm';
import Index from './Index';
import SuccessPage from './SuccessPage';
import { AppContext } from './AppContext';

const App = () => {
  const { isLoggedIn, setIsLoggedIn, token, setToken } = useContext(AppContext);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <Router initialEntries={['/']}>
      <Routes>
        <Route
          path=""
          index
          element={
            <Index
              setLoggedIn={setIsLoggedIn}
              setToken={setToken}
              setError={setError}
              error={error}
            />
          }
        />
        <Route path="new-user" element={<CreateUserForm />} />
        <Route
          path="post"
          element={<CreatePostForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="folder" element={<CreateFolderForm />} />
        <Route path="success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
