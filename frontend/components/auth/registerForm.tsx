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
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  PenLine,
  BookOpen,
  User,
} from "lucide-react";
import { clearAuthError, registerUser } from "@/redux/slice/auth/authSlice";
import { AppDispatch } from "@/redux/store/store";
import type { RootState } from "@/redux/store/store";


export default function RegisterForm() {

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
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "user" as
        | "user"
        | "author",
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
          registerUser(
            formData
          )
        );


      if (
        registerUser.fulfilled.match(
          result
        )
      ) {

        router.push(
          `/verifyOtp?email=${encodeURIComponent(
            result.payload.email,
          )}`
        );

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


      {/* Name */}

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
          Full name
        </label>


        <div
          className="
            relative
          "
        >

          <User
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
            type="text"
            name="name"

            value={
              formData.name
            }

            onChange={
              handleChange
            }

            placeholder="
              Your full name
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
              outline-none
              transition
              focus:border-violet-500/60
              focus:ring-4
              focus:ring-violet-500/10
            "
          />

        </div>

      </div>


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
              outline-none
              transition
              focus:border-violet-500/60
              focus:ring-4
              focus:ring-violet-500/10
            "
          />

        </div>

      </div>


      {/* Phone */}

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
          Phone
          <span
            className="
              ml-1
              text-zinc-600
            "
          >
            optional
          </span>
        </label>


        <div
          className="
            relative
          "
        >

          <Phone
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
            type="tel"
            name="phone"

            value={
              formData.phone
            }

            onChange={
              handleChange
            }

            placeholder="
              Your phone number
            "

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
              outline-none
              transition
              focus:border-violet-500/60
              focus:ring-4
              focus:ring-violet-500/10
            "
          />

        </div>

      </div>


      {/* Role */}

      <div>

        <label
          className="
            mb-3
            block
            text-sm
            font-medium
            text-zinc-300
          "
        >
          How do you want to use BlogSpace?
        </label>


        <div
          className="
            grid
            grid-cols-2
            gap-3
          "
        >

          <button
            type="button"

            onClick={() =>
              setFormData({
                ...formData,
                role: "user",
              })
            }

            className={`
              rounded-xl
              border
              p-4
              text-left
              transition

              ${
                formData.role ===
                "user"
                  ? `
                    border-violet-500
                    bg-violet-500/10
                  `
                  : `
                    border-white/10
                    bg-white/[0.03]
                    hover:border-white/20
                  `
              }
            `}
          >

            <BookOpen
              size={20}
              className="
                mb-3
                text-violet-400
              "
            />

            <p
              className="
                text-sm
                font-medium
              "
            >
              user
            </p>

            <p
              className="
                mt-1
                text-xs
                text-zinc-500
              "
            >
              Discover great stories.
            </p>

          </button>


          <button
            type="button"

            onClick={() =>
              setFormData({
                ...formData,
                role: "author",
              })
            }

            className={`
              rounded-xl
              border
              p-4
              text-left
              transition

              ${
                formData.role ===
                "author"
                  ? `
                    border-fuchsia-500
                    bg-fuchsia-500/10
                  `
                  : `
                    border-white/10
                    bg-white/[0.03]
                    hover:border-white/20
                  `
              }
            `}
          >

            <PenLine
              size={20}
              className="
                mb-3
                text-fuchsia-400
              "
            />

            <p
              className="
                text-sm
                font-medium
              "
            >
              Author
            </p>

            <p
              className="
                mt-1
                text-xs
                text-zinc-500
              "
            >
              Write and share stories.
            </p>

          </button>

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
              Create a secure password
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
              outline-none
              transition
              focus:border-violet-500/60
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
          shadow-lg
          shadow-violet-500/20
          transition
          hover:scale-[1.01]
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
              Create account

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


      {/* Login */}

      <p
        className="
          pt-2
          text-center
          text-sm
          text-zinc-500
        "
      >
        Already have an account?

        {" "}

        <Link
          href="/login"

          className="
            font-medium
            text-violet-400
            hover:text-violet-300
          "
        >
          Sign in
        </Link>

      </p>

    </form>
  );
}