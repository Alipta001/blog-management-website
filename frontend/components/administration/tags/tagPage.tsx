"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import type { Tag } from "@/types/tag.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearSelectedTag,
  clearTagError,
  clearTagSuccessMessage,
  createTag,
  deleteTag,
  getTags,
  updateTag,
} from "@/redux/slice/tag/tagSlice";

import DeleteTagModal from "./deleteTagModal";
import TagEmptyState from "./tagEmptyState";
import TagFilters from "./tagFilters";
import TagFormModal, { type TagFormData } from "./tagFormModal";
import TagHeader from "./tagHeader";
import TagSkeleton from "./tagSkeleton";
import TagStats from "./tagStats";
import TagTable from "./tagTable";

export default function TagPage() {
  const dispatch = useAppDispatch();
  const { tags, loading, error, successMessage } = useAppSelector((state) => state.tag);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
    dispatch(clearTagError());
  }, [dispatch, error]);

  useEffect(() => {
    if (!successMessage) return;
    toast.success(successMessage);
    dispatch(clearTagSuccessMessage());
  }, [dispatch, successMessage]);

  const filteredTags = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (tags || []).filter((tag) => !query || tag.name.toLowerCase().includes(query) || tag.slug.toLowerCase().includes(query));
  }, [search, tags]);

  const openCreate = () => {
    setSelectedTag(null);
    setFormOpen(true);
  };

  const openEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setFormOpen(true);
  };

  const closeForm = () => {
    if (loading) return;
    setFormOpen(false);
    setSelectedTag(null);
    dispatch(clearSelectedTag());
  };

  const submitForm = async (data: TagFormData) => {
    if (selectedTag) {
      await dispatch(updateTag({ id: selectedTag._id, name: data.name })).unwrap();
    } else {
      await dispatch(createTag(data)).unwrap();
    }
    setFormOpen(false);
    setSelectedTag(null);
    dispatch(clearSelectedTag());
  };

  const confirmDelete = async () => {
    if (!deletingTag) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteTag(deletingTag._id)).unwrap();
      setDeletingTag(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">
      <TagHeader onCreate={openCreate} />
      <TagStats total={tags?.length || 0} />
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">
        <TagFilters search={search} onSearchChange={setSearch} />
        {loading && !tags.length ? <TagSkeleton /> : filteredTags.length ? <TagTable tags={filteredTags} onEdit={openEdit} onDelete={setDeletingTag} /> : <TagEmptyState filtered={Boolean(search)} />}
      </section>
      <TagFormModal key={`${selectedTag?._id || "create"}-${formOpen}`} open={formOpen} tag={selectedTag} loading={loading} onClose={closeForm} onSubmit={submitForm} />
      <DeleteTagModal open={Boolean(deletingTag)} tag={deletingTag} loading={deleteLoading} onClose={() => setDeletingTag(null)} onConfirm={confirmDelete} />
    </div>
  );
}
