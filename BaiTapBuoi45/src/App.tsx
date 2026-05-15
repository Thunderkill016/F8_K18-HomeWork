import { Box, Grid, Snackbar, Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { HeaderBar, Question, SideBar } from "./components";
import questions from "./data/questions";
import type { SelectedAnswers } from "./types";

const EXAM_TIME = 10 * 60;

function App() {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(EXAM_TIME);

  const selectedQuestion = questions[questionIndex];

  const submitExam = useCallback(() => {
    if (isLocked) return;

    // Reset toàn bộ trạng thái bài làm cũ sau khi nộp.
    setSelectedAnswers({});
    setQuestionIndex(0);
    setRemainingTime(EXAM_TIME);
    setIsLocked(true);
    setIsSubmitted(true);
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) return;
    if (remainingTime <= 0) return;

    const timerId = window.setTimeout(() => {
      if (remainingTime === 1) {
        submitExam();
        return;
      }

      setRemainingTime(remainingTime - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isLocked, remainingTime, submitExam]);

  const onAnswer = (optionIndex: number) => {
    if (isLocked) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [selectedQuestion.id]: optionIndex,
    });
  };

  const onNext = () => {
    if (isLocked) return;
    if (questionIndex === questions.length - 1) return;
    setQuestionIndex(questionIndex + 1);
  };

  const onPrev = () => {
    if (isLocked) return;
    if (questionIndex === 0) return;
    setQuestionIndex(questionIndex - 1);
  };

  return (
    <>
      <HeaderBar
        remainingTime={remainingTime}
        onSubmit={submitExam}
        isLocked={isLocked}
      />
      <Box className="page-container main-layout">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Question
              question={selectedQuestion}
              index={questionIndex + 1}
              selectedIndex={selectedAnswers[selectedQuestion.id]}
              onAnswer={onAnswer}
              isLocked={isLocked}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SideBar
              questions={questions}
              currentIndex={questionIndex}
              selectedAnswers={selectedAnswers}
              onPrev={onPrev}
              onNext={onNext}
              onSelectQuestion={(index) => {
                if (isLocked) return;
                setQuestionIndex(index);
              }}
              isLocked={isLocked}
            />
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={isSubmitted}
        autoHideDuration={4000}
        onClose={() => setIsSubmitted(false)}
      >
        <Alert severity="success" variant="filled">
          Nộp bài thành công.
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
