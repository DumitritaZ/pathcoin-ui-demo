"use client";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/userStore";

export default function EditProfileSheet({
  open,
  onClose,
  avatarSrc,
  setAvatarSrc,
}: {
  open: boolean;
  onClose: () => void;
  avatarSrc: string | null;
  setAvatarSrc: (v: string | null) => void;
}) {
  const { user, setName } = useUser();
  const [val, setVal] = useState(user.name ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) setVal(user.name ?? ""); }, [open, user.name]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-end">
      <div className="w-full rounded-t-3xl p-5 glass border border-white/10 space-y-4">
        <div className="text-white text-xl font-semibold">Edit Profile</div>

        {/* avatar preview + upload */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-white/40">No photo</div>
            )}
          </div>
          <div className="space-x-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const url = URL.createObjectURL(f);
                setAvatarSrc(url);
              }}
            />
            <button
              className="px-3 py-2 rounded-xl glass border border-white/10 text-white/85"
              onClick={() => fileRef.current?.click()}
            >
              Change Photo
            </button>
            {avatarSrc && (
              <button
                className="px-3 py-2 rounded-xl glass border border-white/10 text-white/60"
                onClick={() => setAvatarSrc(null)}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* name input */}
        <div>
          <label className="block text-white/80 mb-1">Display name</label>
          <input
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
            placeholder="Explorer42"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>

        {/* actions */}
        <div className="mt-2 flex gap-3">
          <button
            className="px-4 py-2 rounded-xl glass border border-white/10 text-white/85"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="neon-btn px-4 py-2 rounded-xl text-white font-semibold"
            onClick={() => { setName(val.trim() || "Explorer"); onClose(); }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
