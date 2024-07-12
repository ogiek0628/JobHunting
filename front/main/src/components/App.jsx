import React, { useState } from "react";
import "../styles/App.css";
import PlusButton from "./PlusButton";



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>企業登録</h1>
      <h2>企業一覧</h2>
      <button className="round-button" onClick={openModal}>+</button>
      {isModalOpen && <PlusButton onClose={closeModal} />}
    </div>
  );
}

export default App;