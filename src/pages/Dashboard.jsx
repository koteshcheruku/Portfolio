import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const pages = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "featured", label: "Projects" },
      { id: "system", label: "System" },
      { id: "experience", label: "Experience" },
    ],
    []
  );

  const contentRef = useRef(null);
  const pageTopsRef = useRef([]);
  const lockRef = useRef(false);
  const lockTimeoutRef = useRef(null);

  const [activeId, setActiveId] = useState(pages[0].id);
  const activeIndexRef = useRef(0);

  const recalcPageTops = useCallback(() => {
    pageTopsRef.current = pages.map((p) => {
      const el = document.getElementById(p.id);
      return el ? el.offsetTop : 0;
    });
  }, [pages]);

  const syncActiveFromScroll = useCallback(() => {
    const content = contentRef.current;
    const tops = pageTopsRef.current;
    if (!content || !tops.length) return;

    const y = content.scrollTop;
    // "Which section am I in?" based on scrollTop boundaries.
    // This avoids flipping tabs in the middle of long pages.
    let currentIndex = 0;
    for (let i = 0; i < tops.length; i++) {
      if (y >= tops[i] - 2) currentIndex = i;
    }

    if (currentIndex !== activeIndexRef.current) {
      activeIndexRef.current = currentIndex;
      setActiveId(pages[currentIndex]?.id ?? pages[0].id);
    }
  }, [pages]);

  const goToIndex = useCallback(
    (nextIndex, { behavior = "smooth" } = {}) => {
      const content = contentRef.current;
      const tops = pageTopsRef.current;
      if (!content || !tops.length) return;

      const clamped = Math.max(0, Math.min(pages.length - 1, nextIndex));

      activeIndexRef.current = clamped;
      setActiveId(pages[clamped]?.id ?? pages[0].id);

      lockRef.current = true;
      window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = window.setTimeout(() => {
        lockRef.current = false;
      }, 850);

      content.scrollTo({
        top: tops[clamped] ?? 0,
        behavior,
      });
    },
    [pages]
  );

  // Recalculate page positions and keep active tab in sync with manual scrolling.
  useEffect(() => {
    recalcPageTops();

    const handleResize = () => recalcPageTops();
    window.addEventListener("resize", handleResize);

    const content = contentRef.current;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        syncActiveFromScroll();
      });
    };

    content?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (content) content.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [recalcPageTops, syncActiveFromScroll]);

  // Wheel + arrow keys: go to next/prev "page" (full section).
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (lockRef.current) return;

      const idx = activeIndexRef.current;
      const tops = pageTopsRef.current;
      if (!tops.length) return;

      const threshold = 40; // px before/after a page boundary
      const currentTop = tops[idx] ?? 0;
      const currentBottom =
        idx < pages.length - 1
          ? tops[idx + 1] ?? content.scrollHeight
          : content.scrollHeight - content.clientHeight;

      const dir = e.deltaY > 0 ? 1 : -1;

      // Only page when you're at the boundary; otherwise allow native scrolling
      // so long "Projects" content can be explored.
      if (dir > 0) {
        if (content.scrollTop < currentBottom - threshold) return;
        e.preventDefault();
        goToIndex(idx + 1);
      } else {
        if (content.scrollTop > currentTop + threshold) return;
        e.preventDefault();
        goToIndex(idx - 1);
      }
    };

    content.addEventListener("wheel", onWheel, { passive: false });

    const onKeyDown = (e) => {
      if (
        e.key !== "ArrowDown" &&
        e.key !== "ArrowUp" &&
        e.key !== "PageDown" &&
        e.key !== "PageUp"
      ) {
        return;
      }

      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (lockRef.current) return;

      const idx = activeIndexRef.current;
      const tops = pageTopsRef.current;
      if (!tops.length) return;

      const threshold = 10;
      const currentTop = tops[idx] ?? 0;
      const currentBottom =
        idx < pages.length - 1
          ? tops[idx + 1] ?? content.scrollHeight
          : content.scrollHeight - content.clientHeight;

      const dir =
        e.key === "ArrowDown" || e.key === "PageDown" ? 1 : -1;

      if (dir > 0) {
        if (content.scrollTop < currentBottom - threshold) return;
        e.preventDefault();
        goToIndex(idx + 1);
      } else {
        if (content.scrollTop > currentTop + threshold) return;
        e.preventDefault();
        goToIndex(idx - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      content.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goToIndex, pages]);

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Navbar
          pages={pages}
          activeId={activeId}
          onNavigate={(id) => {
            const idx = pages.findIndex((p) => p.id === id);
            if (idx >= 0) goToIndex(idx);
          }}
        />

        <div className="content" ref={contentRef}>

          <section id="about" className="section">
            <h2 className="text-2xl mb-4">About Me</h2>
            <div className="card">
              <p>
                I am a Full Stack Developer specializing in building scalable and secure web applications using modern technologies like React.js and Spring Boot. I have hands-on experience in developing REST APIs, implementing JWT-based authentication, and designing role-based access control systems.
                Currently, I am working on an enterprise-level CRM system that focuses on client management, real-time communication, and modular architecture. My approach emphasizes clean code, system design, and performance optimization.
                I am passionate about solving real-world problems and continuously improving my skills in backend engineering, system architecture, and cloud technologies.
              </p>
            </div>
          </section>

          <section id="skills" className="section">
            <h2 className="text-2xl mb-4">Skills</h2>
            <div className="card">
              <table>
                <thead>
                  <tr>
                    <th>Backend</th>
                    <th>Frontend</th>
                    <th>Systems & Tools</th>
                    <th>Data & AI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Java, Spring Boot, Spring Security</td>
                    <td>React.js</td>
                    <td>Git, Linux, AWS</td>
                    <td>Python, TensorFlow</td>
                  </tr>
                  <tr>
                    <td>JWT Authentication</td>
                    <td>Component architecture</td>
                    <td>WebSockets</td>
                    <td>Data Analysis</td>
                  </tr>
                  <tr>
                    <td>REST APIs, JPA/Hibernate</td>
                    <td>State management</td>
                    <td>API Design</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="featured" className="section">
            <h2 className="text-2xl mb-6">Projects</h2>
            <div className="card mb-6">

              <h1>Featured Project: CRM System</h1>
                <h2>Project Overview</h2>
                <p>The Enterprise CRM System is a scalable, full-stack web application designed to streamline client management, track interactions, and improve organizational workflow efficiency. The system focuses on secure data handling, modular architecture, and real-time communication, inspired by enterprise-level platforms like Salesforce.</p>
                <h2>Problem Statement</h2>
                <p>Organizations often struggle with managing client data, tracking communication, and maintaining visibility across teams. Existing solutions are either too complex or lack customization for specific business workflows.</p>
                <h2>Solution</h2>
                <p>Developed a customizable CRM platform that centralizes client data, enables real-time communication, and enforces role-based access control to ensure secure and structured data flow across different user roles.</p>
                <h2>Key Features</h2>
                <ul>
                    <li>
                        <h3>Secure Authentication & Authorization</h3>
                        <p>Implemented JWT-based authentication with Spring Security to ensure secure API access.</p>
                    </li>
                    <li>
                        <h3>Role-Based Access Control (RBAC)</h3>
                        <p>Defined roles such as Admin, Manager, and User with controlled permissions and protected routes.</p>
                    </li>
                    <li>
                        <h3>Lead & Client Management</h3>
                        <p>Designed modules to handle client data, track leads, and manage business interactions.</p>
                    </li>
                    <li>
                        <h3>Real-Time Communication</h3>
                        <p>Integrated WebSocket-based chat system for instant messaging and live updates.</p>
                    </li>
                    <li>
                        <h3>Dynamic Dashboard</h3>
                        <p>Built responsive dashboards with role-specific data visibility and analytics.</p>
                    </li>
                    <li>
                        <h3>Modular Architecture</h3>
                        <p>Structured backend services for scalability and future microservices integration.</p>
                    </li>
                </ul>
                <h2>Tech Stack</h2>
                <ul>
                    <li><b>Frontend:</b> React.js (Component-based architecture, state management)</li>
                    <li><b>Backend:</b> Java, Spring Boot, Spring Security</li>
                    <li><b>Database:</b> MySQL with JPA/Hibernate</li>
                    <li><b>Authentication:</b> JWT (JSON Web Token)</li>
                    <li><b>Real-Time:</b> WebSockets (STOMP protocol)</li>
                </ul>
            </div>
            <h2>Other Projects</h2>
            <div className="card">    
                <h2>Face Recognition using Gaussian Naive Bayes</h2>
                <h3>Project Overview</h3>
                <p>Developed a face recognition system using classical machine learning techniques to classify and identify faces based on extracted features.</p>
                <h3>Tech Stack</h3>
                <p>Python, OpenCV, Scikit-learn, NumPy</p>
                <h2>Poems Generation using RNN</h2>
                <h3>Project Overview</h3>
                <p>Developed a text generation model capable of generating poems using Recurrent Neural Networks trained on textual datasets.</p>
                <h3>Tech Stack</h3>
                <p>Python, TensorFlow/Keras, NLP techniques</p>
                <h2>Employee Attendance Management Portal</h2>
                <h3>Project Overview</h3>
                <p>Designed and developed a web-based attendance management system to track employee attendance, manage records, and streamline administrative tasks.</p>
                <h3>Tech Stack</h3>
                <p>Java, Spring Boot, Spring Security, JPA/Hibernate, MySQL</p>
            </div>
          </section>

          <section id="system" className="section">
            <h2 className="text-2xl mb-4">System Design</h2>
            <div className="card">
                <h2>Overview</h2>
                <p>I approach development with a strong focus on scalability, security, and maintainability. Rather than just building features, I design systems that can evolve into enterprise-grade applications by following structured architectural principles.</p>
                <h2>Architecture Approach</h2>
                <ul>
                    <li>Designed applications using layered architecture (Controller → Service → Repository)</li>
                    <li>Ensured separation of concerns between frontend, backend, and database</li>
                    <li>Built systems with modular design, making them scalable and easy to extend</li>
                    <li>Followed REST principles for clean and consistent API design</li>
                </ul>
                <h2>Security Design</h2>
                <ul>
                    <li>Implemented JWT-based authentication for stateless and secure sessions</li>
                    <li>Applied Role-Based Access Control (RBAC) for fine-grained permission handling</li>
                    <li>Secured APIs using Spring Security and protected routes in React</li>
                    <li>Focused on safe data handling and access restrictions</li>
                </ul>
                <h2>Scalability & Performance</h2>
                <ul>
                    <li>Designed backend services to be microservice-ready</li>
                    <li>Structured code to allow horizontal scaling and modular deployment</li>
                    <li>Optimized database interactions using JPA/Hibernate best practices</li>
                    <li>Reduced unnecessary API calls with efficient data flow</li>
                </ul>
                <h2>Real-Time Systems</h2>
                <ul>
                    <li>Implemented WebSocket-based communication for live updates and chat systems</li>
                    <li>Designed event-driven interactions for better user experience</li>
                    <li>Handled real-time state synchronization between users</li>
                </ul>
                <h2>Data & Workflow Design</h2>
                <ul>
                    <li>Structured systems to support lead pipelines and activity tracking (CRM)</li>
                    <li>Designed workflows for user roles, permissions, and business processes</li>
                    <li>Ensured data consistency and relational integrity in database design</li>
                </ul>
            </div>
          </section>

          <section id="experience" className="section">
            <h2 className="text-2xl mb-4">Experience</h2>
            <div className="card">
              <h3>IT Trainee – Grothmate</h3>
              <ul>
                <li>Developed REST APIs</li>
                <li>Implemented JWT security</li>
                <li>Worked on backend systems</li>
              </ul>
            </div>
          </section>

          <footer style={{ marginTop: "40px", textAlign: "center" }}>
            <p>© 2026 Koteshwar Cheruku. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
}