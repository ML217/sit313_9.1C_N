import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import bodyParser from 'body-parser';

app.use(bodyParser.json());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);