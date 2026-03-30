export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="text-2xl mb-4">Skills</h2>
      <div className="card">
        <div className="table-responsive">
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
      </div>
    </section>
  );
}
