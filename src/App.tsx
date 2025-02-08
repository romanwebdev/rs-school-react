import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { ThemeProvider } from './context';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <div className="main-wrap">
          <Header />
          <Main />
        </div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
