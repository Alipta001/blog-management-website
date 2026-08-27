"use client";

import { FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Send, Sparkles, X } from "lucide-react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { askAboutBlog, clearAIState, summarizeBlog } from "@/redux/slice/ai/aiSlice";

interface BlogAIAssistantProps {
  blogId: string;
}

export default function BlogAIAssistant({ blogId }: BlogAIAssistantProps) {
  const dispatch = useAppDispatch();
  const {
    answer,
    summary,
    summaryCached,
    questionUsage,
    loading,
    error,
    errorStatus,
  } = useAppSelector((state) => state.ai);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const askQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading) return;
    dispatch(askAboutBlog({ blogId, question: trimmedQuestion }));
    setQuestion("");
  };

  const response = summary || answer;
  const clearResponse = () => dispatch(clearAIState());

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-300">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Assistant</h2>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Understand this article faster with AI.</p>
        </div>
        {response && <button type="button" onClick={clearResponse} disabled={loading} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-60 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white"><X className="h-4 w-4" />Clear</button>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => dispatch(summarizeBlog(blogId))} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60"><Sparkles className="h-4 w-4" />Generate AI Summary</button>
        <button type="button" onClick={() => dispatch(askAboutBlog({ blogId, question: "Explain this entire article in simple language for a beginner." }))} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 disabled:cursor-wait disabled:opacity-60 dark:border-slate-800 dark:text-slate-300 dark:hover:text-violet-300"><BookOpen className="h-4 w-4" />Explain Simply</button>
      </div>

      <form onSubmit={askQuestion} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} disabled={loading} placeholder="Ask anything about this article..." className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 disabled:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-950" />
        <button type="submit" disabled={loading || !question.trim()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"><Send className="h-4 w-4" />Ask AI about this article</button>
      </form>

      {questionUsage && <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">AI Questions Remaining Today: {questionUsage.remaining} / {questionUsage.limit}</p>}
      {loading && <p className="mt-4 text-sm font-medium text-violet-600 dark:text-violet-300">AI is thinking...</p>}
      {error && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{errorStatus === 429 ? "Rate limit exceeded. " : errorStatus === 403 ? "Forbidden. " : ""}{error}</p>}
      {summary && !loading && <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"><div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"><span>AI Summary</span>{summaryCached && <span>Cached</span>}</div><ReactMarkdown>{summary}</ReactMarkdown></div>}
      {answer && !summary && !loading && <div className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">{answer}</div>}
    </section>
  );
}
