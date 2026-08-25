"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Highlighter,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Undo2,
  Underline,
  Minus,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  type FieldErrors,
  type UseFormSetValue,
  type UseFormRegister,
} from "react-hook-form";

import type {
  CreateBlogFormValues,
} from "@/types/blog.types";

interface BlogContentEditorProps {
  register: UseFormRegister<CreateBlogFormValues>;

  setValue: UseFormSetValue<CreateBlogFormValues>;

  errors: FieldErrors<CreateBlogFormValues>;

  contentImages: File[];

  onContentImagesChange: (
    files: File[]
  ) => void;
}

export default function BlogContentEditor({
  register,
  setValue,
  errors,
  contentImages,
  onContentImagesChange,
}: BlogContentEditorProps) {
  const [editor, setEditor] = useState<HTMLDivElement | null>(null);
  const [contentValue, setContentValue] = useState("");

  const [
    previews,
    setPreviews,
  ] = useState<string[]>([]);

   
  // HANDLE IMAGE SELECTION
   

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files =
      Array.from(
        event.target.files || [],
      );

    if (!files.length) {
      return;
    }

    onContentImagesChange([
      ...contentImages,
      ...files,
    ]);

    event.target.value = "";
  };

  const runCommand = (command: string, value?: string) => {
    editor?.focus();
    document.execCommand(command, false, value);
    const html = editor?.innerHTML || "";
    setContentValue(html);
    setValue("content", html, { shouldDirty: true, shouldValidate: true });
  };

  const addLink = () => {
    const url = window.prompt("Enter the link URL");
    if (url) runCommand("createLink", url);
  };

  const readableColors = [
    ["#f8fafc", "Snow"],
    ["#c4b5fd", "Lavender"],
    ["#fda4af", "Rose"],
    ["#86efac", "Mint"],
    ["#fcd34d", "Gold"],
    ["#67e8f9", "Cyan"],
    ["#fb923c", "Orange"],
  ];

   
  // REMOVE IMAGE
   

  const removeImage = (
    index: number,
  ) => {
    const updatedFiles =
      contentImages.filter(
        (_, fileIndex) =>
          fileIndex !== index,
      );

    onContentImagesChange(
      updatedFiles,
    );
  };

   
  // CREATE PREVIEWS
   

  useEffect(() => {

    const urls =
      contentImages.map(
        (file) =>
          URL.createObjectURL(file),
      );

    setPreviews(urls);

    return () => {
      urls.forEach(
        (url) =>
          URL.revokeObjectURL(url),
      );
    };

  }, [contentImages]);

   
  // RENDER
   

  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-6">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-base font-semibold text-white">
          Blog Content
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Write the complete content of your blog.
        </p>

      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] focus-within:border-violet-500/50">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/[0.04] p-2">
          {[
            [Bold, "bold", "Bold"],
            [Italic, "italic", "Italic"],
            [Underline, "underline", "Underline"],
            [Strikethrough, "strikeThrough", "Strikethrough"],
            [Heading2, "formatBlock", "Heading", "<h2>"],
            [Quote, "formatBlock", "Quote", "<blockquote>"],
            [List, "insertUnorderedList", "Bullet list"],
            [ListOrdered, "insertOrderedList", "Numbered list"],
            [AlignLeft, "justifyLeft", "Align left"],
            [AlignCenter, "justifyCenter", "Align center"],
            [AlignRight, "justifyRight", "Align right"],
            [Code, "formatBlock", "Code block", "<pre>"],
            [Superscript, "superscript", "Superscript"],
            [Subscript, "subscript", "Subscript"],
            [Minus, "insertHorizontalRule", "Divider"],
          ].map(([Icon, command, label, value]) => (
            <button
              key={label as string}
              type="button"
              title={label as string}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runCommand(command as string, value as string | undefined)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <span className="mx-1 h-6 w-px bg-white/10" />
          <button type="button" title="Add link" onClick={addLink} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"><Link className="h-4 w-4" /></button>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 px-1" title="Readable text colors">
            <span className="px-1 text-sm font-bold text-slate-300">A</span>
            {readableColors.map(([color, name]) => (
              <button
                key={color}
                type="button"
                title={name}
                aria-label={`Use ${name} text`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => runCommand("foreColor", color)}
                className="h-4 w-4 rounded-full border border-white/20 transition hover:scale-125"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button type="button" title="Highlight" onClick={() => runCommand("hiliteColor", "#713f12")} className="flex h-9 w-9 items-center justify-center rounded-lg text-amber-300 transition hover:bg-white/10 hover:text-white"><Highlighter className="h-4 w-4" /></button>
          <button type="button" title="Undo" onClick={() => runCommand("undo")} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"><Undo2 className="h-4 w-4" /></button>
          <button type="button" title="Redo" onClick={() => runCommand("redo")} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"><Redo2 className="h-4 w-4" /></button>
          <button type="button" title="Clear formatting" onClick={() => runCommand("removeFormat")} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"><RemoveFormatting className="h-4 w-4" /></button>
        </div>
        <div
          ref={setEditor}
          contentEditable
          role="textbox"
          aria-label="Blog content editor"
          data-placeholder="Start writing your blog..."
          onInput={(event) => {
            const html = event.currentTarget.innerHTML;
            setContentValue(html);
            setValue("content", html, { shouldDirty: true, shouldValidate: true });
          }}
          className="min-h-[420px] w-full px-5 py-4 text-sm leading-7 text-white outline-none empty:before:pointer-events-none empty:before:text-slate-600 empty:before:content-[attr(data-placeholder)] [&_blockquote]:border-l-4 [&_blockquote]:border-violet-500 [&_blockquote]:pl-4 [&_h2]:my-4 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-5 [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-3"
        />
        <textarea {...register("content")} value={contentValue} readOnly className="hidden" aria-hidden="true" />
      </div>

      {errors.content && (
        <p className="mt-2 text-xs text-red-400">
          {errors.content.message}
        </p>
      )}

      {/*                             =====
          CONTENT IMAGES
                                  ===== */}

      <div className="mt-6">

        <div className="mb-3">

          <h3 className="text-sm font-semibold text-white">
            Content Images
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Upload images that will be used inside your blog content.
          </p>

        </div>

        {/* UPLOAD */}

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center transition hover:border-violet-500/40 hover:bg-white/[0.04]">

          <ImagePlus className="mb-3 h-7 w-7 text-slate-500" />

          <span className="text-sm font-medium text-slate-300">
            Upload content images
          </span>

          <span className="mt-1 text-xs text-slate-600">
            You can select multiple PNG, JPG or WEBP images
          </span>

          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={
              handleImageChange
            }
          />

        </label>

        {/* PREVIEWS */}

        {contentImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

            {contentImages.map(
              (file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-white/10"
                >

                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm transition hover:bg-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>

                </div>
              ),
            )}

          </div>
        )}

      </div>

    </section>
  );
}