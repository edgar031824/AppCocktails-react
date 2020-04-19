import React from 'react';
import Header from './components/header';
import Search from './components/search';
import Results from './components/results';
import ResultProvider from './context/resultContext';
import './App.css';

function App() {
  return (
    <ResultProvider>
      <Header></Header>
      <Search></Search>
      <Results></Results>
    </ResultProvider>
  );
}

export default App;