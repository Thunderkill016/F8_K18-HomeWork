interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

type SelectedAnswers = Record<number, number | undefined>;

export type { Question, SelectedAnswers };
