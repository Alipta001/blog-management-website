"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, KeyRound, Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";

import { useAppDispatch } from "@/redux/hooks";
import { changePassword } from "@/redux/slice/auth/authSlice";

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePasswordSchema: yup.ObjectSchema<ChangePasswordFormValues> = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required").min(8, "New password must contain at least 8 characters").max(128, "New password cannot exceed 128 characters"),
  confirmPassword: yup.string().required("Please confirm your new password").oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

const fields = [
  { name: "currentPassword", label: "Current password", placeholder: "Enter your current password" },
  { name: "newPassword", label: "New password", placeholder: "Enter a new password" },
  { name: "confirmPassword", label: "Confirm new password", placeholder: "Repeat your new password" },
] as const;

export default function ChangePasswordForm() {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<ChangePasswordFormValues>({ mode: "onChange", resolver: yupResolver(changePasswordSchema), defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" } });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await dispatch(changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword, confirmPassword: data.confirmPassword })).unwrap();
      reset();
      toast.success("Password updated successfully.");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to update password.");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400"><KeyRound className="h-5 w-5" /></span><div><h2 className="text-base font-semibold text-slate-900 dark:text-white">Change password</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update your password to keep your account secure.</p></div></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 p-6 md:grid-cols-3">
        {fields.map((field) => { const isVisible = visible[field.name]; const error = errors[field.name]; return <div key={field.name}><label htmlFor={field.name} className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</label><div className="relative"><input id={field.name} type={isVisible ? "text" : "password"} autoComplete={field.name === "currentPassword" ? "current-password" : "new-password"} placeholder={field.placeholder} {...register(field.name)} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500" /><button type="button" aria-label={isVisible ? `Hide ${field.label}` : `Show ${field.label}`} onClick={() => setVisible((current) => ({ ...current, [field.name]: !current[field.name] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-600 dark:hover:text-violet-400">{isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{error && <p className="mt-2 text-xs text-red-500 dark:text-red-400">{error.message}</p>}</div>; })}
        <div className="md:col-span-3 flex justify-end"><button type="submit" disabled={isSubmitting || !isValid} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Update password</button></div>
      </form>
    </section>
  );
}
