import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/saira-stencil-one/400.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '../_kit/kit.css';
import './styles.css';
import App from './App';
import { LangProvider } from './content';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
