import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import middleware from './middleware';
import { CookiesProvider } from 'react-cookie';

const store = createStore(rootReducer, middleware)

ReactDOM.render(<Provider store={store}><CookiesProvider><App /></CookiesProvider></Provider>, document.getElementById('root'));
