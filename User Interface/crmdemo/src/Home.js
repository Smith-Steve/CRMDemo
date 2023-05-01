import logo from './logo.svg';
import Header from './components/header'
import Sidebar from './components/sidebar';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Sidebar></Sidebar>
    </BrowserRouter>
  );
}

export default App;
