import React, { use, useState } from "react";
import "../Styles/authModal.css";
import "../Styles/typicalElements.css";

interface User {
  id: number;
  login: string;
  email: string;
  password: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onLogged: () => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onLogged, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      login: "john_doe",
      email: "john.doe@example.com",
      password: "J0hnDoe!2023"
    },
    {
      id: 2,
      login: "alice_smith",
      email: "alice.s@example.com",
      password: "Al1c3$ecur3"
    },
    {
      id: 3,
      login: "bob_miller",
      email: "bob.m@example.com",
      password: "B0bM!ller#"
    },
    {
      id: 4,
      login: "eva_black",
      email: "eva.b@example.org",
      password: "Bl@ckC0de_"
    },
    {
      id: 5,
      login: "admin_user",
      email: "admin@example.com",
      password: "Adm!nP@$$w0rd"
    },
    {
      id: 6,
      login: "test_account",
      email: "test@example.io",
      password: "T3st!ng123%"
    },
    {
      id: 7,
      login: "support_agent",
      email: "support@example.net",
      password: "SupPort!2023"
    }
  ]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^[а-яА-ЯёЁA-Za-z\d@$!%*?&]{8,35}$/;
    return regex.test(password);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email.toLowerCase())) {
      setError("Некорректный адрес электронной почты.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Пароль должен быть от 8 до 35 символов\nСодержать спец.символы и не содержать пробелы");
      return;
    }

    if (!isLogin && login.trim() === "") {
      setError("Логин не может быть пустым.");
      return;
    }

    setError("");

    if (isLogin) {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        onLogged();
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
        login,
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
  
  return (
    <div className="modal-overlay">
      <div className="modal-content section">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="tab-container">
          <button
            className={`tab-button ${isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Вход
          </button>
          <button
            className={`tab-button ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Регистрация
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Логин:</label>
              <input
                type="text"
                id="name"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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