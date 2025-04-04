import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Home from "/src/pages/Home";
import About from "/src/pages/About";
import Features from "/src/pages/Features";
import Team from "/src/pages/Team";
import Playground from "/src/pages/Playground";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/team" element={<Team />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
}
