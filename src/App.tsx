import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TodoPage from './pages/TodoPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
