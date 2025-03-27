// CreateForm.tsx
import React, { useState } from 'react';
import { Survey, Quest, AnswerOption } from './types';
import '../Styles/formStyles.css';

interface CreateFormProps {
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
  setActiveComponent: React.Dispatch<React.SetStateAction<'create' | 'open' | null>>;
  setOpenFormBuilder: (visible: boolean) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ surveys, setSurveys, setActiveComponent, setOpenFormBuilder }) => {
  const [surveyName, setSurveyName] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [quests, setQuests] = useState<Quest[]>([]);

  setOpenFormBuilder(true);

  const handleAddQuest = () => {
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      isDeleted: false,
      name: '',
      number: quests.length + 1,
      typeQuest: 1,
      isObligatory: false,
      surveyId: '',
      answerOptions: [],
    };
    setQuests([...quests, newQuest]);
  };

  const handleQuestChange = (index: number, field: keyof Quest, value: string | number | boolean) => {
    const updatedQuests = [...quests];
    updatedQuests[index] = { ...updatedQuests[index], [field]: value };
    setQuests(updatedQuests);
  };

  const handleAddOption = (questIndex: number) => {
    const updatedQuests = [...quests];
    const newOption: AnswerOption = {
      id: crypto.randomUUID(),
      isDeleted: false,
      questId: updatedQuests[questIndex].id,
      content: '',
    };
    updatedQuests[questIndex].answerOptions = [...(updatedQuests[questIndex].answerOptions || []), newOption];
    setQuests(updatedQuests);
  };

  const handleOptionChange = (questIndex: number, optionIndex: number, value: string) => {
    const updatedQuests = [...quests];
    updatedQuests[questIndex].answerOptions![optionIndex].content = value;
    setQuests(updatedQuests);
  };

  const handleSaveForm = () => {
    const newSurvey: Survey = {
      id: crypto.randomUUID(),
      isDeleted: false,
      ownerId: '7ebd2a58-bca2-4d9c-8a9a-04734009f245',
      name: surveyName,
      description: surveyDescription,
      isTime: false,
      totalTime: 0,
      isAnonim: false,
      dtCreate: new Date().toISOString(),
      quests: quests.map((quest) => ({ ...quest, surveyId: newSurvey.id })),
    };
    setSurveys([...surveys, newSurvey]);
    setSurveyName('');
    setSurveyDescription('');
    setQuests([]);
    setActiveComponent(null);
  };

  return (
    <div className="form-editor-container">
      <div className="form-editor-main">
        <div className="form-header">
          <div className="form-group">
            <input
              type="text"
              placeholder="Название формы"
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Описание формы"
              value={surveyDescription}
              onChange={(e) => setSurveyDescription(e.target.value)}
            />
          </div>
        </div>
        {quests.map((quest, questIndex) => (
          <div key={quest.id} className="question-card">
            <div className="form-group">
              <input
                type="text"
                placeholder="Вопрос"
                value={quest.name}
                onChange={(e) => handleQuestChange(questIndex, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                value={quest.typeQuest}
                onChange={(e) => handleQuestChange(questIndex, 'typeQuest', Number(e.target.value))}
              >
                <option value={1}>Краткий ответ</option>
                <option value={2}>Развернутый ответ</option>
                <option value={3}>Одиночный выбор</option>
                <option value={4}>Множественный выбор</option>
              </select>
            </div>
            {(quest.typeQuest === 3 || quest.typeQuest === 4) && (
              <div>
                {quest.answerOptions?.map((option, optionIndex) => (
                  <div key={option.id} className="form-group option-group">
                    <input
                      type="text"
                      value={option.content}
                      onChange={(e) => handleOptionChange(questIndex, optionIndex, e.target.value)}
                      placeholder={`Вариант ${optionIndex + 1}`}
                    />
                  </div>
                ))}
                <button className="tab-button" onClick={() => handleAddOption(questIndex)}>
                  Добавить вариант
                </button>
              </div>
            )}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={quest.isObligatory}
                  onChange={(e) => handleQuestChange(questIndex, 'isObligatory', e.target.checked)}
                />
                Обязательный
              </label>
            </div>
          </div>
        ))}
        <button className="submit-button add-question-button" onClick={handleAddQuest}>
          Добавить вопрос
        </button>
        <button className="submit-button" onClick={handleSaveForm}>Сохранить форму</button>
        <button className="tab-button" onClick={() => { setActiveComponent(null); setOpenFormBuilder(false); }}>Назад</button>
      </div>
    </div>
  );
};

export default CreateForm;