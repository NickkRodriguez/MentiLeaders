import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LeaderBoard from './pages/Leaderboard';
import About from './pages/About';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { ParseExcel } from './components/ParseExcel';

function App() { 
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact element={<Home />} />
          <Route path='/leaderboard' exact element={<LeaderBoard />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/parse-excel' element={<ParseExcel />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;