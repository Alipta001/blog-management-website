"use client";

import {
  Suspense,
  useState,
} from "react";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Loader2,
} from "lucide-react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  toast,
} from "react-toastify";

import AuthLayout from "@/components/auth/authLayout";
import {
  useAppDispatch,
} from "@/redux/hooks";
import {
  resetPassword,
} from "@/redux/slice/auth/authSlice";

function ResetPasswordForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const userId = searchParams.get("id") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!token || !userId) {
      toast.error("This reset link is invalid.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        resetPassword({
          userId,
          token,
          newPassword,
          confirmPassword,
        }),
      ).unwrap();
      toast.success("Password reset successful.");
      router.push("/login");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to reset password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          New Password
        </label>
        <div className="relative">
          <KeyRound
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter your new password"
            minLength={6}
            required
            className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/10"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Confirm Password
        </label>
        <div className="relative">
          <CheckCircle2
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your new password"
            minLength={6}
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
        {loading && <Loader2 size={20} className="animate-spin" />}
        Reset password
      </button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Create a fresh password for your GolpoKotha account."
    >
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
