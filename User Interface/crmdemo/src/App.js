import logo from './logo.svg';
import {Home} from './Components/Home';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='Application Container'>
        <h3 className='d-flex justify-content-center m-3'>
          React Front End
        </h3>
      </div>
    </BrowserRouter>
  );
}

export default App;
