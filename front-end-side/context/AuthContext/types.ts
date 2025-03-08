export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, expire:string, empresa:string, email:string) => void
  logout: () => void
}