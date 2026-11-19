import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/permanent-marker/400.css';
import '@fontsource-variable/archivo/wdth.css';
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
