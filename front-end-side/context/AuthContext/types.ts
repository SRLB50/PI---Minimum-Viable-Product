export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, expire:string) => void
  logout: () => void
}