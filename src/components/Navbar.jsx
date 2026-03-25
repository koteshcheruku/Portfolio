export default function Navbar({ pages, activeId, onNavigate }) {
  return (
    <div className="top-nav">
      <div className="top-nav__bar" role="navigation" aria-label="Dashboard pages">
        {pages.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onNavigate?.(p.id)}
            className={`nav-tab ${activeId === p.id ? "nav-tab--active" : ""}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}