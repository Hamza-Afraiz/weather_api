import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header, SearchBar,CurrentDay,OneInFiveDay} from './components'

function App() {
  return (
    <div className="App">
     <Header/>
     <SearchBar/>
     <CurrentDay/>
    
    </div>
  );
}

export default App;
