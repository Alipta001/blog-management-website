"use client";

import {
  useState,
} from "react";

import Link from "next/link";
import {
  Mail,
  ArrowLeft,
  Loader2,
  Send,
} from "lucide-react";
import {
  toast,
} from "react-toastify";

import AuthLayout from "@/components/auth/authLayout";
import {
  useAppDispatch,
} from "@/redux/hooks";
import {
  forgotPassword,
} from "@/redux/slice/auth/authSlice";

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      await dispatch(
        forgotPassword({ email }),
      ).unwrap();
      toast.success("Password reset link sent to your email.");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send reset email",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We will send you a secure link to choose a new password."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-medium text-white shadow-lg shadow-violet-600/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={19} />
          )}
          Send reset link
        </button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </form>
    </AuthLayout>
  );
}
