/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // fundal foarte închis ca în mock
        bg1: "#050D1A",
        bg2: "#0A1626",
        neon: "#00E5FF",
        cyan: "#00D6FF",
        blue: "#3A6BFF",
        textHigh: "rgba(255,255,255,0.92)",
        textMed: "rgba(255,255,255,0.64)"
      },
      borderRadius: { xl2: "22px" },
      boxShadow: {
        neon: "0 12px 32px rgba(0,229,255,.45)",
        card: "0 18px 50px rgba(0,0,0,.45)"
      }
    }
  },
  plugins: []
};
