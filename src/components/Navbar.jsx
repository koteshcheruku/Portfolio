import { NavLink } from "react-router-dom";

export default function Navbar({ pages }) {
  return (
    <div className="top-nav">
      <div className="top-nav__bar" role="navigation" aria-label="Dashboard pages">
        {pages.map((p) => (
          <NavLink
            key={p.id}
            to={p.path}
            end={p.path === "/"}
            className={({ isActive }) => `nav-tab ${isActive ? "nav-tab--active" : ""}`}
          >
            {p.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}