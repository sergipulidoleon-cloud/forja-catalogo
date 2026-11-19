import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/gabarito/wght.css';
import '@fontsource-variable/figtree/wght.css';
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
