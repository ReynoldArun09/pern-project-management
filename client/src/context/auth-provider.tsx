import useAuth from "@/hooks/useAuth";
import { createContext } from "react";


type AuthContextType = {
  user: any;
  isLoading: boolean;
  isFetching: boolean
  error: any;
  refetchAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: authData, isLoading, isFetching, error: authError, refetch: refetchAuth } = useAuth()
  console.log(authData)
  const user = authData.data;

  return (
    <AuthContext.Provider value={{ user, isLoading, isFetching, error: authError, refetchAuth }}>
      {children}
    </AuthContext.Provider >
  )
}


export const useAuthContext = () => {
  const context = createContext(AuthContext)

  if (!context) {
    throw new Error("Auth context should be wrapped in AuthProvider")
  }

  return context
}
