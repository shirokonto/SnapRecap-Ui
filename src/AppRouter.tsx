import AppHeader from './components/AppBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoUploader from './VideoUploader';
import React from 'react';

const AppRouter = () => {
  return (
    <Router>
      <div>
        {/* App Header */}
        <AppHeader />
        {/* Main Content */}
        <div style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<VideoUploader />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
