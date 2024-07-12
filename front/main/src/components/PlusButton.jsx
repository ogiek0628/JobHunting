import React from "react";

function PlusButton({ onClose }) {
  return (
    
    <div id="overlay" className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>企業名登録</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PlusButton;