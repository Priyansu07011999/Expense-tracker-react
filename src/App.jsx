import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <div className='flex flex-col h-screen'>
        <Header />
        <div className='flex justify-center items-center flex-1'>
          <SignupForm />
        </div>
      </div>
    </Router>
  );
}

export default App;
