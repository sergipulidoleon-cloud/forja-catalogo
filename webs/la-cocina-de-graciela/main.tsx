import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/shrikhand/400.css';
import '@fontsource-variable/work-sans/wght.css';
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
