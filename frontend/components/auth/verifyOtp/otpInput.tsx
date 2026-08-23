"use client";

import {
  useEffect,
  useRef,
} from "react";

interface OtpInputProps {
  value: string[];
  onChange: (
    value: string[],
  ) => void;
  disabled?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  disabled = false,
}: OtpInputProps) {
  const inputRefs =
    useRef<
      Array<HTMLInputElement | null>
    >([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    inputValue: string,
    index: number,
  ) => {
    const numericValue =
      inputValue.replace(
        /\D/g,
        "",
      );

    // Handle paste of complete OTP
    if (numericValue.length > 1) {
      const digits =
        numericValue
          .slice(0, 6)
          .split("");

      const newValue =
        Array(6).fill("");

      digits.forEach(
        (digit, digitIndex) => {
          newValue[digitIndex] =
            digit;
        },
      );

      onChange(newValue);

      const nextIndex =
        Math.min(
          digits.length,
          5,
        );

      inputRefs.current[
        nextIndex
      ]?.focus();

      return;
    }

    const newValue = [...value];

    newValue[index] =
      numericValue;

    onChange(newValue);

    if (
      numericValue &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    event:
      React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      event.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      event.preventDefault();

      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < 5
    ) {
      event.preventDefault();

      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handlePaste = (
    event:
      React.ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const pastedValue =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedValue) {
      return;
    }

    const newValue =
      Array(6).fill("");

    pastedValue
      .split("")
      .forEach(
        (digit, index) => {
          newValue[index] =
            digit;
        },
      );

    onChange(newValue);

    const nextIndex =
      Math.min(
        pastedValue.length,
        5,
      );

    inputRefs.current[
      nextIndex
    ]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {value.map(
        (digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] =
                element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(event) =>
              handleChange(
                event.target.value,
                index,
              )
            }
            onKeyDown={(event) =>
              handleKeyDown(
                event,
                index,
              )
            }
            onPaste={handlePaste}
            className="
              h-12
              w-11
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-center
              text-xl
              font-bold
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-violet-500
              focus:bg-violet-500/5
              focus:ring-4
              focus:ring-violet-500/10
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:h-14
              sm:w-12
            "
          />
        ),
      )}
    </div>
  );
}