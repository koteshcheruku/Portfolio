import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import SystemDesign from "./pages/SystemDesign";
import AimML from "./pages/AimML";
import Experience from "./pages/Experience";
import "./Style/base.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<About />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="system" element={<SystemDesign />} />
        <Route path="aiml" element={<AimML />} />
        <Route path="experience" element={<Experience />} />
      </Route>
    </Routes>
  );
}