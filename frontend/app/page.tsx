"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useSelector,
} from "react-redux";

import type {
  RootState,
} from "@/redux/store/store";


export default function Home() {

  const router =
    useRouter();


  const {
    user,
    loading,
    isAuthenticated,
    authInitialized,
  } =
    useSelector(
      (state: RootState) =>
        state.auth
    );


  useEffect(() => {

    // Wait until authentication
    // initialization is complete

    if (
      !authInitialized ||
      loading
    ) {

      return;

    }


    // User is not authenticated

    if (
      !isAuthenticated ||
      !user
    ) {

      router.replace(
        "/login"
      );

      return;

    }


    // Redirect based on role

    switch (
      user.role
    ) {

      case "administration":

        router.replace(
          "/dashboard/administration"
        );

        break;


      case "author":

        router.replace(
          "/dashboard/author"
        );

        break;



      case "user":

        router.replace(
          "/dashboard/reader"
        );

        break;


      default:

        router.replace(
          "/login"
        );

    }

  }, [
    user,
    loading,
    isAuthenticated,
    authInitialized,
    router,
  ]);


  return (

    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#09090b]
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
          gap-4
        "
      >

        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-zinc-700
            border-t-violet-500
          "
        />


        <p
          className="
            text-sm
            text-zinc-400
          "
        >
          Loading GolpoKotha...
        </p>

      </div>

    </div>

  );

}