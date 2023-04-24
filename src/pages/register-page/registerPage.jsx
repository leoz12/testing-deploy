import { Card, Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = React.useState({
    password: "",
    confirm: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    navigate("/login");
  };
  const checkPassword = (e) => {
    setPasswordData({ ...passwordData, password: e.target.value });
  };
  const checkConfirm = (e) => {
    setPasswordData({ ...passwordData, confirm: e.target.value });
  };
  return (
    <div>
      <Card
        title="Register Form"
        style={{ width: 400, margin: "auto", marginTop: 50 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>First Name</label>
            <input
              className={styles.fieldInput}
              type="text"
              name="firstName"
              {...register("firstName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "First Name Minimal 3 Karakter",
                },
              })}
            />
            {!!errors.firstName && (
              <p className={styles.errorMessage}>{errors.firstName.message}</p>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Last Name</label>
            <input
              className={styles.fieldInput}
              type="text"
              name="lastName"
              {...register("lastName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Last Name Minimal 3 Karakter",
                },
              })}
            />
            {!!errors.lastName && (
              <p className={styles.errorMessage}>{errors.lastName.message}</p>
            )}
          </div>
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
                onChange: (e) => {
                  checkPassword(e);
                },
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
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Confirm Password</label>
            <input
              className={styles.fieldInput}
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: true,
                onChange: (e) => {
                  checkConfirm(e);
                },
              })}
            />
            {passwordData.password &&
            passwordData.confirm &&
            passwordData.password !== passwordData.confirm ? (
              <p className={styles.errorMessage}>
                confirm password tidak sama dengan password!!!
              </p>
            ) : null}
          </div>
          <Button type="primary" htmlType="submit">
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
}
