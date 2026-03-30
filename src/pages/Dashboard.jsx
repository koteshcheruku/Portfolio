import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const pages = useMemo(
    () => [
      { id: "about", path: "/", label: "About" },
      { id: "skills", path: "/skills", label: "Skills" },
      { id: "featured", path: "/projects", label: "Projects" },
      { id: "system", path: "/system", label: "System" },
      { id: "ai-ml", path: "/aiml", label: "AI & ML" },
      { id: "experience", path: "/experience", label: "Experience" },
    ],
    []
  );

  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = pages.findIndex(p => p.path === location.pathname);

  const handleNavigate = (path) => {
    navigate(path);
    const contentElement = document.querySelector('.content');
    if (contentElement) {
      contentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (currentIndex < pages.length - 1) {
      handleNavigate(pages[currentIndex + 1].path);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      handleNavigate(pages[currentIndex - 1].path);
    }
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Navbar pages={pages} />

        <div className="content">
          <Outlet />

          <div className="pagination">
            {currentIndex > 0 && (
              <button className="nav-btn" onClick={goToPrev}>← Previous Page</button>
            )}
            {currentIndex < pages.length - 1 && (
              <button className="nav-btn" onClick={goToNext}>Next Page →</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}