import { Box, Radio, Stack, Typography } from "@mui/material";
import type { Question as QuestionType } from "../../types";

interface Props {
  question: QuestionType;
  index: number;
  selectedIndex?: number;
  onAnswer: (optionIndex: number) => void;
  isLocked: boolean;
}

const Question = ({
  question,
  index,
  selectedIndex,
  onAnswer,
  isLocked,
}: Props) => {
  return (
    <Box className="question-card">
      <Box className="question-heading">
        <Typography className="question-badge">Câu {index}</Typography>
        <Typography variant="h6" className="question-title">
          {question.text}
        </Typography>
      </Box>

      <Stack spacing={1.5} className="answer-list">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedIndex === optionIndex;

          return (
            <Box
              key={option}
              className={[
                "answer-option",
                isSelected ? "selected" : "",
                isLocked ? "disabled" : "",
              ].join(" ")}
              onClick={() => {
                if (isLocked) return;
                onAnswer(optionIndex);
              }}
            >
              <Radio checked={isSelected} disabled={isLocked} />
              <Typography>{option}</Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Question;
