import AuthLayout from "@/components/auth/authLayout";
import RegisterForm from "@/components/auth/registerForm";


export default function RegisterPage() {

  return (
    <AuthLayout
      title="Create your account"
      subtitle="
        Join the community and start your journey today.
      "
    >

      <RegisterForm />

    </AuthLayout>
  );
}