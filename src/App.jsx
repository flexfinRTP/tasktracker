import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { store } from './store/store';
import { ConnectedDashboard } from './components/Dashboard'
import { Provider } from 'react-redux';


const App = () => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        < ConnectedDashboard />
      </div>
      <div>
        {store.getState}
      </div>
    </div>
    </Provider>
)
export default App;