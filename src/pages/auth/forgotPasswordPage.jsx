import React from "react";
import AuthLayout from "../../layout/authLayout";
import ForgotPasswordForm from "../../components/auth/forgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
