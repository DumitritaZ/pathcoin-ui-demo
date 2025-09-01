"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { name: string; address?: string | null };
const Ctx = createContext<{
  user: User; setName: (n: string)=>void; setAddress: (a?: string|null)=>void;
}>({ user: { name: "Explorer" }, setName(){}, setAddress(){} });

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ name: "Explorer" });

  useEffect(() => {
    const saved = localStorage.getItem("pc_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("pc_user", JSON.stringify(user));
  }, [user]);

  return (
    <Ctx.Provider value={{
      user,
      setName: (name) => setUser(u => ({ ...u, name })),
      setAddress: (address) => setUser(u => ({ ...u, address })),
    }}>
      {children}
    </Ctx.Provider>
  );
}
export const useUser = () => useContext(Ctx);
