import React from 'react';
import './App.css';

import { useCategoriesQuery } from './data/api/openTrivia';


function App() {
  const {data: categories} = useCategoriesQuery();

  return (
    <div className="App">
      {categories?.map(value => <p>{value.name}</p>)}
    </div>
  );
}

export default App;
