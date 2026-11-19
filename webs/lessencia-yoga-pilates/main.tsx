import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/spectral/300.css';
import '@fontsource/spectral/300-italic.css';
import '@fontsource/spectral/400-italic.css';
import '@fontsource-variable/jost/wght.css';
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
