import React, { useState } from 'react';
import axios from 'axios';
import "../styles/PlusButton.css";




function PlusButton({ isModalOpen, setIsModalOpen, onClose, onAdded }) {
    const [inputText, setInputText] = useState('');
    const [message, setMessage] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onClose();
        setMessage('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputText.trim()) {
            setMessage('エラー: 空白文字は登録できません。');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:7000/add', { text: inputText });
            setMessage('登録されました。');
            setInputText('');
            setTimeout(() => {
                handleCloseModal();
                onAdded();
            }, 2000);
        } catch (error) {
            console.error('Error posting entry:', error);
            setMessage('登録に失敗しました。');
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <h2>企業名登録</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
                            <button type="submit">Submit</button>
                            {message && <p>{message}</p> /* ユーザーへのフィードバックを表示 */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlusButton;