export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Profile sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__name">Koteshwar Cheruku</h2>
        <p className="sidebar__role">AI Full Stack Developer</p>
      </div>

      <div className="sidebar__contact">
        <h3 className="sidebar__contact-title">Contact</h3>
        <div className="sidebar__contact-card">
          <p><b>Email:</b> koteshcheruku000@gmail.com</p>
          <p><b>Phone:</b> +91 6304038319</p>
          <p>
            <b>LinkedIn:{" "}</b>
            <a
              href="https://www.linkedin.com/in/kotesh-cheruku-149836326/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.linkedin.com/in/kotesh-cheruku-149836326/
            </a>
          </p>
          <p><b>GitHub:</b> <a href="https://github.com/koteshcheruku" target="_blank" rel="noreferrer">github.com/koteshcheruku</a></p>
        </div>
      </div>

      <div className="sidebar__footer">
        <p>© 2026 Koteshwar Cheruku</p>
      </div>
    </aside>
  );
}