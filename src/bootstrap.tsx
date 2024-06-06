import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './app/theme';
import { QueryProvider } from './app/providers';
import App from './app/App';
import './app/theme/style.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <QueryProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </QueryProvider>,
);
