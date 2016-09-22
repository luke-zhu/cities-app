import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import CompaniesView from './CompaniesView.jsx';
import HobbiesView from './HobbiesView.jsx';
import InputForm from './InputForm.jsx';
import reducers from './redux/reducers.js';

// Our redux store
const store = createStore(reducers);

// App contains our title, and two components
// InputForm is where people input their info
// HobbiesView displays nearby places related to activites
const App = () => (
  <Provider store={store}>
    <div className="container">
      <h1>Cities App</h1>
      <InputForm />
      <CompaniesView />
    </div>
  </Provider>
);

export default App;

