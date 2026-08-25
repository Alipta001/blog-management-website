"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearUserError,
  clearUserSuccessMessage,
  getMyProfile,
} from "@/redux/slice/user/userSlice";

import ProfileHeader from "@/components/author/profile/profileHeader";
import ProfileInformationForm from "@/components/author/profile/profileInformationForm";
import ProfileOverview from "@/components/author/profile/profileOverview";
import ProfileSkeleton from "@/components/author/profile/profileSkeleton";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, loading, error, successMessage } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyProfile());

    return () => {
      dispatch(clearUserError());
      dispatch(clearUserSuccessMessage());
    };
  }, [dispatch]);

  if (loading && !profile) return <ProfileSkeleton />;

  if (!profile) {
    return (
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#09090b]">
        <p className="text-sm text-slate-500">Unable to load your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader />

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
      {successMessage && <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{successMessage}</div>}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <ProfileOverview user={profile} />
        <ProfileInformationForm user={profile} />
      </div>
    </div>
  );
}
