export interface Survey {
    id: string;
    isDeleted: boolean;
    ownerId: string;
    name: string;
    description: string;
    isTime: boolean;
    totalTime: number;
    isAnonim: boolean;
    dtCreate: string;
    quests: Quest[] | null;
}

export interface Quest {
    id: string;
    isDeleted: boolean;
    name: string;
    number: number;
    typeQuest: number;
    isObligatory: boolean;
    surveyId: string;
    answerOptions: AnswerOption[] | null;
}

export interface AnswerOption {
    id: string;
    isDeleted: boolean;
    questId: string;
    content: string;
}