// LastContent.tsx
import React from 'react';
import '../Styles/typicalElements.css';
import { Survey } from './types';

interface LastContentProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<'create' | 'open' | null>>;
  surveys: Survey[];
  setSelectedSurveyId: React.Dispatch<React.SetStateAction<string | null>>;
}

const LastContent: React.FC<LastContentProps> = ({ setActiveComponent, surveys, setSelectedSurveyId }) => {
  const handleOpenForm = (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setActiveComponent('open');
  };

  return (
    <div className="section">
      <h4>Открыть форму</h4>
      <div className="container">
        {surveys.map((survey) => (
          <div className="squareContainer" key={survey.id}>
            <div className="square" onClick={() => handleOpenForm(survey.id)}>
              <p>{survey.name}</p>
            </div>
            <p className="squareText">{survey.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastContent;