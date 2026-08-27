"use client";

import { FormEvent, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { generateBlog } from "@/redux/slice/ai/aiSlice";
import type { GenerateBlogResponse } from "@/api/services/aiService";

interface BlogAIWriterProps {
  onGenerated: (blog: GenerateBlogResponse) => void;
}

export default function BlogAIWriter({ onGenerated }: BlogAIWriterProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { loading, generationUsage, error } = useAppSelector((state) => state.ai);
  const [topic, setTopic] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (!user || (user.role !== "author" && user.role !== "administration")) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!topic.trim() || loading) return;
    try {
      const result = await dispatch(generateBlog({ topic: topic.trim(), instructions: instructions.trim() || undefined })).unwrap();
      onGenerated(result);
      toast.success("AI draft added to the editor for your review.");
    } catch {
      return;
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-violet-500" /><h2 className="text-base font-semibold text-slate-900 dark:text-white">AI Blog Writer</h2></div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Generate a draft, then review it before saving or submitting.</p>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <div><label htmlFor="ai-topic" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Topic</label><input id="ai-topic" value={topic} maxLength={300} onChange={(event) => setTopic(event.target.value)} disabled={loading} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white" placeholder="What should the article be about?" /><p className="mt-1 text-right text-xs text-slate-500">{topic.length}/300</p></div>
        <div><label htmlFor="ai-instructions" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Additional instructions</label><textarea id="ai-instructions" value={instructions} maxLength={1000} onChange={(event) => setInstructions(event.target.value)} disabled={loading} rows={4} className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-400 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white" placeholder="Tone, audience, structure, or key points..." /><p className="mt-1 text-right text-xs text-slate-500">{instructions.length}/1000</p></div>
        <button type="submit" disabled={loading || !topic.trim()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"><Sparkles className="h-4 w-4" />{loading ? "AI is writing..." : "Generate Blog with AI"}</button>
      </form>
      {generationUsage && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">AI generations remaining today: {generationUsage.remaining} / {generationUsage.limit}</p>}
    </section>
  );
}
