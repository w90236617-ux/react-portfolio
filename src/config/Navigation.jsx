import { Routes, Route } from "react-router";

import Home from "../components/Home";
import About from "../components/About";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
import CV from "../components/CV";
import Contact from "../components/Contact";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/cv" element={<CV />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default Navigation;