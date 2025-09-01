export const fmtInt = (n: number) => new Intl.NumberFormat("en-US").format(n);
export const fmtDec = (n: number, d = 2) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
