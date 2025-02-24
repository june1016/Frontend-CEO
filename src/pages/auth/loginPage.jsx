import React from "react";
import AuthLayout from "../../layout/authLayout";
import LoginForm from "../../components/auth/loginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
