import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AppContextProvider } from './components/AppContext';
import './output.css';

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {/* <BrowserRouter> */}
      {/* @TODO consider adding theme provider here as well */}
      <AppContextProvider>
        <App />
      </AppContextProvider>
      {/* </BrowserRouter> */}
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
