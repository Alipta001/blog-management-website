"use client";

import {
CheckCircle2,
Eye,
Loader2,
Trash2,
Upload,
XCircle,
} from "lucide-react";

interface BlogActionsProps {

status:
| "draft"
| "pending"
| "published"
| "rejected"
| "unpublished";

onView:
() => void;

onPublish:
() => void;

onReject:
(
rejectionReason: string,
) => void;

onUnpublish:
() => void;

onDelete:
() => void;

loading?: boolean;

}

export default function BlogActions({
status,
onView,
onPublish,
onReject,
onUnpublish,
onDelete,
loading = false,
}: BlogActionsProps) {

const handleReject =
() => {


  const rejectionReason =
    window.prompt(
      "Enter rejection reason:",
    );


  if (
    rejectionReason === null
  ) {
    return;
  }


  onReject(
    rejectionReason,
  );

};

const handleDelete =
() => {

  const confirmed =
    window.confirm(
      "Are you sure you want to delete this blog?",
    );


  if (!confirmed) {
    return;
  }


  onDelete();

};


return ( <div className="flex items-center justify-end gap-2">

  {/* VIEW */}

  <button
    type="button"
    title="View blog"
    onClick={onView}
    disabled={loading}
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-lg
      text-slate-500
      transition
      hover:bg-white/5
      hover:text-white
      disabled:opacity-50
    "
  >

    <Eye className="h-4 w-4" />

  </button>


  {/* PENDING / UNPUBLISHED ACTIONS */}

  {(status === "pending" || status === "unpublished") && (

    <>

      <button
        type="button"
        title="Publish blog"
        onClick={onPublish}
        disabled={loading}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-emerald-400
          transition
          hover:bg-emerald-500/10
          disabled:opacity-50
        "
      >

        {loading
          ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          )
          : (
            <CheckCircle2 className="h-4 w-4" />
          )}

      </button>


      {status === "pending" && <button
        type="button"
        title="Reject blog"
        onClick={handleReject}
        disabled={loading}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-red-400
          transition
          hover:bg-red-500/10
          disabled:opacity-50
        "
      >

        <XCircle className="h-4 w-4" />

      </button>}

    </>

  )}


  {/* PUBLISHED ACTION */}

  {status === "published" && (

    <button
      type="button"
      title="Unpublish blog"
      onClick={onUnpublish}
      disabled={loading}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        text-amber-400
        transition
        hover:bg-amber-500/10
        disabled:opacity-50
      "
    >

      <Upload className="h-4 w-4" />

    </button>

  )}


  {/* DELETE */}

  <button
    type="button"
    title="Delete blog"
    onClick={handleDelete}
    disabled={loading}
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-lg
      text-slate-500
      transition
      hover:bg-red-500/10
      hover:text-red-400
      disabled:opacity-50
    "
  >

    <Trash2 className="h-4 w-4" />

  </button>

</div>

);
}
