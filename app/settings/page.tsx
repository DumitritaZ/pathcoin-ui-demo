"use client";

import { useEffect, useState } from "react";
import { AppBg } from "@/components/AppBg";
import TabBar from "@/components/TabBar";

const KEY = "pc_settings";
type Settings = { haptics: boolean; sounds: boolean };

/* ---------- Neon switch (local) ---------- */
function NeonSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-8 w-14 items-center rounded-full transition-all border",
        checked
          ? "bg-[rgba(0,229,255,0.18)] border-cyan-400/40 shadow-[0_0_18px_rgba(0,229,255,.35)_inset,0_0_24px_rgba(0,229,255,.25)]"
          : "bg-white/6 border-white/15",
      ].join(" ")}
    >
      <span
        className={[
          "absolute left-1 h-6 w-6 rounded-full transition-all",
          checked
            ? "translate-x-6 bg-cyan-300 shadow-[0_0_16px_rgba(0,229,255,.8)]"
            : "translate-x-0 bg-white/90",
        ].join(" ")}
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: checked ? "0 0 30px rgba(0,229,255,.45)" : "none",
        }}
      />
    </button>
  );
}

/* ---------- Simple glass card (local) ---------- */
function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-4 md:p-5">
      <div className="mb-3">
        <div className="text-white font-semibold tracking-wide">{title}</div>
        {subtitle && <div className="text-white/60 text-sm">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [s, setS] = useState<Settings>({ haptics: true, sounds: true });

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS(JSON.parse(raw));
    } catch {}
  }, []);

  // save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  }, [s]);

  return (
    <AppBg>
      <main className="mobile px-6 py-6 space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>

        {/* Preferences */}
        <SectionCard
          title="Preferences"
          subtitle="Customize app feedback"
        >
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">🫨</span>
              <div>
                <div className="text-white/90 font-medium">Haptics</div>
                <div className="text-white/60 text-sm">
                  Subtle vibrations for actions
                </div>
              </div>
            </div>
            <NeonSwitch
              checked={s.haptics}
              onChange={(v) => setS({ ...s, haptics: v })}
              label="Haptics"
            />
          </div>

          <div className="h-px my-2 bg-white/10" />

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔊</span>
              <div>
                <div className="text-white/90 font-medium">Sounds</div>
                <div className="text-white/60 text-sm">
                  Short sounds for events
                </div>
              </div>
            </div>
            <NeonSwitch
              checked={s.sounds}
              onChange={(v) => setS({ ...s, sounds: v })}
              label="Sounds"
            />
          </div>
        </SectionCard>

        {/* App */}
        <SectionCard title="App">
          <div className="flex items-center justify-between py-2">
            <div className="text-white/85">Replay Onboarding</div>
            <button
              className="px-3 py-1.5 rounded-xl border border-white/15 glass hover:border-white/25"
              onClick={() => {
                try {
                  localStorage.removeItem("pc_onboarded");
                } catch {}
                window.location.href = "/onboarding";
              }}
            >
              Start
            </button>
          </div>

          <div className="h-px my-2 bg-white/10" />

          <div className="flex items-center justify-between py-2">
            <div className="text-white/85">Version</div>
            <span className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-white/70 text-sm">
              v0.2.0
            </span>
          </div>
        </SectionCard>

        {/* Legal */}
        <SectionCard title="Legal">
          <a
            className="underline"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Terms & Privacy
          </a>
        </SectionCard>

        <div className="h-16" />
      </main>
      <TabBar />
    </AppBg>
  );
}
