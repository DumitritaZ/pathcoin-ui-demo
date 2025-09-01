"use client";

import { AppBg } from "@/components/AppBg";
import TabBar from "@/components/TabBar";
import ProfileAvatar from "@/components/ProfileAvatar";
import StatsRow from "@/components/StatsRow";
import AchievementCard from "@/components/AchievementCard";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import EditProfileSheet from "@/components/EditProfileSheet";
import { useUser } from "@/lib/userStore";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");

  return (
    <AppBg>
      <main className="mobile px-6 py-6 space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Profile</h1>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <ProfileAvatar size={150} src={avatarSrc} />
          <div className="text-3xl font-semibold text-white">{user.name}</div>
          <div className="text-white/70">
            Level <span className="font-semibold">7</span> • 62%
            {address && (
              <span className="ml-2 text-white/60">
                • {address.slice(0, 6)}…{address.slice(-4)}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <StatsRow
          items={[
            { label: "Total PATH", value: "1,248" },
            { label: "Runs completed", value: "8" },
            { label: "Distance", value: "23.8 km" },
          ]}
        />

        {/* Actions – all with the same neon style */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ConnectWalletButton
            className="neon-btn px-4 py-2.5 rounded-xl font-semibold text-white"
            onConnected={(addr) => setAddress(addr)}
          />

          <button
            type="button"
            className="neon-btn px-4 py-2.5 rounded-xl font-semibold text-white"
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </button>

          <Link
            href="/settings"
            className="neon-btn px-4 py-2.5 rounded-xl font-semibold text-white"
          >
            Settings
          </Link>
        </div>

        {/* Achievements */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            <AchievementCard
              title="First Run"
              variant="trophy"
              gradient="from-cyan-400 to-indigo-500"
            />
            <AchievementCard
              title="Bank Master"
              variant="wallet"
              gradient="from-fuchsia-500 to-purple-500"
            />
            <AchievementCard
              title="Night Owl"
              variant="moon"
              gradient="from-indigo-400 to-violet-500"
            />
          </div>
        </section>

        <div className="h-16" />
      </main>

      <TabBar />

      {/* Sheet name + picture */}
      <EditProfileSheet
        open={editOpen}
        onClose={() => setEditOpen(false)}
        avatarSrc={avatarSrc}
        setAvatarSrc={setAvatarSrc}
      />
    </AppBg>
  );
}
