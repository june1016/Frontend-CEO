import React from "react";
import AuthLayout from "../../layout/authLayout";
import SignupForm from "../../components/auth/signupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
