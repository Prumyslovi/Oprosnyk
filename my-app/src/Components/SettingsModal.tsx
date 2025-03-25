import React from 'react';

interface SettingsModalProps {
  user: { name: string; email: string };
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  handleLogout: () => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ user, selectedTheme, setSelectedTheme, handleLogout, setIsSettingsOpen }) => {
  const themes = ['Светлая', 'Тёмная', 'Синяя', 'Инверсивная'];

  return (
    <div className="settings-modal" onClick={() => setIsSettingsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => setIsSettingsOpen(false)}>✖</button>
        <h2>Настройки</h2>
        <div>
          <label>Тема:</label>
          <select
            className="settings-select"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>
        <div>
          <h3>Информация об аккаунте</h3>
          <p>Имя: {user.name}</p>
          <p>Почта: {user.email}</p>
        </div>
        <button className="settings-button">Сменить пароль</button>
        <button className="settings-button" onClick={handleLogout}>Выйти из аккаунта</button>
        <button className="settings-button" onClick={handleLogout}>Сменить аккаунт</button>
      </div>
    </div>
  );
};

export default SettingsModal;