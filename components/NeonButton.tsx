export function NeonButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="cta">
      {children}
    </button>
  );
}
