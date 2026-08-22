import AuthLayout from "@/components/auth/authLayout";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="
        Sign in to continue your journey.
      "
    >

      <LoginForm />

    </AuthLayout>
  );
}