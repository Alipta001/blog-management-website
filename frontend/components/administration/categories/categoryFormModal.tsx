"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  X,
  Loader2,
  FolderPlus,
  Pencil,
} from "lucide-react";

import type {
  Category,
} from "@/types/category.types";


interface CategoryFormData {
  name: string;

  description?: string;

  image?: string;
}


interface CategoryFormModalProps {
  open: boolean;

  onClose: () => void;

  category?: Category | null;

  onSubmit: (
    data: CategoryFormData,
  ) => Promise<void> | void;

  loading?: boolean;
}


export default function CategoryFormModal({
  open,
  onClose,
  category = null,
  onSubmit,
  loading = false,
}: CategoryFormModalProps) {

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);


  // =================================
  // POPULATE FORM FOR EDIT
  // =================================

  useEffect(() => {

    if (category) {

      setName(
        category.name || "",
      );

      setDescription(
        category.description || "",
      );

      setImage(
        category.image || "",
      );

    } else {

      setName("");

      setDescription("");

      setImage("");

    }


    setError(null);

  }, [category, open]);


  // =================================
  // CLOSE
  // =================================

  const handleClose = () => {

    if (loading) {
      return;
    }

    setError(null);

    onClose();

  };


  // =================================
  // SUBMIT
  // =================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {

    event.preventDefault();

    setError(null);


    if (!name.trim()) {

      setError(
        "Category name is required",
      );

      return;

    }


    if (
      name.trim().length < 2
    ) {

      setError(
        "Category name must contain at least 2 characters",
      );

      return;

    }


    try {

      await onSubmit({

        name:
          name.trim(),

        description:
          description.trim() ||
          undefined,

        image:
          image.trim() ||
          undefined,

      });

    } catch (error: unknown) {

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setError(message);

    }

  };


  if (!open) {
    return null;
  }


  const isEditMode =
    Boolean(category);


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        px-4
        backdrop-blur-sm
      "
    >

      <div
        className="
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#111827]
          shadow-2xl
        "
      >

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-6
            py-5
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-violet-500/10
                text-violet-400
              "
            >

              {isEditMode ? (

                <Pencil className="h-5 w-5" />

              ) : (

                <FolderPlus className="h-5 w-5" />

              )}

            </div>


            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >

                {isEditMode
                  ? "Edit Category"
                  : "Create Category"}

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                {isEditMode
                  ? "Update category information."
                  : "Add a new category for blog articles."}

              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <X className="h-5 w-5" />

          </button>

        </div>


        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="space-y-5">


            {/* ERROR */}

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


            {/* CATEGORY NAME */}

            <div>

              <label
                htmlFor="category-name"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >

                Category Name

                <span className="ml-1 text-red-400">
                  *
                </span>

              </label>


              <input
                id="category-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value,
                  )
                }
                disabled={loading}
                placeholder="e.g. Technology"
                maxLength={100}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/60
                  focus:ring-2
                  focus:ring-violet-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label
                htmlFor="category-description"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >

                Description

                <span className="ml-1 text-slate-600">
                  (Optional)
                </span>

              </label>


              <textarea
                id="category-description"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value,
                  )
                }
                disabled={loading}
                placeholder="Write a short description..."
                rows={4}
                maxLength={500}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/60
                  focus:ring-2
                  focus:ring-violet-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

            </div>


            {/* IMAGE URL */}

            <div>

              <label
                htmlFor="category-image"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >

                Image URL

                <span className="ml-1 text-slate-600">
                  (Optional)
                </span>

              </label>


              <input
                id="category-image"
                type="url"
                value={image}
                onChange={(event) =>
                  setImage(
                    event.target.value,
                  )
                }
                disabled={loading}
                placeholder="https://example.com/image.jpg"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-violet-500/60
                  focus:ring-2
                  focus:ring-violet-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

            </div>

          </div>


          {/* ========================= */}
          {/* ACTIONS */}
          {/* ========================= */}

          <div
            className="
              mt-7
              flex
              justify-end
              gap-3
            "
          >

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-white/10
                px-5
                py-2.5
                text-sm
                font-medium
                text-slate-400
                transition
                hover:bg-white/5
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              Cancel

            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                flex
                min-w-[140px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-violet-600
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-violet-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (

                <>

                  <Loader2 className="h-4 w-4 animate-spin" />

                  Processing...

                </>

              ) : isEditMode ? (

                "Save Changes"

              ) : (

                "Create Category"

              )}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}