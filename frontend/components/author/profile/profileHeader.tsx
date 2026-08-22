import {
  UserRound,
} from "lucide-react";


export default function ProfileHeader() {
  return (
    <div className="flex items-start gap-4 border-b border-white/10 pb-6">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">

        <UserRound className="h-5 w-5" />

      </div>


      <div>

        <h1 className="text-xl font-semibold text-white">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account details.
        </p>

      </div>

    </div>
  );
}