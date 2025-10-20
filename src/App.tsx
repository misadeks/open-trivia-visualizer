import React from 'react';
import './App.css';

import {useCategoriesQuery, useQuestionsQuery} from './data/api/openTrivia';


function App() {
  const {data: categories} = useCategoriesQuery();
  const {data: questions} = useQuestionsQuery();

  return (
      <>
        <div className="App">
          {categories?.map(value => <p>{value.name}</p>)}
        </div>
        <div className="ques">
          {questions?.map(value => <p>{value.question}</p>)}
        </div>
      </>
  );
}

export default App;
