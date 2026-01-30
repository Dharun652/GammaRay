import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
  };

  const signup = async (email, password, role) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    await supabase.from("profiles").insert([{ id: user.id, role }]);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
