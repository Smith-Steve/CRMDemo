import logo from './logo.svg';
import Sidebar from './components/sidebar';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Sidebar></Sidebar>
    </BrowserRouter>
  );
}

export default App;
