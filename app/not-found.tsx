import { AppBg } from "@/components/AppBg";
import Link from "next/link";

export default function NotFound() {
  return (
    <AppBg>
      <main className="mobile px-6 py-20 text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-cyan-400 drop-shadow-lg">
          404
        </h1>
        <p className="text-white/80 text-lg">
          Oops! Path not found…
        </p>

        <Link
          href="/"
          className="neon-btn px-6 py-3 rounded-xl font-semibold text-white inline-block"
        >
          Back to Home
        </Link>
      </main>
    </AppBg>
  );
}
