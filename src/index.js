import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
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
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Recent />} />
        <Route path="SearchResults" element={<SearchResults />} />
        <Route path="SingleMovie" element={<SingleMovie />} > 
          <Route path=":movieId" element={<SingleMovie />}/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
