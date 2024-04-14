import React, { useContext, useState, useEffect } from 'react';
import {
  Route,
  MemoryRouter as Router,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { CreateUserForm } from './CreateUserForm';
import { CreatePostForm } from './CreatePostForm';
import { CreateFolderForm } from './CreateFolderForm';
import Index from './Index';
import SuccessPage from './SuccessPage';
import { AppContext } from './AppContext';

const App = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, token, setToken } = useContext(AppContext);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.storage.local.get(['poste'], (result) => {
      if (result && result.poste) {
        setToken(result.poste);
        setIsLoggedIn(true);
        navigate('/post');
      }
    });
  });

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
        <Route path="post" element={<CreatePostForm />} />
        <Route path="folder" element={<CreateFolderForm />} />
        <Route path="success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
