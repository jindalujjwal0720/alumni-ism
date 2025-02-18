import Provider from './provider';
import Router from './router';
import WebPages from './pages';
import { useIsStandalone } from '@/hooks/useIsStandalone';
import { AppScreens } from './screens';
import { Show } from '@/components/show';

function App() {
  const isStandalone = useIsStandalone();

  return (
    <>
      <Provider>
        <Router>
          <Show when={isStandalone}>
            <AppScreens />
          </Show>
          <Show when={!isStandalone}>
            <WebPages />
          </Show>
        </Router>
      </Provider>
    </>
  );
}

export default App;
