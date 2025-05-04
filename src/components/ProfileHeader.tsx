import { UserResource } from "@clerk/types";
import CornerElements from "./CornerElements";

const ProfileHeader = ({ user }: { user: UserResource | null | undefined }) => {
  if (!user) return null;
  return (
    <div className="mb-10 relative bg-zinc-800 border-2 border-zinc-700 rounded-xl p-6 shadow-xl mx-4 max-w-[62rem] mx-auto">
      <CornerElements />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          {user.imageUrl ? (
            <div className="relative w-24 h-24 overflow-hidden rounded-lg border-2 border-zinc-700">
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-lg bg-zinc-700/50 border-2 border-zinc-700 flex items-center justify-center">
              <span className="text-3xl font-bold text-red-500">
                {user.fullName?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-zinc-900"></div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h1 className="text-3xl font-bold text-zinc-100">
              {user.fullName}
            </h1>
            <div className="flex items-center bg-zinc-700/50 backdrop-blur-sm border-2 border-red-500/30 rounded-lg px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
              <p className="text-xs font-mono text-red-500">USER ACTIVE</p>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-red-500/30 via-red-500/50 to-red-500/30 my-3" />
          <p className="text-zinc-400 font-mono text-sm">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;