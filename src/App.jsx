import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import Leistungspruefung from './pages/Leistungspruefung';
import Fahrzeugkunde from './pages/Fahrzeugkunde';
import Mta from './pages/Mta';

function App() {
  return (
    <Router>
      <div className="weininsel-wehr-app">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/leistungspruefung" element={<Leistungspruefung />} />
          <Route path="/mta" element={<Mta />} />
          <Route path="/fahrzeugkunde" element={<Fahrzeugkunde />} />
          <Route path="/zwischenpruefung" element={<Fahrzeugkunde />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
