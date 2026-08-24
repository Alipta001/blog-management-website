"use client";

import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import {
  BadgeCheck,
  FileText,
  ImagePlus,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import type { User } from "@/types/user.types";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  updateMyProfile,
} from "@/redux/slice/user/userSlice";

import {
  setAuthUser,
} from "@/redux/slice/auth/authSlice";


 
// TYPES
 

interface ProfileInformationFormProps {
  user: User;
}

interface ProfileFormValues {
  name: string;
  phone: string;
  address: string;
  bio: string;
}


 
// VALIDATION
 

const profileSchema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(
      2,
      "Name must contain at least 2 characters",
    )
    .max(
      100,
      "Name cannot exceed 100 characters",
    ),

  phone: yup
    .string()
    .defined()
    .test(
      "phone",
      "Please enter a valid phone number",
      (value) => {
        if (!value) {
          return true;
        }

        return /^[0-9+\-\s()]{7,20}$/.test(
          value,
        );
      },
    ),

  address: yup
    .string()
    .max(
      300,
      "Address cannot exceed 300 characters",
    )
    .defined(),

  bio: yup
    .string()
    .max(
      500,
      "Bio cannot exceed 500 characters",
    )
    .defined(),
});


 
// COMPONENT
 

export default function ProfileInformationForm({
  user,
}: ProfileInformationFormProps) {

  const dispatch = useAppDispatch();

  const {
    loading,
  } = useAppSelector(
    (state) => state.user,
  );


   
  // IMAGE STATE
   

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState<File | null>(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState<string | null>(
    user.profileImage || null,
  );


   
  // FORM
   

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(
      profileSchema,
    ),

    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || "",
    },
  });


   
  // WATCH BIO
   

  const bioValue =
    watch("bio") || "";


   
  // UPDATE FORM WHEN PROFILE CHANGES
   

  useEffect(() => {
    reset({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || "",
    });

    setImagePreview(
      user.profileImage || null,
    );

    setSelectedImage(null);
  }, [
    user,
    reset,
  ]);


   
  // IMAGE SELECT
   

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }


    // ---------------------------------
    // Validate file type
    // ---------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (
      !allowedTypes.includes(
        file.type,
      )
    ) {
      alert(
        "Only JPG, PNG and WEBP images are allowed.",
      );

      event.target.value = "";

      return;
    }


    // ---------------------------------
    // Validate file size
    // ---------------------------------

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "Image size cannot exceed 5MB.",
      );

      event.target.value = "";

      return;
    }


    // ---------------------------------
    // Store file
    // ---------------------------------

    setSelectedImage(file);


    // ---------------------------------
    // Create preview
    // ---------------------------------

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(
      previewUrl,
    );
  };


   
  // REMOVE IMAGE
   

  const handleRemoveImage = () => {

    setSelectedImage(null);

    setImagePreview(
      user.profileImage || null,
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


   
  // SUBMIT
   

const onSubmit = async (
  data: ProfileFormValues,
) => {

  try {

    const formData =
      new FormData();


    formData.append(
      "name",
      data.name.trim(),
    );

    formData.append(
      "phone",
      data.phone.trim(),
    );

    formData.append(
      "address",
      data.address.trim(),
    );

    formData.append(
      "bio",
      data.bio.trim(),
    );
    if (selectedImage) {

      formData.append(
        "profileImage",
        selectedImage,
      );

    }

    const updatedProfile = await dispatch(
      updateMyProfile(formData),
    ).unwrap();

    dispatch(
      setAuthUser(updatedProfile.user),
    );

  } catch (error) {

    console.error(
      "Profile update failed:",
      error,
    );

  }

};

  const roleLabel =
    user.role
      ? user.role.charAt(0).toUpperCase() +
        user.role.slice(1)
      : "User";


  const statusLabel =
    user.status
      ? user.status.charAt(0).toUpperCase() +
        user.status.slice(1)
      : "Unknown";


  return (

    <section
      className="
        rounded-2xl
        border border-white/10
        bg-[#09090b]
      "
    >

      {/*                             =====
          HEADER
                                  ===== */}

      <div
        className="
          border-b border-white/10
          px-6 py-5
        "
      >

        <h2
          className="
            text-base
            font-semibold
            text-white
          "
        >
          Personal Information
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Update your personal details and
          profile information.
        </p>

      </div>


      {/*                             =====
          FORM
                                  ===== */}

      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
        className="p-6"
      >

        {/*                             =====
            PROFILE IMAGE
                                    ===== */}

        <div
          className="
            mb-8
            flex
            flex-col
            items-center
            gap-4
            sm:flex-row
            sm:items-start
          "
        >

          {/* Image */}

          <div
            className="
              relative
              h-24
              w-24
              shrink-0
            "
          >

            {imagePreview ? (

              <img
                src={imagePreview}
                alt="Profile"
                className="
                  h-24
                  w-24
                  rounded-full
                  border
                  border-white/10
                  object-cover
                "
              />

            ) : (

              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                "
              >

                <UserRound
                  className="
                    h-10
                    w-10
                    text-slate-600
                  "
                />

              </div>
            )}


            {/* Remove selected image */}

            {selectedImage && (

              <button
                type="button"
                onClick={
                  handleRemoveImage
                }
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-red-500
                  text-white
                  transition
                  hover:bg-red-400
                "
              >

                <X className="h-3 w-3" />

              </button>
            )}

          </div>


          {/* Upload information */}

          <div>

            <h3
              className="
                text-sm
                font-medium
                text-white
              "
            >
              Profile Picture
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              JPG, PNG or WEBP. Maximum
              size 5MB.
            </p>


            <div className="mt-3">

              <input
                ref={fileInputRef}
                type="file"
                accept="
                  image/jpeg,
                  image/png,
                  image/webp
                "
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >

                <ImagePlus
                  className="h-4 w-4"
                />

                Change Photo

              </button>

            </div>

          </div>

        </div>


        {/*                             =====
            FORM FIELDS
                                    ===== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* FULL NAME */}

          <div className="md:col-span-2">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Full Name
            </label>

            <div className="relative">

              <UserRound
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/50
                  focus:bg-white/[0.05]
                "
              />

            </div>

            {errors.name && (
              <p className="mt-2 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}

          </div>


          {/* EMAIL */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="email"
                value={user.email || ""}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-500
                  outline-none
                "
              />

            </div>

          </div>


          {/* PHONE */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Phone Number
            </label>

            <div className="relative">

              <Phone
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/50
                  focus:bg-white/[0.05]
                "
              />

            </div>

            {errors.phone && (
              <p className="mt-2 text-xs text-red-400">
                {errors.phone.message}
              </p>
            )}

          </div>


          {/* ROLE */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Role
            </label>

            <div className="relative">

              <ShieldCheck
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                value={roleLabel}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-500
                  outline-none
                "
              />

            </div>

          </div>


          {/* STATUS */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Account Status
            </label>

            <div className="relative">

              <BadgeCheck
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                value={statusLabel}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-500
                  outline-none
                "
              />

            </div>

          </div>


          {/* BIO */}

          <div className="md:col-span-2">

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Bio
              </label>

              <span className="text-xs text-slate-600">
                {bioValue.length}/500
              </span>

            </div>

            <div className="relative">

              <FileText
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-4
                  h-4
                  w-4
                  text-slate-500
                "
              />

              <textarea
                rows={5}
                placeholder="Tell us something about yourself..."
                {...register("bio")}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/50
                  focus:bg-white/[0.05]
                "
              />

            </div>

            {errors.bio && (
              <p className="mt-2 text-xs text-red-400">
                {errors.bio.message}
              </p>
            )}

          </div>


          {/* ADDRESS */}

          <div className="md:col-span-2">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Address
            </label>

            <div className="relative">

              <MapPin
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-4
                  h-4
                  w-4
                  text-slate-500
                "
              />

              <textarea
                rows={4}
                placeholder="Enter your address"
                {...register("address")}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/50
                  focus:bg-white/[0.05]
                "
              />

            </div>

            {errors.address && (
              <p className="mt-2 text-xs text-red-400">
                {errors.address.message}
              </p>
            )}

          </div>

        </div>


        {/*                             =====
            ACTIONS
                                    ===== */}

        <div
          className="
            mt-6
            flex
            justify-end
            border-t
            border-white/10
            pt-6
          "
        >

          <button
            type="submit"
            disabled={
              loading ||
              (!isDirty && !selectedImage)
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-violet-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-violet-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {loading ? (

              <Loader2
                className="
                  h-4
                  w-4
                  animate-spin
                "
              />

            ) : (

              <Save className="h-4 w-4" />

            )}

            {loading
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </form>

    </section>
  );
}