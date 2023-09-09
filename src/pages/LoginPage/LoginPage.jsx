import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import css from "./LoginPage.module.css";
import { Button, Typography } from "@mui/material";
import { login } from "../../firebase/firebase";
import { toast } from "react-toastify";

function LoginPage() {
  const [e, setE] = useState("");
  const [p, setP] = useState("");

  const errorToast = () => toast.error("Почта или пароль был введен не верно!");
  const successToast = () => toast.success("Вы успешно вошли в систему!");

  const submit = (event) => {
    event.preventDefault();
    login(e, p)
      .then(() => {
        successToast();
      })
      .catch(() => {
        errorToast();
      });
  };
  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <Typography variant="h4">Авторизация c Email и Пароль</Typography>
        <form onSubmit={submit}>
          <TextField
            value={e}
            onChange={(e) => setE(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            value={p}
            onChange={(e) => setP(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button type="submit" variant="contained" sx={{ height: 60 }}>
            Войти
          </Button>
        </form>
      </div>
      <div className={css.right} />
    </div>
  );
}

export default LoginPage;
