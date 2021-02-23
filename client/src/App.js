import './App.css';
import { BrowserRouter as Routers } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages';

function App() {
  return (
    <DataProvider>
      <Routers>
        <div className='App'>
          <Header />
          <MainPages />
        </div>
      </Routers>
    </DataProvider>
  );
}

export default App;
