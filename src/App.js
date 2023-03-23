import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExchangeRate from './pages/ExchangeRate';
import Bond from './pages/Bond';
import NavbarElement from './components/NavbarElement';
import CyclicIndex from './pages/CyclicIndex';
import InterestRate from './pages/InterestRate';

function App() {
  return (
    <Router>
      <NavbarElement />
      <Routes>
        <Route path = "/" element={<CyclicIndex />} />
        <Route path = "/CyclicIndex" element={<CyclicIndex />} />
        <Route path = "/InterestRate" element={<InterestRate />} />
        <Route path = "/ExchangeRate" element={<ExchangeRate />} />
        <Route path = "/Bond" element={<Bond />} />
      </Routes>
    </Router>
  );
}

export default App;
