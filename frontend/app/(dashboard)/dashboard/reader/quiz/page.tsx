"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Gamepad2, RotateCcw, XCircle } from "lucide-react";

const questions = [
  { question: "What makes a blog easier to scan?", options: ["Clear headings and short paragraphs", "One very long paragraph", "No spacing"], answer: 0 },
  { question: "Which habit helps readers remember an idea?", options: ["Skimming every word", "Connecting it to an example", "Skipping the conclusion"], answer: 1 },
  { question: "What is a strong way to begin an article?", options: ["A clear promise to the reader", "Unrelated filler", "A blank page"], answer: 0 },
];

export default function DailyQuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const choose = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  };
  const next = () => {
    if (current === questions.length - 1) setFinished(true);
    else { setCurrent((value) => value + 1); setSelected(null); }
  };
  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); };

  return (
    <main className="mx-auto max-w-3xl space-y-8">
      <header className="rounded-2xl border border-sky-100 bg-sky-50 p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-400"><Gamepad2 className="h-4 w-4" /> Daily challenge</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Reader&apos;s quiz</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Take a quick knowledge break and keep your reading streak alive.</p>
      </header>
      {finished ? (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">You scored {score}/{questions.length}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Nice work. Come back tomorrow for another challenge.</p>
          <button type="button" onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white"><RotateCcw className="h-4 w-4" /> Play again</button>
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"><span>Question {current + 1} of {questions.length}</span><span>{score} correct</span></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <h2 className="mt-8 text-xl font-semibold text-slate-900 dark:text-white">{question.question}</h2>
          <div className="mt-5 space-y-3">{question.options.map((option, index) => { const correct = selected !== null && index === question.answer; const wrong = selected === index && index !== question.answer; return <button key={option} type="button" onClick={() => choose(index)} className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition ${correct ? "border-emerald-500/50 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : wrong ? "border-rose-500/50 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" : "border-slate-200 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-cyan-500/[0.06]"}`}>{option}{correct && <CheckCircle2 className="h-4 w-4" />}{wrong && <XCircle className="h-4 w-4" />}</button>; })}</div>
          <button type="button" onClick={next} disabled={selected === null} className="mt-6 w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40">{current === questions.length - 1 ? "See result" : "Next question"}</button>
        </section>
      )}
      <Link href="/dashboard/reader" className="block text-center text-sm text-cyan-500 hover:text-cyan-400">Back to reader overview</Link>
    </main>
  );
}
