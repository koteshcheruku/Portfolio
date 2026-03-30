export default function SystemDesign() {
  return (
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
  );
}
