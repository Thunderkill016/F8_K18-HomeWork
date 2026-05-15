import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

interface Props {
  remainingTime: number;
  onSubmit: () => void;
  isLocked: boolean;
}

const HeaderBar = ({ remainingTime, onSubmit, isLocked }: Props) => {
  const timeText = useMemo(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingTime]);

  return (
    <Box className="header-bar">
      <Box className="page-container header-inner">
        <Box>
          <Typography variant="h5">Ôn Thi GPLX</Typography>
          <Typography variant="body2">Đề thi ngẫu nhiên số 1</Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box className="timer">{timeText}</Box>
          <Button
            variant="contained"
            color="success"
            onClick={onSubmit}
            disabled={isLocked}
          >
            {isLocked ? "Đã nộp" : "Nộp bài"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderBar;
