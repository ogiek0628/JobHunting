import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/App.css";
import PlusButton from "./PlusButton";
import DeleteButton from "./DelateButton";



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:7000/');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div>
      <h1>企業登録</h1>
      <h2>企業一覧</h2>
      <button className="round-button" onClick={openModal}>+</button>
      {isModalOpen && (
        <PlusButton 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onClose={closeModal}
          onAdded={fetchEntries}
        />
      )}
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            {entry.text}
            <DeleteButton id={entry.id} onDeleted={fetchEntries} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;