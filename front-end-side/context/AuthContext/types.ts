export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, expire:string, empresa:string, email:string, nome:string) => void
  logout: () => void
}