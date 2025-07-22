import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs'; // Handles both list and detail via nested routing
import Tutorials from './pages/Tutorials'; // Handles both list and detail via nested routing
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs/*" element={<Blogs />} />
          <Route path="/tutorials/*" element={<Tutorials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        {location.pathname === '/' && <Footer />}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
