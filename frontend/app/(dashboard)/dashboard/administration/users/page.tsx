"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "react-toastify";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  activateUser,
  blockUser,
  deactivateUser,
  deleteUser,
  getUsers,
} from "@/redux/slice/user/userSlice";

import type {
  UserRole,
  UserStatus,
} from "@/types/user.types";

const PAGE_SIZE = 10;

const roleLabels: Record<UserRole, string> = {
  administrator: "Administrator",
  administration: "Administration",
  author: "Author",
  user: "Reader",
};

const statusStyles: Record<UserStatus, string> = {
  active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  inactive: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  blocked: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

export default function AdministrationUsersPage() {
  const dispatch = useAppDispatch();
  const {
    users,
    pagination,
    loading,
    error,
  } = useAppSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [status, setStatus] = useState<UserStatus | "">("");
  const [page, setPage] = useState(1);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchUsers = (nextPage = page) => {
    dispatch(
      getUsers({
        page: nextPage,
        limit: PAGE_SIZE,
        search: search.trim() || undefined,
        role: role || undefined,
        status: status || undefined,
      }),
    );
  };

  useEffect(() => {
    fetchUsers(page);
    // Filters intentionally reset pagination in their change handlers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, role, status]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    fetchUsers(1);
  };

  const runAction = async (
    id: string,
    action: typeof activateUser | typeof deactivateUser | typeof blockUser | typeof deleteUser,
    confirmation?: string,
  ) => {
    if (confirmation && !window.confirm(confirmation)) {
      return;
    }

    setActionId(id);

    try {
      const result = await dispatch(action(id)).unwrap();
      toast.success(result.message);
      fetchUsers();
    } catch (reason) {
      toast.error(typeof reason === "string" ? reason : "Unable to update user");
    } finally {
      setActionId(null);
    }
  };

  const counts = {
    total: pagination?.total || users.length,
    active: users.filter((user) => user.status === "active").length,
    authors: users.filter((user) => user.role === "author").length,
    blocked: users.filter((user) => user.status === "blocked").length,
  };

  const summaryCards: {
    label: string;
    value: number;
    icon: LucideIcon;
  }[] = [
    ["Total users", counts.total, Users],
    ["Active now", counts.active, CheckCircle2],
    ["Authors", counts.authors, ShieldCheck],
    ["Blocked", counts.blocked, Ban],
  ].map(([label, value, icon]) => ({
    label: String(label),
    value: Number(value),
    icon: icon as LucideIcon,
  }));

  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-6">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
            <Users className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-violet-400">ADMINISTRATION</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Users
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage access, roles and account status across your platform.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchUsers()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          Refresh
        </button>
      </header>

      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {summaryCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#09090b] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <Icon className="h-4 w-4 text-slate-600" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#09090b]">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/50"
            />
          </label>
          <select value={role} onChange={(event) => { setRole(event.target.value as UserRole | ""); setPage(1); }} className="h-11 rounded-xl border border-white/10 bg-[#111113] px-3 text-sm text-slate-300 outline-none focus:border-violet-500/50">
            <option value="">All roles</option>
            {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <select value={status} onChange={(event) => { setStatus(event.target.value as UserStatus | ""); setPage(1); }} className="h-11 rounded-xl border border-white/10 bg-[#111113] px-3 text-sm text-slate-300 outline-none focus:border-violet-500/50">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <button type="submit" className="h-11 rounded-xl bg-violet-600 px-5 text-sm font-medium text-white transition hover:bg-violet-500">Search</button>
        </form>

        {error && <div className="m-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</div>}

        {loading && !users.length ? (
          <div className="flex min-h-[360px] items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-violet-400" /></div>
        ) : !users.length ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <CircleUserRound className="h-8 w-8 text-slate-600" />
            <h2 className="mt-4 text-base font-semibold text-white">No users found</h2>
            <p className="mt-2 text-sm text-slate-500">Try changing your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead><tr className="border-b border-white/10 bg-white/[0.02]">
                {['User', 'Role', 'Status', 'Joined', 'Actions'].map((heading) => <th key={heading} className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">{heading}</th>)}
              </tr></thead>
              <tbody>
                {users.map((user) => {
                  const busy = actionId === user._id;
                  return <tr key={user._id} className="border-b border-white/[0.06] transition last:border-0 hover:bg-white/[0.025]">
                    <td className="px-6 py-4"><div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/10 text-sm font-semibold text-violet-400">
                        {user.profileImage ? <img src={user.profileImage} alt="" className="h-full w-full object-cover" /> : user.name.charAt(0).toUpperCase()}
                      </div>
                      <div><p className="text-sm font-medium text-white">{user.name}</p><p className="mt-1 text-xs text-slate-500">{user.email}</p></div>
                    </div></td>
                    <td className="px-6 py-4 text-sm text-slate-300">{roleLabels[user.role]}</td>
                    <td className="px-6 py-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[user.status]}`}>{user.status}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-400">{new Date(user.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2">
                      {user.status === "active" ? <button title="Deactivate user" disabled={busy} onClick={() => runAction(user._id, deactivateUser)} className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-500/10 hover:text-amber-400 disabled:opacity-40"><Ban className="h-4 w-4" /></button> : <button title="Activate user" disabled={busy} onClick={() => runAction(user._id, activateUser)} className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-40"><CheckCircle2 className="h-4 w-4" /></button>}
                      {user.status !== "blocked" && <button title="Block user" disabled={busy} onClick={() => runAction(user._id, blockUser, `Block ${user.name}?`)} className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-40"><ShieldCheck className="h-4 w-4" /></button>}
                      <button title="Delete user" disabled={busy} onClick={() => runAction(user._id, deleteUser, `Delete ${user.name}? This cannot be undone.`)} className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-40"><Trash2 className="h-4 w-4" /></button>
                      {busy && <Loader2 className="h-4 w-4 animate-spin text-violet-400" />}
                    </div></td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        )}

        <footer className="flex items-center justify-between border-t border-white/10 px-4 py-4 sm:px-6">
          <p className="text-xs text-slate-500">Page {pagination?.page || page} of {pagination?.totalPages || 1}</p>
          <div className="flex gap-2">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" disabled={page >= (pagination?.totalPages || 1) || loading} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </footer>
      </section>
    </main>
  );
}