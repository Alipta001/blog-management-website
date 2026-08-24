"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import OtpInput from "./otpInput";

import {
  useAppDispatch,
} from "@/redux/hooks";

import {
  verifyRegistrationOtp,
} from "@/redux/slice/auth/authSlice";


interface VerifyOtpFormProps {
  email: string;
}

export default function VerifyOtpForm({
  email,
}: VerifyOtpFormProps) {
  const dispatch =
    useAppDispatch();

  const router =
    useRouter();

  const [otp, setOtp] =
    useState<string[]>(
      Array(6).fill(""),
    );

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(10 * 60);


   
  // COUNTDOWN
   

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer =
      setInterval(() => {
        setTimeLeft(
          (previousTime) =>
            previousTime - 1,
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [timeLeft]);


   
  // FORMAT TIME
   

  const formatTime = (
    seconds: number,
  ) => {
    const minutes =
      Math.floor(
        seconds / 60,
      );

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0",
    )}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };


   
  // VERIFY OTP
   

  const handleVerify = async (
    event:
      React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const otpValue =
      otp.join("");

    if (
      otpValue.length !== 6
    ) {
      toast.error(
        "Please enter the complete 6-digit OTP",
      );

      return;
    }

    try {
      setLoading(true);

      await dispatch(
        verifyRegistrationOtp({
          email,
          otp: otpValue,
        }),
      ).unwrap();

      toast.success(
        "Email verified successfully!",
      );

      setTimeout(() => {
        router.push("/login");
      }, 1000);

    } catch (error: unknown) {

      const message =
        error instanceof Error
          ? error.message
          : "OTP verification failed";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };


   
  // RESEND OTP
   

  const handleResend = async () => {
    if (resending) {
      return;
    }

    toast.info(
      "Please go back to registration to request a new OTP.",
    );
  };


  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-[#111114]
        p-6
        shadow-2xl
        shadow-black/30
        sm:p-8
      "
    >

      {/* ICON */}

      <div className="flex justify-center">

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-violet-500/10
            text-violet-400
          "
        >

          <Mail className="h-8 w-8" />

        </div>

      </div>


      {/* HEADER */}

      <div className="mt-6 text-center">

        <div className="flex items-center justify-center gap-2">

          <ShieldCheck className="h-5 w-5 text-violet-400" />

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-violet-400
            "
          >
            Email Verification
          </span>

        </div>


        <h1
          className="
            mt-4
            text-2xl
            font-bold
            text-white
            sm:text-3xl
          "
        >
          Verify your email
        </h1>


        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-400
          "
        >
          We sent a 6-digit verification code to
        </p>


        <p
          className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-violet-400
          "
        >
          {email}
        </p>

      </div>


      {/* SUCCESS INFORMATION */}

      <div
        className="
          mt-7
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-emerald-500/10
          bg-emerald-500/5
          p-4
        "
      >

        <CheckCircle2
          className="
            mt-0.5
            h-5
            w-5
            shrink-0
            text-emerald-400
          "
        />

        <p
          className="
            text-xs
            leading-5
            text-slate-400
          "
        >
          Enter the verification code sent
          to your email to complete your
          registration.
        </p>

      </div>


      {/* FORM */}

      <form
        onSubmit={handleVerify}
        className="mt-8"
      >

        <label
          className="
            mb-4
            block
            text-center
            text-sm
            font-medium
            text-slate-300
          "
        >
          Enter verification code
        </label>


        {/* OTP INPUT */}

        <OtpInput
          value={otp}
          onChange={setOtp}
          disabled={loading}
        />


        {/* TIMER */}

        <div className="mt-6 text-center">

          {timeLeft > 0 ? (

            <p className="text-sm text-slate-500">

              OTP expires in{" "}

              <span
                className="
                  font-semibold
                  text-violet-400
                "
              >
                {formatTime(timeLeft)}
              </span>

            </p>

          ) : (

            <p className="text-sm text-rose-400">

              This OTP has expired

            </p>

          )}

        </div>


        {/* VERIFY BUTTON */}

        <button
          type="submit"
          disabled={
            loading ||
            timeLeft <= 0
          }
          className="
            mt-7
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          {loading ? (

            <>
              <Loader2 className="h-4 w-4 animate-spin" />

              Verifying...

            </>

          ) : (

            <>
              Verify & Continue

              <CheckCircle2 className="h-4 w-4" />
            </>

          )}

        </button>

      </form>


      {/* RESEND */}

      <div className="mt-7 text-center">

        <p className="text-sm text-slate-500">

          Didn't receive the code?

        </p>


        <button
          type="button"
          onClick={handleResend}
          disabled={
            resending ||
            loading
          }
          className="
            mt-2
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-violet-400
            transition
            hover:text-violet-300
            disabled:opacity-50
          "
        >

          {resending && (

            <Loader2 className="h-4 w-4 animate-spin" />

          )}

          {!resending && (

            <RefreshCw className="h-4 w-4" />

          )}

          Resend OTP

        </button>

      </div>


      {/* DIVIDER */}

      <div className="my-7 flex items-center gap-4">

        <div className="h-px flex-1 bg-white/10" />

        <span className="text-xs text-slate-600">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />

      </div>


      {/* BACK */}

      <Link
        href="/register"
        className="
          flex
          items-center
          justify-center
          gap-2
          text-sm
          text-slate-400
          transition
          hover:text-white
        "
      >

        <ArrowLeft className="h-4 w-4" />

        Back to registration

      </Link>

    </div>
  );
}