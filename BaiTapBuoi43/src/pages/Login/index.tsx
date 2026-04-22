import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../../utils";

interface UserInfo {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSignIn = async () => {
    try {
      const data = await api.post("/auth/signin", userInfo);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    } catch {
      toast.error("Email or password wrong");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Login
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={onInput}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={userInfo.password}
          onChange={onInput}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onSignIn}>
          Sign In
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
