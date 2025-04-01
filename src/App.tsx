import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import './App.css';
import Routing from './components/Routing';
import { ThemeProvider } from './context';
import { store } from './store';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Routing />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
