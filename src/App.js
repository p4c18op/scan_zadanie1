import logo from './logo.svg';
import './App.css';
import Header from "./components/header/header.js"
import LoginForm from './components/login/login.js';
import HistogramsForm from './components/Histograms/Histograms.js'
import Footer from './components/footer/footer.js'
import Main from './components/Main/main.js'
import SearchResult from './components/SearchResult/SearchResult.js';
import {observer} from 'mobx-react-lite'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Header/>
      <div className='grow-1'>
          <Routes>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/histogramform' element={<HistogramsForm/>}/>
          <Route path='/' element={<Main/>}/>
          <Route path='/searchres' element={<SearchResult/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default observer(App);