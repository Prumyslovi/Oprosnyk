import React, { useState } from "react";
import "../Styles/authModal.css";
import "../Styles/typicalElements.css";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Некорректный адрес электронной почты.");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов.");
      return;
    }

    if (!isLogin && name.trim() === "") {
      setError("Имя не может быть пустым.");
      return;
    }

    setError("");

    if (isLogin) {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        console.log("Успешный вход:", user);
        onClose();
      } else {
        setError("Неверный email или пароль.");
      }
    } else {
      const isEmailTaken = users.some((user) => user.email === email);
      if (isEmailTaken) {
        setError("Пользователь с таким email уже существует.");
        return;
      }

      const newUser: User = {
        id: users.length + 1,
        name,
        email,
        password,
      };

      setUsers([...users, newUser]);
      console.log("Успешная регистрация:", newUser);
      setIsLogin(true);
      setError("");
    }
  };

  if (!isOpen) return null;

  const getModalHeight = () => {
    return isLogin ? "250px" : "350px";
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content section" style={{ height: getModalHeight() }}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="tab-container">
          <button
            className={`tab-button ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button
            className={`tab-button ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Почта:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default AuthModal;