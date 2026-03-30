export default function Projects() {
  return (
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
  );
}
