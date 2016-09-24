import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import HobbiesView from 'Interests./HobbiesView.jsx';
import InputForm from './InputForm.jsx';
import OutputView from './OutputView.jsx';
import reducers from './redux/reducers.js';

// Our redux store
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// App contains our title, and two components
// InputForm is where people input their info
// HobbiesView displays nearby places related to activites
const App = () => (
  <Provider store={store}>
    <div>
      <InputForm />
      <OutputView />
    </div>
  </Provider>
);

export default App;

