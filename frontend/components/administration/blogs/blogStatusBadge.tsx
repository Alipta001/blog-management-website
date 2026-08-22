interface BlogStatusBadgeProps {
status:
| "draft"
| "pending"
| "published"
| "rejected"
| "unpublished";
}

const statusConfig = {

published: {
label: "Published",
className:
"bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
},

pending: {
label: "Pending",
className:
"bg-amber-500/10 text-amber-400 border-amber-500/20",
},

draft: {
label: "Draft",
className:
"bg-slate-500/10 text-slate-400 border-slate-500/20",
},

rejected: {
label: "Rejected",
className:
"bg-red-500/10 text-red-400 border-red-500/20",
},

unpublished: {
label: "Unpublished",
className:
"bg-orange-500/10 text-orange-400 border-orange-500/20",
},

};

export default function BlogStatusBadge({
status,
}: BlogStatusBadgeProps) {

const config =
statusConfig[status];

return (
<span
className={`         inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        ${config.className}
      `}
>

  {config.label}

</span>

);
}
