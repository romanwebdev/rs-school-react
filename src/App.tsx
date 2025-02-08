import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { ThemeProvider } from './context';
import { IPerson } from './types/person.type';

function App() {
  const [data, setData] = useState<IPerson[]>([]);

  const handleSetData = useCallback((data: IPerson[]) => {
    setData(data);
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <div className="main-wrap">
          <Header />
          <Main data={data} setData={handleSetData} />
        </div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
