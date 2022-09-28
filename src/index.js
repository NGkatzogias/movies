import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
// import App from './App';
import Layout from './components/Layout';
import Recent from './components/Movies/Recent';
import SearchResults from './components/Movies/SearchResults';
import SingleMovie from './components/Movies/SingleMovie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Recent />} />
        <Route path="SearchResults" element={<SearchResults />} />
        <Route path="SingleMovie/:id" element={<SingleMovie />} /> 
      </Route>
    </Routes>
  </HashRouter>
);
