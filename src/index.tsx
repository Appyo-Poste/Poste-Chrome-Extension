import React from 'react';
import { createRoot } from 'react-dom/client';
import { LoginForm } from './components/LoginForm';
import { CreateUserForm } from './components/CreateUserForm';
import { CreatePostForm } from './components/CreatePostForm';
import { CreateFolderForm } from './components/CreateFolderForm';

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          width: '500px',
          border: '4px solid red',
          padding: '16px',
          margin: '8px',
        }}
      >
        <LoginForm />
      </div>
      <div
        style={{
          width: '500px',
          border: '4px solid red',
          padding: '16px',
          margin: '8px',
        }}
      >
        <CreateUserForm />
      </div>
      <div
        style={{
          width: '500px',
          border: '4px solid red',
          padding: '16px',
          margin: '8px',
        }}
      >
        <CreatePostForm />
      </div>
      <div
        style={{
          width: '500px',
          border: '4px solid red',
          padding: '16px',
          margin: '8px',
        }}
      >
        <CreateFolderForm />
      </div>
    </div>
  );
} else {
  console.error('Failed to find the root element');
}
