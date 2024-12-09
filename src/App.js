import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import './App.scss';
import ErrorBoundary from './containers/shared/ErrorBoundary/ErrorBoundary';
import AppRoutes from './routes/AppRoutes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />

        <main>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>

      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
library.add(fas, far, fab);
