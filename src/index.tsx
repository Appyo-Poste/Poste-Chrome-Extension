import React from 'react';
import { createRoot } from 'react-dom/client';
import { LoginForm } from './LoginForm';
import { CreatePostForm } from './CreatePostForm';
import { CreateFolderForm } from './CreateFolderForm';

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(<LoginForm />);
} else {
  console.error('Failed to find the root element');
}
