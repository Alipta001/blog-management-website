"use client";

import {
  Suspense,
} from "react";

import Link from "next/link";

import {
  FileText,
} from "lucide-react";

import {
  useSearchParams,
} from "next/navigation";

import VerifyOtpForm from
  "@/components/auth/verifyOtp/verifyOtpForm";


function VerifyOtpContent() {
  const searchParams =
    useSearchParams();

  const email =
    searchParams.get("email");


  //                             =
  // EMAIL NOT PROVIDED
  //                             =

  if (!email) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#09090b]
          px-4
        "
      >

        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-white/10
            bg-[#111114]
            p-8
            text-center
          "
        >

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-violet-500/10
              text-violet-400
            "
          >

            <FileText className="h-6 w-6" />

          </div>


          <h1 className="mt-5 text-xl font-bold text-white">

            Email not found

          </h1>


          <p className="mt-2 text-sm text-slate-400">

            Please register first to receive
            a verification code.

          </p>


          <Link
            href="/register"
            className="
              mt-6
              inline-flex
              rounded-xl
              bg-violet-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-violet-500
            "
          >

            Go to registration

          </Link>

        </div>

      </main>
    );
  }


  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#09090b]
        px-4
        py-10
      "
    >

      {/* BACKGROUND EFFECT */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-violet-600/10
          blur-[140px]
        "
      />


      {/* CONTENT */}

      <div className="relative z-10 w-full max-w-md">

        {/* LOGO */}

        <Link
          href="/"
          className="
            mb-8
            flex
            items-center
            justify-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-violet-600
              text-white
            "
          >

            <FileText className="h-5 w-5" />

          </div>


          <span
            className="
              text-xl
              font-bold
              text-white
            "
          >
            Blog Management
          </span>

        </Link>


        {/* OTP FORM */}

        <VerifyOtpForm
          email={email}
        />


        {/* FOOTER */}

        <p
          className="
            mt-8
            text-center
            text-xs
            text-slate-600
          "
        >

          © {new Date().getFullYear()} Blog Management.
          All rights reserved.

        </p>

      </div>

    </main>
  );
}


export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4">
          <p className="text-sm text-slate-400">
            Loading verification...
          </p>
        </main>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}