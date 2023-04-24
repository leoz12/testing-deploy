import { Button, Card, Form, Input, Checkbox } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { dummyUser } from "./constants";
import styles from "./styles.module.css";

import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [noAuth, setNoAuth] = useState(false);

  const onSubmit = (values) => {
    let validUser = false;
    dummyUser.map((user) => {
      if (user.email === values.email && user.password === values.password) {
        validUser = true;
        localStorage.setItem(
          "token",
          JSON.stringify({
            email: user.email,
            role: user.role,
          })
        );
      }
    });
    if (validUser) {
      navigate("/");
    } else {
      setNoAuth(true);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <Card
        title="Login Form"
        style={{ width: 400, margin: "auto", marginTop: 50 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Email</label>
            <input
              className={styles.fieldInput}
              type="text"
              name="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Masukan Format Email Yang Benar",
                },
              })}
            />
            {!!errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Password</label>
            <input
              className={styles.fieldInput}
              type="password"
              name="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password Name Minimal 8 Karakter",
                },
              })}
            />
            {!!errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>
          {!!noAuth && (
            <div>
              <p className={styles.errorMessage}>Invalid Email or Password</p>
            </div>
          )}
          <Button type="primary" htmlType="submit">
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
}
