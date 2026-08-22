"use client";

import {
  useEffect,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  clearUserError,
  clearUserSuccessMessage,
  getMyProfile,
} from "@/redux/slice/user/userSlice";

import ProfileHeader from "./profileHeader";
import ProfileInformationForm from "./profileInformationForm";
import ProfileSkeleton from "./profileSkeleton";
import ProfileOverview from "./profileOverview";


export default function AuthorProfilePage() {
  const dispatch =
    useAppDispatch();


  const {
    profile,
    loading,
    error,
    successMessage,
  } = useAppSelector(
    (state) => state.user,
  );


  // =================================
  // LOAD PROFILE
  // =================================

  useEffect(() => {
    dispatch(
      getMyProfile(),
    );


    return () => {
      dispatch(
        clearUserError(),
      );

      dispatch(
        clearUserSuccessMessage(),
      );
    };
  }, [dispatch]);


  // =================================
  // INITIAL LOADING
  // =================================

  if (
    loading &&
    !profile
  ) {
    return (
      <ProfileSkeleton />
    );
  }


  // =================================
  // PROFILE NOT FOUND
  // =================================

  if (!profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-white/10 bg-[#09090b]">

        <p className="text-sm text-slate-500">
          Unable to load your profile.
        </p>

      </div>
    );
  }


  // =================================
  // RENDER
  // =================================

  return (
    <div className="space-y-6">

      {/* =================================
          HEADER
      ================================= */}

      <ProfileHeader />


      {/* =================================
          ERROR
      ================================= */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}


      {/* =================================
          SUCCESS
      ================================= */}

      {successMessage && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {successMessage}
        </div>
      )}


      {/* =================================
          PROFILE CONTENT
      ================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">

        {/* =================================
            LEFT
        ================================= */}

        <ProfileOverview
          user={profile}
        />


        {/* =================================
            RIGHT
        ================================= */}

        <ProfileInformationForm
          user={profile}
        />

      </div>

    </div>
  );
}