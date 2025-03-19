// OpenForm.tsx
import React from 'react';
import { Survey, Quest, AnswerOption } from './types';
import '../Styles/formStyles.css';

interface OpenFormProps {
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
  setActiveComponent: React.Dispatch<React.SetStateAction<'create' | 'open' | null>>;
  selectedSurveyId: string;
}

const OpenForm: React.FC<OpenFormProps> = ({ surveys, setSurveys, setActiveComponent, selectedSurveyId }) => {
  const selectedSurvey = surveys.find((survey) => survey.id === selectedSurveyId)!;

  const handleSurveyChange = (field: keyof Survey, value: string) => {
    const updatedSurveys = surveys.map((survey) =>
      survey.id === selectedSurveyId ? { ...survey, [field]: value } : survey
    );
    setSurveys(updatedSurveys);
  };

  const handleQuestChange = (questId: string, field: keyof Quest, value: string | number | boolean) => {
    const updatedSurveys = surveys.map((survey) =>
      survey.id === selectedSurveyId
        ? {
            ...survey,
            quests: survey.quests?.map((quest) =>
              quest.id === questId ? { ...quest, [field]: value } : quest
            ) || [],
          }
        : survey
    );
    setSurveys(updatedSurveys);
  };

  const handleAddQuest = () => {
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      isDeleted: false,
      name: '',
      number: (selectedSurvey.quests?.length || 0) + 1,
      typeQuest: 1,
      isObligatory: false,
      surveyId: selectedSurveyId,
      answerOptions: [],
    };
    const updatedSurveys = surveys.map((survey) =>
      survey.id === selectedSurveyId
        ? { ...survey, quests: [...(survey.quests || []), newQuest] }
        : survey
    );
    setSurveys(updatedSurveys);
  };

  const handleAddOption = (questId: string) => {
    const updatedSurveys = surveys.map((survey) =>
      survey.id === selectedSurveyId
        ? {
            ...survey,
            quests: survey.quests?.map((quest) =>
              quest.id === questId
                ? {
                    ...quest,
                    answerOptions: [
                      ...(quest.answerOptions || []),
                      {
                        id: crypto.randomUUID(),
                        isDeleted: false,
                        questId: quest.id,
                        content: '',
                      },
                    ],
                  }
                : quest
            ) || [],
          }
        : survey
    );
    setSurveys(updatedSurveys);
  };

  const handleOptionChange = (questId: string, optionId: string, value: string) => {
    const updatedSurveys = surveys.map((survey) =>
      survey.id === selectedSurveyId
        ? {
            ...survey,
            quests: survey.quests?.map((quest) =>
              quest.id === questId
                ? {
                    ...quest,
                    answerOptions: quest.answerOptions?.map((option) =>
                      option.id === optionId ? { ...option, content: value } : option
                    ) || [],
                  }
                : quest
            ) || [],
          }
        : survey
    );
    setSurveys(updatedSurveys);
  };

  return (
    <div className="form-editor-container">
      <div className="form-editor-main">
        <div className="form-header">
          <div className="form-group">
            <input
              type="text"
              placeholder="Название формы"
              value={selectedSurvey.name}
              onChange={(e) => handleSurveyChange('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Описание формы"
              value={selectedSurvey.description}
              onChange={(e) => handleSurveyChange('description', e.target.value)}
            />
          </div>
        </div>
        {selectedSurvey.quests?.map((quest) => (
          <div key={quest.id} className="question-card">
            <div className="form-group">
              <input
                type="text"
                placeholder="Вопрос"
                value={quest.name}
                onChange={(e) => handleQuestChange(quest.id, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                value={quest.typeQuest}
                onChange={(e) => handleQuestChange(quest.id, 'typeQuest', Number(e.target.value))}
              >
                <option value={1}>Краткий ответ</option>
                <option value={2}>Развернутый ответ</option>
                <option value={3}>Одиночный выбор</option>
                <option value={4}>Множественный выбор</option>
              </select>
            </div>
            {(quest.typeQuest === 3 || quest.typeQuest === 4) && (
              <div>
                {quest.answerOptions?.map((option) => (
                  <div key={option.id} className="form-group option-group">
                    <input
                      type="text"
                      value={option.content}
                      onChange={(e) => handleOptionChange(quest.id, option.id, e.target.value)}
                      placeholder={`Вариант`}
                    />
                  </div>
                ))}
                <button className="tab-button" onClick={() => handleAddOption(quest.id)}>
                  Добавить вариант
                </button>
              </div>
            )}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={quest.isObligatory}
                  onChange={(e) => handleQuestChange(quest.id, 'isObligatory', e.target.checked)}
                />
                Обязательный
              </label>
            </div>
          </div>
        ))}
        <button className="submit-button add-question-button" onClick={handleAddQuest}>
          Добавить вопрос
        </button>
        <button className="submit-button" onClick={() => setActiveComponent(null)}>Сохранить и выйти</button>
        <button className="tab-button" onClick={() => setActiveComponent(null)}>Назад</button>
      </div>
    </div>
  );
};

export default OpenForm;