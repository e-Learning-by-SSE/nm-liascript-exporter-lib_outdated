export type QuestionPage = {
  page: string;
  separatePage: boolean;
};

export type MultipleChoice = YesNoQuestion[];

type YesNoQuestion = {
  question: string;
  isCorrect: boolean;
};
