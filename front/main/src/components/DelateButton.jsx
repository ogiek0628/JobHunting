import React, { useState } from 'react';
import axios from 'axios';
import "../styles/DelateButton.css";



function DeleteButton({ id, onDeleted }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteEntry = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:7000/delete/${id}`);
      console.log(response.data);
      closeModal();
      onDeleted(); // リストを更新
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <>
      <button onClick={openModal}>削除</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>本当に削除しますか？</h4>
            <button className='delete-confirm-button' onClick={deleteEntry}>削除</button>
            <button className='cancel-button'  onClick={closeModal}>キャンセル</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteButton;