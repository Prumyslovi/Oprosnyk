// Patterns.tsx
import React from 'react';
import '../Styles/typicalElements.css';
import {
  EventRegistrationForm,
  PersonalSurveyForm,
  FeedbackForm,
  OrderForm,
  BookingForm,
} from './FormTemplates';
import { FaPlus } from 'react-icons/fa';

interface PatternsProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<'create' | 'open' | null>>;
}

const Patterns: React.FC<PatternsProps> = ({ setActiveComponent }) => {
  return (
    <div className="section">
      <h4>Создать форму</h4>
      <div className="container">
        <div className="squareContainer">
          <div className="square" onClick={() => setActiveComponent('create')}>
            <FaPlus size={36} />
          </div>
          <p className="squareText">Создать пустую форму</p>
        </div>
        <div className="squareContainer">
          <div className="square" onClick={() => setActiveComponent('create')}>
            <EventRegistrationForm />
          </div>
          <p className="squareText">Форма регистрации на мероприятие</p>
        </div>
        <div className="squareContainer">
          <div className="square" onClick={() => setActiveComponent('create')}>
            <PersonalSurveyForm />
          </div>
          <p className="squareText">Форма отправки персональных данных</p>
        </div>
        <div className="squareContainer">
          <div className="square" onClick={() => setActiveComponent('create')}>
            <FeedbackForm />
          </div>
          <p className="squareText">Форма для обратной связи</p>
        </div>
        <div className="squareContainer">
          <div className="square" onClick={() => setActiveComponent('create')}>
            <OrderForm />
          </div>
          <p className="squareText">Форма для заказа товаров</p>
        </div>
        <div className="squareContainer">
          <div className="square" onClick={() => setActiveComponent('create')}>
            <BookingForm />
          </div>
          <p className="squareText">Форма для бронирования</p>
        </div>
      </div>
    </div>
  );
};

export default Patterns;