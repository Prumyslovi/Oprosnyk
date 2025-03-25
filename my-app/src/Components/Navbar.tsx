import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { FaSearch, FaTimes, FaRegUser, FaCog } from 'react-icons/fa';
import Patterns from './Patterns';
import LastContent from './LastContent';
import CreateForm from './CreateForm';
import SettingsModal from './SettingsModal';
import OpenForm from './OpenForm';
import '../Styles/navbar.css';
import '../Styles/search.css';
import { Survey } from './types';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'create' | 'open' | null>(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1e46ab34-e58d-462e-b9f5-a2371a762d0f',
      isDeleted: false,
      ownerId: '7ebd2a58-bca2-4d9c-8a9a-04734009f245',
      name: 'Регистрация на секс',
      description: 'Форма для регистрации',
      isTime: false,
      totalTime: 0,
      isAnonim: false,
      dtCreate: '2025-03-14T17:23:25.7048541Z',
      quests: [
        {
          id: '7bc64751-6e6b-4bd3-9e47-22bcb43a78b9',
          isDeleted: false,
          name: 'Вопрос не вопрос',
          number: 1,
          typeQuest: 1,
          isObligatory: true,
          surveyId: '1e46ab34-e58d-462e-b9f5-a2371a762d0f',
          answerOptions: [
            {
              id: '53f95db0-d2c0-48b5-9437-d495da0f2de5',
              isDeleted: false,
              questId: '7bc64751-6e6b-4bd3-9e47-22bcb43a78b9',
              content: 'Вариант Адын',
            },
          ],
        },
      ],
    },
    {
      id: '2e46ab34-e58d-462e-b9f5-a2371a762d0f',
      isDeleted: false,
      ownerId: '7ebd2a58-bca2-4d9c-8a9a-04734009f245',
      name: 'Мои данные',
      description: 'Персональные данные',
      isTime: false,
      totalTime: 0,
      isAnonim: false,
      dtCreate: '2025-03-14T17:23:25.7048541Z',
      quests: [],
    },
    {
      id: '3e46ab34-e58d-462e-b9f5-a2371a762d0f',
      isDeleted: false,
      ownerId: '7ebd2a58-bca2-4d9c-8a9a-04734009f245',
      name: 'Свяжись со мной',
      description: 'Обратная связь',
      isTime: false,
      totalTime: 0,
      isAnonim: false,
      dtCreate: '2025-03-14T17:23:25.7048541Z',
      quests: [],
    },
  ]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('Light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: 'Сергей Дрочеслав', email: 'svo.goyda@mail.ru' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveComponent(null);
    setSelectedSurveyId(null);
    setIsSettingsOpen(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <div className="leftSection" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <FiMenu size={24} />
          </div>
          <div className="centerSection">
            <div className="searchBar">
              <div className="searchContainer">
                <FaSearch className="searchIcon" />
                <input
                  type="text"
                  placeholder="Поиск"
                  value={query}
                  onChange={handleInputChange}
                  className="searchInput"
                />
                {query && <FaTimes className="clearIcon" onClick={handleClear} />}
              </div>
            </div>
          </div>
          <div className="rightSection">
            <ul className="navList">
              <li className="navItem">
                {isLoggedIn ? (
                  <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <FaRegUser size={24} />
                  </div>
                ) : (
                  <button onClick={handleLogin} className="login-button">
                    Войти
                  </button>
                )}
              </li>
              {isLoggedIn && (
                <li className="navItem">
                  <div onClick={() => setIsSettingsOpen(true)} style={{ cursor: 'pointer' }}>
                    <FaCog size={24} />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {isLoggedIn && activeComponent === null ? (
        <>
          <div className="interval">
            <Patterns setActiveComponent={setActiveComponent} />
          </div>
          <div className="interval">
            <LastContent setActiveComponent={setActiveComponent} surveys={surveys} setSelectedSurveyId={setSelectedSurveyId} />
          </div>
        </>
      ) : isLoggedIn && activeComponent === 'create' ? (
        <CreateForm surveys={surveys} setSurveys={setSurveys} setActiveComponent={setActiveComponent} />
      ) : isLoggedIn && activeComponent === 'open' && selectedSurveyId ? (
        <OpenForm
          surveys={surveys}
          setSurveys={setSurveys}
          setActiveComponent={setActiveComponent}
          selectedSurveyId={selectedSurveyId}
        />
      ) : (
        <div className="auth-message">
          Авторизуйтесь для работы с системой
          <AuthModal 
            isOpen={isModalOpen} 
            onClose={() => { setIsModalOpen(false); }}
            onLogged={() => { setIsLoggedIn(true); }}
            />
        </div>
      )}

      {isSettingsOpen && user && (
        <SettingsModal
          user={user}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          handleLogout={handleLogout}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      )}

      {isSidebarOpen && (
        <div className="sidebar">
          <button className="close-button" onClick={toggleSidebar}>
            ✖
          </button>
          <h2>Fast-Surveys</h2>
          <ul>
            <li><a href="#">Формы</a></li>
            <li><a href="#">Документы</a></li>
            <li></li>
            <li><a href="#">Настройки</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;