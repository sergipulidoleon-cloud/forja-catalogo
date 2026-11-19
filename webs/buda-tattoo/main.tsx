import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/shippori-mincho/latin-500.css';
import '@fontsource/shippori-mincho/latin-700.css';
import '@fontsource/zen-kaku-gothic-new/latin-400.css';
import '@fontsource/zen-kaku-gothic-new/latin-700.css';
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
