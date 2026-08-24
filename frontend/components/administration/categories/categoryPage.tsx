"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FolderOpen,
  FolderCheck,
  FolderX,
  Plus,
  Search,
  Loader2,
  Pencil,
  Trash2,
  Power,
  PowerOff,
  X,
} from "lucide-react";

import { toast } from "react-toastify";

import type {
  Category,
} from "@/types/category.types";

import {
  activateCategory,
  clearCategoryError,
  clearCategorySuccessMessage,
  createCategory,
  deactivateCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/redux/slice/category/categorySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import CategoryFormModal from "./categoryFormModal";


 
// CATEGORY FORM DATA
 

interface CategoryFormData {

  name: string;

  description?: string;

  image?: string;

}


 
// CATEGORY PAGE
 

export default function CategoryPage() {

  const dispatch =
    useAppDispatch();


  const {
    categories,
    loading,
    error,
    successMessage,
  } =
    useAppSelector(
      (state) =>
        state.category,
    );


   
  // LOCAL STATE
   

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      "all" |
      "active" |
      "inactive"
    >("all");


  const [isModalOpen, setIsModalOpen] =
    useState(false);


  const [
    selectedCategory,
    setSelectedCategory,
  ] =
    useState<Category | null>(
      null,
    );


  const [
    deletingId,
    setDeletingId,
  ] =
    useState<string | null>(
      null,
    );


   
  // FETCH CATEGORIES
   

  useEffect(() => {

    dispatch(
      getCategories(),
    );

  }, [dispatch]);


   
  // HANDLE ERROR
   

  useEffect(() => {

    if (!error) {
      return;
    }


    toast.error(
      error,
    );


    dispatch(
      clearCategoryError(),
    );

  }, [
    error,
    dispatch,
  ]);


   
  // HANDLE SUCCESS
   

  useEffect(() => {

    if (!successMessage) {
      return;
    }


    toast.success(
      successMessage,
    );


    dispatch(
      clearCategorySuccessMessage(),
    );

  }, [
    successMessage,
    dispatch,
  ]);


   
  // STATISTICS
   

  const total =
    categories?.length || 0;


  const active =
    categories?.filter(
      (category) =>
        category.isActive,
    ).length || 0;


  const inactive =
    categories?.filter(
      (category) =>
        !category.isActive,
    ).length || 0;


   
  // FILTERED CATEGORIES
   

  const filteredCategories =
    useMemo(() => {

      return (
        categories || []
      ).filter(
        (category) => {

          const searchValue =
            search
              .trim()
              .toLowerCase();


          const matchesSearch =
            !searchValue ||
            category.name
              ?.toLowerCase()
              .includes(
                searchValue,
              ) ||
            category.description
              ?.toLowerCase()
              .includes(
                searchValue,
              );


          const matchesStatus =
            statusFilter === "all" ||
            (
              statusFilter === "active" &&
              category.isActive
            ) ||
            (
              statusFilter === "inactive" &&
              !category.isActive
            );


          return (
            matchesSearch &&
            matchesStatus
          );

        },
      );

    }, [
      categories,
      search,
      statusFilter,
    ]);


   
  // OPEN CREATE MODAL
   

  const handleCreate = () => {

    setSelectedCategory(
      null,
    );

    setIsModalOpen(
      true,
    );

  };


   
  // OPEN EDIT MODAL
   

  const handleEdit = (
    category: Category,
  ) => {

    setSelectedCategory(
      category,
    );

    setIsModalOpen(
      true,
    );

  };


   
  // CLOSE MODAL
   

  const handleCloseModal = () => {

    if (loading) {
      return;
    }


    setIsModalOpen(
      false,
    );

    setSelectedCategory(
      null,
    );

  };


   
  // CREATE / UPDATE CATEGORY
   

  const handleCategorySubmit =
    async (
      data: CategoryFormData,
    ) => {

      try {

        if (selectedCategory) {

          await dispatch(

            updateCategory({

              id:
                selectedCategory._id,

              data,

            }),

          ).unwrap();

        }

        else {

          await dispatch(

            createCategory(
              data,
            ),

          ).unwrap();

        }


        setIsModalOpen(
          false,
        );

        setSelectedCategory(
          null,
        );

      } catch (error) {

        console.error(
          "Category operation failed:",
          error,
        );

      }

    };


   
  // ACTIVATE / DEACTIVATE
   

  const handleToggleStatus =
    async (
      category: Category,
    ) => {

      try {

        if (
          category.isActive
        ) {

          await dispatch(

            deactivateCategory(
              category._id,
            ),

          ).unwrap();

        }

        else {

          await dispatch(

            activateCategory(
              category._id,
            ),

          ).unwrap();

        }

      } catch (error) {

        console.error(
          "Failed to update category status:",
          error,
        );

      }

    };


   
  // DELETE CATEGORY
   

  const handleDelete =
    async (
      id: string,
    ) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this category?",
        );


      if (!confirmed) {
        return;
      }


      try {

        setDeletingId(
          id,
        );


        await dispatch(

          deleteCategory(
            id,
          ),

        ).unwrap();

      } catch (error) {

        console.error(
          "Failed to delete category:",
          error,
        );

      } finally {

        setDeletingId(
          null,
        );

      }

    };


  return (

    <div
      className="
        min-h-full
        space-y-6
        p-4
        sm:p-6
        lg:p-8
      "
    >


      {/*                             = */}
      {/* HEADER */}
      {/*                             = */}

      <div
        className="
          flex
          flex-col
          justify-between
          gap-4
          sm:flex-row
          sm:items-center
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium
              text-violet-400
            "
          >
            CONTENT MANAGEMENT
          </p>


          <h1
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            Categories
          </h1>


          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Manage blog categories and their availability.
          </p>

        </div>


        <button
          type="button"
          onClick={handleCreate}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-violet-500
          "
        >

          <Plus className="h-4 w-4" />

          Add Category

        </button>

      </div>


      {/*                             = */}
      {/* STATS */}
      {/*                             = */}

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >

        {/* TOTAL */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Total Categories
              </p>


              <p
                className="
                  mt-2
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                {total}
              </p>

            </div>


            <div
              className="
                rounded-xl
                bg-violet-500/10
                p-3
                text-violet-400
              "
            >

              <FolderOpen className="h-6 w-6" />

            </div>

          </div>

        </div>


        {/* ACTIVE */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Active
              </p>


              <p
                className="
                  mt-2
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                {active}
              </p>

            </div>


            <div
              className="
                rounded-xl
                bg-emerald-500/10
                p-3
                text-emerald-400
              "
            >

              <FolderCheck className="h-6 w-6" />

            </div>

          </div>

        </div>


        {/* INACTIVE */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Inactive
              </p>


              <p
                className="
                  mt-2
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                {inactive}
              </p>

            </div>


            <div
              className="
                rounded-xl
                bg-amber-500/10
                p-3
                text-amber-400
              "
            >

              <FolderX className="h-6 w-6" />

            </div>

          </div>

        </div>

      </div>


      {/*                             = */}
      {/* CONTENT */}
      {/*                             = */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.02]
        "
      >


        {/*                      ====== */}
        {/* FILTER BAR */}
        {/*                      ====== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-white/10
            p-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              lg:max-w-md
            "
          >

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
            />


            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search categories..."
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                py-2.5
                pl-10
                pr-10
                text-sm
                text-white
                outline-none
                placeholder:text-slate-600
                focus:border-violet-500/60
              "
            />


            {search && (

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                  hover:text-white
                "
              >

                <X className="h-4 w-4" />

              </button>

            )}

          </div>


          {/* STATUS FILTER */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(

                event.target
                  .value as
                  | "all"
                  | "active"
                  | "inactive",

              )
            }
            className="
              rounded-xl
              border
              border-white/10
              bg-[#111827]
              px-4
              py-2.5
              text-sm
              text-slate-300
              outline-none
              focus:border-violet-500/60
            "
          >

            <option value="all">
              All Categories
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>


        {/*                      ====== */}
        {/* LOADING */}
        {/*                      ====== */}

        {loading &&

        categories.length === 0 ? (

          <div
            className="
              flex
              min-h-[350px]
              items-center
              justify-center
            "
          >

            <Loader2
              className="
                h-7
                w-7
                animate-spin
                text-violet-400
              "
            />

          </div>

        ) : filteredCategories.length === 0 ? (

          /*                      ==== */
          /* EMPTY STATE */
          /*                      ==== */

          <div
            className="
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
          >

            <div
              className="
                rounded-2xl
                bg-white/[0.03]
                p-4
              "
            >

              <FolderOpen
                className="
                  h-8
                  w-8
                  text-slate-600
                "
              />

            </div>


            <h3
              className="
                mt-5
                text-base
                font-semibold
                text-white
              "
            >
              No categories found
            </h3>


            <p
              className="
                mt-2
                max-w-sm
                text-sm
                text-slate-500
              "
            >
              Try changing your search or filter criteria.
            </p>


            <button
              type="button"
              onClick={handleCreate}
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-xl
                bg-violet-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                hover:bg-violet-500
              "
            >

              <Plus className="h-4 w-4" />

              Create Category

            </button>

          </div>

        ) : (

          /*                      ==== */
          /* CATEGORY TABLE */
          /*                      ==== */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">


              {/* HEADER */}

              <thead>

                <tr
                  className="
                    border-b
                    border-white/10
                    bg-white/[0.015]
                  "
                >

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Category
                  </th>


                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Description
                  </th>


                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Status
                  </th>


                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Created
                  </th>


                  <th
                    className="
                      px-6
                      py-4
                      text-right
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Actions
                  </th>

                </tr>

              </thead>


              {/* BODY */}

              <tbody>

                {filteredCategories.map(
                  (category) => (

                    <tr
                      key={category._id}
                      className="
                        border-b
                        border-white/[0.06]
                        transition
                        hover:bg-white/[0.025]
                      "
                    >

                      {/* CATEGORY */}

                      <td className="px-6 py-4">

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-violet-500/10
                              font-semibold
                              text-violet-400
                            "
                          >

                            {category.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>


                          <div>

                            <p
                              className="
                                text-sm
                                font-medium
                                text-white
                              "
                            >
                              {category.name}
                            </p>


                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-500
                              "
                            >
                              {category.slug ||
                                "No slug"}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* DESCRIPTION */}

                      <td className="max-w-[300px] px-6 py-4">

                        <p
                          className="
                            line-clamp-2
                            text-sm
                            text-slate-500
                          "
                        >
                          {category.description ||
                            "No description"}

                        </p>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        {category.isActive ? (

                          <span
                            className="
                              rounded-full
                              bg-emerald-500/10
                              px-2.5
                              py-1
                              text-xs
                              font-medium
                              text-emerald-400
                            "
                          >
                            Active
                          </span>

                        ) : (

                          <span
                            className="
                              rounded-full
                              bg-red-500/10
                              px-2.5
                              py-1
                              text-xs
                              font-medium
                              text-red-400
                            "
                          >
                            Inactive
                          </span>

                        )}

                      </td>


                      {/* CREATED */}

                      <td className="px-6 py-4">

                        <span
                          className="
                            text-sm
                            text-slate-500
                          "
                        >

                          {category.createdAt
                            ? new Date(
                                category.createdAt,
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "-"}

                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div
                          className="
                            flex
                            justify-end
                            gap-2
                          "
                        >

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                category,
                              )
                            }
                            disabled={loading}
                            title="Edit category"
                            className="
                              rounded-lg
                              p-2
                              text-slate-500
                              transition
                              hover:bg-violet-500/10
                              hover:text-violet-400
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >

                            <Pencil className="h-4 w-4" />

                          </button>


                          {/* STATUS */}

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(
                                category,
                              )
                            }
                            disabled={loading}
                            title={
                              category.isActive
                                ? "Deactivate category"
                                : "Activate category"
                            }
                            className="
                              rounded-lg
                              p-2
                              text-slate-500
                              transition
                              hover:bg-amber-500/10
                              hover:text-amber-400
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >

                            {category.isActive ? (

                              <PowerOff className="h-4 w-4" />

                            ) : (

                              <Power className="h-4 w-4" />

                            )}

                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                category._id,
                              )
                            }
                            disabled={
                              loading ||
                              deletingId ===
                                category._id
                            }
                            title="Delete category"
                            className="
                              rounded-lg
                              p-2
                              text-slate-500
                              transition
                              hover:bg-red-500/10
                              hover:text-red-400
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >

                            {deletingId ===
                            category._id ? (

                              <Loader2
                                className="
                                  h-4
                                  w-4
                                  animate-spin
                                "
                              />

                            ) : (

                              <Trash2 className="h-4 w-4" />

                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ),
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/*                             = */}
      {/* CATEGORY FORM MODAL */}
      {/*                             = */}

      <CategoryFormModal

        open={isModalOpen}

        onClose={
          handleCloseModal
        }

        category={
          selectedCategory
        }

        loading={loading}

        onSubmit={
          handleCategorySubmit
        }

      />

    </div>

  );

}