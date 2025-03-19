import React from 'react';

const formStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
};

const EventRegistrationForm = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={formStyles}>
        <rect width="100%" height="100%" fill="#e3f2fd"/>
        <text x="50" y="30" fontSize="14" fill="#000">Регистрация</text>
        <rect x="20" y="50" width="160" height="20" fill="#bbdefb"/>
        <rect x="20" y="80" width="160" height="20" fill="#bbdefb"/>
        <rect x="20" y="110" width="160" height="20" fill="#bbdefb"/>
    </svg>
);

const PersonalSurveyForm = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={formStyles}>
        <rect width="100%" height="100%" fill="#f1f8e9"/>
        <text x="40" y="30" fontSize="14" fill="#000">Личные данные</text>
        <rect x="20" y="50" width="160" height="20" fill="#c5e1a5"/>
        <rect x="20" y="80" width="160" height="20" fill="#c5e1a5"/>
        <rect x="20" y="110" width="160" height="20" fill="#c5e1a5"/>
    </svg>
);

const FeedbackForm = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={formStyles}>
        <rect width="100%" height="100%" fill="#ffebee"/>
        <text x="40" y="30" fontSize="14" fill="#000">Обратная связь</text>
        <rect x="20" y="50" width="160" height="20" fill="#ffcdd2"/>
        <rect x="20" y="80" width="160" height="20" fill="#ffcdd2"/>
        <rect x="20" y="110" width="160" height="40" fill="#ffcdd2"/>
    </svg>
);

const OrderForm = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={formStyles}>
        <rect width="100%" height="100%" fill="#fff3e0"/>
        <text x="50" y="30" fontSize="14" fill="#000">Заказ товара</text>
        <rect x="20" y="50" width="160" height="20" fill="#ffe0b2"/>
        <rect x="20" y="80" width="160" height="20" fill="#ffe0b2"/>
        <rect x="20" y="110" width="160" height="20" fill="#ffe0b2"/>
    </svg>
);

const BookingForm = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={formStyles}>
        <rect width="100%" height="100%" fill="#ede7f6"/>
        <text x="50" y="30" fontSize="14" fill="#000">Бронирование</text>
        <rect x="20" y="50" width="160" height="20" fill="#d1c4e9"/>
        <rect x="20" y="80" width="160" height="20" fill="#d1c4e9"/>
        <rect x="20" y="110" width="160" height="20" fill="#d1c4e9"/>
    </svg>
);

export {
    EventRegistrationForm,
    PersonalSurveyForm,
    FeedbackForm,
    OrderForm,
    BookingForm
};
