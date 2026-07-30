import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from '@/App';
import DemoDay from '@/features/demo-day/components/DemoDay';
import '@/index.css';

// El proyecto no usa router: la presentación del Demo Day se monta por path,
// aislada del producto, que sigue viviendo en `/`.
const isDemoDayRoute =
  window.location.pathname.replace(/\/+$/, '') === '/demo-day';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isDemoDayRoute ? <DemoDay /> : <App />}</StrictMode>,
);
