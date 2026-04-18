import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page glass" style={{ padding: '3rem', borderRadius: '32px' }}>
      <h1>About TaskFlow</h1>
      <p className="subtitle">Precision-engineered for modern productivity.</p>
      
      <div style={{ marginTop: '2rem', lineHeight: '1.8' }}>
        <p>This Todo Management System is a production-grade application leveraging the power of <strong>React 18</strong>, <strong>TypeScript</strong>, and <strong>.NET Core Web API</strong>.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Key Architectural Patterns</h3>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <li className="glass" style={{ padding: '1rem', borderRadius: '16px' }}><strong>State</strong>: React Context API</li>
            <li className="glass" style={{ padding: '1rem', borderRadius: '16px' }}><strong>Validation</strong>: React Hook Form</li>
            <li className="glass" style={{ padding: '1rem', borderRadius: '16px' }}><strong>Patterns</strong>: Custom Hooks (useTodos)</li>
            <li className="glass" style={{ padding: '1rem', borderRadius: '16px' }}><strong>Real-time</strong>: Backend Synchronization</li>
          </ul>
        </div>

        <div style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: '0.8' }}>
          <p>Developed as part of the ReactJS CRUD Operations Masterclass.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
