"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/userStore";

export default function NameSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, setName } = useUser();
  const [val, setVal] = useState(user.name ?? "");


  useEffect(() => {
    if (open) setVal(user.name ?? "");
  }, [open, user.name]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-end">
      <div className="w-full rounded-t-3xl p-5 glass border border-white/10">
        <div className="text-white text-xl font-semibold mb-2">Your display name</div>
        <input
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
          placeholder="Explorer42"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <div className="mt-3 flex gap-3">
          <button
            className="px-4 py-2 rounded-xl glass border border-white/10 text-white/85"
            onClick={onClose}
          >
            Later
          </button>
          <button
            className="neon-btn px-4 py-2 rounded-xl text-white font-semibold"
            onClick={() => {
              setName(val.trim() || "Explorer");
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
