"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  useDispatch,
  useSelector,
} from "react-redux";


import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { clearAuthError, loginUser } from "@/redux/slice/auth/authSlice";
import { AppDispatch } from "@/redux/store/store";
import type { RootState } from "@/redux/store/store";


export default function LoginForm() {

  const router =
    useRouter();


  const dispatch =
    useDispatch<AppDispatch>();


  const {
    loading,
    error,
  } =
    useSelector(
      (state: RootState) =>
        state.auth
    );


  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);


  const [
    formData,
    setFormData,
  ] =
    useState({
      email: "",
      password: "",
    });


  const handleChange = (
    event:
      React.ChangeEvent<
        HTMLInputElement
      >
  ) => {

    setFormData({
      ...formData,

      [
        event.target.name
      ]:
        event.target.value,
    });

  };


  const handleSubmit =
    async (
      event:
        React.FormEvent
    ) => {

      event.preventDefault();


      dispatch(
        clearAuthError()
      );


      const result =
        await dispatch(
          loginUser(
            formData
          )
        );


      if (
        loginUser.fulfilled.match(
          result
        )
      ) {

        const role =
          result.payload.user.role;


        if (
          role === "administration"
        ) {
          router.push(
            "/dashboard/administration"
          );
        }

        else if (
          role === "author"
        ) {
          router.push(
            "/dashboard/author"
          );
        }

        else if (
          role === "user"
        ) {
          router.push(
            "/dashboard/reader"
          );
        }

        else {
          router.push(
            "/dashboard"
          );
        }

      }

    };


  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        space-y-5
      "
    >

      {/* Error */}

      {error && (

        <div
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-400
          "
        >
          {error}
        </div>

      )}


      {/* Email */}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-300
          "
        >
          Email address
        </label>


        <div
          className="
            relative
          "
        >

          <Mail
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />


          <input
            type="email"

            name="email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            placeholder="
              you@example.com
            "

            required

            className="
              h-13
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              pl-12
              pr-4
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-zinc-600
              focus:border-violet-500/60
              focus:bg-white/[0.06]
              focus:ring-4
              focus:ring-violet-500/10
            "
          />

        </div>

      </div>


      {/* Password */}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-300
          "
        >
          Password
        </label>


        <div
          className="
            relative
          "
        >

          <Lock
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />


          <input
            type={
              showPassword
                ? "text"
                : "password"
            }

            name="password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            placeholder="
              Enter your password
            "

            required

            className="
              h-13
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              pl-12
              pr-12
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-zinc-600
              focus:border-violet-500/60
              focus:bg-white/[0.06]
              focus:ring-4
              focus:ring-violet-500/10
            "
          />


          <button
            type="button"

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
              transition
              hover:text-white
            "
          >

            {showPassword
              ? (
                <EyeOff
                  size={19}
                />
              )
              : (
                <Eye
                  size={19}
                />
              )}

          </button>

        </div>

      </div>


      {/* Remember / Forgot */}

      <div
        className="
          flex
          items-center
          justify-between
          text-sm
        "
      >

        <label
          className="
            flex
            cursor-pointer
            items-center
            gap-2
            text-zinc-400
          "
        >

          <input
            type="checkbox"
            className="
              h-4
              w-4
              rounded
              border-white/20
              bg-transparent
            "
          />

          Remember me

        </label>


        <Link
          href="/forgot-password"

          className="
            font-medium
            text-violet-400
            transition
            hover:text-violet-300
          "
        >
          Forgot password?
        </Link>

      </div>


      {/* Submit */}

      <button
        type="submit"

        disabled={
          loading
        }

        className="
          group
          flex
          h-13
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-fuchsia-600
          font-medium
          text-white
          shadow-lg
          shadow-violet-600/20
          transition
          hover:scale-[1.01]
          hover:shadow-violet-600/30
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >

        {loading
          ? (
            <Loader2
              size={20}
              className="
                animate-spin
              "
            />
          )
          : (
            <>
              Sign in

              <ArrowRight
                size={19}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </>
          )}

      </button>


      {/* Register */}

      <p
        className="
          pt-3
          text-center
          text-sm
          text-zinc-500
        "
      >
        New to BlogSpace?

        {" "}

        <Link
          href="/register"

          className="
            font-medium
            text-violet-400
            hover:text-violet-300
          "
        >
          Create an account
        </Link>

      </p>

    </form>
  );
}