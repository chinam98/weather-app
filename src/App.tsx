import OneDay from './OneDay'
import Layout from './Layout'
import Home from './Home';
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Search from './Search';
import './App.css';

import Next3Days from './Next3Days';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="OneDay" element={<OneDay />} />
            <Route path="Next3Days" element={<Next3Days />} />
            <Route path="Search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App;