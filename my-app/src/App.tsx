import React, { useState } from 'react';
import './Styles/App.css';
import Navbar from './Components/Navbar';
import AuthModal from './Components/AuthModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar />
      {/* <button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  );
}

export default App;