import { getCurrentUserApi } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export default function useAuth() {

  const query = useQuery({
    queryKey: ['auth-user'],
    queryFn: getCurrentUserApi,
    staleTime: 0,
    retry: 2
  })


  return query
}

