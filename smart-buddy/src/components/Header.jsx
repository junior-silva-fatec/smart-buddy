import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="header">
      <Link to="/">
        <h2>Smart Buddy</h2>
      </Link>{" "}
      <button onClick={handleLoginClick}>Login</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Login</h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
