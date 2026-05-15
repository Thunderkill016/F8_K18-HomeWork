import { Box, Button, Stack, Typography } from "@mui/material";
import type { Question, SelectedAnswers } from "../../types";

interface Props {
  questions: Question[];
  currentIndex: number;
  selectedAnswers: SelectedAnswers;
  onPrev: () => void;
  onNext: () => void;
  onSelectQuestion: (index: number) => void;
  isLocked: boolean;
}

const SideBar = ({
  questions,
  currentIndex,
  selectedAnswers,
  onPrev,
  onNext,
  onSelectQuestion,
  isLocked,
}: Props) => {
  const answeredTotal = Object.values(selectedAnswers).filter(
    (answer) => answer !== undefined,
  ).length;

  return (
    <Box className="sidebar-card">
      <Stack direction="row" spacing={1.5} className="navigation-actions">
        <Button
          variant="outlined"
          fullWidth
          disabled={isLocked || currentIndex === 0}
          onClick={onPrev}
        >
          Câu trước
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={isLocked || currentIndex === questions.length - 1}
          onClick={onNext}
        >
          Câu tiếp
        </Button>
      </Stack>

      <Typography variant="h6" className="sidebar-title">
        Danh sách câu hỏi
      </Typography>
      <Typography variant="body2" className="muted-text">
        Đã trả lời {answeredTotal}/{questions.length} câu
      </Typography>

      <Box className="question-map">
        {questions.map((question, index) => {
          const questionNumber = index + 1;
          const isCurrent = index === currentIndex;
          const isAnswered = selectedAnswers[question.id] !== undefined;

          return (
            <Button
              key={questionNumber}
              className={[
                "question-number",
                isAnswered ? "answered" : "",
                isCurrent ? "current" : "",
              ].join(" ")}
              variant="outlined"
              disabled={isLocked}
              onClick={() => onSelectQuestion(index)}
            >
              {questionNumber}
            </Button>
          );
        })}
      </Box>

      <Stack spacing={1} className="legend-list">
        <Box className="legend-item">
          <span className="legend-box" />
          <Typography variant="body2">Chưa trả lời</Typography>
        </Box>
        <Box className="legend-item">
          <span className="legend-box answered" />
          <Typography variant="body2">Đã trả lời</Typography>
        </Box>
        <Box className="legend-item">
          <span className="legend-box current" />
          <Typography variant="body2">Đang chọn</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideBar;
