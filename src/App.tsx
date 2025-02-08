import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import './App.css';
import Main from './components/Main';
import { IPerson } from './types/person.type';

function App() {
  const [data, setData] = useState<IPerson[]>([]);

  const handleSetData = useCallback((data: IPerson[]) => {
    setData(data);
  }, []);

  return (
    <div className="app">
      <Main data={data} setData={handleSetData} />
      <Outlet />
    </div>
  );
}

export default App;
